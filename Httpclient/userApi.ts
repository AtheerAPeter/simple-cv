import { users } from "@/drizzle/schema";
import { Axios } from "axios";
import { request } from "http";

export const userApi = (request: Axios) => ({
  get: async () => {
    const response = await request.get<typeof users.$inferSelect>("/me");
    return response.data;
  },
});
