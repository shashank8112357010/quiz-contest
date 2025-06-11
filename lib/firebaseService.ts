import {
  collection,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  addDoc,
  query,
  where,
  orderBy,
  limit,
  getDocs,
  serverTimestamp,
  Timestamp,
} from "firebase/firestore";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  updateProfile,
  User as FirebaseUser,
} from "firebase/auth";
import { auth, db } from "./firebase";
import { User, QuizSession } from "./store";

// Auth Services
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
    await updateProfile(userCredential.user, { displayName });

    // Create user document in Firestore
    const userData: User = {
      uid: userCredential.user.uid,
      email: userCredential.user.email || "",
      displayName: displayName,
      coins: 100, // Starting coins
      lives: 3, // Starting lives
      totalStars: 0,
      currentLevel: 1,
      unlockedCategories: ["general-knowledge", "animals"], // Starting categories
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
    };

    await setDoc(doc(db, "users", userCredential.user.uid), userData);
    return { user: userCredential.user, userData };
  } catch (error) {
    throw error;
  }
};

export const signIn = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password,
    );

    // Update last login date
    await updateDoc(doc(db, "users", userCredential.user.uid), {
      lastLoginDate: new Date().toISOString(),
    });

    return userCredential.user;
  } catch (error) {
    throw error;
  }
};

export const signOut = async () => {
  try {
    await firebaseSignOut(auth);
  } catch (error) {
    throw error;
  }
};

// User Data Services
export const getUserData = async (uid: string): Promise<User | null> => {
  try {
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

export const updateUserData = async (uid: string, updates: Partial<User>) => {
  try {
    await updateDoc(doc(db, "users", uid), updates);
  } catch (error) {
    console.error("Error updating user data:", error);
    throw error;
  }
};

export const updateUserCoins = async (uid: string, amount: number) => {
  try {
    const userDoc = await getDoc(doc(db, "users", uid));
    if (userDoc.exists()) {
      const currentCoins = userDoc.data().coins || 0;
      await updateDoc(doc(db, "users", uid), {
        coins: currentCoins + amount,
      });
    }
  } catch (error) {
    console.error("Error updating user coins:", error);
    throw error;
  }
};

export const updateUserLives = async (uid: string, amount: number) => {
  try {
    const userDoc = await getDoc(doc(db, "users", uid));
    if (userDoc.exists()) {
      const currentLives = userDoc.data().lives || 0;
      await updateDoc(doc(db, "users", uid), {
        lives: Math.max(0, currentLives + amount),
      });
    }
  } catch (error) {
    console.error("Error updating user lives:", error);
    throw error;
  }
};

export const unlockCategory = async (uid: string, categoryId: string) => {
  try {
    const userDoc = await getDoc(doc(db, "users", uid));
    if (userDoc.exists()) {
      const currentCategories = userDoc.data().unlockedCategories || [];
      if (!currentCategories.includes(categoryId)) {
        await updateDoc(doc(db, "users", uid), {
          unlockedCategories: [...currentCategories, categoryId],
        });
      }
    }
  } catch (error) {
    console.error("Error unlocking category:", error);
    throw error;
  }
};

// Quiz Session Services
export const saveQuizSession = async (session: QuizSession) => {
  try {
    const sessionData = {
      ...session,
      startTime: Timestamp.fromDate(session.startTime),
      endTime: session.endTime ? Timestamp.fromDate(session.endTime) : null,
      createdAt: serverTimestamp(),
    };

    await addDoc(collection(db, "quizSessions"), sessionData);
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
    const q = query(
      collection(db, "quizSessions"),
      where("userId", "==", uid),
      orderBy("createdAt", "desc"),
      limit(limit_count),
    );

    const querySnapshot = await getDocs(q);
    const sessions: QuizSession[] = [];

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      sessions.push({
        ...data,
        startTime: data.startTime.toDate(),
        endTime: data.endTime ? data.endTime.toDate() : undefined,
      } as QuizSession);
    });

    return sessions;
  } catch (error) {
    console.error("Error getting user sessions:", error);
    return [];
  }
};

