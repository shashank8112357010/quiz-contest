import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AnimatedBackground } from "@/components/ui/animated-background";
import { Header } from "@/components/ui/header";
import { PhoneAuthModal } from "@/components/ui/phone-auth-modal";
import { useAuth } from "@/components/providers/AuthProvider";
import { useLanguageStore } from "@/lib/languages";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Globe,
  Rabbit,
  BookOpen,
  Scroll,
  Crown,
  Trophy,
  Banknote,
  Newspaper,
  Laptop,
  Zap,
  Atom,
  Compass,
  ChefHat,
  Microscope,
  FlaskConical,
  Lightbulb,
  Feather,
  Tag,
  Telescope,
  Brain,
  History,
  Star,
  Music,
  Target,
  Dumbbell,
  MapPin,
  Utensils,
  HeartPulse,
  TestTube,
  Zap as ZapIcon,
  BookText,
  Award,
} from "lucide-react";

export interface QuizCategory {
  id: string;
  name: string;
  description: string;
  icon: any;
  color: string;
  bgColor: string;
  borderColor: string;
  questionCount: number;
  difficulty: "Easy" | "Medium" | "Hard";
}

export const categories: QuizCategory[] = [
  {
    id: "animal",
    name: "Animal",
    description: "Wildlife, pets, and fascinating creatures of our planet",
    icon: Rabbit,
    color: "from-neon-500 to-electric-500",
    bgColor: "bg-neon-500/10",
    borderColor: "border-neon-400/30",
    questionCount: 125,
    difficulty: "Easy",
  },
  {
    id: "world",
    name: "World",
    description: "Global knowledge, cultures, and international affairs",
    icon: Globe,
    color: "from-brand-500 to-electric-500",
    bgColor: "bg-brand-500/10",
    borderColor: "border-brand-400/30",
    questionCount: 150,
    difficulty: "Medium",
  },
  {
    id: "computer",
    name: "Computer",
    description: "Technology, programming, and digital world",
    icon: Laptop,
    color: "from-electric-500 to-neon-500",
    bgColor: "bg-electric-500/10",
    borderColor: "border-electric-400/30",
    questionCount: 180,
    difficulty: "Hard",
  },
  {
    id: "science",
    name: "Science",
    description: "General science, discoveries, and scientific principles",
    icon: Atom,
    color: "from-magic-500 to-electric-500",
    bgColor: "bg-magic-500/10",
    borderColor: "border-magic-400/30",
    questionCount: 220,
    difficulty: "Hard",
  },
  {
    id: "gk",
    name: "General Knowledge",
    description: "A mix of everything you should know",
    icon: BookOpen,
    color: "from-magic-500 to-fire-500",
    bgColor: "bg-magic-500/10",
    borderColor: "border-magic-400/30",
    questionCount: 300,
    difficulty: "Medium",
  },
  {
    id: "astronomy",
    name: "Astronomy",
    description: "Space, planets, stars, and cosmic phenomena",
    icon: Telescope,
    color: "from-electric-500 to-magic-500",
    bgColor: "bg-electric-500/10",
    borderColor: "border-electric-400/30",
    questionCount: 125,
    difficulty: "Medium",
  },
];

