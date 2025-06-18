import {
  Gift,
  Zap,
  Clock,
  Star,
  Sparkles,
  Crown,
  Trophy,
  Rocket,
  Target,
  Heart,
  Coins,
  Diamond,
  Flame,
} from "lucide-react";

// Flash Sale Banner
export const FlashSaleBanner = ({ timeLeft }: { timeLeft: string }) => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-red-600 via-pink-500 to-purple-600 rounded-2xl p-6 shadow-2xl animate-pulse">
      {/* Lightning background effect */}
      <div className="absolute inset-0 opacity-20">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute text-yellow-300 text-6xl animate-ping"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          >
            ⚡
          </div>
        ))}
      </div>

      <div className="relative z-10 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center animate-bounce">
            <Zap className="w-8 h-8 text-white animate-pulse" />
          </div>

          <div>
            <h3 className="text-2xl font-black text-white mb-2">
              ⚡ FLASH SALE ⚡
            </h3>
            <p className="text-yellow-200 font-bold">50% OFF All Power-Ups!</p>
          </div>
        </div>

        <div className="text-center">
          <div className="text-sm text-white/80 mb-1">Ends in:</div>
          <div className="text-2xl font-mono font-black text-yellow-300 bg-black/30 px-4 py-2 rounded-lg border border-white/20">
            {timeLeft}
          </div>
        </div>
      </div>

      {/* Animated border */}
      <div className="absolute inset-0 rounded-2xl border-4 border-yellow-400 animate-pulse"></div>
    </div>
  );
};

// Limited Time Offer
export const LimitedOfferBanner = () => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 rounded-3xl p-8 shadow-2xl border-2 border-electric-400/30">
      {/* Animated particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-electric-400 rounded-full animate-ping"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-red-500 rounded-xl flex items-center justify-center animate-bounce-subtle">
            <Clock className="w-6 h-6 text-white" />
          </div>
          <div>
            <div className="text-sm text-electric-300 font-bold">
              LIMITED TIME
            </div>
            <div className="text-xl font-black text-white">SPECIAL OFFER</div>
          </div>
        </div>

        {/* Offer content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
            <div className="text-3xl mb-2">💎</div>
            <div className="text-white font-bold">Premium Access</div>
            <div className="text-electric-300 text-sm">
              Unlock all categories
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
            <div className="text-3xl mb-2">🚀</div>
            <div className="text-white font-bold">Double XP</div>
            <div className="text-neon-300 text-sm">For 30 days</div>
          </div>

          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
            <div className="text-3xl mb-2">💰</div>
            <div className="text-white font-bold">1000 Coins</div>
            <div className="text-gold-300 text-sm">Instant bonus</div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-6 text-center">
          <button className="bg-gradient-to-r from-electric-500 to-neon-500 text-white px-8 py-3 rounded-2xl font-black shadow-2xl hover:scale-105 transition-transform duration-300 animate-glow">
            CLAIM NOW - ₹99 ONLY!
          </button>
        </div>
      </div>
    </div>
  );
};

// Double XP Event Banner
export const DoubleXPBanner = () => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-green-600 via-emerald-500 to-teal-500 rounded-2xl p-6 shadow-2xl">
      {/* XP symbols floating */}
      <div className="absolute inset-0 overflow-hidden opacity-30">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute text-white text-2xl font-bold animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          >
            +XP
          </div>
        ))}
      </div>

      <div className="relative z-10 flex items-center gap-6">
        {/* Rocket icon */}
        <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center animate-bounce">
          <Rocket className="w-10 h-10 text-white animate-pulse" />
        </div>

        <div className="flex-1">
          <h3 className="text-3xl font-black text-white mb-2">
            🚀 DOUBLE XP EVENT! 🚀
          </h3>
          <p className="text-emerald-100 font-bold text-lg">
            Earn 2x experience points on all quizzes this weekend!
          </p>
          <div className="flex items-center gap-2 mt-2">
            <Clock className="w-4 h-4 text-white" />
            <span className="text-emerald-200 text-sm">
              Active for 2 days, 14 hours
            </span>
          </div>
        </div>

        {/* Multiplier badge */}
        <div
          className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-xl animate-spin"
          style={{ animationDuration: "4s" }}
        >
          <span className="text-2xl font-black text-green-600">2X</span>
        </div>
      </div>
    </div>
  );
};

