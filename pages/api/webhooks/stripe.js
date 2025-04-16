import Stripe from 'stripe';
import { buffer } from 'micro';
import prisma from '../../../lib/prisma';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2023-10-16',
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const buf = await buffer(req);
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      buf.toString(),
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error(`Webhook Error: ${err.message}`);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  console.log(`Event received: ${event.type}`);

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object;
        await handleCheckoutSessionCompleted(session);
        break;
      }
      case 'customer.subscription.created':
      case 'customer.subscription.updated': {
        const subscription = event.data.object;
        await handleSubscriptionUpdated(subscription);
        break;
      }
      case 'customer.subscription.deleted': {
        const subscription = event.data.object;
        await handleSubscriptionDeleted(subscription);
        break;
      }
      // Handle payment intent events
      case 'payment_intent.succeeded': {
        const paymentIntent = event.data.object;
        await handlePaymentIntentSucceeded(paymentIntent);
        break;
      }
      case 'payment_intent.payment_failed': {
        const paymentIntent = event.data.object;
        await handlePaymentIntentFailed(paymentIntent);
        break;
      }
      // Handle invoice events
      case 'invoice.payment_succeeded': {
        const invoice = event.data.object;
        await handleInvoicePaymentSucceeded(invoice);
        break;
      }
      case 'invoice.payment_failed': {
        const invoice = event.data.object;
        await handleInvoicePaymentFailed(invoice);
        break;
      }
      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    res.status(200).json({ received: true });
  } catch (error) {
    console.error(`Error processing webhook: ${error.message}`);
    res.status(500).json({ error: 'Failed to process webhook' });
  }
}

async function handleCheckoutSessionCompleted(session) {
  // This function is called when a checkout session is completed successfully
  console.log('Processing checkout session:', session.id);

  if (!session.customer) {
    console.warn('No customer found in session:', session.id);
    return;
  }

  try {
    // Get customer data
    const customer = await stripe.customers.retrieve(session.customer);
    const customerEmail = customer.email || session.customer_email || session.customer_details?.email;

    if (!customerEmail) {
      console.error('No email found for customer:', session.customer);
      return;
    }

    // Get the subscription
    let subscription = null;
    if (session.subscription) {
      subscription = await stripe.subscriptions.retrieve(session.subscription);
    }

    // Check if user already exists
    let user = await prisma.user.findUnique({
      where: { email: customerEmail },
    });

    if (user) {
      // Update existing user
      console.log(`Updating existing user: ${customerEmail}`);
      await prisma.user.update({
        where: { id: user.id },
        data: {
          stripeCustomerId: session.customer,
          subscriptionStatus: subscription?.status || 'active',
          subscriptionId: subscription?.id || null,
          updatedAt: new Date(),
        },
      });
    } else {
      // Create new user
      console.log(`Creating new user for customer: ${customerEmail}`);
      
      // Generate a secure password
      const randomPassword = Math.random().toString(36).substring(2, 15);
      const hashedPassword = await require('bcrypt').hash(randomPassword, 10);
      
      user = await prisma.user.create({
        data: {
          email: customerEmail,
          name: customer.name || '',
          password: hashedPassword,
          stripeCustomerId: session.customer,
          subscriptionStatus: subscription?.status || 'active',
          subscriptionId: subscription?.id || null,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      });
      
      // Here you could send a welcome email with password reset instructions
    }

    console.log(`Successfully processed checkout for user: ${customerEmail}`);
  } catch (error) {
    console.error('Error processing checkout session:', error);
    throw error;
  }
}

async function handleSubscriptionUpdated(subscription) {
  console.log('Processing subscription update:', subscription.id);

  try {
    // Find the user associated with this customer ID
    const user = await prisma.user.findFirst({
      where: {
        stripeCustomerId: subscription.customer,
      },
    });

    if (!user) {
      console.warn(`No user found for customer: ${subscription.customer}`);
      return;
    }

    // Get the associated product
    const product = await stripe.products.retrieve(
      subscription.items.data[0].price.product
    );

    // Update the user's subscription details
    await prisma.user.update({
      where: { id: user.id },
      data: {
        subscriptionId: subscription.id,
        subscriptionStatus: subscription.status,
        planId: product.id,
        planName: product.name,
        currentPeriodEnd: new Date(subscription.current_period_end * 1000),
        cancelAtPeriodEnd: subscription.cancel_at_period_end,
        updatedAt: new Date(),
      },
    });

    console.log(`Updated subscription status for user: ${user.email}`);
  } catch (error) {
    console.error('Error processing subscription update:', error);
    throw error;
  }
}

async function handleSubscriptionDeleted(subscription) {
  console.log('Processing subscription deletion:', subscription.id);

  try {
    // Find the user associated with this subscription ID
    const user = await prisma.user.findFirst({
      where: {
        subscriptionId: subscription.id,
      },
    });

    if (!user) {
      console.warn(`No user found for subscription: ${subscription.id}`);
      return;
    }

    // Update the user's subscription details
    await prisma.user.update({
      where: { id: user.id },
      data: {
        subscriptionStatus: 'canceled',
        cancelAtPeriodEnd: false,
        currentPeriodEnd: new Date(subscription.current_period_end * 1000),
        updatedAt: new Date(),
      },
    });

    console.log(`Marked subscription as canceled for user: ${user.email}`);
  } catch (error) {
    console.error('Error processing subscription deletion:', error);
    throw error;
  }
}

async function handlePaymentIntentSucceeded(paymentIntent) {
  console.log('Payment intent succeeded:', paymentIntent.id);
  // Add any custom logic for successful payments
}

async function handlePaymentIntentFailed(paymentIntent) {
  console.log('Payment intent failed:', paymentIntent.id);
  // Add any custom logic for failed payments, like sending notification emails
}

async function handleInvoicePaymentSucceeded(invoice) {
  console.log('Invoice payment succeeded:', invoice.id);
  
  // If this is a subscription invoice, you might want to update the subscription status
  if (invoice.subscription) {
    const subscription = await stripe.subscriptions.retrieve(invoice.subscription);
    await handleSubscriptionUpdated(subscription);
  }
}

async function handleInvoicePaymentFailed(invoice) {
  console.log('Invoice payment failed:', invoice.id);
  
  try {
    // If there's a customer, find the associated user
    if (invoice.customer) {
      const user = await prisma.user.findFirst({
        where: {
          stripeCustomerId: invoice.customer,
        },
      });

      if (user && invoice.subscription) {
        // Update the subscription status
        await prisma.user.update({
          where: { id: user.id },
          data: {
            subscriptionStatus: 'past_due',
            updatedAt: new Date(),
          },
        });

        console.log(`Updated subscription status to past_due for user: ${user.email}`);
        
        // Here you might want to send an email to the user about the failed payment
      }
    }
  } catch (error) {
    console.error('Error processing invoice payment failure:', error);
    throw error;
  }
} 