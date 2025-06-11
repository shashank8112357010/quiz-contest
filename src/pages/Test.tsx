import React from "react";
import { Header } from "@/components/ui/header";
import { AuthModal } from "@/components/ui/auth-modal";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/components/providers/AuthProvider";
import { ProfileAccessCard } from "@/components/ui/profile-access-card";

const Test = () => {
  const [showAuthModal, setShowAuthModal] = React.useState(false);
  const [authMode, setAuthMode] = React.useState<"signin" | "signup">("signup");
  const { user, userData, loading } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Header />

      <div className="container mx-auto px-4 py-16">
        <Card className="max-w-2xl mx-auto bg-slate-800/50 border-slate-600">
          <CardHeader>
            <CardTitle className="text-white text-center">
              🧪 Auth Test Page
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Auth Status */}
            <div className="p-4 bg-slate-700/50 rounded-lg">
              <h3 className="text-white font-bold mb-2">
                Authentication Status:
              </h3>
              <div className="space-y-2 text-sm">
                <div className="text-gray-300">
                  Loading:{" "}
                  <span className="text-white">{loading ? "Yes" : "No"}</span>
                </div>
                <div className="text-gray-300">
                  User:{" "}
                  <span className="text-white">
                    {user ? "Logged In" : "Not Logged In"}
                  </span>
                </div>
                {userData && (
                  <div className="text-gray-300">
                    Name:{" "}
                    <span className="text-white">{userData.displayName}</span>
                  </div>
                )}
                {userData && (
                  <div className="text-gray-300">
                    Email: <span className="text-white">{userData.email}</span>
                  </div>
                )}
                {userData && (
                  <div className="text-gray-300">
                    Coins:{" "}
                    <span className="text-yellow-400">{userData.coins}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Manual Auth Buttons */}
            <div className="space-y-4">
              <h3 className="text-white font-bold">Manual Auth Test:</h3>
              <div className="flex gap-4">
                <Button
                  onClick={() => {
                    setAuthMode("signin");
                    setShowAuthModal(true);
                  }}
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  Test Sign In Modal
                </Button>
                <Button
                  onClick={() => {
                    setAuthMode("signup");
                    setShowAuthModal(true);
                  }}
                  className="bg-purple-600 hover:bg-purple-700 text-white"
                >
                  Test Sign Up Modal
                </Button>
              </div>
            </div>

            {/* Header Visibility Test */}
            <div className="p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
              <h3 className="text-white font-bold mb-2">
                Header Button Visibility:
              </h3>
              <p className="text-blue-200 text-sm">
                Check if the Sign Up and Sign In buttons are visible in the
                header above. They should be in the top-right corner of the
                page.
              </p>
              <p className="text-blue-200 text-sm mt-2">
                If you can't see them, there might be a CSS or z-index issue.
              </p>
            </div>

            {/* Demo Instructions */}
            <div className="p-4 bg-green-500/10 rounded-lg border border-green-500/20">
              <h3 className="text-white font-bold mb-2">
                🚀 Demo Mode Instructions:
              </h3>
              <div className="text-green-200 text-sm space-y-2">
                <p>• The app is running in DEMO mode (no real Firebase)</p>
                <p>• You can sign up with ANY email and password</p>
                <p>• Try: test@example.com / password123</p>
                <p>• Or create a completely new account</p>
                <p>• No real email verification needed!</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Profile Access Guide */}
        <ProfileAccessCard />
      </div>

      {/* Test Auth Modal */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        defaultTab={authMode}
      />
    </div>
  );
};

export default Test;
