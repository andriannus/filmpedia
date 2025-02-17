import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/movie',
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
