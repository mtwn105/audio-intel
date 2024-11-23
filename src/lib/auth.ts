import { betterAuth } from "better-auth";
import { db } from "@/lib/db";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { user } from "@/lib/schemas";

export const auth = betterAuth({
  emailAndPassword: {
    enabled: true,
  },
  database: drizzleAdapter(db, {
    provider: "pg", // or "mysql", "sqlite"
    schema: {
      user: user
    }
  })
});
