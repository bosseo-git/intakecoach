/**
 * NextAuth configuration helper
 * Ensures the correct API URL is used in all environments
 */

// Get the base URL for NextAuth API calls
export function getBaseUrl() {
  // Check if window is defined (browser) or not (server)
  if (typeof window !== 'undefined') {
    // In the browser, use the current window location as base
    return window.location.origin;
  }
  
  // In server-side context, use environment variables
  // These are in order of preference
  if (process.env.NEXTAUTH_URL) {
    return process.env.NEXTAUTH_URL;
  }
  
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  
  // Fallback to production URL if all else fails
  return 'https://www.intakecoach.com';
}

// For use in _app.js to configure NextAuth properly
export const nextAuthClientConfig = {
  // This is only used on the client
  // Force the base path for API requests to use the correct origin
  basePath: `${getBaseUrl()}/api/auth`,
  
  // Prevent NextAuth from using relative URLs
  baseUrl: getBaseUrl(),
} 