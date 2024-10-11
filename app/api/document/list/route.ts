import { auth } from "@/auth";
import { db } from "@/drizzle/db";
import { documents } from "@/drizzle/schema";
import { eq, desc } from "drizzle-orm";

export const GET = auth(async function GET(request) {
  if (!request.auth?.user) {
    return new Response("Unauthorized", { status: 401 });
  }

  try {
    const docs = await db.query.documents.findMany({
      where: eq(documents.userId, request.auth.user?.id ?? ""),
      orderBy: desc(documents.updatedAt),
    });

    return new Response(JSON.stringify(docs));
  } catch (error) {
    console.error("Error listing documents:", error);
    return new Response(JSON.stringify({ error: "Failed to list documents" }), {
      status: 500,
    });
  }
});
