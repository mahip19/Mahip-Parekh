import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/Mahip-Parekh",
  assetPrefix: "/Mahip-Parekh/",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;