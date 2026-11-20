import type { NextConfig } from 'next'
import path from 'path'

const root = path.join(__dirname, '..')

const nextConfig: NextConfig = {
  reactStrictMode: true,
  outputFileTracingRoot: root,
  turbopack: {
    root,
    rules: {
      '*.yml': {
        loaders: ['yaml-loader'],
        as: '*.js'
      }
    }
  }
}

export default nextConfig
