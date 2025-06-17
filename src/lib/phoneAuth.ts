import {
  signInWithPhoneNumber,
  RecaptchaVerifier,
  ConfirmationResult,
  User as FirebaseUser,
  updateProfile,
} from "firebase/auth";
import {
  collection,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  query,
  where,
  getDocs,
  serverTimestamp,
} from "firebase/firestore";
import { auth, db, isFirebaseReady } from "./firebase";
import { User } from "./store";

interface PhoneAuthUser {
  uid: string;
  phoneNumber: string;
  displayName?: string;
}

// Recaptcha verifier instance
let recaptchaVerifier: RecaptchaVerifier | null = null;

// Initialize reCAPTCHA verifier with better error handling
export const initializeRecaptcha = (): Promise<RecaptchaVerifier> => {
  console.log("Attempting to initialize reCAPTCHA...");
  return new Promise((resolve, reject) => {
    try {
      if (!isFirebaseReady) {
        return reject(new Error("Firebase not ready"));
      }

      // Check if we're in a secure context (HTTPS or localhost)
      if (location.protocol !== "https:" && location.hostname !== "localhost") {
        return reject(new Error("reCAPTCHA requires HTTPS or localhost"));
      }

      // Ensure container exists
      let container = document.getElementById("recaptcha-container");
      if (!container) {
        container = document.createElement("div");
        container.id = "recaptcha-container";
        container.style.display = "none";
        container.style.zIndex = "99999"

        document.body.appendChild(container);
      }

      // Setup correct RecaptchaVerifier
      recaptchaVerifier = new RecaptchaVerifier(auth, "recaptcha-container", {
        size: "invisible",
        callback: (response: string) => {
          console.log("reCAPTCHA solved:", response);
        },
        "expired-callback": () => {
          console.log("reCAPTCHA expired");
          cleanupRecaptcha();
        },
        "error-callback": (err: any) => {
          console.error("reCAPTCHA error:", err);
          cleanupRecaptcha();
        },
      });
      console.log("reCAPTCHA verifier created.");

      recaptchaVerifier
        .render()
        .then(() => {
          console.log("reCAPTCHA rendered successfully.");
          resolve(recaptchaVerifier!);
        })
        .catch((error) => {
          console.error(
            "Failed to render reCAPTCHA during initialization:",
            error,
          );
          cleanupRecaptcha();
          reject(new Error("reCAPTCHA render failed"));
        });
    } catch (err) {
      console.error(
        "Error during overall reCAPTCHA initialization process:",
        err,
      );
      cleanupRecaptcha();
      reject(err);
    }
  });
};

export const sendOTP = async (
  phoneNumber: string,
  verifier: RecaptchaVerifier,
): Promise<ConfirmationResult | "demo"> => {
  if (!isFirebaseReady) {
    console.warn("Firebase not ready. Using demo fallback.");
    return "demo";
  }

  // Better phone number formatting
  let formattedPhone = phoneNumber.trim();

  // Remove any non-digit characters except +
  formattedPhone = formattedPhone.replace(/[^\d+]/g, "");

  // Ensure it starts with +
  if (!formattedPhone.startsWith("+")) {
    formattedPhone = `+${formattedPhone}`;
  }

  console.log(`Attempting to send OTP to: ${formattedPhone}`);

  try {
    // Validate phone number format
    if (!formattedPhone.match(/^\+[1-9]\d{1,14}$/)) {
      throw new Error("Please enter a valid phone number with country code");
    }

    console.log("Phone number format validated:", formattedPhone);
    

    const confirmationResult = await signInWithPhoneNumber(
      auth,
      formattedPhone,
      verifier,
    );
    console.log("OTP sent to", formattedPhone);
    console.log(
      "signInWithPhoneNumber successful, confirmationResult received:",
      confirmationResult,
    );
    return confirmationResult;
  } catch (error: any) {
    console.error(
      `Error during sendOTP for ${formattedPhone}: Error code: ${error.code}, Message: ${error.message}`,
      error,
    );

    // Handle specific errors
    if (error.code === "auth/invalid-app-credential") {
      throw new Error(
        "Phone authentication is not enabled in Firebase Console. Please enable Phone sign-in method in Firebase Console → Authentication → Sign-in method → Phone.",
      );
    }

    if (error.code === "auth/recaptcha-not-enabled") {
      throw new Error(
        "Phone authentication is not properly configured. Please contact support.",
      );
    }

    if (
      error.code === "auth/missing-recaptcha-token" ||
      error.code === "auth/invalid-recaptcha-token"
    ) {
      throw new Error(
        "reCAPTCHA verification failed. Please refresh the page and try again.",
      );
    }

    if (error.code === "auth/too-many-requests") {
      throw new Error("Too many attempts. Please wait before trying again.");
    }

    throw new Error(getAuthErrorMessage(error.code || "auth/unknown-error"));
  }
};

