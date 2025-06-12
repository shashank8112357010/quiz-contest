import React from "react";
import { AnimatedBackground } from "@/components/ui/animated-background";
import { Header } from "@/components/ui/header";
import { DemoLoginHelper } from "@/components/ui/demo-login-helper";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  ArrowRight,
  Users,
  BarChart3,
  Trophy,
  Target,
  Clock,
} from "lucide-react";

const DemoAccess = () => {
  const dashboardFeatures = [
    {
      icon: <BarChart3 className="w-6 h-6 text-blue-400" />,
      title: "Performance Analytics",
      description: "Weekly charts, quiz statistics, and progress tracking",
    },
    {
      icon: <Trophy className="w-6 h-6 text-yellow-400" />,
      title: "Achievement System",
      description: "Unlock badges, track milestones, and view accomplishments",
    },
    {
      icon: <Users className="w-6 h-6 text-green-400" />,
      title: "Social Features",
      description: "Friend leaderboards, notifications, and community stats",
    },
    {
      icon: <Target className="w-6 h-6 text-purple-400" />,
      title: "Smart Recommendations",
      description: "AI-powered suggestions based on your performance",
    },
    {
      icon: <Clock className="w-6 h-6 text-orange-400" />,
      title: "Activity Timeline",
      description: "Real-time feed of your quiz activities and progress",
    },
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      <AnimatedBackground />

      <div className="relative z-40">
        <Header />

        <main className="container mx-auto px-4 py-8">
          {/* Page Header */}
          <div className="text-center mb-12">
            <h1 className="text-6xl font-black bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent mb-4">
              🚀 Profile Demo Access
            </h1>
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
              Instantly access the user profile with pre-configured demo
              accounts. No signup required - just one click!
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Login Helper */}
            <div>
              <DemoLoginHelper />
            </div>

            {/* Dashboard Preview */}
            <div className="space-y-6">
              <Card className="bg-slate-900/80 border-slate-700 backdrop-blur-xl">
                <CardContent className="p-6">
                  <div className="text-center mb-6">
                    <LayoutDashboard className="w-12 h-12 text-purple-400 mx-auto mb-3" />
                    <h2 className="text-2xl font-bold text-white mb-2">
                      What's in the Dashboard?
                    </h2>
                    <p className="text-gray-300">
                      A comprehensive analytics and activity center
                    </p>
                  </div>

                  <div className="space-y-4">
                    {dashboardFeatures.map((feature, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-3 p-3 bg-slate-800/50 rounded-lg"
                      >
                        <div className="flex-shrink-0">{feature.icon}</div>
                        <div>
                          <h4 className="font-semibold text-white mb-1">
                            {feature.title}
                          </h4>
                          <p className="text-sm text-gray-400">
                            {feature.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 text-center">
                    <Button
                      onClick={() => (window.location.href = "/profile")}
                      className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                    >
                      Visit Profile Directly
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Stats Preview */}
              <Card className="bg-gradient-to-r from-purple-900/80 to-pink-900/80 border-purple-500/20 backdrop-blur-xl">
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold text-white mb-4 text-center">
                    📊 Sample Dashboard Data
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-white/10 rounded-lg">
                      <div className="text-2xl font-bold text-yellow-400">
                        342
                      </div>
                      <div className="text-xs text-gray-300">Total Quizzes</div>
                    </div>
                    <div className="text-center p-3 bg-white/10 rounded-lg">
                      <div className="text-2xl font-bold text-green-400">
                        85.3%
                      </div>
                      <div className="text-xs text-gray-300">Accuracy</div>
                    </div>
                    <div className="text-center p-3 bg-white/10 rounded-lg">
                      <div className="text-2xl font-bold text-blue-400">
                        #1,247
                      </div>
                      <div className="text-xs text-gray-300">Global Rank</div>
                    </div>
                    <div className="text-center p-3 bg-white/10 rounded-lg">
                      <div className="text-2xl font-bold text-purple-400">
                        12
                      </div>
                      <div className="text-xs text-gray-300">Day Streak</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* URL Quick Access */}
              <Card className="bg-slate-900/80 border-slate-700 backdrop-blur-xl">
                <CardContent className="p-6">
                  <h3 className="font-bold text-white mb-3 text-center">
                    🔗 Direct Access URLs
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between items-center p-2 bg-slate-800/50 rounded">
                      <span className="text-gray-300">Dashboard:</span>
                      <code className="text-blue-300">/dashboard</code>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-slate-800/50 rounded">
                      <span className="text-gray-300">Profile:</span>
                      <code className="text-blue-300">/profile</code>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-slate-800/50 rounded">
                      <span className="text-gray-300">Demo Access:</span>
                      <code className="text-blue-300">/demo</code>
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

export default DemoAccess;
