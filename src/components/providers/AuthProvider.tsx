"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { User as FirebaseUser, onAuthStateChanged } from "firebase/auth";
import { auth, isFirebaseReady } from "@/lib/firebase";
import { getUserData } from "@/lib/firebaseService";
import { demoAuth } from "@/lib/demoAuth";
import { User } from "@/lib/store";

interface AuthContextType {
  user: FirebaseUser | null;
  userData: User | null;
  loading: boolean;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  userData: null,
  loading: true,
  signOut: async () => {},
});

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [userData, setUserData] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let unsubscribe: () => void;

    if (isFirebaseReady) {
      // Use real Firebase auth
      unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
        setUser(firebaseUser);

        if (firebaseUser) {
          try {
            const data = await getUserData(firebaseUser.uid);
            setUserData(data);
          } catch (error) {
            console.error("Error fetching user data:", error);
            setUserData(null);
          }
        } else {
          setUserData(null);
        }

        setLoading(false);
      });
    } else {
      // Use demo auth
      console.log("🚀 Running in DEMO mode - Firebase not configured");
      unsubscribe = demoAuth.onAuthStateChanged(async (demoUser) => {
        setUser(demoUser as any);

        if (demoUser) {
          try {
            const data = await demoAuth.getUserData(demoUser.uid);
            setUserData(data);
          } catch (error) {
            console.error("Error fetching demo user data:", error);
            setUserData(null);
          }
        } else {
          setUserData(null);
        }

        setLoading(false);
      });
    }

    return () => unsubscribe();
  }, []);

  const handleSignOut = async () => {
    try {
      if (isFirebaseReady) {
        await auth.signOut();
      } else {
        await demoAuth.signOut();
      }
      setUser(null);
      setUserData(null);
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const value = {
    user,
    userData,
    loading,
    signOut: handleSignOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
