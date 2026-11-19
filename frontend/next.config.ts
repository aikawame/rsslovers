import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactStrictMode: true,
  turbopack: {
    rules: {
      '*.yml': {
        loaders: ['yaml-loader'],
        as: '*.js',
      }
    }
  }
}

export default nextConfig
