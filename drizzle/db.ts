import "@/drizzle/envConfig";
import { sql } from "@vercel/postgres";
import * as schema from "./schema";
import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";

const pool = postgres(process.env.NEXTPOSTGRES_URL!, { max: 1 });

export const db = drizzle(pool, { schema });

// export const getUsers = async () => {
//   const response = await db.query.users.findMany();
// };
