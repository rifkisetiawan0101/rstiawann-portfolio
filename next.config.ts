import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'xlpxspzgpauaedlqbxoz.supabase.co',
                port: '',
                pathname: '/storage/v1/object/public/**',
            },
        ],
        unoptimized: true,
    },
    eslint: {
        ignoreDuringBuilds: true,
    },

    typescript: {
        ignoreBuildErrors: true,
    },
};

export default nextConfig;
