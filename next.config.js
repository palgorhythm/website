/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  trailingSlash: true,
  images: {
    domains: ['i.scdn.co'],
    unoptimized: true,
  },
}

module.exports = nextConfig