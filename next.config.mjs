import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin()

/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@serapi/db'],
  output: 'standalone',
  
  experimental: {
    workerThreads: false,
    webpackBuildWorker: false,
    cpus: 1,
    esmExternals: false,
    serverComponentsExternalPackages: [],
  },
  
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'serapi-star.s3.ap-northeast-1.amazonaws.com',
      },
      {
        protocol: 'https',
        hostname: 'assets.serapi-star.club',
      },
      {
        protocol: 'https',
        hostname: '**.twimg.com',
      },
      {
        protocol: 'https',
        hostname: '**.tiktokcdn.com',
      },
      {
        protocol: 'https',
        hostname: '**.googleusercontent.com',
      },
    ],
  },
  
  webpack: (config, { dev }) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: [
        {
          loader: '@svgr/webpack',
          options: {
            svgo: false,
          },
        },
      ],
    })
    
    if (dev) {
      config.parallelism = 1
      config.watchOptions = {
        poll: 1000,
        aggregateTimeout: 300,
      }
      
      // Disable all optimization that might use workers
      config.optimization = {
        ...config.optimization,
        minimize: false,
        minimizer: [],
        splitChunks: false,
        runtimeChunk: false,
      }
      
      // Force single-threaded operation
      config.cache = false
    }
    
    return config
  },
}

export default withNextIntl(nextConfig)
