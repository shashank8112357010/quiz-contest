"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import {
  onAuthStateChanged,
  User as FirebaseUser,
  signOut as firebaseSignOut,
} from "firebase/auth";
import { auth, isFirebaseReady } from "@/lib/firebase";
import { getUserData } from "@/lib/phoneAuth";
import { User } from "@/lib/store";

interface AuthUser {
  uid: string;
  phoneNumber?: string;
  email?: string;
  displayName?: string;
}

interface AuthContextType {
  user: AuthUser | null;
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
  const [user, setUser] = useState<AuthUser | null>(null);
  const [userData, setUserData] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let unsubscribe = () => {}; // Default to no-op

    if (isFirebaseReady) {
      console.log("🚀 Running with Firebase authentication");
      unsubscribe = onAuthStateChanged(
        auth,
        async (firebaseUser: FirebaseUser | null) => {
          if (firebaseUser) {
            const authUser: AuthUser = {
              uid: firebaseUser.uid,
              phoneNumber: firebaseUser.phoneNumber || undefined,
              email: firebaseUser.email || undefined,
              displayName: firebaseUser.displayName || undefined,
            };
            setUser(authUser);

            try {
              const data = await getUserData(firebaseUser.uid);
              setUserData(data);
            } catch (error) {
              console.error("Error fetching user data:", error);
              setUserData(null);
            }
          } else {
            setUser(null);
            setUserData(null);
          }
          setLoading(false);
        }
      );
    } else {
      console.warn(
        "Firebase not configured. AuthProvider will not be able to authenticate."
      );
      setLoading(false); // Ensure loading state is updated
    }

    return () => {
      try {
        unsubscribe();
      } catch (error) {
        console.warn("Error during auth cleanup:", error);
      }
    };
  }, []);

  const handleSignOut = async () => {
    try {
      if (isFirebaseReady) { // Or simply assume auth is available if this function is called
        await firebaseSignOut(auth);
      } else {
        console.warn("Firebase not ready, cannot sign out effectively.");
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
