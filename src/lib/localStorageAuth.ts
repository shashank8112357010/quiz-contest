// localStorage-based authentication service for production use without Firebase


interface StorageUser {
  uid: string;
  email: string;
  displayName: string;
  password: string; // In production, this should be hashed
}

interface AuthUser {
  uid: string;
  email: string;
  displayName: string;
}

class LocalStorageAuthService {
  private currentUser: AuthUser | null = null;
  private authListeners: Array<(user: AuthUser | null) => void> = [];

  constructor() {
    // Load current user from localStorage on initialization
    this.loadCurrentUser();
  }

  private loadCurrentUser() {
    
    try {
      const currentUserData = localStorage.getItem("quiz2play_current_user");
      if (currentUserData) {
        this.currentUser = JSON.parse(currentUserData);
        this.notifyListeners();
      }
    } catch (error) {
      console.error("Error loading current user:", error);
      this.currentUser = null;
    }
  }

  private saveCurrentUser(user: AuthUser | null) {
    try {
      if (user) {
        localStorage.setItem("quiz2play_current_user", JSON.stringify(user));
      } else {
        localStorage.removeItem("quiz2play_current_user");
      }
      this.currentUser = user;
      this.notifyListeners();
    } catch (error) {
      console.error("Error saving current user:", error);
    }
  }

  private notifyListeners() {
    this.authListeners.forEach((listener) => listener(this.currentUser));
  }

