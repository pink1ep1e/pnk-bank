import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    webpack: (config) => {
      config.module.rules.push({
        test: /\.(otf)$/i,
        type: 'asset/resource',
      });
      return config;
    },
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'minotar.net',
          port: '',
          pathname: '/avatar/**',
          search: '',
        },
      ],
    },
};

export default nextConfig;
