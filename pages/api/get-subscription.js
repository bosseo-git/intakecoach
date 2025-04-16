import Stripe from 'stripe';
import { getSession } from 'next-auth/react';
import prisma from '../../lib/prisma';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2023-10-16',
});

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const session = await getSession({ req });
    
    if (!session) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    // Get the user from the database
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user || !user.stripeCustomerId) {
      return res.status(200).json({ 
        hasSubscription: false,
        message: 'User has no Stripe customer ID'
      });
    }

    // Fetch the customer's subscriptions from Stripe
    const subscriptions = await stripe.subscriptions.list({
      customer: user.stripeCustomerId,
      status: 'all',
      expand: ['data.default_payment_method'],
    });

    if (!subscriptions.data.length) {
      return res.status(200).json({ 
        hasSubscription: false,
        message: 'No subscriptions found'
      });
    }

    // Get the active subscription (or most recent one)
    const subscription = subscriptions.data[0];
    
    // Get the product details for the subscription
    const product = await stripe.products.retrieve(
      subscription.items.data[0].price.product
    );

    // Get the payment method details
    let paymentMethod = null;
    if (subscription.default_payment_method) {
      paymentMethod = subscription.default_payment_method;
    } else if (subscription.default_payment_method_id) {
      paymentMethod = await stripe.paymentMethods.retrieve(
        subscription.default_payment_method_id
      );
    }

    // Prepare the response
    const subscriptionData = {
      hasSubscription: true,
      id: subscription.id,
      status: subscription.status,
      currentPeriodEnd: subscription.current_period_end,
      cancelAtPeriodEnd: subscription.cancel_at_period_end,
      product: {
        id: product.id,
        name: product.name,
        description: product.description,
      },
      price: {
        id: subscription.items.data[0].price.id,
        amount: subscription.items.data[0].price.unit_amount,
        currency: subscription.items.data[0].price.currency,
        interval: subscription.items.data[0].price.recurring.interval,
        intervalCount: subscription.items.data[0].price.recurring.interval_count,
      },
      customerId: user.stripeCustomerId,
      paymentMethod: paymentMethod ? {
        id: paymentMethod.id,
        brand: paymentMethod.card?.brand,
        last4: paymentMethod.card?.last4,
        expMonth: paymentMethod.card?.exp_month,
        expYear: paymentMethod.card?.exp_year,
      } : null,
    };

    res.status(200).json(subscriptionData);
  } catch (error) {
    console.error('Error fetching subscription:', error);
    res.status(500).json({ message: 'Error fetching subscription', error: error.message });
  }
} 