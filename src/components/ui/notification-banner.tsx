import { Clock, Trophy, Zap, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";

export const NotificationBanner = () => {
  const [timeLeft, setTimeLeft] = useState({
    hours: 23,
    minutes: 45,
    seconds: 30,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-pink-600 via-red-500 to-orange-500 text-white shadow-2xl border-b-4 border-yellow-400">
      {/* Enhanced animated background shimmer */}
      <div className="absolute inset-0 bg-shimmer animate-shimmer opacity-30" />

      {/* Pulsing background */}
      <div className="absolute inset-0 bg-gradient-to-r from-red-500/50 via-pink-500/50 to-orange-500/50 animate-pulse" />

      {/* Sparkling effects */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full animate-ping"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      <div className="relative container mx-auto px-4 py-4">
        <div className="flex items-center justify-center gap-6 text-sm md:text-lg font-bold">
          <div className="flex items-center gap-3 animate-bounce-subtle">
            <Trophy
              className="w-6 h-6 text-yellow-300 animate-spin"
              style={{ animationDuration: "3s" }}
            />
            <span className="font-black text-yellow-100 drop-shadow-lg">
              🔥 MEGA CONTEST ALERT! 🔥
            </span>
            <Sparkles className="w-5 h-5 text-yellow-300 animate-pulse" />
          </div>

          <div className="hidden sm:block w-px h-8 bg-white/50 animate-pulse" />

          <div className="flex items-center gap-3 bg-black/30 rounded-full px-4 py-2 backdrop-blur-sm border-2 border-white/20">
            <Clock className="w-5 h-5 text-yellow-300 animate-bounce" />
            <span className="text-white font-semibold">Ends in:</span>
            <div className="font-mono font-black text-xl bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent px-3 py-1 rounded-lg border-2 border-yellow-400/50 shadow-lg animate-pulse">
              {String(timeLeft.hours).padStart(2, "0")}:
              {String(timeLeft.minutes).padStart(2, "0")}:
              <span className="text-red-300">
                {String(timeLeft.seconds).padStart(2, "0")}
              </span>
            </div>
          </div>

          <div
            className="hidden md:flex items-center gap-3 animate-bounce-subtle"
            style={{ animationDelay: "0.5s" }}
          >
            <Zap className="w-5 h-5 text-yellow-300 animate-pulse" />
            <span className="font-black text-yellow-100 drop-shadow-lg">
              Win iPhone 15 Pro Max! 📱✨
            </span>
          </div>
        </div>

        {/* Additional contest info */}
        <div className="text-center mt-2 opacity-90">
          <p className="text-sm font-semibold text-yellow-100 animate-pulse">
            🎁 Over ₹2,50,000 in prizes! • 🏆 100+ Winners Daily! • ⚡ Play Now!
          </p>
        </div>
      </div>

      {/* Bottom glow effect */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 animate-pulse" />
    </div>
  );
};
