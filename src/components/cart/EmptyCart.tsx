/**
 * EmptyCart Component
 * مكون عرض السلة الفارغة
 */

import { useRouter } from "next/navigation";
import { ShoppingCart } from "lucide-react";
import { CART_MESSAGES, CART_ROUTES } from "@/src/constants/cart";

export default function EmptyCart() {
  const router = useRouter();

  const handleBrowseBouquets = () => {
    router.push(CART_ROUTES.BOUQUETS);
  };

  return (
    <div className="bg-white rounded-[25px] p-12 text-center min-h-[794px] flex flex-col items-center justify-center">
      <div className="w-[124px] h-[124px] rounded-full bg-gray-100 flex items-center justify-center mb-8">
        <div className="w-[63px] h-[63px] opacity-80">
          <ShoppingCart className="w-full h-full text-[#5A5E4D]" />
        </div>
      </div>
      <h2
        className="text-[22px] font-bold text-black mb-4"
        style={{ fontFamily: "var(--font-almarai)" }}
      >
        {CART_MESSAGES.EMPTY_CART}
      </h2>
      <p 
        className="text-[17px] font-normal text-[#858585] mb-8"
        style={{ fontFamily: "var(--font-almarai)" }}
      >
        ابدأ رحلتك مع أجمل الباقات
      </p>
      <button
        onClick={handleBrowseBouquets}
        className="bg-[#58614c] text-white rounded-[10px] px-8 py-4 font-bold text-[22px] hover:opacity-90 transition-opacity"
        style={{ fontFamily: "var(--font-almarai)" }}
      >
        {CART_MESSAGES.BROWSE_BOUQUETS}
      </button>
    </div>
  );
}
