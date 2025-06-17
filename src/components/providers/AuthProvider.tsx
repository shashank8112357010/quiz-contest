"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import {
  onAuthStateChanged,
  User as FirebaseUser,
  signOut as firebaseSignOut,
} from "firebase/auth";
import { auth, db, isFirebaseReady } from "@/lib/firebase"; // Added db
import { doc, onSnapshot } from "firebase/firestore"; // Added doc and onSnapshot
// import { getUserData } from "@/lib/phoneAuth"; // No longer directly used here
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
    let unsubscribeFirestore: (() => void) | null = null; // To store Firestore listener unsubscribe

    const unsubscribeAuth = onAuthStateChanged(auth, (firebaseUser) => {
      setLoading(true); // Set loading true when auth state might change

      // Clean up previous Firestore listener if any
      if (unsubscribeFirestore) {
        unsubscribeFirestore();
        unsubscribeFirestore = null;
      }

      if (firebaseUser) {
        // Set simplified AuthUser based on FirebaseUser
        const authUser: AuthUser = {
          uid: firebaseUser.uid,
          phoneNumber: firebaseUser.phoneNumber || undefined,
          email: firebaseUser.email || undefined,
          displayName: firebaseUser.displayName || undefined,
        };
        setUser(authUser);

        const userDocRef = doc(db, "users", firebaseUser.uid);

        unsubscribeFirestore = onSnapshot(
          userDocRef,
          (docSnap) => {
            if (docSnap.exists()) {
              setUserData({ uid: docSnap.id, ...docSnap.data() } as User);
              console.log("AuthProvider: User data updated from Firestore snapshot:", docSnap.data());
            } else {
              setUserData(null);
              console.log("AuthProvider: User document does not exist in Firestore.");
            }
            setLoading(false);
          },
          (error) => {
            console.error("AuthProvider: Error listening to user document:", error);
            setUserData(null);
            setLoading(false);
          }
        );
      } else {
        setUser(null);
        setUserData(null);
        if (unsubscribeFirestore) { // Ensure cleanup if user logs out
          unsubscribeFirestore();
          unsubscribeFirestore = null;
        }
        setLoading(false);
      }
    });

    return () => {
      unsubscribeAuth();
      if (unsubscribeFirestore) {
        unsubscribeFirestore();
      }
    };
  }, []); // Empty dependency array means this runs once on mount and cleans up on unmount

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
