/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
  async rewrites() {
    return [
      { source: '/features', destination: '/' },
      { source: '/safety', destination: '/' },
      { source: '/faq', destination: '/' },
    ];
  },
};
module.exports = nextConfig;
