# Stripe Integration Setup Guide

## Environment Variables

Make sure the following environment variables are properly set in your Vercel project:

### Required for Basic Authentication:
- `NEXTAUTH_SECRET`: Your secure authentication secret (already set)
- `NEXTAUTH_URL`: For local development, set to `http://localhost:3000`. For production, set to your deployed URL

### Required for Stripe Integration:
- `STRIPE_SECRET_KEY`: Your Stripe Secret Key (starts with `sk_live_`)
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`: Your Stripe Publishable Key (starts with `pk_live_`)
- `STRIPE_WEBHOOK_SECRET`: Your Stripe Webhook Secret for validating webhook events (already set)

### Pricing Plan IDs:
- `NEXT_PUBLIC_STRIPE_PRICE_BASIC_MONTHLY`: Already set to `price_1REPasIQjj8HlT5F4pmfwuJQ`
- `NEXT_PUBLIC_STRIPE_PRICE_BASIC_YEARLY`: Already set to `price_1REPasIQjj8HlT5Fy7tBwAy8`
- `NEXT_PUBLIC_STRIPE_PRICE_PRO_MONTHLY`: Needs to be set to your Professional monthly price ID
- `NEXT_PUBLIC_STRIPE_PRICE_PRO_YEARLY`: Needs to be set to your Professional yearly price ID
- `NEXT_PUBLIC_STRIPE_PRICE_ENTERPRISE_MONTHLY`: Needs to be set to your Enterprise monthly price ID
- `NEXT_PUBLIC_STRIPE_PRICE_ENTERPRISE_YEARLY`: Needs to be set to your Enterprise yearly price ID

## Stripe Webhook Setup

1. **Set up a webhook endpoint in your Stripe dashboard**:
   - Go to https://dashboard.stripe.com/webhooks
   - Add a new endpoint: `https://your-domain.com/api/stripe-webhook`
   - Select the `checkout.session.completed` event
   - The webhook secret has already been added to your environment variables

2. **Test the webhook**:
   - After setting up, you can test the webhook from the Stripe dashboard
   - Stripe will send a test event to your endpoint

## Completing Setup

1. **Create the remaining price plans in Stripe**:
   - You already have Basic monthly and yearly prices created
   - Create Professional and Enterprise prices (both monthly and yearly)
   - Update your environment variables with the new price IDs

2. **Install dependencies**:
   ```
   npm install
   ```

3. **Start the development server**:
   ```
   npm run dev
   ```

4. **Test the checkout flow**:
   - Go to `/pricing`
   - Enter an email
   - Select a plan and click "Purchase Plan"
   - Complete the checkout process
   - You should be redirected to the dashboard after successful payment

## Production Deployment

When deploying to production:

1. Make sure all environment variables are set in Vercel
2. Update the webhook endpoint to your production URL
3. Set `NEXTAUTH_URL` to your production URL
4. Deploy your application

## Security Considerations

- Never expose your Stripe Secret Key or Webhook Secret
- Only use `NEXT_PUBLIC_` prefix for variables that are safe to be exposed to the client
- Regularly rotate your `NEXTAUTH_SECRET` for enhanced security 