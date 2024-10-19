import { Templates } from "@/templates";
import { create } from "zustand";

interface TemplateState {
  template: Templates;
  setTemplate: (template: Templates) => void;
  color: string;
  setColor: (color: string) => void;
}

const useTemplateStore = create<TemplateState>((set) => ({
  template: "simple",
  setTemplate: (template: Templates) => set({ template }),
  color: "#10b981",
  setColor: (color: string) => set({ color }),
}));

export default useTemplateStore;
