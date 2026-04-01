import type { NextConfig } from "next";

const API_PROXY_PREFIX = "/ms-api";
const API_PROXY_TARGET = (
  process.env.API_PROXY_TARGET ?? "http://localhost:8080"
).replace(/\/+$/, "");

const nextConfig: NextConfig = {
  reactCompiler: true,
  async rewrites() {
    return [
      {
        source: `${API_PROXY_PREFIX}/:path*`,
        destination: `${API_PROXY_TARGET}/:path*`,
      },
    ];
  },
};

export default nextConfig;
