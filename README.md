# BFN Tezz est. 1996

Official merch and videos site for BFN Tezz. Shop shirts on this site and play the existing YouTube visuals.

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
   - `NEXT_PUBLIC_SITE_URL` — the live URL, like `https://bfntezz.com`
5. Deploy. Netlify will give you a `*.netlify.app` URL.
6. Point `bfntezz.com` at Netlify in **Domain settings**, then set `NEXT_PUBLIC_SITE_URL` to `https://bfntezz.com`.
