import {
  Heart,
  Coins,
  Star,
  Trophy,
  Crown,
  Zap,
  Target,
  Gift,
  Flame,
  Users,
  Clock,
  Signal,
  Wifi,
  Battery,
} from "lucide-react";
import { useState, useEffect } from "react";

interface GameStatusBarProps {
  position?: "top" | "bottom";
  variant?: "compact" | "full";
  showNetworkStatus?: boolean;
}

export const GameStatusBar = ({
  position = "top",
  variant = "compact",
  showNetworkStatus = true,
}: GameStatusBarProps) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isOnline, setIsOnline] = useState(true);
  const [batteryLevel, setBatteryLevel] = useState(85);

  // Mock game data - in real app, these would come from your game state
  const [gameStats, setGameStats] = useState({
    lives: 3,
    coins: 1250,
    score: 89500,
    level: 42,
    streak: 7,
    rank: 156,
    dailyQuests: 2,
    powerUps: {
      fiftyFifty: 3,
      flip: 2,
      expertPoll: 1,
    },
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    // Simulate network status changes
    const networkTimer = setInterval(() => {
      setIsOnline(Math.random() > 0.1); // 90% uptime simulation
    }, 30000);

    return () => {
      clearInterval(timer);
      clearInterval(networkTimer);
    };
  }, []);

  const positionClasses =
    position === "top" ? "top-0 left-0 right-0" : "bottom-0 left-0 right-0";

  if (variant === "compact") {
    return (
      <div className={`fixed ${positionClasses} z-40 p-2`}>
        <div className="bg-black/30 backdrop-blur-xl border-b border-white/10 rounded-lg mx-2">
          <div className="flex items-center justify-between px-4 py-2">
            {/* Left side - Game essentials */}
            <div className="flex items-center gap-4">
              {/* Lives */}
              <div className="flex items-center gap-1">
                <Heart className="w-4 h-4 text-red-400" />
                <span className="text-red-400 font-bold text-sm">
                  {'200000'}
                </span>
              </div>

              {/* Coins */}
              <div className="flex items-center gap-1">
                <div className="w-4 h-4 bg-gradient-to-r from-gold-400 to-yellow-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs">₹</span>
                </div>
                <span className="text-gold-400 font-bold text-sm">
                  {gameStats.coins.toLocaleString()}
                </span>
              </div>

              {/* Level */}
              <div className="flex items-center gap-1">
                <Crown className="w-4 h-4 text-purple-400" />
                <span className="text-purple-400 font-bold text-sm">
                  {gameStats.level}
                </span>
              </div>

              {/* Streak */}
              {gameStats.streak > 0 && (
                <div className="flex items-center gap-1">
                  <Flame className="w-4 h-4 text-orange-400 animate-bounce" />
                  <span className="text-orange-400 font-bold text-sm">
                    {gameStats.streak}
                  </span>
                </div>
              )}
            </div>

            {/* Right side - System status */}
            <div className="flex items-center gap-3">
              {/* Time */}
              <div className="text-white/80 font-mono text-sm">
                {currentTime.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </div>

              {/* Network status */}
              {showNetworkStatus && (
                <div className="flex items-center gap-1">
                  {isOnline ? (
                    <Wifi className="w-4 h-4 text-green-400" />
                  ) : (
                    <Signal className="w-4 h-4 text-red-400" />
                  )}
                </div>
              )}

              {/* Battery (mobile-like) */}
              <div className="flex items-center gap-1">
                <Battery
                  className={`w-4 h-4 ${batteryLevel > 20 ? "text-green-400" : "text-red-400"}`}
                />
                <span className="text-white/60 text-xs">{batteryLevel}%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Full variant with expanded stats
  return (
    <div className={`fixed ${positionClasses} z-40 p-4`}>
      <div className="bg-black/40 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl">
        <div className="p-4">
          {/* Top row - Primary stats */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-6">
              {/* Lives with animation */}
              <div className="flex items-center gap-2 bg-red-500/20 px-3 py-1 rounded-xl border border-red-400/30">
                <Heart className="w-5 h-5 text-red-400" />
                <div className="flex gap-1">
                  {[...Array(3)].map((_, i) => (
                    <Heart
                      key={i}
                      className={`w-3 h-3 ${
                        i < gameStats.lives
                          ? "text-red-400 fill-current animate-pulse"
                          : "text-gray-500"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-red-400 font-bold text-sm">
                  {gameStats.lives}
                </span>
              </div>

              {/* Score with animation */}
              <div className="flex items-center gap-2 bg-electric-500/20 px-3 py-1 rounded-xl border border-electric-400/30">
                <Star className="w-5 h-5 text-electric-400 animate-pulse" />
                <span className="text-electric-400 font-bold text-lg">
                  {gameStats.score.toLocaleString()}
                </span>
              </div>

              {/* Rank */}
              <div className="flex items-center gap-2 bg-purple-500/20 px-3 py-1 rounded-xl border border-purple-400/30">
                <Trophy className="w-5 h-5 text-purple-400" />
                <span className="text-purple-400 font-bold text-sm">
                  #{gameStats.rank}
                </span>
              </div>
            </div>

            {/* Right side - System info */}
            <div className="flex items-center gap-4">
              <div className="text-white font-mono text-lg">
                {currentTime.toLocaleTimeString()}
              </div>
              <div
                className={`flex items-center gap-1 ${isOnline ? "text-green-400" : "text-red-400"}`}
              >
                {isOnline ? (
                  <Wifi className="w-5 h-5" />
                ) : (
                  <Signal className="w-5 h-5" />
                )}
                <span className="text-sm font-semibold">
                  {isOnline ? "Online" : "Offline"}
                </span>
              </div>
            </div>
          </div>

          {/* Bottom row - Secondary stats and power-ups */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {/* Coins */}
              <div className="flex items-center gap-2">
                <div
                  className="w-6 h-6 bg-gradient-to-r from-gold-400 to-yellow-500 rounded-full flex items-center justify-center animate-spin"
                  style={{ animationDuration: "3s" }}
                >
                  <span className="text-white text-xs font-bold">₹</span>
                </div>
                <span className="text-gold-400 font-bold text-lg">
                  {gameStats.coins.toLocaleString()}
                </span>
              </div>

              {/* Level progress */}
              <div className="flex items-center gap-2">
                <Crown className="w-5 h-5 text-purple-400" />
                <span className="text-purple-400 font-bold">
                  Level {gameStats.level}
                </span>
              </div>

              {/* Daily quests */}
              <div className="flex items-center gap-2">
                <Gift className="w-5 h-5 text-pink-400" />
                <span className="text-pink-400 font-bold text-sm">
                  {gameStats.dailyQuests}/3
                </span>
              </div>

              {/* Streak */}
              {gameStats.streak > 0 && (
                <div className="flex items-center gap-2 bg-orange-500/20 px-2 py-1 rounded-lg border border-orange-400/30">
                  <Flame className="w-4 h-4 text-orange-400 animate-bounce" />
                  <span className="text-orange-400 font-bold text-sm">
                    {gameStats.streak} streak
                  </span>
                </div>
              )}
            </div>

            {/* Power-ups quick access */}
            <div className="flex items-center gap-2">
              <div className="text-white/60 text-xs font-semibold mr-2">
                Powers:
              </div>

              {/* 50-50 */}
              <div className="flex items-center gap-1 bg-blue-500/20 px-2 py-1 rounded border border-blue-400/30">
                <Target className="w-3 h-3 text-blue-400" />
                <span className="text-blue-400 text-xs font-bold">
                  {gameStats.powerUps.fiftyFifty}
                </span>
              </div>

              {/* Flip */}
              <div className="flex items-center gap-1 bg-purple-500/20 px-2 py-1 rounded border border-purple-400/30">
                <Zap className="w-3 h-3 text-purple-400" />
                <span className="text-purple-400 text-xs font-bold">
                  {gameStats.powerUps.flip}
                </span>
              </div>

              {/* Expert Poll */}
              <div className="flex items-center gap-1 bg-green-500/20 px-2 py-1 rounded border border-green-400/30">
                <Users className="w-3 h-3 text-green-400" />
                <span className="text-green-400 text-xs font-bold">
                  {gameStats.powerUps.expertPoll}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Floating quick stats (alternative minimal view)
export const FloatingGameStats = () => {
  const [stats] = useState({
    lives: 3,
    coins: 1250,
    streak: 7,
  });

  return (
    <div className="fixed top-20 left-4 z-40 flex flex-col gap-2">
      {/* Lives */}
      <div className="bg-black/30 backdrop-blur-xl border border-white/20 rounded-xl p-2 shadow-lg">
        <div className="flex items-center gap-2">
          <Heart className="w-4 h-4 text-red-400" />
          <span className="text-red-400 font-bold text-sm">{stats.lives}</span>
        </div>
      </div>

      {/* Coins */}
      <div className="bg-black/30 backdrop-blur-xl border border-white/20 rounded-xl p-2 shadow-lg">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-gradient-to-r from-gold-400 to-yellow-500 rounded-full flex items-center justify-center">
            <span className="text-white text-xs">₹</span>
          </div>
          <span className="text-gold-400 font-bold text-sm">
            {stats.coins.toLocaleString()}
          </span>
        </div>
      </div>

      {/* Streak */}
      {stats.streak > 0 && (
        <div className="bg-black/30 backdrop-blur-xl border border-white/20 rounded-xl p-2 shadow-lg">
          <div className="flex items-center gap-2">
            <Flame className="w-4 h-4 text-orange-400 animate-bounce" />
            <span className="text-orange-400 font-bold text-sm">
              {stats.streak}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
