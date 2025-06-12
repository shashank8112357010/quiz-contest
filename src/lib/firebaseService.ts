// Updated firebaseService to use localStorage authentication
import { localStorageAuth } from "./localStorageAuth";
import { User, QuizSession } from "../../lib/store";

// Auth Services - now using localStorage
export const signUp = async (
  email: string,
  password: string,
  displayName: string,
) => {
  try {
    return await localStorageAuth.signUp(email, password, displayName);
  } catch (error) {
    throw error;
  }
};

export const signIn = async (email: string, password: string) => {
  try {
    return await localStorageAuth.signIn(email, password);
  } catch (error) {
    throw error;
  }
};

export const signOut = async () => {
  try {
    await localStorageAuth.signOut();
  } catch (error) {
    throw error;
  }
};

// User Data Services
export const getUserData = async (uid: string): Promise<User | null> => {
  try {
    return await localStorageAuth.getUserData(uid);
  } catch (error) {
    console.error("Error getting user data:", error);
    return null;
  }
};

export const updateUserData = async (uid: string, updates: Partial<User>) => {
  try {
    await localStorageAuth.updateUserData(uid, updates);
  } catch (error) {
    console.error("Error updating user data:", error);
    throw error;
  }
};

export const updateUserCoins = async (uid: string, amount: number) => {
  try {
    await localStorageAuth.updateUserCoins(uid, amount);
  } catch (error) {
    console.error("Error updating user coins:", error);
    throw error;
  }
};

export const updateUserLives = async (uid: string, amount: number) => {
  try {
    await localStorageAuth.updateUserLives(uid, amount);
  } catch (error) {
    console.error("Error updating user lives:", error);
    throw error;
  }
};

export const unlockCategory = async (uid: string, categoryId: string) => {
  try {
    await localStorageAuth.unlockCategory(uid, categoryId);
  } catch (error) {
    console.error("Error unlocking category:", error);
    throw error;
  }
};

// Quiz Session Services
export const saveQuizSession = async (session: QuizSession) => {
  try {
    await localStorageAuth.saveQuizSession(session);
  } catch (error) {
    console.error("Error saving quiz session:", error);
    throw error;
  }
};

export const getUserSessions = async (
  uid: string,
  limit_count: number = 10,
): Promise<QuizSession[]> => {
  try {
    return await localStorageAuth.getUserSessions(uid, limit_count);
  } catch (error) {
    console.error("Error getting user sessions:", error);
    return [];
  }
};

// Leaderboard Services
export const getLeaderboard = async (limit_count: number = 10) => {
  try {
    return await localStorageAuth.getLeaderboard(limit_count);
  } catch (error) {
    console.error("Error getting leaderboard:", error);
    return [];
  }
};

// Daily Login Bonus
export const claimDailyBonus = async (uid: string) => {
  try {
    return await localStorageAuth.claimDailyBonus(uid);
  } catch (error) {
    console.error("Error claiming daily bonus:", error);
    return { claimed: false, amount: 0 };
  }
};

// Achievement System
export const unlockAchievement = async (uid: string, achievementId: string) => {
  try {
    return await localStorageAuth.unlockAchievement(uid, achievementId);
  } catch (error) {
    console.error("Error unlocking achievement:", error);
    return { unlocked: false, reward: 0 };
  }
};

// Lucky Spin System
export interface SpinReward {
  type: "coins" | "lives" | "power";
  amount: number;
  powerType?: "fiftyFifty" | "flip" | "expertPoll";
}

export const weeklySpinAvailable = async (uid: string): Promise<boolean> => {
  try {
    return await localStorageAuth.weeklySpinAvailable(uid);
  } catch (error) {
    console.error("Error checking spin availability:", error);
    return false;
  }
};

export const performWeeklySpin = async (
  uid: string,
): Promise<SpinReward | null> => {
  try {
    return await localStorageAuth.performWeeklySpin(uid);
  } catch (error) {
    console.error("Error performing weekly spin:", error);
    return null;
  }
};
