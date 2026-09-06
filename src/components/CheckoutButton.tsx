"use client";

import { useState } from "react";
import { useCart } from "@/lib/cart";

export function CheckoutButton() {
  const { items } = useCart();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function pay() {
    setError("");
    setLoading(true);
    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items }),
      });
      const data = (await response.json()) as { url?: string; error?: string };
      if (!response.ok || !data.url) {
        throw new Error(data.error || "Checkout failed.");
      }
      window.location.href = data.url;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Checkout failed.");
      setLoading(false);
    }
  }

  return (
    <div>
      <button type="button" className="btn btn-solid w-full" onClick={pay} disabled={loading}>
        {loading ? "Redirecting…" : "Pay securely"}
      </button>
      {error && <p className="mt-3 text-sm text-red-300">{error}</p>}
    </div>
  );
}
