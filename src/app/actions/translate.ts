"use server";

// eslint-disable-next-line @typescript-eslint/no-require-imports
import { TranscriptUtterance } from 'assemblyai';

// Instantiates a client
export const translateTranscript = async (transcriptUtterances: TranscriptUtterance[], to: string): Promise<TranscriptUtterance[]> => {

  console.log(`Translating transcript to ${to}`);

  // Instantiates a client
  const inputArray = transcriptUtterances.map(utterance => utterance.text);

  const url = "https://translation.googleapis.com/language/translate/v2";

  const requestBody = {
    q: inputArray, // Array of texts to be translated
    target: to, // Target language (e.g., 'es' for Spanish)
  };

  const response = await fetch(`${url}?key=${process.env.GOOGLE_TRANSLATE_API_KEY}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(requestBody),
  });

  if (!response.ok) {
    console.error(`Error: ${response.statusText}`);
    throw new Error(`Error translating transcript`);
  }

  const data = await response.json();

  const translatedUtterances: TranscriptUtterance[] = [];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (data.data.translations as any[]).forEach((translation: any, index: number) => {
    console.log(`Translation: ${translation.translatedText}`);
    translatedUtterances.push({
      text: translation.translatedText,
      start: transcriptUtterances[index].start,
      end: transcriptUtterances[index].end,
      confidence: transcriptUtterances[index].confidence,
      speaker: transcriptUtterances[index].speaker,
      words: transcriptUtterances[index].words,
    });
  });

  console.log(`Translated transcript to ${to}`);

  return translatedUtterances;
}
