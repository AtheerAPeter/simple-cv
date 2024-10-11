import { auth } from "@/auth";
import { db } from "@/drizzle/db";
import { documents } from "@/drizzle/schema";
import { eq } from "drizzle-orm";
import { z } from "zod";

const updateDocumentSchema = z.object({
  title: z.string().optional(),
  content: z.string().optional(),
});

export const PUT = auth(async function PUT(request, ctx) {
  if (!request.auth?.user) {
    return new Response("Unauthorized", { status: 401 });
  }

  try {
    const documentId = (ctx.params as any)?.id;
    if (!documentId) {
      return new Response(JSON.stringify({ error: "Invalid document ID" }), {
        status: 400,
      });
    }

    const updateData = await request.json();
    const validationResult = updateDocumentSchema.safeParse(updateData);
    if (!validationResult.success) {
      return new Response(JSON.stringify({ error: "Invalid request data" }), {
        status: 400,
      });
    }

    const updatedDocument = await db
      .update(documents)
      .set({
        title: updateData.title,
        content: updateData.content,
      })
      .where(eq(documents.id, documentId))
      .returning({
        title: documents.title,
        content: documents.content,
      });
    return new Response(JSON.stringify(updatedDocument));
  } catch (error) {
    console.error("Error updating document:", error);
    return new Response(
      JSON.stringify({ error: "Failed to update document" }),
      {
        status: 500,
      }
    );
  }
});
