/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ["cdn.starwarsunlimited.com"],
        remotePatterns: [
            {protocol: "https", hostname: "cdn.starwarsunlimited.com"},
        ],
    },
};

export default nextConfig;
