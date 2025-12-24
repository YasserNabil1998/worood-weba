import Link from "next/link";
import { Heart, Sparkles } from "lucide-react";
import AOSWrapper from "@/components/common/AOSWrapper";

/**
 * مكون عرض حالة المفضلة الفارغة
 * Empty Favorites State Component
 */
export default function FavoritesEmptyState() {
  return (
    <AOSWrapper animation="fade-up" delay={150} duration={800}>
      <div className="text-center py-20 md:py-28">
        <div className="max-w-md mx-auto">
          <div className="relative mb-8">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-32 h-32 bg-linear-to-br from-pink-100 to-purple-100 rounded-full blur-2xl opacity-50 animate-pulse"></div>
            </div>
            <Heart className="w-28 h-28 md:w-32 md:h-32 mx-auto text-gray-300 relative z-10 animate-pulse" />
          </div>
          <h2
            className="text-2xl md:text-3xl font-bold text-gray-800 mb-4"
          >
            لا توجد منتجات في المفضلة
          </h2>
          <p
            className="text-gray-600 mb-8 text-[15px] md:text-[16px] leading-relaxed"
          >
            ابدأ بإضافة المنتجات المفضلة لديك لتسهيل الوصول إليها لاحقاً
          </p>
          <Link
            href="/bouquets"
            className="inline-flex items-center gap-2 bg-[#5f664f] hover:bg-[#4A4E3D] text-white px-8 py-3.5 rounded-[10px] font-bold text-[22px] transition-all duration-300 hover:shadow-lg hover:scale-105 active:scale-95"
          >
            <Sparkles className="w-4 h-4" />
            تصفح الباقات
          </Link>
        </div>
      </div>
    </AOSWrapper>
  );
}

