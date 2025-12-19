/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          { protocol: 'https', hostname: 'lh3.googleusercontent.com', pathname: '/**' },
          { protocol: 'https', hostname: 'avatars.githubusercontent.com', pathname: '/**' },
          { protocol: 'https', hostname: 'github.com', pathname: '/**' },
          { protocol: 'https', hostname: 'githubusercontent.com', pathname: '/**' },
          { protocol: 'https', hostname: 'gravatar.com', pathname: '/**' },
          { protocol: 'https', hostname: 'www.google.com', pathname: '/**' },
          { protocol: 'https', hostname: 't1.gstatic.com', pathname: '/**' },
          { protocol: 'https', hostname: 'pub-e058408694e44c9e829046a8a6d5d1a5.r2.dev', pathname: '/**' },
        ],
      },
  typescript: {
    ignoreBuildErrors: true,
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
      {
        source: "/(.*)\\.(png|jpg|jpeg|svg|ico|webp|avif|gif|js|css|woff2|woff)",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
    ];
  },
  
}

export default nextConfig
