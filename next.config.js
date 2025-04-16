/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // Ensure we use Pages Router and not App Router
  experimental: {
  },
  // Optimize output for deployment
  poweredByHeader: false,
  // Help with potential trailing slash issues
  trailingSlash: false,
  
  // Configure headers to handle CORS issues
  async headers() {
    return [
      {
        // Apply these headers to all routes
        source: '/(.*)',
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: '*',
          },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET, POST, PUT, DELETE, OPTIONS',
          },
          {
            key: 'Access-Control-Allow-Headers',
            value: 'X-Requested-With, Content-Type, Accept, Authorization, x-customer-email, x-is-logged-in',
          },
        ],
      },
      {
        // Additional headers specifically for NextAuth routes
        source: '/api/auth/:path*',
        headers: [
          {
            key: 'Access-Control-Allow-Credentials',
            value: 'true',
          },
        ],
      },
    ];
  },
  
  // Add rewrites to ensure correct domain handling
  async rewrites() {
    return {
      beforeFiles: [
        // Ensure NextAuth API calls use the correct domain
        {
          source: '/api/auth/:path*',
          has: [
            {
              type: 'host',
              value: 'intakecoach.com',
            },
          ],
          destination: 'https://www.intakecoach.com/api/auth/:path*',
        },
      ],
    };
  },
}

module.exports = nextConfig 