import NextAuth, { NextAuthConfig } from "next-auth";
import Google from "next-auth/providers/google";
// import { db } from "@/drizzle/db";
// import { DrizzleAdapter } from "@auth/drizzle-adapter";

export const authConfig = {
  providers: [Google],
  secret: process.env.NEXTAUTH_SECRET,
} satisfies NextAuthConfig;

export const { handlers, signIn, signOut, auth } = NextAuth(authConfig);
