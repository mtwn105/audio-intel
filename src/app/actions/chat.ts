"use server";

import { AssemblyAI } from "assemblyai";

const assemblyai = new AssemblyAI({
  apiKey: process.env.ASSEMBLYAI_API_KEY!,
});


export type Message = {
  role: "user" | "assistant";
  content: string;
}

export async function chat(transcriptId: string, message: Message): Promise<Message> {
  console.log("Chatting", message);

  const response = {
    role: "assistant" as "user" | "assistant",
    content: "Hello, how can I help you today?",
  };

  const questions = [
    {
      question: message.content,
      answer_format: 'short sentence'
    }
  ]

  const { response: qas } = await assemblyai.lemur.questionAnswer({
    transcript_ids: [transcriptId],
    final_model: 'anthropic/claude-3-5-sonnet',
    questions: questions
  })

  const answer = qas[0].answer;

  response.content = answer;

  return response;
}
