/** @type {import('next').NextConfig} */
const nextConfig = {
//     rewrites: async () => {
//     return [
//       {
//         source: "/((?!api|_next/static|_next/image|favicon.ico|robots.txt).*)",
//         destination: "/shell",
//       },
//     ];
//   },
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
