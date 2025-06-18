"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  CheckCircle,
  Circle,
  Camera,
  Users,
  Settings,
  Share2,
  Trophy,
  Star,
} from "lucide-react";
import { useAuth } from "@/components/providers/AuthProvider";
import { updateUserData } from "@/lib/firebaseService";


interface ProfileCompletionProps {
  className?: string;
}

export const ProfileCompletion: React.FC<ProfileCompletionProps> = ({
  className = "",
}) => {
  const { userData } = useAuth();
  const [updatingItem, setUpdatingItem] = React.useState<string | null>(null);
  const [showSuccess, setShowSuccess] = React.useState<string | null>(null);
  const [showError, setShowError] = React.useState<string | null>(null);

  const completionItems = [
    {
      id: "basic_info",
      title: "Basic Information",
      description: "Name and email verified",
      completed: true,
      icon: <CheckCircle className="w-4 h-4" />,
    },
    {
      id: "first_quiz",
      title: "First Quiz Completed",
      description: "Complete your first quiz",
      completed: userData?.totalGamesPlayed
        ? userData.totalGamesPlayed > 0
        : false,
      icon: userData?.totalGamesPlayed ? (
        userData.totalGamesPlayed > 0 ? (
          <CheckCircle className="w-4 h-4" />
        ) : (
          <Circle className="w-4 h-4" />
        )
      ) : (
        <Circle className="w-4 h-4" />
      ),
      action: userData?.totalGamesPlayed
        ? userData.totalGamesPlayed > 0
          ? null
          : "Take Quiz"
        : "Take Quiz",
    },
    {
      id: "profile_picture",
      title: "Profile Picture",
      description: "Upload a custom avatar",
      completed: !!userData?.avatar,
      icon: !!userData?.avatar ? (
        <CheckCircle className="w-4 h-4" />
      ) : (
        <Circle className="w-4 h-4" />
      ),
      action: !!userData?.avatar ? null : "Upload Photo",
    },
    {
      id: "social_connect",
      title: "Connect Social",
      description: "Link your social accounts",
      completed: !!userData?.socialConnected,
      icon: !!userData?.socialConnected ? (
        <CheckCircle className="w-4 h-4" />
      ) : (
        <Circle className="w-4 h-4" />
      ),
      action: !!userData?.socialConnected ? null : "Connect",
    },
    {
      id: "achievements",
      title: "First Achievement",
      description: "Unlock your first achievement",
      completed: userData?.achievements
        ? userData.achievements.length > 0
        : false,
      icon: userData?.achievements ? (
        userData.achievements.length > 0 ? (
          <CheckCircle className="w-4 h-4" />
        ) : (
          <Circle className="w-4 h-4" />
        )
      ) : (
        <Circle className="w-4 h-4" />
      ),
    },
    {
      id: "preferences",
      title: "Set Preferences",
      description: "Customize your quiz experience",
      completed: !!userData?.preferencesSet,
      icon: !!userData?.preferencesSet ? (
        <CheckCircle className="w-4 h-4" />
      ) : (
        <Circle className="w-4 h-4" />
      ),
      action: !!userData?.preferencesSet ? null : "Settings",
    },
  ];

  const completedCount = completionItems.filter(
    (item) => item.completed,
  ).length;
  const completionPercentage = Math.round(
    (completedCount / completionItems.length) * 100,
  );

  const getCompletionBadge = () => {
    if (completionPercentage === 100) {
      return {
        text: "Profile Master",
        color: "bg-gradient-to-r from-yellow-500 to-orange-500",
      };
    }
    if (completionPercentage >= 80) {
      return {
        text: "Almost There",
        color: "bg-gradient-to-r from-purple-500 to-pink-500",
      };
    }
    if (completionPercentage >= 60) {
      return {
        text: "Good Progress",
        color: "bg-gradient-to-r from-blue-500 to-purple-500",
      };
    }
    if (completionPercentage >= 40) {
      return {
        text: "Getting Started",
        color: "bg-gradient-to-r from-green-500 to-blue-500",
      };
    }
    return {
      text: "Just Started",
      color: "bg-gradient-to-r from-gray-500 to-gray-600",
    };
  };

  const badge = getCompletionBadge();

  return (
    <Card
      className={`bg-slate-900/80 border-slate-700 backdrop-blur-xl ${className}`}
    >
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-white">
            <Trophy className="w-6 h-6 text-yellow-400" />
            Profile Completion
          </CardTitle>
          <Badge className={`${badge.color} text-white`}>{badge.text}</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Progress Overview */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-white font-semibold">Overall Progress</span>
              <span className="text-white font-bold">
                {completionPercentage}%
              </span>
            </div>
            <Progress value={completionPercentage} className="h-3 mb-2" />
            <p className="text-sm text-gray-400">
              {completedCount} of {completionItems.length} items completed
            </p>
            {showSuccess && (
              <div className="text-green-400 text-xs mt-2">{showSuccess}</div>
            )}
            {showError && (
              <div className="text-red-400 text-xs mt-2">{showError}</div>
            )}
          </div>

          {/* Completion Items */}
          <div className="space-y-3">
            {completionItems.map((item) => (
              <div
                key={item.id}
                className={`flex items-center justify-between p-3 rounded-lg transition-all duration-300 ${
                  item.completed
                    ? "bg-green-500/20 border border-green-500/30"
                    : "bg-slate-800/50 border border-slate-600 hover:border-blue-500/50"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={
                      item.completed ? "text-green-400" : "text-gray-400"
                    }
                  >
                    {item.icon}
                  </div>
                  <div>
                    <h4
                      className={`font-semibold ${item.completed ? "text-white" : "text-gray-300"}`}
                    >
                      {item.title}
                    </h4>
                    <p
                      className={`text-sm ${item.completed ? "text-green-200" : "text-gray-400"}`}
                    >
                      {item.description}
                    </p>
                  </div>
                </div>
                {!item.completed && item.action && (
                  <Button
                    size="sm"
                    className={`bg-blue-600 hover:bg-blue-700 text-white ${updatingItem === item.id ? 'opacity-60 cursor-not-allowed' : ''}`}
                    disabled={!!updatingItem}
                    onClick={async () => {
                      setShowSuccess(null);
                      setShowError(null);
                      setUpdatingItem(item.id);
                      try {
                        if (item.id === "social_connect") {
                          await updateUserData(userData.uid, { socialConnected: true });
                          setShowSuccess("Social account connected!");
                        } else if (item.id === "preferences") {
                          await updateUserData(userData.uid, { preferencesSet: true });
                          setShowSuccess("Preferences saved!");
                        }
                      } catch (err) {
                        setShowError("Failed to update. Please try again.");
                      } finally {
                        setUpdatingItem(null);
                      }
                    }}
                  >
                    {updatingItem === item.id ? 'Saving...' : item.action}
                  </Button>
                )}
                {item.completed && (
                  <div className="flex items-center gap-1 text-green-400">
                    <Star className="w-4 h-4" />
                    <span className="text-sm font-semibold">+50 XP</span>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Completion Rewards */}
          {completionPercentage < 100 && (
            <div className="mt-6 p-4 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 rounded-lg border border-yellow-500/20">
              <div className="flex items-center gap-2 mb-2">
                <Trophy className="w-5 h-5 text-yellow-400" />
                <span className="font-semibold text-white">
                  Complete Your Profile
                </span>
              </div>
              <p className="text-sm text-yellow-200 mb-3">
                Finish setting up your profile to unlock exclusive rewards!
              </p>
              <div className="text-sm text-yellow-300">
                🎁 Rewards: 500 Coins + Special Badge + Premium Features
              </div>
            </div>
          )}

          {completionPercentage === 100 && (
            <div className="mt-6 p-4 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-lg border border-green-500/30">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span className="font-semibold text-white">
                  Profile Complete!
                </span>
              </div>
              <p className="text-sm text-green-200">
                🎉 Congratulations! You've unlocked all profile features and
                earned premium benefits.
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
