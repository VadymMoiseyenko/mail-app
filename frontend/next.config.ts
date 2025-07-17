import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  // experimental: {
  //   externalDir: true,
  // },

  turbopack: {
    root: path.join(__dirname, ".."),
    resolveAlias: {
      "@common": path.join(__dirname, "..", "common"),
    },
  },
};

export default nextConfig;
