/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // allow next/image to optimize Unsplash images and our own domain
    domains: ['images.unsplash.com', 'myroyalpetcare.in', 'www.myroyalpetcare.in'],
  },
}

module.exports = nextConfig;
