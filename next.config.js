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
}

module.exports = nextConfig 