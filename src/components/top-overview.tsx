import { ClockIcon, MessageSquareIcon, UsersIcon } from "lucide-react";
import { SelectTranscript } from "@/lib/schemas";
import { Intel } from "@/types/intel";
import { SentimentAnalysisResult, TranscriptUtterance } from "assemblyai";
import AudioPlayer from "./audio-player";

export default function TopOverview({
  intel,
}: {
  intel: SelectTranscript | Intel;
}) {
  const overallSentiment =
    intel.sentimentResults &&
    (intel.sentimentResults as SentimentAnalysisResult[]).length > 0
      ? (intel.sentimentResults as SentimentAnalysisResult[])?.filter(
          (r) => r.sentiment === "POSITIVE"
        ).length >
        (intel.sentimentResults as SentimentAnalysisResult[])?.filter(
          (r) => r.sentiment === "NEGATIVE"
        ).length
        ? "Positive"
        : (intel.sentimentResults as SentimentAnalysisResult[])?.filter(
            (r) => r.sentiment === "POSITIVE"
          ).length ==
          (intel.sentimentResults as SentimentAnalysisResult[])?.filter(
            (r) => r.sentiment === "NEGATIVE"
          ).length
        ? "Neutral"
        : "Negative"
      : "Neutral";

  return (
    <div>
      {(intel as SelectTranscript).fileUrl && (
        <div>
          <AudioPlayer audioUrl={(intel as SelectTranscript).fileUrl!} />
        </div>
      )}
      {(intel as SelectTranscript).youtubeUrl && (
        <div className="m-4 flex justify-center">
          <iframe
            className="w-[560px] h-[315px] rounded-lg"
            src={`https://www.youtube.com/embed/${
              (intel as SelectTranscript).youtubeUrl?.split("v=")[1]
            }`}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      )}
      <div className="flex w-full gap-4 mb-4">
        <div className="flex w-full items-center gap-2 rounded-lg border p-3">
          <UsersIcon className="h-4 w-4" />
          <div>
            <p className="text-xs md:text-sm text-muted-foreground font-medium">
              Speakers
            </p>
            <p className="text-lg md:text-2xl font-bold">
              {intel.transcriptUtterances
                ? new Set(
                    (intel.transcriptUtterances as TranscriptUtterance[]).map(
                      (u) => u.speaker
                    )
                  ).size
                : 0}
            </p>
          </div>
        </div>

        <div className="flex w-full items-center gap-2 rounded-lg border p-3">
          <ClockIcon className="h-4 w-4" />
          <div>
            <p className="text-xs md:text-sm text-muted-foreground font-medium">
              Duration
            </p>
            <p className="text-lg md:text-2xl font-bold">
              {intel.transcriptUtterances
                ? Math.round(
                    (intel.transcriptUtterances as TranscriptUtterance[])[
                      (intel.transcriptUtterances as TranscriptUtterance[])
                        .length - 1
                    ].end / 60000
                  )
                : 0}{" "}
              min
            </p>
          </div>
        </div>

        <div className="flex w-full items-center gap-2 rounded-lg border p-3">
          <MessageSquareIcon className="h-4 w-4" />
          <div>
            <p className="text-xs md:text-sm text-muted-foreground font-medium">
              Overall Sentiment
            </p>
            <p className="text-lg md:text-2xl font-bold">
              {overallSentiment || "N/A"}
            </p>
          </div>
        </div>
      </div>
      <h2 className="text-2xl mb-2 font-bold">Title: {intel.title}</h2>
    </div>
  );
}
