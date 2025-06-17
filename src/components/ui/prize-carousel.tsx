"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
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
}

const prizes: Prize[] = [
  {
    id: "iphone15",
    name: "iPhone 15 Pro Max",
    description: "Latest flagship smartphone with advanced features",
    value: "₹1,59,900",
    image: "📱",
    icon: Smartphone,
    gradient: "from-blue-500 via-purple-500 to-pink-500",
    rarity: "legendary",
  },
  {
    id: "bmw",
    name: "BMW 3 Series",
    description: "Luxury sedan with premium performance",
    value: "₹45,00,000",
    image: "🚗",
    icon: Car,
    gradient: "from-red-500 via-orange-500 to-yellow-500",
    rarity: "legendary",
  },
  {
    id: "macbook",
    name: "MacBook Pro M3",
    description: "Professional laptop for creators and developers",
    value: "₹2,39,900",
    image: "💻",
    icon: Laptop,
    gradient: "from-slate-500 via-gray-500 to-zinc-500",
    rarity: "epic",
  },
  {
    id: "applewatch",
    name: "Apple Watch Ultra",
    description: "Advanced smartwatch for fitness enthusiasts",
    value: "₹89,900",
    image: "⌚",
    icon: Watch,
    gradient: "from-green-500 via-emerald-500 to-teal-500",
    rarity: "epic",
  },
  {
    id: "ps5",
    name: "PlayStation 5",
    description: "Next-gen gaming console with exclusive games",
    value: "₹54,990",
    image: "🎮",
    icon: Gamepad2,
    gradient: "from-indigo-500 via-blue-500 to-cyan-500",
    rarity: "rare",
  },
  {
    id: "goldcup",
    name: "Golden Trophy",
    description: "Exclusive championship trophy for winners",
    value: "₹25,000",
    image: "🏆",
    icon: Trophy,
    gradient: "from-yellow-400 via-gold-500 to-amber-500",
    rarity: "rare",
  },
];

interface PrizeCarouselProps {
  showControls?: boolean;
  autoPlay?: boolean;
  interval?: number;
  className?: string;
  itemsToShow?: number;
}

export const PrizeCarousel: React.FC<PrizeCarouselProps> = ({
  showControls = true,
  autoPlay = true,
  interval = 4000,
  className,
  itemsToShow = 1,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

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
    <div className={cn("relative w-full", className)}>
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
            <h3 className="text-2xl font-bold bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent mb-2">
              🎁 Amazing Prizes
            </h3>
            <p className="text-purple-200 text-sm">
              Win incredible rewards in our 90-day contest!
            </p>
          </div>

          {/* Prize Display */}
          <div className="text-center">
            {/* Prize Icon/Emoji */}
            <div className={`relative inline-block mb-4`}>
              <div
                className={`w-24 h-24 bg-gradient-to-r ${currentPrize.gradient} rounded-full flex items-center justify-center shadow-2xl animate-pulse`}
              >
                <span className="text-4xl">{currentPrize.image}</span>
              </div>
              {/* Rarity Badge */}
              <div
                className={`absolute -top-2 -right-2 px-2 py-1 bg-gradient-to-r ${getRarityBadge(currentPrize.rarity).color} rounded-full text-xs font-bold text-white shadow-lg`}
              >
                {getRarityBadge(currentPrize.rarity).label}
              </div>
            </div>

            {/* Prize Info */}
            <h4 className="text-xl font-bold text-white mb-2">
              {currentPrize.name}
            </h4>
            <p className="text-purple-200 text-sm mb-3 max-w-xs mx-auto">
              {currentPrize.description}
            </p>
            <div className="text-2xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent mb-4">
              {currentPrize.value}
            </div>

            {/* Progress Dots */}
            <div className="flex justify-center gap-2 mb-4">
              {prizes.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={cn(
                    "w-2 h-2 rounded-full transition-all duration-300",
                    index === currentIndex
                      ? "bg-yellow-400 w-6"
                      : "bg-white/30 hover:bg-white/50",
                  )}
                />
              ))}
            </div>

            {/* Contest Info */}
            <div className="bg-black/30 rounded-xl p-3 text-center">
              <p className="text-xs text-purple-300 mb-1">Contest Status</p>
              <div className="text-yellow-400 font-bold text-sm">
                🏆 90-Day Championship Active
              </div>
              <div className="text-emerald-400 text-xs mt-1">
                Play daily to increase your chances!
              </div>
            </div>
          </div>

          {/* Navigation Controls */}
          {showControls && (
            <>
              <Button
                variant="ghost"
                size="icon"
                onClick={prevPrize}
                className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white border-white/20"
              >
                <ChevronLeft className="w-5 h-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={nextPrize}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white border-white/20"
              >
                <ChevronRight className="w-5 h-5" />
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
