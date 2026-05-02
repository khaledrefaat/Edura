import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  serverExternalPackages: ["@node-rs/argon2", "@neondatabase/serverless"],
};

export default nextConfig;
