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
import useUser from "@/hooks/useUser";
import { numberWithCommas } from "@/lib/utils";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

interface Props {
  amount: number;
  returnUrl: string;
  itemCount: number;
  setItemCount: (count: number) => void;
}

export default function CheckoutForm(props: Props) {
  const stripe = useStripe();
  const elements = useElements();
  const { user } = useUser();

  const { intentMutation } = usePayment();
  const [clientSecret, setClientSecret] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | undefined>(
    undefined
  );
  const [loading, setLoading] = useState(false);
  const [isCustom, setIsCustom] = useState(false);

  const createPaymentIntent = async () => {
    if (!user?.id) return;
    const response = await intentMutation.mutateAsync({
      amount: convertToSubCurrency(props.amount),
      userId: user.id,
    });
    setClientSecret(response.clientSecret);
  };

  useEffect(() => {
    createPaymentIntent();
  }, [props.amount, user?.id]);

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
    <div>
      <form onSubmit={handleSubmit}>
        {clientSecret && <PaymentElement />}
        <Button
          size={"lg"}
          isLoading={loading || intentMutation.isPending}
          disabled={loading || !stripe}
          className="w-full mt-2"
          type="submit"
        >
          {numberWithCommas(props.amount)} €
        </Button>
      </form>
      <div className="mb-4 flex items-center gap-4 mt-2">
        <Select
          value={isCustom ? "custom" : props.itemCount.toString()}
          onValueChange={(value) => {
            if (value === "custom") {
              setIsCustom(true);
            } else {
              setIsCustom(false);
              props.setItemCount(parseInt(value));
            }
          }}
        >
          <SelectTrigger className="w-24">
            <SelectValue placeholder="Select tokens" />
          </SelectTrigger>
          <SelectContent>
            {Array.from({ length: 10 }, (_, i) => (i + 1) * 10).map((count) => (
              <SelectItem key={count} value={count.toString()}>
                {count}
              </SelectItem>
            ))}
            <SelectItem value="custom">Custom</SelectItem>
          </SelectContent>
        </Select>
        {isCustom ? (
          <Input
            type="number"
            min="10"
            value={props.itemCount}
            onChange={(e) => {
              const value = parseInt(e.target.value);
              if (!isNaN(value) && value >= 10) {
                props.setItemCount(value);
              }
            }}
            className="w-24"
            placeholder="Amount"
          />
        ) : null}
        <span className="flex-1">Usage tokens</span>
      </div>
    </div>
  );
}