const Categories = () => {
  const { user, userData } = useAuth();
  const navigate = useNavigate();
  const [showLoginModal, setShowLoginModal] = useState(false);

  const handleCategorySelect = (categoryId: string) => {
    // Check if user is logged in
    if (!user || !userData) {
      setShowLoginModal(true);
      return;
    }

    navigate(`/quiz/${categoryId}`);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "text-neon-400 bg-neon-500/20 border-neon-400";
      case "Medium":
        return "text-electric-400 bg-electric-500/20 border-electric-400";
      case "Hard":
        return "text-red-400 bg-red-500/20 border-red-400";
      default:
        return "text-white/70 bg-white/10 border-white/20";
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <AnimatedBackground />

      <div className="relative z-40">
        <Header />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <div className="flex flex-col sm:flex-row lg:px-8 sm:items-center sm:justify-between mb-4">
            <h1 className="text-3xl sm:text-4xl font-display font-bold text-white">
              Choose Your{" "}
              <span className="bg-gradient-to-r from-electric-400 via-neon-400 to-magic-400 bg-clip-text text-transparent">
                Category
              </span>
            </h1>
            <div className="flex gap-3 mt-4 sm:mt-0">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl px-4 py-2 border border-white/20 text-right">
                <div className="text-lg font-bold text-electric-400">
                  {categories.length}
                </div>
                <div className="text-white text-xs">Categories</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl px-4 py-2 border border-white/20 text-right">
                <div className="text-lg font-bold text-neon-400">
                  {categories
                    .reduce((total, cat) => total + cat.questionCount, 0)
                    .toLocaleString()}
                  +
                </div>
                <div className="text-white text-xs">Questions</div>
              </div>
            </div>
          </div>

          <p className="text-xs text-white mb-6 lg:px-8">
            Join our 90-Day Quiz Contest! Play 10 questions daily across 6
            categories and compete with others.
          </p>

          {/* Categories Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 sm:gap-6 max-w-7xl mx-auto px-2 sm:px-0">
            {categories.map((category, index) => {
              const Icon = category.icon;
              return (
                <div
                  key={category.id}
                  className={`group relative bg-white/5 backdrop-blur-sm rounded-2xl border ${category.borderColor} p-4 sm:p-6 hover:bg-white/10 transition-all duration-500 hover:scale-105 hover:shadow-2xl cursor-pointer transform animate-fadeInUp touch-manipulation text-left`}
                  style={{
                    animationDelay: `${index * 100}ms`,
                    animationFillMode: "both",
                    minHeight: "280px",
                  }}
                  onClick={() => handleCategorySelect(category.id)}
                >
                  {/* Question Count Badge Top Right */}
                  <div className="absolute top-4 right-4 z-20">
                    <span className="bg-electric-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                      {category.questionCount} Qs
                    </span>
                  </div>
                  {/* Gradient overlay on hover */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-2xl bg-gradient-to-br from-white to-transparent" />

                  {/* Icon with Enhanced Animations */}
                  <div
                    className={`relative w-12 h-12 sm:w-14 sm:h-14 ${category.bgColor} rounded-xl flex items-center justify-center mb-3 sm:mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 ease-out overflow-hidden`}
                  >
                    {/* Animated background glow */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-r ${category.color} opacity-0 group-hover:opacity-20 rounded-xl transition-opacity duration-500`}
                    />

                    {/* Pulse animation on hover */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-r ${category.color} opacity-0 group-hover:opacity-10 rounded-xl animate-pulse`}
                    />

                    {/* Icon with smart animations */}
                    <Icon
                      className={`relative z-10 w-6 h-6 sm:w-7 sm:h-7 text-white group-hover:text-white transition-all duration-300 transform group-hover:scale-110 ${
                        category.id === "animal"
                          ? "group-hover:animate-bounce"
                          : category.id === "history"
                            ? "group-hover:animate-pulse"
                            : category.id === "celebrity"
                              ? "group-hover:animate-spin"
                              : category.id === "computer"
                                ? "group-hover:animate-pulse"
                                : category.id === "science"
                                  ? "group-hover:rotate-12"
                                  : category.id === "geography"
                                    ? "group-hover:animate-ping"
                                    : "group-hover:scale-110"
                      }`}
                      style={{
                        filter: "drop-shadow(0 0 8px rgba(255,255,255,0.3))",
                      }}
                    />

                    {/* Floating particles effect */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <div
                        className={`absolute top-1 right-1 w-1 h-1 bg-gradient-to-r ${category.color} rounded-full animate-ping`}
                      />
                      <div
                        className={`absolute bottom-1 left-1 w-1 h-1 bg-gradient-to-r ${category.color} rounded-full animate-ping delay-100`}
                      />
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="text-base sm:text-lg font-display font-bold text-white mb-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-electric-200 group-hover:bg-clip-text transition-all duration-300 leading-tight text-left">
                    {category.name}
                  </h3>

                  <p className="text-white/70 text-xs sm:text-sm leading-relaxed mb-3 sm:mb-4 group-hover:text-white/80 transition-colors duration-300 line-clamp-3 text-left">
                    {category.description}
                  </p>

                  {/* Stats */}
                  <div className="flex items-center mb-3 sm:mb-4">
                    <Badge
                      className={`${getDifficultyColor(category.difficulty)} text-xs px-2 py-1`}
                    >
                      {category.difficulty}
                    </Badge>
                    {!user && (
                      <div className="text-orange-400 text-xs flex items-center gap-1 ml-3 mt-1">
                        <div className="w-1 h-1 bg-orange-400 rounded-full"></div>
                        Login required
                      </div>
                    )}
                  </div>

                  {/* Play Button */}
                  <Button
                    className={`w-full bg-gradient-to-r ${category.color} hover:shadow-lg transition-all duration-300 text-white border-0 h-10 sm:h-11 text-sm sm:text-base font-semibold touch-manipulation`}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCategorySelect(category.id);
                    }}
                  >
                    {user && userData ? "Start Quiz" : "Login to Play"}
                  </Button>

                  {/* Glow effect */}
                  <div
                    className={`absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300 rounded-2xl bg-gradient-to-r ${category.color} blur-xl -z-10`}
                  />
                </div>
              );
            })}
          </div>
          {/* Question Count Below Each Card */}

          {/* More Categories Coming Soon */}
          <div className="text-center mt-12 sm:mt-16 px-4">
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/20 p-6 sm:p-8 max-w-2xl mx-auto">
              <h3 className="text-xl sm:text-2xl font-display font-bold text-white mb-3 sm:mb-4">
                More Categories Coming Soon!
              </h3>
              <p className="text-white/70 mb-4 sm:mb-6 text-sm sm:text-base">
                We're constantly adding new categories to challenge your
                knowledge. Stay tuned for updates!
              </p>
              <Badge className="bg-electric-500/20 border-electric-400 text-electric-100 px-3 sm:px-4 py-2 text-xs sm:text-sm">
                🚀 New categories every week
              </Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Login Modal for Quiz Access */}
      <PhoneAuthModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onSuccess={() => {
          setShowLoginModal(false);
          // Refresh page to update auth state
          window.location.reload();
        }}
      />
    </div>
  );
};

export default Categories;
