import { Button } from "@/components/ui/button";
import { Brain, Menu, User, Trophy, Sparkles, Zap, LogOut } from "lucide-react";
import { useState } from "react";
import { AuthModal } from "@/components/ui/auth-modal";
import { useAuth } from "@/components/providers/AuthProvider";
import { isFirebaseReady } from "@/lib/firebase";
import { useOnboarding } from "@/hooks/use-onboarding";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<"signin" | "signup">("signin");
  const { user, userData, loading, signOut } = useAuth();
  const { triggerTour } = useOnboarding();

  return (
    <header className="relative z-50 bg-black/30 backdrop-blur-xl border-b-2 border-white/20 shadow-2xl">
      {/* Background glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-electric-600/20 via-magic-600/20 to-neon-600/20 animate-pulse" />

      <div className="container mx-auto px-4 py-4 relative">
        <div className="flex items-center justify-between gap-4 lg:gap-8">
          {/* Enhanced Logo */}
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-16 h-16 bg-gradient-to-br from-electric-400 via-magic-500 to-neon-500 rounded-2xl flex items-center justify-center shadow-2xl animate-glow">
                <Brain className="w-8 h-8 text-white animate-pulse" />
              </div>
              <div className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-neon-400 to-electric-400 rounded-full animate-bounce">
                <Sparkles className="w-3 h-3 text-white m-1" />
              </div>
              {/* Orbiting particles */}
              <div
                className="absolute inset-0 animate-spin"
                style={{ animationDuration: "8s" }}
              >
                <div className="absolute -top-2 left-1/2 w-2 h-2 bg-electric-400 rounded-full"></div>
                <div className="absolute top-1/2 -right-2 w-2 h-2 bg-magic-400 rounded-full"></div>
                <div className="absolute -bottom-2 left-1/2 w-2 h-2 bg-neon-400 rounded-full"></div>
                <div className="absolute top-1/2 -left-2 w-2 h-2 bg-quiz-400 rounded-full"></div>
              </div>
            </div>
            <div>
              <h1 className="text-3xl font-display font-black bg-gradient-to-r from-white via-electric-200 to-neon-200 bg-clip-text text-transparent drop-shadow-lg animate-glow">
                Quiz2Play
              </h1>
              <p className="text-sm text-electric-300 font-bold animate-pulse">
                🚀 Win. Learn. Dominate. 🚀
              </p>
            </div>
          </div>

          {/* Enhanced Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
            {[
              { name: "Home", href: "/" },
              { name: "Categories", href: "/categories" },
              { name: "Leaderboard", href: "/leaderboard" },
              { name: "Contests", href: "/contests" },
              { name: "Rewards", href: "/rewards" },
              { name: "Help", href: "#", onClick: triggerTour },
            ].map((link, index) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => {
                  if (link.onClick) {
                    e.preventDefault();
                    link.onClick();
                  }
                }}
                className="relative text-white/90 hover:text-white transition-all duration-300 font-bold text-base xl:text-lg group animate-fade-in cursor-pointer whitespace-nowrap"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {link.name}
                <div className="absolute inset-0 bg-gradient-to-r from-electric-400/20 to-magic-400/20 rounded-lg scale-0 group-hover:scale-100 transition-transform duration-300 -z-10"></div>
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-electric-400 to-neon-400 group-hover:w-full transition-all duration-300"></div>
              </a>
            ))}
          </nav>

          {/* Enhanced Action Buttons */}
          <div className="hidden md:flex items-center gap-3 lg:gap-4 relative z-50 ml-auto">
            {!loading && (
              <>
                {user && userData ? (
                  <div className="flex items-center gap-3">
                    <div
                      onClick={() => (window.location.href = "/profile")}
                      className="text-white text-right hover:text-electric-300 transition-colors cursor-pointer p-2 rounded-lg hover:bg-white/10 min-w-0"
                    >
                      <div className="font-bold text-sm truncate max-w-32">
                        {userData.displayName}
                      </div>
                      <div className="text-xs text-electric-300 flex items-center gap-2">
                        <span>💰 {userData.coins}</span>
                        <span>❤️ {userData.lives}</span>
                        <span>⭐ {userData.totalStars}</span>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      onClick={signOut}
                      className="bg-white/20 border-2 border-white/50 text-white hover:bg-white/30 hover:text-white backdrop-blur-sm font-bold transition-all duration-300 hover:scale-105 hover:shadow-xl group relative z-50 whitespace-nowrap"
                    >
                      <LogOut className="w-4 h-4 mr-2 group-hover:animate-bounce" />
                      Sign Out
                    </Button>
                  </div>
                ) : (
                  <>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setAuthMode("signin");
                        setAuthModalOpen(true);
                      }}
                      className="bg-white/20 border-2 border-white/50 text-white hover:bg-white/30 hover:text-white backdrop-blur-sm font-bold transition-all duration-300 hover:scale-105 hover:shadow-xl group relative z-50 whitespace-nowrap"
                    >
                      <User className="w-4 h-4 mr-2 group-hover:animate-bounce" />
                      Login
                    </Button>
                    <Button
                      onClick={() => {
                        setAuthMode("signup");
                        setAuthModalOpen(true);
                      }}
                      className="bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600 hover:from-purple-500 hover:via-blue-500 hover:to-purple-500 text-white border-2 border-white/30 shadow-2xl font-bold transition-all duration-300 hover:scale-105 animate-pulse group relative z-50"
                    >
                      <Trophy className="w-4 h-4 mr-2 group-hover:animate-spin" />
                      <span>Sign Up</span>
                      <Zap className="w-4 h-4 ml-2 group-hover:animate-bounce" />
                    </Button>
                  </>
                )}
              </>
            )}
          </div>

          {/* Enhanced Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-white hover:bg-white/20 backdrop-blur-sm border-2 border-white/20 rounded-xl transition-all duration-300 hover:scale-110"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu className="w-6 h-6" />
          </Button>
        </div>

        {/* Enhanced Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-6 py-6 border-t-2 border-white/20 backdrop-blur-xl bg-black/30 rounded-2xl animate-slide-up">
            <nav className="flex flex-col gap-4">
              {[
                { name: "Home", href: "/" },
                { name: "Categories", href: "/categories" },
                { name: "Leaderboard", href: "/leaderboard" },
                { name: "Contests", href: "/contests" },
                { name: "Rewards", href: "/rewards" },
                { name: "Help", href: "#", onClick: triggerTour },
              ].map((link, index) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => {
                    if (link.onClick) {
                      e.preventDefault();
                      link.onClick();
                      setIsMenuOpen(false);
                    }
                  }}
                  className="text-white/90 hover:text-white transition-all duration-300 font-bold text-lg py-3 px-4 rounded-xl hover:bg-white/10 border-l-4 border-transparent hover:border-electric-400 animate-fade-in cursor-pointer"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {link.name}
                </a>
              ))}
              <div className="flex flex-col gap-3 mt-6 px-4">
                {!loading && (
                  <>
                    {user && userData ? (
                      <div className="text-center text-white">
                        <div
                          onClick={() => {
                            window.location.href = "/profile";
                            setIsMenuOpen(false);
                          }}
                          className="font-bold text-lg mb-2 cursor-pointer hover:text-electric-300 transition-colors"
                        >
                          {userData.displayName}
                        </div>
                        <div className="text-sm text-electric-300 flex justify-center gap-4 mb-4">
                          <span>💰 {userData.coins}</span>
                          <span>❤️ {userData.lives}</span>
                          <span>⭐ {userData.totalStars}</span>
                        </div>
                        <Button
                          variant="outline"
                          onClick={signOut}
                          className="w-full bg-white/10 border-2 border-white/30 text-white hover:bg-white/20 backdrop-blur-sm font-bold transition-all duration-300 hover:scale-105"
                        >
                          <LogOut className="w-4 h-4 mr-2" />
                          Sign Out
                        </Button>
                      </div>
                    ) : (
                      <>
                        <Button
                          variant="outline"
                          onClick={() => {
                            setAuthMode("signin");
                            setAuthModalOpen(true);
                            setIsMenuOpen(false);
                          }}
                          className="bg-white/10 border-2 border-white/30 text-white hover:bg-white/20 backdrop-blur-sm font-bold transition-all duration-300 hover:scale-105"
                        >
                          <User className="w-4 h-4 mr-2" />
                          Sign In
                        </Button>
                        <Button
                          onClick={() => {
                            setAuthMode("signup");
                            setAuthModalOpen(true);
                            setIsMenuOpen(false);
                          }}
                          className="bg-gradient-to-r from-neon-500 via-electric-500 to-magic-500 hover:from-neon-400 hover:via-electric-400 hover:to-magic-400 text-white font-bold transition-all duration-300 hover:scale-105 animate-glow"
                        >
                          <Trophy className="w-4 h-4 mr-2" />
                          Sign Up
                          <Zap className="w-4 h-4 ml-2" />
                        </Button>
                      </>
                    )}
                  </>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>

      {/* Bottom border glow */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-electric-400 via-magic-400 to-neon-400 animate-pulse" />

      {/* Auth Modal */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        defaultTab={authMode}
      />
    </header>
  );
};
