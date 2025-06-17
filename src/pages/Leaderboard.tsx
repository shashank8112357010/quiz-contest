import React from "react";
import { AnimatedBackground } from "@/components/ui/animated-background";
import { Header } from "@/components/ui/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { PrizeCarousel } from "@/components/ui/prize-carousel";
import {
  Trophy,
  Medal,
  Crown,
  Star,
  TrendingUp,
  Users,
  Target,
  Zap,
  Award,
} from "lucide-react";

const Leaderboard = () => {
  // Mock leaderboard data
  const topPlayers = [
    {
      rank: 1,
      name: "QuizMaster Pro",
      score: 15420,
      level: 45,
      avatar: "QP",
      badge: "Champion",
    },
    {
      rank: 2,
      name: "BrainStorm Elite",
      score: 14890,
      level: 42,
      avatar: "BE",
      badge: "Expert",
    },
    {
      rank: 3,
      name: "KnowledgeKing",
      score: 13650,
      level: 38,
      avatar: "KK",
      badge: "Master",
    },
    {
      rank: 4,
      name: "TriviaTitan",
      score: 12340,
      level: 35,
      avatar: "TT",
      badge: "Pro",
    },
    {
      rank: 5,
      name: "SmartSavant",
      score: 11280,
      level: 32,
      avatar: "SS",
      badge: "Advanced",
    },
  ];

  const categories = [
    { name: "Science", leader: "Albert Quiz", score: 2450 },
    { name: "History", leader: "TimeKeeper", score: 2380 },
    { name: "Sports", leader: "AthleteAce", score: 2290 },
    { name: "Geography", leader: "WorldWise", score: 2150 },
    { name: "Literature", leader: "BookWorm", score: 2080 },
  ];

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="w-6 h-6 text-yellow-400" />;
      case 2:
        return <Medal className="w-6 h-6 text-gray-400" />;
      case 3:
        return <Medal className="w-6 h-6 text-orange-400" />;
      default:
        return <Trophy className="w-6 h-6 text-blue-400" />;
    }
  };

  const getRankColor = (rank: number) => {
    switch (rank) {
      case 1:
        return "from-yellow-500 to-orange-500";
      case 2:
        return "from-gray-400 to-gray-500";
      case 3:
        return "from-orange-400 to-orange-500";
      default:
        return "from-blue-500 to-purple-500";
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <AnimatedBackground />

      <div className="relative z-40">
        <Header />

        <main className="container mx-auto px-4 py-8">
          {/* Page Header */}
          <div className="text-center mb-12">
            <h1 className="text-6xl font-black bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent mb-4">
              🏆 Global Leaderboard
            </h1>
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
              Compete with the best quiz masters from around the world! Climb
              the ranks and earn your place among the legends.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Leaderboard */}
            <div className="lg:col-span-2">
              <Card className="bg-slate-900/80 border-slate-700 backdrop-blur-xl">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-white">
                    <Trophy className="w-8 h-8 text-yellow-400" />
                    Top Quiz Masters
                    <Badge className="bg-yellow-500 text-black">LIVE</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {topPlayers.map((player, index) => (
                      <div
                        key={player.rank}
                        className={`p-4 rounded-xl border-2 transition-all duration-300 hover:scale-105 ${
                          player.rank <= 3
                            ? `bg-gradient-to-r ${getRankColor(player.rank)}/20 border-${
                                player.rank === 1
                                  ? "yellow"
                                  : player.rank === 2
                                    ? "gray"
                                    : "orange"
                              }-500/50`
                            : "bg-slate-800/50 border-slate-600 hover:border-blue-500/50"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2">
                              {getRankIcon(player.rank)}
                              <span className="text-2xl font-bold text-white">
                                #{player.rank}
                              </span>
                            </div>

                            <Avatar className="w-12 h-12">
                              <AvatarFallback className="bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold">
                                {player.avatar}
                              </AvatarFallback>
                            </Avatar>

                            <div>
                              <h3 className="font-bold text-white text-lg">
                                {player.name}
                              </h3>
                              <Badge
                                className={`bg-gradient-to-r ${getRankColor(player.rank)} text-white`}
                              >
                                {player.badge}
                              </Badge>
                            </div>
                          </div>

                          <div className="text-right">
                            <div className="flex items-center gap-4 text-white">
                              <div className="text-center">
                                <div className="flex items-center gap-1">
                                  <Star className="w-4 h-4 text-yellow-400" />
                                  <span className="font-bold">
                                    {player.score.toLocaleString()}
                                  </span>
                                </div>
                                <span className="text-xs text-gray-400">
                                  Score
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 text-center">
                    <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
                      View Full Rankings
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar Stats */}
            <div className="space-y-6">
              {/* Stats Cards */}
              <Card className="bg-slate-900/80 border-slate-700 backdrop-blur-xl">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-white">
                    <TrendingUp className="w-6 h-6 text-green-400" />
                    Your Stats
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">Current Rank</span>
                      <span className="font-bold text-white">#247</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">Best Rank</span>
                      <span className="font-bold text-green-400">#89</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">Total Score</span>
                      <span className="font-bold text-yellow-400">5,420</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">This Week</span>
                      <span className="font-bold text-blue-400">+124</span>
                    </div>
                  </div>
                  <Button
                    className="w-full mt-4 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white"
                    onClick={() => {
                      // Redirect to contest categories page
                      window.location.href = "/categories";
                    }}
                  >
                    <Target className="w-4 h-4 mr-2" />
                    Enter Contest
                  </Button>
                </CardContent>
              </Card>

              {/* Category Leaders */}
              <Card className="bg-slate-900/80 border-slate-700 backdrop-blur-xl">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-white">
                    <Award className="w-6 h-6 text-purple-400" />
                    Category Leaders
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {categories.map((category, index) => (
                      <div
                        key={category.name}
                        className="flex justify-between items-center p-3 bg-slate-800/50 rounded-lg"
                      >
                        <div>
                          <h4 className="font-semibold text-white">
                            {category.name}
                          </h4>
                          <p className="text-sm text-gray-400">
                            {category.leader}
                          </p>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-yellow-400">
                            {category.score}
                          </div>
                          <div className="text-xs text-gray-400">points</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Dynamic Gratification Content */}
              <Card className="bg-gradient-to-r from-purple-900/80 to-pink-900/80 border-purple-500/20 backdrop-blur-xl overflow-hidden">
                <CardContent className="p-0">
                  {/* Dynamic Background with Animation */}
                  <div className="relative h-32 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 flex items-center justify-center overflow-hidden">
                    {/* Animated Background Circles */}
                    {[...Array(6)].map((_, i) => (
                      <div
                        key={i}
                        className="absolute w-20 h-20 border border-white/20 rounded-full animate-pulse"
                        style={{
                          left: `${20 + i * 15}%`,
                          top: `${30 + (i % 2) * 40}%`,
                          animationDelay: `${i * 0.5}s`,
                          animationDuration: `${2 + i * 0.3}s`,
                        }}
                      />
                    ))}

                    {/* Floating Reward Icons */}
                    <div className="absolute left-4 top-4 w-8 h-8 bg-gold-400 rounded-full flex items-center justify-center animate-bounce">
                      <Trophy className="w-4 h-4 text-white" />
                    </div>
                    <div
                      className="absolute right-4 top-4 w-8 h-8 bg-emerald-400 rounded-full flex items-center justify-center animate-bounce"
                      style={{ animationDelay: "0.5s" }}
                    >
                      <Crown className="w-4 h-4 text-white" />
                    </div>
                    <div className="absolute left-6 bottom-4 w-6 h-6 bg-blue-400 rounded-full flex items-center justify-center animate-pulse">
                      <Star className="w-3 h-3 text-white" />
                    </div>
                    <div
                      className="absolute right-6 bottom-4 w-6 h-6 bg-pink-400 rounded-full flex items-center justify-center animate-pulse"
                      style={{ animationDelay: "0.8s" }}
                    >
                      <Medal className="w-3 h-3 text-white" />
                    </div>

                    {/* Sparkling Effects */}
                    {[...Array(8)].map((_, i) => (
                      <div
                        key={`spark-${i}`}
                        className="absolute w-1 h-1 bg-white rounded-full animate-ping"
                        style={{
                          left: `${Math.random() * 100}%`,
                          top: `${Math.random() * 100}%`,
                          animationDelay: `${Math.random() * 2}s`,
                        }}
                      />
                    ))}

                    {/* Central Prize Display */}
                    <div className="text-center z-10">
                      <Crown className="w-10 h-10 text-gold-300 mx-auto mb-1 animate-bounce" />
                      <div className="text-white font-bold text-sm">
                        Super Bonanza
                      </div>
                      <div className="text-gold-200 text-xs">Championship</div>
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="p-4 text-center">
                    <h3 className="font-bold text-white mb-2 bg-gradient-to-r from-gold-300 to-yellow-300 bg-clip-text text-transparent">
                      Weekly Championship
                    </h3>
                    <p className="text-purple-200 text-sm mb-3">
                      Compete for the crown and win exclusive rewards!
                    </p>
                    <div className="text-xl font-bold text-gold-400 mb-1">
                      🏆 ₹25,000 Prize Pool
                    </div>
                    <div className="text-sm text-emerald-400 mb-2">
                      💎 + Exclusive Rewards
                    </div>

                    {/* Dynamic Timer */}
                    <div className="bg-black/30 rounded-lg px-3 py-2 mb-3">
                      <p className="text-xs text-purple-300 mb-1">Ends in:</p>
                      <div className="font-mono font-bold text-gold-200">
                        2d 14h 23m
                      </div>
                    </div>

                    {/* Gratification Stats */}
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="bg-purple-800/30 rounded p-2">
                        <div className="text-gold-300 font-bold">1,247</div>
                        <div className="text-purple-200">Participants</div>
                      </div>
                      <div className="bg-purple-800/30 rounded p-2">
                        <div className="text-emerald-300 font-bold">89</div>
                        <div className="text-purple-200">Winners</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Leaderboard;
