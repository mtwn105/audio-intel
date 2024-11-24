"use server";

import { eq } from 'drizzle-orm';
import { db } from '@/lib/db';
import { InsertTranscript, SelectTranscript, transcript } from '@/lib/schemas';
import crypto from "node:crypto";
export async function getIntels(userId: string): Promise<SelectTranscript[]> {
  const intels = await db.select().from(transcript).where(eq(transcript.userId, userId));
  return intels;
}

export async function getIntel(intelId: string): Promise<SelectTranscript | null> {
  const intel = await db.select().from(transcript).where(eq(transcript.id, intelId)).then(res => res[0]);
  return intel;
}

export async function deleteIntel(intelId: string): Promise<void> {
  await db.delete(transcript).where(eq(transcript.id, intelId));
}

export async function createIntel(intel: InsertTranscript): Promise<void> {
  intel.id = crypto.randomUUID();
  await db.insert(transcript).values(intel);
}
