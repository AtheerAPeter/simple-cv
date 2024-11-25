"use client";

import { loadStripe } from "@stripe/stripe-js";
import { Elements, PaymentElement } from "@stripe/react-stripe-js";
import convertToSubCurrency from "@/lib/convertToSubCurrency";
import CheckoutForm from "@/components/CheckoutForm";

export default function Purchase() {
  if (!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY) {
    throw new Error("NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY is not set");
  }
  const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
  );

  return (
    <div className="flex justify-center items-center h-screen container mx-auto">
      <Elements
        stripe={stripePromise}
        options={{
          mode: "payment",
          currency: "eur",
          amount: convertToSubCurrency(0.99),
        }}
      >
        <CheckoutForm amount={0.99} returnUrl={"/"} />
      </Elements>
    </div>
  );
}
