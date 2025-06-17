"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Volume2, VolumeX } from "lucide-react";
import { useQuizAudio } from "@/components/ui/quiz-audio-system";

export const FloatingAudioControl = () => {
  const {
    isEnabled,
    toggleAudio,
    startBackgroundMusic,
    stopBackgroundMusic,
    backgroundMusicEnabled,
  } = useQuizAudio();

  const handleToggle = () => {
    toggleAudio();
    setTimeout(() => {
      if (!isEnabled && backgroundMusicEnabled) {
        startBackgroundMusic(); // when turning ON
      } else {
        stopBackgroundMusic(); // when turning OFF
      }
    }, 200); // Delay to allow state update
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Button
        onClick={handleToggle}
        className={`w-14 h-14 rounded-2xl bg-black/80 backdrop-blur-md border border-white/20 hover:bg-black/90 transition-all duration-300 shadow-2xl ${
          isEnabled ? "text-white" : "text-red-400"
        }`}
        title={isEnabled ? "Mute Audio" : "Unmute Audio"}
      >
        {isEnabled ? (
          <Volume2 className="w-6 h-6" />
        ) : (
          <VolumeX className="w-6 h-6" />
        )}
      </Button>
    </div>
  );
};
