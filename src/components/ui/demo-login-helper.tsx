"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  User,
  Key,
  Dashboard,
  ArrowRight,
  Copy,
  Check,
  Zap,
  Crown,
  Settings,
} from "lucide-react";
import { signIn } from "@/lib/firebaseService";
import { useToast } from "@/hooks/use-toast";

export const DemoLoginHelper: React.FC = () => {
  const [loading, setLoading] = useState<string | null>(null);
  const [copied, setCopied] = useState<string | null>(null);
  const { toast } = useToast();

  const demoAccounts = [
    {
      id: "demo",
      title: "Demo User",
      email: "demo@quiz2play.com",
      password: "demo123",
      description: "Perfect for exploring the dashboard",
      features: [
        "Full dashboard access",
        "Sample quiz data",
        "All features unlocked",
      ],
      icon: <User className="w-5 h-5" />,
      color: "from-blue-500 to-purple-500",
      bgColor: "from-blue-500/20 to-purple-500/20",
      borderColor: "border-blue-500/30",
    },
    {
      id: "admin",
      title: "Admin Demo",
      email: "admin@quiz2play.com",
      password: "admin123",
      description: "Enhanced dashboard with admin features",
      features: ["Advanced analytics", "Full permissions", "Enhanced UI"],
      icon: <Crown className="w-5 h-5" />,
      color: "from-orange-500 to-red-500",
      bgColor: "from-orange-500/20 to-red-500/20",
      borderColor: "border-orange-500/30",
    },
    {
      id: "test",
      title: "Test User",
      email: "test@example.com",
      password: "test123",
      description: "Clean account for testing",
      features: ["Fresh dashboard", "Basic data", "Standard features"],
      icon: <Settings className="w-5 h-5" />,
      color: "from-green-500 to-emerald-500",
      bgColor: "from-green-500/20 to-emerald-500/20",
      borderColor: "border-green-500/30",
    },
  ];

  const handleQuickLogin = async (
    email: string,
    password: string,
    accountName: string,
  ) => {
    setLoading(email);
    try {
      await signIn(email, password);
      toast({
        title: "✅ Login Successful!",
        description: `Signed in as ${accountName}. Redirecting to dashboard...`,
      });

      setTimeout(() => {
        window.location.href = "/dashboard";
      }, 1000);
    } catch (error: any) {
      toast({
        title: "❌ Login Failed",
        description: error.message || "Please try again",
        variant: "destructive",
      });
    } finally {
      setLoading(null);
    }
  };

  const copyCredentials = async (text: string, type: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(type);
      setTimeout(() => setCopied(null), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <Card className="bg-slate-900/90 border-slate-700 backdrop-blur-xl">
      <CardHeader>
        <div className="text-center">
          <CardTitle className="flex items-center justify-center gap-2 text-white text-2xl mb-2">
            <Dashboard className="w-6 h-6 text-blue-400" />
            Quick Dashboard Access
          </CardTitle>
          <p className="text-gray-300">
            One-click login to explore the user dashboard
          </p>
        </div>
      </CardHeader>
      <CardContent>
        <Alert className="mb-6 bg-blue-500/10 border-blue-500/20">
          <Zap className="w-4 h-4 text-blue-400" />
          <AlertDescription className="text-blue-200">
            <strong>Demo Mode:</strong> No real signup needed! Click any button
            below to instantly access the dashboard.
          </AlertDescription>
        </Alert>

        <div className="space-y-4">
          {demoAccounts.map((account) => (
            <Card
              key={account.id}
              className={`bg-gradient-to-r ${account.bgColor} ${account.borderColor} border backdrop-blur-sm`}
            >
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 bg-gradient-to-r ${account.color} rounded-lg flex items-center justify-center`}
                    >
                      {account.icon}
                    </div>
                    <div>
                      <h3 className="font-bold text-white">{account.title}</h3>
                      <p className="text-sm text-gray-300">
                        {account.description}
                      </p>
                    </div>
                  </div>
                  <Badge
                    className={`bg-gradient-to-r ${account.color} text-white`}
                  >
                    Demo
                  </Badge>
                </div>

                {/* Credentials Display */}
                <div className="grid grid-cols-1 gap-2 mb-3">
                  <div className="flex items-center gap-2 bg-slate-800/50 rounded p-2">
                    <User className="w-3 h-3 text-gray-400" />
                    <code className="text-xs text-gray-300 flex-1">
                      {account.email}
                    </code>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() =>
                        copyCredentials(account.email, `${account.id}-email`)
                      }
                      className="p-1 h-auto text-gray-400 hover:text-white"
                    >
                      {copied === `${account.id}-email` ? (
                        <Check className="w-3 h-3 text-green-400" />
                      ) : (
                        <Copy className="w-3 h-3" />
                      )}
                    </Button>
                  </div>
                  <div className="flex items-center gap-2 bg-slate-800/50 rounded p-2">
                    <Key className="w-3 h-3 text-gray-400" />
                    <code className="text-xs text-gray-300 flex-1">
                      {account.password}
                    </code>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() =>
                        copyCredentials(
                          account.password,
                          `${account.id}-password`,
                        )
                      }
                      className="p-1 h-auto text-gray-400 hover:text-white"
                    >
                      {copied === `${account.id}-password` ? (
                        <Check className="w-3 h-3 text-green-400" />
                      ) : (
                        <Copy className="w-3 h-3" />
                      )}
                    </Button>
                  </div>
                </div>

                {/* Features */}
                <div className="flex flex-wrap gap-1 mb-3">
                  {account.features.map((feature, index) => (
                    <Badge
                      key={index}
                      variant="outline"
                      className="text-xs border-slate-600 text-gray-400"
                    >
                      {feature}
                    </Badge>
                  ))}
                </div>

                {/* Quick Login Button */}
                <Button
                  onClick={() =>
                    handleQuickLogin(
                      account.email,
                      account.password,
                      account.title,
                    )
                  }
                  disabled={loading === account.email}
                  className={`w-full bg-gradient-to-r ${account.color} hover:opacity-90 text-white font-bold`}
                >
                  {loading === account.email ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Signing In...
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Dashboard className="w-4 h-4" />
                      Login & View Dashboard
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  )}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Instructions */}
        <div className="mt-6 p-4 bg-yellow-500/10 rounded-lg border border-yellow-500/20">
          <h4 className="font-semibold text-yellow-400 mb-2 flex items-center gap-2">
            <Zap className="w-4 h-4" />
            Quick Instructions
          </h4>
          <ol className="text-sm text-yellow-200 space-y-1 list-decimal list-inside">
            <li>Click any "Login & View Dashboard" button above</li>
            <li>You'll be automatically signed in (no typing needed!)</li>
            <li>You'll be redirected to the dashboard page</li>
            <li>Explore all the features and analytics</li>
          </ol>
        </div>

        {/* Alternative Access */}
        <div className="mt-4 p-4 bg-purple-500/10 rounded-lg border border-purple-500/20">
          <h4 className="font-semibold text-purple-400 mb-2">
            Alternative Access
          </h4>
          <div className="space-y-2 text-sm text-purple-200">
            <p>
              • <strong>Direct URL:</strong> <code>/dashboard</code>
            </p>
            <p>
              • <strong>Manual Login:</strong> Use credentials above in the
              header sign-in
            </p>
            <p>
              • <strong>Navigation:</strong> Header → Dashboard (after login)
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
