"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useCart } from "@/lib/cart";

export function SuccessView() {
  const { clear } = useCart();

  useEffect(() => {
    clear();
    // Empty the cart once after a successful payment.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="mx-auto max-w-xl px-5 py-24 text-center">
      <p className="text-[0.72rem] tracking-[0.24em] text-muted uppercase">Thank you</p>
      <h1 className="display mt-3 text-6xl">Order confirmed</h1>
      <p className="mt-5 text-sm leading-6 text-cream/70">
        Payment went through. A receipt is on its way from Stripe. Shirts ship in
        5–10 business days in the USA.
      </p>
      <Link href="/shop" className="btn btn-solid mt-8">
        Back to shop
      </Link>
    </div>
  );
}
