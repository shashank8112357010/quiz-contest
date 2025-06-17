import {
  Trophy,
  Zap,
  Crown,
  Gift,
  Star,
  Sparkles,
  Coins,
  Target,
  Brain,
  Rocket,
  Diamond,
  Heart,
  Flame,
  Smartphone,
} from "lucide-react";

// Main Quiz2Play Logo with Animation
export const Quiz2PlayLogo = ({
  size = "lg",
}: {
  size?: "sm" | "md" | "lg" | "xl";
}) => {
  const sizeClasses = {
    sm: "w-8 h-8 text-lg",
    md: "w-12 h-12 text-2xl",
    lg: "w-16 h-16 text-3xl",
    xl: "w-24 h-24 text-4xl",
  };

  return (
    <div className="relative group">
      {/* Orbiting particles */}
      <div
        className="absolute inset-0 animate-spin"
        style={{ animationDuration: "8s" }}
      >
        <div className="absolute -top-2 left-1/2 w-2 h-2 bg-electric-400 rounded-full animate-pulse"></div>
        <div className="absolute top-1/2 -right-2 w-2 h-2 bg-magic-400 rounded-full animate-pulse"></div>
        <div className="absolute -bottom-2 left-1/2 w-2 h-2 bg-neon-400 rounded-full animate-pulse"></div>
        <div className="absolute top-1/2 -left-2 w-2 h-2 bg-gold-400 rounded-full animate-pulse"></div>
      </div>

      {/* Main logo container */}
      <div
        className={`${sizeClasses[size]} bg-gradient-to-br from-electric-400 via-magic-500 to-neon-500 rounded-2xl flex items-center justify-center shadow-2xl animate-glow group-hover:scale-110 transition-transform duration-300`}
      >
        <Brain className="text-white animate-pulse" />
      </div>

      {/* Crown badge */}
      <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-r from-gold-400 to-yellow-500 rounded-full flex items-center justify-center animate-bounce-subtle">
        <Crown className="w-3 h-3 text-white" />
      </div>

      {/* Sparkle effects */}
      <div className="absolute -top-2 -left-2 text-yellow-400 animate-bounce">
        <Sparkles className="w-4 h-4" />
      </div>
    </div>
  );
};

// iPhone Prize Logo
export const iPhonePrizeLogo = () => {
  return (
    <div className="relative group cursor-pointer">
      {/* Glowing background */}
      <div className="absolute inset-0 bg-gradient-to-r from-pink-500/30 to-purple-500/30 rounded-3xl blur-xl animate-pulse group-hover:blur-2xl transition-all duration-300"></div>

      {/* Main container */}
      <div className="relative bg-gradient-to-br from-gray-800 to-black rounded-3xl p-6 border-2 border-white/20 shadow-2xl hover:scale-105 transition-transform duration-300">
        {/* iPhone icon */}
        <div className="flex justify-center mb-4">
          <div className="relative">
            <Smartphone className="w-16 h-16 text-white animate-float" />
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center animate-ping">
              <span className="text-white text-xs font-bold">!</span>
            </div>
          </div>
        </div>

        {/* Text */}
        <div className="text-center">
          <h3 className="text-xl font-black bg-gradient-to-r from-white via-electric-200 to-neon-200 bg-clip-text text-transparent">
            iPhone 15 Pro Max
          </h3>
          <p className="text-sm text-electric-400 font-bold animate-pulse">
            🎯 Grand Prize 🎯
          </p>
        </div>

        {/* Floating particles */}
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-electric-400 rounded-full animate-ping"
            style={{
              left: `${20 + Math.random() * 60}%`,
              top: `${20 + Math.random() * 60}%`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
};

// Mega Contest Badge
export const MegaContestBadge = () => {
  return (
    <div className="relative group">
      {/* Background glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 rounded-2xl blur-lg animate-pulse opacity-75"></div>

      {/* Main badge */}
      <div className="relative bg-gradient-to-r from-red-600 via-orange-500 to-yellow-500 rounded-2xl p-4 border-2 border-white/30 shadow-2xl animate-bounce-subtle">
        <div className="flex items-center gap-3">
          <div className="relative">
            <Trophy
              className="w-8 h-8 text-white animate-spin"
              style={{ animationDuration: "3s" }}
            />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-white rounded-full animate-ping"></div>
          </div>

          <div>
            <div className="text-white font-black text-lg">MEGA CONTEST</div>
            <div className="text-yellow-200 text-sm font-bold animate-pulse">
              🔥 LIVE NOW 🔥
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Daily Bonus Logo
export const DailyBonusLogo = () => {
  return (
    <div className="relative group">
      {/* Coin animation background */}
      <div
        className="absolute inset-0 animate-spin"
        style={{ animationDuration: "4s" }}
      >
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-gold-400 rounded-full"
            style={{
              transform: `rotate(${i * 45}deg) translateY(-20px)`,
              animationDelay: `${i * 0.1}s`,
            }}
          />
        ))}
      </div>

      {/* Main container */}
      <div className="relative w-20 h-20 bg-gradient-to-br from-gold-400 to-yellow-600 rounded-full flex items-center justify-center shadow-2xl animate-bounce-subtle border-4 border-white/30">
        <Coins className="w-8 h-8 text-white animate-pulse" />

        {/* Sparkle overlay */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-t from-transparent to-white/20 animate-pulse"></div>
      </div>

      {/* Gift ribbon */}
      <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-pink-500 to-red-500 rounded-full flex items-center justify-center animate-bounce">
        <Gift className="w-3 h-3 text-white" />
      </div>
    </div>
  );
};

// Streak Fire Logo
export const StreakFireLogo = ({ streak }: { streak: number }) => {
  return (
    <div className="relative group">
      {/* Fire glow effect */}
      <div className="absolute inset-0 bg-gradient-to-t from-red-500 via-orange-500 to-yellow-500 rounded-full blur-lg animate-pulse opacity-80"></div>

      {/* Main fire icon */}
      <div className="relative w-16 h-16 bg-gradient-to-t from-red-600 via-orange-500 to-yellow-400 rounded-full flex items-center justify-center shadow-2xl">
        <Flame className="w-8 h-8 text-white animate-bounce" />
      </div>

      {/* Streak number */}
      <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-black/80 text-white px-2 py-1 rounded-full text-xs font-bold border border-white/20">
        {streak}
      </div>

      {/* Floating sparks */}
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 bg-yellow-400 rounded-full animate-ping"
          style={{
            left: `${30 + Math.random() * 40}%`,
            top: `${30 + Math.random() * 40}%`,
            animationDelay: `${Math.random() * 1}s`,
          }}
        />
      ))}
    </div>
  );
};

