import { auth } from "@/auth";

export const GET = auth(async function GET(req) {
  const user = req?.auth?.user;
  if (!user) {
    return new Response("Unauthorized", { status: 401 });
  }
  return new Response(JSON.stringify(user));
});
