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
import { Checkbox } from "@/components/ui/checkbox";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, Phone, Shield, User, CheckCircle2 } from "lucide-react";
import {
  sendOTP,
  verifyOTP,
  createUserProfile,
  checkUserExists,
  initializeRecaptcha,
  cleanupRecaptcha,
  getAuthErrorMessage,
} from "@/lib/phoneAuth";
import { useToast } from "@/hooks/use-toast";
import { ConfirmationResult, RecaptchaVerifier } from "firebase/auth";
import { EmergencyAuthFallback } from "./emergency-auth-fallback";

interface PhoneAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

type AuthStep = "phone" | "otp" | "profile" | "complete";

export const PhoneAuthModal: React.FC<PhoneAuthModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  const [step, setStep] = useState<AuthStep>("phone");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [countryCode, setCountryCode] = useState("+91");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [confirmationResult, setConfirmationResult] =
    useState<ConfirmationResult | null>(null);
  const [showEmergencyFallback, setShowEmergencyFallback] = useState(false);
  const [recaptchaVerifierInstance, setRecaptchaVerifierInstance] =
    useState<RecaptchaVerifier | null>(null);
  const { toast } = useToast();

  // Reset state when modal closes
  useEffect(() => {
    if (!isOpen) {
      setStep("phone");
      setCountryCode("+91");
      setPhoneNumber("");
      setOtp("");
      setDisplayName("");
      setTermsAccepted(false);
      setConfirmationResult(null);
      setError("");
      // cleanupRecaptcha(); // Managed by the other useEffect
    }
  }, [isOpen]);

  // Initialize and cleanup reCAPTCHA based on modal visibility
  useEffect(() => {
    if (isOpen) {
      initializeRecaptcha()
        .then((verifier) => {
          setRecaptchaVerifierInstance(verifier);
          console.log("reCAPTCHA verifier instance set in modal state.");
          // Clear any previous reCAPTCHA related error if successfully initialized
          setError((prevError) =>
            prevError.includes("Authentication service temporarily unavailable")
              ? ""
              : prevError,
          );
        })
        .catch((error) => {
          console.error(
            "reCAPTCHA initialization failed within PhoneAuthModal useEffect:",
            error,
          );
          setError(
            "Authentication service temporarily unavailable. Please try closing and reopening the auth window, or try again later.",
          );
          setRecaptchaVerifierInstance(null);
        });
    } else {
      cleanupRecaptcha();
      setRecaptchaVerifierInstance(null);
    }
  }, [isOpen]);

  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(
      "handleSendOTP called. Current phone number:",
      countryCode + phoneNumber,
    );
    setLoading(true);
    setError(""); // Clear previous errors

    try {
      const nationalNumber = phoneNumber.replace(/\D/g, ""); // Now phoneNumber holds national part
      if (!nationalNumber) {
        setError("Please enter your national phone number");
        setLoading(false);
        return;
      }

      // Validate countryCode format
      if (!/^\+\d+$/.test(countryCode)) {
        setError("Country code must start with '+' and contain only numbers.");
        setLoading(false);
        return;
      }

      const fullPhoneNumber = countryCode + nationalNumber;

      // Validate full phone number
      if (fullPhoneNumber.length < 10 || fullPhoneNumber.length > 17) {
        setError("Please enter a valid phone number");
        setLoading(false);
        return;
      }

      if (!recaptchaVerifierInstance) {
        console.warn(
          "handleSendOTP: recaptchaVerifierInstance is not available.",
        );
        setError(
          "reCAPTCHA not ready. Please wait a moment or try reopening the authentication window.",
        );
        setLoading(false);
        return;
      }

      // Call the refactored sendOTP from phoneAuth.ts
      console.log("Calling sendOTP from phoneAuth.ts lib...");
      const result = await sendOTP(fullPhoneNumber, recaptchaVerifierInstance);
      console.log("sendOTP call successful in modal, result:", result);

      if (result === "demo") {
        console.log(
          "Using demo mode for phone authentication as per sendOTP fallback.",
        );
        setConfirmationResult("demo" as any); // Type assertion for demo string
        toast({
          title: "Demo Mode Active",
          description:
            "OTP service has fallen back to demo. Enter any 6-digit code.",
          variant: "default",
        });
        setStep("otp"); // Proceed to OTP step for demo
      } else {
        // sendOTP was successful and returned a ConfirmationResult
        setConfirmationResult(result);
        toast({
          title: "OTP Sent!",
          description: "Please check your phone for the verification code.",
        });
        setStep("otp"); // Proceed to OTP step
      }
    } catch (err: any) {
      // Catch errors thrown by the refactored sendOTP.
      // err.message should contain the user-friendly string.
      console.error("Error in handleSendOTP:", err.message, err);
      setError(
        err.message ||
          "An unexpected error occurred while trying to send the OTP. Please try again.",
      );

      // Optional: Trigger emergency fallback on specific, persistent errors if desired
      // For example, if err.message indicates a service outage.
      // if (err.message.includes("SMS quota exceeded") || err.message.includes("temporarily unavailable")) {
      //   setShowEmergencyFallback(true); // Example: trigger emergency on quota issues
      // }
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("handleVerifyOTP called. Current OTP:", otp);
    setLoading(true);
    setError("");

    try {
      if (!confirmationResult) {
        console.warn("handleVerifyOTP: confirmationResult is not available.");
        setError("Please request a new OTP");
        setLoading(false);
        return;
      }

      if (otp.length !== 6) {
        setError("Please enter a valid 6-digit OTP");
        setLoading(false);
        return;
      }

      // Verify OTP (handle demo mode)
      let user;
      if (confirmationResult === "demo") {
        // Demo mode - create mock user
        const nationalNumber = phoneNumber.replace(/\D/g, "");
        user = {
          uid: `demo_${Date.now()}`,
          phoneNumber: `${countryCode}${nationalNumber}`,
          displayName: null,
        } as any;
      } else {
        console.log("Calling verifyOTP from phoneAuth.ts lib...");
        user = await verifyOTP(confirmationResult, otp);
        console.log("verifyOTP call successful in modal, user:", user);
      }

      // Check if user profile exists
      const existingUser = await checkUserExists(user.phoneNumber!);

      if (existingUser && existingUser.profileCreated) {
        // Existing user with complete profile
        setStep("complete");
        toast({
          title: "Welcome back!",
          description: "You have successfully logged in.",
        });
        setTimeout(() => {
          onSuccess?.();
          onClose();
        }, 1500);
      } else {
        // New user or incomplete profile - need profile creation
        setStep("profile");
      }
    } catch (error: any) {
      console.error(
        "Error in handleVerifyOTP:",
        getAuthErrorMessage(error.code),
        error,
      );
      setError(getAuthErrorMessage(error.code));
    } finally {
      setLoading(false);
    }
  };

  const handleCreateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("handleCreateProfile called. Display name:", displayName);
    setLoading(true);
    setError("");

    try {
      if (!displayName.trim()) {
        setError("Please enter your name");
        setLoading(false);
        return;
      }

      if (!termsAccepted) {
        setError("Please accept the terms and conditions");
        setLoading(false);
        return;
      }

      if (!confirmationResult) {
        setError("Authentication error. Please try again.");
        setLoading(false);
        return;
      }

      // Get current user from auth
      const user = await verifyOTP(confirmationResult, otp);

      // Create user profile (handle demo mode)
      if (user.uid.startsWith("demo_")) {
        // Demo mode - simulate profile creation for UI flow without backend call
        console.log(
          "Demo mode: Simulating profile creation for UI flow. No actual user created with localStorageAuth.",
        );
        // The rest of the function (setStep, toast, onSuccess) will proceed,
        // but no localStorageAuth.signUp call is made.
      } else {
        // Firebase mode
        await createUserProfile(user, displayName, termsAccepted);
      }

      setStep("complete");
      toast({
        title: "Welcome to Quiz2Play! 🎉",
        description: "Your profile has been created successfully.",
      });

      setTimeout(() => {
        onSuccess?.();
        onClose();
      }, 1500);
    } catch (error: any) {
      console.error("Error in handleCreateProfile:", error);
      setError("Failed to create profile. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Simplified formatPhoneNumber for national number input (allows only digits)
  // A more robust library would be needed for proper formatting of various national numbers.
  const formatNationalPhoneNumber = (value: string) => {
    const digits = value.replace(/\D/g, "");
    // Limit to reasonable phone number length
    return digits.slice(0, 15);
  };

  const handleCountryCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    // Ensure it starts with '+'
    if (!value.startsWith("+")) {
      value = "+" + value.replace(/\+/g, ""); // Add '+' if not present, remove others
    }
    // Allow only numbers after '+'
    value = "+" + value.substring(1).replace(/\D/g, "");
    setCountryCode(value);
  };

  return (
    <>
      {/* reCAPTCHA container - required for Firebase phone auth */}
      <div id="recaptcha-container"></div>

      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-[450px] bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 border-2 border-purple-500/20 shadow-2xl">
          <DialogHeader className="text-center">
            <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent">
              {step === "phone" && "Enter Your Phone Number"}
              {step === "otp" && "Verify OTP"}
              {step === "profile" && "Create Your Profile"}
              {step === "complete" && "Welcome!"}
            </DialogTitle>
            <DialogDescription className="text-slate-300">
              {step === "phone" && "We'll send you a verification code"}
              {step === "otp" && "Enter the 6-digit code sent to your phone"}
              {step === "profile" && "Complete your profile to get started"}
              {step === "complete" && "Authentication successful!"}
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

          {/* Phone Number Step */}
          {step === "phone" && (
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader className="text-center">
                <CardTitle className="text-white flex items-center justify-center gap-2">
                  <Phone className="w-5 h-5" />
                  Phone Number
                </CardTitle>
                <CardDescription className="text-slate-400">
                  Enter your mobile number to continue
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSendOTP} className="space-y-4">
                  <div className="grid grid-cols-3 gap-2">
                    <div className="space-y-2 col-span-1">
                      <Label htmlFor="countryCode" className="text-white">
                        Country Code
                      </Label>
                      <Input
                        id="countryCode"
                        type="text"
                        placeholder="+1"
                        value={countryCode}
                        onChange={handleCountryCodeChange}
                        className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400"
                        required
                      />
                    </div>
                    <div className="space-y-2 col-span-2">
                      <Label htmlFor="phone" className="text-white">
                        National Number
                      </Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="Enter national number"
                        value={phoneNumber} // Using phoneNumber directly as it holds national part
                        onChange={(e) =>
                          // Allow only digits for national number part
                          setPhoneNumber(
                            formatNationalPhoneNumber(e.target.value),
                          )
                        }
                        className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400"
                        required
                      />
                    </div>
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold"
                    disabled={
                      loading ||
                      !phoneNumber.trim() ||
                      !countryCode.trim() ||
                      !/^\+\d+$/.test(countryCode)
                    }
                  >
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Sending OTP...
                      </>
                    ) : (
                      <>
                        <Shield className="mr-2 h-4 w-4" />
                        Send OTP
                      </>
                    )}
                  </Button>

                  {/* Emergency fallback */}
                  {error.includes("temporarily unavailable") && (
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full mt-2 border-orange-600 text-orange-300 hover:bg-orange-700/20"
                      onClick={() => setShowEmergencyFallback(true)}
                    >
                      Use Temporary Access Instead
                    </Button>
                  )}

                  {/* Development bypass */}
                  {process.env.NODE_ENV === "development" && (
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full mt-2 border-slate-600 text-slate-300 hover:bg-slate-700"
                      onClick={() => {
                        // Simulate successful auth for development
                        onSuccess?.();
                        onClose();
                      }}
                    >
                      🔧 Dev Bypass (Skip Auth)
                    </Button>
                  )}
                </form>
              </CardContent>
            </Card>
          )}

          {/* OTP Verification Step */}
          {step === "otp" && (
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader className="text-center">
                <CardTitle className="text-white flex items-center justify-center gap-2">
                  <Shield className="w-5 h-5" />
                  Verify OTP
                </CardTitle>
                <CardDescription className="text-slate-400">
                  Enter the code sent to {countryCode} {phoneNumber}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleVerifyOTP} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="otp" className="text-white">
                      Verification Code
                    </Label>
                    <Input
                      id="otp"
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
                  <div className="flex gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      className="flex-1 border-slate-600 text-slate-300 hover:bg-slate-700"
                      onClick={() => setStep("phone")}
                      disabled={loading}
                    >
                      Back
                    </Button>
                    <Button
                      type="submit"
                      className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold"
                      disabled={loading || otp.length !== 6}
                    >
                      {loading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Verifying...
                        </>
                      ) : (
                        "Verify"
                      )}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          )}

          {/* Profile Creation Step */}
          {step === "profile" && (
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader className="text-center">
                <CardTitle className="text-white flex items-center justify-center gap-2">
                  <User className="w-5 h-5" />
                  Create Profile
                </CardTitle>
                <CardDescription className="text-slate-400">
                  Complete your profile to start playing
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleCreateProfile} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="displayName" className="text-white">
                      Your Name
                    </Label>
                    <Input
                      id="displayName"
                      type="text"
                      placeholder="Enter your full name"
                      value={displayName}
                      onChange={(e) => setDisplayName(e.target.value)}
                      className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400"
                      required
                    />
                  </div>

                  <div className="flex items-start space-x-2">
                    <Checkbox
                      id="terms"
                      checked={termsAccepted}
                      onCheckedChange={(checked) =>
                        setTermsAccepted(checked as boolean)
                      }
                      className="mt-1"
                    />
                    <Label
                      htmlFor="terms"
                      className="text-sm text-slate-300 leading-tight"
                    >
                      I accept the{" "}
                      <span className="text-purple-400 hover:underline cursor-pointer">
                        Terms and Conditions
                      </span>{" "}
                      of the contest and agree to participate.
                    </Label>
                  </div>

                  <div className="text-xs text-slate-400 bg-slate-700/30 p-3 rounded-lg">
                    🎁 <strong>Welcome Bonus:</strong> Get 100 coins + 3 lives
                    when you join!
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold"
                    disabled={loading || !displayName.trim() || !termsAccepted}
                  >
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Creating Profile...
                      </>
                    ) : (
                      "Create Profile"
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          )}

          {/* Success Step */}
          {step === "complete" && (
            <Card className="bg-slate-800/50 border-slate-700">
              <CardContent className="pt-6">
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white">
                    Authentication Successful!
                  </h3>
                  <p className="text-slate-300">
                    Welcome to Quiz2Play. You can now start playing contests.
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
        </DialogContent>
      </Dialog>

      {/* Emergency Fallback Modal */}
      <EmergencyAuthFallback
        isOpen={showEmergencyFallback}
        onClose={() => setShowEmergencyFallback(false)}
        onSuccess={() => {
          setShowEmergencyFallback(false);
          onSuccess?.();
          onClose();
        }}
      />
    </>
  );
};
