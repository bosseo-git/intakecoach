import Stripe from 'stripe';
import { addUser, getUser } from './auth/[...nextauth]';

// Initialize Stripe with your secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  // This is only accessible in development or when specifically enabled
  if (process.env.NODE_ENV === 'production' && process.env.ALLOW_MANUAL_ACCOUNT !== 'true') {
    return res.status(403).json({ error: 'Not allowed in production' });
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { email, customerId, name } = req.body;

    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }

    // Check if the user already exists
    const existingUser = getUser(email);
    if (existingUser) {
      return res.status(200).json({ 
        message: 'User already exists', 
        user: { email: existingUser.email, id: existingUser.id } 
      });
    }

    // If customerId is provided, verify with Stripe
    let customerData = { email, name };
    if (customerId) {
      try {
        const customer = await stripe.customers.retrieve(customerId);
        if (customer && !customer.deleted) {
          customerData = {
            email: customer.email || email,
            name: customer.name || name,
            customerId: customer.id
          };
        }
      } catch (error) {
        console.error('Error retrieving customer from Stripe:', error);
        // Continue with the data provided in the request
      }
    }

    // Generate a secure random password
    const password = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);

    // Create the user account
    const user = addUser(
      customerData.email,
      password,
      customerData.name || ''
    );

    console.log(`Manually created user account for ${customerData.email}`);

    return res.status(200).json({ 
      message: 'Account created successfully',
      user: { email: user.email, id: user.id }
    });
  } catch (error) {
    console.error('Error creating account manually:', error);
    return res.status(500).json({ error: 'Failed to create account', details: error.message });
  }
} 