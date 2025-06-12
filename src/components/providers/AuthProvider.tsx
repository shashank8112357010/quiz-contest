"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { localStorageAuth } from "@/lib/localStorageAuth";
import { User } from "../../../lib/store";

interface AuthUser {
  uid: string;
  email: string;
  displayName: string;
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
    console.log("🚀 Running with localStorage authentication");

    const unsubscribe = localStorageAuth.onAuthStateChanged(
      async (authUser) => {
        setUser(authUser);

        if (authUser) {
          try {
            const data = await localStorageAuth.getUserData(authUser.uid);
            setUserData(data);
          } catch (error) {
            console.error("Error fetching user data:", error);
            setUserData(null);
          }
        } else {
          setUserData(null);
        }

        setLoading(false);
      },
    );

    return () => unsubscribe();
  }, []);

  const handleSignOut = async () => {
    try {
      await localStorageAuth.signOut();
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
