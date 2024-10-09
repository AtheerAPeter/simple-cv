import "@/drizzle/envConfig";
import * as schema from "./schema";
import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";

const pool = postgres(process.env.NEXTPOSTGRES_URL!, { max: 1 });
export const db = drizzle(pool, { schema });
