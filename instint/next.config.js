/** @type {import('next').NextConfig} */


const nextConfig = {
  typescript: {
    ignoreBuildErrors: true
  },
  
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  webpack: function (config, options) {
    config.experiments = {
      asyncWebAssembly: true,
      layers: true,
    };
    return config;
  },
  
};

module.exports =  nextConfig;
