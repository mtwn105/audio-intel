"use server";

import { AssemblyAI } from "assemblyai";
import { Intel } from "@/types/intel";

const assemblyai = new AssemblyAI({
  apiKey: process.env.ASSEMBLYAI_API_KEY!,
});


export const generateIntel = async (fileUrl: string): Promise<Intel> => {

  console.log("Generating Intel... for file: ", fileUrl);

  const transcript = await assemblyai.transcripts.transcribe({
    audio: fileUrl,
    speaker_labels: true,
    summarization: true,
    summary_model: 'conversational',
    summary_type: 'bullets',
  });


  if (transcript.status === 'error') {
    console.error(transcript.error);
    throw new Error(transcript.error);
  }


  // Step 2: Define a summarization prompt.
  const prompt = 'Provide overall sentiment analysis of the transcript - positive, negative, or neutral.'

  // Step 3: Apply LeMUR.
  const { response } = await assemblyai.lemur.task({
    transcript_ids: [transcript.id],
    prompt,
    final_model: 'anthropic/claude-3-5-sonnet'
  })

  console.log("Transcript generated successfully.");

  return {
    transcript: transcript.text!,
    transcriptUtterances: transcript.utterances!,
    summary: transcript.summary!,
    sentiment: response,
  };
};
