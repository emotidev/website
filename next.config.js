const withPlugins = require('next-compose-plugins')
const isProd = process.env.NODE_ENV === 'production'

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: isProd
})

/** @type {import('next').NextConfig} */
module.exports = withPlugins([withBundleAnalyzer], {
  basePath: '',
  images: {
    formats: ['image/webp']
  },
  experimental: {
    images: {
      layoutRaw: true
    }
  },
  rewrites: async () => {
    return []
  },
  redirects: async () => {
    return []
  },
  assetPrefix: isProd ? 'https://raw.githubusercontent.com/krshkodes/krshkodes.co/main/public' : '',
  /**
   *
   * @param {import('webpack').Configuration} config
   * @param {{ buildId: string, dev: Boolean, isServer: Boolean, defaultLoaders: Object }} options
   * @returns {import('webpack').Configuration}
   */
  webpack: (config, { buildId, dev, isServer, defaultLoaders }) => {
    if (!dev && !isServer) {
      Object.assign(config.resolve.alias, {
        react: 'preact/compat',
        'react-dom/test-utils': 'preact/test-utils',
        'react-dom': 'preact/compat'
      })
    }

    return { ...config }
  },
  compress: true,
  poweredByHeader: false,
  httpAgentOptions: {
    keepAlive: false
  },
  distDir: 'dist',
  reactStrictMode: true,
  devIndicators: {
    buildActivityPosition: 'bottom-right'
  }
})
