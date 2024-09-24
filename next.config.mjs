/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [{
      protocol:"https",
      hostname:"avatars.githubusercontent.com"
    }],
  },
  cacheMaxMemorySize: 0,
};

export default nextConfig;
