"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/components/providers/AuthProvider";
import { isFirebaseReady } from "@/lib/firebase";

export const AuthDebug: React.FC = () => {
  const { user, userData, loading } = useAuth();

  return (
    <Card className="bg-slate-900/80 border-slate-700 backdrop-blur-xl">
      <CardHeader>
        <CardTitle className="text-white">🔍 Auth Debug Info</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="p-3 bg-slate-800/50 rounded-lg">
            <h4 className="text-white font-semibold mb-2">System Status</h4>
            <div className="space-y-1 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-300">Firebase Ready:</span>
                <span
                  className={
                    isFirebaseReady ? "text-green-400" : "text-red-400"
                  }
                >
                  {isFirebaseReady ? "Yes" : "No (Demo Mode)"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">Loading:</span>
                <span
                  className={loading ? "text-yellow-400" : "text-green-400"}
                >
                  {loading ? "Yes" : "No"}
                </span>
              </div>
            </div>
          </div>

          <div className="p-3 bg-slate-800/50 rounded-lg">
            <h4 className="text-white font-semibold mb-2">Auth State</h4>
            <div className="space-y-1 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-300">User Object:</span>
                <span className={user ? "text-green-400" : "text-red-400"}>
                  {user ? "Present" : "Null"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">User Data:</span>
                <span className={userData ? "text-green-400" : "text-red-400"}>
                  {userData ? "Present" : "Null"}
                </span>
              </div>
            </div>
          </div>
        </div>

        {user && (
          <div className="p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
            <h4 className="text-white font-semibold mb-2">User Info</h4>
            <div className="space-y-1 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-300">UID:</span>
                <span className="text-white font-mono text-xs">{user.uid}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">Email:</span>
                <span className="text-white">{user.email}</span>
              </div>
              {user.displayName && (
                <div className="flex justify-between">
                  <span className="text-gray-300">Display Name:</span>
                  <span className="text-white">{user.displayName}</span>
                </div>
              )}
            </div>
          </div>
        )}

        {userData && (
          <div className="p-3 bg-green-500/10 rounded-lg border border-green-500/20">
            <h4 className="text-white font-semibold mb-2">User Data</h4>
            <div className="space-y-1 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-300">Coins:</span>
                <span className="text-yellow-400">{userData.coins}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">Lives:</span>
                <span className="text-red-400">{userData.lives}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">Level:</span>
                <span className="text-purple-400">{userData.currentLevel}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">Total Stars:</span>
                <span className="text-yellow-400">{userData.totalStars}</span>
              </div>
            </div>
          </div>
        )}

        {!user && !loading && (
          <div className="p-3 bg-red-500/10 rounded-lg border border-red-500/20">
            <h4 className="text-white font-semibold mb-2">
              ❌ Not Authenticated
            </h4>
            <p className="text-red-200 text-sm mb-3">
              User is not signed in. This could be because:
            </p>
            <ul className="text-red-200 text-sm space-y-1 list-disc list-inside">
              <li>User hasn't signed up/in yet</li>
              <li>Session expired</li>
              <li>Demo mode not working properly</li>
            </ul>
          </div>
        )}

        <div className="flex gap-2">
          <Button
            size="sm"
            onClick={() => window.location.reload()}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            🔄 Refresh Page
          </Button>
          <Button
            size="sm"
            onClick={() => (window.location.href = "/")}
            className="bg-purple-600 hover:bg-purple-700 text-white"
          >
            🏠 Go Home
          </Button>
          <Button
            size="sm"
            onClick={() => (window.location.href = "/test")}
            className="bg-green-600 hover:bg-green-700 text-white"
          >
            🧪 Test Auth
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
