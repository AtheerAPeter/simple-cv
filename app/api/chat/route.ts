import { createOllama } from "ollama-ai-provider";
import { generateObject, generateText } from "ai";
import { string, z } from "zod";

const ollama = createOllama();

export async function POST(req: Request) {
  const { message } = await req.json();

  const result = await generateObject({
    model: ollama("dolphin-phi"),
    schema: z
      .object({
        skills: z
          .array(z.string())
          .describe("programming skills array")
          .optional(),
      })
      .optional(),
    prompt: message,
  });

  return new Response(JSON.stringify(result?.object?.skills));
}
