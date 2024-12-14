import type { NextConfig } from "next";
import Icons from "unplugin-icons/webpack";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // https://github.com/unplugin/unplugin-icons?tab=readme-ov-file#build-tools
  webpack: (config) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
    config.plugins.push(
      Icons({
        compiler: "jsx",
        jsx: "react",
      }),
    );

    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return config;
  },
};

export default nextConfig;
