import { NextResponse } from "next/server";
import Stripe from "stripe";
import { getProduct, getProductSizes } from "@/lib/products";

type CartPayload = {
  items?: { slug?: string; size?: string; qty?: number }[];
};

export async function POST(request: Request) {
  const secret = process.env.STRIPE_SECRET_KEY;
  if (!secret) {
    return NextResponse.json(
      {
        error:
          "Payments are not connected yet. In Netlify, add STRIPE_SECRET_KEY (spelled exactly that way) and trigger a new deploy.",
      },
      { status: 503 },
    );
  }

  let body: CartPayload;
  try {
    body = (await request.json()) as CartPayload;
  } catch {
    return NextResponse.json({ error: "Invalid cart." }, { status: 400 });
  }

  const items = body.items ?? [];
  if (items.length === 0) {
    return NextResponse.json({ error: "Cart is empty." }, { status: 400 });
  }

  const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = [];

  for (const item of items) {
    const product = item.slug ? getProduct(item.slug) : undefined;
    const size = item.size ?? "";
    const qty = Number(item.qty);

    if (
      !product ||
      !getProductSizes(product).includes(size) ||
      !Number.isInteger(qty) ||
      qty < 1 ||
      qty > 10
    ) {
      return NextResponse.json({ error: "Cart item is invalid." }, { status: 400 });
    }

    line_items.push({
      quantity: qty,
      price_data: {
        currency: "usd",
        unit_amount: product.price,
        product_data: {
          name: `${product.name} — Size ${size}`,
          images: undefined,
        },
      },
    });
  }

  const origin =
    process.env.NEXT_PUBLIC_SITE_URL ||
    request.headers.get("origin") ||
    "http://localhost:3000";

  const stripe = new Stripe(secret);

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items,
      customer_creation: "if_required",
      billing_address_collection: "auto",
      shipping_address_collection: {
        allowed_countries: ["US", "CA", "GB", "AU"],
      },
      shipping_options: [
        {
          shipping_rate_data: {
            type: "fixed_amount",
            fixed_amount: { amount: 699, currency: "usd" },
            display_name: "USA shipping (5–10 business days)",
          },
        },
        {
          shipping_rate_data: {
            type: "fixed_amount",
            fixed_amount: { amount: 1899, currency: "usd" },
            display_name: "International (10–30 business days)",
          },
        },
      ],
      success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/checkout`,
    });

    if (!session.url) {
      return NextResponse.json({ error: "Could not start checkout." }, { status: 500 });
    }

    return NextResponse.json({ url: session.url });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Stripe error.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
