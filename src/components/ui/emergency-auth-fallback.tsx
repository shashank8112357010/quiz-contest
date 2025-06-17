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
import { localStorageAuth } from "@/lib/localStorageAuth";
import { useToast } from "@/hooks/use-toast";

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

      if (!email.trim() || !email.includes("@")) {
        setError("Please enter a valid email");
        setLoading(false);
        return;
      }

      // Create temporary account using localStorage auth
      await localStorageAuth.signUp(email, "temp123", displayName);

      toast({
        title: "Temporary Access Granted",
        description:
          "You can now access the application. Please set up proper authentication later.",
      });

      onSuccess?.();
      onClose();
    } catch (error: any) {
      if (error.message.includes("email-already-in-use")) {
        // Try to sign in instead
        try {
          await localStorageAuth.signIn(email, "temp123");
          toast({
            title: "Welcome Back",
            description: "Signed in with existing temporary account.",
          });
          onSuccess?.();
          onClose();
        } catch (signInError) {
          setError("Email already in use with different credentials.");
        }
      } else {
        setError("Failed to create temporary account. Please try again.");
      }
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
