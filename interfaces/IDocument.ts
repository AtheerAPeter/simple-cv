export interface ICreateDocumentInput {
  documentTitle: string;
  type: "cv" | "cl";
  content: string;
}

export interface IUpdateDocumentInput {
  title?: string;
  content?: string;
  id: string;
}
