import { auth } from "@/auth";
import { db } from "@/drizzle/db";
import { users } from "@/drizzle/schema";
import { eq } from "drizzle-orm";
import { z } from "zod";

const { GoogleGenerativeAI } = require("@google/generative-ai");

const requestSchema = z.object({
  message: z.string(),
  mode: z.enum(["text", "json"]),
});

export const POST = auth(async function POST(request) {
  if (!request.auth?.user) {
    return new Response("Unauthorized", { status: 401 });
  }
  try {
    const body = await request.json();
    const validationResult = requestSchema.safeParse(body);
    if (validationResult.error) {
      return new Response(
        JSON.stringify({ error: validationResult.error.message }),
        { status: 400 }
      );
    }

    if ((request.auth?.user as any)?.usage <= 0) {
      return new Response(
        JSON.stringify({
          error: `You have reached the usage limit.`,
        }),
        { status: 400 }
      );
    }

    const apiKey = process.env.NEXTGEMINI_API_KEY;
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-pro",
    });
    const generationConfig = {
      temperature: 1,
      topP: 0.95,
      topK: 64,
      maxOutputTokens: 8192,
      responseMimeType:
        validationResult.data.mode === "json"
          ? "application/json"
          : "text/plain",
    };
    const chatSession = model.startChat({
      generationConfig,
      history: [],
    });
    const result = await chatSession.sendMessage(validationResult.data.message);
    const response = await db
      .update(users)
      .set({
        usage: (request.auth?.user as any)?.usage - 1,
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
