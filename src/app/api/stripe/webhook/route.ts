import { NextResponse } from "next/server";
import Stripe from "stripe";
import { sendOrderEmail } from "@/lib/order-email";

export async function POST(request: Request) {
  const secret = process.env.STRIPE_SECRET_KEY;
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!secret || !webhookSecret) {
    return NextResponse.json({ error: "Stripe webhook is not configured." }, { status: 503 });
  }

  const signature = request.headers.get("stripe-signature");
  if (!signature) {
    return NextResponse.json({ error: "Missing signature." }, { status: 400 });
  }

  const rawBody = await request.text();
  const stripe = new Stripe(secret);

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(rawBody, signature, webhookSecret);
  } catch {
    return NextResponse.json({ error: "Invalid signature." }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const sessionId = (event.data.object as Stripe.Checkout.Session).id;
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ["line_items"],
    });
    await sendOrderEmail(session);
  }

  return NextResponse.json({ received: true });
}
