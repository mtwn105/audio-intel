import React from "react";

interface WaveformProps {
  waveform: number[];
  progress: number;
}

export function Waveform({ waveform, progress }: WaveformProps) {
  const margin = 1;
  const barWidth = 100 / waveform.length;
  console.log(barWidth);

  return (
    <div className="h-24 w-full flex items-center px-2 overflow-hidden">
      {waveform.map((point, index) => {
        return (
          <div
            key={index}
            className="flex flex-col items-center justify-center h-full "
            style={{
              width: `${barWidth}%`,
              marginLeft: `${margin}px`,
              marginRight: `${margin}px`,
            }}
          >
            {/* Top bar */}
            <div
              className={`w-full ${
                index / waveform.length <= progress
                  ? "bg-primary"
                  : "bg-gray-200"
              } rounded-t-md`}
              style={{ height: `${Math.max(point * 30, 1)}%` }}
            />
            {/* Bottom bar (mirrored) */}
            <div
              className={`w-full ${
                index / waveform.length <= progress
                  ? "bg-primary"
                  : "bg-gray-200"
              } rounded-b-md`}
              style={{ height: `${Math.max(point * 30, 1)}%` }}
            />
          </div>
        );
      })}
    </div>
  );
}
