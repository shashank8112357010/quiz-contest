"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Lightbulb,
  Play,
  BookOpen,
  Target,
  Zap,
  Trophy,
  ArrowRight,
  X,
} from "lucide-react";

interface QuickStartGuideProps {
  onClose?: () => void;
  compact?: boolean;
}

export const QuickStartGuide: React.FC<QuickStartGuideProps> = ({
  onClose,
  compact = false,
}) => {
  const [currentTip, setCurrentTip] = useState(0);

  const quickTips = [
    {
      icon: <Play className="w-6 h-6 text-green-400" />,
      title: "Start with Easy Categories",
      description:
        "Begin with General Knowledge or Animals to build confidence and earn your first coins!",
      action: "Try Now",
    },
    {
      icon: <Zap className="w-6 h-6 text-yellow-400" />,
      title: "Save Power-ups for Tough Questions",
      description:
        "Use 50/50 or Expert Poll when you're unsure to maintain your winning streak!",
      action: "Got It",
    },
    {
      icon: <Target className="w-6 h-6 text-blue-400" />,
      title: "Read Explanations",
      description:
        "Learn from detailed explanations after each question to improve your knowledge!",
      action: "Learn More",
    },
    {
      icon: <Trophy className="w-6 h-6 text-purple-400" />,
      title: "Daily Login Bonus",
      description:
        "Log in every day to claim free coins and build your quiz empire!",
      action: "Claim Now",
    },
  ];

  const nextTip = () => {
    setCurrentTip((prev) => (prev + 1) % quickTips.length);
  };

  if (compact) {
    const tip = quickTips[currentTip];
    return (
      <Card className="bg-gradient-to-r from-slate-800/90 to-slate-900/90 border-slate-600 backdrop-blur-sm">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-yellow-400" />
              <span className="font-semibold text-white">Quick Tip</span>
            </div>
            {onClose && (
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="w-6 h-6 text-gray-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </Button>
            )}
          </div>
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0">{tip.icon}</div>
            <div className="flex-1">
              <h4 className="font-semibold text-white mb-1">{tip.title}</h4>
              <p className="text-sm text-gray-300 mb-3">{tip.description}</p>
              <div className="flex items-center justify-between">
                <Button
                  size="sm"
                  onClick={nextTip}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                >
                  {tip.action}
                  <ArrowRight className="w-3 h-3 ml-1" />
                </Button>
                <div className="flex gap-1">
                  {quickTips.map((_, index) => (
                    <div
                      key={index}
                      className={`w-2 h-2 rounded-full transition-colors ${
                        index === currentTip ? "bg-blue-400" : "bg-gray-600"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-gradient-to-br from-slate-800 to-slate-900 border-slate-600">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-white">
            <Lightbulb className="w-6 h-6 text-yellow-400" />
            Quick Start Guide
          </CardTitle>
          {onClose && (
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="text-gray-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {quickTips.map((tip, index) => (
          <div
            key={index}
            className={`p-4 rounded-lg border transition-all duration-300 ${
              index === currentTip
                ? "bg-blue-500/20 border-blue-500/50"
                : "bg-slate-700/50 border-slate-600"
            }`}
          >
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0">{tip.icon}</div>
              <div className="flex-1">
                <h4 className="font-semibold text-white mb-1">{tip.title}</h4>
                <p className="text-sm text-gray-300 mb-2">{tip.description}</p>
                {index === currentTip && (
                  <Badge className="bg-blue-500 text-white">Current</Badge>
                )}
              </div>
            </div>
          </div>
        ))}

        <div className="flex justify-between items-center pt-4 border-t border-slate-600">
          <span className="text-sm text-gray-400">
            Tip {currentTip + 1} of {quickTips.length}
          </span>
          <Button
            onClick={nextTip}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
          >
            Next Tip
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
