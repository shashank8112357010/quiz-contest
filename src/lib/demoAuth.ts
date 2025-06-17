// Demo authentication service for development/demo mode
import { User } from "./store";

interface DemoUser {
  uid: string;
  email: string;
  displayName: string;
}

class DemoAuthService {
  private currentUser: DemoUser | null = null;
  private users: Map<
    string,
    { user: DemoUser; userData: User; password: string }
  > = new Map();

  constructor() {
    // Add some demo users
    this.addDemoUser("demo@quiz2play.com", "demo123", "Demo Player");
    this.addDemoUser("test@example.com", "test123", "Test User");
  }

  private addDemoUser(email: string, password: string, displayName: string) {
    const uid = `demo-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const user: DemoUser = { uid, email, displayName };
    const userData: User = {
      uid,
      email,
      displayName,
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
    this.users.set(email, { user, userData, password });
  }

  async signUp(email: string, password: string, displayName: string) {
    // Check if user already exists
    if (this.users.has(email)) {
      throw new Error("auth/email-already-in-use");
    }

    // Simulate Firebase validation
    if (password.length < 6) {
      throw new Error("auth/weak-password");
    }

    if (!email.includes("@")) {
      throw new Error("auth/invalid-email");
    }

    // Create new demo user
    this.addDemoUser(email, password, displayName);
    const userData = this.users.get(email)!;
    this.currentUser = userData.user;

    return {
      user: userData.user,
      userData: userData.userData,
    };
  }

  async signIn(email: string, password: string) {
    const userData = this.users.get(email);

    if (!userData) {
      throw new Error("auth/user-not-found");
    }

    if (userData.password !== password) {
      throw new Error("auth/wrong-password");
    }

    this.currentUser = userData.user;
    return userData.user;
  }

  async signOut() {
    this.currentUser = null;
  }

  getCurrentUser(): DemoUser | null {
    return this.currentUser;
  }

  async getUserData(uid: string): Promise<User | null> {
    for (const [email, data] of this.users.entries()) {
      if (data.user.uid === uid) {
        return data.userData;
      }
    }
    return null;
  }

  async updateUserData(uid: string, updates: Partial<User>) {
    for (const [email, data] of this.users.entries()) {
      if (data.user.uid === uid) {
        data.userData = { ...data.userData, ...updates };
        return;
      }
    }
  }

  // Simulate auth state change
  onAuthStateChanged(callback: (user: DemoUser | null) => void) {
    // Call immediately with current state
    callback(this.currentUser);

    // Return unsubscribe function
    return () => {};
  }
}

export const demoAuth = new DemoAuthService();
