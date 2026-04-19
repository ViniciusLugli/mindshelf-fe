import type { NextConfig } from "next";

const allowedDevOrigins = [
  "localhost",
  "127.0.0.1",
  "192.168.68.51",
  ...(process.env.ALLOWED_DEV_ORIGINS?.split(",")
    .map((origin) => origin.trim())
    .filter(Boolean) ?? []),
];

const avatarOrigins = [
  process.env.API_ORIGIN,
  process.env.NEXT_PUBLIC_API_ORIGIN,
  "http://localhost:8080",
  "http://127.0.0.1:8080",
].filter((origin): origin is string => Boolean(origin));

const remotePatterns = Array.from(new Set(avatarOrigins))
  .map((origin) => {
    try {
      const url = new URL(origin);
      if (url.protocol !== "http:" && url.protocol !== "https:") {
        return null;
      }

      return {
        protocol: url.protocol.slice(0, -1) as "http" | "https",
        hostname: url.hostname,
        ...(url.port ? { port: url.port } : {}),
      };
    } catch {
      return null;
    }
  })
  .filter(
    (pattern): pattern is NonNullable<typeof pattern> => pattern !== null,
  );

const nextConfig: NextConfig = {
  reactCompiler: true,
  allowedDevOrigins,
  images: {
    remotePatterns,
  },
};

export default nextConfig;
