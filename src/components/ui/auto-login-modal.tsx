"use client";

import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { PhoneAuthModal } from "@/components/ui/phone-auth-modal";
import { useAuth } from "@/components/providers/AuthProvider";
import { useLanguageStore } from "@/lib/languages";
import { Trophy, Zap, Star, Gift, User, Smartphone } from "lucide-react";

interface AutoLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AutoLoginModal: React.FC<AutoLoginModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [showPhoneAuth, setShowPhoneAuth] = useState(false);
  const { user, userData } = useAuth();

  // Close modal if user becomes authenticated
  useEffect(() => {
    if (user && userData) {
      onClose();
    }
  }, [user, userData, onClose]);

  const handleLoginClick = () => {
    setShowPhoneAuth(true);
    // Optional: Close the auto-login modal when phone auth opens
    // onClose();
  };

  const handleSkip = () => {
    onClose();
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogPortal>
          <DialogOverlay />
          <DialogPrimitive.Content
            className={cn(
              "fixed left-[50%] top-[50%] z-50 grid w-full max-w-[500px] translate-x-[-50%] translate-y-[-50%] gap-4 border bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 border-2 border-purple-500/20 shadow-2xl p-6 duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg",
            )}
          >
            <DialogHeader>
              <div className="text-center space-y-4">
                <div className="w-20 h-20 bg-gradient-to-r from-electric-400 via-magic-500 to-neon-500 rounded-full flex items-center justify-center mx-auto">
                  <Trophy className="w-10 h-10 text-white" />
                </div>
                <DialogTitle className="text-3xl font-bold bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent">
                  Welcome to Quiz2Play!
                </DialogTitle>
                <DialogDescription className="text-slate-300 text-lg">
                  Join the ultimate quiz contest and compete with thousands of
                  players
                </DialogDescription>
              </div>
            </DialogHeader>

            <div className="space-y-6">
              {/* Benefits */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30 rounded-xl p-4 text-center">
                  <Gift className="w-8 h-8 text-green-400 mx-auto mb-2" />
                  <div className="text-white font-bold">Welcome Bonus</div>
                  <div className="text-green-300 text-sm">
                    100 Coins + 3 Lives
                  </div>
                </div>
                <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-xl p-4 text-center">
                  <Star className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                  <div className="text-white font-bold">90-Day Contest</div>
                  <div className="text-purple-300 text-sm">
                    Win {t("amazingPrizes")}
                  </div>
                </div>
              </div>

              {/* Contest Features */}
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 space-y-3">
                <h3 className="text-white font-bold text-lg mb-3 flex items-center gap-2">
                  <Zap className="w-5 h-5 text-electric-400" />
                  Contest Features
                </h3>
                <div className="grid grid-cols-1 gap-2 text-sm">
                  <div className="flex items-center gap-2 text-white/80">
                    <div className="w-2 h-2 bg-electric-400 rounded-full"></div>
                    Play 10 questions daily across 6 categories
                  </div>
                  <div className="flex items-center gap-2 text-white/80">
                    <div className="w-2 h-2 bg-magic-400 rounded-full"></div>
                    Compete on leaderboards and win rewards
                  </div>
                  <div className="flex items-center gap-2 text-white/80">
                    <div className="w-2 h-2 bg-neon-400 rounded-full"></div>
                    Track your progress over 90 days
                  </div>
                  <div className="flex items-center gap-2 text-white/80">
                    <div className="w-2 h-2 bg-fire-400 rounded-full"></div>
                    Unlock achievements and special rewards
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <Button
                  onClick={handleLoginClick}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-3 text-lg"
                >
                  <Smartphone className="w-5 h-5 mr-2" />
                  Login with Phone Number
                </Button>

                <Button
                  variant="ghost"
                  onClick={handleSkip}
                  className="w-full text-white/70 hover:text-white hover:bg-white/10"
                >
                  Skip for now
                </Button>
              </div>

              <div className="text-center text-xs text-white/50">
                By continuing, you agree to our Terms & Conditions
              </div>
            </div>
          </DialogPrimitive.Content>
        </DialogPortal>
      </Dialog>

      {/* Phone Auth Modal */}
      <PhoneAuthModal
        isOpen={showPhoneAuth}
        onClose={() => setShowPhoneAuth(false)}
        onSuccess={() => {
          setShowPhoneAuth(false);
          onClose();
        }}
      />
    </>
  );
};
