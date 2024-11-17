import { TranscriptUtterance } from "assemblyai";

export type Intel = {
  transcript: string;
  transcriptUtterances: TranscriptUtterance[] | null;
  summary: string;
  sentiment: string;
};


