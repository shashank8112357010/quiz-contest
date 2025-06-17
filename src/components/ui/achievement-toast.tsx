"use client";

import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Trophy,
  Star,
  Coins,
  X,
  CheckCircle,
  Zap,
  Target,
  Crown,
} from "lucide-react";

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  reward: {
    type: "coins" | "stars" | "powerup";
    amount: number;
  };
  rarity: "common" | "rare" | "epic" | "legendary";
}

interface AchievementToastProps {
  achievement: Achievement;
  isVisible: boolean;
  onClose: () => void;
  autoClose?: boolean;
  duration?: number;
}

const rarityColors = {
  common: "from-gray-500 to-gray-600",
  rare: "from-blue-500 to-blue-600",
  epic: "from-purple-500 to-purple-600",
  legendary: "from-yellow-500 to-orange-500",
};

const rarityBorders = {
  common: "border-gray-500/50",
  rare: "border-blue-500/50",
  epic: "border-purple-500/50",
  legendary: "border-yellow-500/50",
};

export const AchievementToast: React.FC<AchievementToastProps> = ({
  achievement,
  isVisible,
  onClose,
  autoClose = true,
  duration = 5000,
}) => {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isVisible) {
      setIsAnimating(true);

      if (autoClose) {
        const timer = setTimeout(() => {
          setIsAnimating(false);
          setTimeout(onClose, 300); // Wait for animation to complete
        }, duration);

        return () => clearTimeout(timer);
      }
    }
  }, [isVisible, autoClose, duration, onClose]);

  if (!isVisible && !isAnimating) return null;

  return (
    <div className="fixed top-4 right-4 z-50">
      <Card
        className={`
          bg-gradient-to-r ${rarityColors[achievement.rarity]} 
          ${rarityBorders[achievement.rarity]} 
          border-2 shadow-2xl backdrop-blur-sm
          transform transition-all duration-500 ease-out
          ${
            isAnimating
              ? "translate-x-0 opacity-100 scale-100"
              : "translate-x-full opacity-0 scale-95"
          }
        `}
      >
        <CardContent className="p-4 relative">
          {/* Close Button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => {
              setIsAnimating(false);
              setTimeout(onClose, 300);
            }}
            className="absolute top-2 right-2 w-6 h-6 text-white/70 hover:text-white hover:bg-white/20"
          >
            <X className="w-4 h-4" />
          </Button>

          {/* Achievement Content */}
          <div className="flex items-start gap-3 pr-8">
            {/* Icon */}
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0 animate-bounce">
              {achievement.icon}
            </div>

            {/* Content */}
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h4 className="font-bold text-white text-sm">
                  🎉 Achievement Unlocked!
                </h4>
                <Badge className={`text-xs text-white bg-white/20 capitalize`}>
                  {achievement.rarity}
                </Badge>
              </div>

              <h3 className="font-bold text-white mb-1">{achievement.title}</h3>

              <p className="text-white/90 text-sm mb-3">
                {achievement.description}
              </p>

              {/* Reward */}
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1 bg-white/20 rounded-full px-3 py-1">
                  {achievement.reward.type === "coins" && (
                    <Coins className="w-4 h-4 text-yellow-300" />
                  )}
                  {achievement.reward.type === "stars" && (
                    <Star className="w-4 h-4 text-yellow-300" />
                  )}
                  {achievement.reward.type === "powerup" && (
                    <Zap className="w-4 h-4 text-purple-300" />
                  )}
                  <span className="text-white font-semibold text-sm">
                    +{achievement.reward.amount}
                  </span>
                </div>
                <CheckCircle className="w-4 h-4 text-green-300" />
              </div>
            </div>
          </div>

          {/* Sparkle Animation */}
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-white rounded-full animate-ping"
                style={{
                  top: `${20 + Math.random() * 60}%`,
                  left: `${10 + Math.random() * 80}%`,
                  animationDelay: `${i * 0.2}s`,
                  animationDuration: "1.5s",
                }}
              />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// Predefined achievements for onboarding
export const onboardingAchievements: Achievement[] = [
  {
    id: "welcome",
    title: "Welcome to Quiz2Play!",
    description: "You've joined the ultimate quiz adventure!",
    icon: <Trophy className="w-6 h-6 text-yellow-300" />,
    reward: { type: "coins", amount: 50 },
    rarity: "common",
  },
  {
    id: "first_tour",
    title: "Explorer",
    description: "You completed the onboarding tour!",
    icon: <Target className="w-6 h-6 text-blue-300" />,
    reward: { type: "coins", amount: 25 },
    rarity: "common",
  },
  {
    id: "first_quiz",
    title: "Quiz Rookie",
    description: "You completed your first quiz!",
    icon: <CheckCircle className="w-6 h-6 text-green-300" />,
    reward: { type: "stars", amount: 5 },
    rarity: "rare",
  },
  {
    id: "power_user",
    title: "Power User",
    description: "You used your first power-up!",
    icon: <Zap className="w-6 h-6 text-purple-300" />,
    reward: { type: "powerup", amount: 1 },
    rarity: "rare",
  },
  {
    id: "category_explorer",
    title: "Category Explorer",
    description: "You've explored multiple quiz categories!",
    icon: <Star className="w-6 h-6 text-yellow-300" />,
    reward: { type: "coins", amount: 100 },
    rarity: "epic",
  },
  {
    id: "quiz_master",
    title: "Quiz Master",
    description: "You've mastered the basics of Quiz2Play!",
    icon: <Crown className="w-6 h-6 text-gold-300" />,
    reward: { type: "coins", amount: 200 },
    rarity: "legendary",
  },
];

// Hook to manage achievement notifications
export const useAchievementToasts = () => {
  const [activeToasts, setActiveToasts] = useState<Achievement[]>([]);

  const showAchievement = (achievementId: string) => {
    const achievement = onboardingAchievements.find(
      (a) => a.id === achievementId,
    );
    if (achievement && !activeToasts.find((t) => t.id === achievementId)) {
      setActiveToasts((prev) => [...prev, achievement]);
    }
  };

  const hideAchievement = (achievementId: string) => {
    setActiveToasts((prev) =>
      prev.filter((toast) => toast.id !== achievementId),
    );
  };

  return {
    activeToasts,
    showAchievement,
    hideAchievement,
  };
};
