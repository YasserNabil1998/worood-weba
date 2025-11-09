import Link from "next/link";
import { Lock, ShoppingCart, AlertTriangle } from "lucide-react";
import { CartTotals } from "@/src/@types/cart/CartItem.type";
import { CartItem } from "@/src/@types/cart/CartItem.type";
import { CART_MESSAGES, CART_ROUTES } from "@/src/constants/cart";
import { APP_CONFIG, COLORS } from "@/src/constants";
import { useCartStore } from "@/src/stores/cartStore";

interface CartSummaryProps {
  totals: CartTotals;
  totalItems: number;
  selectedItems: CartItem[];
}

export default function CartSummary({ totals, totalItems, selectedItems }: CartSummaryProps) {
  const { subtotal, vat, total, itemsCount, totalItemsCount } = totals;
  const setCheckoutItems = useCartStore((state) => state.setCheckoutItems);

  const handleProceedToCheckout = () => {
    setCheckoutItems(selectedItems);
  };

  return (
    <aside className="bg-white rounded-xl sm:rounded-2xl border border-gray-200 shadow-lg p-4 sm:p-6 h-fit lg:sticky lg:top-24">
      <div className="bg-gradient-to-r from-[#5A5E4D] to-[#4A4E3D] rounded-lg sm:rounded-xl p-3 sm:p-4 mb-4 sm:mb-6 -m-2">
        <h2
          className="text-lg sm:text-xl font-bold text-white text-center"
          style={{ fontFamily: "var(--font-almarai)" }}
        >
          {CART_MESSAGES.ORDER_SUMMARY}
        </h2>
      </div>
      <div className="space-y-3 sm:space-y-4 text-sm">
        <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg sm:rounded-xl p-3 sm:p-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs sm:text-sm font-semibold text-gray-700">
              {CART_MESSAGES.SELECTED_PRODUCTS}
            </span>
            <span className="font-bold text-base sm:text-lg bg-gradient-to-r from-[#5A5E4D] to-[#4A4E3D] bg-clip-text text-transparent">
              {itemsCount} من {totalItems}
            </span>
          </div>
          {totalItemsCount > itemsCount && (
            <div className="flex justify-between items-center pt-2 border-t border-gray-300">
              <span className="text-xs sm:text-sm font-medium text-gray-600">
                {CART_MESSAGES.TOTAL_QUANTITY}
              </span>
              <span className="font-bold text-sm sm:text-base text-[#5A5E4D]">
                {totalItemsCount} {CART_MESSAGES.PIECES}
              </span>
            </div>
          )}
        </div>
        {itemsCount === 0 ? (
          <div className="text-center py-4 sm:py-6 text-gray-500 bg-gray-50 rounded-lg sm:rounded-xl">
            <AlertTriangle className="w-5 h-5 sm:w-6 sm:h-6 mx-auto mb-2 text-yellow-600" />
            <p className="text-xs sm:text-sm font-medium">{CART_MESSAGES.SELECT_AT_LEAST_ONE}</p>
          </div>
        ) : (
          <div className="space-y-2 sm:space-y-3">
            <div className="flex justify-between items-center bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg p-2 sm:p-3">
              <span className="text-xs sm:text-sm font-medium text-gray-700">
                {CART_MESSAGES.SUBTOTAL}
              </span>
              <span className="font-bold text-sm sm:text-lg">
                {subtotal.toFixed(2)} {APP_CONFIG.CURRENCY}
              </span>
            </div>
            <div className="flex justify-between items-center bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg p-2 sm:p-3">
              <span className="text-xs sm:text-sm font-medium text-gray-700">
                {CART_MESSAGES.VAT} ({(APP_CONFIG.VAT_RATE * 100).toFixed(0)}%)
              </span>
              <span className="font-bold text-sm sm:text-lg">
                {vat.toFixed(2)} {APP_CONFIG.CURRENCY}
              </span>
            </div>
            <div className="flex justify-between items-center font-bold pt-2 sm:pt-3 text-base sm:text-lg border-t-2 border-[#5A5E4D] mt-2 sm:mt-4 bg-gradient-to-r from-[#5A5E4D]/5 to-[#4A4E3D]/5 rounded-lg sm:rounded-xl p-3 sm:p-4">
              <span className="text-gray-800">{CART_MESSAGES.TOTAL}</span>
              <span className="text-xl sm:text-2xl bg-gradient-to-r from-[#5A5E4D] to-[#4A4E3D] bg-clip-text text-transparent">
                {total.toFixed(2)} {APP_CONFIG.CURRENCY}
              </span>
            </div>
          </div>
        )}
      </div>
      {itemsCount === 0 ? (
        <button
          disabled
          className="mt-4 sm:mt-6 w-full rounded-lg sm:rounded-xl py-3 sm:py-4 transition-all duration-200 bg-gray-200 text-gray-500 cursor-not-allowed font-bold text-sm sm:text-lg shadow-sm flex items-center justify-center gap-2"
        >
          <Lock className="w-4 h-4 sm:w-5 sm:h-5" />
          {CART_MESSAGES.PROCEED_TO_CHECKOUT}
        </button>
      ) : (
        <Link
          href={CART_ROUTES.CHECKOUT}
          onClick={handleProceedToCheckout}
          className="mt-4 sm:mt-6 w-full rounded-lg sm:rounded-xl py-3 sm:py-4 transition-all duration-300 text-white hover:shadow-lg hover:scale-105 cursor-pointer text-center font-bold text-sm sm:text-lg bg-gradient-to-r from-[#5A5E4D] to-[#4A4E3D] hover:from-[#4A4E3D] hover:to-[#3A3E2D] flex items-center justify-center gap-2"
        >
          <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5" />
          {CART_MESSAGES.PROCEED_TO_CHECKOUT} ({totalItemsCount} {CART_MESSAGES.PIECES})
        </Link>
      )}
    </aside>
  );
}
