import React, { useState } from "react";
import { AnimatedBackground } from "@/components/ui/animated-background";
import { Header } from "@/components/ui/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Trophy,
  Clock,
  Users,
  Star,
  Coins,
  Calendar,
  Timer,
  Medal,
  Crown,
  Gift,
  Zap,
  Target,
  Award,
} from "lucide-react";

const Contests = () => {
  const [activeTab, setActiveTab] = useState("live");

  // Mock contests data
  const liveContests = [
    {
      id: 1,
      title: "Science Showdown",
      description: "Test your scientific knowledge in this rapid-fire quiz!",
      category: "Science",
      prize: "2,500 Coins + Exclusive Badge",
      participants: 1247,
      maxParticipants: 2000,
      timeLeft: "2h 15m",
      difficulty: "Expert",
      entry: "Free",
      status: "live",
    },
    {
      id: 2,
      title: "History Heroes Championship",
      description: "Journey through time and prove your historical mastery!",
      category: "History",
      prize: "5,000 Coins + Crown Badge",
      participants: 892,
      maxParticipants: 1500,
      timeLeft: "45m",
      difficulty: "Master",
      entry: "50 Coins",
      status: "live",
    },
    {
      id: 3,
      title: "Sports Trivia Sprint",
      description: "Quick-fire sports questions for the ultimate fan!",
      category: "Sports",
      prize: "1,200 Coins + Power-ups",
      participants: 634,
      maxParticipants: 1000,
      timeLeft: "1h 32m",
      difficulty: "Advanced",
      entry: "Free",
      status: "live",
    },
  ];

  const upcomingContests = [
    {
      id: 4,
      title: "Weekend Warriors Tournament",
      description: "Multi-category challenge for the ultimate quiz champion!",
      category: "Mixed",
      prize: "10,000 Coins + Legendary Badge",
      participants: 0,
      maxParticipants: 5000,
      startTime: "Tomorrow 6:00 PM",
      difficulty: "Legendary",
      entry: "100 Coins",
      status: "upcoming",
    },
    {
      id: 5,
      title: "Geography Globe-Trotter",
      description: "Explore the world through challenging geography questions!",
      category: "Geography",
      prize: "3,000 Coins + Map Badge",
      participants: 0,
      maxParticipants: 2500,
      startTime: "Friday 8:00 PM",
      difficulty: "Expert",
      entry: "Free",
      status: "upcoming",
    },
  ];

  const completedContests = [
    {
      id: 6,
      title: "Literature Legends",
      description: "A celebration of the world's greatest literary works!",
      category: "Literature",
      winner: "BookWormPro",
      yourRank: 23,
      totalParticipants: 1834,
      prize: "4,000 Coins",
      completed: "Yesterday",
      status: "completed",
    },
    {
      id: 7,
      title: "Math Masters Challenge",
      description: "Put your mathematical skills to the ultimate test!",
      category: "Mathematics",
      winner: "NumberNinja",
      yourRank: 15,
      totalParticipants: 956,
      prize: "2,800 Coins",
      completed: "3 days ago",
      status: "completed",
    },
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case "beginner":
        return "bg-green-500";
      case "advanced":
        return "bg-blue-500";
      case "expert":
        return "bg-purple-500";
      case "master":
        return "bg-orange-500";
      case "legendary":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case "science":
        return "🧪";
      case "history":
        return "🏛️";
      case "sports":
        return "⚽";
      case "geography":
        return "🌍";
      case "literature":
        return "📚";
      case "mathematics":
        return "🔢";
      case "mixed":
        return "🎯";
      default:
        return "❓";
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
            <h1 className="text-6xl font-black bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent mb-4">
              🏆 Quiz Contests
            </h1>
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
              Compete in exciting tournaments, win amazing prizes, and prove
              you're the ultimate quiz champion!
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 border-blue-500/20 backdrop-blur-xl">
              <CardContent className="p-6 text-center">
                <Trophy className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">12</div>
                <div className="text-sm text-gray-300">Contests Won</div>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-r from-green-600/20 to-emerald-600/20 border-green-500/20 backdrop-blur-xl">
              <CardContent className="p-6 text-center">
                <Coins className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">25,430</div>
                <div className="text-sm text-gray-300">Coins Won</div>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-r from-orange-600/20 to-red-600/20 border-orange-500/20 backdrop-blur-xl">
              <CardContent className="p-6 text-center">
                <Medal className="w-8 h-8 text-orange-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">#47</div>
                <div className="text-sm text-gray-300">Best Rank</div>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 border-purple-500/20 backdrop-blur-xl">
              <CardContent className="p-6 text-center">
                <Star className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">8</div>
                <div className="text-sm text-gray-300">Badges Earned</div>
              </CardContent>
            </Card>
          </div>

          {/* Contest Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3 mb-8 bg-slate-800/50">
              <TabsTrigger
                value="live"
                className="data-[state=active]:bg-red-600 data-[state=active]:text-white"
              >
                🔴 Live Contests
              </TabsTrigger>
              <TabsTrigger
                value="upcoming"
                className="data-[state=active]:bg-blue-600 data-[state=active]:text-white"
              >
                📅 Upcoming
              </TabsTrigger>
              <TabsTrigger
                value="completed"
                className="data-[state=active]:bg-green-600 data-[state=active]:text-white"
              >
                ✅ Completed
              </TabsTrigger>
            </TabsList>

            {/* Live Contests */}
            <TabsContent value="live">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {liveContests.map((contest) => (
                  <Card
                    key={contest.id}
                    className="bg-gradient-to-br from-slate-900/90 to-red-900/20 border-red-500/30 backdrop-blur-xl"
                  >
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-white flex items-center gap-2">
                            {getCategoryIcon(contest.category)} {contest.title}
                          </CardTitle>
                          <p className="text-gray-300 text-sm mt-1">
                            {contest.description}
                          </p>
                        </div>
                        <Badge className="bg-red-500 text-white animate-pulse">
                          LIVE
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <Badge
                            className={`${getDifficultyColor(contest.difficulty)} text-white`}
                          >
                            {contest.difficulty}
                          </Badge>
                          <div className="flex items-center gap-1 text-yellow-400">
                            <Clock className="w-4 h-4" />
                            <span className="font-bold">
                              {contest.timeLeft}
                            </span>
                          </div>
                        </div>

                        <div>
                          <div className="flex justify-between text-sm text-gray-300 mb-1">
                            <span>Participants</span>
                            <span>
                              {contest.participants.toLocaleString()} /{" "}
                              {contest.maxParticipants.toLocaleString()}
                            </span>
                          </div>
                          <Progress
                            value={
                              (contest.participants / contest.maxParticipants) *
                              100
                            }
                            className="h-2"
                          />
                        </div>

                        <div className="p-3 bg-yellow-500/10 rounded-lg border border-yellow-500/20">
                          <div className="flex items-center gap-2 mb-1">
                            <Gift className="w-4 h-4 text-yellow-400" />
                            <span className="font-semibold text-white">
                              Prize Pool
                            </span>
                          </div>
                          <p className="text-yellow-300">{contest.prize}</p>
                        </div>

                        <div className="flex justify-between items-center">
                          <div className="text-sm">
                            <span className="text-gray-400">Entry: </span>
                            <span className="text-white font-semibold">
                              {contest.entry}
                            </span>
                          </div>
                          <Button className="bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white">
                            Join Contest
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Upcoming Contests */}
            <TabsContent value="upcoming">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {upcomingContests.map((contest) => (
                  <Card
                    key={contest.id}
                    className="bg-gradient-to-br from-slate-900/90 to-blue-900/20 border-blue-500/30 backdrop-blur-xl"
                  >
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-white flex items-center gap-2">
                            {getCategoryIcon(contest.category)} {contest.title}
                          </CardTitle>
                          <p className="text-gray-300 text-sm mt-1">
                            {contest.description}
                          </p>
                        </div>
                        <Badge className="bg-blue-500 text-white">
                          UPCOMING
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <Badge
                            className={`${getDifficultyColor(contest.difficulty)} text-white`}
                          >
                            {contest.difficulty}
                          </Badge>
                          <div className="flex items-center gap-1 text-blue-400">
                            <Calendar className="w-4 h-4" />
                            <span className="font-bold">
                              {contest.startTime}
                            </span>
                          </div>
                        </div>

                        <div className="p-3 bg-yellow-500/10 rounded-lg border border-yellow-500/20">
                          <div className="flex items-center gap-2 mb-1">
                            <Gift className="w-4 h-4 text-yellow-400" />
                            <span className="font-semibold text-white">
                              Prize Pool
                            </span>
                          </div>
                          <p className="text-yellow-300">{contest.prize}</p>
                        </div>

                        <div className="flex justify-between items-center">
                          <div className="text-sm">
                            <span className="text-gray-400">Entry: </span>
                            <span className="text-white font-semibold">
                              {contest.entry}
                            </span>
                          </div>
                          <Button
                            variant="outline"
                            className="border-blue-500 text-blue-400 hover:bg-blue-500 hover:text-white"
                          >
                            Set Reminder
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Completed Contests */}
            <TabsContent value="completed">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {completedContests.map((contest) => (
                  <Card
                    key={contest.id}
                    className="bg-gradient-to-br from-slate-900/90 to-green-900/20 border-green-500/30 backdrop-blur-xl"
                  >
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-white flex items-center gap-2">
                            {getCategoryIcon(contest.category)} {contest.title}
                          </CardTitle>
                          <p className="text-gray-300 text-sm mt-1">
                            {contest.description}
                          </p>
                        </div>
                        <Badge className="bg-green-500 text-white">
                          COMPLETED
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="text-center p-3 bg-yellow-500/10 rounded-lg">
                            <Crown className="w-6 h-6 text-yellow-400 mx-auto mb-1" />
                            <div className="text-sm text-gray-400">Winner</div>
                            <div className="font-bold text-white">
                              {contest.winner}
                            </div>
                          </div>
                          <div className="text-center p-3 bg-blue-500/10 rounded-lg">
                            <Target className="w-6 h-6 text-blue-400 mx-auto mb-1" />
                            <div className="text-sm text-gray-400">
                              Your Rank
                            </div>
                            <div className="font-bold text-white">
                              #{contest.yourRank}
                            </div>
                          </div>
                        </div>

                        <div className="text-center p-3 bg-slate-800/50 rounded-lg">
                          <div className="text-sm text-gray-400">
                            Total Participants
                          </div>
                          <div className="font-bold text-white">
                            {contest.totalParticipants.toLocaleString()}
                          </div>
                        </div>

                        <div className="flex justify-between items-center">
                          <div className="text-sm text-gray-400">
                            {contest.completed}
                          </div>
                          <Button
                            variant="outline"
                            className="border-green-500 text-green-400 hover:bg-green-500 hover:text-white"
                          >
                            View Results
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>

          {/* Create Contest CTA */}
          <Card className="mt-12 bg-gradient-to-r from-purple-900/80 to-pink-900/80 border-purple-500/20 backdrop-blur-xl">
            <CardContent className="p-8 text-center">
              <Crown className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-white mb-2">
                Host Your Own Contest!
              </h2>
              <p className="text-purple-200 mb-6 max-w-2xl mx-auto">
                Create custom tournaments, invite friends, and become the
                ultimate quiz master. Premium feature coming soon!
              </p>
              <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white text-lg px-8 py-3">
                Join Waitlist
              </Button>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
};

export default Contests;
