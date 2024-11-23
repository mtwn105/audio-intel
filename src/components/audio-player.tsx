"use client";

import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Play, Pause } from "lucide-react";
import { useAudioWaveform } from "@/hooks/useWafeform";
import { Waveform } from "@/components/waveform";

export default function AudioPlayer({ audioUrl }: { audioUrl: string }) {
  const { waveform, duration } = useAudioWaveform(audioUrl);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    audio.addEventListener("timeupdate", updateTime);
    return () => audio.removeEventListener("timeupdate", updateTime);
  }, []);

  const togglePlayPause = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="w-full">
      <div className="flex items-center gap-2">
        <Button
          size="icon"
          className="bg-primary hover:bg-primary/80 h-10 w-10 rounded-full flex-shrink-0 shadow-sm"
          onClick={togglePlayPause}
        >
          {isPlaying ? (
            <Pause className="h-4 w-4 text-white" />
          ) : (
            <Play className="h-4 w-4 text-white ml-1" />
          )}
        </Button>
        <div className="flex-1 space-y-4">
          <Waveform waveform={waveform} progress={currentTime / duration} />
        </div>
      </div>

      <audio ref={audioRef} src={audioUrl} />
    </div>
  );
}
