import { setupDevPlatform } from '@cloudflare/next-on-pages/next-dev';

// Here we use the @cloudflare/next-on-pages next-dev module to allow us to use bindings during local development
// (when running the application with `next dev`), for more information see:
// https://github.com/cloudflare/next-on-pages/blob/5712c57ea7/internal-packages/next-dev/README.md
if (process.env.NODE_ENV === 'development') {
  await setupDevPlatform();
}
import withPWAInit from "@ducanh2912/next-pwa";

const withPWA = withPWAInit({
  dest: "public",
  disable: false,
  cacheOnFrontendNav: true,
  aggressiveFrontEndNavCaching: true,
  reloadOnOnline: true,
  workboxOptions: {
    disableDevLogs: true,
  }
});
/** @type {import('next').NextConfig} */
const nextConfig = {

  staticPageGenerationTimeout: 60,
  swcMinify: true,

  webpack(config, options) {
    config.resolve.alias['~'] = './'; // này sẽ thêm alias '~' để đề cập đến thư mục root của dự án
    return config;
  }
};

export default withPWA(nextConfig);
