/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    images: {
        remotePatterns: [
            {protocol: "https", hostname: "cdn.starwarsunlimited.com"},
        ],
    },
};

export default nextConfig;
