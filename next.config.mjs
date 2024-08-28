/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "firebasestorage.googleapis.com",
        pathname: "/**",
      },
    ],
    domains: ["tailwindui.com", "miro.medium.com"], // for development
  },
};

export default nextConfig;
