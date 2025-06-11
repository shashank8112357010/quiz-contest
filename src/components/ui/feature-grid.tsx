import { Trophy, Zap, Crown, Gift, Target, Star } from "lucide-react";

const features = [
  {
    icon: Trophy,
    title: "Win Real Prizes",
    description:
      "iPhone 15 Pro Max, cash rewards, and exclusive merchandise waiting for you.",
    color: "from-fire-500 to-danger-500",
    bgColor: "bg-fire-500/10",
    borderColor: "border-fire-400/30",
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description:
      "Quick 60-second rounds. Test your knowledge and reflexes in rapid-fire questions.",
    color: "from-electric-500 to-brand-500",
    bgColor: "bg-electric-500/10",
    borderColor: "border-electric-400/30",
  },
  {
    icon: Crown,
    title: "Become a Champion",
    description:
      "Climb the leaderboard and earn your crown as the ultimate quiz master.",
    color: "from-magic-500 to-fire-500",
    bgColor: "bg-magic-500/10",
    borderColor: "border-magic-400/30",
  },
  {
    icon: Gift,
    title: "Daily Rewards",
    description:
      "Login bonuses, streak rewards, and surprise gifts to keep you motivated.",
    color: "from-neon-500 to-electric-500",
    bgColor: "bg-neon-500/10",
    borderColor: "border-neon-400/30",
  },
  {
    icon: Target,
    title: "Multiple Categories",
    description:
      "General knowledge, sports, technology, movies, and more. Find your expertise!",
    color: "from-brand-500 to-magic-500",
    bgColor: "bg-brand-500/10",
    borderColor: "border-brand-400/30",
  },
  {
    icon: Star,
    title: "Achievements",
    description:
      "Unlock badges, level up your profile, and show off your quiz mastery.",
    color: "from-fire-500 to-magic-500",
    bgColor: "bg-fire-500/10",
    borderColor: "border-fire-400/30",
  },
];

export const FeatureGrid = () => {
  return (
    <section className="relative py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-white mb-6">
            Why Choose{" "}
            <span className="bg-gradient-to-r from-electric-400 to-magic-400 bg-clip-text text-transparent">
              QuizMaster?
            </span>
          </h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            Join thousands of players in the most exciting quiz platform. Win
            amazing prizes while expanding your knowledge!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className={`group relative bg-white/5 backdrop-blur-sm rounded-2xl border ${feature.borderColor} p-8 hover:bg-white/10 transition-all duration-300 hover:scale-105 hover:shadow-2xl`}
              >
                {/* Gradient overlay on hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-2xl bg-gradient-to-br from-white to-transparent" />

                {/* Icon */}
                <div
                  className={`w-16 h-16 ${feature.bgColor} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                >
                  <Icon
                    className={`w-8 h-8 bg-gradient-to-r ${feature.color} bg-clip-text text-transparent`}
                  />
                </div>

                {/* Content */}
                <h3 className="text-xl font-display font-bold text-white mb-4 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-electric-200 group-hover:bg-clip-text transition-all duration-300">
                  {feature.title}
                </h3>
                <p className="text-white/70 leading-relaxed group-hover:text-white/80 transition-colors duration-300">
                  {feature.description}
                </p>

                {/* Glow effect */}
                <div
                  className={`absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300 rounded-2xl bg-gradient-to-r ${feature.color} blur-xl -z-10`}
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
