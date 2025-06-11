import { Clock, Trophy, Zap } from "lucide-react";
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
    <div className="relative overflow-hidden bg-gradient-to-r from-danger-600 via-fire-500 to-danger-600 text-white">
      {/* Animated background shimmer */}
      <div className="absolute inset-0 bg-shimmer animate-shimmer" />

      <div className="relative container mx-auto px-4 py-3">
        <div className="flex items-center justify-center gap-4 text-sm md:text-base font-medium">
          <div className="flex items-center gap-2">
            <Trophy className="w-5 h-5 animate-bounce-subtle" />
            <span className="font-bold">MEGA CONTEST ALERT!</span>
          </div>

          <div className="hidden sm:block w-px h-6 bg-white/30" />

          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            <span>Ends in:</span>
            <div className="font-mono font-bold bg-black/20 px-2 py-1 rounded">
              {String(timeLeft.hours).padStart(2, "0")}:
              {String(timeLeft.minutes).padStart(2, "0")}:
              {String(timeLeft.seconds).padStart(2, "0")}
            </div>
          </div>

          <div className="hidden md:flex items-center gap-2">
            <Zap className="w-4 h-4 text-yellow-300" />
            <span className="font-semibold">Win iPhone 15 Pro Max!</span>
          </div>
        </div>
      </div>
    </div>
  );
};
