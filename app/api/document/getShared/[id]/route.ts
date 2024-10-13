import { db } from "@/drizzle/db";
import { documents } from "@/drizzle/schema";
import { eq } from "drizzle-orm";

export async function GET(request: Request, ctx: any) {
  console.log({ request, ctx });

  try {
    const documentId = (ctx.params as any)?.id;
    if (!documentId) {
      return new Response(JSON.stringify({ error: "Invalid document ID" }), {
        status: 400,
      });
    }

    const doc = await db.query.documents.findFirst({
      where: eq(documents.id, documentId),
    });

    if (!doc) {
      return new Response(JSON.stringify({ error: "Document not found" }), {
        status: 404,
      });
    }
    return new Response(JSON.stringify(doc));
  } catch (error) {
    console.error("Error getting document:", error);
    return new Response(JSON.stringify({ error: "Failed to get document" }), {
      status: 500,
    });
  }
}
