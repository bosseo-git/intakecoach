import Stripe from 'stripe';
import { buffer } from 'micro';
import { addUser, getUser } from './auth/[...nextauth]';

// Initialize Stripe with your secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

// Disable body parsing, need the raw body for Stripe signature verification
export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const buf = await buffer(req);
  const sig = req.headers['stripe-signature'];

  let event;

  try {
    // Verify the event came from Stripe
    event = stripe.webhooks.constructEvent(buf, sig, webhookSecret);
  } catch (err) {
    console.error(`Webhook signature verification failed: ${err.message}`);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  console.log(`Webhook received: ${event.type}`);

  try {
    // Handle different event types
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object;
        
        // Get customer details from Stripe
        if (session.customer) {
          const customer = await stripe.customers.retrieve(session.customer);
          
          if (customer && !customer.deleted && customer.email) {
            // Check if the user already exists before trying to create them
            const existingUser = getUser(customer.email);
            
            if (existingUser) {
              console.log(`User already exists for ${customer.email}, skipping creation`);
            } else {
              // Create user account using customer data
              try {
                const user = await handleAccountCreation(customer, session);
                console.log(`Created account for customer ${customer.id} with email ${customer.email}`);
              } catch (error) {
                console.error(`Error creating account for ${customer.email}:`, error);
              }
            }
          } else {
            console.error('Could not retrieve customer data from Stripe');
          }
        }
        break;
      }
      
      case 'customer.subscription.created':
      case 'customer.subscription.updated': {
        const subscription = event.data.object;
        
        // Retrieve customer data
        if (subscription.customer) {
          const customer = await stripe.customers.retrieve(subscription.customer);
          
          // Check if we need to create a user account (might have been missed by checkout.session.completed)
          if (customer && !customer.deleted && customer.email) {
            const existingUser = getUser(customer.email);
            
            if (!existingUser) {
              try {
                // Try to create user if they don't exist yet
                const user = await handleAccountCreation({ 
                  id: customer.id,
                  email: customer.email,
                  name: customer.name
                }, { id: event.id });
                console.log(`Created account from subscription event for ${customer.email}`);
              } catch (error) {
                console.error(`Error creating account from subscription for ${customer.email}:`, error);
              }
            }
            
            // Update subscription data in your database if needed
            console.log(`Subscription ${event.type} for customer ${customer.id} (${customer.email})`);
          }
        }
        break;
      }
      
      case 'customer.subscription.deleted': {
        const subscription = event.data.object;
        
        // Handle subscription cancellation
        if (subscription.customer) {
          console.log(`Subscription cancelled for customer ${subscription.customer}`);
          
          // Here you would update your database to reflect the cancelled subscription
        }
        break;
      }
    }
  } catch (error) {
    console.error(`Error handling webhook event: ${error.message}`);
    // Don't return an error, just log it - we want to return 200 to Stripe
  }

  // Return a response to acknowledge receipt of the event
  res.status(200).json({ received: true });
}

async function handleAccountCreation(customer, session) {
  try {
    if (!customer.email) {
      throw new Error('Customer email is required');
    }
    
    // Generate a secure random password
    const password = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
    
    // Create the user account
    const user = addUser(
      customer.email,
      password,
      customer.name || '' // Use customer name if available
    );
    
    console.log(`Created user account for ${customer.email} with customer ID ${customer.id}`);
    
    // In a real implementation, you would:
    // 1. Store the Stripe customer ID with the user record
    // 2. Store subscription details
    // 3. Send a welcome email with login instructions or a password reset link
    
    // TODO: Send welcome email to customer.email with login instructions
    
    return user;
  } catch (error) {
    console.error(`Error creating user account: ${error.message}`);
    throw error;
  }
} 