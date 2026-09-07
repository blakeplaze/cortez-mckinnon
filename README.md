# Tezz McKinnon est. 1996

Official merch and videos site for Cortez McKinnon. Shop shirts on this site and play the existing YouTube visuals.

## Run it

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Take payments

1. Create a free [Stripe](https://stripe.com) account.
2. Copy `.env.example` to `.env.local`.
3. Paste your secret key:

```
STRIPE_SECRET_KEY=sk_test_...
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

4. Restart `npm run dev`.
5. Use Stripe test card `4242 4242 4242 4242` until you switch to a live key.

Without a Stripe key, the site still browses and the cart works. Checkout will ask you to add the key.

## Launch on Netlify

This is a Next.js app, so connect the GitHub repo to Netlify. Do not use a drag-and-drop folder upload.

1. Put the project on GitHub.
2. In [app.netlify.com](https://app.netlify.com), click **Add new site → Import an existing project**.
3. Pick the repo. Build settings should be:
   - Build command: `npm run build`
   - Publish directory: `.next`
4. Add environment variables before the first production deploy:
   - `STRIPE_SECRET_KEY` — your Stripe secret key
   - `NEXT_PUBLIC_SITE_URL` — the live URL, like `https://your-site.netlify.app`
   - `RESEND_API_KEY` — so paid orders email Cortez
   - `STRIPE_WEBHOOK_SECRET` — from the Stripe webhook endpoint
   - `ORDER_NOTIFY_EMAIL` — `realt.mckinnon1996@gmail.com`

## Order emails

Paid orders email `realt.mckinnon1996@gmail.com` through [Resend](https://resend.com).

1. Create a free Resend account with that Gmail address.
2. Copy the API key into Netlify as `RESEND_API_KEY`.
3. In Stripe, add a webhook:
   - URL: `https://www.cortezmckinnon.com/api/stripe/webhook`
   - Event: `checkout.session.completed`
4. Copy the webhook signing secret into Netlify as `STRIPE_WEBHOOK_SECRET`.
5. Redeploy.
5. Deploy. Netlify will give you a `*.netlify.app` URL.
6. Later, point `cortezmckinnon.com` at Netlify in **Domain settings**, then update `NEXT_PUBLIC_SITE_URL` to that domain.
