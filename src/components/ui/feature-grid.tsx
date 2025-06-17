import {
  Trophy,
  Zap,
  Crown,
  Gift,
  Target,
  Star,
  Coins,
  Timer,
  Medal,
  Calendar,
  Grid3X3,
  Award,
} from "lucide-react";

const features = [
  {
    icon: Trophy,
    title: "Win Real Prizes",
    description:
      "iPhone 15 Pro Max, cash rewards, and exclusive merchandise waiting for you.",
    color: "from-fire-500 to-danger-500",
    bgColor: "bg-fire-500/10",
    borderColor: "border-fire-400/30",
    animation: "bounce",
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description:
      "Quick 60-second rounds. Test your knowledge and reflexes in rapid-fire questions.",
    color: "from-electric-500 to-brand-500",
    bgColor: "bg-electric-500/10",
    borderColor: "border-electric-400/30",
    animation: "pulse",
  },
  {
    icon: Crown,
    title: "Become a Champion",
    description:
      "Climb the leaderboard and earn your crown as the ultimate quiz master.",
    color: "from-magic-500 to-fire-500",
    bgColor: "bg-magic-500/10",
    borderColor: "border-magic-400/30",
    animation: "float",
  },
  {
    icon: Gift,
    title: "Daily Rewards",
    description:
      "Login bonuses, streak rewards, and surprise gifts to keep you motivated.",
    color: "from-neon-500 to-electric-500",
    bgColor: "bg-neon-500/10",
    borderColor: "border-neon-400/30",
    animation: "bounce",
  },
  {
    icon: Target,
    title: "Multiple Categories",
    description:
      "General knowledge, sports, technology, movies, and more. Find your expertise!",
    color: "from-brand-500 to-magic-500",
    bgColor: "bg-brand-500/10",
    borderColor: "border-brand-400/30",
    animation: "spin",
  },
  {
    icon: Star,
    title: "Achievements",
    description:
      "Unlock badges, level up your profile, and show off your quiz mastery.",
    color: "from-fire-500 to-magic-500",
    bgColor: "bg-fire-500/10",
    borderColor: "border-fire-400/30",
    animation: "glow",
  },
];

export const FeatureGrid = () => {
  return (
    <section className="relative py-6 sm:py-16 lg:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-bold text-white mb-4 sm:mb-6 px-2">
            Why Choose{" "}
            <span className="bg-gradient-to-r from-electric-400 to-magic-400 bg-clip-text text-transparent">
              Quiz2Play?
            </span>
          </h2>
          <p className="text-lg sm:text-xl text-white/70 max-w-3xl mx-auto px-4">
            Join thousands of players in the most exciting quiz platform. Win
            amazing prizes while expanding your knowledge!
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 max-w-7xl mx-auto px-2 sm:px-0">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className={`group relative bg-white/5 backdrop-blur-sm rounded-2xl border ${feature.borderColor} p-6 sm:p-8 hover:bg-white/10 transition-all duration-500 hover:scale-105 hover:shadow-2xl transform animate-fadeInUp touch-manipulation`}
                style={{
                  animationDelay: `${index * 150}ms`,
                  animationFillMode: "both",
                  minHeight: "300px",
                }}
              >
                {/* Gradient overlay on hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-2xl bg-gradient-to-br from-white to-transparent" />

                {/* Icon with Enhanced Animations */}
                <div
                  className={`relative w-14 h-14 sm:w-16 sm:h-16 ${feature.bgColor} rounded-xl flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-all duration-500 ease-out overflow-hidden`}
                >
                  {/* Animated background glow */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-r ${feature.color} opacity-0 group-hover:opacity-20 rounded-xl transition-opacity duration-500`}
                  />

                  {/* Pulse ring effect */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-r ${feature.color} opacity-20 rounded-xl animate-ping`}
                  />

                  {/* Icon with smart animations */}
                  <Icon
                    className={`relative z-10 w-7 h-7 sm:w-8 sm:h-8 text-white transition-all duration-300 transform group-hover:scale-110 ${
                      feature.animation === "bounce"
                        ? "group-hover:animate-bounce"
                        : feature.animation === "pulse"
                          ? "group-hover:animate-pulse"
                          : feature.animation === "float"
                            ? "group-hover:animate-float"
                            : feature.animation === "spin"
                              ? "group-hover:animate-spin"
                              : feature.animation === "glow"
                                ? "group-hover:animate-glow"
                                : "group-hover:scale-110"
                    }`}
                    style={{
                      filter: "drop-shadow(0 0 12px rgba(255,255,255,0.4))",
                    }}
                  />

                  {/* Floating particles effect */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div
                      className={`absolute top-1 right-1 w-1 h-1 bg-gradient-to-r ${feature.color} rounded-full animate-ping`}
                    />
                    <div
                      className={`absolute bottom-1 left-1 w-1 h-1 bg-gradient-to-r ${feature.color} rounded-full animate-ping delay-100`}
                    />
                    <div
                      className={`absolute top-1 left-1 w-0.5 h-0.5 bg-gradient-to-r ${feature.color} rounded-full animate-ping delay-200`}
                    />
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-lg sm:text-xl font-display font-bold text-white mb-3 sm:mb-4 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-electric-200 group-hover:bg-clip-text transition-all duration-300 leading-tight">
                  {feature.title}
                </h3>
                <p className="text-white/70 text-sm sm:text-base leading-relaxed group-hover:text-white/80 transition-colors duration-300 line-clamp-4">
                  {feature.description}
                </p>

                {/* Interactive hover indicator */}
                <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div
                    className={`w-2 h-2 bg-gradient-to-r ${feature.color} rounded-full animate-pulse`}
                  />
                </div>

                {/* Glow effect */}
                <div
                  className={`absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300 rounded-2xl bg-gradient-to-r ${feature.color} blur-xl -z-10`}
                />

                {/* Mobile touch feedback */}
                <div className="absolute inset-0 opacity-0 active:opacity-10 bg-white rounded-2xl transition-opacity duration-150 pointer-events-none" />
              </div>
            );
          })}
        </div>

        {/* Mobile CTA */}
        <div className="mt-12 sm:mt-16 text-center">
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/20 p-6 sm:p-8 max-w-2xl mx-auto">
            <h3 className="text-xl sm:text-2xl font-display font-bold text-white mb-3 sm:mb-4">
              Ready to Start Your Quiz Journey?
            </h3>
            <p className="text-white/70 mb-4 sm:mb-6 text-sm sm:text-base">
              Join millions of players worldwide and start winning today!
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <button
                className="bg-gradient-to-r from-electric-600 to-magic-600 hover:from-electric-700 hover:to-magic-700 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 hover:scale-105 touch-manipulation"
                onClick={() => (window.location.href = "/categories")}
              >
                Start Playing Now
              </button>
              <button
                className="border border-white/20 text-white hover:bg-white/10 font-semibold py-3 px-6 rounded-xl transition-all duration-300 hover:scale-105 touch-manipulation"
                onClick={() => (window.location.href = "/leaderboard")}
              >
                View Leaderboard
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
