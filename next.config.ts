import type { NextConfig } from "next";

const API_PROXY_PREFIX = "/ms-api";
const API_PROXY_TARGET = (
  process.env.API_PROXY_TARGET ?? "http://localhost:8080"
).replace(/\/+$/, "");
const allowedDevOrigins = [
  "localhost",
  "127.0.0.1",
  "192.168.68.51",
  ...(process.env.ALLOWED_DEV_ORIGINS?.split(",")
    .map((origin) => origin.trim())
    .filter(Boolean) ?? []),
];

const nextConfig: NextConfig = {
  reactCompiler: true,
  allowedDevOrigins,
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
