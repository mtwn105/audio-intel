import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import { config } from "dotenv";

config({ path: ".env.local" }); // or .env.local

// Initialize neon SQL client
const sql = neon(process.env.DATABASE_URL!);

// Export drizzle db instance
export const db = drizzle(sql);
