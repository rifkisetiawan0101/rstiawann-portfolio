import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
      remotePatterns: [
          {
              protocol: 'https',
              hostname: 'ubyihlbdtuuohxzdmkxl.supabase.co',
              port: '',
              pathname: '/storage/v1/object/public/**',
          },
      ],
      unoptimized: true,
  },
};

export default nextConfig;
