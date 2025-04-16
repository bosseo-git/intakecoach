import { getUser, addUser } from './auth/[...nextauth]';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { email, password, session_id } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    // Password validation
    if (password.length < 8) {
      return res.status(400).json({ error: 'Password must be at least 8 characters long' });
    }

    // Get existing user or create if they don't exist yet
    let user = getUser(email);
    
    if (!user) {
      // If for some reason the user wasn't created during checkout, create them now
      user = addUser(email, password, email.split('@')[0]);
      console.log(`Created new account for ${email} during password setup`);
    } else {
      // If user exists with the temporary password, update their password
      if (user.password === 'NEEDS_PASSWORD_SETUP') {
        // Create a new user object with the same properties but updated password
        user = addUser(email, password, user.name);
        console.log(`Updated password for ${email}, account setup completed`);
      } else {
        // If user exists with a real password, this might be an attempt to change it
        // In a real app, you'd probably want to verify their old password first
        user = addUser(email, password, user.name);
        console.log(`Updated existing account password for ${email}`);
      }
    }

    // Include payment session information if available
    if (session_id) {
      console.log(`Account setup completed for payment session: ${session_id}`);
    }

    return res.status(200).json({
      success: true,
      message: 'Account setup completed successfully',
    });
  } catch (error) {
    console.error('Error completing account setup:', error);
    return res.status(500).json({ error: 'Failed to complete account setup' });
  }
} 