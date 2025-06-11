import React, { Suspense, lazy } from "react";
import { AnimatedBackground } from "@/components/ui/animated-background";
import { NotificationBanner } from "@/components/ui/notification-banner";
import { Header } from "@/components/ui/header";
import { HeroSection } from "@/components/ui/hero-section";
import { FeatureGrid } from "@/components/ui/feature-grid";
import { FinalCTA } from "@/components/ui/final-cta";
import {
  GameStatusBar,
  FloatingGameStats,
} from "@/components/ui/game-status-bar";
import { SoundProvider } from "@/components/ui/sound-effects";
import { useOnboarding } from "@/hooks/use-onboarding";

// Dynamic imports for heavy components
const OnboardingTour = lazy(() =>
  import("@/components/ui/onboarding-tour").then((module) => ({
    default: module.OnboardingTour,
  })),
);

const WelcomeBackModal = lazy(() =>
  import("@/components/ui/welcome-back-modal").then((module) => ({
    default: module.WelcomeBackModal,
  })),
);

const FloatingHelpButton = lazy(() =>
  import("@/components/ui/floating-help-button").then((module) => ({
    default: module.FloatingHelpButton,
  })),
);

const AchievementToast = lazy(() =>
  import("@/components/ui/achievement-toast").then((module) => ({
    default: module.AchievementToast,
  })),
);

// Loading fallback for heavy components
const ComponentLoader = () => (
  <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50">
    <div className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
  </div>
);

// Error boundary for dynamic components
class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Component error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return null; // Fail silently for non-critical components
    }

    return this.props.children;
  }
}

const Index = () => {
  const { showTour, showWelcomeBack, completeTour, dismissWelcomeBack } =
    useOnboarding();

  // Dynamic import for achievement toasts hook
  const [achievementModule, setAchievementModule] = React.useState<any>(null);

  React.useEffect(() => {
    import("@/components/ui/achievement-toast").then((module) => {
      setAchievementModule(module);
    });
  }, []);

  const { activeToasts, showAchievement, hideAchievement } =
    achievementModule?.useAchievementToasts() || {
      activeToasts: [],
      showAchievement: () => {},
      hideAchievement: () => {},
    };

  // Listen for achievement events
  React.useEffect(() => {
    if (!showAchievement) return;

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
    <ErrorBoundary>
      <SoundProvider>
        <div className="min-h-screen relative overflow-hidden">
          {/* Enhanced Animated Background */}
          <AnimatedBackground />

          {/* Game Status Bar - Always visible */}
          <GameStatusBar
            position="top"
            variant="compact"
            showNetworkStatus={true}
          />

          {/* Main Content with better text contrast */}
          <div className="relative z-40 pt-16">
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

              {/* Final CTA */}
              <FinalCTA />
            </main>

            {/* Enhanced Footer */}
            <footer className="relative border-t-2 border-white/20 bg-black/40 backdrop-blur-xl">
              <div className="container mx-auto px-4 py-16">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
                  <div className="md:col-span-2">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-12 h-12 bg-gradient-to-br from-electric-400 to-magic-500 rounded-xl flex items-center justify-center animate-glow">
                        <span className="text-2xl">🧠</span>
                      </div>
                      <h3 className="text-2xl font-display font-black bg-gradient-to-r from-white to-electric-200 bg-clip-text text-transparent">
                        Quiz2Play
                      </h3>
                    </div>
                    <p className="text-white/80 mb-6 max-w-md text-lg leading-relaxed">
                      The ultimate AI-powered quiz platform where knowledge
                      meets rewards. Win amazing prizes while testing your
                      skills with our intelligent coaching system! 🚀
                    </p>
                    <div className="flex gap-4">
                      {[
                        { icon: "📘", label: "Facebook" },
                        { icon: "🐦", label: "Twitter" },
                        { icon: "📸", label: "Instagram" },
                        { icon: "💼", label: "LinkedIn" },
                      ].map((social, index) => (
                        <div
                          key={index}
                          className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center hover:bg-white/20 transition-all duration-300 cursor-pointer hover:scale-110 backdrop-blur-sm border border-white/20"
                        >
                          <span className="text-xl">{social.icon}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-black text-white mb-6 text-xl">
                      Quick Links
                    </h4>
                    <ul className="space-y-4 text-white/80">
                      {[
                        "How to Play",
                        "Categories",
                        "Leaderboard",
                        "Prizes",
                        "Support",
                      ].map((link, index) => (
                        <li key={index}>
                          <a
                            href="#"
                            className="hover:text-white transition-colors font-semibold text-lg hover:translate-x-2 transform duration-300 inline-block"
                          >
                            {link}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-black text-white mb-6 text-xl">
                      Legal & Help
                    </h4>
                    <ul className="space-y-4 text-white/80">
                      {[
                        "Terms of Service",
                        "Privacy Policy",
                        "Contest Rules",
                        "Contact Us",
                        "FAQ",
                      ].map((link, index) => (
                        <li key={index}>
                          <a
                            href="#"
                            className="hover:text-white transition-colors font-semibold text-lg hover:translate-x-2 transform duration-300 inline-block"
                          >
                            {link}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="border-t-2 border-white/20 mt-12 pt-8 text-center">
                  <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-white/70 text-lg">
                      &copy; 2024 Quiz2Play. All rights reserved. Made with ❤️
                      for quiz enthusiasts.
                    </p>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2 text-white/70">
                        <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                        <span className="font-semibold">
                          Over 50,000 players online now!
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </footer>
          </div>

          {/* Dynamic Components with Suspense */}
          <Suspense fallback={<ComponentLoader />}>
            {showTour && (
              <ErrorBoundary>
                <OnboardingTour isOpen={showTour} onComplete={completeTour} />
              </ErrorBoundary>
            )}
          </Suspense>

          <Suspense fallback={null}>
            {showWelcomeBack && (
              <ErrorBoundary>
                <WelcomeBackModal
                  isOpen={showWelcomeBack}
                  onClose={dismissWelcomeBack}
                />
              </ErrorBoundary>
            )}
          </Suspense>

          {/* Floating Help Button */}
          <Suspense fallback={null}>
            <ErrorBoundary>
              <FloatingHelpButton />
            </ErrorBoundary>
          </Suspense>

          {/* Manual Onboarding Trigger for Testing */}
          {process.env.NODE_ENV === "development" && (
            <div className="fixed bottom-4 left-4 z-50">
              <button
                onClick={() => {
                  // Reset onboarding and trigger tour
                  localStorage.removeItem("quiz2play_onboarding");
                  window.location.reload();
                }}
                className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg shadow-lg text-sm font-bold"
              >
                Reset & Test Onboarding
              </button>
            </div>
          )}

          {/* Achievement Toasts */}
          <Suspense fallback={null}>
            {activeToasts.map((achievement: any) => (
              <ErrorBoundary key={achievement.id}>
                <AchievementToast
                  achievement={achievement}
                  isVisible={true}
                  onClose={() => hideAchievement(achievement.id)}
                />
              </ErrorBoundary>
            ))}
          </Suspense>
        </div>
      </SoundProvider>
    </ErrorBoundary>
  );
};

export default Index;
