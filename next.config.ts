import type { NextConfig } from "next";
import path from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = path.dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
  // تحسين الأداء
  experimental: {
    optimizePackageImports: ['@heroicons/react', 'lucide-react'],
  },
  
  // إعدادات Turbopack
  turbopack: {
    root: projectRoot,
    rules: {
      '*.svg': {
        loaders: ['@svgr/webpack'],
        as: '*.js',
      },
    },
  },

  outputFileTracingRoot: projectRoot,

  eslint: {
    dirs: ['src'],
  },
  
  // تحسين الصور
  images: {
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'dummyjson.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  
  // تحسين البناء
  // swcMinify: true, // تم إزالته لتحسين الأداء
  
  // إعدادات الأمان
  poweredByHeader: false,
  
  // إعدادات التطوير
  reactStrictMode: true,
  
  // تحسينات إضافية للأداء
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  
  // تحسينات Turbopack
  webpack: (config, { dev, isServer }) => {
    if (dev && !isServer) {
      config.watchOptions = {
        poll: false,
        ignored: /node_modules/,
      };
    }
    return config;
  },
  
  // إعدادات التصدير (إذا كان مطلوباً)
  // output: 'export',
  // trailingSlash: true,
  // images: {
  //   unoptimized: true
  // }
};

export default nextConfig;
