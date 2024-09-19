import { createOllama } from "ollama-ai-provider";
import { generateObject, generateText } from "ai";
import { z } from "zod";

const ollama = createOllama();

export async function POST(req: Request) {
  const { message } = await req.json();

  const result = await generateText({
    model: ollama("dolphin-phi"),
    // output: "no-schema",
    // schema: z.object({
    //   experiences: z.array(
    //     z.object({
    //       title: z.string(),
    //       employer: z.string(),
    //       startDate: z.string(),
    //       endDate: z.string().nullable(),
    //       description: z.string(),
    //     })
    //   ),
    //   skills: z.array(
    //     z.object({
    //       title: z.string(),
    //       skills: z.array(z.string()),
    //     })
    //   ),
    //   languages: z.array(
    //     z.object({
    //       language: z.string(),
    //       proficiency: z.string(),
    //     })
    //   ),
    // }),
    prompt: message,
  });
  return new Response(JSON.stringify(result));
}