// Power-Up Logos
export const PowerUpLogo = ({
  type,
  count,
}: {
  type: "fiftyFifty" | "flip" | "expertPoll";
  count: number;
}) => {
  const powerConfig = {
    fiftyFifty: {
      icon: Target,
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-500/20",
      label: "50-50",
    },
    flip: {
      icon: Rocket,
      color: "from-purple-500 to-pink-500",
      bgColor: "bg-purple-500/20",
      label: "Flip",
    },
    expertPoll: {
      icon: Brain,
      color: "from-green-500 to-emerald-500",
      bgColor: "bg-green-500/20",
      label: "Expert",
    },
  };

  const config = powerConfig[type];
  const IconComponent = config.icon;

  return (
    <div className="relative group">
      {/* Background glow */}
      <div
        className={`absolute inset-0 bg-gradient-to-r ${config.color} rounded-xl blur-md opacity-60 animate-pulse`}
      ></div>

      {/* Main container */}
      <div
        className={`relative bg-gradient-to-r ${config.color} rounded-xl p-3 border-2 border-white/20 shadow-xl hover:scale-110 transition-transform duration-300`}
      >
        <div className="flex items-center gap-2">
          <IconComponent className="w-6 h-6 text-white animate-pulse" />
          <div className="text-white">
            <div className="text-xs font-bold">{config.label}</div>
            <div className="text-xs opacity-80">×{count}</div>
          </div>
        </div>
      </div>

      {/* Count badge */}
      {count > 0 && (
        <div className="absolute -top-2 -right-2 w-5 h-5 bg-gold-500 rounded-full flex items-center justify-center text-white text-xs font-bold animate-bounce">
          {count}
        </div>
      )}
    </div>
  );
};

