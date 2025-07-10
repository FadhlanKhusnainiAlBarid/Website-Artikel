import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["s3.sellerpintar.com"],
  },
  skipTrailingSlashRedirect: true,
};

export default nextConfig;
