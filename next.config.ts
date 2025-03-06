import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    /* config options here */
    images: {
        remotePatterns: [
            {
                hostname: "avatar.vercel.sh",
            },
            {
                hostname: "cdn.jsdelivr.net",
            },
        ],
    },
};

export default nextConfig;
