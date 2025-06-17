import { Clock, Trophy, Zap, Sparkles, Calendar, Gift } from "lucide-react";
import { useEffect, useState } from "react";

export const NotificationBanner = () => {
  // Calculate dynamic contest dates
  const getContestDates = () => {
    const currentDate = new Date();

    // Start date: 15th June 2025 or current date if past June 15th
    const startDate = new Date(2025, 5, 15); // Month is 0-indexed (5 = June)

    // If current date is past start date, use current date
    const actualStartDate = currentDate > startDate ? currentDate : startDate;

    // End date: start date + 90 days
    const endDate = new Date(actualStartDate);
    endDate.setDate(actualStartDate.getDate() + 90);

    return {
      start: actualStartDate,
      end: endDate,
    };
  };

  const [contestDates] = useState(getContestDates());
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const updateTimeLeft = () => {
      const now = new Date();
      const timeDiff = contestDates.end.getTime() - now.getTime();

      if (timeDiff > 0) {
        const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
        );
        const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

        setTimeLeft({ days, hours, minutes, seconds });
      }
    };

    updateTimeLeft();
    const timer = setInterval(updateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, [contestDates.end]);

  const formatDate = (date: Date) => {
    const day = date.getDate();
  const year = date.getFullYear();

  const getSuffix = (d: number) => {
    if (d >= 11 && d <= 13) return "th";
    switch (d % 10) {
      case 1: return "st";
      case 2: return "nd";
      case 3: return "rd";
      default: return "th";
    }
  };

  const month = date.toLocaleString("default", { month: "long" });
  return `${day}${getSuffix(day)} ${month} ${year}`;
  };

  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-700 text-white shadow-2xl border-b-4 border-gold-400">
      {/* Enhanced animated background shimmer */}
      <div className="absolute inset-0 bg-shimmer animate-shimmer opacity-30" />

      {/* Pulsing background */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/50 via-blue-500/50 to-indigo-500/50 animate-pulse" />

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

      {/* Gratification Pictures */}
      <div className="absolute left-4 top-1/2 transform -translate-y-1/2 hidden lg:flex items-center gap-2">
        <div className="w-12 h-12 bg-gradient-to-r from-gold-400 to-yellow-500 rounded-full flex items-center justify-center animate-bounce">
          <Gift className="w-6 h-6 text-white" />
        </div>
        <div className="text-sm">
          <div className="font-bold text-gold-200">₹2,50,000+</div>
          <div className="text-xs text-gold-300">Prizes</div>
        </div>
      </div>

      <div className="absolute right-4 top-1/2 transform -translate-y-1/2 hidden lg:flex items-center gap-2">
        <div className="text-sm text-right">
          <div className="font-bold text-gold-200">100+ Winners</div>
          <div className="text-xs text-gold-300">Daily</div>
        </div>
        <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center animate-pulse">
          <Trophy className="w-6 h-6 text-white" />
        </div>
      </div>

      <div className="relative container mx-auto px-4 py-3">
        {/* Main Contest Alert */}
        <div className="flex items-center justify-center gap-4 text-sm md:text-base font-bold mb-2">
          <div className="flex items-center gap-2 animate-bounce-subtle">
            <Sparkles className="w-5 h-5 text-gold-300 animate-pulse" />
            <span className="font-black text-gold-100 drop-shadow-lg">
              🏆 SUPER BONANZA CONTEST 🏆
            </span>
            <Sparkles className="w-5 h-5 text-gold-300 animate-pulse" />
          </div>
        </div>

        {/* Contest Period and Countdown */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-sm">
          <div className="flex items-center gap-3 bg-black/30 rounded-lg px-3 py-2 backdrop-blur-sm border border-white/20">
            <Calendar className="w-4 h-4 text-gold-300" />
            <span className="text-white font-semibold">Contest Period:</span>
            <span className="font-mono font-bold text-gold-200">
              {formatDate(contestDates.start)} to {formatDate(contestDates.end)}
            </span>
          </div>

          <div className="flex items-center gap-3 bg-black/30 rounded-lg px-3 py-2 backdrop-blur-sm border border-white/20">
            <Clock className="w-4 h-4 text-gold-300 animate-bounce" />
            <span className="text-white font-semibold">Ends in:</span>
            <div className="font-mono font-bold text-gold-200">
              {timeLeft.days}d {String(timeLeft.hours).padStart(2, "0")}:
              {String(timeLeft.minutes).padStart(2, "0")}:
              {String(timeLeft.seconds).padStart(2, "0")}
            </div>
          </div>
        </div>

        {/* Season Info */}
        <div className="text-center mt-2">
          <span className="text-xs font-semibold text-purple-200 bg-purple-900/30 px-3 py-1 rounded-full border border-purple-400/30">
            Season - 1 • 2025
          </span>
        </div>
      </div>

      {/* Bottom glow effect */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-gold-400 via-purple-400 to-blue-400 animate-pulse" />
    </div>
  );
};
