import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // تحسين الأداء
  experimental: {
    optimizePackageImports: ['@heroicons/react'],
  },
  
  // تحسين الصور
  images: {
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  
  // تحسين البناء
  swcMinify: true,
  
  // إعدادات الأمان
  poweredByHeader: false,
  
  // إعدادات التطوير
  reactStrictMode: true,
  
  // إعدادات التصدير (إذا كان مطلوباً)
  // output: 'export',
  // trailingSlash: true,
  // images: {
  //   unoptimized: true
  // }
};

export default nextConfig;
