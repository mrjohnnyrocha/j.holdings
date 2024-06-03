// next.config.mjs
import path from 'path';
import { fileURLToPath } from 'url';
import DotEnv from 'dotenv-webpack';
import NodePolyfillPlugin from 'node-polyfill-webpack-plugin';

// Convert __filename and __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const nextConfig = {
  reactStrictMode: true,
  env: {
    MONGODB_URI: process.env.MONGODB_URI,
    REACT_APP_API_URL: process.env.REACT_APP_API_URL,
    NEXT_PUBLIC_MONGODB_PUBLIC_KEY: process.env.NEXT_PUBLIC_MONGODB_PUBLIC_KEY,
    NEXT_PUBLIC_PROJECT_ID: process.env.NEXT_PUBLIC_PROJECT_ID,
    NEXT_PUBLIC_DATASET: process.env.NEXT_PUBLIC_DATASET,
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    FRIENDLY_RECAPTCHA_SITE_KEY: process.env.FRIENDLY_RECAPTCHA_SITE_KEY,
    FRIENDLY_RECAPTCHA_SECRET_KEY: process.env.FRIENDLY_RECAPTCHA_SECRET_KEY,
    EMAIL_SERVER_HOST: process.env.EMAIL_SERVER_HOST,
    EMAIL_SERVER_PORT: process.env.EMAIL_SERVER_PORT,
    EMAIL_SERVER_USER: process.env.EMAIL_SERVER_USER,
    EMAIL_SERVER_PASSWORD: process.env.EMAIL_SERVER_PASSWORD,
    EMAIL_FROM: process.env.EMAIL_FROM,
    GITHUB_ID: process.env.GITHUB_ID,
    GITHUB_SECRET: process.env.GITHUB_SECRET,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    TWITTER_CLIENT_ID: process.env.TWITTER_CLIENT_ID,
    TWITTER_CLIENT_SECRET: process.env.TWITTER_CLIENT_SECRET,
    LINKEDIN_CLIENT_ID: process.env.LINKEDIN_CLIENT_ID,
    LINKEDIN_CLIENT_SECRET: process.env.LINKEDIN_CLIENT_SECRET,
    SLACK_CLIENT_ID: process.env.SLACK_CLIENT_ID,
    SLACK_CLIENT_SECRET: process.env.SLACK_CLIENT_SECRET,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
  },
  webpack: (config, { isServer }) => {
    const envFilePath = isServer ? './.env.local' : './.env.production';

    config.plugins.push(
      new DotEnv({
        path: envFilePath,
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
