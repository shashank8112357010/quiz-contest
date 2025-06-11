import React, { useState } from "react";
import { AnimatedBackground } from "@/components/ui/animated-background";
import { Header } from "@/components/ui/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  User,
  Trophy,
  Star,
  Coins,
  Heart,
  Target,
  TrendingUp,
  Calendar,
  Clock,
  Award,
  Zap,
  BookOpen,
  Brain,
  Activity,
  BarChart3,
  Settings,
  Camera,
  Edit,
  Share,
  Download,
  Crown,
  Flame,
  ChevronRight,
  PlayCircle,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { useAuth } from "@/components/providers/AuthProvider";
import { ProfileCompletion } from "@/components/ui/profile-completion";

const Profile = () => {
  const { userData } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");

  // Mock data for demonstration
  const activityData = [
    {
      id: 1,
      type: "quiz_completed",
      title: "Completed Science Quiz",
      description: "Scored 85% in Advanced Physics",
      time: "2 hours ago",
      icon: <BookOpen className="w-4 h-4" />,
      points: 150,
      color: "text-blue-400",
    },
    {
      id: 2,
      type: "achievement",
      title: "Achievement Unlocked",
      description: "Knowledge Seeker - 100 correct answers",
      time: "5 hours ago",
      icon: <Trophy className="w-4 h-4" />,
      points: 200,
      color: "text-yellow-400",
    },
    {
      id: 3,
      type: "streak",
      title: "Login Streak",
      description: "5 days in a row!",
      time: "1 day ago",
      icon: <Flame className="w-4 h-4" />,
      points: 50,
      color: "text-orange-400",
    },
    {
      id: 4,
      type: "level_up",
      title: "Level Up!",
      description: "Reached Level 15",
      time: "2 days ago",
      icon: <Star className="w-4 h-4" />,
      points: 300,
      color: "text-purple-400",
    },
    {
      id: 5,
      type: "quiz_completed",
      title: "Completed History Quiz",
      description: "Perfect score in World War II",
      time: "3 days ago",
      icon: <BookOpen className="w-4 h-4" />,
      points: 200,
      color: "text-green-400",
    },
  ];

  const recentQuizzes = [
    {
      category: "Science",
      topic: "Physics",
      score: 85,
      questions: 20,
      correct: 17,
      time: "12:34",
      date: "Today",
      status: "completed",
    },
    {
      category: "History",
      topic: "World War II",
      score: 100,
      questions: 15,
      correct: 15,
      time: "08:22",
      date: "Yesterday",
      status: "perfect",
    },
    {
      category: "Geography",
      topic: "Asian Countries",
      score: 73,
      questions: 25,
      correct: 18,
      time: "15:45",
      date: "2 days ago",
      status: "completed",
    },
    {
      category: "Sports",
      topic: "Football",
      score: 60,
      questions: 10,
      correct: 6,
      time: "09:15",
      date: "3 days ago",
      status: "failed",
    },
  ];

  const achievements = [
    {
      id: 1,
      title: "First Steps",
      description: "Complete your first quiz",
      icon: <PlayCircle className="w-6 h-6" />,
      unlocked: true,
      rarity: "common",
      date: "5 days ago",
    },
    {
      id: 2,
      title: "Knowledge Seeker",
      description: "Answer 100 questions correctly",
      icon: <BookOpen className="w-6 h-6" />,
      unlocked: true,
      rarity: "rare",
      date: "5 hours ago",
    },
    {
      id: 3,
      title: "Perfect Score",
      description: "Get 100% in any quiz",
      icon: <Star className="w-6 h-6" />,
      unlocked: true,
      rarity: "epic",
      date: "Yesterday",
    },
    {
      id: 4,
      title: "Speed Demon",
      description: "Complete a quiz in under 5 minutes",
      icon: <Zap className="w-6 h-6" />,
      unlocked: false,
      rarity: "legendary",
      date: null,
    },
    {
      id: 5,
      title: "Quiz Master",
      description: "Reach level 50",
      icon: <Crown className="w-6 h-6" />,
      unlocked: false,
      rarity: "legendary",
      date: null,
    },
  ];

  const weeklyStats = [
    { day: "Mon", quizzes: 3, score: 85 },
    { day: "Tue", quizzes: 5, score: 92 },
    { day: "Wed", quizzes: 2, score: 78 },
    { day: "Thu", quizzes: 4, score: 88 },
    { day: "Fri", quizzes: 6, score: 95 },
    { day: "Sat", quizzes: 3, score: 82 },
    { day: "Sun", quizzes: 4, score: 90 },
  ];

  const categoryProgress = [
    { name: "Science", progress: 85, level: 12, color: "bg-blue-500" },
    { name: "History", progress: 92, level: 15, color: "bg-green-500" },
    { name: "Geography", progress: 67, level: 8, color: "bg-yellow-500" },
    { name: "Sports", progress: 54, level: 6, color: "bg-red-500" },
    { name: "Literature", progress: 73, level: 9, color: "bg-purple-500" },
  ];

  const recommendations = [
    {
      type: "weak_category",
      title: "Improve Sports Knowledge",
      description: "You scored 60% in Sports. Try practicing more!",
      action: "Take Sports Quiz",
      icon: <Target className="w-5 h-5 text-red-400" />,
    },
    {
      type: "streak_opportunity",
      title: "Maintain Your Streak",
      description: "You're on a 5-day streak! Don't break it.",
      action: "Play Today",
      icon: <Flame className="w-5 h-5 text-orange-400" />,
    },
    {
      type: "new_category",
      title: "Try Mathematics",
      description: "Unlock a new category with your progress!",
      action: "Explore Math",
      icon: <Brain className="w-5 h-5 text-blue-400" />,
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

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-green-400";
    if (score >= 70) return "text-yellow-400";
    return "text-red-400";
  };

  if (!userData) {
    return (
      <div className="min-h-screen relative overflow-hidden">
        <AnimatedBackground />
        <div className="relative z-40">
          <Header />
          <div className="container mx-auto px-4 py-16 text-center">
            <h1 className="text-4xl font-bold text-white mb-4">
              Please sign in to view your profile
            </h1>
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
          {/* Profile Header */}
          <Card className="bg-gradient-to-r from-slate-900/90 to-purple-900/90 border-purple-500/20 backdrop-blur-xl mb-8">
            <CardContent className="p-8">
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="relative">
                  <Avatar className="w-24 h-24">
                    <AvatarFallback className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-2xl font-bold">
                      {userData.displayName?.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <Button
                    size="icon"
                    className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-purple-600 hover:bg-purple-700"
                  >
                    <Camera className="w-4 h-4" />
                  </Button>
                </div>

                <div className="flex-1 text-center md:text-left">
                  <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
                    <h1 className="text-3xl font-bold text-white">
                      {userData.displayName}
                    </h1>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="text-gray-400 hover:text-white"
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                  </div>
                  <p className="text-gray-300 mb-4">{userData.email}</p>

                  <div className="flex flex-wrap justify-center md:justify-start gap-4 mb-4">
                    <div className="flex items-center gap-2 bg-yellow-500/20 px-3 py-1 rounded-full">
                      <Coins className="w-4 h-4 text-yellow-400" />
                      <span className="text-white font-bold">
                        {userData.coins}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 bg-red-500/20 px-3 py-1 rounded-full">
                      <Heart className="w-4 h-4 text-red-400" />
                      <span className="text-white font-bold">
                        {userData.lives}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 bg-purple-500/20 px-3 py-1 rounded-full">
                      <Star className="w-4 h-4 text-purple-400" />
                      <span className="text-white font-bold">
                        {userData.totalStars}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 bg-blue-500/20 px-3 py-1 rounded-full">
                      <Trophy className="w-4 h-4 text-blue-400" />
                      <span className="text-white font-bold">
                        Level {userData.currentLevel}
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white">
                      <Share className="w-4 h-4 mr-2" />
                      Share Profile
                    </Button>
                    <Button
                      variant="outline"
                      className="border-purple-500 text-purple-400 hover:bg-purple-500 hover:text-white"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Export Data
                    </Button>
                  </div>
                </div>

                <div className="text-center">
                  <div className="text-2xl font-bold text-white mb-1">
                    #{userData.currentLevel * 10 + 47}
                  </div>
                  <div className="text-sm text-gray-400">Global Rank</div>
                  <Badge className="mt-2 bg-gradient-to-r from-yellow-500 to-orange-500 text-white">
                    Top 5%
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Smart Recommendations */}
          <Card className="bg-slate-900/80 border-slate-700 backdrop-blur-xl mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <Brain className="w-6 h-6 text-purple-400" />
                Smart Recommendations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {recommendations.map((rec, index) => (
                  <div
                    key={index}
                    className="p-4 bg-slate-800/50 rounded-lg border border-slate-600 hover:border-purple-500/50 transition-all duration-300"
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0">{rec.icon}</div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-white mb-1">
                          {rec.title}
                        </h4>
                        <p className="text-sm text-gray-300 mb-3">
                          {rec.description}
                        </p>
                        <Button
                          size="sm"
                          className="bg-purple-600 hover:bg-purple-700 text-white"
                        >
                          {rec.action}
                          <ChevronRight className="w-3 h-3 ml-1" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Main Dashboard Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-4 mb-8 bg-slate-800/50">
              <TabsTrigger
                value="overview"
                className="data-[state=active]:bg-purple-600 data-[state=active]:text-white"
              >
                📊 Overview
              </TabsTrigger>
              <TabsTrigger
                value="activity"
                className="data-[state=active]:bg-blue-600 data-[state=active]:text-white"
              >
                📈 Activity
              </TabsTrigger>
              <TabsTrigger
                value="achievements"
                className="data-[state=active]:bg-yellow-600 data-[state=active]:text-white"
              >
                🏆 Achievements
              </TabsTrigger>
              <TabsTrigger
                value="analytics"
                className="data-[state=active]:bg-green-600 data-[state=active]:text-white"
              >
                📋 Analytics
              </TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                  {/* Recent Activity */}
                  <Card className="bg-slate-900/80 border-slate-700 backdrop-blur-xl">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-white">
                        <Activity className="w-6 h-6 text-blue-400" />
                        Recent Activity
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {activityData.slice(0, 5).map((activity) => (
                          <div
                            key={activity.id}
                            className="flex items-center gap-4 p-3 bg-slate-800/50 rounded-lg"
                          >
                            <div className={`flex-shrink-0 ${activity.color}`}>
                              {activity.icon}
                            </div>
                            <div className="flex-1">
                              <h4 className="font-semibold text-white">
                                {activity.title}
                              </h4>
                              <p className="text-sm text-gray-300">
                                {activity.description}
                              </p>
                              <p className="text-xs text-gray-400">
                                {activity.time}
                              </p>
                            </div>
                            <div className="text-right">
                              <div className="text-yellow-400 font-bold">
                                +{activity.points}
                              </div>
                              <div className="text-xs text-gray-400">
                                points
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Category Progress */}
                  <Card className="bg-slate-900/80 border-slate-700 backdrop-blur-xl">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-white">
                        <BarChart3 className="w-6 h-6 text-green-400" />
                        Category Progress
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {categoryProgress.map((category, index) => (
                          <div key={index}>
                            <div className="flex justify-between items-center mb-2">
                              <span className="text-white font-semibold">
                                {category.name}
                              </span>
                              <div className="flex items-center gap-2">
                                <span className="text-sm text-gray-400">
                                  Level {category.level}
                                </span>
                                <span className="text-white font-bold">
                                  {category.progress}%
                                </span>
                              </div>
                            </div>
                            <Progress
                              value={category.progress}
                              className="h-2"
                            />
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="space-y-6">
                  {/* Profile Completion */}
                  <ProfileCompletion />

                  {/* Quick Stats */}
                  <Card className="bg-slate-900/80 border-slate-700 backdrop-blur-xl">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-white">
                        <TrendingUp className="w-6 h-6 text-purple-400" />
                        Quick Stats
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-300">Total Quizzes</span>
                          <span className="font-bold text-white">
                            {userData.totalGamesPlayed || 127}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-300">Correct Answers</span>
                          <span className="font-bold text-green-400">
                            {userData.totalCorrectAnswers || 892}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-300">Accuracy Rate</span>
                          <span className="font-bold text-yellow-400">
                            83.2%
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-300">Current Streak</span>
                          <span className="font-bold text-orange-400">
                            {userData.streak} days
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-300">Time Played</span>
                          <span className="font-bold text-blue-400">
                            45h 32m
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Level Progress */}
                  <Card className="bg-gradient-to-r from-purple-900/80 to-pink-900/80 border-purple-500/20 backdrop-blur-xl">
                    <CardContent className="p-6">
                      <div className="text-center">
                        <Crown className="w-12 h-12 text-yellow-400 mx-auto mb-3" />
                        <h3 className="font-bold text-white mb-2">
                          Level {userData.currentLevel}
                        </h3>
                        <p className="text-purple-200 text-sm mb-4">
                          {2340 - userData.currentLevel * 100} XP to next level
                        </p>
                        <Progress value={67} className="h-3 mb-2" />
                        <div className="text-xs text-purple-300">
                          67% progress to Level {userData.currentLevel + 1}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            {/* Activity Tab */}
            <TabsContent value="activity">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card className="bg-slate-900/80 border-slate-700 backdrop-blur-xl">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-white">
                      <BookOpen className="w-6 h-6 text-blue-400" />
                      Recent Quizzes
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentQuizzes.map((quiz, index) => (
                        <div
                          key={index}
                          className="p-4 bg-slate-800/50 rounded-lg border border-slate-600"
                        >
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <h4 className="font-semibold text-white">
                                {quiz.category}
                              </h4>
                              <p className="text-sm text-gray-300">
                                {quiz.topic}
                              </p>
                            </div>
                            <div className="text-right">
                              <div
                                className={`text-lg font-bold ${getScoreColor(quiz.score)}`}
                              >
                                {quiz.score}%
                              </div>
                              <div className="text-xs text-gray-400">
                                {quiz.date}
                              </div>
                            </div>
                          </div>
                          <div className="flex justify-between items-center">
                            <div className="text-sm text-gray-400">
                              {quiz.correct}/{quiz.questions} correct •{" "}
                              {quiz.time}
                            </div>
                            <div className="flex items-center gap-1">
                              {quiz.status === "perfect" && (
                                <Star className="w-4 h-4 text-yellow-400" />
                              )}
                              {quiz.status === "completed" && (
                                <CheckCircle className="w-4 h-4 text-green-400" />
                              )}
                              {quiz.status === "failed" && (
                                <XCircle className="w-4 h-4 text-red-400" />
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-slate-900/80 border-slate-700 backdrop-blur-xl">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-white">
                      <Calendar className="w-6 h-6 text-green-400" />
                      Weekly Performance
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {weeklyStats.map((day, index) => (
                        <div
                          key={index}
                          className="flex justify-between items-center p-3 bg-slate-800/50 rounded-lg"
                        >
                          <div className="font-semibold text-white">
                            {day.day}
                          </div>
                          <div className="flex items-center gap-4">
                            <div className="text-sm text-gray-400">
                              {day.quizzes} quizzes
                            </div>
                            <div
                              className={`font-bold ${getScoreColor(day.score)}`}
                            >
                              {day.score}%
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Achievements Tab */}
            <TabsContent value="achievements">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {achievements.map((achievement) => (
                  <Card
                    key={achievement.id}
                    className={`${
                      achievement.unlocked
                        ? `bg-gradient-to-r ${getRarityColor(achievement.rarity)}/20 border-slate-600`
                        : "bg-slate-800/50 border-slate-700"
                    } backdrop-blur-xl transition-all duration-300 hover:scale-105`}
                  >
                    <CardContent className="p-6 text-center">
                      <div
                        className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${
                          achievement.unlocked
                            ? `bg-gradient-to-r ${getRarityColor(achievement.rarity)}`
                            : "bg-slate-700"
                        }`}
                      >
                        {achievement.icon}
                      </div>
                      <h3
                        className={`font-bold mb-2 ${
                          achievement.unlocked ? "text-white" : "text-gray-400"
                        }`}
                      >
                        {achievement.title}
                      </h3>
                      <p
                        className={`text-sm mb-3 ${
                          achievement.unlocked
                            ? "text-gray-300"
                            : "text-gray-500"
                        }`}
                      >
                        {achievement.description}
                      </p>
                      <Badge
                        className={`capitalize ${
                          achievement.unlocked
                            ? `bg-gradient-to-r ${getRarityColor(achievement.rarity)} text-white`
                            : "bg-slate-600 text-gray-300"
                        }`}
                      >
                        {achievement.rarity}
                      </Badge>
                      {achievement.unlocked && achievement.date && (
                        <p className="text-xs text-gray-400 mt-2">
                          Unlocked {achievement.date}
                        </p>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Analytics Tab */}
            <TabsContent value="analytics">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card className="bg-slate-900/80 border-slate-700 backdrop-blur-xl">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-white">
                      <BarChart3 className="w-6 h-6 text-purple-400" />
                      Performance Analytics
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div>
                        <h4 className="font-semibold text-white mb-4">
                          Strongest Categories
                        </h4>
                        <div className="space-y-3">
                          <div className="flex justify-between items-center">
                            <span className="text-gray-300">History</span>
                            <span className="text-green-400 font-bold">
                              92% avg
                            </span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-gray-300">Science</span>
                            <span className="text-green-400 font-bold">
                              85% avg
                            </span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-gray-300">Literature</span>
                            <span className="text-yellow-400 font-bold">
                              73% avg
                            </span>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold text-white mb-4">
                          Areas for Improvement
                        </h4>
                        <div className="space-y-3">
                          <div className="flex justify-between items-center">
                            <span className="text-gray-300">Sports</span>
                            <span className="text-red-400 font-bold">
                              54% avg
                            </span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-gray-300">Geography</span>
                            <span className="text-yellow-400 font-bold">
                              67% avg
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-slate-900/80 border-slate-700 backdrop-blur-xl">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-white">
                      <Clock className="w-6 h-6 text-blue-400" />
                      Time & Habits
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div>
                        <h4 className="font-semibold text-white mb-4">
                          Best Playing Times
                        </h4>
                        <div className="space-y-3">
                          <div className="flex justify-between items-center">
                            <span className="text-gray-300">
                              Evening (6-9 PM)
                            </span>
                            <span className="text-green-400 font-bold">
                              89% avg
                            </span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-gray-300">
                              Morning (9-12 PM)
                            </span>
                            <span className="text-yellow-400 font-bold">
                              82% avg
                            </span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-gray-300">
                              Afternoon (1-5 PM)
                            </span>
                            <span className="text-yellow-400 font-bold">
                              76% avg
                            </span>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold text-white mb-4">
                          Quiz Patterns
                        </h4>
                        <div className="space-y-3">
                          <div className="flex justify-between items-center">
                            <span className="text-gray-300">
                              Avg Quiz Length
                            </span>
                            <span className="text-white font-bold">8:32</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-gray-300">Questions/Day</span>
                            <span className="text-white font-bold">47</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-gray-300">Favorite Day</span>
                            <span className="text-white font-bold">Friday</span>
                          </div>
                        </div>
                      </div>
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

export default Profile;
