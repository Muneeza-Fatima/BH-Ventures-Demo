import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  trailingSlash: true,
  images: {
    // Serve AVIF first (best compression), fall back to WebP, then original
    formats: ["image/avif", "image/webp"],
    // Cover common screen widths for responsive srcset
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // Cache optimised images for 7 days (default is 60 s in dev)
    minimumCacheTTL: 60 * 60 * 24 * 7,
    // Allowed quality values used by <Image quality={...}> across the app
    qualities: [65, 70, 75, 85],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "flagcdn.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;