import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Динамические маршруты [category] работают корректно на Vercel
  trailingSlash: false,
};

export default nextConfig;
