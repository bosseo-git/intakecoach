import { addUser, getUser } from './auth/[...nextauth]';

export default async function handler(req, res) {
  // Allow this endpoint in production for account recovery purposes
  // Only restrict if explicitly set to false
  if (process.env.ALLOW_DEMO_ACCOUNTS === 'false') {
    return res.status(403).json({ error: 'Account creation via this endpoint is disabled' });
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { email, session_id } = req.body;

    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }

    // Check if user already exists
    const existingUser = getUser(email);
    if (existingUser) {
      return res.status(200).json({ 
        message: 'User already exists',
        user: { email: existingUser.email }
      });
    }

    // Generate a simple password for the demo account
    const password = 'demo123456';

    // Create the user account
    const user = addUser(email, password, 'New Customer');

    console.log(`Created account for ${email}`);
    
    // Include payment session information if available
    if (session_id) {
      console.log(`Account linked to payment session: ${session_id}`);
    }

    return res.status(200).json({
      message: 'Account created successfully',
      user: { email: user.email },
      credentials: {
        email: email,
        password: password
      }
    });
  } catch (error) {
    console.error('Error creating account:', error);
    return res.status(500).json({ error: 'Failed to create account' });
  }
} 