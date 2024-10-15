import { auth } from "@/auth";
import { db } from "@/drizzle/db";
import { documents } from "@/drizzle/schema";
import { z } from "zod";
import { count, eq } from "drizzle-orm";

const updateSchema = z.object({
  documentTitle: z.string(),
  content: z.string(),
  type: z.enum(["cv", "cl"]),
});
const MAX_DOCUMENTS = 6;

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
    const userId = request.auth.user.id;
    const userDocuments = await db
      .select({ count: count(documents.id) })
      .from(documents)
      .where(eq(documents.userId, userId!));

    if (userDocuments[0].count >= MAX_DOCUMENTS) {
      return new Response("You have reached the maximum number of documents", {
        status: 400,
      });
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
