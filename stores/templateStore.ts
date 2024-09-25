import { Templates } from "@/components/EditorHeader";
import { create } from "zustand";

interface TemplateState {
  template: Templates;
  setTemplate: (template: Templates) => void;
  color: string;
  setColor: (color: string) => void;
}

/**
 * Creates a Zustand store for managing template-related state
 * @param {function} set - Function to update the store's state
 * @returns {object} An object containing the initial state and setter functions
 */
const useTemplateStore = create<TemplateState>((set) => ({
  template: "simple",
  /**
   * Sets the template for the current state.
   * @param {Templates} template - The template to be set.
   * @returns {void} This function doesn't return a value.
   */
  setTemplate: (template: Templates) => set({ template }),
  color: "#f4a300",
  /**
   * Sets the color state of the component.
   * @param {string} color - The color value to set.
   * @returns {void} This function doesn't return a value.
   */
  setColor: (color: string) => set({ color }),
}));

export default useTemplateStore;
