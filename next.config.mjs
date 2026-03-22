/** @type {import('next').NextConfig} */
const nextConfig = {
   images: {
      minimumCacheTTL: 2678400,
      formats: ['image/webp'],
      qualities: [75],
      deviceSizes: [640, 1080, 1920],   // mobile / tablet / desktop
      imageSizes: [64, 256, 400],       // thumbnail / card / detail
      remotePatterns: [
         {
            protocol: 'https',
            hostname: 'avatars.githubusercontent.com',
            pathname: '/**',
         },
         {
            protocol: 'https',
            hostname: 'raw.githubusercontent.com',
            pathname: '/**',
         },
         {
            protocol: 'https',
            hostname: 'github.com',
            pathname: '/**',
         },
         {
            protocol: 'https',
            hostname: 'img.itch.zone',
            pathname: '/**',
         },
      ],
   },
}

export default nextConfig