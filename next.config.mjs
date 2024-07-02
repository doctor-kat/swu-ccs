/** @type {import('next').NextConfig} */
const nextConfig = {
    output: "export",
    basePath: "/swu-ccs",
    reactStrictMode: false,
    images: {
        remotePatterns: [
            {protocol: "https", hostname: "cdn.starwarsunlimited.com"},
        ],
        unoptimized: true
    },
};

export default nextConfig;