// Verify OTP and sign in
export const verifyOTP = async (
  confirmationResult: ConfirmationResult,
  otp: string,
): Promise<FirebaseUser> => {
  console.log(`[verifyOTP] Initiated for OTP: ${otp}`);
  const startTime = Date.now();

  try {
    console.log(`[verifyOTP] Attempting to confirm OTP with Firebase...`);
    const confirmStartTime = Date.now();

    const result = await confirmationResult.confirm(otp);

    const confirmEndTime = Date.now();
    console.log(`[verifyOTP] Firebase confirmationResult.confirm() took ${confirmEndTime - confirmStartTime}ms.`);

    console.log("[verifyOTP] OTP verification successful, user:", result.user);
    const endTime = Date.now();
    console.log(`[verifyOTP] Total execution time: ${endTime - startTime}ms.`);
    return result.user;
  } catch (error: any) {
    const errorTime = Date.now();
    console.error(
      `[verifyOTP] Error verifying OTP: ${otp}. Error code: ${error.code}, Message: ${error.message}. Time to error: ${errorTime - startTime}ms.`,
      error,
    );
    throw error;
  }
};

// Check if user exists in database
export const checkUserExists = async (
  phoneNumber: string,
): Promise<User | null> => {
  try {
    if (!isFirebaseReady) {
      return null;
    }
    console.log("Checking user existence for phone number:", phoneNumber);

    const formattedPhone = phoneNumber.startsWith("+")
      ? phoneNumber
      : `+91${phoneNumber}`;

    const q = query(
      collection(db, "users"),
      where("phoneNumber", "==", formattedPhone),
    );

    const querySnapshot = await getDocs(q);
    console.log(querySnapshot, "Query Snapshot");

    if (!querySnapshot.empty) {
      const userDoc = querySnapshot.docs[0];
      return { ...userDoc.data(), uid: userDoc.id } as User;
    }

    return null;
  } catch (error) {
    console.error("Error checking user existence:", error);
    return null;
  }
};

// Create user profile after phone authentication
export const createUserProfile = async (
  user: FirebaseUser,
  displayName: string,
  termsAccepted: boolean,
): Promise<User> => {
  try {
    if (!isFirebaseReady) {
      throw new Error("Firebase not configured");
    }

    // Update Firebase profile
    await updateProfile(user, { displayName });

    // Create user document in Firestore
    const userData: User = {
      uid: user.uid,
      phoneNumber: user.phoneNumber || "",
      displayName: displayName.trim(),
      coins: 100, // Starting coins
      lives: 3, // Starting lives
      totalStars: 0,
      currentLevel: 1,
      unlockedCategories: ["general-knowledge"], // Starting with one category
      powers: {
        fiftyFifty: 2,
        flip: 1,
        expertPoll: 1,
      },
      streak: 0,
      lastLoginDate: new Date().toISOString(),
      totalGamesPlayed: 0,
      totalCorrectAnswers: 0,
      achievements: [],
      isSubscriber: false, // Default to non-subscriber
      profileCreated: true,
      termsAccepted,
      secondConsentCompleted: false,
    };

    await setDoc(doc(db, "users", user.uid), userData);
    return userData;
  } catch (error) {
    console.error("Error creating user profile:", error);
    throw error;
  }
};

