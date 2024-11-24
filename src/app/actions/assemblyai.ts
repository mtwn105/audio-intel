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


  let actionableInsightsArray = [];
  try {
    const prompt = `Provide Actionable Insights from the transcript. Do not provide a preamble.

Answer Format:
[{"insight": "<insight>"}, {"insight": "<insight>"}, {"insight": "<insight>"}]`

    // Step 3: Apply LeMUR.
    const { response: actionableInsights } = await assemblyai.lemur.task({
      transcript_ids: [transcript.id],
      prompt,
      final_model: 'anthropic/claude-3-5-sonnet'
    })

    console.log("Actionable Insights: ", actionableInsights);

    // extract part with [ { ... } ]
    const jsonPart = "[" + actionableInsights.split("[")[1].split("]")[0] + "]";

    console.log("JSON Part: ", jsonPart);

    actionableInsightsArray = JSON.parse(jsonPart).map((insight: { insight: string }) => insight.insight);
  } catch (error) {
    console.error(error);
    actionableInsightsArray = [];
  }

  let title = "";
  try {
    const prompt = `Provide a title for the transcript with some emojis. Do not provide a preamble.`

    // Step 3: Apply LeMUR.
    const { response: titleResponse } = await assemblyai.lemur.task({
      transcript_ids: [transcript.id],
      prompt,
      final_model: 'anthropic/claude-3-5-sonnet'
    })
    title = titleResponse;
  } catch (error) {
    console.error(error);
    title = "";
  }

  let blogPost = "";

  try {
    const prompt = `Generate a blog post from the transcript in markdown format. Do not provide a preamble.`

    // Step 3: Apply LeMUR.
    const { response: blogPostResponse } = await assemblyai.lemur.task({
      transcript_ids: [transcript.id],
      prompt,
      final_model: 'anthropic/claude-3-5-sonnet'
    })

    console.log("Blog Post: ", blogPostResponse);

    blogPost = blogPostResponse;

  } catch (error) {
    console.error(error);
    blogPost = "";
  }


  console.log("Transcript generated successfully.");

  return {
    id: transcript.id,
    transcript: transcript.text!,
    transcriptUtterances: transcript.utterances!,
    summary: transcript.summary!,
    sentiment: transcript.sentiment_analysis!,
    sentimentResults: transcript.sentiment_analysis_results!,
    actionableInsights: actionableInsightsArray,
    title: title,
    keySections: keySections,
    blogPost: blogPost,
    overallSentiment: "",
  };
};


export const uploadAudio = async (file: Blob): Promise<string> => {

  console.log("Generating Intel... for file: ", file);

  const fileUrl = await assemblyai.files.upload(file);

  return fileUrl;

};