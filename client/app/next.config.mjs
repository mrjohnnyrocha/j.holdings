import path from 'path';
import { fileURLToPath } from 'url';
import webpack from 'webpack';
import DotEnv from 'dotenv-webpack';
import NodePolyfillPlugin from 'node-polyfill-webpack-plugin';

// Convert __filename and __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    MONGODB_URI: process.env.MONGODB_URI,
    REACT_APP_API_URL: process.env.REACT_APP_API_URL,
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    NEXT_PUBLIC_API_KEY: process.env.NEXT_PUBLIC_API_KEY,
    NEXT_PUBLIC_API_SECRET: process.env.NEXT_PUBLIC_API_SECRET,
    NEXT_PUBLIC_RECAPTCHA_SITE_KEY: process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY,
  },
  webpack: (config, { isServer }) => {
    config.plugins.push(
      new DotEnv({
        path: './.env',
        systemvars: true,
      }),
      new NodePolyfillPlugin()
    );

    if (!isServer) {
      config.resolve.fallback = {
        fs: false,
        path: 'path-browserify',
        os: 'os-browserify/browser',
        crypto: 'crypto-browserify',
        stream: 'stream-browserify',
        buffer: 'buffer',
        process: 'process/browser',
        vm: 'vm-browserify',
      };
    }

    // Ensure DefinePlugin doesn't conflict
    config.plugins.forEach(plugin => {
      if (plugin.constructor.name === 'DefinePlugin') {
        if (plugin.definitions['process.env.NEXT_RUNTIME']) {
          delete plugin.definitions['process.env.NEXT_RUNTIME'];
        }
      }
    });

    return config;
  },
};

export default nextConfig;