// Leaderboard Services
export const getLeaderboard = async (limit_count: number = 10) => {
  try {
    const q = query(
      collection(db, "users"),
      orderBy("totalStars", "desc"),
      limit(limit_count),
    );

    const querySnapshot = await getDocs(q);
    const leaderboard: any[] = [];

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      leaderboard.push({
        uid: doc.id,
        displayName: data.displayName,
        totalStars: data.totalStars,
        currentLevel: data.currentLevel,
        avatar: data.avatar,
        score: data.coins * data.totalStars, // Score calculation
      });
    });

    return leaderboard;
  } catch (error) {
    console.error("Error getting leaderboard:", error);
    return [];
  }
};

// Daily Login Bonus
export const claimDailyBonus = async (uid: string) => {
  try {
    const userDoc = await getDoc(doc(db, "users", uid));
    if (userDoc.exists()) {
      const userData = userDoc.data();
      const lastLogin = userData.lastLoginDate;
      const today = new Date().toISOString().split("T")[0];
      const lastLoginDate = lastLogin ? lastLogin.split("T")[0] : null;

      if (lastLoginDate !== today) {
        // Award daily bonus
        const bonusCoins = 25;
        const currentCoins = userData.coins || 0;

        await updateDoc(doc(db, "users", uid), {
          coins: currentCoins + bonusCoins,
          lastLoginDate: new Date().toISOString(),
        });

        return { claimed: true, amount: bonusCoins };
      }
    }

    return { claimed: false, amount: 0 };
  } catch (error) {
    console.error("Error claiming daily bonus:", error);
    return { claimed: false, amount: 0 };
  }
};

// Achievement System
export const unlockAchievement = async (uid: string, achievementId: string) => {
  try {
    const userDoc = await getDoc(doc(db, "users", uid));
    if (userDoc.exists()) {
      const currentAchievements = userDoc.data().achievements || [];
      if (!currentAchievements.includes(achievementId)) {
        await updateDoc(doc(db, "users", uid), {
          achievements: [...currentAchievements, achievementId],
        });

        // Award coins for achievement
        const achievementRewards: { [key: string]: number } = {
          first_correct: 10,
          streak_5: 25,
          streak_10: 50,
          level_10: 100,
          category_master: 200,
        };

        const reward = achievementRewards[achievementId] || 0;
        if (reward > 0) {
          await updateUserCoins(uid, reward);
        }

        return { unlocked: true, reward };
      }
    }

    return { unlocked: false, reward: 0 };
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
    const userDoc = await getDoc(doc(db, "users", uid));
    if (userDoc.exists()) {
      const lastSpin = userDoc.data().lastWeeklySpin;
      if (!lastSpin) return true;

      const lastSpinDate = new Date(lastSpin);
      const now = new Date();
      const weeksSinceLastSpin = Math.floor(
        (now.getTime() - lastSpinDate.getTime()) / (7 * 24 * 60 * 60 * 1000),
      );

      return weeksSinceLastSpin >= 1;
    }
    return false;
  } catch (error) {
    console.error("Error checking spin availability:", error);
    return false;
  }
};

export const performWeeklySpin = async (
  uid: string,
): Promise<SpinReward | null> => {
  try {
    const available = await weeklySpinAvailable(uid);
    if (!available) return null;

    // Define possible rewards
    const rewards: SpinReward[] = [
      { type: "coins", amount: 50 },
      { type: "coins", amount: 100 },
      { type: "coins", amount: 200 },
      { type: "lives", amount: 1 },
      { type: "lives", amount: 2 },
      { type: "power", amount: 1, powerType: "fiftyFifty" },
      { type: "power", amount: 1, powerType: "flip" },
      { type: "power", amount: 1, powerType: "expertPoll" },
    ];

    // Random selection
    const reward = rewards[Math.floor(Math.random() * rewards.length)];

    // Apply reward
    const userDoc = await getDoc(doc(db, "users", uid));
    if (userDoc.exists()) {
      const userData = userDoc.data();
      const updates: any = {
        lastWeeklySpin: new Date().toISOString(),
      };

      if (reward.type === "coins") {
        updates.coins = (userData.coins || 0) + reward.amount;
      } else if (reward.type === "lives") {
        updates.lives = (userData.lives || 0) + reward.amount;
      } else if (reward.type === "power" && reward.powerType) {
        updates[`powers.${reward.powerType}`] =
          (userData.powers?.[reward.powerType] || 0) + reward.amount;
      }

      await updateDoc(doc(db, "users", uid), updates);
    }

    return reward;
  } catch (error) {
    console.error("Error performing weekly spin:", error);
    return null;
  }
};
