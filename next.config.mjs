/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  experimental: {
    optimizeCss: true,
  },
  output: process.platform === 'win32' ? undefined : 'standalone',
  poweredByHeader: false,
  compress: true,
  reactStrictMode: false,
}

export default nextConfig
