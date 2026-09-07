import type Stripe from "stripe";
import { Resend } from "resend";

const NOTIFY_EMAIL =
  process.env.ORDER_NOTIFY_EMAIL || "realt.mckinnon1996@gmail.com";

function dollars(cents: number | null | undefined) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format((cents ?? 0) / 100);
}

function shippingBlock(session: Stripe.Checkout.Session) {
  const address = session.collected_information?.shipping_details?.address
    ?? session.shipping_details?.address;
  const name = session.collected_information?.shipping_details?.name
    ?? session.shipping_details?.name
    ?? session.customer_details?.name
    ?? "";

  if (!address) return "No shipping address.";

  return [
    name,
    address.line1,
    address.line2,
    [address.city, address.state, address.postal_code].filter(Boolean).join(", "),
    address.country,
  ]
    .filter(Boolean)
    .join("\n");
}

export async function sendOrderEmail(session: Stripe.Checkout.Session) {
  const key = process.env.RESEND_API_KEY;
  if (!key) {
    throw new Error("RESEND_API_KEY is not set.");
  }

  const items = session.line_items?.data ?? [];
  const itemLines = items
    .map((item) => {
      const name = item.description || item.price?.product?.toString() || "Item";
      return `${item.quantity} × ${name} — ${dollars(item.amount_total)}`;
    })
    .join("\n");

  const customer = session.customer_details?.email || "unknown";
  const total = dollars(session.amount_total);
  const ship = shippingBlock(session);
  const id = session.id;

  const text = [
    "New merch order from cortezmckinnon.com",
    "",
    `Stripe: ${id}`,
    `Customer: ${customer}`,
    `Total: ${total}`,
    "",
    "Items:",
    itemLines || "(none)",
    "",
    "Ship to:",
    ship,
  ].join("\n");

  const resend = new Resend(key);
  const from = process.env.RESEND_FROM || "Tezz McKinnon Shop <onboarding@resend.dev>";

  const result = await resend.emails.send({
    from,
    to: [NOTIFY_EMAIL],
    subject: `New order ${total} — Tezz McKinnon`,
    text,
  });

  if (result.error) {
    throw new Error(result.error.message);
  }
}
