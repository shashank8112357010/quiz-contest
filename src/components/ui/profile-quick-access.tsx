"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { User, ChevronRight } from "lucide-react";
import { useAuth } from "@/components/providers/AuthProvider";

export const ProfileQuickAccess: React.FC = () => {
  const { user, userData, loading } = useAuth();

  if (loading) return null;

  if (!user || !userData) return null;

  return (
    <div className="fixed top-20 right-4 z-40">
      <div className="bg-gradient-to-r from-purple-600/90 to-pink-600/90 backdrop-blur-sm rounded-lg p-3 border border-white/20 shadow-lg">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
            <User className="w-4 h-4 text-white" />
          </div>
          <div className="text-white">
            <div className="text-sm font-semibold">{userData.displayName}</div>
            <div className="text-xs opacity-80">Click to view profile</div>
          </div>
          <Button
            size="sm"
            onClick={() => (window.location.href = "/profile")}
            className="bg-white/20 hover:bg-white/30 text-white border-0 px-2"
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};
