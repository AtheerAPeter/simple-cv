import { auth } from "@/auth";
import { db } from "@/drizzle/db";
import { documents } from "@/drizzle/schema";
import { z } from "zod";

const updateSchema = z.object({
  documentTitle: z.string(),
  content: z.string(),
  type: z.enum(["cv", "cl"]),
});

export const POST = auth(async function POST(request) {
  if (!request.auth?.user) {
    return new Response("Unauthorized", { status: 401 });
  }
  try {
    const body = await request.json();
    const result = updateSchema.safeParse(body);
    if (!result.success) {
      return new Response("Invalid request body", { status: 400 });
    }
    const document = await db
      .insert(documents)
      .values({
        id: crypto.randomUUID(),
        userId: request.auth.user?.id ?? "",
        title: result.data.documentTitle ?? "",
        content: result.data.content ?? "",
        type: result.data.type ?? "cv",
        createdAt: new Date(),
        updatedAt: new Date(),
      })
      .returning();

    return new Response(JSON.stringify(document));
  } catch (error) {
    console.error("Error creating document:", error);
    return new Response(
      JSON.stringify({ error: "Failed to create document" }),
      { status: 500 }
    );
  }
});
