import React, { useState } from "react";
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
} from "lucide-react";

const Rewards = () => {
  const [activeTab, setActiveTab] = useState("daily");
  const [spinAvailable, setSpinAvailable] = useState(true);

  // Mock data
  const dailyRewards = [
    { day: 1, reward: "25 Coins", claimed: true, type: "coins" },
    { day: 2, reward: "1 Life", claimed: true, type: "life" },
    { day: 3, reward: "50 Coins", claimed: true, type: "coins" },
    {
      day: 4,
      reward: "Power-up",
      claimed: false,
      type: "powerup",
      current: true,
    },
    { day: 5, reward: "75 Coins", claimed: false, type: "coins" },
    { day: 6, reward: "2 Lives", claimed: false, type: "life" },
    { day: 7, reward: "100 Coins + Badge", claimed: false, type: "special" },
  ];

  const achievements = [
    {
      id: 1,
      title: "First Steps",
      description: "Complete your first quiz",
      reward: "50 Coins",
      progress: 100,
      completed: true,
      rarity: "common",
    },
    {
      id: 2,
      title: "Knowledge Seeker",
      description: "Answer 100 questions correctly",
      reward: "200 Coins + Badge",
      progress: 87,
      completed: false,
      rarity: "rare",
    },
    {
      id: 3,
      title: "Streak Master",
      description: "Maintain a 10-day login streak",
      reward: "500 Coins + Title",
      progress: 60,
      completed: false,
      rarity: "epic",
    },
    {
      id: 4,
      title: "Quiz Legend",
      description: "Reach level 50",
      reward: "1000 Coins + Crown",
      progress: 45,
      completed: false,
      rarity: "legendary",
    },
  ];

  const storeItems = [
    {
      id: 1,
      name: "50/50 Power-up",
      description: "Remove 2 wrong answers",
      price: 50,
      type: "powerup",
      icon: "🎯",
    },
    {
      id: 2,
      name: "Extra Life",
      description: "Get an additional life",
      price: 75,
      type: "life",
      icon: "❤️",
    },
    {
      id: 3,
      name: "Time Freeze",
      description: "Stop the timer for 10 seconds",
      price: 100,
      type: "powerup",
      icon: "⏸️",
    },
    {
      id: 4,
      name: "Double Coins",
      description: "2x coins for next quiz",
      price: 150,
      type: "boost",
      icon: "💰",
    },
    {
      id: 5,
      name: "Hint Master",
      description: "Get hints for difficult questions",
      price: 200,
      type: "powerup",
      icon: "💡",
    },
    {
      id: 6,
      name: "Lucky Charm",
      description: "Increase rare reward chances",
      price: 300,
      type: "boost",
      icon: "🍀",
    },
  ];

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "common":
        return "from-gray-500 to-gray-600";
      case "rare":
        return "from-blue-500 to-blue-600";
      case "epic":
        return "from-purple-500 to-purple-600";
      case "legendary":
        return "from-yellow-500 to-orange-500";
      default:
        return "from-gray-500 to-gray-600";
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
            <h1 className="text-6xl font-black bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent mb-4">
              🎁 Rewards Center
            </h1>
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
              Earn amazing rewards, collect daily bonuses, and unlock exclusive
              achievements!
            </p>
          </div>

          {/* Current Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <Card className="bg-gradient-to-r from-yellow-600/20 to-orange-600/20 border-yellow-500/20 backdrop-blur-xl">
              <CardContent className="p-4 text-center">
                <Coins className="w-6 h-6 text-yellow-400 mx-auto mb-1" />
                <div className="text-lg font-bold text-white">2,450</div>
                <div className="text-xs text-gray-300">Total Coins</div>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 border-purple-500/20 backdrop-blur-xl">
              <CardContent className="p-4 text-center">
                <Star className="w-6 h-6 text-purple-400 mx-auto mb-1" />
                <div className="text-lg font-bold text-white">156</div>
                <div className="text-xs text-gray-300">Stars Earned</div>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-r from-green-600/20 to-emerald-600/20 border-green-500/20 backdrop-blur-xl">
              <CardContent className="p-4 text-center">
                <Award className="w-6 h-6 text-green-400 mx-auto mb-1" />
                <div className="text-lg font-bold text-white">12</div>
                <div className="text-xs text-gray-300">Achievements</div>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-r from-red-600/20 to-pink-600/20 border-red-500/20 backdrop-blur-xl">
              <CardContent className="p-4 text-center">
                <Calendar className="w-6 h-6 text-red-400 mx-auto mb-1" />
                <div className="text-lg font-bold text-white">4</div>
                <div className="text-xs text-gray-300">Streak Days</div>
              </CardContent>
            </Card>
          </div>

          {/* Reward Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-4 mb-8 bg-slate-800/50">
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
              <TabsTrigger
                value="special"
                className="data-[state=active]:bg-pink-600 data-[state=active]:text-white"
              >
                ✨ Special
              </TabsTrigger>
            </TabsList>

            {/* Daily Rewards */}
            <TabsContent value="daily">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                  <Card className="bg-slate-900/80 border-slate-700 backdrop-blur-xl">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-3 text-white">
                        <Calendar className="w-8 h-8 text-yellow-400" />
                        Daily Login Rewards
                        <Badge className="bg-green-500 text-white">
                          4 Day Streak
                        </Badge>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-7 gap-3">
                        {dailyRewards.map((reward, index) => (
                          <div
                            key={reward.day}
                            className={`p-4 rounded-xl text-center transition-all duration-300 ${
                              reward.current
                                ? "bg-gradient-to-r from-yellow-500 to-orange-500 text-white scale-110 shadow-xl"
                                : reward.claimed
                                  ? "bg-green-500/20 border border-green-500/50"
                                  : "bg-slate-800/50 border border-slate-600"
                            }`}
                          >
                            <div className="text-sm font-bold mb-2">
                              Day {reward.day}
                            </div>
                            <div className="text-xs mb-2">{reward.reward}</div>
                            {reward.claimed ? (
                              <CheckCircle className="w-4 h-4 text-green-400 mx-auto" />
                            ) : reward.current ? (
                              <Gift className="w-4 h-4 text-white mx-auto animate-bounce" />
                            ) : (
                              <Lock className="w-4 h-4 text-gray-400 mx-auto" />
                            )}
                          </div>
                        ))}
                      </div>
                      <div className="mt-6 text-center">
                        <Button className="bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-700 hover:to-orange-700 text-white">
                          Claim Today's Reward
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="space-y-6">
                  {/* Quick Stats */}
                  <Card className="bg-slate-900/80 border-slate-700 backdrop-blur-xl">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-white">
                        <TrendingUp className="w-6 h-6 text-green-400" />
                        Progress
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-gray-300">Next Level</span>
                            <span className="text-white">78%</span>
                          </div>
                          <Progress value={78} className="h-2" />
                        </div>
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-gray-300">Weekly Goal</span>
                            <span className="text-white">5/7 days</span>
                          </div>
                          <Progress value={71} className="h-2" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Bonus Info */}
                  <Card className="bg-gradient-to-r from-blue-900/80 to-purple-900/80 border-blue-500/20 backdrop-blur-xl">
                    <CardContent className="p-6">
                      <div className="text-center">
                        <Sparkles className="w-12 h-12 text-blue-400 mx-auto mb-3" />
                        <h3 className="font-bold text-white mb-2">
                          Streak Bonus
                        </h3>
                        <p className="text-blue-200 text-sm mb-4">
                          Keep your login streak to unlock better rewards!
                        </p>
                        <div className="text-lg font-bold text-yellow-400">
                          +25% Bonus at 7 days
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            {/* Achievements */}
            <TabsContent value="achievements">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {achievements.map((achievement) => (
                  <Card
                    key={achievement.id}
                    className={`bg-gradient-to-r ${getRarityColor(achievement.rarity)}/20 border-slate-600 backdrop-blur-xl ${
                      achievement.completed ? "ring-2 ring-green-500/50" : ""
                    }`}
                  >
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-white flex items-center gap-2">
                            {achievement.completed ? (
                              <CheckCircle className="w-6 h-6 text-green-400" />
                            ) : (
                              <Target className="w-6 h-6 text-blue-400" />
                            )}
                            {achievement.title}
                          </CardTitle>
                          <p className="text-gray-300 text-sm mt-1">
                            {achievement.description}
                          </p>
                        </div>
                        <Badge
                          className={`bg-gradient-to-r ${getRarityColor(achievement.rarity)} text-white capitalize`}
                        >
                          {achievement.rarity}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-gray-300">Progress</span>
                            <span className="text-white">
                              {achievement.progress}%
                            </span>
                          </div>
                          <Progress
                            value={achievement.progress}
                            className="h-2"
                          />
                        </div>

                        <div className="p-3 bg-yellow-500/10 rounded-lg border border-yellow-500/20">
                          <div className="flex items-center gap-2">
                            <Gift className="w-4 h-4 text-yellow-400" />
                            <span className="text-yellow-300">
                              {achievement.reward}
                            </span>
                          </div>
                        </div>

                        {achievement.completed && (
                          <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
                            Claimed ✓
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Store */}
            <TabsContent value="store">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {storeItems.map((item) => (
                  <Card
                    key={item.id}
                    className="bg-slate-900/80 border-slate-700 backdrop-blur-xl hover:border-blue-500/50 transition-all duration-300"
                  >
                    <CardContent className="p-6">
                      <div className="text-center">
                        <div className="text-4xl mb-3">{item.icon}</div>
                        <h3 className="font-bold text-white mb-2">
                          {item.name}
                        </h3>
                        <p className="text-gray-300 text-sm mb-4">
                          {item.description}
                        </p>

                        <div className="flex items-center justify-center gap-1 mb-4">
                          <Coins className="w-5 h-5 text-yellow-400" />
                          <span className="text-xl font-bold text-yellow-400">
                            {item.price}
                          </span>
                        </div>

                        <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
                          Purchase
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Special Rewards */}
            <TabsContent value="special">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Lucky Spin */}
                <Card className="bg-gradient-to-r from-purple-900/80 to-pink-900/80 border-purple-500/20 backdrop-blur-xl">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3 text-white">
                      <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                        🎰
                      </div>
                      Lucky Spin Wheel
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center space-y-4">
                      <div className="w-32 h-32 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mx-auto flex items-center justify-center text-4xl animate-pulse">
                        🎯
                      </div>

                      <div>
                        <h3 className="font-bold text-white mb-2">
                          Weekly Free Spin
                        </h3>
                        <p className="text-purple-200 text-sm">
                          Spin the wheel for a chance to win amazing rewards!
                        </p>
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-xs">
                        {spinRewards.slice(0, 6).map((reward, index) => (
                          <div
                            key={index}
                            className="bg-purple-500/20 p-2 rounded text-purple-200"
                          >
                            {reward}
                          </div>
                        ))}
                      </div>

                      {spinAvailable ? (
                        <Button
                          onClick={() => setSpinAvailable(false)}
                          className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                        >
                          Spin Now! (Free)
                        </Button>
                      ) : (
                        <div className="text-purple-300">
                          <Clock className="w-4 h-4 inline mr-1" />
                          Next spin in 6d 14h
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>

                {/* Referral Program */}
                <Card className="bg-gradient-to-r from-green-900/80 to-emerald-900/80 border-green-500/20 backdrop-blur-xl">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3 text-white">
                      <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
                        👥
                      </div>
                      Refer Friends
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center space-y-4">
                      <div className="text-6xl">🤝</div>

                      <div>
                        <h3 className="font-bold text-white mb-2">
                          Earn Together
                        </h3>
                        <p className="text-green-200 text-sm">
                          Invite friends and earn rewards when they join!
                        </p>
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between items-center p-2 bg-green-500/20 rounded">
                          <span className="text-green-200 text-sm">
                            You earn:
                          </span>
                          <span className="text-green-300 font-bold">
                            200 Coins
                          </span>
                        </div>
                        <div className="flex justify-between items-center p-2 bg-green-500/20 rounded">
                          <span className="text-green-200 text-sm">
                            Friend earns:
                          </span>
                          <span className="text-green-300 font-bold">
                            100 Coins
                          </span>
                        </div>
                      </div>

                      <Button className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white">
                        Share Invite Link
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
};

export default Rewards;
