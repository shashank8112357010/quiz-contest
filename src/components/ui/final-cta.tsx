import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Play, Users, Clock, Trophy, ArrowRight } from "lucide-react";

export const FinalCTA = () => {
  return (
    <section className="relative py-20 lg:py-32 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-electric-900/50 via-brand-900/50 to-magic-900/50" />

      {/* Animated elements */}
      <div className="absolute top-10 left-10 w-20 h-20 bg-neon-500/20 rounded-full blur-xl animate-pulse-slow" />
      <div
        className="absolute bottom-10 right-10 w-32 h-32 bg-magic-500/20 rounded-full blur-xl animate-pulse-slow"
        style={{ animationDelay: "1s" }}
      />
      <div
        className="absolute top-1/2 left-1/4 w-16 h-16 bg-electric-500/20 rounded-full blur-xl animate-pulse-slow"
        style={{ animationDelay: "2s" }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* iPhone Contest Badge */}
          <Badge className="bg-gradient-to-r from-neon-500 to-electric-500 text-white px-6 py-3 text-lg font-bold mb-8 animate-bounce-subtle">
            <Trophy className="w-5 h-5 mr-2" />
            iPhone 15 Pro Max Contest Live!
          </Badge>

          {/* Main Headline */}
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-6">
            The Ultimate{" "}
            <span className="bg-gradient-to-r from-neon-400 via-electric-400 to-magic-400 bg-clip-text text-transparent">
              Quiz Challenge
            </span>
          </h2>

          {/* Description */}
          <p className="text-xl md:text-2xl text-white/80 mb-8 leading-relaxed">
            Join the most exciting quiz competition and compete with{" "}
            <span className="text-electric-400 font-bold">50,000+ players</span>{" "}
            for incredible prizes!
          </p>

          {/* Live Stats */}
          <div className="flex flex-wrap justify-center gap-6 mb-12">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl px-6 py-3 border border-white/20">
              <div className="flex items-center gap-2 text-white">
                <Users className="w-5 h-5 text-electric-400" />
                <span className="font-mono font-bold text-xl">47,392</span>
                <span className="text-white/70">Online Now</span>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl px-6 py-3 border border-white/20">
              <div className="flex items-center gap-2 text-white">
                <Clock className="w-5 h-5 text-neon-400" />
                <span className="font-mono font-bold text-xl">2:45</span>
                <span className="text-white/70">Avg. Game Time</span>
              </div>
            </div>
          </div>

          {/* Feature Highlights */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-12">
            <Badge className="bg-neon-500/20 border-neon-400 text-neon-100 px-4 py-3 text-sm font-semibold">
              ⚡ Instant Start
            </Badge>
            <Badge className="bg-electric-500/20 border-electric-400 text-electric-100 px-4 py-3 text-sm font-semibold">
              🏆 Real Prizes
            </Badge>
            <Badge className="bg-magic-500/20 border-magic-400 text-magic-100 px-4 py-3 text-sm font-semibold">
              🎯 Fair Play
            </Badge>
            <Badge className="bg-fire-500/20 border-fire-400 text-fire-100 px-4 py-3 text-sm font-semibold">
              💰 Cash Rewards
            </Badge>
          </div>

          {/* Main CTA Button */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              size="lg"
              className="bg-gradient-to-r from-neon-500 via-electric-500 to-magic-500 hover:from-neon-400 hover:via-electric-400 hover:to-magic-400 text-white px-12 py-6 text-xl font-bold shadow-2xl hover:shadow-neon-500/25 transition-all duration-300 group animate-glow min-w-[280px]"
              onClick={() => (window.location.href = "/categories")}
            >
              <Play className="w-6 h-6 mr-3 group-hover:scale-110 transition-transform" />
              Start Quiz Challenge
              <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>

          {/* Secondary Action */}
          <div className="mt-8">
            <Button
              variant="outline"
              size="lg"
              className="bg-white/5 border-white/20 text-white hover:bg-white/10 backdrop-blur-sm px-8 py-4 text-lg font-semibold"
            >
              View Contest Rules
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="mt-12 pt-8 border-t border-white/20">
            <p className="text-white/60 text-sm mb-4">
              Trusted by thousands of players worldwide
            </p>
            <div className="flex flex-wrap justify-center items-center gap-8 text-white/40">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-neon-400 rounded-full animate-pulse" />
                <span className="text-sm">Live Support</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-electric-400 rounded-full animate-pulse" />
                <span className="text-sm">Secure Platform</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-magic-400 rounded-full animate-pulse" />
                <span className="text-sm">Instant Payouts</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
