"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { User, AlertTriangle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { signInAnonymously } from "firebase/auth";
import { auth, db } from "@/lib/firebase"; // Adjusted path
import { doc, setDoc, serverTimestamp } from "firebase/firestore";

interface EmergencyAuthFallbackProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export const EmergencyAuthFallback: React.FC<EmergencyAuthFallbackProps> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const { toast } = useToast();

  const handleEmergencyAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      if (!displayName.trim()) {
        setError("Please enter your name");
        setLoading(false);
        return;
      }

      if (!email.trim() || !email.includes("@")) { // Basic email validation
        setError("Please enter a valid email");
        setLoading(false);
        return;
      }

      // Sign in anonymously with Firebase
      const userCredential = await signInAnonymously(auth);
      const user = userCredential.user;

      // Optionally, save the entered display name and email to Firestore for this anonymous user
      // This helps link the entered info with the anonymous session if needed later
      // We are creating a new user document or updating if one somehow exists for this anon UID
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        displayName: displayName,
        email: email, // Storing email provided in form
        isAnonymous: true,
        profileCreated: true, // Mark as profile created for consistency
        lastLoginDate: serverTimestamp(),
        // Add other minimal default fields if your app expects them
        coins: 0, // Or some small amount for temporary access
        lives: 1,
        totalStars: 0,
        currentLevel: 1,
        unlockedCategories: ["general-knowledge"],
        powers: { fiftyFifty: 0, flip: 0, expertPoll: 0 },
        streak: 0,
        achievements: [],
        isSubscriber: false,
        termsAccepted: true, // Implicitly accepted for emergency access
        secondConsentCompleted: false,
      }, { merge: true }); // Merge true in case an anon user already existed and we're adding info

      toast({
        title: "Temporary Access Granted",
        description: "You are signed in anonymously. Your data might be temporary.",
      });

      onSuccess?.();
      onClose();

    } catch (error: any) {
      console.error("Error during anonymous sign-in:", error);
      setError("Failed to grant temporary access. Please try again. Code: " + error.code);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[450px] bg-gradient-to-br from-slate-900 via-red-900 to-slate-900 border-2 border-red-500/20 shadow-2xl">
        <DialogHeader className="text-center">
          <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-red-300 to-orange-300 bg-clip-text text-transparent">
            Service Temporarily Unavailable
          </DialogTitle>
          <DialogDescription className="text-slate-300">
            Phone authentication is having issues. Use temporary access below.
          </DialogDescription>
        </DialogHeader>

        {error && (
          <Alert
            variant="destructive"
            className="bg-red-900/50 border-red-500/50"
          >
            <AlertDescription className="text-red-200">
              {error}
            </AlertDescription>
          </Alert>
        )}

        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertTriangle className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-white flex items-center justify-center gap-2">
              <User className="w-5 h-5" />
              Temporary Access
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleEmergencyAuth} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="fallback-name" className="text-white">
                  Your Name
                </Label>
                <Input
                  id="fallback-name"
                  type="text"
                  placeholder="Enter your full name"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="fallback-email" className="text-white">
                  Email (for identification)
                </Label>
                <Input
                  id="fallback-email"
                  type="email"
                  placeholder="your.email@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400"
                  required
                />
              </div>

              <Alert className="bg-orange-900/50 border-orange-500/50">
                <AlertTriangle className="h-4 w-4 text-orange-400" />
                <AlertDescription className="text-orange-200">
                  This creates a temporary account for testing. Please set up
                  proper authentication later.
                </AlertDescription>
              </Alert>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white font-bold"
                disabled={loading || !displayName.trim() || !email.trim()}
              >
                {loading ? "Creating Access..." : "Create Temporary Access"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  );
};
