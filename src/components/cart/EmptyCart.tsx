/**
 * EmptyCart Component
 * مكون عرض السلة الفارغة
 */

import { useRouter } from "next/navigation";
import { ShoppingCart, Sparkles } from "lucide-react";
import { CART_MESSAGES, CART_ROUTES } from "@/src/constants/cart";
import { COLORS } from "@/src/constants";

export default function EmptyCart() {
  const router = useRouter();

  const handleBrowseBouquets = () => {
    router.push(CART_ROUTES.BOUQUETS);
  };

  return (
    <div className="bg-white rounded-xl sm:rounded-2xl border border-gray-200 shadow-lg p-8 sm:p-12 text-center">
      <div className="bg-gradient-to-br from-[#5A5E4D]/10 to-[#4A4E3D]/10 rounded-full w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center mx-auto mb-4 sm:mb-6">
        <ShoppingCart className="w-10 h-10 sm:w-12 sm:h-12 text-[#5A5E4D]" />
      </div>
      <h2
        className="text-xl sm:text-2xl font-bold text-gray-800 mb-2 sm:mb-3"
        style={{ fontFamily: "var(--font-almarai)" }}
      >
        {CART_MESSAGES.EMPTY_CART}
      </h2>
      <p className="text-gray-600 mb-6 sm:mb-8 text-base sm:text-lg">
        ابدأ رحلتك مع أجمل الباقات
      </p>
      <button
        onClick={handleBrowseBouquets}
        className="px-6 sm:px-8 py-3 sm:py-4 text-white rounded-lg sm:rounded-xl hover:shadow-lg hover:scale-105 cursor-pointer transition-all duration-300 font-bold text-base sm:text-lg bg-gradient-to-r from-[#5A5E4D] to-[#4A4E3D] hover:from-[#4A4E3D] hover:to-[#3A3E2D] flex items-center justify-center gap-2 mx-auto"
      >
        <Sparkles className="w-4 h-4 sm:w-5 sm:h-5" />
        {CART_MESSAGES.BROWSE_BOUQUETS}
      </button>
    </div>
  );
}
