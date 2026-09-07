"use client";

import Image from "next/image";
import Link from "next/link";
import { formatPrice, getProduct } from "@/lib/products";
import { useCart } from "@/lib/cart";

export function CartDrawer() {
  const { items, setQty, removeItem, subtotal, open, setOpen } = useCart();

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50">
      <button
        type="button"
        className="absolute inset-0 bg-black/65"
        aria-label="Close cart"
        onClick={() => setOpen(false)}
      />
      <aside className="absolute inset-y-0 right-0 flex w-full max-w-md flex-col border-l border-ice/20 bg-ink">
        <div className="flex items-center justify-between border-b border-white/5 px-5 py-4">
          <h2 className="display text-3xl">Cart</h2>
          <button type="button" className="text-xs tracking-[0.16em] uppercase" onClick={() => setOpen(false)}>
            Close
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-6">
          {items.length === 0 ? (
            <p className="text-sm text-muted">Your cart is empty.</p>
          ) : (
            <ul className="space-y-5">
              {items.map((item) => {
                const product = getProduct(item.slug);
                if (!product) return null;
                return (
                  <li key={`${item.slug}-${item.size}`} className="flex gap-4">
                    <Image
                      src={product.image}
                      alt={product.name}
                      width={80}
                      height={80}
                      className="h-20 w-20 rounded-lg object-cover bg-white/5"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm">{product.name}</p>
                      <p className="text-xs text-muted">Size {item.size}</p>
                      <div className="mt-2 flex items-center gap-3">
                        <button
                          type="button"
                          className="h-7 w-7 rounded-full border border-white/15"
                          onClick={() => setQty(item.slug, item.size, item.qty - 1)}
                        >
                          −
                        </button>
                        <span className="w-4 text-center text-sm">{item.qty}</span>
                        <button
                          type="button"
                          className="h-7 w-7 rounded-full border border-white/15"
                          onClick={() => setQty(item.slug, item.size, item.qty + 1)}
                        >
                          +
                        </button>
                        <button
                          type="button"
                          className="ml-auto text-xs text-muted hover:text-cream"
                          onClick={() => removeItem(item.slug, item.size)}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                    <p className="text-sm">{formatPrice(product.price * item.qty)}</p>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        <div className="border-t border-white/5 px-5 py-5">
          <div className="mb-4 flex items-center justify-between text-sm">
            <span className="text-muted">Subtotal</span>
            <span>{formatPrice(subtotal)}</span>
          </div>
          <Link
            href="/checkout"
            onClick={() => setOpen(false)}
            className={`btn btn-solid w-full ${items.length === 0 ? "pointer-events-none opacity-40" : ""}`}
          >
            Checkout
          </Link>
        </div>
      </aside>
    </div>
  );
}
