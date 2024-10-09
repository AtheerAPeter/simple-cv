import { auth } from "@/auth";
import { db } from "@/drizzle/db";
import { users } from "@/drizzle/schema";
import { eq } from "drizzle-orm";

const { GoogleGenerativeAI } = require("@google/generative-ai");

export const POST = auth(async function POST(request) {
  if (!request.auth?.user) {
    return new Response("Unauthorized", { status: 401 });
  }
  try {
    if (!request || !request.json) {
      throw new Error("Invalid request object");
    }
    const { message, mode } = await request.json();
    if (!message) {
      throw new Error("Invalid request object");
    }
    const apiKey = process.env.NEXTGEMINI_API_KEY;
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
    });
    const generationConfig = {
      temperature: 1,
      topP: 0.95,
      topK: 64,
      maxOutputTokens: 8192,
      responseMimeType: mode === "json" ? "application/json" : "text/plain",
    };
    const chatSession = model.startChat({
      generationConfig,
      history: [],
    });
    const result = await chatSession.sendMessage(message);
    const response = await db
      .update(users)
      .set({
        usage: (request.auth?.user as any)?.usage + 1,
      })
      .where(eq(users.id, request.auth?.user?.id!))
      .returning({
        usage: users.usage,
      });
    return new Response(JSON.stringify(result.response.text()));
  } catch (error) {
    console.error("Error generating content:", error);
    return new Response(
      JSON.stringify({ error: "Failed to generate content" }),
      { status: 500 }
    );
  }
});
