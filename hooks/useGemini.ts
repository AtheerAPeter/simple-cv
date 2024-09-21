import { model } from "@/lib/gemini";
import { useMutation } from "@tanstack/react-query";

export const useGemini = () => {
  const geminiMutation = useMutation({
    mutationFn: async (text: string) => {
      const generationConfig = {
        temperature: 1,
        topP: 0.95,
        topK: 64,
        maxOutputTokens: 8192,
        responseMimeType: "application/json",
      };
      const chatSession = model.startChat({
        generationConfig,
        history: [],
      });
      const result = await chatSession.sendMessage(text);
      return result.response.text();
    },
  });

  return { geminiMutation };
};
