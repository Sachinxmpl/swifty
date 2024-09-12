import path from 'path';

export default {
  reactStrictMode: true,
  output: 'standalone',

  experimental: {
    transpilePackages: ['ui', 'store'],
    outputFileTracingRoot: path.join(process.cwd(), '../../'),
  },
};
