/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: "/api/mrs/:path*", // Proxy endpoint
        destination: "http://freddxant.my.id/mrs/:path*", // Target API
      },
    ];
  },
};

export default nextConfig;
