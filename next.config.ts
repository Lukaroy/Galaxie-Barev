import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // Keep turbopack explicit (empty) because we have a custom webpack config
  turbopack: {},
  webpack(config, { isServer }) {
    // Prevent bundling of Node.js builtins like `dns` into client bundles
    if (!isServer) {
      config.resolve = config.resolve || {};
      config.resolve.fallback = {
        ...(config.resolve.fallback || {}),
        dns: false,
        fs: false,
        net: false,
        tls: false,
        child_process: false,
      };
    }

    return config;
  },
};

export default nextConfig;
