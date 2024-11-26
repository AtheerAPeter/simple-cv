"use client";

import { loadStripe } from "@stripe/stripe-js";
import { Elements, PaymentElement } from "@stripe/react-stripe-js";
import convertToSubCurrency from "@/lib/convertToSubCurrency";
import CheckoutForm from "@/components/CheckoutForm";
import { useState, useEffect } from "react";
import debounce from "lodash/debounce";

export default function Purchase() {
  const [itemCount, setItemCount] = useState(10);
  const [debouncedItemCount, setDebouncedItemCount] = useState(itemCount);

  useEffect(() => {
    const debouncedUpdate = debounce((value) => {
      setDebouncedItemCount(value);
    }, 500);

    debouncedUpdate(itemCount);

    return () => {
      debouncedUpdate.cancel();
    };
  }, [itemCount]);

  if (!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY) {
    throw new Error("NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY is not set");
  }
  const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
  );

  const totalAmount = debouncedItemCount * 0.1;

  return (
    <div className="flex flex-col justify-center items-center h-screen container mx-auto">
      <Elements
        stripe={stripePromise}
        options={{
          mode: "payment",
          currency: "eur",
          amount: convertToSubCurrency(totalAmount),
        }}
      >
        <CheckoutForm
          itemCount={itemCount}
          setItemCount={setItemCount}
          amount={totalAmount}
          returnUrl={"/"}
        />
      </Elements>
    </div>
  );
}
