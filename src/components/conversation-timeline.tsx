"use client";

import { speakerColors } from "@/lib/utils";
import { useMemo } from "react";

interface Utterance {
  speaker: string;
  text: string;
  confidence: number;
  start: number;
  end: number;
}

interface ConversationTimelineProps {
  transcriptUtterances: Utterance[];
}

export default function ConversationTimeline({
  transcriptUtterances,
}: ConversationTimelineProps) {
  const timelineData = useMemo(() => {
    if (!transcriptUtterances.length)
      return { duration: 0, normalized: [], speakers: [] };

    // Find the total duration of the conversation
    const lastUtterance = transcriptUtterances[transcriptUtterances.length - 1];
    const duration = lastUtterance.end;

    // Normalize the timestamps to percentages
    const normalized = transcriptUtterances.map((utterance) => ({
      ...utterance,
      startPercent: (utterance.start / duration) * 100,
      widthPercent: ((utterance.end - utterance.start) / duration) * 100,
    }));

    // Get unique speakers
    const speakers = Array.from(
      new Set(transcriptUtterances.map((u) => u.speaker))
    );

    return { duration, normalized, speakers };
  }, [transcriptUtterances]);

  return (
    <div className="w-full max-w-4xl mx-auto rounded-lg border p-4">
      <h3 className="text-lg font-bold mb-4">Conversation Timeline</h3>
      {/* Speakers */}
      <div className="space-y-4">
        {timelineData.speakers.map((speaker, index) => (
          <div key={speaker} className="relative h-2">
            {/* Speaker name */}
            <div className="absolute left-0 top-0 w-24 h-full flex items-center">
              <span className="text-sm font-medium">Speaker {speaker}</span>
            </div>

            {/* Timeline track */}
            <div className="ml-24 h-full bg-gray-100 rounded-full relative">
              {timelineData.normalized
                .filter((utterance) => utterance.speaker === speaker)
                .map((utterance, uIndex) => (
                  <div
                    key={uIndex}
                    className={`absolute h-full rounded-full ${
                      speakerColors[index % speakerColors.length]
                    }`}
                    style={{
                      left: `${utterance.startPercent}%`,
                      width: `${utterance.widthPercent}%`,
                    }}
                    title={utterance.text}
                  />
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
