import { setupDevPlatform } from '@cloudflare/next-on-pages/next-dev';

// Here we use the @cloudflare/next-on-pages next-dev module to allow us to use bindings during local development
// (when running the application with `next dev`), for more information see:
// https://github.com/cloudflare/next-on-pages/blob/main/internal-packages/next-dev/README.md
if (process.env.NODE_ENV === 'development') {
  (async () => {
    await setupDevPlatform();
  })();
}

import type { NextConfig } from "next";

import withPWAInit from "@ducanh2912/next-pwa";

const withPWA = withPWAInit({
  dest: "public",
  disable: false,
  cacheOnFrontEndNav: true,
  aggressiveFrontEndNavCaching: true,
  reloadOnOnline: true,
  workboxOptions: {
    disableDevLogs: true,
  }
});
const nextConfig: NextConfig = {
  staticPageGenerationTimeout: 60,
  swcMinify: true,
  experimental: {
    turbo: {
      rules: {
        loaders: ['sass-loader']
      },
      resolveExtensions: [
        '.mdx',
        '.tsx',
        '.ts',
        '.jsx',
        '.js',
        '.mjs',
        '.json',
      ],
      resolveAlias: {
        "~": "./",
      },
    },
  },

  webpack(config, options) {
    config.resolve.alias['~'] = './'; // này sẽ thêm alias '~' để đề cập đến thư mục root của dự án
    return config;
  }
};

export default withPWA(nextConfig);
