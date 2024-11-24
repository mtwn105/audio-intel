import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SelectTranscript } from "@/lib/schemas";
import { Intel, KeySection } from "@/types/intel";
import { SentimentAnalysisResult } from "assemblyai";
import { BookmarkIcon, LightbulbIcon } from "lucide-react";

export default function Overview({
  intel,
}: {
  intel: Intel | SelectTranscript;
}) {
  return (
    <div className="bg-white rounded-lg p-4 shadow-sm border  w-full">
      <Accordion
        defaultValue="summary"
        type="single"
        collapsible
        className="mb-4"
      >
        {intel.summary && intel.summary.length > 0 && (
          <AccordionItem value="summary">
            <AccordionTrigger className="text-lg font-bold">
              Summary
            </AccordionTrigger>
            <AccordionContent className="text-base">
              {intel.summary}
            </AccordionContent>
          </AccordionItem>
        )}

        {(intel.sentimentResults as SentimentAnalysisResult[]) &&
          (intel.sentimentResults as SentimentAnalysisResult[]).length > 0 && (
            <AccordionItem value="sentiment">
              <AccordionTrigger className="text-lg font-bold">
                Sentiment Analysis
              </AccordionTrigger>
              <AccordionContent className="text-base">
                {(intel.sentimentResults as SentimentAnalysisResult[]) && (
                  <div className="w-full h-8 flex rounded-lg overflow-hidden">
                    {(intel.sentimentResults as SentimentAnalysisResult[]).map(
                      (result, index) => {
                        const duration = result.end - result.start;
                        const totalDuration = intel.sentimentResults
                          ? (
                              intel.sentimentResults as SentimentAnalysisResult[]
                            )[
                              (
                                intel.sentimentResults as SentimentAnalysisResult[]
                              ).length - 1
                            ]?.end -
                            (
                              intel.sentimentResults as SentimentAnalysisResult[]
                            )[0]?.start
                          : 100;

                        const width = (duration / totalDuration) * 100;

                        const bgColor =
                          result.sentiment === "POSITIVE"
                            ? "bg-green-200"
                            : result.sentiment === "NEGATIVE"
                            ? "bg-red-200"
                            : "bg-gray-200";

                        return (
                          <div
                            key={index}
                            className={`h-full ${bgColor} hover:opacity-80 transition-opacity`}
                            style={{ width: `${width}%` }}
                            title={`${result.sentiment} (${Math.floor(
                              result.start / 1000
                            )}s - ${Math.floor(result.end / 1000)}s)`}
                          />
                        );
                      }
                    )}
                  </div>
                )}
                <div className="mt-4">
                  {(intel.sentimentResults as SentimentAnalysisResult[]) && (
                    <div className="flex gap-4 ">
                      {["POSITIVE", "NEUTRAL", "NEGATIVE"].map((sentiment) => {
                        const count =
                          (intel.sentimentResults as SentimentAnalysisResult[])!.filter(
                            (result) => result.sentiment === sentiment
                          ).length;
                        const percentage = Math.round(
                          (count /
                            (intel.sentimentResults as SentimentAnalysisResult[])!
                              .length) *
                            100
                        );

                        const bgColor =
                          sentiment === "POSITIVE"
                            ? "bg-green-100"
                            : sentiment === "NEGATIVE"
                            ? "bg-red-100"
                            : "bg-gray-100";

                        return (
                          <div
                            key={sentiment}
                            className={`px-4 py-2 rounded-lg ${bgColor}`}
                          >
                            <p className="text-sm font-medium">{sentiment}</p>
                            <p className="text-xl font-bold">{percentage}%</p>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </AccordionContent>
            </AccordionItem>
          )}
        {(intel.actionableInsights as string[]) &&
          (intel.actionableInsights as string[]).length > 0 && (
            <AccordionItem value="actionableInsights">
              <AccordionTrigger className="text-lg font-bold">
                Actionable Insights
              </AccordionTrigger>
              <AccordionContent className="text-base">
                {(intel.actionableInsights as string[])?.map(
                  (insight, index) => (
                    <div key={index}>
                      <div className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-yellow-100 mr-2 mb-2">
                        <LightbulbIcon className="text-yellow-800 h-4 w-4" />
                      </div>
                      {insight}
                    </div>
                  )
                )}
              </AccordionContent>
            </AccordionItem>
          )}

        {(intel.keySections as KeySection[]) &&
          (intel.keySections as KeySection[]).length > 0 && (
            <AccordionItem value="keySections">
              <AccordionTrigger className="text-lg font-bold">
                Key Sections
              </AccordionTrigger>
              <AccordionContent className="text-base">
                {(intel.keySections as KeySection[])?.map((section, index) => (
                  <div
                    key={index}
                    className="mb-4 rounded-lg border p-3 bg-gray-50"
                  >
                    <div className="mb-2 flex items-center gap-2">
                      <BookmarkIcon className="h-4 w-4" />
                      <p className="text-sm font-medium">
                        {Math.floor(section.timestamp.start / 1000 / 60)}:
                        {String(
                          Math.floor((section.timestamp.start / 1000) % 60)
                        ).padStart(2, "0")}{" "}
                        - {Math.floor(section.timestamp.end / 1000 / 60)}:
                        {String(
                          Math.floor((section.timestamp.end / 1000) % 60)
                        ).padStart(2, "0")}
                      </p>
                    </div>
                    <p>{section.text}</p>
                  </div>
                ))}
              </AccordionContent>
            </AccordionItem>
          )}
      </Accordion>
    </div>
  );
}
