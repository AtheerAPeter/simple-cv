import { create } from "zustand";

interface TemplateState {
  template: "simple" | "sky";
  setTemplate: (template: "simple" | "sky") => void;
}

const useTemplateStore = create<TemplateState>((set) => ({
  template: "simple",
  setTemplate: (template: "simple" | "sky") => set({ template }),
}));

export default useTemplateStore;
