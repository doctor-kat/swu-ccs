/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    images: {
        remotePatterns: [
            {protocol: "https", hostname: "cdn.starwarsunlimited.com"},
        ],
        deviceSizes: [640, 1080, 1920],
        imageSizes: [256, 384],
        formats: ['image/webp', 'image/avif'],
        minimumCacheTTL: 31536000,
    },
};

export default nextConfig;
