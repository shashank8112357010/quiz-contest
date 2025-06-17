"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { HelpCircle, Book, Lightbulb, MessageSquare } from "lucide-react";
import { useOnboarding } from "@/hooks/use-onboarding";
import { QuickStartGuide } from "@/components/ui/quick-start-guide";

interface FloatingHelpButtonProps {
  position?: "bottom-right" | "bottom-left";
}

export const FloatingHelpButton: React.FC<FloatingHelpButtonProps> = ({
  position = "bottom-right",
}) => {
  const [showQuickGuide, setShowQuickGuide] = useState(false);
  const { triggerTour } = useOnboarding();

  const positionClasses = {
    "bottom-right": "bottom-6 right-6",
    "bottom-left": "bottom-6 left-6",
  };

  return (
    <TooltipProvider>
      <div className={`fixed ${positionClasses[position]} z-50`}>
        {/* Quick Guide Popup */}
        {showQuickGuide && (
          <div className="absolute bottom-16 right-0 w-80 mb-2">
            <QuickStartGuide compact onClose={() => setShowQuickGuide(false)} />
          </div>
        )}

        {/* Help Menu */}
        <div className="flex flex-col gap-2 items-end">
          {/* Quick Guide Button */}
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                size="icon"
                onClick={() => setShowQuickGuide(!showQuickGuide)}
                className={`w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 shadow-lg hover:shadow-xl transition-all duration-300 ${
                  showQuickGuide ? "scale-110" : "hover:scale-110"
                }`}
              >
                <Lightbulb className="w-5 h-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="left">
              <p>Quick Tips</p>
            </TooltipContent>
          </Tooltip>

          {/* Tour Button */}
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                size="icon"
                onClick={triggerTour}
                className="w-12 h-12 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
              >
                <Book className="w-5 h-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="left">
              <p>Take Tour</p>
            </TooltipContent>
          </Tooltip>

          {/* Main Help Button */}
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                size="icon"
                className="w-14 h-14 rounded-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-110 animate-pulse"
              >
                <HelpCircle className="w-6 h-6" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="left">
              <p>Need Help?</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </div>
    </TooltipProvider>
  );
};
