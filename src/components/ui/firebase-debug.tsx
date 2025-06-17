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
            <strong>Troubleshooting Tips:</strong>
          </p>
          <ul className="list-disc list-inside space-y-1 mt-2">
            <li>
              Ensure your domain is added to Firebase Console → Authentication →
              Settings → Authorized domains
            </li>
            <li>
              Check that phone authentication is enabled in Firebase Console
            </li>
            <li>
              Verify your Firebase project configuration matches these values
            </li>
            <li>Make sure reCAPTCHA is not blocked by browser/extensions</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};
