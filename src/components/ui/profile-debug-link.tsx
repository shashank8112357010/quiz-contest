"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { User } from "lucide-react";

export const ProfileDebugLink: React.FC = () => {
  return (
    <div className="fixed bottom-4 left-4 z-50">
      <Button
        onClick={() => {
          console.log("Navigating to profile...");
          window.location.href = "/profile";
        }}
        className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg"
      >
        <User className="w-4 h-4 mr-2" />
        Go to Profile
      </Button>
    </div>
  );
};
