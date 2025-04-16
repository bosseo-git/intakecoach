import Stripe from 'stripe';
import { getSession } from 'next-auth/react';
import { getUser } from './auth/[...nextauth]';

// Initialize Stripe with your secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Get the current session to identify the user
    const session = await getSession({ req });
    
    if (!session || !session.user?.email) {
      return res.status(401).json({ error: 'Authentication required' });
    }
    
    // Get the user's details from our system
    const user = getUser(session.user.email);
    
    if (!user) {
      return res.status(400).json({ error: 'User not found' });
    }
    
    // If the user doesn't have a Stripe customer ID, we need to create one
    // In a real implementation, you should store the Stripe customer ID with the user
    // For now, we'll try to look up a customer by email
    let customerId;
    
    // First, check if we have a customer ID in the request (might be passed from dashboard)
    if (req.body.customerId) {
      customerId = req.body.customerId;
    } else {
      // Look up the customer by email
      const customers = await stripe.customers.list({
        email: user.email,
        limit: 1,
      });
      
      if (customers.data.length > 0) {
        customerId = customers.data[0].id;
      } else {
        // Create a new customer if one doesn't exist
        const newCustomer = await stripe.customers.create({
          email: user.email,
          name: user.name,
          metadata: {
            userId: user.id,
          },
        });
        
        customerId = newCustomer.id;
      }
    }
    
    // Create a Stripe portal session
    const portalSession = await stripe.billingPortal.sessions.create({
      customer: customerId,
      return_url: `${req.headers.origin}/dashboard`,
      // Configuration for the portal session
      flow_data: {
        type: 'subscription_update',
        // This will allow upgrading or downgrading the subscription
        subscription_update: {
          features: {
            proration_behavior: 'create_prorations',
            update_subscription_items: true,
            product_switch: req.body.allowProductChange ? 
              {
                enabled: true,
                products: ['prod_basic', 'prod_professional', 'prod_enterprise'] // Add your actual product IDs here
              } : undefined
          }
        }
      }
    });
    
    // Return the portal session URL
    res.status(200).json({ url: portalSession.url });
  } catch (error) {
    console.error('Error creating portal session:', error);
    res.status(500).json({ error: 'Failed to create portal session', details: error.message });
  }
} 