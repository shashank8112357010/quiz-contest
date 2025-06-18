import React, { useState, useEffect } from "react";
import { db } from "@/lib/firebase";
import { doc, onSnapshot, setDoc, collection } from "firebase/firestore";
import { AnimatedBackground } from "@/components/ui/animated-background";
import { Header } from "@/components/ui/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
import { AuthDebug } from "@/components/ui/auth-debug";

import { uploadProfileImage, updateUserPhotoURL } from "@/lib/firebaseService";

const Profile = () => {
  const { user, userData, loading } = useAuth();
  const [streak, setStreak] = useState<number | null>(null);
  const [loadingStreak, setLoadingStreak] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");

  // Upload state for profile image
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  useEffect(() => {
    if (!user?.uid) return;
    const ref = doc(db, "users", user.uid);
    setLoadingStreak(true);
    // Listen to real-time streak updates
    const unsub = onSnapshot(ref, (snap) => {
      if (snap.exists() && typeof snap.data().streak === "number") {
        setStreak(snap.data().streak);
      } else {
        // If streak is missing, initialize
        setDoc(ref, { streak: 0 }, { merge: true });
        setStreak(0);
      }
      setLoadingStreak(false);
    });
    return () => unsub();
  }, [user?.uid]);


  // Real-time Firestore data
  const [activityData, setActivityData] = useState<any[]>([]);
  const [recentQuizzes, setRecentQuizzes] = useState<any[]>([]);
  const [achievements, setAchievements] = useState<any[]>([]);
  const [loadingActivity, setLoadingActivity] = useState(true);
  const [loadingQuizzes, setLoadingQuizzes] = useState(true);
  const [loadingAchievements, setLoadingAchievements] = useState(true);
  // Example: weeklyStats, categoryProgress, recommendations can be computed from quizzes or userData
  const [weeklyStats, setWeeklyStats] = useState<any[]>([]);
  const [categoryProgress, setCategoryProgress] = useState<any[]>([]);
  const [recommendations, setRecommendations] = useState<any[]>([]);

  useEffect(() => {
    if (!user?.uid) return;
    // Activities
    const activityRef = collection(db, "users", user.uid, "activities");
    const unsubActivity = onSnapshot(activityRef, (snap) => {
      setActivityData(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      setLoadingActivity(false);
    });
    // Quizzes
    const quizzesRef = collection(db, "users", user.uid, "quizzes");
    const unsubQuizzes = onSnapshot(quizzesRef, (snap) => {
      setRecentQuizzes(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      setLoadingQuizzes(false);
    });
    // Achievements
    const achievementsRef = collection(db, "users", user.uid, "achievements");
    const unsubAchievements = onSnapshot(achievementsRef, (snap) => {
      setAchievements(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      setLoadingAchievements(false);
    });
    // Cleanup
    return () => {
      unsubActivity();
      unsubQuizzes();
      unsubAchievements();
    };
  }, [user?.uid]);

  // weeklyStats can be computed from recentQuizzes, or left as an empty array for now

  // categoryProgress can be computed from recentQuizzes/userData, or left as an empty array for now

  // recommendations can be computed based on userData and quiz stats, or left as an empty array for now

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

  if (loading) {
    return (
      <div className="min-h-screen relative overflow-hidden">
        <AnimatedBackground />
        <div className="relative z-40">
          <Header />
          <div className="container mx-auto px-4 py-16 text-center">
            <div className="animate-pulse">
              <h1 className="text-4xl font-bold text-white mb-4">
                Loading Profile...
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
                  Please Sign In
                </h1>
                <p className="text-gray-300 mb-6">
                  You need to be signed in to view your profile and track your progress.
                </p>
                <Button
                  onClick={() => (window.location.href = "/")}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                >
                  Go to Homepage
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  // Defensive fallback for all fields
  const safePhotoURL = userData?.photoURL || undefined;
  const safeDisplayName = userData?.displayName || "User";
  const safeEmail = userData?.email || "";
  const safeCoins = userData?.coins ?? 0;
  const safeLives = userData?.lives ?? 0;
  const safeTotalStars = userData?.totalStars ?? 0;
  const safeCurrentLevel = userData?.currentLevel ?? 1;
  const safeTotalGamesPlayed = userData?.totalGamesPlayed ?? 0;
  const safeTotalCorrectAnswers = userData?.totalCorrectAnswers ?? 0;

  return (
    <div className="min-h-screen relative overflow-hidden">
      <AnimatedBackground />

      <div className="relative z-40">
        <Header />

        <main className="container mx-auto px-4 py-8">
          {/* Debug Component - Remove this after fixing */}
          {/* <AuthDebug /> */}

          {/* Profile Header */}
          <Card className="bg-gradient-to-r from-slate-900/90 to-purple-900/90 border-purple-500/20 backdrop-blur-xl mb-8 mt-8">
            <CardContent className="p-8">
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="relative">
                  <Avatar className="w-24 h-24">
                    {safePhotoURL ? (
                      <AvatarImage src={safePhotoURL} alt="Profile" />
                    ) : (
                      <AvatarFallback className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-2xl font-bold">
                        {safeDisplayName.slice(0, 2).toUpperCase()}
                      </AvatarFallback>
                    )}
                  </Avatar>
                  <input
                    type="file"
                    accept="image/*"
                    id="profile-image-input"
                    style={{ display: "none" }}
                    onChange={async (e) => {
                      if (!user?.uid || !e.target.files?.[0]) return;
                      setUploading(true);
                      setUploadError("");
                      try {
                        const url = await uploadProfileImage(user.uid, e.target.files[0]);
                        await updateUserPhotoURL(user.uid, url);
                        setUploadSuccess(true);
                        setTimeout(() => setUploadSuccess(false), 2000);
                      } catch (err) {
                        setUploadError("Failed to upload image. Please try again.");
                      } finally {
                        setUploading(false);
                      }
                    }}
                  />
                  <Button
                    size="icon"
                    className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-purple-600 hover:bg-purple-700"
                    onClick={() => document.getElementById("profile-image-input")?.click()}
                    disabled={uploading}
                  >
                    {uploading ? (
                      <span className="loader w-4 h-4" />
                    ) : (
                      <Camera className="w-4 h-4" />
                    )}
                  </Button>
                  {uploadError && (
                    <div className="absolute left-0 right-0 mt-2 text-xs text-red-400 bg-slate-900/90 p-1 rounded shadow">
                      {uploadError}
                    </div>
                  )}
                  {uploadSuccess && (
                    <div className="absolute left-0 right-0 mt-2 text-xs text-green-400 bg-slate-900/90 p-1 rounded shadow">
                      Profile image updated!
                    </div>
                  )}
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
                            {loadingStreak ? "..." : streak !== null ? `${streak} days` : "0 days"}
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
                    className={`${achievement.unlocked
                        ? `bg-gradient-to-r ${getRarityColor(achievement.rarity)}/20 border-slate-600`
                        : "bg-slate-800/50 border-slate-700"
                      } backdrop-blur-xl transition-all duration-300 hover:scale-105`}
                  >
                    <CardContent className="p-6 text-center">
                      <div
                        className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${achievement.unlocked
                            ? `bg-gradient-to-r ${getRarityColor(achievement.rarity)}`
                            : "bg-slate-700"
                          }`}
                      >
                        {achievement.icon}
                      </div>
                      <h3
                        className={`font-bold mb-2 ${achievement.unlocked ? "text-white" : "text-gray-400"
                          }`}
                      >
                        {achievement.title}
                      </h3>
                      <p
                        className={`text-sm mb-3 ${achievement.unlocked
                            ? "text-gray-300"
                            : "text-gray-500"
                          }`}
                      >
                        {achievement.description}
                      </p>
                      <Badge
                        className={`capitalize ${achievement.unlocked
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


          </Tabs>
        </main>
      </div>
    </div>
  );
};

export default Profile;
