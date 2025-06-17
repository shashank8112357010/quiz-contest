"use client";

import React, { useState, useEffect } from "react";
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
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Loader2,
  Shield,
  Lock,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";
import {
  checkSubscriptionStatus,
  updateSubscriptionStatus,
  completeSecondConsent,
  sendOTP,
  verifyOTP,
  initializeRecaptcha,
  getAuthErrorMessage,
} from "@/lib/phoneAuth";
import { useAuth } from "@/components/providers/AuthProvider";
import { useToast } from "@/hooks/use-toast";
import { ConfirmationResult } from "firebase/auth";
import { useNavigate } from "react-router-dom";

interface ContestEntryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type EntryStep =
  | "checking"
  | "non-subscriber"
  | "second-consent"
  | "subscriber"
  | "categories";

export const ContestEntryModal: React.FC<ContestEntryModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [step, setStep] = useState<EntryStep>("checking");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [otp, setOtp] = useState("");
  const [confirmationResult, setConfirmationResult] =
    useState<ConfirmationResult | null>(null);
  const { user, userData } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  // Check subscription status when modal opens
  useEffect(() => {
    if (isOpen && user) {
      checkUserSubscription();
    }
  }, [isOpen, user]);

  // Reset state when modal closes
  useEffect(() => {
    if (!isOpen) {
      setStep("checking");
      setOtp("");
      setConfirmationResult(null);
      setError("");
    }
  }, [isOpen]);

  const checkUserSubscription = async () => {
    if (!user) return;

    setLoading(true);
    setError("");

    try {
      const isSubscriber = await checkSubscriptionStatus(user.uid);

      if (isSubscriber) {
        setStep("subscriber");
        // Auto-redirect to categories after 2 seconds
        setTimeout(() => {
          navigate("/categories");
          onClose();
        }, 2000);
      } else {
        // Check if user has completed second consent
        if (userData?.secondConsentCompleted) {
          setStep("non-subscriber");
        } else {
          setStep("non-subscriber");
        }
      }
    } catch (error) {
      console.error("Error checking subscription:", error);
      setError("Unable to verify subscription status. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleNonSubscriberOk = async () => {
    if (!user || !userData) return;

    // Check if second consent is already completed
    if (userData.secondConsentCompleted) {
      // Directly go to categories
      navigate("/categories");
      onClose();
      return;
    }

    setLoading(true);
    setError("");

    // Start second consent flow
    setStep("second-consent");

    try {
      // Initialize reCAPTCHA for second consent
      const verifier = await initializeRecaptcha();

      // Send OTP for second consent
      if (user.phoneNumber) {
        const result = await sendOTP(user.phoneNumber, verifier);
        setConfirmationResult(result);

        toast({
          title: "Second Consent Required",
          description: "Please verify with OTP to continue to categories.",
        });
      } else {
        setError("Phone number not found. Please try logging in again.");
      }
    } catch (error: any) {
      console.error("Error in handleNonSubscriberOk:", error);
      setError(getAuthErrorMessage(error?.code || "unknown"));
      // Reset to previous step if there's an error
      setStep("non-subscriber");
    } finally {
      setLoading(false);
    }
  };

  const handleSecondConsentOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !confirmationResult) return;

    setLoading(true);
    setError("");

    try {
      if (otp.length !== 6) {
        setError("Please enter a valid 6-digit OTP");
        setLoading(false);
        return;
      }

      // Verify OTP
      await verifyOTP(confirmationResult, otp);

      // Mark second consent as completed
      await completeSecondConsent(user.uid);

      toast({
        title: "Consent Verified!",
        description: "You can now access the contest categories.",
      });

      // Redirect to categories
      setTimeout(() => {
        navigate("/categories");
        onClose();
      }, 1500);
    } catch (error: any) {
      setError(getAuthErrorMessage(error.code));
    } finally {
      setLoading(false);
    }
  };

  const handleUpgradeSubscription = () => {
    // This would typically open a payment modal or redirect to subscription page
    toast({
      title: "Coming Soon!",
      description: "Subscription upgrade feature will be available soon.",
    });
  };

  return (
    <>
      {/* reCAPTCHA container for second consent */}
      {/* <div id="recaptcha-container"></div> */}

      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-[450px] bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 border-2 border-purple-500/20 shadow-2xl">
          <DialogHeader className="text-center">
            <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent">
              {step === "checking" && "Checking Access..."}
              {step === "non-subscriber" && "Subscription Required"}
              {step === "second-consent" && "Second Consent"}
              {step === "subscriber" && "Access Granted!"}
            </DialogTitle>
            <DialogDescription className="text-slate-300">
              {step === "checking" && "Verifying your subscription status"}
              {step === "non-subscriber" &&
                "Subscribe to access contest content"}
              {step === "second-consent" && "Verify to continue to categories"}
              {step === "subscriber" && "Welcome to the contest!"}
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

          {/* Checking Step */}
          {step === "checking" && (
            <Card className="bg-slate-800/50 border-slate-700">
              <CardContent className="pt-6">
                <div className="text-center space-y-4">
                  <Loader2 className="w-12 h-12 animate-spin text-purple-400 mx-auto" />
                  <p className="text-slate-300">
                    Checking your subscription status...
                  </p>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Non-Subscriber Step */}
          {step === "non-subscriber" && (
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Lock className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-white">
                  You are not a subscriber
                </CardTitle>
                <CardDescription className="text-slate-400">
                  Subscribe to our services to play contest content
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-slate-700/30 p-4 rounded-lg">
                  <h4 className="text-white font-semibold mb-2">
                    Subscription Benefits:
                  </h4>
                  <ul className="text-slate-300 text-sm space-y-1">
                    <li>• Access to all contest categories</li>
                    <li>• Unlimited quiz attempts</li>
                    <li>• Exclusive rewards and prizes</li>
                    <li>• Priority customer support</li>
                  </ul>
                </div>

                <div className="flex gap-2">
                  <Button
                    className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold"
                    onClick={handleUpgradeSubscription}
                  >
                    Subscribe Now
                  </Button>
                  <Button
                    variant="outline"
                    className="flex-1 border-slate-600 text-slate-300 hover:bg-slate-700"
                    onClick={handleNonSubscriberOk}
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      "Continue Anyway"
                    )}
                  </Button>
                </div>

                <p className="text-xs text-slate-400 text-center">
                  Click "Continue Anyway" for limited access with second consent
                  verification
                </p>
              </CardContent>
            </Card>
          )}

          {/* Second Consent Step */}
          {step === "second-consent" && (
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-white">
                  Second Consent Required
                </CardTitle>
                <CardDescription className="text-slate-400">
                  Enter the OTP sent to your phone to verify your consent
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSecondConsentOTP} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="consent-otp" className="text-white">
                      Verification Code
                    </Label>
                    <Input
                      id="consent-otp"
                      type="text"
                      placeholder="Enter 6-digit code"
                      value={otp}
                      onChange={(e) =>
                        setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))
                      }
                      className="text-center text-xl tracking-widest bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400"
                      maxLength={6}
                      required
                    />
                  </div>

                  <Alert className="bg-blue-900/50 border-blue-500/50">
                    <AlertTriangle className="h-4 w-4 text-blue-400" />
                    <AlertDescription className="text-blue-200">
                      This is a second consent verification required for
                      non-subscribers to access limited contest content.
                    </AlertDescription>
                  </Alert>

                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold"
                    disabled={loading || otp.length !== 6}
                  >
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Verifying...
                      </>
                    ) : (
                      "Verify & Continue"
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          )}

          {/* Subscriber Success Step */}
          {step === "subscriber" && (
            <Card className="bg-slate-800/50 border-slate-700">
              <CardContent className="pt-6">
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white">
                    Access Granted!
                  </h3>
                  <p className="text-slate-300">
                    You are a subscriber. Redirecting to contest categories...
                  </p>
                  <div className="w-12 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded mx-auto animate-pulse"></div>
                </div>
              </CardContent>
            </Card>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};
