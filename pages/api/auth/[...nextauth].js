import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

// Simple in-memory user database for demo purposes
let users = {};

// Function to add a user (or update an existing one)
export function addUser(email, password, name = "") {
  // Generate a simple user ID if it's a new user
  let id = `user_${Date.now()}`;
  
  // If updating an existing user, keep their ID
  const existingUser = users[email.toLowerCase()];
  if (existingUser) {
    id = existingUser.id;
  }
  
  const user = {
    id,
    email: email.toLowerCase(),
    name: name || email.split('@')[0],
    password,
    createdAt: existingUser?.createdAt || new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  
  // Store the user
  users[email.toLowerCase()] = user;
  
  console.log(`Added/updated user: ${email}`);
  
  return user;
}

// Function to get a user by email
export function getUser(email) {
  return users[email.toLowerCase()];
}

// Create a few demo users if database is empty (only for development)
if (Object.keys(users).length === 0) {
  if (process.env.NODE_ENV !== 'production') {
    addUser('user@example.com', 'password123', 'Demo User');
  }
}

// Set the URL based on environment
const getURL = () => {
  // Check if we're in a browser context
  if (typeof window !== 'undefined') {
    return window.location.origin;
  }
  
  // On the server, use environment variables
  if (process.env.NEXTAUTH_URL) {
    return process.env.NEXTAUTH_URL;
  }
  
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  
  // Default to production
  return 'https://www.intakecoach.com';
};

// Make sure NEXTAUTH_URL is set properly
if (typeof process !== 'undefined' && process.env) {
  process.env.NEXTAUTH_URL = getURL();
  console.log(`Setting NEXTAUTH_URL to ${process.env.NEXTAUTH_URL}`);
}

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Email",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }
        
        // Look up the user
        const user = getUser(credentials.email.toLowerCase());
        
        // Check if user exists and password matches
        if (user && user.password === credentials.password) {
          // Return user data without the password
          return {
            id: user.id,
            email: user.email,
            name: user.name,
          };
        }
        
        // Authentication failed
        return null;
      }
    }),
  ],
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.id = user.id;
        token.email = user.email;
      }
      return token;
    },
    session: async ({ session, token }) => {
      if (token) {
        session.user.id = token.id;
      }
      return session;
    },
    async redirect({ url, baseUrl }) {
      // Always use the proper base URL
      const properBaseUrl = getURL();
      
      // Allows relative callback URLs
      if (url.startsWith("/")) return `${properBaseUrl}${url}`;
      // Allows callback URLs on the same origin
      else if (new URL(url).origin === properBaseUrl) return url;
      return properBaseUrl;
    }
  },
  pages: {
    signIn: '/auth/signin',
    error: '/auth/error',
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  secret: process.env.NEXTAUTH_SECRET || "your-secret-key-change-in-production",
  // Force URLs to use our proper domain
  useSecureCookies: true,
};

export default NextAuth(authOptions); 