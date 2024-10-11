import { auth } from "@/auth";
import { db } from "@/drizzle/db";
import { documents } from "@/drizzle/schema";
import { eq } from "drizzle-orm";

export const DELETE = auth(async function DELETE(request, ctx) {
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

    const deletedDocument = await db
      .delete(documents)
      .where(eq(documents.id, documentId))
      .returning({
        id: documents.id,
      });

    if (deletedDocument.length === 0) {
      return new Response(JSON.stringify({ error: "Document not found" }), {
        status: 404,
      });
    }

    return new Response(
      JSON.stringify({ message: "Document deleted successfully" })
    );
  } catch (error) {
    console.error("Error deleting document:", error);
    return new Response(
      JSON.stringify({ error: "Failed to delete document" }),
      {
        status: 500,
      }
    );
  }
});
