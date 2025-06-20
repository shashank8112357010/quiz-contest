import React, { useState } from "react";
import { useLanguageStore } from "@/lib/languages";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Smartphone,
  Play,
  Trophy,
  Zap,
  Clock,
  Users,
  Star,
  Crown,
  Sparkles,
  Rocket,
} from "lucide-react";
import { PhoneAuthModal } from "@/components/ui/phone-auth-modal";
import { ContestEntryModal } from "@/components/ui/contest-entry-modal";
import { PrizeCarousel } from "@/components/ui/prize-carousel";
import { useAuth } from "@/components/providers/AuthProvider";

export const HeroSection = () => {
  const { t, currentLanguage } = useLanguageStore(); // subscribe to language changes for reactivity
  const [showPhoneAuth, setShowPhoneAuth] = useState(false);
  const [showContestEntry, setShowContestEntry] = useState(false);
  const { user } = useAuth();

  const handleEnterContest = () => {
    if (user) {
      // User is authenticated, show contest entry modal
      setShowContestEntry(true);
    } else {
      // User not authenticated, show phone auth modal as per requirements
      setShowPhoneAuth(true);
    }
  };

  const handleAuthSuccess = () => {
    setShowPhoneAuth(false);
    // After successful auth, show contest entry modal
    setTimeout(() => {
      setShowContestEntry(true);
    }, 500);
  };

  return (
    <section className="relative pt-5">
      <div className="container mx-auto px-4">
        <div className="max-full mx-auto text-center">
          {/* Prize Carousel */}
          <div className="">
            <PrizeCarousel className="max-full mx-auto" itemsToShow={5} />
          </div>

          {/* Enhanced Phone Icon with multiple animations */}
          <div className="mb-12 flex justify-center">
            <div className="relative">
              {/* Orbiting rings */}
              <div
                className="absolute inset-0 w-32 h-32 rounded-full border-2 border-electric-400/30 animate-spin"
                style={{ animationDuration: "8s" }}
              />
              <div
                className="absolute inset-2 w-28 h-28 rounded-full border-2 border-neon-400/30 animate-spin"
                style={{
                  animationDuration: "6s",
                  animationDirection: "reverse",
                }}
              />

              {/* Floating particles */}
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-2 h-2 bg-gradient-to-r from-electric-400 to-neon-400 rounded-full animate-ping"
                  style={{
                    left: `${20 + Math.random() * 60}%`,
                    top: `${20 + Math.random() * 60}%`,
                    animationDelay: `${Math.random() * 2}s`,
                  }}
                />
              ))}
            </div>
          </div>

          {/* Enhanced Main Headline */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-black text-white mb-8 animate-fade-in">
            <span className="block bg-gradient-to-r from-electric-300 via-neon-300 via-magic-300 to-gold-300 bg-clip-text text-transparent animate-glow drop-shadow-2xl">
              {t("hero.contestTitle")}
            </span>
            <span className="block text-3xl md:text-4xl lg:text-5xl bg-gradient-to-r from-electric-300 via-neon-300 via-magic-300 to-gold-300 bg-clip-text text-transparent animate-glow drop-shadow-2xl">
              {t("hero.season")}
            </span>
          </h1>

          {/* Enhanced Subtitle */}
          <p className="text-2xl md:text-3xl text-white font-bold mb-12 max-w-4xl mx-auto leading-relaxed drop-shadow-lg animate-slide-up">
            Complete 10 quiz games and stand a chance to{" "}
            <span className="bg-gradient-to-r from-neon-300 to-electric-300 bg-clip-text text-transparent font-black animate-pulse">
              win {t("amazingPrizes").toLowerCase()}
            </span>{" "}
            including the latest iPhone! 🚀✨
          </p>

          {/* Enhanced Feature Badges - Removed as requested */}

          {/* Enhanced CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-20">
            <Button
              size="lg"
              className="bg-gradient-to-r from-magic-500 via-electric-500 to-neon-500 hover:from-magic-400 hover:via-electric-400 hover:to-neon-400 text-white px-12 py-6 text-2xl font-black shadow-2xl hover:shadow-magic-500/50 transition-all duration-300 group min-w-[280px] animate-glow border-2 border-white/20 hover:border-white/40"
              onClick={handleEnterContest}
            >
              <Play className="w-7 h-7 mr-3 group-hover:scale-125 transition-transform animate-bounce" />
              <span>Enter Contest</span>
              <Rocket className="w-7 h-7 ml-3 group-hover:translate-x-2 transition-transform" />
            </Button>

            <Button
              variant="outline"
              size="lg"
              className="bg-white/10 border-2 border-white/30 text-white hover:bg-white/20 backdrop-blur-sm px-12 py-6 text-2xl font-bold min-w-[280px] transition-all duration-300 hover:scale-105 hover:shadow-xl"
            >
              <Trophy
                className="w-6 h-6 mr-3 animate-spin"
                style={{ animationDuration: "3s" }}
              />
              {t("leaderboard.globalTitle")}
            </Button>
          </div>
        </div>
      </div>

      {/* Authentication Modals */}
      <PhoneAuthModal
        isOpen={showPhoneAuth}
        onClose={() => setShowPhoneAuth(false)}
        onSuccess={handleAuthSuccess}
      />

      <ContestEntryModal
        isOpen={showContestEntry}
        onClose={() => setShowContestEntry(false)}
      />
    </section>
  );
};
