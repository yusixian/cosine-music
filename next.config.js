/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  // Note: This feature is required to use NextJS Image in SSG mode.
  // 请参见 https://nextjs.org/docs/messages/export-image-api 来了解不同的解决方法。
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;
