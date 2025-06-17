"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { User, ChevronRight, CheckCircle } from "lucide-react";
import { useAuth } from "@/components/providers/AuthProvider";

export const ProfileAccessCard: React.FC = () => {
  const { user, userData, loading } = useAuth();

  if (loading) {
    return (
      <Card className="bg-slate-900/80 border-slate-700 backdrop-blur-xl">
        <CardContent className="p-6 text-center">
          <div className="animate-pulse text-white">Loading auth status...</div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-gradient-to-r from-blue-900/80 to-purple-900/80 border-blue-500/20 backdrop-blur-xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-white">
          <User className="w-6 h-6 text-blue-400" />
          Profile Access Guide
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {user && userData ? (
          <>
            <div className="flex items-center justify-between p-3 bg-green-500/20 rounded-lg border border-green-500/30">
              <div>
                <h4 className="font-semibold text-white">
                  ✅ You're Signed In!
                </h4>
                <p className="text-sm text-green-200">
                  Welcome back, {userData.displayName}
                </p>
              </div>
              <CheckCircle className="w-5 h-5 text-green-400" />
            </div>

            <div className="space-y-3">
              <h4 className="font-semibold text-white">
                Ways to Access Your Profile:
              </h4>

              <div className="space-y-2">
                <div className="flex items-center justify-between p-2 bg-blue-500/10 rounded border border-blue-500/20">
                  <span className="text-blue-200 text-sm">
                    📱 Click your name in the header
                  </span>
                  <Badge className="bg-blue-500 text-white text-xs">
                    Recommended
                  </Badge>
                </div>

                <div className="flex items-center justify-between p-2 bg-purple-500/10 rounded border border-purple-500/20">
                  <span className="text-purple-200 text-sm">
                    🔗 Direct URL: /profile
                  </span>
                  <Badge className="bg-purple-500 text-white text-xs">
                    Direct
                  </Badge>
                </div>

                <div className="flex items-center justify-between p-2 bg-green-500/10 rounded border border-green-500/20">
                  <span className="text-green-200 text-sm">
                    🎯 Complete onboarding tour
                  </span>
                  <Badge className="bg-green-500 text-white text-xs">
                    Auto
                  </Badge>
                </div>
              </div>
            </div>

            <Button
              onClick={() => (window.location.href = "/profile")}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
            >
              Go to Profile Dashboard
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </>
        ) : (
          <>
            <div className="p-3 bg-orange-500/20 rounded-lg border border-orange-500/30">
              <h4 className="font-semibold text-white mb-2">
                ⚠️ Sign In Required
              </h4>
              <p className="text-sm text-orange-200">
                You need to create an account to access your profile dashboard.
              </p>
            </div>

            <div className="space-y-3">
              <h4 className="font-semibold text-white">Get Started:</h4>

              <div className="space-y-2">
                <div className="flex items-center justify-between p-2 bg-purple-500/10 rounded border border-purple-500/20">
                  <span className="text-purple-200 text-sm">
                    1. Click "Sign Up" in header
                  </span>
                  <Badge className="bg-purple-500 text-white text-xs">
                    Step 1
                  </Badge>
                </div>

                <div className="flex items-center justify-between p-2 bg-blue-500/10 rounded border border-blue-500/20">
                  <span className="text-blue-200 text-sm">
                    2. Use any email (Demo Mode)
                  </span>
                  <Badge className="bg-blue-500 text-white text-xs">
                    Step 2
                  </Badge>
                </div>

                <div className="flex items-center justify-between p-2 bg-green-500/10 rounded border border-green-500/20">
                  <span className="text-green-200 text-sm">
                    3. Auto-redirect to profile
                  </span>
                  <Badge className="bg-green-500 text-white text-xs">
                    Done!
                  </Badge>
                </div>
              </div>
            </div>

            <div className="p-3 bg-yellow-500/10 rounded-lg border border-yellow-500/20">
              <p className="text-yellow-200 text-sm">
                💡 <strong>Demo Mode:</strong> No real email needed! Use any
                email like test@example.com
              </p>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};
