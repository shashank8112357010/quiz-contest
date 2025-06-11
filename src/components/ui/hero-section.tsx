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

export const HeroSection = () => {
  return (
    <section className="relative py-20 lg:py-32">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto text-center">
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

              {/* Main icon container */}
              <div className="relative w-24 h-24 bg-gradient-to-br from-electric-400 via-magic-500 to-neon-500 rounded-3xl flex items-center justify-center animate-float shadow-2xl animate-glow">
                <Smartphone className="w-12 h-12 text-white animate-pulse" />

                {/* Sparkle effects */}
                <div className="absolute -top-2 -left-2 text-yellow-400 animate-bounce">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div
                  className="absolute -bottom-2 -right-2 text-pink-400 animate-bounce"
                  style={{ animationDelay: "0.5s" }}
                >
                  <Star className="w-4 h-4" />
                </div>
              </div>

              {/* Trophy badge */}
              <div className="absolute -top-3 -right-3 w-10 h-10 bg-gradient-to-r from-gold-400 to-yellow-500 rounded-full flex items-center justify-center animate-bounce-subtle shadow-xl border-2 border-white">
                <Trophy className="w-5 h-5 text-white animate-pulse" />
              </div>

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
            <span className="block drop-shadow-2xl animate-bounce-subtle">
              WIN AN
            </span>
            <span className="block bg-gradient-to-r from-electric-300 via-neon-300 via-magic-300 to-gold-300 bg-clip-text text-transparent animate-glow drop-shadow-2xl">
              iPhone 15 Pro Max
            </span>
            <div className="flex justify-center items-center gap-4 mt-4">
              <Crown className="w-16 h-16 text-gold-400 animate-bounce" />
              <Rocket className="w-16 h-16 text-electric-400 animate-pulse" />
              <Star
                className="w-16 h-16 text-neon-400 animate-spin"
                style={{ animationDuration: "3s" }}
              />
            </div>
          </h1>

          {/* Enhanced Subtitle */}
          <p className="text-2xl md:text-3xl text-white font-bold mb-12 max-w-4xl mx-auto leading-relaxed drop-shadow-lg animate-slide-up">
            Complete 10 quiz games and stand a chance to{" "}
            <span className="bg-gradient-to-r from-neon-300 to-electric-300 bg-clip-text text-transparent font-black animate-pulse">
              win amazing prizes
            </span>{" "}
            including the latest iPhone! 🚀✨
          </p>

          {/* Enhanced Feature Badges with animations */}
          <div className="flex flex-wrap justify-center gap-6 mb-16">
            <Badge className="bg-gradient-to-r from-neon-500/30 to-electric-500/30 border-2 border-neon-400 text-neon-100 px-6 py-3 text-lg font-bold backdrop-blur-sm hover:scale-110 transition-transform duration-300 animate-glow">
              <Zap className="w-5 h-5 mr-2 animate-bounce" />
              Instant Rewards
            </Badge>
            <Badge
              className="bg-gradient-to-r from-electric-500/30 to-magic-500/30 border-2 border-electric-400 text-electric-100 px-6 py-3 text-lg font-bold backdrop-blur-sm hover:scale-110 transition-transform duration-300 animate-glow"
              style={{ animationDelay: "0.2s" }}
            >
              <Clock
                className="w-5 h-5 mr-2 animate-spin"
                style={{ animationDuration: "2s" }}
              />
              Quick Games
            </Badge>
            <Badge
              className="bg-gradient-to-r from-magic-500/30 to-neon-500/30 border-2 border-magic-400 text-magic-100 px-6 py-3 text-lg font-bold backdrop-blur-sm hover:scale-110 transition-transform duration-300 animate-glow"
              style={{ animationDelay: "0.4s" }}
            >
              <Users className="w-5 h-5 mr-2 animate-bounce" />
              100K+ Players
            </Badge>
          </div>

          {/* Enhanced CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-20">
            <Button
              size="lg"
              className="bg-gradient-to-r from-magic-500 via-electric-500 to-neon-500 hover:from-magic-400 hover:via-electric-400 hover:to-neon-400 text-white px-12 py-6 text-2xl font-black shadow-2xl hover:shadow-magic-500/50 transition-all duration-300 group min-w-[280px] animate-glow border-2 border-white/20 hover:border-white/40"
              onClick={() => (window.location.href = "/categories")}
            >
              <Play className="w-7 h-7 mr-3 group-hover:scale-125 transition-transform animate-bounce" />
              <span>Start Playing Now</span>
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
              View Leaderboard
            </Button>
          </div>

          {/* Enhanced Stats with glowing cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                value: "₹2,50,000+",
                label: "Total Prizes Won",
                icon: Trophy,
                color: "from-gold-400 to-yellow-500",
              },
              {
                value: "10M+",
                label: "Questions Answered",
                icon: Zap,
                color: "from-electric-400 to-blue-500",
              },
              {
                value: "1L+",
                label: "Active Players",
                icon: Users,
                color: "from-neon-400 to-green-500",
              },
            ].map((stat, index) => (
              <div
                key={index}
                className={`bg-black/30 backdrop-blur-xl rounded-3xl border-2 border-white/20 p-8 hover:bg-black/20 transition-all duration-300 hover:scale-105 hover:shadow-2xl animate-fade-in group`}
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div
                  className={`w-16 h-16 bg-gradient-to-r ${stat.color} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:animate-bounce shadow-lg`}
                >
                  <stat.icon className="w-8 h-8 text-white" />
                </div>
                <div
                  className={`text-4xl font-black bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-2 animate-pulse`}
                >
                  {stat.value}
                </div>
                <div className="text-white/90 font-semibold text-lg">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
