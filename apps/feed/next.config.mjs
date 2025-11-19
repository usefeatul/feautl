/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: [
          'lh3.googleusercontent.com', // Google authentication provider
          'avatars.githubusercontent.com', // GitHub authentication provider
          'github.com', // GitHub profile images
          'githubusercontent.com', // GitHub raw content
          'gravatar.com', // Gravatar images (commonly used as fallback)
        ],
      },
      turbopack: {
    rules: {
      '*.svg': {
        loaders: ['@svgr/webpack'],
        as: '*.js',
      },
    },
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  }
}

export default nextConfig
