import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import { usePayment } from "@/hooks/usePayment";
import convertToSubCurrency from "@/lib/convertToSubCurrency";
import LoadingSpinner from "./ui/LoadingSpinner";

interface Props {
  amount: number;
  returnUrl: string;
}

export default function CheckoutForm(props: Props) {
  const stripe = useStripe();
  const elements = useElements();

  const { intentMutation } = usePayment();
  const [clientSecret, setClientSecret] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | undefined>(
    undefined
  );
  const [loading, setLoading] = useState(false);

  const createPaymentIntent = async () => {
    const response = await intentMutation.mutateAsync({
      amount: convertToSubCurrency(props.amount),
    });
    setClientSecret(response.clientSecret);
  };

  useEffect(() => {
    createPaymentIntent();
  }, [props.amount]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    if (!stripe || !elements) {
      return;
    }

    const { error: submitError } = await elements.submit();

    if (submitError) {
      setErrorMessage(submitError.message);
      setLoading(false);
      return;
    }

    const { error: confirmError } = await stripe.confirmPayment({
      elements,
      clientSecret,
      confirmParams: {
        return_url: `${window.location.origin}/`,
      },
    });

    if (confirmError) {
      setErrorMessage(confirmError.message);
      setLoading(false);
      return;
    }
  };

  if (!clientSecret || !stripe || !elements)
    return <LoadingSpinner className="h-10 w-10" />;

  return (
    <form onSubmit={handleSubmit}>
      {clientSecret && <PaymentElement />}
      <Button
        size={"lg"}
        isLoading={loading || intentMutation.isPending}
        disabled={loading || !stripe}
        className="w-full mt-2"
        type="submit"
      >
        Pay {props.amount}
      </Button>
    </form>
  );
}
