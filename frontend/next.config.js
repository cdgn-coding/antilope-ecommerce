/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  images: {
    domains: ["localhost", "products-993880c.s3.amazonaws.com"],
  },
  rewrites: [
    {
      source: "/ping",
      destination: "/api/ping",
    },
  ],
  experimental: {
    outputStandalone: true,
  },
};
