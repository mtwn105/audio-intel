"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { generateIntel } from "../actions/assemblyai";
import { UploadDropzone } from "@/lib/uploadthing";
import { Intel } from "@/types/intel";
import { ClientUploadedFileData } from "uploadthing/types";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function AppPage() {
  const [fileData, setFileData] = useState<ClientUploadedFileData<{
    url: string;
  }> | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [intel, setIntel] = useState<Intel | null>(null);
  const handleGenerateIntel = async () => {
    if (fileData) {
      // Generate Intel
      try {
        setIsLoading(true);
        setIntel(null);
        const intel = await generateIntel(fileData.url);
        setIntel(intel);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl md:text-3xl font-bold">Generate Audio Intel</h1>
      <p className="mt-2 text-sm md:text-base text-muted-foreground">
        Upload your audio file and generate actionable insights.
      </p>
      {fileData ? (
        <div className="flex justify-between items-center mt-4">
          <div className="flex flex-col gap-2">
            <p className="text-sm font-medium">File: {fileData.name}</p>
            <p className="text-sm text-muted-foreground">
              Size: {(fileData.size / 1024).toFixed(2)} KB
            </p>
          </div>
          <Button
            disabled={isLoading}
            size="sm"
            variant="destructive"
            onClick={() => setFileData(null)}
          >
            Remove
          </Button>
        </div>
      ) : (
        <UploadDropzone
          endpoint="uploader"
          onClientUploadComplete={(res) => {
            console.log("Files", res);
            console.log("Files uploaded");
            setFileData(res[0]);
          }}
          onUploadError={(error) => {
            console.error(error);
            setFileData(null);
          }}
          config={{
            mode: "auto",
          }}
        />
      )}
      {fileData && (
        <div className="mt-4">
          <Button onClick={handleGenerateIntel} disabled={isLoading}>
            {isLoading ? "Generating..." : "Generate Intel"}
          </Button>
        </div>
      )}
      {intel && (
        <div className="mt-4">
          <Accordion
            defaultValue="sentiment"
            type="single"
            collapsible
            className="mb-4"
          >
            <AccordionItem value="sentiment">
              <AccordionTrigger>Sentiment Analysis</AccordionTrigger>
              <AccordionContent>{intel.sentiment}</AccordionContent>
            </AccordionItem>
            <AccordionItem value="summary">
              <AccordionTrigger>Summary</AccordionTrigger>
              <AccordionContent>{intel.summary}</AccordionContent>
            </AccordionItem>
            <AccordionItem value="transcript">
              <AccordionTrigger>Full Transcript</AccordionTrigger>
              <AccordionContent>
                {intel.transcriptUtterances?.map((utterance, index) => (
                  <div key={index}>
                    <p>
                      <b>Speaker {utterance.speaker}:</b> {utterance.text}
                    </p>
                  </div>
                ))}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      )}
    </div>
  );
}