// Achievement Badge
export const AchievementBadge = ({
  title,
  icon,
  rarity = "common",
}: {
  title: string;
  icon: string;
  rarity?: "common" | "rare" | "epic" | "legendary";
}) => {
  const rarityConfig = {
    common: "from-gray-500 to-gray-600",
    rare: "from-blue-500 to-blue-600",
    epic: "from-purple-500 to-purple-600",
    legendary: "from-gold-400 to-orange-500",
  };

  return (
    <div className="relative group">
      {/* Rarity glow */}
      <div
        className={`absolute inset-0 bg-gradient-to-r ${rarityConfig[rarity]} rounded-2xl blur-lg opacity-60 animate-pulse`}
      ></div>

      {/* Main badge */}
      <div
        className={`relative bg-gradient-to-r ${rarityConfig[rarity]} rounded-2xl p-4 border-2 border-white/30 shadow-2xl hover:scale-105 transition-transform duration-300`}
      >
        <div className="text-center">
          <div className="text-4xl mb-2 animate-bounce">{icon}</div>
          <div className="text-white font-bold text-sm">{title}</div>
        </div>

        {/* Sparkle effects for rare+ items */}
        {rarity !== "common" && (
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(6)].map((_, i) => (
              <Sparkles
                key={i}
                className="absolute w-3 h-3 text-white/60 animate-ping"
                style={{
                  left: `${20 + Math.random() * 60}%`,
                  top: `${20 + Math.random() * 60}%`,
                  animationDelay: `${Math.random() * 2}s`,
                }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// Lucky Spin Wheel Logo
export const LuckySpinLogo = () => {
  return (
    <div className="relative group">
      {/* Outer spinning ring */}
      <div
        className="absolute inset-0 w-20 h-20 border-4 border-dashed border-rainbow rounded-full animate-spin"
        style={{ animationDuration: "3s" }}
      >
        <div
          className="absolute inset-2 border-4 border-dotted border-gold-400 rounded-full animate-spin"
          style={{ animationDuration: "2s", animationDirection: "reverse" }}
        ></div>
      </div>

      {/* Center wheel */}
      <div className="relative w-20 h-20 bg-gradient-to-br from-purple-600 via-pink-500 to-red-500 rounded-full flex items-center justify-center shadow-2xl">
        <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
          <Star
            className="w-8 h-8 text-white animate-spin"
            style={{ animationDuration: "1s" }}
          />
        </div>
      </div>

      {/* Pointer */}
      <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-b-8 border-l-transparent border-r-transparent border-b-white animate-bounce"></div>
    </div>
  );
};

// Category Icons with Animation
export const CategoryIcon = ({
  emoji,
  color,
  isLocked = false,
}: {
  emoji: string;
  color: string;
  isLocked?: boolean;
}) => {
  return (
    <div className="relative group">
      {/* Background glow */}
      <div
        className={`absolute inset-0 bg-gradient-to-r ${color} rounded-2xl blur-lg opacity-40 animate-pulse`}
      ></div>

      {/* Main icon container */}
      <div
        className={`relative w-16 h-16 bg-gradient-to-r ${color} rounded-2xl flex items-center justify-center shadow-2xl border-2 border-white/20 hover:scale-110 transition-transform duration-300 ${isLocked ? "grayscale" : ""}`}
      >
        <span className="text-3xl animate-bounce-subtle">{emoji}</span>

        {/* Lock overlay */}
        {isLocked && (
          <div className="absolute inset-0 bg-black/60 rounded-2xl flex items-center justify-center">
            <div className="text-white text-2xl">🔒</div>
          </div>
        )}
      </div>

      {/* Level indicator */}
      {!isLocked && (
        <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-black/80 text-white px-2 py-1 rounded-full text-xs font-bold border border-white/20">
          Lv.1
        </div>
      )}
    </div>
  );
};

// Leaderboard Crown
export const LeaderboardCrown = ({ position }: { position: 1 | 2 | 3 }) => {
  const crownConfig = {
    1: {
      color: "from-gold-400 to-yellow-500",
      size: "w-12 h-12",
      glow: "shadow-gold-500/50",
    },
    2: {
      color: "from-gray-300 to-gray-400",
      size: "w-10 h-10",
      glow: "shadow-gray-400/50",
    },
    3: {
      color: "from-orange-400 to-orange-500",
      size: "w-8 h-8",
      glow: "shadow-orange-400/50",
    },
  };

  const config = crownConfig[position];

  return (
    <div className="relative">
      {/* Glow effect */}
      <div
        className={`absolute inset-0 bg-gradient-to-r ${config.color} rounded-full blur-md ${config.glow} animate-pulse`}
      ></div>

      {/* Crown */}
      <div
        className={`relative ${config.size} bg-gradient-to-r ${config.color} rounded-full flex items-center justify-center shadow-2xl animate-bounce-subtle`}
      >
        <Crown className="text-white" />
      </div>

      {/* Position number */}
      <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-6 h-6 bg-white rounded-full flex items-center justify-center text-xs font-black text-gray-800">
        {position}
      </div>
    </div>
  );
};
