"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { User } from "lucide-react";

export const ProfileDebugLink: React.FC = () => {
  return (
    <div className="fixed bottom-4 left-4 z-50 space-y-2">
      <Button
        onClick={() => {
          console.log("Navigating to demo access...");
          window.location.href = "/demo";
        }}
        className="block w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg font-bold"
      >
        🚀 Demo Dashboard Access
      </Button>
      <Button
        onClick={() => {
          console.log("Navigating to profile...");
          window.location.href = "/profile";
        }}
        className="block w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg"
      >
        <User className="w-4 h-4 mr-2" />
        Go to Profile
      </Button>
    </div>
  );
};
