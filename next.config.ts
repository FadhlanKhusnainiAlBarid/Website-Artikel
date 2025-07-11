import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "s3.sellerpintar.com",
      },
    ],
  },
  skipTrailingSlashRedirect: true,
};

export default nextConfig;
