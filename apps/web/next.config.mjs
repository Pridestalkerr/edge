//TODO: wait for next.config.ts support...
// import "@edge/env";
import "@edge/env/src/index.mjs";
import Icons from "unplugin-icons/webpack";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // https://github.com/unplugin/unplugin-icons?tab=readme-ov-file#build-tools
  webpack(config) {
    config.plugins.push(
      Icons({
        compiler: "jsx",
        jsx: "react",
      }),
    );

    return config;
  },
};

export default nextConfig;