  private generateUserId(): string {
    return `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  private getUsersStorage(): Map<string, StorageUser> {
    try {
      const users = localStorage.getItem("quiz2play_users");
      if (users) {
        const usersObj = JSON.parse(users);
        return new Map(Object.entries(usersObj));
      }
    } catch (error) {
      console.error("Error loading users from storage:", error);
    }
    return new Map();
  }

  private saveUsersStorage(users: Map<string, StorageUser>) {
    try {
      const usersObj = Object.fromEntries(users);
      localStorage.setItem("quiz2play_users", JSON.stringify(usersObj));
    } catch (error) {
      console.error("Error saving users to storage:", error);
    }
  }

  private getUserDataStorage(): Map<string, User> {
    try {
      const userData = localStorage.getItem("quiz2play_user_data");
      if (userData) {
        const userDataObj = JSON.parse(userData);
        return new Map(Object.entries(userDataObj));
      }
    } catch (error) {
      console.error("Error loading user data from storage:", error);
    }
    return new Map();
  }

  private saveUserDataStorage(userData: Map<string, User>) {
    try {
      const userDataObj = Object.fromEntries(userData);
      localStorage.setItem("quiz2play_user_data", JSON.stringify(userDataObj));
    } catch (error) {
      console.error("Error saving user data to storage:", error);
    }
  }

  async signUp(email: string, password: string, displayName: string) {
    const users = this.getUsersStorage();

    // Check if user already exists
    for (const [_, user] of users) {
      if (user.email === email) {
        throw new Error("auth/email-already-in-use");
      }
    }

    // Validate input
    if (password.length < 6) {
      throw new Error("auth/weak-password");
    }

    if (!email.includes("@")) {
      throw new Error("auth/invalid-email");
    }

    if (!displayName.trim()) {
      throw new Error("auth/invalid-display-name");
    }

    // Create new user
    const uid = this.generateUserId();
    const newUser: StorageUser = {
      uid,
      email,
      displayName: displayName.trim(),
      password, // In production, this should be hashed
    };

    // Save user credentials
    users.set(uid, newUser);
    this.saveUsersStorage(users);

    // Create user data
    const userData: User = {
      uid,
      email,
      displayName: displayName.trim(),
      coins: 100,
      lives: 3,
      totalStars: 0,
      currentLevel: 1,
      unlockedCategories: ["general-knowledge", "animals"],
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

    // Save user data
    const userDataMap = this.getUserDataStorage();
    userDataMap.set(uid, userData);
    this.saveUserDataStorage(userDataMap);

    // Set as current user
    const authUser: AuthUser = {
      uid,
      email,
      displayName: displayName.trim(),
    };
    this.saveCurrentUser(authUser);

    return {
      user: authUser,
      userData,
    };
  }

  async signIn(email: string, password: string) {
    const users = this.getUsersStorage();

    // Find user by email
    let foundUser: StorageUser | null = null;
    for (const [_, user] of users) {
      if (user.email === email) {
        foundUser = user;
        break;
      }
    }

    if (!foundUser) {
      throw new Error("auth/user-not-found");
    }

    if (foundUser.password !== password) {
      throw new Error("auth/wrong-password");
    }

    // Update last login date
    const userDataMap = this.getUserDataStorage();
    const userData = userDataMap.get(foundUser.uid);
    if (userData) {
      userData.lastLoginDate = new Date().toISOString();
      userDataMap.set(foundUser.uid, userData);
      this.saveUserDataStorage(userDataMap);
    }

    // Set as current user
    const authUser: AuthUser = {
      uid: foundUser.uid,
      email: foundUser.email,
      displayName: foundUser.displayName,
    };
    this.saveCurrentUser(authUser);

    return authUser;
  }

  async signOut() {
    this.saveCurrentUser(null);
  }

  getCurrentUser(): AuthUser | null {
    return this.currentUser;
  }

  async getUserData(uid: string): Promise<User | null> {
    const userDataMap = this.getUserDataStorage();
    return userDataMap.get(uid) || null;
  }

  async updateUserData(uid: string, updates: Partial<User>) {
    const userDataMap = this.getUserDataStorage();
    const existingData = userDataMap.get(uid);

    if (existingData) {
      const updatedData = { ...existingData, ...updates };
      userDataMap.set(uid, updatedData);
      this.saveUserDataStorage(userDataMap);
    }
  }

  async updateUserCoins(uid: string, amount: number) {
    const userData = await this.getUserData(uid);
    if (userData) {
      userData.coins = (userData.coins || 0) + amount;
      await this.updateUserData(uid, { coins: userData.coins });
    }
  }

  async updateUserLives(uid: string, amount: number) {
    const userData = await this.getUserData(uid);
    if (userData) {
      userData.lives = Math.max(0, (userData.lives || 0) + amount);
      await this.updateUserData(uid, { lives: userData.lives });
    }
  }

  async unlockCategory(uid: string, categoryId: string) {
    const userData = await this.getUserData(uid);
    if (userData) {
      const currentCategories = userData.unlockedCategories || [];
      if (!currentCategories.includes(categoryId)) {
        const unlockedCategories = [...currentCategories, categoryId];
        await this.updateUserData(uid, { unlockedCategories });
      }
    }
  }

  async unlockAchievement(uid: string, achievementId: string) {
    const userData = await this.getUserData(uid);
    if (userData) {
      const currentAchievements = userData.achievements || [];
      if (!currentAchievements.includes(achievementId)) {
        const achievements = [...currentAchievements, achievementId];
        await this.updateUserData(uid, { achievements });

        // Award coins for achievement
        const achievementRewards: { [key: string]: number } = {
          welcome: 0,
          first_correct: 10,
          streak_5: 25,
          streak_10: 50,
          level_10: 100,
          category_master: 200,
        };

        const reward = achievementRewards[achievementId] || 0;
        if (reward > 0) {
          await this.updateUserCoins(uid, reward);
        }

        return { unlocked: true, reward };
      }
    }

    return { unlocked: false, reward: 0 };
  }

  async claimDailyBonus(uid: string) {
    const userData = await this.getUserData(uid);
    if (userData) {
      const lastLogin = userData.lastLoginDate;
      const today = new Date().toISOString().split("T")[0];
      const lastLoginDate = lastLogin ? lastLogin.split("T")[0] : null;

      if (lastLoginDate !== today) {
        // Award daily bonus
        const bonusCoins = 25;
        const currentCoins = userData.coins || 0;

        await this.updateUserData(uid, {
          coins: currentCoins + bonusCoins,
          lastLoginDate: new Date().toISOString(),
        });

        return { claimed: true, amount: bonusCoins };
      }
    }

    return { claimed: false, amount: 0 };
  }

  async getLeaderboard(limitCount: number = 10) {
    const userDataMap = this.getUserDataStorage();
    const leaderboard: any[] = [];

    for (const [uid, userData] of userDataMap) {
      leaderboard.push({
        uid,
        displayName: userData.displayName,
        totalStars: userData.totalStars,
        currentLevel: userData.currentLevel,
        avatar: userData.avatar,
        score: (userData.coins || 0) * (userData.totalStars || 0), // Score calculation
      });
    }

    // Sort by total stars (descending)
    leaderboard.sort((a, b) => b.totalStars - a.totalStars);

    return leaderboard.slice(0, limitCount);
  }

  // Auth state change listener
  onAuthStateChanged(callback: (user: AuthUser | null) => void) {
    this.authListeners.push(callback);

    // Call immediately with current state
    callback(this.currentUser);

    // Return unsubscribe function
    return () => {
      const index = this.authListeners.indexOf(callback);
      if (index > -1) {
        this.authListeners.splice(index, 1);
      }
    };
  }

  // Quiz session services (stored in localStorage)
  async saveQuizSession(session: any) {
    try {
      const sessions = this.getQuizSessions();
      sessions.push({
        ...session,
        id: `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        createdAt: new Date().toISOString(),
      });
      localStorage.setItem("quiz2play_sessions", JSON.stringify(sessions));
    } catch (error) {
      console.error("Error saving quiz session:", error);
    }
  }

  async getUserSessions(uid: string, limitCount: number = 10) {
    try {
      const sessions = this.getQuizSessions();
      const userSessions = sessions
        .filter((session) => session.userId === uid)
        .sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
        )
        .slice(0, limitCount);

      return userSessions.map((session) => ({
        ...session,
        startTime: new Date(session.startTime),
        endTime: session.endTime ? new Date(session.endTime) : undefined,
      }));
    } catch (error) {
      console.error("Error getting user sessions:", error);
      return [];
    }
  }

  private getQuizSessions() {
    try {
      const sessions = localStorage.getItem("quiz2play_sessions");
      return sessions ? JSON.parse(sessions) : [];
    } catch (error) {
      console.error("Error loading quiz sessions:", error);
      return [];
    }
  }

  // Weekly spin functionality
  async weeklySpinAvailable(uid: string): Promise<boolean> {
    const userData = await this.getUserData(uid);
    if (userData) {
      const lastSpin = (userData as any).lastWeeklySpin;
      if (!lastSpin) return true;

      const lastSpinDate = new Date(lastSpin);
      const now = new Date();
      const weeksSinceLastSpin = Math.floor(
        (now.getTime() - lastSpinDate.getTime()) / (7 * 24 * 60 * 60 * 1000),
      );

      return weeksSinceLastSpin >= 1;
    }
    return false;
  }

  async performWeeklySpin(uid: string) {
    const available = await this.weeklySpinAvailable(uid);
    if (!available) return null;

    // Define possible rewards
    const rewards = [
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
    const userData = await this.getUserData(uid);
    if (userData) {
      const updates: any = {
        lastWeeklySpin: new Date().toISOString(),
      };

      if (reward.type === "coins") {
        updates.coins = (userData.coins || 0) + reward.amount;
      } else if (reward.type === "lives") {
        updates.lives = (userData.lives || 0) + reward.amount;
      } else if (reward.type === "power" && reward.powerType) {
        updates.powers = {
          ...userData.powers,
          [reward.powerType]:
            (userData.powers?.[reward.powerType] || 0) + reward.amount,
        };
      }

      await this.updateUserData(uid, updates);
    }

    return reward;
  }
}

export const localStorageAuth = new LocalStorageAuthService();
