import React, { useEffect, useState } from "react";
import { AnimatedBackground } from "@/components/ui/animated-background";
import { Header } from "@/components/ui/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Gift,
  Coins,
  Star,
  Calendar,
  Trophy,
  Crown,
  Zap,
  Heart,
  Award,
  CheckCircle,
  Lock,
  Sparkles,
  Target,
  TrendingUp,
  Clock,
  Users,
  Gamepad2,
  ShoppingCart,
} from "lucide-react";

import { useAuth } from "@/components/providers/AuthProvider";
import { db } from "@/lib/firebase";
import { doc, getDoc, onSnapshot, updateDoc, setDoc } from "firebase/firestore";
import DailyProgress from "@/components/ui/daily-progress";

const TOTAL_DAYS = 90;

const Rewards = () => {
  const [activeTab, setActiveTab] = useState("daily");
  const [spinAvailable, setSpinAvailable] = useState(true);

  // Real-time daily progress state
  const { user } = useAuth();
  const [progress, setProgress] = useState({
    unlockedDays: 1,
    completedDays: [],
  });
  const [loadingProgress, setLoadingProgress] = useState(true);

  useEffect(() => {
    if (!user?.uid) return;
    const ref = doc(db, "users", user.uid);
    setLoadingProgress(true);
    // Listen to real-time updates
    const unsub = onSnapshot(ref, (snap) => {
      if (snap.exists() && snap.data().dailyProgress) {
        setProgress(snap.data().dailyProgress);
      } else {
        // If no progress, initialize
        setDoc(
          ref,
          { dailyProgress: { unlockedDays: 1, completedDays: [] } },
          { merge: true },
        );
        setProgress({ unlockedDays: 1, completedDays: [] });
      }
      setLoadingProgress(false);
    });
    return () => unsub();
  }, [user?.uid]);

  // Mark a day as completed and unlock next
  const markDayCompleted = async (day: number) => {
    if (!user?.uid) return;
    const ref = doc(db, "users", user.uid);
    const newCompleted = progress.completedDays.includes(day)
      ? progress.completedDays
      : [...progress.completedDays, day];
    const newUnlocked = Math.max(progress.unlockedDays, day + 1);
    await updateDoc(ref, {
      "dailyProgress.completedDays": newCompleted,
      "dailyProgress.unlockedDays": newUnlocked,
    });
    // Local update for instant UI
    setProgress({ unlockedDays: newUnlocked, completedDays: newCompleted });
  };

  // Enhanced daily rewards with styling properties
  const dailyRewards = [
    {
      day: 1,
      reward: "25 Coins",
      claimed: true,
      type: "coins",
      icon: Coins,
      color: "from-yellow-500 to-orange-500",
      bgColor: "bg-yellow-500/10",
      borderColor: "border-yellow-400/30",
    },
    {
      day: 2,
      reward: "1 Life",
      claimed: true,
      type: "life",
      icon: Heart,
      color: "from-red-500 to-pink-500",
      bgColor: "bg-red-500/10",
      borderColor: "border-red-400/30",
    },
    {
      day: 3,
      reward: "50 Coins",
      claimed: true,
      type: "coins",
      icon: Coins,
      color: "from-yellow-500 to-orange-500",
      bgColor: "bg-yellow-500/10",
      borderColor: "border-yellow-400/30",
    },
    {
      day: 4,
      reward: "Power-up",
      claimed: false,
      type: "powerup",
      current: true,
      icon: Zap,
      color: "from-electric-500 to-magic-500",
      bgColor: "bg-electric-500/10",
      borderColor: "border-electric-400/30",
    },
    {
      day: 5,
      reward: "75 Coins",
      claimed: false,
      type: "coins",
      icon: Coins,
      color: "from-yellow-500 to-orange-500",
      bgColor: "bg-yellow-500/10",
      borderColor: "border-yellow-400/30",
    },
    {
      day: 6,
      reward: "2 Lives",
      claimed: false,
      type: "life",
      icon: Heart,
      color: "from-red-500 to-pink-500",
      bgColor: "bg-red-500/10",
      borderColor: "border-red-400/30",
    },
    {
      day: 7,
      reward: "100 Coins + Badge",
      claimed: false,
      type: "special",
      icon: Crown,
      color: "from-magic-500 to-neon-500",
      bgColor: "bg-magic-500/10",
      borderColor: "border-magic-400/30",
    },
  ];

  // Enhanced achievements with styling properties
  const achievements = [
    {
      id: 1,
      title: "First Steps",
      description: "Complete your first quiz",
      reward: "50 Coins",
      progress: 100,
      completed: true,
      rarity: "common",
      icon: Target,
      color: "from-neon-500 to-electric-500",
      bgColor: "bg-neon-500/10",
      borderColor: "border-neon-400/30",
    },
    {
      id: 2,
      title: "Knowledge Seeker",
      description: "Answer 100 questions correctly",
      reward: "200 Coins + Badge",
      progress: 87,
      completed: false,
      rarity: "rare",
      icon: Award,
      color: "from-brand-500 to-magic-500",
      bgColor: "bg-brand-500/10",
      borderColor: "border-brand-400/30",
    },
    {
      id: 3,
      title: "Streak Master",
      description: "Maintain a 10-day login streak",
      reward: "500 Coins + Title",
      progress: 60,
      completed: false,
      rarity: "epic",
      icon: Calendar,
      color: "from-magic-500 to-fire-500",
      bgColor: "bg-magic-500/10",
      borderColor: "border-magic-400/30",
    },
    {
      id: 4,
      title: "Quiz Legend",
      description: "Reach level 50",
      reward: "1000 Coins + Crown",
      progress: 45,
      completed: false,
      rarity: "legendary",
      icon: Crown,
      color: "from-fire-500 to-danger-500",
      bgColor: "bg-fire-500/10",
      borderColor: "border-fire-400/30",
    },
  ];

  // Enhanced store items with styling properties
  const storeItems = [
    {
      id: 1,
      name: "50/50 Power-up",
      description: "Remove 2 wrong answers",
      price: 50,
      type: "powerup",
      icon: Target,
      color: "from-electric-500 to-magic-500",
      bgColor: "bg-electric-500/10",
      borderColor: "border-electric-400/30",
    },
    {
      id: 2,
      name: "Extra Life",
      description: "Get an additional life",
      price: 75,
      type: "life",
      icon: Heart,
      color: "from-red-500 to-pink-500",
      bgColor: "bg-red-500/10",
      borderColor: "border-red-400/30",
    },
    {
      id: 3,
      name: "Time Freeze",
      description: "Stop the timer for 10 seconds",
      price: 100,
      type: "powerup",
      icon: Clock,
      color: "from-brand-500 to-neon-500",
      bgColor: "bg-brand-500/10",
      borderColor: "border-brand-400/30",
    },
    {
      id: 4,
      name: "Double Coins",
      description: "2x coins for next quiz",
      price: 150,
      type: "boost",
      icon: Coins,
      color: "from-yellow-500 to-orange-500",
      bgColor: "bg-yellow-500/10",
      borderColor: "border-yellow-400/30",
    },
    {
      id: 5,
      name: "Hint Master",
      description: "Get hints for difficult questions",
      price: 200,
      type: "powerup",
      icon: Sparkles,
      color: "from-magic-500 to-electric-500",
      bgColor: "bg-magic-500/10",
      borderColor: "border-magic-400/30",
    },
    {
      id: 6,
      name: "Lucky Charm",
      description: "Increase rare reward chances",
      price: 300,
      type: "boost",
      icon: Star,
      color: "from-neon-500 to-fire-500",
      bgColor: "bg-neon-500/10",
      borderColor: "border-neon-400/30",
    },
  ];

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "common":
        return "text-neon-400 bg-neon-500/20 border-neon-400";
      case "rare":
        return "text-brand-400 bg-brand-500/20 border-brand-400";
      case "epic":
        return "text-magic-400 bg-magic-500/20 border-magic-400";
      case "legendary":
        return "text-fire-400 bg-fire-500/20 border-fire-400";
      default:
        return "text-white/70 bg-white/10 border-white/20";
    }
  };

  const spinRewards = [
    "50 Coins",
    "100 Coins",
    "1 Life",
    "Power-up",
    "200 Coins",
    "2 Lives",
    "Special Badge",
    "500 Coins",
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      <AnimatedBackground />

      <div className="relative z-40">
        <Header />

        <main className="container mx-auto px-4 py-8">
          {/* Page Header */}
          <div className="text-center mb-12">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-6">
              🎁 Gratifications{" "}
              <span className="bg-gradient-to-r from-electric-400 via-neon-400 to-magic-400 bg-clip-text text-transparent">
                Center
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-white/80 max-w-3xl mx-auto mb-8">
              Earn amazing gratifications, collect daily bonuses, and unlock
              exclusive achievements!
            </p>

            {/* Stats */}
            <div className="flex flex-wrap justify-center gap-6 mb-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl px-6 py-3 border border-white/20">
                <div className="text-2xl font-bold text-electric-400">
                  2,450
                </div>
                <div className="text-white/70 text-sm">Total Coins</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl px-6 py-3 border border-white/20">
                <div className="text-2xl font-bold text-neon-400">156</div>
                <div className="text-white/70 text-sm">Stars Earned</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl px-6 py-3 border border-white/20">
                <div className="text-2xl font-bold text-magic-400">12</div>
                <div className="text-white/70 text-sm">Achievements</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl px-6 py-3 border border-white/20">
                <div className="text-2xl font-bold text-fire-400">4</div>
                <div className="text-white/70 text-sm">Streak Days</div>
              </div>
            </div>
          </div>

          {/* Reward Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3 mb-8 bg-white/5 backdrop-blur-sm">
              <TabsTrigger
                value="daily"
                className="data-[state=active]:bg-yellow-600 data-[state=active]:text-white"
              >
                📅 Daily
              </TabsTrigger>
              <TabsTrigger
                value="achievements"
                className="data-[state=active]:bg-purple-600 data-[state=active]:text-white"
              >
                🏆 Achievements
              </TabsTrigger>
              <TabsTrigger
                value="store"
                className="data-[state=active]:bg-blue-600 data-[state=active]:text-white"
              >
                🛒 Store
              </TabsTrigger>
            </TabsList>
            {/* Daily Rewards */}
            <TabsContent value="daily">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                  {/* Dynamic Daily Progress Grid (real-time) */}
                  {loadingProgress ? (
                    <div className="text-white text-center p-8">
                      Loading progress...
                    </div>
                  ) : (
                    <DailyProgress
                      unlockedDays={progress.unlockedDays}
                      completedDays={progress.completedDays}
                      onPlay={(day) => {
                        // Navigate to quiz for that day
                        window.location.href = `/quiz/day/${day}`;
                      }}
                    />
                  )}
                </div>
                <div className="space-y-6">
                  {/* Progress Card */}
                  <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/20 p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 bg-green-500/10 rounded-xl flex items-center justify-center">
                        <TrendingUp className="w-6 h-6 text-green-400" />
                      </div>
                      <h3 className="text-lg font-display font-bold text-white">
                        Progress
                      </h3>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-white/70">Next Level</span>
                          <span className="text-white">78%</span>
                        </div>
                        <Progress value={78} className="h-2" />
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-white/70">Weekly Goal</span>
                          <span className="text-white">5/7 days</span>
                        </div>
                        <Progress value={71} className="h-2" />
                      </div>
                    </div>
                  </div>

                  {/* Streak Bonus Card */}
                  <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-blue-400/30 p-6">
                    <div className="text-center">
                      <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center mx-auto mb-3">
                        <Sparkles className="w-6 h-6 text-blue-400" />
                      </div>
                      <h3 className="font-display font-bold text-white mb-2">
                        Streak Bonus
                      </h3>
                      <p className="text-blue-200 text-sm mb-4">
                        Keep your login streak to unlock better rewards!
                      </p>
                      <div className="text-lg font-bold text-yellow-400">
                        +25% Bonus at 7 days
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
            {/* Achievements */}
            <TabsContent value="achievements">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {achievements.map((achievement, index) => {
                  const Icon = achievement.icon;
                  return (
                    <div
                      key={achievement.id}
                      className={`group relative bg-white/5 backdrop-blur-sm rounded-2xl border ${
                        achievement.borderColor
                      } p-6 hover:bg-white/10 transition-all duration-500 hover:scale-105 hover:shadow-2xl cursor-pointer transform animate-fadeInUp ${
                        achievement.completed ? "ring-2 ring-green-500/50" : ""
                      }`}
                      style={{
                        animationDelay: `${index * 100}ms`,
                        animationFillMode: "both",
                      }}
                    >
                      {/* Gradient overlay on hover */}
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-2xl bg-gradient-to-br from-white to-transparent" />

                      {/* Header with Icon and Badge */}
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center gap-3">
                          {/* Enhanced Icon */}
                          <div
                            className={`relative w-14 h-14 ${achievement.bgColor} rounded-xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 ease-out overflow-hidden`}
                          >
                            {/* Animated background glow */}
                            <div
                              className={`absolute inset-0 bg-gradient-to-r ${achievement.color} opacity-0 group-hover:opacity-20 rounded-xl transition-opacity duration-500`}
                            />
                            <Icon
                              className={`relative z-10 w-7 h-7 text-white group-hover:text-white transition-all duration-300 transform group-hover:scale-110`}
                              style={{
                                filter:
                                  "drop-shadow(0 0 8px rgba(255,255,255,0.3))",
                              }}
                            />
                          </div>
                          <div>
                            <h3 className="text-lg font-display font-bold text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-electric-200 group-hover:bg-clip-text transition-all duration-300">
                              {achievement.title}
                            </h3>
                            <p className="text-white/70 text-sm group-hover:text-white/80 transition-colors duration-300">
                              {achievement.description}
                            </p>
                          </div>
                        </div>
                        <Badge
                          className={`${getRarityColor(
                            achievement.rarity,
                          )} text-xs px-3 py-1 capitalize`}
                        >
                          {achievement.rarity}
                        </Badge>
                      </div>

                      {/* Progress */}
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between text-sm text-white/70 mb-2">
                            <span>Progress</span>
                            <span>{achievement.progress}%</span>
                          </div>
                          <Progress
                            value={achievement.progress}
                            className="h-2"
                          />
                        </div>

                        {/* Prize Pool */}
                        <div className="p-3 bg-yellow-500/10 rounded-lg border border-yellow-500/20">
                          <div className="flex items-center gap-2">
                            <Gift className="w-4 h-4 text-yellow-400" />
                            <span className="text-yellow-300 text-sm">
                              {achievement.reward}
                            </span>
                          </div>
                        </div>

                        {/* Action Button */}
                        {achievement.completed ? (
                          <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
                            Claimed ✓
                          </Button>
                        ) : (
                          <Button
                            className={`w-full bg-gradient-to-r ${achievement.color} hover:shadow-lg transition-all duration-300 text-white border-0`}
                            disabled
                          >
                            In Progress
                          </Button>
                        )}
                      </div>

                      {/* Glow effect */}
                      <div
                        className={`absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300 rounded-2xl bg-gradient-to-r ${achievement.color} blur-xl -z-10`}
                      />
                    </div>
                  );
                })}
              </div>
            </TabsContent>
            {/* Store */}
            <TabsContent value="store">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {storeItems.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={item.id}
                      className={`group relative bg-white/5 backdrop-blur-sm rounded-2xl border ${item.borderColor} p-6 hover:bg-white/10 transition-all duration-500 hover:scale-105 hover:shadow-2xl cursor-pointer transform animate-fadeInUp`}
                      style={{
                        animationDelay: `${index * 100}ms`,
                        animationFillMode: "both",
                      }}
                    >
                      {/* Product Image */}
                      <div className="relative mb-4">
                        <div
                          className={`w-full h-32 ${item.bgColor} rounded-xl flex items-center justify-center overflow-hidden group-hover:scale-105 transition-transform duration-300`}
                        >
                          {item.name === "50/50 Power-up" && (
                            <img
                              src="https://images.pexels.com/photos/27499331/pexels-photo-27499331.jpeg"
                              alt={item.name}
                              className="object-cover w-full h-full rounded-xl opacity-80 group-hover:opacity-100 transition-opacity duration-300"
                            />
                          )}
                          {item.name === "Extra Life" && (
                            <img
                              src="https://images.pexels.com/photos/6320167/pexels-photo-6320167.jpeg"
                              alt={item.name}
                              className="object-cover w-full h-full rounded-xl opacity-80 group-hover:opacity-100 transition-opacity duration-300"
                            />
                          )}
                          {item.name === "Time Freeze" && (
                            <img
                              src="https://images.pexels.com/photos/191414/pexels-photo-191414.jpeg"
                              alt={item.name}
                              className="object-cover w-full h-full rounded-xl opacity-80 group-hover:opacity-100 transition-opacity duration-300"
                            />
                          )}
                          {item.name === "Double Coins" && (
                            <img
                              src="https://images.pexels.com/photos/210600/pexels-photo-210600.jpeg"
                              alt={item.name}
                              className="object-cover w-full h-full rounded-xl opacity-80 group-hover:opacity-100 transition-opacity duration-300"
                            />
                          )}
                          {item.name === "Hint Master" && (
                            <img
                              src="https://images.pexels.com/photos/4254548/pexels-photo-4254548.jpeg"
                              alt={item.name}
                              className="object-cover w-full h-full rounded-xl opacity-80 group-hover:opacity-100 transition-opacity duration-300"
                            />
                          )}
                          {item.name === "Lucky Charm" && (
                            <img
                              src="https://images.pexels.com/photos/11975693/pexels-photo-11975693.jpeg"
                              alt={item.name}
                              className="object-cover w-full h-full rounded-xl opacity-80 group-hover:opacity-100 transition-opacity duration-300"
                            />
                          )}
                          {/* Icon overlay */}
                          <div className="absolute inset-0 bg-black/40 flex items-center justify-center rounded-xl">
                            <Icon className="w-8 h-8 text-white drop-shadow-lg" />
                          </div>
                        </div>
                      </div>

                      {/* Item Info */}
                      <div className="space-y-3">
                        <div>
                          <h3 className="text-lg font-bold text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-electric-200 group-hover:bg-clip-text transition-all duration-300">
                            {item.name}
                          </h3>
                          <p className="text-white/70 text-sm group-hover:text-white/80 transition-colors duration-300">
                            {item.description}
                          </p>
                        </div>

                        {/* Price */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="w-6 h-6 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                              <span className="text-white text-xs font-bold">
                                ₹
                              </span>
                            </div>
                            <span className="text-xl font-bold text-white">
                              {item.price}
                            </span>
                          </div>
                          <Badge
                            className={`${item.bgColor} ${item.borderColor} text-white text-xs px-3 py-1 capitalize`}
                          >
                            {item.type}
                          </Badge>
                        </div>

                        {/* Buy Button */}
                        <Button
                          className={`w-full bg-gradient-to-r ${item.color} hover:shadow-lg transition-all duration-300 text-white border-0 group-hover:scale-105`}
                        >
                          Purchase
                        </Button>
                      </div>

                      {/* Glow effect */}
                      <div
                        className={`absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300 rounded-2xl bg-gradient-to-r ${item.color} blur-xl -z-10`}
                      />
                    </div>
                  );
                })}
              </div>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
};

export default Rewards;
