"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { isFirebaseReady, auth } from "@/lib/firebase";

export const FirebaseDebugInfo = () => {
  const authDomain = auth.app.options.authDomain;
  const projectId = auth.app.options.projectId;

  return (
    <Card className="m-4 bg-slate-900/80 border-slate-700">
      <CardHeader>
        <CardTitle className="text-white">🔥 Firebase Debug Info</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center gap-2">
          <span className="text-white">Firebase Ready:</span>
          <Badge className={isFirebaseReady ? "bg-green-500" : "bg-red-500"}>
            {isFirebaseReady ? "✅ Yes" : "❌ No"}
          </Badge>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-white">Auth Domain:</span>
          <Badge className="bg-blue-500 text-white">{authDomain}</Badge>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-white">Project ID:</span>
          <Badge className="bg-purple-500 text-white">{projectId}</Badge>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-white">Current Domain:</span>
          <Badge className="bg-orange-500 text-white">
            {window.location.hostname}
          </Badge>
        </div>

        <div className="text-xs text-slate-300 mt-4">
          <p>
            <strong>❌ Current Issue: auth/invalid-app-credential</strong>
          </p>
          <p className="text-orange-300 mt-2 mb-3">
            This means Phone Authentication is not enabled in Firebase Console.
          </p>

          <div className="mb-4">
            <a
              href="https://console.firebase.google.com/u/0/project/quiz-20372/authentication/providers"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
            >
              🔧 Enable Phone Auth in Firebase Console
            </a>
          </div>

          <p>
            <strong>Setup Steps:</strong>
          </p>
          <ol className="list-decimal list-inside space-y-1 mt-2">
            <li>Click the link above to open Firebase Console</li>
            <li>Find "Phone" in the sign-in providers list</li>
            <li>Click on "Phone" and toggle Enable to ON</li>
            <li>Click Save</li>
            <li>Come back and test again</li>
          </ol>
        </div>
      </CardContent>
    </Card>
  );
};
