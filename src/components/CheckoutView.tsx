"use client";

import Image from "next/image";
import Link from "next/link";
import { formatPrice, getProduct } from "@/lib/products";
import { useCart } from "@/lib/cart";
import { CheckoutButton } from "./CheckoutButton";

export function CheckoutView() {
  const { items, subtotal, ready } = useCart();

  if (!ready) {
    return <div className="min-h-[50vh]" />;
  }

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-xl px-5 py-24 text-center">
        <h1 className="display text-6xl">Cart is empty</h1>
        <p className="mt-4 text-sm text-muted">Add a shirt before checkout.</p>
        <Link href="/shop" className="btn btn-solid mt-8">
          Shop merch
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto grid max-w-5xl gap-12 px-5 py-16 lg:grid-cols-[1.1fr_0.9fr]">
      <div>
        <h1 className="display text-6xl">Checkout</h1>
        <ul className="mt-8 space-y-5">
          {items.map((item) => {
            const product = getProduct(item.slug);
            if (!product) return null;
            return (
              <li key={`${item.slug}-${item.size}`} className="flex gap-4 border-b border-white/5 pb-5">
                <Image
                  src={product.image}
                  alt={product.name}
                  width={88}
                  height={88}
                  className="h-[88px] w-[88px] rounded-xl object-cover"
                />
                <div className="flex-1">
                  <p>{product.name}</p>
                  <p className="text-sm text-muted">
                    Size {item.size} · Qty {item.qty}
                  </p>
                </div>
                <p>{formatPrice(product.price * item.qty)}</p>
              </li>
            );
          })}
        </ul>
      </div>
      <aside className="h-fit rounded-3xl border border-white/10 bg-white/3 p-6">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted">Subtotal</span>
          <span>{formatPrice(subtotal)}</span>
        </div>
        <p className="mt-4 text-sm leading-6 text-muted">
          Shipping is calculated at payment: about 5–10 business days in the USA,
          10–30 days internationally. No returns. All sales final.
        </p>
        <div className="mt-6">
          <CheckoutButton />
        </div>
        <p className="mt-4 text-xs text-muted">
          Secure checkout with Stripe. You will enter shipping and card details
          on the next screen.
        </p>
      </aside>
    </div>
  );
}
