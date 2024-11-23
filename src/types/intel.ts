import { SentimentAnalysisResult, TranscriptUtterance } from "assemblyai";

export type KeySection = {
  text: string;
  timestamp: {
    start: number;
    end: number;
  };
}

export type Intel = {
  id: string;
  transcript: string;
  transcriptUtterances: TranscriptUtterance[] | null;
  summary: string;
  sentiment: boolean;
  sentimentResults: SentimentAnalysisResult[] | null;
  actionableInsights: string[] | null;
  title: string;
  keySections: KeySection[] | null;
  blogPost: string;
};


