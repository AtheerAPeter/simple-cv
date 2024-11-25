import { client } from "@/Httpclient";
import { useMutation } from "@tanstack/react-query";

export const usePayment = () => {
  const intentMutation = useMutation({
    mutationFn: async (inputs: { amount: number; userId: string }) => {
      const response = await client.post("/create-payment-intent", inputs);
      return response.data;
    },
  });

  return { intentMutation };
};
