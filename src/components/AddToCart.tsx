"use client";

import { useState } from "react";
import { type Size } from "@/lib/products";
import { useCart } from "@/lib/cart";

export function AddToCart({ slug, sizes }: { slug: string; sizes: readonly string[] }) {
  const { addItem } = useCart();
  const [size, setSize] = useState<Size | null>(null);
  const [error, setError] = useState("");

  return (
    <div className="space-y-5">
      <div>
        <p className="mb-3 text-[0.68rem] tracking-[0.18em] text-muted uppercase">Size</p>
        <div className="flex flex-wrap gap-2">
          {sizes.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => {
                setSize(option);
                setError("");
              }}
              className={`min-w-12 rounded-full border px-3 py-2 text-xs tracking-[0.08em] ${
                size === option
                  ? "border-cream bg-cream text-ink"
                  : "border-white/15 text-cream hover:border-cream"
              }`}
            >
              {option}
            </button>
          ))}
        </div>
        {error && <p className="mt-2 text-sm text-red-300">{error}</p>}
      </div>
      <button
        type="button"
        className="btn btn-solid w-full sm:w-auto"
        onClick={() => {
          if (!size) {
            setError("Pick a size first.");
            return;
          }
          addItem(slug, size);
        }}
      >
        Add to cart
      </button>
    </div>
  );
}
