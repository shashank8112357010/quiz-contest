"use client";

import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Brain,
  Coins,
  Heart,
  Star,
  Zap,
  Trophy,
  Target,
  Gamepad2,
  Users,
  Gift,
  ArrowRight,
  CheckCircle,
  Sparkles,
  BookOpen,
  Award,
  TrendingUp,
} from "lucide-react";
import { useAuth } from "@/components/providers/AuthProvider";

interface OnboardingStep {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  content: React.ReactNode;
  actionText: string;
}

interface OnboardingTourProps {
  isOpen: boolean;
  onComplete: () => void;
}

export const OnboardingTour: React.FC<OnboardingTourProps> = ({
  isOpen,
  onComplete,
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const { user, userData } = useAuth();

  const steps: OnboardingStep[] = [
    {
      id: "welcome",
      title: "Welcome to Quiz2Play! 🎉",
      description: "Your ultimate AI-powered quiz adventure begins here!",
      icon: <Brain className="w-12 h-12 text-purple-400" />,
      content: (
        <div className="space-y-6">
          <div className="text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
              <Brain className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">
              Ready to Challenge Your Mind?
            </h3>
            <p className="text-gray-300">
              Join thousands of players in the most engaging quiz experience
              ever created!
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 p-4 rounded-lg text-center">
              <Gamepad2 className="w-8 h-8 text-blue-400 mx-auto mb-2" />
              <p className="text-sm text-gray-300">20+ Categories</p>
            </div>
            <div className="bg-gradient-to-r from-green-500/20 to-blue-500/20 p-4 rounded-lg text-center">
              <Target className="w-8 h-8 text-green-400 mx-auto mb-2" />
              <p className="text-sm text-gray-300">1000+ Questions</p>
            </div>
          </div>
        </div>
      ),
      actionText: "Start Tour",
    },
    {
      id: "rewards",
      title: "Your Starting Rewards",
      description: "You've received amazing bonuses to get started!",
      icon: <Gift className="w-12 h-12 text-yellow-400" />,
      content: (
        <div className="space-y-6">
          <div className="grid grid-cols-1 gap-4">
            <Card className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border-yellow-500/20">
              <CardContent className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Coins className="w-8 h-8 text-yellow-400" />
                  <div>
                    <p className="font-bold text-white">100 Coins</p>
                    <p className="text-sm text-gray-300">Starting currency</p>
                  </div>
                </div>
                <Badge className="bg-yellow-500 text-black">FREE</Badge>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-r from-red-500/20 to-pink-500/20 border-red-500/20">
              <CardContent className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Heart className="w-8 h-8 text-red-400" />
                  <div>
                    <p className="font-bold text-white">3 Lives</p>
                    <p className="text-sm text-gray-300">Mistake protection</p>
                  </div>
                </div>
                <Badge className="bg-red-500 text-white">BONUS</Badge>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-r from-purple-500/20 to-blue-500/20 border-purple-500/20">
              <CardContent className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Zap className="w-8 h-8 text-purple-400" />
                  <div>
                    <p className="font-bold text-white">Power-ups</p>
                    <p className="text-sm text-gray-300">Special abilities</p>
                  </div>
                </div>
                <Badge className="bg-purple-500 text-white">4 Total</Badge>
              </CardContent>
            </Card>
          </div>
          <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 p-4 rounded-lg border border-green-500/20">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle className="w-5 h-5 text-green-400" />
              <span className="font-semibold text-green-400">Pro Tip:</span>
            </div>
            <p className="text-sm text-gray-300">
              Earn more coins by answering correctly and maintaining streaks!
            </p>
          </div>
        </div>
      ),
      actionText: "Show Me More",
    },
    {
      id: "gameplay",
      title: "How to Play",
      description: "Master the game mechanics and dominate the leaderboards!",
      icon: <Gamepad2 className="w-12 h-12 text-blue-400" />,
      content: (
        <div className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-start gap-4 p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-white font-bold text-sm">1</span>
              </div>
              <div>
                <h4 className="font-semibold text-white mb-1">
                  Choose Your Category
                </h4>
                <p className="text-sm text-gray-300">
                  Pick from 20+ exciting categories like Science, History,
                  Sports, and more!
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-4 bg-purple-500/10 rounded-lg border border-purple-500/20">
              <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-white font-bold text-sm">2</span>
              </div>
              <div>
                <h4 className="font-semibold text-white mb-1">
                  Answer Questions
                </h4>
                <p className="text-sm text-gray-300">
                  Test your knowledge with multiple-choice questions. Each
                  correct answer earns coins and stars!
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-4 bg-green-500/10 rounded-lg border border-green-500/20">
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-white font-bold text-sm">3</span>
              </div>
              <div>
                <h4 className="font-semibold text-white mb-1">Level Up</h4>
                <p className="text-sm text-gray-300">
                  Build streaks, unlock achievements, and climb the global
                  leaderboard!
                </p>
              </div>
            </div>
          </div>
        </div>
      ),
      actionText: "Learn Power-ups",
    },
    {
      id: "powerups",
      title: "Power-ups & Abilities",
      description: "Use special abilities to boost your quiz performance!",
      icon: <Zap className="w-12 h-12 text-electric-400" />,
      content: (
        <div className="space-y-6">
          <div className="grid grid-cols-1 gap-4">
            <Card className="bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border-blue-500/20">
              <CardContent className="p-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold">50</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">50/50</h4>
                    <p className="text-sm text-gray-300">
                      Remove 2 wrong answers
                    </p>
                  </div>
                </div>
                <Badge className="bg-blue-500 text-white text-xs">
                  You have 2
                </Badge>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-purple-500/20">
              <CardContent className="p-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">Flip Question</h4>
                    <p className="text-sm text-gray-300">
                      Skip to a new question
                    </p>
                  </div>
                </div>
                <Badge className="bg-purple-500 text-white text-xs">
                  You have 1
                </Badge>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-r from-orange-500/20 to-red-500/20 border-orange-500/20">
              <CardContent className="p-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center">
                    <Users className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">Expert Poll</h4>
                    <p className="text-sm text-gray-300">
                      See what experts choose
                    </p>
                  </div>
                </div>
                <Badge className="bg-orange-500 text-white text-xs">
                  You have 1
                </Badge>
              </CardContent>
            </Card>
          </div>
          <div className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 p-4 rounded-lg border border-yellow-500/20">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-5 h-5 text-yellow-400" />
              <span className="font-semibold text-yellow-400">Strategy:</span>
            </div>
            <p className="text-sm text-gray-300">
              Save power-ups for difficult questions or when your streak is at
              risk!
            </p>
          </div>
        </div>
      ),
      actionText: "Explore Categories",
    },
    {
      id: "progress",
      title: "Track Your Progress",
      description: "See how you're advancing and earning achievements!",
      icon: <TrendingUp className="w-12 h-12 text-green-400" />,
      content: (
        <div className="space-y-6">
          <div className="space-y-4">
            <Card className="bg-gradient-to-r from-emerald-500/20 to-green-500/20 border-emerald-500/20">
              <CardHeader className="pb-2">
                <CardTitle className="text-white flex items-center gap-2">
                  <Star className="w-5 h-5 text-yellow-400" />
                  Stars & Levels
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-300 mb-3">
                  Earn stars for correct answers to level up and unlock new
                  categories!
                </p>
                <div className="flex items-center gap-3">
                  <Progress value={33} className="flex-1" />
                  <span className="text-sm text-white">Level 1</span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 border-blue-500/20">
              <CardHeader className="pb-2">
                <CardTitle className="text-white flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-yellow-400" />
                  Achievements
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-300 mb-3">
                  Unlock special achievements and earn bonus rewards!
                </p>
                <div className="flex gap-2">
                  <Badge
                    variant="outline"
                    className="text-yellow-400 border-yellow-400"
                  >
                    First Quiz
                  </Badge>
                  <Badge
                    variant="outline"
                    className="text-blue-400 border-blue-400"
                  >
                    Streak Master
                  </Badge>
                  <Badge
                    variant="outline"
                    className="text-purple-400 border-purple-400"
                  >
                    Category King
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-red-500/20 to-orange-500/20 border-red-500/20">
              <CardHeader className="pb-2">
                <CardTitle className="text-white flex items-center gap-2">
                  <Users className="w-5 h-5 text-red-400" />
                  Leaderboard
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-300">
                  Compete with players worldwide and see where you rank!
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      ),
      actionText: "Start Playing",
    },
    {
      id: "ready",
      title: "You're All Set! 🚀",
      description: "Time to start your quiz journey and become a champion!",
      icon: <Trophy className="w-12 h-12 text-yellow-400" />,
      content: (
        <div className="space-y-6 text-center">
          <div className="w-24 h-24 bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
            <Trophy className="w-12 h-12 text-white" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-white mb-2">
              Ready to Become a Quiz Champion?
            </h3>
            <p className="text-gray-300 mb-6">
              You're equipped with everything you need to start dominating the
              leaderboards!
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 p-4 rounded-lg">
              <BookOpen className="w-8 h-8 text-green-400 mx-auto mb-2" />
              <p className="text-sm font-semibold text-white">Study</p>
              <p className="text-xs text-gray-300">Learn from explanations</p>
            </div>
            <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 p-4 rounded-lg">
              <Target className="w-8 h-8 text-blue-400 mx-auto mb-2" />
              <p className="text-sm font-semibold text-white">Practice</p>
              <p className="text-xs text-gray-300">Build your knowledge</p>
            </div>
            <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 p-4 rounded-lg">
              <Award className="w-8 h-8 text-purple-400 mx-auto mb-2" />
              <p className="text-sm font-semibold text-white">Achieve</p>
              <p className="text-xs text-gray-300">Unlock rewards</p>
            </div>
            <div className="bg-gradient-to-r from-orange-500/20 to-red-500/20 p-4 rounded-lg">
              <Users className="w-8 h-8 text-orange-400 mx-auto mb-2" />
              <p className="text-sm font-semibold text-white">Compete</p>
              <p className="text-xs text-gray-300">Climb rankings</p>
            </div>
          </div>
          <div className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 p-4 rounded-lg border border-yellow-500/20">
            <p className="text-lg font-bold text-yellow-400 mb-2">
              🎁 Daily Login Bonus Available!
            </p>
            <p className="text-sm text-gray-300">
              Remember to log in daily to claim your free coins and bonuses!
            </p>
          </div>
        </div>
      ),
      actionText: "Let's Play!",
    },
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSkip = () => {
    onComplete();
  };

  const currentStepData = steps[currentStep];
  const progress = ((currentStep + 1) / steps.length) * 100;

  return (
    <Dialog open={isOpen} onOpenChange={() => {}}>
      <DialogContent className="sm:max-w-[600px] bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 border-2 border-purple-500/20 shadow-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="text-center relative">
          <div className="absolute top-0 right-0">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleSkip}
              className="text-gray-400 hover:text-white"
            >
              Skip Tour
            </Button>
          </div>
          <div className="flex justify-center mb-4">{currentStepData.icon}</div>
          <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent">
            {currentStepData.title}
          </DialogTitle>
          <DialogDescription className="text-slate-300">
            {currentStepData.description}
          </DialogDescription>
          <div className="mt-4">
            <div className="flex justify-between text-sm text-gray-400 mb-2">
              <span>
                Step {currentStep + 1} of {steps.length}
              </span>
              <span>{Math.round(progress)}% Complete</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </DialogHeader>

        <div className="py-6">{currentStepData.content}</div>

        <div className="flex justify-between items-center pt-4 border-t border-gray-700">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentStep === 0}
            className="bg-transparent border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white"
          >
            Previous
          </Button>

          <div className="flex gap-2">
            {steps.map((_, index) => (
              <div
                key={index}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentStep
                    ? "bg-purple-500 scale-125"
                    : index < currentStep
                      ? "bg-green-500"
                      : "bg-gray-600"
                }`}
              />
            ))}
          </div>

          <Button
            onClick={handleNext}
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold"
          >
            {currentStepData.actionText}
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
