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
} from "lucide-react";
import { useAuth } from "@/components/providers/AuthProvider";

const Dashboard = () => {
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

  const recentActivity = [
    {
      id: 1,
      action: "Completed Science Quiz",
      score: "18/20",
      time: "2 min ago",
      points: 180,
      type: "quiz",
    },
    {
      id: 2,
      action: "Achievement Unlocked",
      description: "Speed Demon",
      time: "15 min ago",
      points: 500,
      type: "achievement",
    },
    {
      id: 3,
      action: "Daily Login Bonus",
      description: "Day 5 Streak",
      time: "2 hours ago",
      points: 50,
      type: "bonus",
    },
    {
      id: 4,
      action: "Leveled Up",
      description: "Reached Level 23",
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
      title: "Contest Starting Soon",
      message: "Science Championship begins in 2 hours",
      time: "1h ago",
      type: "info",
    },
    {
      id: 2,
      title: "New Achievement Available",
      message: "Complete 5 more quizzes to unlock 'Quiz Master'",
      time: "3h ago",
      type: "achievement",
    },
    {
      id: 3,
      title: "Friend Request",
      message: "AlexQuizzer wants to connect",
      time: "5h ago",
      type: "social",
    },
  ];

  const upcomingEvents = [
    {
      id: 1,
      title: "Weekly Tournament",
      date: "Tomorrow 6:00 PM",
      participants: 1247,
      prize: "5,000 Coins",
    },
    {
      id: 2,
      title: "History Challenge",
      date: "Dec 25, 8:00 PM",
      participants: 892,
      prize: "Premium Badge",
    },
    {
      id: 3,
      title: "Speed Quiz Marathon",
      date: "Dec 30, 3:00 PM",
      participants: 2156,
      prize: "10,000 Coins",
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
                Loading Dashboard...
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
          <div className="container mx-auto px-4 py-16 text-center">
            <Card className="max-w-md mx-auto bg-slate-900/80 border-slate-700 backdrop-blur-xl">
              <CardContent className="p-8">
                <User className="w-16 h-16 text-purple-400 mx-auto mb-4" />
                <h1 className="text-2xl font-bold text-white mb-4">
                  Dashboard Access Required
                </h1>
                <p className="text-gray-300 mb-6">
                  Please sign in to access your personalized dashboard.
                </p>
                <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/20 mb-6">
                  <h3 className="font-bold text-blue-400 mb-2">
                    Demo Credentials:
                  </h3>
                  <div className="space-y-2 text-sm text-blue-200">
                    <div>
                      <strong>Email:</strong> demo@quiz2play.com
                    </div>
                    <div>
                      <strong>Password:</strong> demo123
                    </div>
                    <div className="text-xs text-blue-300 mt-2">
                      Or create any account with any email in demo mode!
                    </div>
                  </div>
                </div>
                <Button
                  onClick={() => (window.location.href = "/")}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                >
                  Go to Sign In
                </Button>
              </CardContent>
            </Card>
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
                User Dashboard
              </h1>
            </div>
            <p className="text-gray-300 text-lg">
              Welcome back, {userData.displayName}! Here's your learning
              overview.
            </p>
          </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 border-blue-500/20 backdrop-blur-xl">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-400">Total Quizzes</p>
                    <p className="text-2xl font-bold text-white">
                      {dashboardStats.totalQuizzes}
                    </p>
                  </div>
                  <BookOpen className="w-8 h-8 text-blue-400" />
                </div>
                <div className="mt-2">
                  <Badge className="bg-blue-500 text-white text-xs">
                    +12 this week
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-green-600/20 to-emerald-600/20 border-green-500/20 backdrop-blur-xl">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-400">Accuracy Rate</p>
                    <p className="text-2xl font-bold text-white">
                      {dashboardStats.accuracy}%
                    </p>
                  </div>
                  <Target className="w-8 h-8 text-green-400" />
                </div>
                <div className="mt-2">
                  <Badge className="bg-green-500 text-white text-xs">
                    +2.3% improvement
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-orange-600/20 to-red-600/20 border-orange-500/20 backdrop-blur-xl">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-400">Current Streak</p>
                    <p className="text-2xl font-bold text-white">
                      {dashboardStats.streak} days
                    </p>
                  </div>
                  <Calendar className="w-8 h-8 text-orange-400" />
                </div>
                <div className="mt-2">
                  <Badge className="bg-orange-500 text-white text-xs">
                    Personal best!
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 border-purple-500/20 backdrop-blur-xl">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-400">Global Rank</p>
                    <p className="text-2xl font-bold text-white">
                      #{dashboardStats.rank}
                    </p>
                  </div>
                  <Trophy className="w-8 h-8 text-purple-400" />
                </div>
                <div className="mt-2">
                  <Badge className="bg-purple-500 text-white text-xs">
                    Top 15%
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Dashboard Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Weekly Performance Chart */}
              <Card className="bg-slate-900/80 border-slate-700 backdrop-blur-xl">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-white">
                    <BarChart3 className="w-6 h-6 text-blue-400" />
                    Weekly Performance
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
                            <span>{day.score}% avg</span>
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

              {/* Recent Activity */}
              <Card className="bg-slate-900/80 border-slate-700 backdrop-blur-xl">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-white">
                    <Activity className="w-6 h-6 text-green-400" />
                    Recent Activity
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
                          <div className="text-xs text-gray-400">points</div>
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
                        <div className="text-xs text-gray-400">Lives</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold text-purple-400">
                          {userData.totalStars}
                        </div>
                        <div className="text-xs text-gray-400">Stars</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Notifications */}
              <Card className="bg-slate-900/80 border-slate-700 backdrop-blur-xl">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-white">
                    <Bell className="w-5 h-5 text-yellow-400" />
                    Notifications
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

              {/* Upcoming Events */}
              <Card className="bg-slate-900/80 border-slate-700 backdrop-blur-xl">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-white">
                    <Calendar className="w-5 h-5 text-blue-400" />
                    Upcoming Events
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
                            {event.participants} participants
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

              {/* Quick Actions */}
              <Card className="bg-slate-900/80 border-slate-700 backdrop-blur-xl">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-white">
                    <Zap className="w-5 h-5 text-purple-400" />
                    Quick Actions
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
                    <Play className="w-4 h-4 mr-2" />
                    Start New Quiz
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full border-purple-500 text-purple-400 hover:bg-purple-500 hover:text-white"
                  >
                    <Trophy className="w-4 h-4 mr-2" />
                    View Achievements
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full border-green-500 text-green-400 hover:bg-green-500 hover:text-white"
                  >
                    <Users className="w-4 h-4 mr-2" />
                    Friend Leaderboard
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
                  🔑 Demo Credentials for Testing
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-yellow-500/10 p-4 rounded-lg border border-yellow-500/20">
                    <h4 className="font-semibold text-yellow-300 mb-2">
                      Quick Demo Account
                    </h4>
                    <div className="space-y-1 text-sm text-yellow-200">
                      <div>
                        <strong>Email:</strong> demo@quiz2play.com
                      </div>
                      <div>
                        <strong>Password:</strong> demo123
                      </div>
                    </div>
                  </div>
                  <div className="bg-orange-500/10 p-4 rounded-lg border border-orange-500/20">
                    <h4 className="font-semibold text-orange-300 mb-2">
                      Test Account
                    </h4>
                    <div className="space-y-1 text-sm text-orange-200">
                      <div>
                        <strong>Email:</strong> test@example.com
                      </div>
                      <div>
                        <strong>Password:</strong> test123
                      </div>
                    </div>
                  </div>
                </div>
                <p className="text-yellow-300 text-sm mt-4">
                  💡 <strong>Demo Mode:</strong> You can also create any account
                  with any email address!
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
