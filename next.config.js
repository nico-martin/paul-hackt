/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, options) => {
    config.module.rules.push({
      test: /\.svg$/,
      loader: "@svgr/webpack",
    });

    return config;
  },
};

module.exports = nextConfig;
