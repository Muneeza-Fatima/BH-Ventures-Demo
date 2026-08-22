import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,

  trailingSlash: true,

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "flagcdn.com",
      },
    ],
  },
};

export default nextConfig;