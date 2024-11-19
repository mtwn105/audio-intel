"use server";

import { AssemblyAI } from "assemblyai";
import { Intel, KeySection } from "@/types/intel";

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
    sentiment_analysis: true,
    entity_detection: true,
    iab_categories: true,
  });


  if (transcript.status === 'error') {
    console.error(transcript.error);
    throw new Error(transcript.error);
  }

  const keySections: KeySection[] = [];

  // Get the parts of the transcript that were tagged with topics
  for (const result of transcript.iab_categories_result!.results) {
    keySections.push({
      text: result.text!,
      timestamp: result.timestamp!,
    })
  }



  let prompt = `Provide Actionable Insights from the transcript. Do not provide a preamble.

Answer Format:
[{"insight": "<insight>"}]`

  // Step 3: Apply LeMUR.
  const { response: actionableInsights } = await assemblyai.lemur.task({
    transcript_ids: [transcript.id],
    prompt,
    final_model: 'anthropic/claude-3-5-sonnet'
  })

  const actionableInsightsArray = JSON.parse(actionableInsights).map((insight: { insight: string }) => insight.insight);

  prompt = `Provide a title for the transcript. Do not provide a preamble.`

  // Step 3: Apply LeMUR.
  const { response: title } = await assemblyai.lemur.task({
    transcript_ids: [transcript.id],
    prompt,
    final_model: 'anthropic/claude-3-5-sonnet'
  })


  console.log("Transcript generated successfully.");

  return {
    transcript: transcript.text!,
    transcriptUtterances: transcript.utterances!,
    summary: transcript.summary!,
    sentiment: transcript.sentiment_analysis!,
    sentimentResults: transcript.sentiment_analysis_results!,
    actionableInsights: actionableInsightsArray,
    title: title,
    keySections: keySections,
  };
};
