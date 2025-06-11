"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Copy, Check, Key, User, Eye, EyeOff } from "lucide-react";

interface MockCredentialsProps {
  className?: string;
}

export const MockCredentials: React.FC<MockCredentialsProps> = ({
  className = "",
}) => {
  const [copied, setCopied] = useState<string | null>(null);
  const [showPasswords, setShowPasswords] = useState(false);

  const credentials = [
    {
      id: "demo",
      title: "Demo Account",
      email: "demo@quiz2play.com",
      password: "demo123",
      description: "Pre-configured demo user",
      features: ["Full access", "Sample data", "All features"],
      color: "from-blue-500 to-purple-500",
    },
    {
      id: "test",
      title: "Test Account",
      email: "test@example.com",
      password: "test123",
      description: "Standard test account",
      features: ["Clean slate", "Fresh start", "Basic data"],
      color: "from-green-500 to-blue-500",
    },
    {
      id: "admin",
      title: "Admin Demo",
      email: "admin@quiz2play.com",
      password: "admin123",
      description: "Enhanced permissions",
      features: ["All features", "Admin tools", "Full access"],
      color: "from-orange-500 to-red-500",
    },
  ];

  const copyToClipboard = async (text: string, field: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(field);
      setTimeout(() => setCopied(null), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const autoFillLogin = (email: string, password: string) => {
    // Store in session storage for the auth modal to pick up
    sessionStorage.setItem("autoFillEmail", email);
    sessionStorage.setItem("autoFillPassword", password);

    // Navigate to home page to trigger login
    window.location.href = "/?autoLogin=true";
  };

  return (
    <Card
      className={`bg-slate-900/90 border-slate-700 backdrop-blur-xl ${className}`}
    >
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-white">
            <Key className="w-6 h-6 text-yellow-400" />
            Mock Credentials
          </CardTitle>
          <Button
            size="sm"
            variant="outline"
            onClick={() => setShowPasswords(!showPasswords)}
            className="border-gray-600 text-gray-300 hover:bg-gray-700"
          >
            {showPasswords ? (
              <EyeOff className="w-4 h-4" />
            ) : (
              <Eye className="w-4 h-4" />
            )}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {credentials.map((cred) => (
            <div
              key={cred.id}
              className={`p-4 rounded-lg bg-gradient-to-r ${cred.color}/10 border border-slate-600`}
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h4 className="font-semibold text-white">{cred.title}</h4>
                  <p className="text-sm text-gray-400">{cred.description}</p>
                </div>
                <Badge className={`bg-gradient-to-r ${cred.color} text-white`}>
                  Demo
                </Badge>
              </div>

              <div className="space-y-3">
                {/* Email */}
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-gray-400" />
                  <code className="flex-1 bg-slate-800 px-2 py-1 rounded text-sm text-gray-300">
                    {cred.email}
                  </code>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() =>
                      copyToClipboard(cred.email, `${cred.id}-email`)
                    }
                    className="px-2 text-gray-400 hover:text-white"
                  >
                    {copied === `${cred.id}-email` ? (
                      <Check className="w-3 h-3 text-green-400" />
                    ) : (
                      <Copy className="w-3 h-3" />
                    )}
                  </Button>
                </div>

                {/* Password */}
                <div className="flex items-center gap-2">
                  <Key className="w-4 h-4 text-gray-400" />
                  <code className="flex-1 bg-slate-800 px-2 py-1 rounded text-sm text-gray-300">
                    {showPasswords ? cred.password : "•••••••"}
                  </code>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() =>
                      copyToClipboard(cred.password, `${cred.id}-password`)
                    }
                    className="px-2 text-gray-400 hover:text-white"
                  >
                    {copied === `${cred.id}-password` ? (
                      <Check className="w-3 h-3 text-green-400" />
                    ) : (
                      <Copy className="w-3 h-3" />
                    )}
                  </Button>
                </div>

                {/* Features */}
                <div className="flex flex-wrap gap-1">
                  {cred.features.map((feature, index) => (
                    <Badge
                      key={index}
                      variant="outline"
                      className="text-xs border-slate-600 text-gray-400"
                    >
                      {feature}
                    </Badge>
                  ))}
                </div>

                {/* Auto-fill button */}
                <Button
                  size="sm"
                  onClick={() => autoFillLogin(cred.email, cred.password)}
                  className={`w-full bg-gradient-to-r ${cred.color} hover:opacity-90 text-white`}
                >
                  Quick Login as {cred.title}
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 p-4 bg-yellow-500/10 rounded-lg border border-yellow-500/20">
          <h4 className="font-semibold text-yellow-400 mb-2">
            💡 Demo Mode Features
          </h4>
          <ul className="text-sm text-yellow-200 space-y-1">
            <li>• Create any account with any email address</li>
            <li>• No real email verification required</li>
            <li>• All data stored locally in demo mode</li>
            <li>• Full functionality without real Firebase</li>
            <li>• Perfect for testing and exploration</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};
