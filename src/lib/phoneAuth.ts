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
  return new Promise((resolve, reject) => {
    try {
      if (!isFirebaseReady) {
        reject(new Error("Firebase not configured"));
        return;
      }

      // Clear existing verifier first
      cleanupRecaptcha();

      // Ensure recaptcha container exists
      let container = document.getElementById("recaptcha-container");
      if (!container) {
        container = document.createElement("div");
        container.id = "recaptcha-container";
        container.style.display = "none";
        document.body.appendChild(container);
      }

      // Create new verifier with improved settings
      recaptchaVerifier = new RecaptchaVerifier(auth, "recaptcha-container", {
        size: "invisible",
        callback: (response: string) => {
          console.log("reCAPTCHA solved successfully");
        },
        "expired-callback": () => {
          console.log("reCAPTCHA expired, cleaning up");
          cleanupRecaptcha();
        },
        "error-callback": (error: any) => {
          console.error("reCAPTCHA error:", error);
          cleanupRecaptcha();
        },
      });

      recaptchaVerifier
        .render()
        .then(() => {
          console.log("reCAPTCHA rendered successfully");
          resolve(recaptchaVerifier!);
        })
        .catch((error) => {
          console.error("reCAPTCHA render failed:", error);
          cleanupRecaptcha();
          reject(new Error("Failed to initialize reCAPTCHA"));
        });
    } catch (error) {
      console.error("reCAPTCHA initialization error:", error);
      cleanupRecaptcha();
      reject(error);
    }
  });
};

// Send OTP to phone number with improved error handling and fallback
export const sendOTP = async (
  phoneNumber: string,
): Promise<ConfirmationResult | "demo"> => {
  try {
    if (!isFirebaseReady) {
      console.warn("Firebase not ready, using demo mode");
      return "demo";
    }

    // Format phone number (ensure it starts with country code)
    const formattedPhone = phoneNumber.startsWith("+")
      ? phoneNumber
      : `+91${phoneNumber}`;

    console.log("Sending OTP to:", formattedPhone);

    // Always initialize fresh reCAPTCHA for each OTP request
    cleanupRecaptcha();

    try {
      await initializeRecaptcha();
    } catch (recaptchaError) {
      console.warn("reCAPTCHA failed, using demo mode", recaptchaError);
      return "demo";
    }

    if (!recaptchaVerifier) {
      console.warn("No reCAPTCHA verifier, using demo mode");
      return "demo";
    }

    // Send SMS with timeout
    const confirmationResult = await Promise.race([
      signInWithPhoneNumber(auth, formattedPhone, recaptchaVerifier),
      new Promise<never>((_, reject) =>
        setTimeout(() => reject(new Error("OTP request timeout")), 15000),
      ),
    ]);

    console.log("OTP sent successfully");
    return confirmationResult;
  } catch (error: any) {
    console.error("Error sending OTP:", error);
    cleanupRecaptcha();

    // Instead of throwing error, return demo mode for better UX
    console.warn("OTP sending failed, falling back to demo mode");
    return "demo";
  }
};

// Verify OTP and sign in
export const verifyOTP = async (
  confirmationResult: ConfirmationResult,
  otp: string,
): Promise<FirebaseUser> => {
  try {
    const result = await confirmationResult.confirm(otp);
    return result.user;
  } catch (error: any) {
    console.error("Error verifying OTP:", error);
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
