"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FirebaseDebugInfo } from "@/components/ui/firebase-debug";
import { PhoneAuthModal } from "@/components/ui/phone-auth-modal";
import { initializeRecaptcha, sendOTP, verifyOTP } from "@/lib/phoneAuth";
import { RecaptchaVerifier, ConfirmationResult } from "firebase/auth";

const PhoneAuthTest = () => {
  const [showModal, setShowModal] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("+91");
  const [otp, setOtp] = useState("");
  const [verifier, setVerifier] = useState<RecaptchaVerifier | null>(null);
  const [confirmationResult, setConfirmationResult] =
    useState<ConfirmationResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleInitRecaptcha = async () => {
    try {
      setLoading(true);
      setError("");
      setMessage("Initializing reCAPTCHA...");

      const recaptchaVerifier = await initializeRecaptcha();
      setVerifier(recaptchaVerifier);
      setMessage("✅ reCAPTCHA initialized successfully!");
    } catch (err: any) {
      setError(`❌ reCAPTCHA initialization failed: ${err.message}`);
      console.error("reCAPTCHA init error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSendOTP = async () => {
    if (!verifier) {
      setError("Please initialize reCAPTCHA first");
      return;
    }

    if (!phoneNumber || phoneNumber.length < 10) {
      setError("Please enter a valid phone number");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setMessage("Sending OTP...");

      const result = await sendOTP(phoneNumber, verifier);

      if (result === "demo") {
        setMessage("📱 Demo mode: OTP sent (use any 6-digit code)");
      } else {
        setConfirmationResult(result as ConfirmationResult);
        setMessage("📱 OTP sent to your phone!");
      }
    } catch (err: any) {
      setError(`❌ Failed to send OTP: ${err.message}`);
      console.error("Send OTP error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async () => {
    if (!confirmationResult) {
      setError("No confirmation result available");
      return;
    }

    if (otp.length !== 6) {
      setError("Please enter a 6-digit OTP");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setMessage("Verifying OTP...");

      const user = await verifyOTP(confirmationResult, otp);
      setMessage(`✅ Authentication successful! User: ${user.phoneNumber}`);
    } catch (err: any) {
      setError(`❌ OTP verification failed: ${err.message}`);
      console.error("Verify OTP error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4">
      <div className="container mx-auto max-w-4xl">
        <h1 className="text-4xl font-bold text-white text-center mb-8">
          🔥 Firebase Phone Auth Test
        </h1>

        <FirebaseDebugInfo />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Direct API Testing */}
          <Card className="bg-slate-900/80 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">
                🧪 Direct API Testing
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Button
                  onClick={handleInitRecaptcha}
                  disabled={loading || !!verifier}
                  className="w-full"
                >
                  {verifier ? "✅ reCAPTCHA Ready" : "Initialize reCAPTCHA"}
                </Button>
              </div>

              <div>
                <Input
                  type="tel"
                  placeholder="+91 9876543210"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="bg-slate-800 border-slate-600 text-white"
                />
                <Button
                  onClick={handleSendOTP}
                  disabled={loading || !verifier}
                  className="w-full mt-2"
                >
                  Send OTP
                </Button>
              </div>

              <div>
                <Input
                  type="text"
                  placeholder="Enter 6-digit OTP"
                  value={otp}
                  onChange={(e) =>
                    setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))
                  }
                  className="bg-slate-800 border-slate-600 text-white"
                  maxLength={6}
                />
                <Button
                  onClick={handleVerifyOTP}
                  disabled={loading || !confirmationResult}
                  className="w-full mt-2"
                >
                  Verify OTP
                </Button>
              </div>

              {message && (
                <Badge className="bg-green-500 text-white w-full p-2 text-center">
                  {message}
                </Badge>
              )}

              {error && (
                <div className="space-y-2">
                  <Badge className="bg-red-500 text-white w-full p-2 text-center">
                    {error}
                  </Badge>
                  {error.includes("invalid-app-credential") && (
                    <Button
                      onClick={() =>
                        window.open(
                          "https://console.firebase.google.com/u/0/project/quiz-20372/authentication/providers",
                          "_blank",
                        )
                      }
                      className="w-full bg-orange-600 hover:bg-orange-700"
                    >
                      🔧 Fix in Firebase Console
                    </Button>
                  )}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Modal Testing */}
          <Card className="bg-slate-900/80 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">🎭 Modal Testing</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button onClick={() => setShowModal(true)} className="w-full">
                Open Phone Auth Modal
              </Button>

              <div className="text-sm text-slate-300 space-y-2">
                <p>
                  <strong>Test Phone Numbers:</strong>
                </p>
                <ul className="list-disc list-inside space-y-1">
                  <li>+91 9876543210 (India)</li>
                  <li>+1 5551234567 (US)</li>
                  <li>+44 7700123456 (UK)</li>
                </ul>
                <p className="text-xs text-slate-400 mt-3">
                  Note: These are test numbers. In production, use real phone
                  numbers.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* reCAPTCHA Container */}
        <div id="recaptcha-container"></div>

        {/* Phone Auth Modal */}
        <PhoneAuthModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          onSuccess={() => {
            setShowModal(false);
            setMessage("✅ Modal authentication successful!");
          }}
        />

        {/* Back to Home */}
        <div className="text-center mt-8">
          <Button
            variant="outline"
            onClick={() => (window.location.href = "/")}
            className="bg-white/10 border-white/20 text-white hover:bg-white/20"
          >
            ← Back to Home
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PhoneAuthTest;
