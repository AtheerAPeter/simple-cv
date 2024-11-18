import { useMutation } from "@tanstack/react-query";

export const usePayment = () => {
  const intentMutation = useMutation({
    mutationFn: async (inputs: { amount: number }) => {
      const response = await fetch("/api/create-payment-intent", {
        method: "POST",
        body: JSON.stringify(inputs),
      });
      return response.json();
    },
  });

  return { intentMutation };
};