// VIP Membership Card
export const VIPMembershipCard = () => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-purple-900 via-pink-900 to-red-900 rounded-3xl p-8 shadow-2xl border-2 border-gold-400">
      {/* Premium background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-r from-gold-400 via-transparent to-gold-400 animate-pulse"></div>
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute text-gold-400 text-4xl"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              transform: `rotate(${Math.random() * 360}deg)`,
            }}
          >
            ♦
          </div>
        ))}
      </div>

      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-r from-gold-400 to-yellow-500 rounded-xl flex items-center justify-center animate-glow">
              <Crown className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="text-gold-300 text-sm font-bold">EXCLUSIVE</div>
              <div className="text-2xl font-black text-white">
                VIP MEMBERSHIP
              </div>
            </div>
          </div>

          <div className="text-4xl animate-bounce">👑</div>
        </div>

        {/* Benefits */}
        <div className="space-y-3 mb-6">
          <div className="flex items-center gap-3 text-white">
            <Star className="w-5 h-5 text-gold-400" />
            <span className="font-semibold">Unlimited Lives</span>
          </div>
          <div className="flex items-center gap-3 text-white">
            <Zap className="w-5 h-5 text-electric-400" />
            <span className="font-semibold">All Power-Ups Included</span>
          </div>
          <div className="flex items-center gap-3 text-white">
            <Trophy className="w-5 h-5 text-gold-400" />
            <span className="font-semibold">Exclusive Tournaments</span>
          </div>
          <div className="flex items-center gap-3 text-white">
            <Gift className="w-5 h-5 text-pink-400" />
            <span className="font-semibold">Weekly Premium Rewards</span>
          </div>
        </div>

        {/* Price */}
        <div className="bg-black/30 rounded-2xl p-4 border border-gold-400/30">
          <div className="text-center">
            <div className="text-gold-300 text-sm font-bold">SPECIAL PRICE</div>
            <div className="text-3xl font-black text-white">
              ₹299
              <span className="text-lg text-gray-400 line-through ml-2">
                ₹499
              </span>
            </div>
            <div className="text-gold-300 text-sm">/month</div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Coin Package Offers
