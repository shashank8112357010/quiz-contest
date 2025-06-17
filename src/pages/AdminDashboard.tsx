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
  Users,
  Activity,
  Settings,
  BarChart3,
  TrendingUp,
  UserCheck,
  AlertTriangle,
  Crown,
  Shield,
  Database,
  Monitor,
  Calendar,
  MessageSquare,
  FileText,
  Coins,
  Trophy,
  Target,
  Globe,
  Clock,
  CheckCircle,
  XCircle,
  Eye,
  Edit,
  Trash2,
  Plus,
  Download,
  Upload,
  RefreshCw,
  Bell,
  Mail,
  Phone,
  MapPin,
  Star,
  Heart,
  Zap,
  Award,
  BookOpen,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Wifi,
  WifiOff,
} from "lucide-react";
import { useAuth } from "@/components/providers/AuthProvider";

const AdminDashboard = () => {
  const { user, userData, loading } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");

  // Mock admin data
  const adminStats = {
    totalUsers: 15742,
    activeUsers: 8943,
    totalQuizzes: 1247,
    questionsBank: 25680,
    dailyRevenue: 2847.5,
    monthlyRevenue: 89234.75,
    systemUptime: "99.9%",
    serverLoad: 67,
    pendingReports: 23,
    supportTickets: 156,
  };

  const userGrowthData = [
    { month: "Jan", users: 8500, active: 6200, growth: 12.3 },
    { month: "Feb", users: 9200, active: 6800, growth: 8.2 },
    { month: "Mar", users: 10100, active: 7400, growth: 9.8 },
    { month: "Apr", users: 11200, active: 8100, growth: 10.9 },
    { month: "May", users: 12800, active: 8600, growth: 14.3 },
    { month: "Jun", users: 14300, active: 8943, growth: 11.7 },
  ];

  const recentActivities = [
    {
      id: 1,
      type: "user_signup",
      message: "New user registered: alex.johnson@email.com",
      time: "2 min ago",
      status: "success",
    },
    {
      id: 2,
      type: "quiz_created",
      message: "Quiz 'Advanced Physics' added by moderator",
      time: "15 min ago",
      status: "info",
    },
    {
      id: 3,
      type: "payment",
      message: "Premium subscription purchased - $29.99",
      time: "23 min ago",
      status: "success",
    },
    {
      id: 4,
      type: "report",
      message: "Content reported: Quiz #1247 flagged inappropriate",
      time: "45 min ago",
      status: "warning",
    },
    {
      id: 5,
      type: "system",
      message: "Database backup completed successfully",
      time: "1 hour ago",
      status: "success",
    },
  ];

  const topUsers = [
    {
      id: 1,
      name: "Sarah Chen",
      email: "sarah.chen@email.com",
      score: 98750,
      quizzes: 342,
      level: 45,
      status: "premium",
    },
    {
      id: 2,
      name: "Mike Rodriguez",
      email: "mike.r@email.com",
      score: 87923,
      quizzes: 298,
      level: 42,
      status: "premium",
    },
    {
      id: 3,
      name: "Emma Wilson",
      email: "emma.w@email.com",
      score: 76234,
      quizzes: 267,
      level: 38,
      status: "free",
    },
    {
      id: 4,
      name: "David Kim",
      email: "david.kim@email.com",
      score: 65847,
      quizzes: 234,
      level: 35,
      status: "premium",
    },
    {
      id: 5,
      name: "Lisa Thompson",
      email: "lisa.t@email.com",
      score: 58932,
      quizzes: 198,
      level: 33,
      status: "free",
    },
  ];

  const systemMetrics = [
    { label: "CPU Usage", value: 45, color: "bg-green-500", status: "good" },
    {
      label: "Memory Usage",
      value: 67,
      color: "bg-yellow-500",
      status: "moderate",
    },
    { label: "Disk Usage", value: 23, color: "bg-green-500", status: "good" },
    {
      label: "Network Load",
      value: 78,
      color: "bg-orange-500",
      status: "high",
    },
  ];

  const contentStats = [
    { category: "Science", questions: 4520, quizzes: 156, difficulty: "Mixed" },
    { category: "History", questions: 3890, quizzes: 134, difficulty: "Mixed" },
    {
      category: "Mathematics",
      questions: 4200,
      quizzes: 148,
      difficulty: "Mixed",
    },
    {
      category: "Literature",
      questions: 2340,
      quizzes: 89,
      difficulty: "Mixed",
    },
    {
      category: "Geography",
      questions: 3120,
      quizzes: 112,
      difficulty: "Mixed",
    },
    { category: "Sports", questions: 1850, quizzes: 67, difficulty: "Mixed" },
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
                Loading Admin Dashboard...
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
                <Shield className="w-8 h-8 text-red-400" />
                <h1 className="text-4xl font-bold bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
                  Admin Access Required
                </h1>
              </div>
              <p className="text-gray-300 text-lg">
                Administrator authentication required to access admin dashboard
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
          {/* Admin Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <Shield className="w-8 h-8 text-red-400" />
              <h1 className="text-4xl font-bold bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
                Admin Dashboard
              </h1>
              <Badge className="bg-red-500 text-white">Administrator</Badge>
            </div>
            <p className="text-gray-300 text-lg">
              System management and analytics overview
            </p>
          </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="bg-gradient-to-r from-blue-600/20 to-cyan-600/20 border-blue-500/20 backdrop-blur-xl">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-400">Total Users</p>
                    <p className="text-2xl font-bold text-white">
                      {adminStats.totalUsers.toLocaleString()}
                    </p>
                  </div>
                  <Users className="w-8 h-8 text-blue-400" />
                </div>
                <div className="mt-2">
                  <Badge className="bg-blue-500 text-white text-xs">
                    +{adminStats.activeUsers.toLocaleString()} active
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-green-600/20 to-emerald-600/20 border-green-500/20 backdrop-blur-xl">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-400">Revenue (Monthly)</p>
                    <p className="text-2xl font-bold text-white">
                      ${adminStats.monthlyRevenue.toLocaleString()}
                    </p>
                  </div>
                  <Coins className="w-8 h-8 text-green-400" />
                </div>
                <div className="mt-2">
                  <Badge className="bg-green-500 text-white text-xs">
                    +12.3% vs last month
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 border-purple-500/20 backdrop-blur-xl">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-400">System Uptime</p>
                    <p className="text-2xl font-bold text-white">
                      {adminStats.systemUptime}
                    </p>
                  </div>
                  <Monitor className="w-8 h-8 text-purple-400" />
                </div>
                <div className="mt-2">
                  <Badge className="bg-purple-500 text-white text-xs">
                    Excellent performance
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-orange-600/20 to-red-600/20 border-orange-500/20 backdrop-blur-xl">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-400">Pending Tasks</p>
                    <p className="text-2xl font-bold text-white">
                      {adminStats.pendingReports + adminStats.supportTickets}
                    </p>
                  </div>
                  <AlertTriangle className="w-8 h-8 text-orange-400" />
                </div>
                <div className="mt-2">
                  <Badge className="bg-orange-500 text-white text-xs">
                    Requires attention
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Dashboard Tabs */}
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="space-y-6"
          >
            <TabsList className="grid w-full grid-cols-6 bg-slate-900/80 border-slate-700">
              <TabsTrigger
                value="overview"
                className="text-white data-[state=active]:bg-purple-600"
              >
                Overview
              </TabsTrigger>
              <TabsTrigger
                value="users"
                className="text-white data-[state=active]:bg-blue-600"
              >
                Users
              </TabsTrigger>
              <TabsTrigger
                value="content"
                className="text-white data-[state=active]:bg-green-600"
              >
                Content
              </TabsTrigger>
              <TabsTrigger
                value="analytics"
                className="text-white data-[state=active]:bg-orange-600"
              >
                Analytics
              </TabsTrigger>
              <TabsTrigger
                value="system"
                className="text-white data-[state=active]:bg-red-600"
              >
                System
              </TabsTrigger>
              <TabsTrigger
                value="reports"
                className="text-white data-[state=active]:bg-pink-600"
              >
                Reports
              </TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* User Growth Chart */}
                <div className="lg:col-span-2">
                  <Card className="bg-slate-900/80 border-slate-700 backdrop-blur-xl">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-white">
                        <TrendingUp className="w-6 h-6 text-blue-400" />
                        User Growth Trend
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {userGrowthData.map((month, index) => (
                          <div key={index} className="flex items-center gap-4">
                            <div className="w-12 text-white font-semibold">
                              {month.month}
                            </div>
                            <div className="flex-1">
                              <div className="flex justify-between text-sm text-gray-400 mb-1">
                                <span>
                                  {month.users.toLocaleString()} total
                                </span>
                                <span>
                                  {month.active.toLocaleString()} active
                                </span>
                                <span className="text-green-400">
                                  +{month.growth}%
                                </span>
                              </div>
                              <Progress
                                value={(month.active / month.users) * 100}
                                className="h-3"
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Recent Activities */}
                <Card className="bg-slate-900/80 border-slate-700 backdrop-blur-xl">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-white">
                      <Activity className="w-6 h-6 text-green-400" />
                      Recent Activities
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {recentActivities.map((activity) => (
                        <div
                          key={activity.id}
                          className="flex items-start gap-3 p-3 bg-slate-800/50 rounded-lg"
                        >
                          <div
                            className={`w-2 h-2 rounded-full mt-2 ${
                              activity.status === "success"
                                ? "bg-green-400"
                                : activity.status === "warning"
                                  ? "bg-yellow-400"
                                  : activity.status === "error"
                                    ? "bg-red-400"
                                    : "bg-blue-400"
                            }`}
                          />
                          <div className="flex-1">
                            <p className="text-sm text-white">
                              {activity.message}
                            </p>
                            <p className="text-xs text-gray-400">
                              {activity.time}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Users Tab */}
            <TabsContent value="users" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <Card className="bg-slate-900/80 border-slate-700 backdrop-blur-xl">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="flex items-center gap-2 text-white">
                          <Users className="w-6 h-6 text-blue-400" />
                          Top Users
                        </CardTitle>
                        <Button
                          size="sm"
                          className="bg-blue-600 hover:bg-blue-700"
                        >
                          <Plus className="w-4 h-4 mr-2" />
                          Add User
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {topUsers.map((user, index) => (
                          <div
                            key={user.id}
                            className="flex items-center gap-4 p-4 bg-slate-800/50 rounded-lg"
                          >
                            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold">
                              #{index + 1}
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-2">
                                <h4 className="font-semibold text-white">
                                  {user.name}
                                </h4>
                                <Badge
                                  className={
                                    user.status === "premium"
                                      ? "bg-yellow-500 text-black"
                                      : "bg-gray-500 text-white"
                                  }
                                >
                                  {user.status}
                                </Badge>
                              </div>
                              <p className="text-sm text-gray-400">
                                {user.email}
                              </p>
                              <div className="flex gap-4 mt-1 text-xs text-gray-500">
                                <span>Level {user.level}</span>
                                <span>{user.quizzes} quizzes</span>
                                <span>{user.score.toLocaleString()} pts</span>
                              </div>
                            </div>
                            <div className="flex gap-2">
                              <Button size="sm" variant="outline">
                                <Eye className="w-4 h-4" />
                              </Button>
                              <Button size="sm" variant="outline">
                                <Edit className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* User Stats */}
                <Card className="bg-slate-900/80 border-slate-700 backdrop-blur-xl">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-white">
                      <BarChart3 className="w-6 h-6 text-purple-400" />
                      User Statistics
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="text-center p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
                      <div className="text-2xl font-bold text-blue-400">
                        {adminStats.totalUsers.toLocaleString()}
                      </div>
                      <div className="text-sm text-blue-300">
                        Total Registered
                      </div>
                    </div>
                    <div className="text-center p-4 bg-green-500/10 rounded-lg border border-green-500/20">
                      <div className="text-2xl font-bold text-green-400">
                        {adminStats.activeUsers.toLocaleString()}
                      </div>
                      <div className="text-sm text-green-300">
                        Active This Month
                      </div>
                    </div>
                    <div className="text-center p-4 bg-yellow-500/10 rounded-lg border border-yellow-500/20">
                      <div className="text-2xl font-bold text-yellow-400">
                        2,847
                      </div>
                      <div className="text-sm text-yellow-300">
                        Premium Users
                      </div>
                    </div>
                    <div className="text-center p-4 bg-purple-500/10 rounded-lg border border-purple-500/20">
                      <div className="text-2xl font-bold text-purple-400">
                        97.3%
                      </div>
                      <div className="text-sm text-purple-300">
                        User Satisfaction
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Content Tab */}
            <TabsContent value="content" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="bg-slate-900/80 border-slate-700 backdrop-blur-xl">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center gap-2 text-white">
                        <BookOpen className="w-6 h-6 text-green-400" />
                        Content Statistics
                      </CardTitle>
                      <Button
                        size="sm"
                        className="bg-green-600 hover:bg-green-700"
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Add Content
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {contentStats.map((content, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg"
                        >
                          <div>
                            <h4 className="font-semibold text-white">
                              {content.category}
                            </h4>
                            <div className="flex gap-4 text-sm text-gray-400">
                              <span>
                                {content.questions.toLocaleString()} questions
                              </span>
                              <span>{content.quizzes} quizzes</span>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Badge variant="outline" className="text-gray-400">
                              {content.difficulty}
                            </Badge>
                            <Button size="sm" variant="outline">
                              <Edit className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-slate-900/80 border-slate-700 backdrop-blur-xl">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-white">
                      <Database className="w-6 h-6 text-blue-400" />
                      Quick Actions
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
                      <Upload className="w-4 h-4 mr-2" />
                      Bulk Upload Questions
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full border-green-500 text-green-400 hover:bg-green-500 hover:text-white"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Export Content Database
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full border-yellow-500 text-yellow-400 hover:bg-yellow-500 hover:text-white"
                    >
                      <RefreshCw className="w-4 h-4 mr-2" />
                      Refresh Content Cache
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full border-red-500 text-red-400 hover:bg-red-500 hover:text-white"
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Clean Unused Content
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* System Tab */}
            <TabsContent value="system" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="bg-slate-900/80 border-slate-700 backdrop-blur-xl">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-white">
                      <Monitor className="w-6 h-6 text-red-400" />
                      System Metrics
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {systemMetrics.map((metric, index) => (
                        <div key={index} className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-white">{metric.label}</span>
                            <span className="text-gray-400">
                              {metric.value}%
                            </span>
                          </div>
                          <Progress value={metric.value} className="h-2" />
                          <div className="text-xs text-gray-500 capitalize">
                            Status: {metric.status}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-slate-900/80 border-slate-700 backdrop-blur-xl">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-white">
                      <Settings className="w-6 h-6 text-gray-400" />
                      System Controls
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white">
                      <Database className="w-4 h-4 mr-2" />
                      Backup Database
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full border-blue-500 text-blue-400 hover:bg-blue-500 hover:text-white"
                    >
                      <RefreshCw className="w-4 h-4 mr-2" />
                      Restart Services
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full border-yellow-500 text-yellow-400 hover:bg-yellow-500 hover:text-white"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Export Logs
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full border-purple-500 text-purple-400 hover:bg-purple-500 hover:text-white"
                    >
                      <Bell className="w-4 h-4 mr-2" />
                      Send System Alert
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Analytics Tab */}
            <TabsContent value="analytics" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="lg:col-span-2 bg-slate-900/80 border-slate-700 backdrop-blur-xl">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-white">
                      <BarChart3 className="w-6 h-6 text-blue-400" />
                      Revenue Analytics
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="text-center p-4 bg-green-500/10 rounded-lg border border-green-500/20">
                        <div className="text-2xl font-bold text-green-400">
                          ${adminStats.dailyRevenue.toLocaleString()}
                        </div>
                        <div className="text-sm text-green-300">
                          Daily Revenue
                        </div>
                      </div>
                      <div className="text-center p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
                        <div className="text-2xl font-bold text-blue-400">
                          ${adminStats.monthlyRevenue.toLocaleString()}
                        </div>
                        <div className="text-sm text-blue-300">
                          Monthly Revenue
                        </div>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">
                          Premium Subscriptions
                        </span>
                        <span className="text-white">68%</span>
                      </div>
                      <Progress value={68} className="h-2" />
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Coin Purchases</span>
                        <span className="text-white">23%</span>
                      </div>
                      <Progress value={23} className="h-2" />
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Power-up Sales</span>
                        <span className="text-white">9%</span>
                      </div>
                      <Progress value={9} className="h-2" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-slate-900/80 border-slate-700 backdrop-blur-xl">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-white">
                      <Trophy className="w-6 h-6 text-yellow-400" />
                      Performance Metrics
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="text-center p-3 bg-yellow-500/10 rounded-lg border border-yellow-500/20">
                      <div className="text-lg font-bold text-yellow-400">
                        87.3%
                      </div>
                      <div className="text-xs text-yellow-300">
                        Avg Quiz Completion
                      </div>
                    </div>
                    <div className="text-center p-3 bg-green-500/10 rounded-lg border border-green-500/20">
                      <div className="text-lg font-bold text-green-400">
                        4.7★
                      </div>
                      <div className="text-xs text-green-300">User Rating</div>
                    </div>
                    <div className="text-center p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
                      <div className="text-lg font-bold text-blue-400">
                        12.4 min
                      </div>
                      <div className="text-xs text-blue-300">
                        Avg Session Time
                      </div>
                    </div>
                    <div className="text-center p-3 bg-purple-500/10 rounded-lg border border-purple-500/20">
                      <div className="text-lg font-bold text-purple-400">
                        73%
                      </div>
                      <div className="text-xs text-purple-300">Return Rate</div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Reports Tab */}
            <TabsContent value="reports" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="bg-slate-900/80 border-slate-700 backdrop-blur-xl">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-white">
                      <AlertTriangle className="w-6 h-6 text-orange-400" />
                      Pending Reports ({adminStats.pendingReports})
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {[
                        {
                          id: 1,
                          type: "Content",
                          issue: "Inappropriate question reported",
                          priority: "high",
                        },
                        {
                          id: 2,
                          type: "User",
                          issue: "Suspected cheating behavior",
                          priority: "medium",
                        },
                        {
                          id: 3,
                          type: "Technical",
                          issue: "Quiz loading error",
                          priority: "low",
                        },
                        {
                          id: 4,
                          type: "Content",
                          issue: "Duplicate questions found",
                          priority: "medium",
                        },
                      ].map((report) => (
                        <div
                          key={report.id}
                          className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg"
                        >
                          <div>
                            <h4 className="font-semibold text-white">
                              {report.type} Report
                            </h4>
                            <p className="text-sm text-gray-400">
                              {report.issue}
                            </p>
                          </div>
                          <div className="flex gap-2">
                            <Badge
                              className={
                                report.priority === "high"
                                  ? "bg-red-500"
                                  : report.priority === "medium"
                                    ? "bg-yellow-500"
                                    : "bg-green-500"
                              }
                            >
                              {report.priority}
                            </Badge>
                            <Button size="sm" variant="outline">
                              Review
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-slate-900/80 border-slate-700 backdrop-blur-xl">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-white">
                      <FileText className="w-6 h-6 text-blue-400" />
                      Generate Reports
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
                      <Download className="w-4 h-4 mr-2" />
                      User Activity Report
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full border-green-500 text-green-400 hover:bg-green-500 hover:text-white"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Financial Report
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full border-yellow-500 text-yellow-400 hover:bg-yellow-500 hover:text-white"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Content Performance
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full border-purple-500 text-purple-400 hover:bg-purple-500 hover:text-white"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      System Health Report
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>

          {/* Admin Tools Quick Access */}
          <Card className="mt-8 bg-gradient-to-r from-red-900/80 to-orange-900/80 border-red-500/20 backdrop-blur-xl">
            <CardContent className="p-6">
              <div className="text-center">
                <h3 className="font-bold text-red-400 mb-4 flex items-center justify-center gap-2">
                  <Crown className="w-5 h-5" />
                  Administrator Quick Tools
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Button className="bg-red-600 hover:bg-red-700 text-white">
                    <Shield className="w-4 h-4 mr-2" />
                    Security Center
                  </Button>
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                    <Database className="w-4 h-4 mr-2" />
                    Database Manager
                  </Button>
                  <Button className="bg-green-600 hover:bg-green-700 text-white">
                    <Users className="w-4 h-4 mr-2" />
                    User Manager
                  </Button>
                  <Button className="bg-purple-600 hover:bg-purple-700 text-white">
                    <Settings className="w-4 h-4 mr-2" />
                    System Settings
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
