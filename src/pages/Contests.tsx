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
  FlaskConical,
  Scroll,
  Gamepad2,
  Globe,
  BookOpen,
  Calculator,
} from "lucide-react";

const Contests = () => {
  const [activeTab, setActiveTab] = useState("live");

  // Mock contests data with enhanced styling properties
  const liveContests = [
    {
      id: 1,
      title: "Science Showdown",
      description: "Test your scientific knowledge in this rapid-fire quiz!",
      category: "Science",
      icon: FlaskConical,
      color: "from-electric-500 to-magic-500",
      bgColor: "bg-electric-500/10",
      borderColor: "border-electric-400/30",
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
      icon: Scroll,
      color: "from-fire-500 to-danger-500",
      bgColor: "bg-fire-500/10",
      borderColor: "border-fire-400/30",
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
      icon: Gamepad2,
      color: "from-neon-500 to-fire-500",
      bgColor: "bg-neon-500/10",
      borderColor: "border-neon-400/30",
      prize: "1,200 Coins + Power-ups",
      participants: 634,
      maxParticipants: 1000,
      timeLeft: "1h 32m",
      difficulty: "Advanced",
      entry: "Free",
      status: "live",
    },
    {
      id: 4,
      title: "Geography Globe Challenge",
      description: "Explore the world through challenging geography questions!",
      category: "Geography",
      icon: Globe,
      color: "from-brand-500 to-neon-500",
      bgColor: "bg-brand-500/10",
      borderColor: "border-brand-400/30",
      prize: "1,800 Coins + Map Badge",
      participants: 521,
      maxParticipants: 800,
      timeLeft: "3h 45m",
      difficulty: "Advanced",
      entry: "Free",
      status: "live",
    },
  ];

  const upcomingContests = [
    {
      id: 5,
      title: "Weekend Warriors Tournament",
      description: "Multi-category challenge for the ultimate quiz champion!",
      category: "Mixed",
      icon: Trophy,
      color: "from-magic-500 to-electric-500",
      bgColor: "bg-magic-500/10",
      borderColor: "border-magic-400/30",
      prize: "10,000 Coins + Legendary Badge",
      participants: 0,
      maxParticipants: 5000,
      startTime: "Tomorrow 6:00 PM",
      difficulty: "Legendary",
      entry: "100 Coins",
      status: "upcoming",
    },
    {
      id: 6,
      title: "Literature Legends Challenge",
      description: "Dive deep into the world's greatest literary works!",
      category: "Literature",
      icon: BookOpen,
      color: "from-brand-500 to-fire-500",
      bgColor: "bg-brand-500/10",
      borderColor: "border-brand-400/30",
      prize: "3,000 Coins + Book Badge",
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
      id: 7,
      title: "Math Masters Championship",
      description: "Put your mathematical skills to the ultimate test!",
      category: "Mathematics",
      icon: Calculator,
      color: "from-electric-500 to-magic-500",
      bgColor: "bg-electric-500/10",
      borderColor: "border-electric-400/30",
      winner: "NumberNinja",
      yourRank: 23,
      totalParticipants: 1834,
      prize: "4,000 Coins",
      completed: "Yesterday",
      status: "completed",
    },
    {
      id: 8,
      title: "Science Legends Final",
      description: "A celebration of scientific knowledge and discovery!",
      category: "Science",
      icon: FlaskConical,
      color: "from-magic-500 to-neon-500",
      bgColor: "bg-magic-500/10",
      borderColor: "border-magic-400/30",
      winner: "ScienceGeek",
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
        return "text-neon-400 bg-neon-500/20 border-neon-400";
      case "advanced":
        return "text-electric-400 bg-electric-500/20 border-electric-400";
      case "expert":
        return "text-magic-400 bg-magic-500/20 border-magic-400";
      case "master":
        return "text-fire-400 bg-fire-500/20 border-fire-400";
      case "legendary":
        return "text-danger-400 bg-danger-500/20 border-danger-400";
      default:
        return "text-white/70 bg-white/10 border-white/20";
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
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-6">
              🏆 Quiz{" "}
              <span className="bg-gradient-to-r from-electric-400 via-neon-400 to-magic-400 bg-clip-text text-transparent">
                Contests
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-white/80 max-w-3xl mx-auto mb-8">
              Compete in exciting tournaments, win amazing prizes, and prove
              you're the ultimate quiz champion!
            </p>

            {/* Stats */}
            <div className="flex flex-wrap justify-center gap-6 mb-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl px-6 py-3 border border-white/20">
                <div className="text-2xl font-bold text-electric-400">12</div>
                <div className="text-white/70 text-sm">Contests Won</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl px-6 py-3 border border-white/20">
                <div className="text-2xl font-bold text-neon-400">25,430</div>
                <div className="text-white/70 text-sm">Coins Won</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl px-6 py-3 border border-white/20">
                <div className="text-2xl font-bold text-magic-400">#47</div>
                <div className="text-white/70 text-sm">Best Rank</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl px-6 py-3 border border-white/20">
                <div className="text-2xl font-bold text-fire-400">8</div>
                <div className="text-white/70 text-sm">Badges Earned</div>
              </div>
            </div>
          </div>

          {/* Contest Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3 mb-8 bg-white/5 backdrop-blur-sm">
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
                {liveContests.map((contest, index) => {
                  const Icon = contest.icon;
                  return (
                    <div
                      key={contest.id}
                      className={`group relative bg-white/5 backdrop-blur-sm rounded-2xl border ${contest.borderColor} p-6 hover:bg-white/10 transition-all duration-500 hover:scale-105 hover:shadow-2xl cursor-pointer transform animate-fadeInUp`}
                      style={{
                        animationDelay: `${index * 100}ms`,
                        animationFillMode: "both",
                      }}
                    >
                      {/* Gradient overlay on hover */}
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-2xl bg-gradient-to-br from-white to-transparent" />

                      {/* Header with Icon and Status */}
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center gap-3">
                          {/* Enhanced Icon */}
                          <div
                            className={`relative w-14 h-14 ${contest.bgColor} rounded-xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 ease-out overflow-hidden`}
                          >
                            {/* Animated background glow */}
                            <div
                              className={`absolute inset-0 bg-gradient-to-r ${contest.color} opacity-0 group-hover:opacity-20 rounded-xl transition-opacity duration-500`}
                            />
                            <Icon
                              className={`relative z-10 w-7 h-7 text-white group-hover:text-white transition-all duration-300 transform group-hover:scale-110`}
                              style={{
                                filter:
                                  "drop-shadow(0 0 8px rgba(255,255,255,0.3))",
                              }}
                            />
                            {/* Floating particles effect */}
                            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                              <div
                                className={`absolute top-1 right-1 w-1 h-1 bg-gradient-to-r ${contest.color} rounded-full animate-ping`}
                              />
                              <div
                                className={`absolute bottom-1 left-1 w-1 h-1 bg-gradient-to-r ${contest.color} rounded-full animate-ping delay-100`}
                              />
                            </div>
                          </div>
                          <div>
                            <h3 className="text-lg font-display font-bold text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-electric-200 group-hover:bg-clip-text transition-all duration-300">
                              {contest.title}
                            </h3>
                            <p className="text-white/70 text-sm group-hover:text-white/80 transition-colors duration-300">
                              {contest.description}
                            </p>
                          </div>
                        </div>
                        <Badge className="bg-red-500 text-white animate-pulse ml-2">
                          LIVE
                        </Badge>
                      </div>

                      {/* Contest Details */}
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <Badge
                            className={`${getDifficultyColor(contest.difficulty)} text-xs px-3 py-1`}
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
                          <div className="flex justify-between text-sm text-white/70 mb-2">
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

                        {/* Prize Pool */}
                        <div className="p-3 bg-yellow-500/10 rounded-lg border border-yellow-500/20">
                          <div className="flex items-center gap-2 mb-1">
                            <Gift className="w-4 h-4 text-yellow-400" />
                            <span className="font-semibold text-white">
                              Prize Pool
                            </span>
                          </div>
                          <p className="text-yellow-300 text-sm">
                            {contest.prize}
                          </p>
                        </div>

                        {/* Action Area */}
                        <div className="flex justify-between items-center">
                          <div className="text-sm">
                            <span className="text-white/60">Entry: </span>
                            <span className="text-white font-semibold">
                              {contest.entry}
                            </span>
                          </div>
                          <Button
                            className={`bg-gradient-to-r ${contest.color} hover:shadow-lg transition-all duration-300 text-white border-0`}
                          >
                            Join Contest
                          </Button>
                        </div>
                      </div>

                      {/* Glow effect */}
                      <div
                        className={`absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300 rounded-2xl bg-gradient-to-r ${contest.color} blur-xl -z-10`}
                      />
                    </div>
                  );
                })}
              </div>
            </TabsContent>

            {/* Upcoming Contests */}
            <TabsContent value="upcoming">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {upcomingContests.map((contest, index) => {
                  const Icon = contest.icon;
                  return (
                    <div
                      key={contest.id}
                      className={`group relative bg-white/5 backdrop-blur-sm rounded-2xl border ${contest.borderColor} p-6 hover:bg-white/10 transition-all duration-500 hover:scale-105 hover:shadow-2xl cursor-pointer transform animate-fadeInUp`}
                      style={{
                        animationDelay: `${index * 100}ms`,
                        animationFillMode: "both",
                      }}
                    >
                      {/* Gradient overlay on hover */}
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-2xl bg-gradient-to-br from-white to-transparent" />

                      {/* Header with Icon and Status */}
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center gap-3">
                          {/* Enhanced Icon */}
                          <div
                            className={`relative w-14 h-14 ${contest.bgColor} rounded-xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 ease-out overflow-hidden`}
                          >
                            {/* Animated background glow */}
                            <div
                              className={`absolute inset-0 bg-gradient-to-r ${contest.color} opacity-0 group-hover:opacity-20 rounded-xl transition-opacity duration-500`}
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
                              {contest.title}
                            </h3>
                            <p className="text-white/70 text-sm group-hover:text-white/80 transition-colors duration-300">
                              {contest.description}
                            </p>
                          </div>
                        </div>
                        <Badge className="bg-blue-500 text-white ml-2">
                          UPCOMING
                        </Badge>
                      </div>

                      {/* Contest Details */}
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <Badge
                            className={`${getDifficultyColor(contest.difficulty)} text-xs px-3 py-1`}
                          >
                            {contest.difficulty}
                          </Badge>
                          <div className="flex items-center gap-1 text-blue-400">
                            <Calendar className="w-4 h-4" />
                            <span className="font-bold text-sm">
                              {contest.startTime}
                            </span>
                          </div>
                        </div>

                        {/* Prize Pool */}
                        <div className="p-3 bg-yellow-500/10 rounded-lg border border-yellow-500/20">
                          <div className="flex items-center gap-2 mb-1">
                            <Gift className="w-4 h-4 text-yellow-400" />
                            <span className="font-semibold text-white">
                              Prize Pool
                            </span>
                          </div>
                          <p className="text-yellow-300 text-sm">
                            {contest.prize}
                          </p>
                        </div>

                        {/* Action Area */}
                        <div className="flex justify-between items-center">
                          <div className="text-sm">
                            <span className="text-white/60">Entry: </span>
                            <span className="text-white font-semibold">
                              {contest.entry}
                            </span>
                          </div>
                          <Button
                            variant="outline"
                            className={`border-2 ${contest.borderColor.replace("/30", "")} text-electric-400 hover:bg-electric-500 hover:text-white transition-all duration-300`}
                          >
                            Set Reminder
                          </Button>
                        </div>
                      </div>

                      {/* Glow effect */}
                      <div
                        className={`absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300 rounded-2xl bg-gradient-to-r ${contest.color} blur-xl -z-10`}
                      />
                    </div>
                  );
                })}
              </div>
            </TabsContent>

            {/* Completed Contests */}
            <TabsContent value="completed">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {completedContests.map((contest, index) => {
                  const Icon = contest.icon;
                  return (
                    <div
                      key={contest.id}
                      className={`group relative bg-white/5 backdrop-blur-sm rounded-2xl border ${contest.borderColor} p-6 hover:bg-white/10 transition-all duration-500 hover:scale-105 hover:shadow-2xl cursor-pointer transform animate-fadeInUp`}
                      style={{
                        animationDelay: `${index * 100}ms`,
                        animationFillMode: "both",
                      }}
                    >
                      {/* Gradient overlay on hover */}
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-2xl bg-gradient-to-br from-white to-transparent" />

                      {/* Header with Icon and Status */}
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center gap-3">
                          {/* Enhanced Icon */}
                          <div
                            className={`relative w-14 h-14 ${contest.bgColor} rounded-xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 ease-out overflow-hidden`}
                          >
                            {/* Animated background glow */}
                            <div
                              className={`absolute inset-0 bg-gradient-to-r ${contest.color} opacity-0 group-hover:opacity-20 rounded-xl transition-opacity duration-500`}
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
                              {contest.title}
                            </h3>
                            <p className="text-white/70 text-sm group-hover:text-white/80 transition-colors duration-300">
                              {contest.description}
                            </p>
                          </div>
                        </div>
                        <Badge className="bg-green-500 text-white ml-2">
                          COMPLETED
                        </Badge>
                      </div>

                      {/* Contest Results */}
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="text-center p-3 bg-yellow-500/10 rounded-lg border border-yellow-500/20">
                            <Crown className="w-6 h-6 text-yellow-400 mx-auto mb-1" />
                            <div className="text-xs text-white/60">Winner</div>
                            <div className="font-bold text-white text-sm">
                              {contest.winner}
                            </div>
                          </div>
                          <div className="text-center p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
                            <Target className="w-6 h-6 text-blue-400 mx-auto mb-1" />
                            <div className="text-xs text-white/60">
                              Your Rank
                            </div>
                            <div className="font-bold text-white text-sm">
                              #{contest.yourRank}
                            </div>
                          </div>
                        </div>

                        <div className="text-center p-3 bg-white/5 rounded-lg border border-white/20">
                          <div className="text-xs text-white/60">
                            Total Participants
                          </div>
                          <div className="font-bold text-white">
                            {contest.totalParticipants.toLocaleString()}
                          </div>
                        </div>

                        {/* Action Area */}
                        <div className="flex justify-between items-center">
                          <div className="text-sm text-white/60">
                            {contest.completed}
                          </div>
                          <Button
                            variant="outline"
                            className={`border-2 ${contest.borderColor.replace("/30", "")} text-green-400 hover:bg-green-500 hover:text-white transition-all duration-300`}
                          >
                            View Results
                          </Button>
                        </div>
                      </div>

                      {/* Glow effect */}
                      <div
                        className={`absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300 rounded-2xl bg-gradient-to-r ${contest.color} blur-xl -z-10`}
                      />
                    </div>
                  );
                })}
              </div>
            </TabsContent>
          </Tabs>

          {/* Create Contest CTA */}
          <div className="text-center mt-16">
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/20 p-8 max-w-2xl mx-auto">
              <Crown className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
              <h2 className="text-3xl font-display font-bold text-white mb-4">
                Host Your Own Contest!
              </h2>
              <p className="text-white/70 mb-6">
                Create custom tournaments, invite friends, and become the
                ultimate quiz master. Premium feature coming soon!
              </p>
              <Button className="bg-gradient-to-r from-magic-500 to-electric-500 hover:shadow-lg transition-all duration-300 text-white text-lg px-8 py-3">
                Join Waitlist
              </Button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Contests;
