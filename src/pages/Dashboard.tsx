import React, { useState } from "react";
import { AnimatedBackground } from "@/components/ui/animated-background";
import { Header } from "@/components/ui/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DemoLoginHelper } from "@/components/ui/demo-login-helper";
import {
  LayoutDashboard,
  User,
  Trophy,
  TrendingUp,
  Activity,
  Bell,
  Settings,
  Calendar,
  BarChart3,
  Users,
  Target,
  Star,
  Coins,
  Heart,
  Zap,
  Award,
  Clock,
  CheckCircle,
  AlertCircle,
  BookOpen,
  Play,
  Pause,
  Plus,
  Eye,
} from "lucide-react";
import { useAuth } from "@/components/providers/AuthProvider";
import { useLanguageStore } from "@/lib/languages";

const Dashboard = () => {
  const { t, currentLanguage } = useLanguageStore(); // subscribe to language changes for reactivity
  const { user, userData, loading } = useAuth();
  const [activeMetric, setActiveMetric] = useState("overview");

  // Mock dashboard data
  const dashboardStats = {
    totalQuizzes: 342,
    correctAnswers: 2847,
    totalTime: "127h 34m",
    accuracy: 85.3,
    streak: 12,
    rank: 1247,
    weeklyGoal: 75,
    monthlyTarget: 300,
  };

  // Current Activity Status
  const currentStatus = {
    isOnline: true,
    lastActive: "2 minutes ago",
    currentStreak: 12,
    streakType: "daily", // daily, weekly, monthly
    todayQuizzes: 5,
    todayGoal: 8,
    energyLevel: 85, // 0-100
    focusMode: false,
    studyTime: "2h 15m today",
  };

  // New Offers and Promotions
  const activeOffers = [
    {
      id: 1,
      title: t("dashboard.offers.weekendBonus.title"),
      description: t("dashboard.offers.weekendBonus.desc"),
      type: "limited_time",
      expires: "23h 45m",
      reward: t("dashboard.offers.weekendBonus.reward"),
      claimed: false,
      urgent: true,
    },
    {
      id: 2,
      title: t("dashboard.offers.firstPlacePrize.title"),
      description: t("dashboard.offers.firstPlacePrize.desc"),
      type: "daily_challenge",
      expires: "5h 12m",
      reward: "500 coins + Premium badge",
      claimed: false,
      urgent: false,
    },
    {
      id: 3,
      title: t("dashboard.offers.studyBuddyBonus.title"),
      description: t("dashboard.offers.studyBuddyBonus.desc"),
      type: "referral",
      expires: "7 days",
      reward: t("dashboard.offers.studyBuddyBonus.reward"),
      claimed: false,
      urgent: false,
    },
  ];

  // Available Challenges
  const activeChallenges = [
    {
      id: 1,
      title: t("dashboard.challenges.scienceMaster.title"),
      description: t("dashboard.challenges.scienceMaster.desc"),
      category: t("dashboard.challenges.scienceMaster.category"),
      progress: 32,
      target: 50,
      reward: t("dashboard.challenges.scienceMaster.reward"),
      difficulty: t("dashboard.difficulty.medium"),
      timeLeft: "3 days",
    },
    {
      id: 2,
      title: t("dashboard.challenges.speedDemon.title"),
      description: t("dashboard.challenges.speedDemon.desc"),
      category: t("dashboard.challenges.speedDemon.category"),
      progress: 7,
      target: 10,
      reward: t("dashboard.challenges.speedDemon.reward"),
      difficulty: t("dashboard.difficulty.hard"),
      timeLeft: "1 day",
    },
    {
      id: 3,
      title: t("dashboard.challenges.perfectWeek.title"),
      description: t("dashboard.challenges.perfectWeek.desc"),
      category: t("dashboard.challenges.perfectWeek.category"),
      progress: 4,
      target: 7,
      reward: t("dashboard.challenges.perfectWeek.reward"),
      difficulty: t("dashboard.difficulty.expert"),
      timeLeft: "3 days",
    },
    {
      id: 4,
      title: t("dashboard.challenges.historyBuff.title"),
      description: t("dashboard.challenges.historyBuff.desc"),
      category: t("dashboard.challenges.historyBuff.category"),
      progress: 15,
      target: 25,
      reward: t("dashboard.challenges.historyBuff.reward"),
      difficulty: t("dashboard.difficulty.easy"),
      timeLeft: "No limit",
    },
  ];

  const recentActivity = [
    {
      id: 1,
      action: t("dashboard.activity.completedScienceQuiz"),
      score: "18/20",
      time: "2 min ago",
      points: 180,
      type: "quiz",
    },
    {
      id: 2,
      action: t("dashboard.activity.achievementUnlocked"),
      description: t("dashboard.activity.speedDemon"),
      time: "15 min ago",
      points: 500,
      type: "achievement",
    },
    {
      id: 3,
      action: t("dashboard.activity.dailyLoginBonus"),
      description: t("dashboard.activity.day5Streak"),
      time: "2 hours ago",
      points: 50,
      type: "bonus",
    },
    {
      id: 4,
      action: t("dashboard.activity.leveledUp"),
      description: t("dashboard.activity.reachedLevel23"),
      time: "1 day ago",
      points: 1000,
      type: "level",
    },
  ];

  const weeklyData = [
    { day: "Mon", quizzes: 5, score: 92, time: 45 },
    { day: "Tue", quizzes: 8, score: 87, time: 62 },
    { day: "Wed", quizzes: 3, score: 95, time: 28 },
    { day: "Thu", quizzes: 6, score: 89, time: 51 },
    { day: "Fri", quizzes: 9, score: 91, time: 73 },
    { day: "Sat", quizzes: 4, score: 88, time: 34 },
    { day: "Sun", quizzes: 7, score: 94, time: 58 },
  ];

  const notifications = [
    {
      id: 1,
      title: t("dashboard.notifications.contestStartingSoon.title"),
      message: t("dashboard.notifications.contestStartingSoon.msg"),
      time: "1h ago",
      type: "info",
    },
    {
      id: 2,
      title: t("dashboard.notifications.newAchievementAvailable.title"),
      message: t("dashboard.notifications.newAchievementAvailable.msg"),
      time: "3h ago",
      type: "achievement",
    },
    {
      id: 3,
      title: t("dashboard.notifications.friendRequest.title"),
      message: t("dashboard.notifications.friendRequest.msg"),
      time: "5h ago",
      type: "social",
    },
  ];

  const upcomingEvents = [
    {
      id: 1,
      title: t("dashboard.events.weeklyTournament.title"),
      date: "Tomorrow 6:00 PM",
      participants: 1247,
      prize: t("dashboard.events.weeklyTournament.prize"),
    },
    {
      id: 2,
      title: t("dashboard.events.historyChallenge.title"),
      date: "Dec 25, 8:00 PM",
      participants: 892,
      prize: t("dashboard.events.historyChallenge.prize"),
    },
    {
      id: 3,
      title: t("dashboard.events.speedQuizMarathon.title"),
      date: "Dec 30, 3:00 PM",
      participants: 2156,
      prize: t("dashboard.events.speedQuizMarathon.prize"),
    },
  ];

  if (loading) {
    return (
      <div className="min-h-screen relative overflow-hidden">
        <AnimatedBackground />
        <div className="relative z-40">
          <Header />
          <div className="container mx-auto px-4 py-16 text-center">
            <div className="animate-pulse">
              <h1 className="text-4xl font-bold text-white mb-4">
                {t("dashboard.loading")}

              </h1>
              <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!user || !userData) {
    return (
      <div className="min-h-screen relative overflow-hidden">
        <AnimatedBackground />
        <div className="relative z-40">
          <Header />
          <div className="container mx-auto px-4 py-16">
            <div className="text-center mb-8">
              <div className="flex items-center justify-center gap-3 mb-4">
                <LayoutDashboard className="w-8 h-8 text-purple-400" />
                <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  {t("dashboard.accessTitle")}
                </h1>
              </div>
              <p className="text-gray-300 text-lg">
                {t("dashboard.accessPrompt")}
              </p>
            </div>

            <div className="max-w-2xl mx-auto">
              <DemoLoginHelper />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      <AnimatedBackground />

      <div className="relative z-40">
        <Header />

        <main className="container mx-auto px-4 py-8">
          {/* Dashboard Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <LayoutDashboard className="w-8 h-8 text-purple-400" />
              <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                {t("dashboard.personalTitle")}
              </h1>
              <Badge className="bg-purple-500 text-white">{t("dashboard.playerBadge")}</Badge>
            </div>
            <p className="text-gray-300 text-lg">
              {t("dashboard.welcome", { name: userData.displayName })}
            </p>
          </div>

          {/* Current Activity Status */}
          <Card className="mb-8 bg-gradient-to-r from-green-900/80 to-blue-900/80 border-green-500/20 backdrop-blur-xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-3 h-3 rounded-full ${currentStatus.isOnline ? "bg-green-400 animate-pulse" : "bg-gray-400"}`}
                  />
                  <h3 className="font-bold text-white text-lg">
                    {t("dashboard.currentStatus")}
                  </h3>
                  <Badge
                    className={
                      currentStatus.isOnline ? "bg-green-500" : "bg-gray-500"
                    }
                  >
                    {currentStatus.isOnline ? t("dashboard.online") : t("dashboard.offline")}
                  </Badge>
                </div>
                <div className="text-sm text-gray-300">
                  {t("dashboard.lastActive", { time: currentStatus.lastActive })}
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-3 bg-white/5 rounded-lg">
                  <div className="text-2xl font-bold text-green-400">
                    {currentStatus.currentStreak}
                  </div>
                  <div className="text-xs text-green-300 capitalize">
                    {currentStatus.streakType} Streak
                  </div>
                </div>
                <div className="text-center p-3 bg-white/5 rounded-lg">
                  <div className="text-2xl font-bold text-blue-400">
                    {currentStatus.todayQuizzes}/{currentStatus.todayGoal}
                  </div>
                  <div className="text-xs text-blue-300">{t("dashboard.todaysProgress")}</div>
                </div>
                <div className="text-center p-3 bg-white/5 rounded-lg">
                  <div className="text-2xl font-bold text-yellow-400">
                    {currentStatus.energyLevel}%
                  </div>
                  <div className="text-xs text-yellow-300">{t("dashboard.energyLevel")}</div>
                </div>
                <div className="text-center p-3 bg-white/5 rounded-lg">
                  <div className="text-2xl font-bold text-purple-400">
                    {currentStatus.studyTime}
                  </div>
                  <div className="text-xs text-purple-300">{t("dashboard.studyTime")}</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Special Offers & Promotions */}
          <Card className="mb-8 bg-gradient-to-r from-yellow-900/80 to-orange-900/80 border-yellow-500/20 backdrop-blur-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <Star className="w-6 h-6 text-yellow-400" />
                {t("dashboard.limitedTimeOffers")}
                <Badge className="bg-yellow-500 text-black">{t("dashboard.hot")}</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {activeOffers.map((offer) => (
                  <div
                    key={offer.id}
                    className={`p-4 rounded-lg border ${offer.urgent ? "bg-red-500/10 border-red-500/30" : "bg-white/5 border-white/10"}`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-bold text-white">{offer.title}</h4>
                      {offer.urgent && (
                        <Badge className="bg-red-500 text-white text-xs">
                          {t("dashboard.urgent")}
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-gray-300 mb-2">
                      {offer.description}
                    </p>
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-xs text-yellow-400 font-semibold">
                        {offer.reward}
                      </span>
                      <span className="text-xs text-gray-400">
                        Expires: {offer.expires}
                      </span>
                    </div>
                    <Button
                      size="sm"
                      className={`w-full ${offer.urgent ? "bg-red-600 hover:bg-red-700" : "bg-yellow-600 hover:bg-yellow-700"} text-white`}
                      disabled={offer.claimed}
                    >
                      {offer.claimed ? t("dashboard.claimed") : t("dashboard.claimNow")}
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* {t("dashboard.activeChallenges")} */}
          <Card className="mb-8 bg-gradient-to-r from-purple-900/80 to-pink-900/80 border-purple-500/20 backdrop-blur-xl">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2 text-white">
                  <Trophy className="w-6 h-6 text-purple-400" />
                  {t("dashboard.activeChallenges")}
                  <Badge className="bg-purple-500 text-white">
                    {activeChallenges.length}
                  </Badge>
                </CardTitle>
                <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                  <Plus className="w-4 h-4 mr-2" />
                  {t("dashboard.browseMore")}
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {activeChallenges.map((challenge) => (
                  <div
                    key={challenge.id}
                    className="p-4 bg-white/5 rounded-lg border border-white/10"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-bold text-white">
                        {challenge.title}
                      </h4>
                      <Badge
                        className={
                          challenge.difficulty === "easy"
                            ? "bg-green-500"
                            : challenge.difficulty === "medium"
                              ? "bg-yellow-500"
                              : challenge.difficulty === "hard"
                                ? "bg-orange-500"
                                : "bg-red-500"
                        }
                      >
                        {challenge.difficulty}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-300 mb-3">
                      {challenge.description}
                    </p>

                    <div className="mb-3">
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-400">Progress</span>
                        <span className="text-white">
                          {challenge.progress}/{challenge.target}
                        </span>
                      </div>
                      <Progress
                        value={(challenge.progress / challenge.target) * 100}
                        className="h-2"
                      />
                    </div>

                    <div className="flex justify-between items-center mb-3">
                      <div className="text-xs text-blue-400">
                        <Calendar className="w-3 h-3 inline mr-1" />
                        {challenge.timeLeft}
                      </div>
                      <div className="text-xs text-green-400 font-semibold">
                        {challenge.reward}
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                      >
                        {t("dashboard.continue")}
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-purple-500 text-purple-400"
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 border-blue-500/20 backdrop-blur-xl">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-400">{t("dashboard.totalQuizzes")}</p>
                    <p className="text-2xl font-bold text-white">
                      {dashboardStats.totalQuizzes}
                    </p>
                  </div>
                  <BookOpen className="w-8 h-8 text-blue-400" />
                </div>
                <div className="mt-2">
                  <Badge className="bg-blue-500 text-white text-xs">
                    {t("dashboard.plus12ThisWeek")}
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-green-600/20 to-emerald-600/20 border-green-500/20 backdrop-blur-xl">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-400">{t("dashboard.accuracyRate")}</p>
                    <p className="text-2xl font-bold text-white">
                      {dashboardStats.accuracy}%
                    </p>
                  </div>
                  <Target className="w-8 h-8 text-green-400" />
                </div>
                <div className="mt-2">
                  <Badge className="bg-green-500 text-white text-xs">
                    {t("dashboard.plus2Improvement")}
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-orange-600/20 to-red-600/20 border-orange-500/20 backdrop-blur-xl">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-400">{t("dashboard.currentStreak")}</p>
                    <p className="text-2xl font-bold text-white">
                      {dashboardStats.streak} days
                    </p>
                  </div>
                  <Calendar className="w-8 h-8 text-orange-400" />
                </div>
                <div className="mt-2">
                  <Badge className="bg-orange-500 text-white text-xs">
                    {t("dashboard.personalBest")}
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 border-purple-500/20 backdrop-blur-xl">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-400">{t("dashboard.globalRank")}</p>
                    <p className="text-2xl font-bold text-white">
                      #{dashboardStats.rank}
                    </p>
                  </div>
                  <Trophy className="w-8 h-8 text-purple-400" />
                </div>
                <div className="mt-2">
                  <Badge className="bg-purple-500 text-white text-xs">
                    {t("dashboard.top15")}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Dashboard Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* {t("dashboard.weeklyPerformance")} Chart */}
              <Card className="bg-slate-900/80 border-slate-700 backdrop-blur-xl">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-white">
                    <BarChart3 className="w-6 h-6 text-blue-400" />
                    {t("dashboard.weeklyPerformance")}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {weeklyData.map((day, index) => (
                      <div key={index} className="flex items-center gap-4">
                        <div className="w-12 text-white font-semibold">
                          {day.day}
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between text-sm text-gray-400 mb-1">
                            <span>{day.quizzes} quizzes</span>
                            <span>{day.score}% {t("dashboard.avg")}</span>
                          </div>
                          <Progress value={day.score} className="h-2" />
                        </div>
                        <div className="text-right text-sm text-gray-400">
                          {day.time}m
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* {t("dashboard.recentActivity")} */}
              <Card className="bg-slate-900/80 border-slate-700 backdrop-blur-xl">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-white">
                    <Activity className="w-6 h-6 text-green-400" />
                    {t("dashboard.recentActivity")}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentActivity.map((activity) => (
                      <div
                        key={activity.id}
                        className="flex items-center gap-4 p-3 bg-slate-800/50 rounded-lg"
                      >
                        <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                          {activity.type === "quiz" && (
                            <BookOpen className="w-5 h-5 text-white" />
                          )}
                          {activity.type === "achievement" && (
                            <Trophy className="w-5 h-5 text-white" />
                          )}
                          {activity.type === "bonus" && (
                            <Star className="w-5 h-5 text-white" />
                          )}
                          {activity.type === "level" && (
                            <Award className="w-5 h-5 text-white" />
                          )}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-white">
                            {activity.action}
                          </h4>
                          <p className="text-sm text-gray-400">
                            {activity.score || activity.description} •{" "}
                            {activity.time}
                          </p>
                        </div>
                        <div className="text-right">
                          <div className="text-yellow-400 font-bold">
                            +{activity.points}
                          </div>
                          <div className="text-xs text-gray-400">{t("dashboard.points")}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Sidebar */}
            <div className="space-y-6">
              {/* User Quick Stats */}
              <Card className="bg-gradient-to-r from-purple-900/80 to-pink-900/80 border-purple-500/20 backdrop-blur-xl">
                <CardContent className="p-6">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <User className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="font-bold text-white mb-2">
                      {userData.displayName}
                    </h3>
                    <Badge className="bg-purple-500 text-white mb-4">
                      Level {userData.currentLevel}
                    </Badge>

                    <div className="grid grid-cols-3 gap-4 mt-4">
                      <div className="text-center">
                        <div className="text-lg font-bold text-yellow-400">
                          {userData.coins}
                        </div>
                        <div className="text-xs text-gray-400">Coins</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold text-red-400">
                          {userData.lives}
                        </div>
                        <div className="text-xs text-gray-400">{t("dashboard.lives")}</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold text-purple-400">
                          {userData.totalStars}
                        </div>
                        <div className="text-xs text-gray-400">{t("dashboard.stars")}</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* {t("dashboard.notifications")} */}
              <Card className="bg-slate-900/80 border-slate-700 backdrop-blur-xl">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-white">
                    <Bell className="w-5 h-5 text-yellow-400" />
                    {t("dashboard.notifications")}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className="p-3 bg-slate-800/50 rounded-lg"
                      >
                        <div className="flex items-start gap-2">
                          {notification.type === "info" && (
                            <AlertCircle className="w-4 h-4 text-blue-400 mt-0.5" />
                          )}
                          {notification.type === "achievement" && (
                            <Trophy className="w-4 h-4 text-yellow-400 mt-0.5" />
                          )}
                          {notification.type === "social" && (
                            <Users className="w-4 h-4 text-green-400 mt-0.5" />
                          )}
                          <div className="flex-1">
                            <h5 className="font-semibold text-white text-sm">
                              {notification.title}
                            </h5>
                            <p className="text-xs text-gray-400">
                              {notification.message}
                            </p>
                            <p className="text-xs text-gray-500 mt-1">
                              {notification.time}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* {t("dashboard.upcomingEvents")} */}
              <Card className="bg-slate-900/80 border-slate-700 backdrop-blur-xl">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-white">
                    <Calendar className="w-5 h-5 text-blue-400" />
                    {t("dashboard.upcomingEvents")}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {upcomingEvents.map((event) => (
                      <div
                        key={event.id}
                        className="p-3 bg-slate-800/50 rounded-lg"
                      >
                        <h5 className="font-semibold text-white text-sm">
                          {event.title}
                        </h5>
                        <p className="text-xs text-gray-400">{event.date}</p>
                        <div className="flex justify-between items-center mt-2">
                          <span className="text-xs text-gray-500">
                            {event.participants} {t("dashboard.participants")}
                          </span>
                          <Badge className="bg-yellow-500 text-black text-xs">
                            {event.prize}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* {t("dashboard.dailyGoals")} & Challenges */}
              <Card className="bg-slate-900/80 border-slate-700 backdrop-blur-xl mb-6">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-white">
                    <Target className="w-5 h-5 text-orange-400" />
                    {t("dashboard.dailyGoals")}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-400">{t("dashboard.quizzesCompleted")}</span>
                        <span className="text-white">
                          {currentStatus.todayQuizzes}/{currentStatus.todayGoal}
                        </span>
                      </div>
                      <Progress
                        value={
                          (currentStatus.todayQuizzes /
                            currentStatus.todayGoal) *
                          100
                        }
                        className="h-2"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-400">{t("dashboard.weeklyStreak")}</span>
                        <span className="text-white">5/7 days</span>
                      </div>
                      <Progress value={(5 / 7) * 100} className="h-2" />
                    </div>

                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-400">{t("dashboard.accuracyGoal")}</span>
                        <span className="text-white">92/90%</span>
                      </div>
                      <Progress value={100} className="h-2" />
                    </div>
                  </div>

                  <div className="p-3 bg-green-500/10 rounded-lg border border-green-500/20">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      <span className="text-sm text-green-300">
                        {t("dashboard.goalsCompleted")}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* {t("dashboard.quickActions")} */}
              <Card className="bg-slate-900/80 border-slate-700 backdrop-blur-xl">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-white">
                    <Zap className="w-5 h-5 text-purple-400" />
                    {t("dashboard.quickActions")}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
                    <Play className="w-4 h-4 mr-2" />
                    {t("dashboard.continue")} Quiz Journey
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full border-orange-500 text-orange-400 hover:bg-orange-500 hover:text-white"
                  >
                    <Target className="w-4 h-4 mr-2" />
                    {t("dashboard.joinDailyChallenge")}
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full border-yellow-500 text-yellow-400 hover:bg-yellow-500 hover:text-white"
                  >
                    <Star className="w-4 h-4 mr-2" />
                    {t("dashboard.claimRewards")}
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full border-green-500 text-green-400 hover:bg-green-500 hover:text-white"
                  >
                    <Users className="w-4 h-4 mr-2" />
                    {t("dashboard.inviteFriends")}
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Demo Credentials Card */}
          <Card className="mt-8 bg-gradient-to-r from-yellow-900/80 to-orange-900/80 border-yellow-500/20 backdrop-blur-xl">
            <CardContent className="p-6">
              <div className="text-center">
                <h3 className="font-bold text-yellow-400 mb-4">
                  {t("dashboard.demoCredentialsTitle")}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-yellow-500/10 p-4 rounded-lg border border-yellow-500/20">
                    <h4 className="font-semibold text-yellow-300 mb-2">
                      {t("dashboard.quickDemoAccount")}
                    </h4>
                    <div className="space-y-1 text-sm text-yellow-200">
                      <div>
                        <strong>{t("dashboard.email")}</strong> demo@quiz2play.com
                      </div>
                      <div>
                        <strong>{t("dashboard.password")}</strong> demo123
                      </div>
                    </div>
                  </div>
                  <div className="bg-orange-500/10 p-4 rounded-lg border border-orange-500/20">
                    <h4 className="font-semibold text-orange-300 mb-2">
                      {t("dashboard.testAccount")}
                    </h4>
                    <div className="space-y-1 text-sm text-orange-200">
                      <div>
                        <strong>{t("dashboard.email")}</strong> test@example.com
                      </div>
                      <div>
                        <strong>{t("dashboard.password")}</strong> test123
                      </div>
                    </div>
                  </div>
                </div>
                <p className="text-yellow-300 text-sm mt-4">
                  {t("dashboard.demoModeInfo")}
                </p>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
