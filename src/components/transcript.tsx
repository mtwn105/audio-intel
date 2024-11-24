"use client";

import { Intel } from "@/types/intel";
import { SelectTranscript } from "@/lib/schemas";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { speakerColorsLight } from "@/lib/utils";
import { TranscriptUtterance } from "assemblyai";
import ConversationTimeline from "./conversation-timeline";
import { UsersIcon } from "lucide-react";
import { translateTranscript } from "@/app/actions/translate";
import { useEffect, useState } from "react";

export default function Transcript({
  intel,
}: {
  intel: Intel | SelectTranscript;
}) {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchedTranscript, setSearchedTranscript] = useState<
    TranscriptUtterance[]
  >([]);

  useEffect(() => {
    setSearchedTranscript(intel.transcriptUtterances as TranscriptUtterance[]);
  }, [intel]);

  const supportedLanguages = [
    {
      language: "en",
      label: "English",
    },
    {
      language: "hi",
      label: "Hindi",
    },
    {
      language: "es",
      label: "Spanish",
    },
    {
      language: "fr",
      label: "French",
    },
    {
      language: "de",
      label: "German",
    },
    {
      language: "ja",
      label: "Japanese",
    },
    {
      language: "zh",
      label: "Chinese",
    },
    {
      language: "ar",
      label: "Arabic",
    },
    {
      language: "it",
      label: "Italian",
    },
    {
      language: "pt",
      label: "Portuguese",
    },
  ];

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    const results = (
      intel!.transcriptUtterances as TranscriptUtterance[]
    ).filter((u) => u.text.toLowerCase().includes(query.toLowerCase()));
    if (results.length === 0) {
      setSearchedTranscript(
        intel!.transcriptUtterances as TranscriptUtterance[]
      );
    } else {
      setSearchedTranscript(results);
    }
  };

  const handleTranslate = async (to: string) => {
    const translatedTranscript = await translateTranscript(
      intel!.transcriptUtterances as TranscriptUtterance[],
      to
    );
    console.log("Translated Transcript", translatedTranscript);
    setSearchedTranscript(translatedTranscript);
  };
  return (
    <div className="bg-white rounded-lg p-4 shadow-sm border  w-full">
      <div className="flex my-4 justify-between gap-4">
        <div className="relative flex-1">
          <Input
            type="search"
            placeholder="Search transcript..."
            className="w-full"
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>
        <Popover>
          <PopoverTrigger asChild>
            <Button>Translate</Button>
          </PopoverTrigger>
          <PopoverContent>
            <div className="flex flex-col gap-2">
              {supportedLanguages.map((language) => (
                <div
                  className="px-4 py-2 rounded-lg hover:opacity-80 transition-opacity cursor-pointer"
                  key={language.language}
                  onClick={() => handleTranslate(language.language)}
                >
                  {language.label}
                </div>
              ))}
            </div>
          </PopoverContent>
        </Popover>
      </div>
      <ConversationTimeline
        transcriptUtterances={
          (intel.transcriptUtterances as TranscriptUtterance[]) || []
        }
      />
      <div className="mt-4">
        {searchedTranscript.map((utterance, index) => (
          <div key={index}>
            <div
              className={`mb-4 rounded-lg border p-3 ${
                utterance.speaker === "A"
                  ? speakerColorsLight[0]
                  : utterance.speaker === "B"
                  ? speakerColorsLight[1]
                  : utterance.speaker === "C"
                  ? speakerColorsLight[2]
                  : utterance.speaker === "D"
                  ? speakerColorsLight[3]
                  : utterance.speaker === "E"
                  ? speakerColorsLight[4]
                  : utterance.speaker === "F"
                  ? speakerColorsLight[5]
                  : speakerColorsLight[6]
              }`}
            >
              <div className="flex justify-between items-center">
                <div className="mb-2 flex items-center gap-2">
                  <UsersIcon className="h-4 w-4" />
                  <p className="text-sm font-bold">
                    Speaker {utterance.speaker}
                  </p>
                </div>
                <p className="text-sm text-muted-foreground">
                  ({Math.floor(utterance.start / 1000 / 60)}:
                  {String(Math.floor((utterance.start / 1000) % 60)).padStart(
                    2,
                    "0"
                  )}{" "}
                  - {Math.floor(utterance.end / 1000 / 60)}:
                  {String(Math.floor((utterance.end / 1000) % 60)).padStart(
                    2,
                    "0"
                  )}
                  )
                </p>
              </div>
              <p
                dangerouslySetInnerHTML={{
                  __html: searchQuery
                    ? utterance.text.replace(
                        new RegExp(searchQuery, "gi"),
                        (match) => `<mark>${match}</mark>`
                      )
                    : utterance.text,
                }}
              ></p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
