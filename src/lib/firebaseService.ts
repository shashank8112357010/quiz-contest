import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  updateProfile,
} from "firebase/auth";
import {
  doc,
  setDoc,
  getDoc,
  updateDoc,
  collection,
  addDoc,
  query,
  where,
  getDocs,
  limit,
  orderBy,
  Timestamp,
  arrayUnion,
  increment,
  serverTimestamp, // <-- FIXED: add this import
} from "firebase/firestore";
import { auth, db, storage } from "./firebase"; // Import storage for profile image upload
import { User, QuizSession } from "./store";

import {
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";

// Uploads a profile image to Firebase Storage and returns the download URL
export const uploadProfileImage = async (
  uid: string,
  file: File,
): Promise<string> => {
  try {
    // Create a unique filename to avoid conflicts
    const timestamp = new Date().getTime();
    const fileExtension = file.name.split(".").pop() || "jpg";
    const fileName = `profile_${timestamp}.${fileExtension}`;

    const fileRef = storageRef(storage, `profileImages/${uid}/${fileName}`);

    console.log("Uploading profile image for user:", uid);
    await uploadBytes(fileRef, file);
    const url = await getDownloadURL(fileRef);
    console.log("Profile image uploaded successfully:", url);
    return url;
  } catch (error) {
    console.error("Error uploading profile image:", error);
    throw new Error(
      `Failed to upload profile image: ${error.message || error}`,
    );
  }
};

// Updates the user's photoURL in Firestore
export const updateUserPhotoURL = async (uid: string, photoURL: string) => {
  try {
    const userDocRef = doc(db, "users", uid);
    await updateDoc(userDocRef, { photoURL, lastModified: serverTimestamp() });
  } catch (error) {
    console.error("Error updating user photoURL in Firestore:", error);
    throw error;
  }
};

// Auth Services - Refactored for Firebase
export const signUp = async (
  email: string,
  password: string,
  displayName: string,
) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password,
    );
    const user = userCredential.user;

    // Update Firebase auth profile for displayName
    await updateProfile(user, { displayName });

    // Create user document in Firestore
    const userDataFromAuth = {
      // Renamed to avoid conflict with User type if imported
      uid: user.uid,
      email: user.email,
      phoneNumber: user.phoneNumber || "", // Ensure phoneNumber is part of the structure if needed
      displayName: displayName,
      photoURL: "/default-avatar.png",
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
      termsAccepted: true, // Defaulting to true for email/password, adjust if form includes this
      secondConsentCompleted: false, // Typically for phone consent
    };
    await setDoc(doc(db, "users", user.uid), userDataFromAuth);

    return userCredential;
  } catch (error) {
    console.error("Error in Firebase signUp:", error);
    throw error; // Re-throw to be caught by UI
  }
};

export const signIn = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password,
    );
    return userCredential;
  } catch (error) {
    console.error("Error in Firebase signIn:", error);
    throw error; // Re-throw to be caught by UI
  }
};

export const signOut = async () => {
  try {
    await firebaseSignOut(auth);
  } catch (error) {
    console.error("Error in Firebase signOut:", error);
    throw error; // Re-throw to be caught by UI
  }
};

// User Data Services
export const getUserData = async (uid: string): Promise<User | null> => {
  try {
    const userDocRef = doc(db, "users", uid);
    const userSnap = await getDoc(userDocRef);
    if (userSnap.exists()) {
      return { uid: userSnap.id, ...userSnap.data() } as User; // Ensure uid is included
    }
    return null;
  } catch (error) {
    console.error("Error getting user data from Firestore:", error);
    throw error; // Or return null based on desired error handling
  }
};

export const updateUserData = async (uid: string, updates: Partial<User>) => {
  try {
    const userDocRef = doc(db, "users", uid);
    const finalUpdates = { ...updates, lastModified: serverTimestamp() };
    await updateDoc(userDocRef, finalUpdates);
  } catch (error) {
    console.error("Error updating user data in Firestore:", error);
    throw error;
  }
};

export const updateUserCoins = async (uid: string, amount: number) => {
  try {
    const userDocRef = doc(db, "users", uid);
    await updateDoc(userDocRef, {
      coins: increment(amount), // amount can be positive or negative
    });
  } catch (error) {
    console.error("Error updating user coins in Firestore:", error);
    throw error;
  }
};

