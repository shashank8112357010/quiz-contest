import React from "react";
import { AnimatedBackground } from "@/components/ui/animated-background";
import { NotificationBanner } from "@/components/ui/notification-banner";
import { Header } from "@/components/ui/header";
import { HeroSection } from "@/components/ui/hero-section";
import { FeatureGrid } from "@/components/ui/feature-grid";

import {
  GameStatusBar,
  FloatingGameStats,
} from "@/components/ui/game-status-bar";
import { SoundProvider } from "@/components/ui/sound-effects";
import { OnboardingTour } from "@/components/ui/onboarding-tour";
import { WelcomeBackModal } from "@/components/ui/welcome-back-modal";
import { FloatingHelpButton } from "@/components/ui/floating-help-button";
import {
  AchievementToast,
  useAchievementToasts,
} from "@/components/ui/achievement-toast";
import { BackgroundMusic } from "@/components/ui/background-music";
import { useOnboarding } from "@/hooks/use-onboarding";
import { FirebaseDebugInfo } from "@/components/ui/firebase-debug";

const Index = () => {
  const { showTour, showWelcomeBack, completeTour, dismissWelcomeBack } =
    useOnboarding();

  const { activeToasts, showAchievement, hideAchievement } =
    useAchievementToasts();

  // Listen for achievement events
  React.useEffect(() => {
    const handleAchievement = (event: CustomEvent) => {
      showAchievement(event.detail);
    };

    window.addEventListener("achievement", handleAchievement as EventListener);
    return () =>
      window.removeEventListener(
        "achievement",
        handleAchievement as EventListener,
      );
  }, [showAchievement]);

  return (
    <SoundProvider>
      <div className="min-h-screen relative overflow-hidden">
        {/* Enhanced Animated Background */}
        <AnimatedBackground />

        {/* Game Status Bar - Always visible */}
        {/* <GameStatusBar
          position="top"
          variant="compact"
          showNetworkStatus={true}
        /> */}

        {/* Main Content with better text contrast */}
        <div className="relative z-40">
          {/* Top Notification Banner */}
          <NotificationBanner />

          {/* Header */}
          <Header />

          {/* Main Content */}
          <main className="relative">
            {/* Hero Section */}
            <HeroSection />

            {/* Feature Grid */}
            <FeatureGrid />

            {/* Firebase Debug Info (Development Only) */}
            {process.env.NODE_ENV === "development" && <FirebaseDebugInfo />}
          </main>

          {/* Enhanced Footer */}
          <footer className="relative border-t-2 border-white/20 bg-black/40 backdrop-blur-xl">
            <div className="container mx-auto px-4 py-6">
              <div className="pt-1 text-center">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                  <p className="text-white/70 text-lg">
                    &copy; 2025 Quiz2Play. All rights reserved. Made with ❤️ for
                    quiz enthusiasts.
                  </p>
                  <div className="flex items-center gap-4 mr-5">
                    <a
                      href="/terms"
                      className="text-white/70 hover:text-white text-lg underline transition"
                    >
                      Terms & Conditions
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </footer>
        </div>

        {/* Onboarding Components */}
        {showTour && (
          <OnboardingTour isOpen={showTour} onComplete={completeTour} />
        )}

        {showWelcomeBack && (
          <WelcomeBackModal
            isOpen={showWelcomeBack}
            onClose={dismissWelcomeBack}
          />
        )}

        {/* Floating Help Button */}
        {/* <FloatingHelpButton /> */}

        {/* Background Music */}
        <BackgroundMusic autoPlay={true} loop={true} volume={0.2} />

        {/* Manual Onboarding Trigger for Testing */}

        {/* Achievement Toasts */}
        {activeToasts.map((achievement: any) => (
          <AchievementToast
            key={achievement.id}
            achievement={achievement}
            isVisible={true}
            onClose={() => hideAchievement(achievement.id)}
          />
        ))}
      </div>
    </SoundProvider>
  );
};

export default Index;
