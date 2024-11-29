/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["octasol.s3.ap-southeast-1.amazonaws.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/assets/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=2592000, immutable", // Cache for 30 days
          },
        ],
      },
    ];
  },
};

export default nextConfig;
