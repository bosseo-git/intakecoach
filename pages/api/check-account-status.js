import { getSession } from 'next-auth/react';
import { getUser } from './auth/[...nextauth]';

export default async function handler(req, res) {
  try {
    // 1. Check if a custom header is provided indicating the user's email
    const customerEmail = req.headers['x-customer-email'];
    if (customerEmail) {
      // Verify if this user exists in our system
      const user = getUser(customerEmail);
      if (user) {
        return res.status(200).json({ 
          isLoggedIn: true,
          email: user.email 
        });
      }
    }
    
    // 2. Try using the NextAuth session (this might fail in production)
    try {
      const session = await getSession({ req });
      if (session) {
        return res.status(200).json({ 
          isLoggedIn: true, 
          email: session.user.email 
        });
      }
    } catch (error) {
      console.log("NextAuth session check failed:", error.message);
      // Continue to fallback
    }
    
    // 3. Fallback: return not logged in but with a better error response
    return res.status(200).json({ 
      isLoggedIn: false,
      message: "No active session found",
      loginUrl: `${req.headers.origin || 'https://www.intakecoach.com'}/auth/signin` 
    });
    
  } catch (error) {
    console.error('Error checking account status:', error);
    // Even on error, we'll return a non-error status to prevent blocking the UI
    res.status(200).json({ 
      isLoggedIn: false,
      error: error.message,
      message: "Failed to check account status"
    });
  }
} 