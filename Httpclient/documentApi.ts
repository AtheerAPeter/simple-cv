"use client";
import { documents } from "@/drizzle/schema";
import {
  ICreateDocumentInput,
  IUpdateDocumentInput,
} from "@/interfaces/IDocument";
import { QueryFunctionContext } from "@tanstack/react-query";
import { Axios } from "axios";

const listDocuemntsKey = () => ["userDocuments"];
const showKey = (id?: string): [string, string?] => ["singleDocument", id];

export const documentApi = (request: Axios) => ({
  create: async (inputs: ICreateDocumentInput) => {
    const response = await request.post<(typeof documents.$inferSelect)[]>(
      "/document/create",
      inputs
    );

    return response.data[0];
  },

  list: {
    exec: async () => {
      const response = await request.get<(typeof documents.$inferSelect)[]>(
        "/document/list"
      );
      return response.data;
    },
    key: listDocuemntsKey,
  },

  show: {
    exec: async (context: QueryFunctionContext<ReturnType<typeof showKey>>) => {
      const [, id] = context.queryKey;
      const response = await request.get<typeof documents.$inferSelect>(
        `/document/get/${id}`
      );

      return response.data;
    },
    key: showKey,
  },

  update: async (inputs: IUpdateDocumentInput) => {
    const response = await request.put<(typeof documents.$inferSelect)[]>(
      `/document/update/${inputs.id}`,
      {
        title: inputs.title,
        content: inputs.content,
      }
    );
    return response.data[0];
  },

  delete: async (id: string) => {
    const response = await request.delete(`/document/delete/${id}`);
    return response.data;
  },
});
