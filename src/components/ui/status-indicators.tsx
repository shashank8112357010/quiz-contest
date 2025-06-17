import {
  Wifi,
  WifiOff,
  Volume2,
  VolumeX,
  Battery,
  BatteryLow,
  Signal,
  SignalLow,
  Zap,
  Heart,
  Star,
  Trophy,
  Target,
  Clock,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Loader,
  Crown,
  Flame,
} from "lucide-react";

// Connection Status Indicator
export const ConnectionStatus = ({ isOnline }: { isOnline: boolean }) => {
  return (
    <div
      className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm font-bold ${
        isOnline
          ? "bg-green-500/20 text-green-400 border border-green-400/30"
          : "bg-red-500/20 text-red-400 border border-red-400/30"
      }`}
    >
      {isOnline ? (
        <Wifi className="w-4 h-4 animate-pulse" />
      ) : (
        <WifiOff className="w-4 h-4 animate-bounce" />
      )}
      <span>{isOnline ? "Online" : "Offline"}</span>
    </div>
  );
};

// Lives Counter
export const LivesCounter = ({
  lives,
  maxLives = 3,
}: {
  lives: number;
  maxLives?: number;
}) => {
  return (
    <div className="flex items-center gap-2 bg-red-500/20 px-3 py-2 rounded-xl border border-red-400/30">
      <Heart className="w-5 h-5 text-red-400" />
      <div className="flex gap-1">
        {[...Array(maxLives)].map((_, i) => (
          <Heart
            key={i}
            className={`w-4 h-4 ${
              i < lives
                ? "text-red-400 fill-current animate-pulse"
                : "text-gray-500"
            }`}
          />
        ))}
      </div>
      <span className="text-red-400 font-bold text-sm">{lives}</span>
    </div>
  );
};

// Coins Display
export const CoinsDisplay = ({ coins }: { coins: number }) => {
  return (
    <div className="flex items-center gap-2 bg-gold-500/20 px-4 py-2 rounded-xl border border-gold-400/30 hover:scale-105 transition-transform duration-300">
      <div
        className="w-6 h-6 bg-gradient-to-r from-gold-400 to-yellow-500 rounded-full flex items-center justify-center animate-spin"
        style={{ animationDuration: "3s" }}
      >
        <span className="text-white text-xs font-bold">₹</span>
      </div>
      <span className="text-gold-400 font-black text-lg">
        {coins.toLocaleString()}
      </span>

      {/* Coin sparkle effect */}
      <div className="relative">
        <div className="absolute -top-1 -right-1 w-2 h-2 bg-yellow-400 rounded-full animate-ping"></div>
      </div>
    </div>
  );
};

// Score Display
export const ScoreDisplay = ({
  score,
  isAnimating = false,
}: {
  score: number;
  isAnimating?: boolean;
}) => {
  return (
    <div
      className={`flex items-center gap-2 bg-electric-500/20 px-4 py-2 rounded-xl border border-electric-400/30 ${
        isAnimating ? "animate-bounce" : ""
      }`}
    >
      <Star
        className={`w-5 h-5 text-electric-400 ${isAnimating ? "animate-spin" : ""}`}
      />
      <span className="text-electric-400 font-black text-xl">
        {score.toLocaleString()}
      </span>
    </div>
  );
};

// Timer Display
export const TimerDisplay = ({
  timeLeft,
  isUrgent = false,
}: {
  timeLeft: number;
  isUrgent?: boolean;
}) => {
  return (
    <div
      className={`flex items-center gap-3 px-4 py-3 rounded-2xl border-2 ${
        isUrgent
          ? "bg-red-500/20 border-red-400 text-red-400 animate-pulse"
          : timeLeft <= 10
            ? "bg-orange-500/20 border-orange-400 text-orange-400 animate-bounce"
            : "bg-blue-500/20 border-blue-400 text-blue-400"
      }`}
    >
      <Clock className={`w-6 h-6 ${isUrgent ? "animate-spin" : ""}`} />
      <span className="font-mono font-black text-2xl">{timeLeft}s</span>

      {/* Urgency effects */}
      {isUrgent && (
        <div className="absolute inset-0 rounded-2xl border-2 border-red-400 animate-ping"></div>
      )}
    </div>
  );
};

// Level Progress
export const LevelProgress = ({
  level,
  progress,
}: {
  level: number;
  progress: number;
}) => {
  return (
    <div className="bg-purple-500/20 px-4 py-3 rounded-xl border border-purple-400/30">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <Crown className="w-5 h-5 text-purple-400" />
          <span className="text-purple-400 font-bold">Level {level}</span>
        </div>
        <span className="text-purple-300 text-sm font-semibold">
          {progress}%
        </span>
      </div>

      {/* Progress bar */}
      <div className="w-full bg-purple-900/50 rounded-full h-2 overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-purple-400 to-pink-400 rounded-full transition-all duration-500 animate-pulse"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};

// Streak Counter
export const StreakCounter = ({ streak }: { streak: number }) => {
  return (
    <div className="flex items-center gap-2 bg-orange-500/20 px-3 py-2 rounded-xl border border-orange-400/30">
      <Flame
        className={`w-5 h-5 text-orange-400 ${streak > 0 ? "animate-bounce" : ""}`}
      />
      <span className="text-orange-400 font-black">{streak}</span>
      <span className="text-orange-300 text-sm font-semibold">streak</span>

      {/* Fire particles for high streaks */}
      {streak >= 5 && (
        <div className="relative">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-orange-400 rounded-full animate-ping"
              style={{
                left: `${i * 4}px`,
                animationDelay: `${i * 0.2}s`,
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

// Power-Up Status
export const PowerUpStatus = ({
  type,
  isActive,
  cooldown,
}: {
  type: "fiftyFifty" | "flip" | "expertPoll";
  isActive: boolean;
  cooldown?: number;
}) => {
  const powerConfig = {
    fiftyFifty: { icon: Target, color: "blue", label: "50-50" },
    flip: { icon: Zap, color: "purple", label: "Flip" },
    expertPoll: { icon: Trophy, color: "green", label: "Poll" },
  };

  const config = powerConfig[type];
  const IconComponent = config.icon;

  return (
    <div
      className={`relative flex items-center gap-2 px-3 py-2 rounded-xl border ${
        isActive
          ? `bg-${config.color}-500/30 border-${config.color}-400 text-${config.color}-400`
          : "bg-gray-500/20 border-gray-500 text-gray-500"
      }`}
    >
      <IconComponent className={`w-4 h-4 ${isActive ? "animate-pulse" : ""}`} />
      <span className="font-bold text-sm">{config.label}</span>

      {cooldown && cooldown > 0 && (
        <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold animate-bounce">
          {cooldown}
        </div>
      )}

      {/* Active glow effect */}
      {isActive && (
        <div
          className={`absolute inset-0 rounded-xl bg-${config.color}-400/20 animate-pulse`}
        ></div>
      )}
    </div>
  );
};

// Achievement Notification
export const AchievementNotification = ({
  title,
  description,
  rarity = "common",
  onClose,
}: {
  title: string;
  description: string;
  rarity?: "common" | "rare" | "epic" | "legendary";
  onClose: () => void;
}) => {
  const rarityConfig = {
    common: {
      bg: "from-gray-600 to-gray-700",
      border: "border-gray-400",
      emoji: "🏆",
    },
    rare: {
      bg: "from-blue-600 to-blue-700",
      border: "border-blue-400",
      emoji: "💎",
    },
    epic: {
      bg: "from-purple-600 to-purple-700",
      border: "border-purple-400",
      emoji: "⭐",
    },
    legendary: {
      bg: "from-gold-500 to-orange-600",
      border: "border-gold-400",
      emoji: "👑",
    },
  };

  const config = rarityConfig[rarity];

  return (
    <div
      className={`relative bg-gradient-to-r ${config.bg} rounded-2xl p-4 border-2 ${config.border} shadow-2xl animate-slide-up`}
    >
      {/* Sparkle effects for rare+ */}
      {rarity !== "common" && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(8)].map((_, i) => (
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
      )}

      <div className="relative z-10 flex items-start gap-3">
        <div className="text-2xl animate-bounce">{config.emoji}</div>

        <div className="flex-1">
          <div className="text-white font-bold text-sm mb-1">
            Achievement Unlocked!
          </div>
          <div className="text-white font-black">{title}</div>
          <div className="text-white/80 text-sm">{description}</div>
        </div>

        <button
          onClick={onClose}
          className="text-white/60 hover:text-white transition-colors"
        >
          <XCircle className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

// Loading Spinner
export const LoadingSpinner = ({
  size = "md",
  message,
}: {
  size?: "sm" | "md" | "lg";
  message?: string;
}) => {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-8 h-8",
    lg: "w-12 h-12",
  };

  return (
    <div className="flex flex-col items-center gap-3">
      <div
        className={`${sizeClasses[size]} border-4 border-electric-200 border-t-electric-500 rounded-full animate-spin`}
      ></div>
      {message && (
        <div className="text-white/80 text-sm font-semibold animate-pulse">
          {message}
        </div>
      )}
    </div>
  );
};

// Status Badge
export const StatusBadge = ({
  status,
  text,
}: {
  status: "success" | "error" | "warning" | "info";
  text: string;
}) => {
  const statusConfig = {
    success: {
      icon: CheckCircle,
      bg: "bg-green-500/20",
      border: "border-green-400",
      text: "text-green-400",
    },
    error: {
      icon: XCircle,
      bg: "bg-red-500/20",
      border: "border-red-400",
      text: "text-red-400",
    },
    warning: {
      icon: AlertTriangle,
      bg: "bg-yellow-500/20",
      border: "border-yellow-400",
      text: "text-yellow-400",
    },
    info: {
      icon: Target,
      bg: "bg-blue-500/20",
      border: "border-blue-400",
      text: "text-blue-400",
    },
  };

  const config = statusConfig[status];
  const IconComponent = config.icon;

  return (
    <div
      className={`flex items-center gap-2 px-3 py-2 rounded-xl border ${config.bg} ${config.border} ${config.text}`}
    >
      <IconComponent className="w-4 h-4 animate-pulse" />
      <span className="font-bold text-sm">{text}</span>
    </div>
  );
};

// Difficulty Indicator
export const DifficultyIndicator = ({
  difficulty,
}: {
  difficulty: "easy" | "medium" | "hard";
}) => {
  const difficultyConfig = {
    easy: {
      bars: 1,
      color: "bg-green-400",
      bg: "bg-green-500/20",
      border: "border-green-400",
      text: "text-green-400",
      emoji: "😊",
    },
    medium: {
      bars: 2,
      color: "bg-yellow-400",
      bg: "bg-yellow-500/20",
      border: "border-yellow-400",
      text: "text-yellow-400",
      emoji: "🤔",
    },
    hard: {
      bars: 3,
      color: "bg-red-400",
      bg: "bg-red-500/20",
      border: "border-red-400",
      text: "text-red-400",
      emoji: "😤",
    },
  };

  const config = difficultyConfig[difficulty];

  return (
    <div
      className={`flex items-center gap-3 px-3 py-2 rounded-xl border ${config.bg} ${config.border}`}
    >
      <span className="text-lg">{config.emoji}</span>

      <div className="flex gap-1">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className={`w-2 h-4 rounded-sm ${
              i < config.bars ? config.color : "bg-gray-600"
            } ${i < config.bars ? "animate-pulse" : ""}`}
          />
        ))}
      </div>

      <span className={`font-bold text-sm capitalize ${config.text}`}>
        {difficulty}
      </span>
    </div>
  );
};
