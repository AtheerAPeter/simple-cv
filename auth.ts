import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import {
  users,
  accounts,
  sessions,
  verificationTokens,
} from "./drizzle/schema";
import { db } from "@/drizzle/db";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google],
  secret: process.env.NEXTAUTH_SECRET,
  adapter: DrizzleAdapter(db, {
    usersTable: users,
    accountsTable: accounts,
    sessionsTable: sessions,
    verificationTokensTable: verificationTokens,
  }),
});
