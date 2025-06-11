import { AnimatedBackground } from "@/components/ui/animated-background";
import { NotificationBanner } from "@/components/ui/notification-banner";
import { Header } from "@/components/ui/header";
import { HeroSection } from "@/components/ui/hero-section";
import { FeatureGrid } from "@/components/ui/feature-grid";
import { FinalCTA } from "@/components/ui/final-cta";

const Index = () => {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Background */}
      <AnimatedBackground />

      {/* Main Content */}
      <div className="relative z-40">
        {/* Top Notification Banner */}
        <NotificationBanner />

        {/* Header */}
        <Header />

        {/* Main Content */}
        <main>
          {/* Hero Section */}
          <HeroSection />

          {/* Feature Grid */}
          <FeatureGrid />

          {/* Final CTA */}
          <FinalCTA />
        </main>

        {/* Footer */}
        <footer className="relative border-t border-white/20 bg-black/20 backdrop-blur-sm">
          <div className="container mx-auto px-4 py-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="md:col-span-2">
                <h3 className="text-xl font-display font-bold text-white mb-4">
                  QuizMaster
                </h3>
                <p className="text-white/70 mb-4 max-w-md">
                  The ultimate quiz platform where knowledge meets rewards. Win
                  amazing prizes while testing your skills!
                </p>
                <div className="flex gap-4">
                  <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition-colors cursor-pointer">
                    <span className="text-white text-sm">f</span>
                  </div>
                  <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition-colors cursor-pointer">
                    <span className="text-white text-sm">t</span>
                  </div>
                  <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition-colors cursor-pointer">
                    <span className="text-white text-sm">in</span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-white mb-4">Quick Links</h4>
                <ul className="space-y-2 text-white/70">
                  <li>
                    <a href="#" className="hover:text-white transition-colors">
                      How to Play
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white transition-colors">
                      Leaderboard
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white transition-colors">
                      Prizes
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white transition-colors">
                      Support
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-white mb-4">Legal</h4>
                <ul className="space-y-2 text-white/70">
                  <li>
                    <a href="#" className="hover:text-white transition-colors">
                      Terms of Service
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white transition-colors">
                      Privacy Policy
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white transition-colors">
                      Contest Rules
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white transition-colors">
                      Contact Us
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            <div className="border-t border-white/20 mt-8 pt-8 text-center text-white/60">
              <p>
                &copy; 2024 QuizMaster. All rights reserved. Made with ❤️ for
                quiz enthusiasts.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Index;