// Update user data
export const updateUserData = async (uid: string, updates: Partial<User>) => {
  try {
    if (!isFirebaseReady) {
      throw new Error("Firebase not configured");
    }

    await updateDoc(doc(db, "users", uid), {
      ...updates,
      lastLoginDate: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Error updating user data:", error);
    throw error;
  }
};

// Get user data
export const getUserData = async (uid: string): Promise<User | null> => {
  try {
    if (!isFirebaseReady) {
      return null;
    }

    const userDoc = await getDoc(doc(db, "users", uid));
    if (userDoc.exists()) {
      return userDoc.data() as User;
    }
    return null;
  } catch (error) {
    console.error("Error getting user data:", error);
    return null;
  }
};

// Check subscription status
export const checkSubscriptionStatus = async (
  uid: string,
): Promise<boolean> => {
  try {
    const userData = await getUserData(uid);
    return userData?.isSubscriber || false;
  } catch (error) {
    console.error("Error checking subscription status:", error);
    return false;
  }
};

// Update subscription status
export const updateSubscriptionStatus = async (
  uid: string,
  isSubscriber: boolean,
) => {
  try {
    await updateUserData(uid, { isSubscriber });
  } catch (error) {
    console.error("Error updating subscription status:", error);
    throw error;
  }
};

// Complete second consent (for new users)
export const completeSecondConsent = async (uid: string) => {
  try {
    await updateUserData(uid, { secondConsentCompleted: true });
  } catch (error) {
    console.error("Error completing second consent:", error);
    throw error;
  }
};

// Get auth error message
export const getAuthErrorMessage = (errorCode: string): string => {
  switch (errorCode) {
    case "auth/invalid-app-credential":
      return "Phone authentication is not enabled in Firebase Console. Please enable Phone sign-in method.";
    case "auth/invalid-phone-number":
      return "Please enter a valid phone number.";
    case "auth/missing-phone-number":
      return "Phone number is required.";
    case "auth/quota-exceeded":
      return "SMS quota exceeded. Please try again later.";
    case "auth/user-disabled":
      return "This account has been disabled.";
    case "auth/operation-not-allowed":
      return "Phone authentication is not enabled.";
    case "auth/invalid-verification-code":
      return "Invalid OTP. Please check and try again.";
    case "auth/invalid-verification-id":
      return "Invalid verification ID. Please request a new OTP.";
    case "auth/code-expired":
      return "OTP has expired. Please request a new one.";
    case "auth/too-many-requests":
      return "Too many requests. Please try again later.";
    case "auth/network-request-failed":
      return "Network error. Please check your connection.";
    // reCAPTCHA related errors
    case "auth/missing-recaptcha-token":
      return "reCAPTCHA challenge not completed. Please refresh and try again.";
    case "auth/invalid-recaptcha-token":
    case "auth/captcha-check-failed": // Grouping similar reCAPTCHA failures
      return "reCAPTCHA verification failed. Please try again or ensure you're not a robot!";
    case "auth/recaptcha-not-enabled":
      return "reCAPTCHA is not enabled for this project. Please contact support."; // Should be rare if setup is correct
    default:
      return "An unexpected error occurred. Please try again.";
  }
};

// Clean up recaptcha with better error handling
export const cleanupRecaptcha = () => {
  try {
    if (recaptchaVerifier) {
      recaptchaVerifier.clear();
      recaptchaVerifier = null;
    }

    // Also clean up the container
    const container = document.getElementById("recaptcha-container");
    if (container) {
      container.innerHTML = "";
    }
  } catch (error) {
    console.warn("Error cleaning up reCAPTCHA:", error);
    recaptchaVerifier = null;
  }
};
