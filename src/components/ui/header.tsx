import { Button } from "@/components/ui/button";
import {
  Brain,
  Menu,
  User,
  Trophy,
  Sparkles,
  Zap,
  LogOut,
  ThumbsUp,
  ThumbsDown,
  Globe,
} from "lucide-react";
import { useState } from "react";
import { PhoneAuthModal } from "@/components/ui/phone-auth-modal";
import { useAuth } from "@/components/providers/AuthProvider";
import { isFirebaseReady } from "@/lib/firebase";
import { useOnboarding } from "@/hooks/use-onboarding";
import { useLanguageStore, supportedLanguages } from "@/lib/languages";
import { submitFeedback } from "@/lib/feedback";
import { useQuizAudio } from "@/components/ui/quiz-audio-system";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [phoneAuthModalOpen, setPhoneAuthModalOpen] = useState(false);
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
  const { user, userData, loading, signOut } = useAuth();
  const { triggerTour } = useOnboarding();
  const { currentLanguage, setLanguage, t } = useLanguageStore();
  const {
    isEnabled,
    masterVolume,
    backgroundMusicEnabled,
    toggleAudio,
    setMasterVolume,
    toggleBackgroundMusic,
  } = useQuizAudio();

  const handleFeedback = (type: "like" | "dislike") => {
    submitFeedback(type);
  };

  return (
    <header className="relative z-50 bg-black/30 backdrop-blur-xl border-b-2 border-white/20 shadow-2xl">
      <div className="container mx-auto px-4 py-4 relative">
        <div className="flex items-center justify-between gap-4 lg:gap-8">
          {/* Enhanced Logo */}
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-16 h-16 bg-gradient-to-br from-electric-400 via-magic-500 to-neon-500 rounded-2xl flex items-center justify-center shadow-2xl">
                <Brain className="w-8 h-8 text-white" />
              </div>
            </div>
            <div>
              <h1 className="text-3xl font-display font-black bg-gradient-to-r from-white via-electric-200 to-neon-200 bg-clip-text text-transparent drop-shadow-lg">
                Quiz2Play
              </h1>
              <p className="text-sm text-electric-300 font-bold">
                🚀 Win. Learn. Dominate. 🚀
              </p>
            </div>
          </div>

          {/* Enhanced Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
            {[
              { name: t("home"), href: "/" },
              { name: t("categories"), href: "/categories" },
              { name: t("leaderboard"), href: "/leaderboard" },
              { name: t("gratifications"), href: "/rewards" },
              { name: t("faq"), href: "#", onClick: triggerTour },
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
            {/* Feedback Buttons */}
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleFeedback("like")}
                className="text-white hover:bg-green-500/20 hover:text-green-400 transition-all duration-300 p-2"
                title={t("likePortal")}
              >
                <ThumbsUp className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleFeedback("dislike")}
                className="text-white hover:bg-red-500/20 hover:text-red-400 transition-all duration-300 p-2"
                title={t("dislikePortal")}
              >
                <ThumbsDown className="w-4 h-4" />
              </Button>
            </div>

            {/* Language Selector */}
            <div className="relative">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}
                className="text-white hover:bg-white/10 transition-all duration-300 p-2 flex items-center gap-2"
              >
                <Globe className="w-4 h-4" />
                <span className="text-sm">
                  {
                    supportedLanguages.find((l) => l.code === currentLanguage)
                      ?.flag
                  }
                </span>
              </Button>

              {showLanguageDropdown && (
                <div className="absolute top-full right-0 mt-2 bg-black/90 backdrop-blur-md border border-white/20 rounded-xl p-2 min-w-[150px] z-50">
                  {supportedLanguages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setLanguage(lang.code);
                        setShowLanguageDropdown(false);
                      }}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all duration-200 flex items-center gap-3 ${
                        currentLanguage === lang.code
                          ? "bg-electric-500/20 text-electric-300"
                          : "text-white hover:bg-white/10"
                      }`}
                    >
                      <span className="text-lg">{lang.flag}</span>
                      <span>{lang.nativeName}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

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
                      {t("signOut")}
                    </Button>
                  </div>
                ) : null}
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
                { name: t("home"), href: "/" },
                { name: t("categories"), href: "/categories" },
                { name: t("leaderboard"), href: "/leaderboard" },
                { name: t("gratifications"), href: "/rewards" },
                { name: t("faq"), href: "#", onClick: triggerTour },
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
                {!loading && user && userData && (
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
                      {t("signOut")}
                    </Button>
                  </div>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>

      {/* Phone Auth Modal */}
      <PhoneAuthModal
        isOpen={phoneAuthModalOpen}
        onClose={() => setPhoneAuthModalOpen(false)}
        onSuccess={() => {
          setPhoneAuthModalOpen(false);
          // Potentially refresh user data or redirect if needed
        }}
      />
    </header>
  );
};