export const CoinPackageOffer = ({
  coins,
  price,
  bonus = 0,
  isPopular = false,
}: {
  coins: number;
  price: number;
  bonus?: number;
  isPopular?: boolean;
}) => {
  return (
    <div
      className={`relative overflow-hidden rounded-3xl p-6 shadow-2xl border-2 transition-transform duration-300 hover:scale-105 ${
        isPopular
          ? "bg-gradient-to-br from-gold-600 via-yellow-500 to-orange-500 border-gold-300"
          : "bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 border-blue-300"
      }`}
    >
      {/* Popular badge */}
      {isPopular && (
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-red-500 text-white px-4 py-1 rounded-full text-sm font-bold animate-bounce">
          🔥 MOST POPULAR 🔥
        </div>
      )}

      {/* Coin rain animation */}
      <div className="absolute inset-0 overflow-hidden opacity-20">
        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            className="absolute text-yellow-300 text-2xl animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          >
            🪙
          </div>
        ))}
      </div>

      <div className="relative z-10 text-center">
        {/* Coin stack with image */}
        <div className="mb-4">
          <div className="w-20 h-20 bg-gradient-to-r from-yellow-400 to-gold-500 rounded-full flex items-center justify-center mx-auto shadow-2xl animate-bounce-subtle overflow-hidden">
            <img
              src="https://images.pexels.com/photos/210600/pexels-photo-210600.jpeg"
              alt="Coins"
              className="object-cover w-full h-full rounded-full opacity-90"
            />
            <div className="absolute inset-0 bg-black/20 rounded-full flex items-center justify-center">
              <Coins className="w-8 h-8 text-white drop-shadow-lg" />
            </div>
          </div>
        </div>

        {/* Amount */}
        <div className="mb-4">
          <div className="text-4xl font-black text-white">
            {coins.toLocaleString()}
          </div>
          <div className="text-white/80">Coins</div>
          {bonus > 0 && (
            <div className="text-green-300 font-bold text-sm">
              +{bonus} Bonus!
            </div>
          )}
        </div>

        {/* Price */}
        <div className="bg-black/30 rounded-2xl p-3 border border-white/20">
          <div className="text-2xl font-black text-white">₹{price}</div>
          {bonus > 0 && (
            <div className="text-xs text-green-300">
              Save ₹{Math.round(price * 0.2)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Seasonal Event Banner
export const SeasonalEventBanner = ({
  title,
  description,
  emoji,
  theme = "winter",
}: {
  title: string;
  description: string;
  emoji: string;
  theme?: "winter" | "summer" | "spring" | "autumn";
}) => {
  const themeConfig = {
    winter: "from-blue-800 via-purple-800 to-indigo-900",
    summer: "from-orange-500 via-red-500 to-pink-600",
    spring: "from-green-500 via-emerald-500 to-teal-600",
    autumn: "from-orange-600 via-amber-600 to-yellow-600",
  };

  return (
    <div
      className={`relative overflow-hidden bg-gradient-to-br ${themeConfig[theme]} rounded-3xl p-8 shadow-2xl border-2 border-white/20`}
    >
      {/* Theme-specific effects */}
      <div className="absolute inset-0 overflow-hidden opacity-30">
        {theme === "winter" &&
          [...Array(15)].map((_, i) => (
            <div
              key={i}
              className="absolute text-white text-xl animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
              }}
            >
              ❄️
            </div>
          ))}

        {theme === "summer" &&
          [...Array(10)].map((_, i) => (
            <div
              key={i}
              className="absolute text-yellow-300 text-2xl animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
              }}
            >
              ☀️
            </div>
          ))}
      </div>

      <div className="relative z-10 text-center">
        <div className="text-6xl mb-4 animate-bounce">{emoji}</div>
        <h2 className="text-3xl font-black text-white mb-4">{title}</h2>
        <p className="text-white/90 font-semibold text-lg mb-6">
          {description}
        </p>

        <button className="bg-white/20 backdrop-blur-sm text-white px-8 py-3 rounded-2xl font-bold border-2 border-white/30 hover:bg-white/30 transition-all duration-300 hover:scale-105">
          Join Event
        </button>
      </div>
    </div>
  );
};

// Mystery Box Offer
export const MysteryBoxOffer = () => {
  return (
    <div className="relative group">
      {/* Mysterious glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 rounded-3xl blur-xl opacity-60 animate-pulse group-hover:opacity-80 transition-opacity duration-300"></div>

      {/* Main container */}
      <div className="relative bg-gradient-to-br from-gray-900 via-purple-900 to-black rounded-3xl p-8 border-2 border-purple-400 shadow-2xl">
        {/* Question marks floating */}
        <div className="absolute inset-0 overflow-hidden opacity-20">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute text-purple-300 text-3xl animate-bounce"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
              }}
            >
              ?
            </div>
          ))}
        </div>

        <div className="relative z-10 text-center">
          {/* Mystery box */}
          <div className="w-24 h-24 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-2xl animate-float">
            <Gift className="w-12 h-12 text-white animate-pulse" />
          </div>

          <h3 className="text-2xl font-black text-white mb-4">
            🎁 MYSTERY BOX 🎁
          </h3>
          <p className="text-purple-200 font-semibold mb-6">
            Contains rare power-ups, coins, or exclusive rewards!
          </p>

          {/* Possible rewards */}
          <div className="grid grid-cols-3 gap-3 mb-6">
            <div className="bg-white/10 rounded-xl p-3 border border-white/20">
              <div className="text-2xl mb-1">💎</div>
              <div className="text-white text-xs font-bold">Rare Items</div>
            </div>
            <div className="bg-white/10 rounded-xl p-3 border border-white/20">
              <div className="text-2xl mb-1">🪙</div>
              <div className="text-white text-xs font-bold">Bonus Coins</div>
            </div>
            <div className="bg-white/10 rounded-xl p-3 border border-white/20">
              <div className="text-2xl mb-1">⚡</div>
              <div className="text-white text-xs font-bold">Power-Ups</div>
            </div>
          </div>

          <div className="text-3xl font-black text-white mb-2">₹149</div>
          <button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-2xl font-bold shadow-2xl hover:scale-105 transition-transform duration-300">
            Open Mystery Box
          </button>
        </div>
      </div>
    </div>
  );
};
