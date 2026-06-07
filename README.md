# Toxic Man

Advanced modern e-commerce starter built with Next.js, Tailwind CSS, MUI, Mongoose, Node-based API routes, and an AI chatbot shell.

## Stack

- Next.js App Router
- Tailwind CSS
- Material UI
- MongoDB and Mongoose
- API routes for products, orders, chat, and automation
- OpenRouter-ready AI chatbot fallback

## Free-friendly automation options

- GitHub Actions cron jobs calling `/api/automation`
- `cron-job.org` hitting a public webhook or protected endpoint
- MongoDB Atlas Triggers for stock changes or order events
- Resend or Brevo free tiers for transactional email

## Environment variables

Create `.env.local` from `.env.example` and fill in the values:

```bash
MONGODB_URI=
MONGODB_DB=toxic-man
OPENROUTER_API_KEY=
OPENROUTER_MODEL=openai/gpt-4o-mini
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

## MongoDB Atlas setup

1. Create a free MongoDB Atlas project and cluster.
2. Create a database user with read/write access.
3. Add your current IP address in Atlas Network Access.
4. Copy the connection string into `MONGODB_URI` in `.env.local`.
5. Optionally set `MONGODB_DB=toxic-man`.
6. Run `npm.cmd run seed` to insert the starter catalog.

## Next steps

- Connect MongoDB Atlas and seed real products
- Add authentication for admin access
- Add Stripe or Paystack checkout
- Persist chatbot leads and abandoned carts
