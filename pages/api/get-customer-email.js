import Stripe from 'stripe';
import { getUser, addUser } from './auth/[...nextauth]';

// Initialize Stripe with your secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { session_id } = req.query;

  if (!session_id) {
    return res.status(400).json({ error: 'Session ID is required' });
  }

  try {
    // Retrieve the session from Stripe
    const session = await stripe.checkout.sessions.retrieve(session_id);
    
    // Get customer email from the session
    let email = null;
    
    if (session.customer_details?.email) {
      email = session.customer_details.email;
    } else if (session.customer) {
      // If customer details aren't available, try to get from customer object
      try {
        const customer = await stripe.customers.retrieve(session.customer);
        if (customer && !customer.deleted) {
          email = customer.email;
        }
      } catch (error) {
        console.error('Error retrieving customer:', error);
      }
    }
    
    // If we have an email, check if the user exists - if not, create a placeholder
    if (email) {
      const existingUser = getUser(email);
      if (!existingUser) {
        // Create a temporary placeholder user with the PLACEHOLDER flag
        // This will be replaced by a real account later
        addUser(
          email,
          'PLACEHOLDER_' + Math.random().toString(36).substring(2),
          'Customer from Payment'
        );
        console.log(`Created placeholder account for ${email} from session ${session_id}`);
      }
    }
    
    return res.status(200).json({ email });
  } catch (error) {
    console.error('Error retrieving session:', error);
    return res.status(500).json({ error: 'Failed to retrieve session' });
  }
} 