export const updateUserLives = async (uid: string, amount: number) => {
  try {
    const userDocRef = doc(db, "users", uid);
    await updateDoc(userDocRef, {
      lives: increment(amount), // amount can be positive or negative
    });
  } catch (error) {
    console.error("Error updating user lives in Firestore:", error);
    throw error;
  }
};

export const unlockCategory = async (uid: string, categoryId: string) => {
  try {
    const userDocRef = doc(db, "users", uid);
    await updateDoc(userDocRef, {
      unlockedCategories: arrayUnion(categoryId),
    });
  } catch (error) {
    console.error("Error unlocking category in Firestore:", error);
    throw error;
  }
};

// Quiz Session Services
export const saveQuizSession = async (session: QuizSession) => {
  try {
    // Add a server timestamp if not already present
    const sessionWithTimestamp = {
      ...session,
      timestamp: session.timestamp || Timestamp.now(), // Or serverTimestamp() from Firestore
    };
    await addDoc(collection(db, "quizSessions"), sessionWithTimestamp);
  } catch (error) {
    console.error("Error saving quiz session to Firestore:", error);
    throw error;
  }
};

export const getUserSessions = async (
  uid: string,
  limit_count: number = 10,
): Promise<QuizSession[]> => {
  try {
    const sessionsRef = collection(db, "quizSessions");
    const q = query(
      sessionsRef,
      where("uid", "==", uid),
      orderBy("timestamp", "desc"), // Assuming 'timestamp' field exists and is sortable
      limit(limit_count),
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(
      (doc) => ({ id: doc.id, ...doc.data() }) as QuizSession,
    );
  } catch (error) {
    console.error("Error getting user sessions from Firestore:", error);
    return []; // Or throw error
  }
};

// Leaderboard Services
export const getLeaderboard = async (
  limit_count: number = 10,
): Promise<User[]> => {
  try {
    const usersRef = collection(db, "users");
    const q = query(
      usersRef,
      orderBy("totalStars", "desc"),
      limit(limit_count),
    );
    const querySnapshot = await getDocs(q);
    // Filter out users who might not have displayName, or handle appropriately
    return querySnapshot.docs
      .map((doc) => ({ uid: doc.id, ...doc.data() }) as User)
      .filter((user) => user.displayName);
  } catch (error) {
    console.error("Error getting leaderboard from Firestore:", error);
    return []; // Or throw error
  }
};

// Daily Login Bonus
export const claimDailyBonus = async (uid: string) => {
  // try {
  //   return await localStorageAuth.claimDailyBonus(uid);
  // } catch (error) {
  //   console.error("Error claiming daily bonus:", error);
  //   return { claimed: false, amount: 0 };
  // }
  console.error("claimDailyBonus not implemented for Firebase yet.");
  throw new Error("claimDailyBonus not implemented for Firebase yet.");
  // return { claimed: false, amount: 0 }; // Default return
};

// Achievement System
export const unlockAchievement = async (uid: string, achievementId: string) => {
  // try {
  //   return await localStorageAuth.unlockAchievement(uid, achievementId);
  // } catch (error) {
  //   console.error("Error unlocking achievement:", error);
  //   return { unlocked: false, reward: 0 };
  // }
  console.error("unlockAchievement not implemented for Firebase yet.");
  throw new Error("unlockAchievement not implemented for Firebase yet.");
  // return { unlocked: false, reward: 0 }; // Default return
};

// Lucky Spin System
export interface SpinReward {
  type: "coins" | "lives" | "power";
  amount: number;
  powerType?: "fiftyFifty" | "flip" | "expertPoll";
}

export const weeklySpinAvailable = async (uid: string): Promise<boolean> => {
  // try {
  //   return await localStorageAuth.weeklySpinAvailable(uid);
  // } catch (error) {
  //   console.error("Error checking spin availability:", error);
  //   return false;
  // }
  console.error("weeklySpinAvailable not implemented for Firebase yet.");
  throw new Error("weeklySpinAvailable not implemented for Firebase yet.");
  // return false; // Default return
};

export const performWeeklySpin = async (
  uid: string,
): Promise<SpinReward | null> => {
  // try {
  //   return await localStorageAuth.performWeeklySpin(uid);
  // } catch (error) {
  //   console.error("Error performing weekly spin:", error);
  //   return null;
  // }
  console.error("performWeeklySpin not implemented for Firebase yet.");
  throw new Error("performWeeklySpin not implemented for Firebase yet.");
  // return null; // Default return
};
