"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Heart,
  Coins,
  Star,
  Gift,
  Calendar,
  Sparkles,
  TrendingUp,
  Target,
} from "lucide-react";
import { useAuth } from "@/components/providers/AuthProvider";

interface WelcomeBackModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const WelcomeBackModal: React.FC<WelcomeBackModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { userData } = useAuth();

  if (!userData) return null;

  const daysSinceLastLogin = userData.lastLoginDate
    ? Math.floor(
        (new Date().getTime() - new Date(userData.lastLoginDate).getTime()) /
          (1000 * 60 * 60 * 24),
      )
    : 0;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 border-2 border-blue-500/20 shadow-2xl">
        <DialogHeader className="text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-blue-300 to-purple-300 bg-clip-text text-transparent">
            Welcome Back, {userData.displayName}! 🎉
          </DialogTitle>
          <DialogDescription className="text-slate-300">
            {daysSinceLastLogin > 1
              ? `You've been away for ${daysSinceLastLogin} days. Ready to continue your quiz journey?`
              : "Ready to continue your quiz adventure?"}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-6">
          {/* Current Stats */}
          <div className="grid grid-cols-3 gap-3">
            <Card className="bg-gradient-to-r from-orange-500/20 to-orange-800/20 border-orange-500/20">
              <CardContent className="p-3 text-center">
                <Coins className="w-6 h-6 text-orange-400 mx-auto mb-1" />
                <p className="text-lg font-bold text-white">{userData.coins}</p>
                <p className="text-xs text-orangewhy -900">Coins</p>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-r from-red-500/20 to-pink-500/20 border-red-500/20">
              <CardContent className="p-3 text-center">
                <Heart className="w-6 h-6 text-red-400 mx-auto mb-1" />
                <p className="text-lg font-bold text-white">{userData.lives}</p>
                <p className="text-xs text-red-900">Lives</p>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-r from-purple-500/20 to-blue-500/20 border-purple-500/20">
              <CardContent className="p-3 text-center">
                <Star className="w-6 h-6 text-purple-400 mx-auto mb-1" />
                <p className="text-lg font-bold text-white">
                  {userData.totalStars}
                </p>
                <p className="text-xs text-purple-800">Stars</p>
              </CardContent>
            </Card>
          </div>

          {/* Daily Bonus Available */}
          <Card className="bg-gradient-to-r from-green-800/20 to-emerald-500/20 border-green-500/20">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                    <Gift className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-green-500">Daily Bonus</h4>
                    <p className="text-sm text-green-500">
                      +25 coins available!
                    </p>
                  </div>
                </div>
                <Badge className="bg-green-500 text-white animate-pulse">
                  CLAIM
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Progress Overview */}
          <div className="space-y-3">
            <h4 className="font-semibold text-white flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-blue-400" />
              Your Progress
            </h4>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-slate-800/50 p-3 rounded-lg border border-slate-700">
                <div className="flex items-center gap-2 mb-1">
                  <Target className="w-4 h-4 text-blue-400" />
                  <span className="text-sm text-gray-300">Level</span>
                </div>
                <p className="text-lg font-bold text-white">
                  {userData.currentLevel}
                </p>
              </div>
              <div className="bg-slate-800/50 p-3 rounded-lg border border-slate-700">
                <div className="flex items-center gap-2 mb-1">
                  <Calendar className="w-4 h-4 text-purple-400" />
                  <span className="text-sm text-gray-300">Streak</span>
                </div>
                <p className="text-lg font-bold text-white">
                  {userData.streak}
                </p>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="space-y-3">
            <h4 className="font-semibold text-white">
              What would you like to do?
            </h4>
            <div className="grid grid-cols-2 gap-3">
              <Button
                variant="outline"
                className="bg-blue-500/20 border-blue-500 text-blue-300 hover:bg-blue-500/30"
                onClick={onClose}
              >
                Continue Quiz
              </Button>
              <Button
                variant="outline"
                className="bg-purple-500/20 border-purple-500 text-purple-300 hover:bg-purple-500/30"
                onClick={onClose}
              >
                View Categories
              </Button>
            </div>
          </div>
        </div>

        <div className="flex justify-center pt-4 border-t border-gray-700">
          <Button
            onClick={onClose}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold px-8"
          >
            Let's Play! 🚀
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
