"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useLanguageStore } from "@/lib/languages";
import {
  ChevronLeft,
  ChevronRight,
  Smartphone,
  Car,
  Laptop,
  Watch,
  Gamepad2,
  Trophy,
  Gift,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";

export interface Prize {
  id: string;
  name: string;
  description: string;
  value: string;
  image: string;
  icon: React.ElementType;
  gradient: string;
  rarity: "common" | "rare" | "epic" | "legendary";
  imagePath?: string; // Path to real image
}

interface PrizeCarouselProps {
  showControls?: boolean;
  autoPlay?: boolean;
  interval?: number;
  className?: string;
  itemsToShow?: number;
}

// prizes array moved inside PrizeCarousel and uses t() for i18n
export const PrizeCarousel: React.FC<PrizeCarouselProps> = ({
  showControls = true,
  autoPlay = true,
  interval = 4000,
  className,
  itemsToShow = 1,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { t, currentLanguage } = useLanguageStore(); // subscribe to language changes for reactivity

  // Prizes array now uses t() for name and description
  const prizes: Prize[] = [
    {
      id: "iphone15",
      name: t("prizes.iphone15.name"),
      description: t("prizes.iphone15.description"),
      value: "₹1,59,900",
      image: "📱",
      icon: Smartphone,
      gradient: "from-blue-500 via-purple-500 to-pink-500",
      rarity: "legendary",
      imagePath:
        "https://images.pexels.com/photos/3568518/pexels-photo-3568518.jpeg",
    },
    {
      id: "bmw",
      name: t("prizes.car.name"),
      description: t("prizes.car.description"),
      value: "₹45,00,000",
      image: "🚗",
      icon: Car,
      gradient: "from-red-500 via-orange-500 to-yellow-500",
      rarity: "legendary",
      imagePath:
        "https://images.pexels.com/photos/14776716/pexels-photo-14776716.jpeg",
    },
    {
      id: "macbook",
      name: t("prizes.laptop.name"),
      description: t("prizes.laptop.description"),
      value: "₹2,39,900",
      image: "💻",
      icon: Laptop,
      gradient: "from-slate-500 via-gray-500 to-zinc-500",
      rarity: "epic",
      imagePath:
        "https://images.pexels.com/photos/57690/pexels-photo-57690.jpeg",
    },
    {
      id: "applewatch",
      name: t("prizes.watch.name"),
      description: t("prizes.watch.desc"),
      value: "₹89,900",
      image: "⌚",
      icon: Watch,
      gradient: "from-green-500 via-emerald-500 to-teal-500",
      rarity: "epic",
      imagePath:
        "https://images.pexels.com/photos/12564670/pexels-photo-12564670.jpeg",
    },
    {
      id: "ps5",
      name: t("prizes.ps5.name"),
      description: t("prizes.gamepad.desc"),
      value: "₹54,990",
      image: "🎮",
      icon: Gamepad2,
      gradient: "from-indigo-500 via-blue-500 to-cyan-500",
      rarity: "rare",
      imagePath:
        "https://images.pexels.com/photos/14642112/pexels-photo-14642112.jpeg",
    },
    {
      id: "goldcup",
      name: t("prizes.gamepad.name"),
      description: t("prizes.giftcard.desc"),
      value: "₹25,000",
      image: "🏆",
      icon: Trophy,
      gradient: "from-yellow-400 via-gold-500 to-amber-500",
      rarity: "rare",
      imagePath:
        "https://images.pexels.com/photos/12026054/pexels-photo-12026054.jpeg",
    },
  ];

  useEffect(() => {
    if (!autoPlay) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % prizes.length);
    }, interval);
    return () => clearInterval(timer);
  }, [autoPlay, interval]);

  const nextPrize = () => {
    setCurrentIndex((prev) => (prev + 1) % prizes.length);
  };

  const prevPrize = () => {
    setCurrentIndex((prev) => (prev - 1 + prizes.length) % prizes.length);
  };

  const currentPrize = prizes[currentIndex];
  const Icon = currentPrize.icon;

  // Get visible prizes for multi-item display
  const getVisiblePrizes = () => {
    if (itemsToShow === 1) return [currentPrize];

    const visiblePrizes = [];
    for (let i = 0; i < itemsToShow; i++) {
      const index = (currentIndex + i) % prizes.length;
      visiblePrizes.push(prizes[index]);
    }
    return visiblePrizes;
  };

  const visiblePrizes = getVisiblePrizes();

  const getRarityBadge = (rarity: Prize["rarity"]) => {
    const rarityConfig = {
      common: { color: "from-gray-400 to-gray-500", label: "Common" },
      rare: { color: "from-blue-400 to-blue-500", label: "Rare" },
      epic: { color: "from-purple-400 to-purple-500", label: "Epic" },
      legendary: { color: "from-orange-400 to-red-500", label: "Legendary" },
    };

    return rarityConfig[rarity];
  };

  return (
    <div className={cn("relative w-full ", className)}>
      <div className="relative bg-gradient-to-br from-slate-900/90 via-purple-900/90 to-slate-900/90 backdrop-blur-xl border-2 border-purple-500/20 rounded-3xl p-6 overflow-hidden shadow-2xl">
        {/* Animated Background Effects */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-white/20 rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 2}s`,
              }}
            />
          ))}
        </div>

        {/* Floating Sparkles */}
        <div className="absolute top-4 right-4">
          <Sparkles className="w-6 h-6 text-yellow-400 animate-pulse" />
        </div>
        <div className="absolute bottom-4 left-4">
          <Gift className="w-5 h-5 text-pink-400 animate-bounce" />
        </div>

        {/* Main Content */}
        <div className="relative z-10">
          {/* Header */}
          <div className="text-center mb-6">
            <div className="overflow-x-hidden whitespace-nowrap mb-6">
              <div
                className="inline-block text-2xl font-bold bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent px-2"
                style={{
                  animation: "marquee 10s linear infinite",
                  whiteSpace: "nowrap",
                  display: "inline-block",
                  minWidth: "100%",
                }}
              >
                Amazing Prizes
              </div>
              <style>{`
    @keyframes marquee {
      0% { transform: translateX(100%); }
      100% { transform: translateX(-100%); }
    }
  `}</style>
            </div>
            {/* <p className="text-purple-200 text-sm">
              Win incredible rewards in our 90-day contest!
            </p> */}
          </div>

          {/* Prize Display */}
          <div className="text-center">
            {itemsToShow === 1 ? (
              // Single Item Display
              <>
                <div className={`relative inline-block mb-4`}>
                  <div
                    className={`w-50 h-50 bg-gradient-to-r ${currentPrize.gradient} rounded-full flex items-center justify-center shadow-2xl animate-pulse`}
                  >
                    {/* TODO: Replace src with actual image for {currentPrize.name} */}
                    <img
                      src={currentPrize.imagePath || "/placeholder.svg"}
                      alt={currentPrize.name}
                      className="object-contain w-60 h-60 rounded-full"
                    />
                  </div>
                </div>
                <h4 className="text-xl font-bold text-white mb-2">
                  {currentPrize.name}
                </h4>
                <p className="text-purple-200 text-sm mb-3 max-w-xs mx-auto">
                  {currentPrize.description}
                </p>
                <div className="text-2xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent mb-4">
                  {currentPrize.value}
                </div>
              </>
            ) : (
              // Marquee Images Display
              <div
                className="relative overflow-x-hidden mb-4"
                style={{ height: "9rem" }}
              >
                <div
                  className="flex items-center gap-8 animate-prize-marquee"
                  style={{
                    animation: "prize-marquee 22s linear infinite",
                    willChange: "transform",
                  }}
                >
                  {[...prizes, ...prizes].map((prize, index) => (
                    <div
                      key={`${prize.id}-${index}`}
                      className="relative flex flex-col items-center"
                    >
                      <div
                        className={`w-28 h-28 bg-gradient-to-r ${prize.gradient} rounded-full flex items-center justify-center shadow-xl`}
                      >
                        <img
                          src={prize.imagePath || "/placeholder.svg"}
                          alt={prize.name}
                          className="object-contain w-26 h-26 rounded-full"
                        />
                      </div>
                      <div className="text-white text-xs font-semibold mt-2 truncate w-28 text-center">
                        {prize.name}
                      </div>
                    </div>
                  ))}
                </div>
                <style>{`
      @keyframes prize-marquee {
        0% { transform: translateX(0); }
        100% { transform: translateX(-50%); }
      }
      .animate-prize-marquee {
        min-width: 200%;
      }
    `}</style>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
