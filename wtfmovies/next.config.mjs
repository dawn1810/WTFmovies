import { setupDevPlatform } from '@cloudflare/next-on-pages/next-dev';

// Here we use the @cloudflare/next-on-pages next-dev module to allow us to use bindings during local development
// (when running the application with `next dev`), for more information see:
// https://github.com/cloudflare/next-on-pages/blob/5712c57ea7/internal-packages/next-dev/README.md
if (process.env.NODE_ENV === 'development') {
  await setupDevPlatform();
}

/** @type {import('next').NextConfig} */
const nextConfig = {

  staticPageGenerationTimeout: 60,
  swcMinify: true,

  webpack(config, options) {
    config.resolve.alias['~'] = './'; // này sẽ thêm alias '~' để đề cập đến thư mục root của dự án

    // Bạn cần thêm `import path from 'path'` ở phía trên của file nếu chưa có
    return config;
  }
};

export default nextConfig;