/**
 * EmptyCart Component
 * مكون عرض السلة الفارغة
 */

import { useRouter } from "next/navigation";
import { CART_ICONS, CART_MESSAGES, CART_ROUTES } from "@/src/constants/cart";
import { COLORS } from "@/src/constants";

export default function EmptyCart() {
  const router = useRouter();

  const handleBrowseBouquets = () => {
    router.push(CART_ROUTES.BOUQUETS);
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-8 text-center">
      <div className="text-4xl mb-3">{CART_ICONS.EMPTY_CART}</div>
      <p className="text-gray-600">{CART_MESSAGES.EMPTY_CART}</p>
      <button
        onClick={handleBrowseBouquets}
        className="mt-4 px-6 py-2 text-white rounded-md hover:bg-[#4b5244] cursor-pointer transition-colors"
        style={{ backgroundColor: COLORS.PRIMARY }}
      >
        {CART_MESSAGES.BROWSE_BOUQUETS}
      </button>
    </div>
  );
}
