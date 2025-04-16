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
    
    // Check if the payment was successful
    if (session.payment_status !== 'paid') {
      return res.redirect('/payment-failed');
    }

    // Get the customer email from the session
    let customerEmail = null;
    let customerName = null;
    
    if (session.customer_details?.email) {
      customerEmail = session.customer_details.email;
      customerName = session.customer_details.name || '';
    } else if (session.customer) {
      // If customer details aren't available, try to get from customer object
      try {
        const customer = await stripe.customers.retrieve(session.customer);
        if (customer && !customer.deleted) {
          customerEmail = customer.email;
          customerName = customer.name || '';
          console.log(`Retrieved customer: ${customer.id} ${customerEmail}`);
        }
      } catch (error) {
        console.error('Error retrieving customer from Stripe:', error);
      }
    }

    if (!customerEmail) {
      console.error('No customer email found in session', session_id);
      return res.redirect('/payment-success?status=error');
    }

    // Check if user already exists
    let user = getUser(customerEmail);
    
    if (!user) {
      // Create a temporary account (without password) that needs to be completed
      // We'll mark this account as needing password setup with a special temporary password
      user = addUser(
        customerEmail,
        'NEEDS_PASSWORD_SETUP', // Special flag that indicates password setup is required
        customerName
      );
      console.log(`Created preliminary account for ${customerEmail}`);
    }

    // Redirect to password setup page with email param
    return res.redirect(`/complete-account?email=${encodeURIComponent(customerEmail)}&session_id=${session_id}`);
  } catch (error) {
    console.error('Error processing successful checkout:', error);
    return res.redirect('/payment-success?status=error');
  }
} 