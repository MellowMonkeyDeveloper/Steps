/** @type {import('next').NextConfig} */
import path from 'path';
const __dirname = path.dirname(new URL(import.meta.url).pathname);

const nextConfig = {
    reactStrictMode: true,
    webpack: function (config, options) {
      config.experiments = {
        asyncWebAssembly: true,
        layers: true,
      };
      return config;
    },
    sassOptions: {
      includePaths: [path.resolve(__dirname, 'styles')]
    }
  };

export default nextConfig;