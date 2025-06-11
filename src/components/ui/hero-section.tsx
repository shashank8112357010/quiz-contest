import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Smartphone, Play, Trophy, Zap, Clock, Users } from "lucide-react";

export const HeroSection = () => {
  return (
    <section className="relative py-20 lg:py-32">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto text-center">
          {/* Phone Icon with Animation */}
          <div className="mb-8 flex justify-center">
            <div className="relative">
              <div className="w-24 h-24 bg-gradient-to-br from-electric-400 to-magic-500 rounded-2xl flex items-center justify-center animate-float">
                <Smartphone className="w-12 h-12 text-white" />
              </div>
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-neon-400 rounded-full flex items-center justify-center animate-bounce-subtle">
                <Trophy className="w-4 h-4 text-white" />
              </div>
            </div>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-white mb-6">
            <span className="block">WIN AN</span>
            <span className="bg-gradient-to-r from-electric-400 via-neon-400 to-magic-400 bg-clip-text text-transparent">
              iPhone 15 Pro Max
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-white/80 mb-8 max-w-3xl mx-auto font-medium">
            Complete 10 quiz games and stand a chance to{" "}
            <span className="text-neon-400 font-bold">win amazing prizes</span>{" "}
            including the latest iPhone!
          </p>

          {/* Feature Badges */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <Badge className="bg-neon-500/20 border-neon-400 text-neon-100 px-4 py-2 text-sm font-semibold backdrop-blur-sm">
              <Zap className="w-4 h-4 mr-2" />
              Instant Rewards
            </Badge>
            <Badge className="bg-electric-500/20 border-electric-400 text-electric-100 px-4 py-2 text-sm font-semibold backdrop-blur-sm">
              <Clock className="w-4 h-4 mr-2" />
              Quick Games
            </Badge>
            <Badge className="bg-magic-500/20 border-magic-400 text-magic-100 px-4 py-2 text-sm font-semibold backdrop-blur-sm">
              <Users className="w-4 h-4 mr-2" />
              100K+ Players
            </Badge>
          </div>

          {/* CTA Button */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              size="lg"
              className="bg-gradient-to-r from-magic-500 to-electric-500 hover:from-magic-400 hover:to-electric-400 text-white px-8 py-4 text-lg font-bold shadow-2xl hover:shadow-magic-500/25 transition-all duration-300 group min-w-[200px]"
              onClick={() => (window.location.href = "/quiz")}
            >
              <Play className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
              Start Playing Now
            </Button>

            <Button
              variant="outline"
              size="lg"
              className="bg-white/10 border-white/20 text-white hover:bg-white/20 backdrop-blur-sm px-8 py-4 text-lg font-semibold min-w-[200px]"
            >
              View Leaderboard
            </Button>
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6">
              <div className="text-3xl font-bold text-neon-400 mb-2">
                ₹50,000+
              </div>
              <div className="text-white/70">Total Prizes Won</div>
            </div>
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6">
              <div className="text-3xl font-bold text-electric-400 mb-2">
                1M+
              </div>
              <div className="text-white/70">Questions Answered</div>
            </div>
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6">
              <div className="text-3xl font-bold text-magic-400 mb-2">50K+</div>
              <div className="text-white/70">Active Players</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
