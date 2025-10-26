/**
 * CartSummary Component
 * مكون ملخص الطلب
 */

import Link from "next/link";
import { CartTotals } from "@/src/@types/cart/CartItem.type";
import { CartItem } from "@/src/@types/cart/CartItem.type";
import { CART_MESSAGES, CART_ROUTES } from "@/src/constants/cart";
import { APP_CONFIG, STORAGE_KEYS, COLORS } from "@/src/constants";
import { storage } from "@/src/lib/utils";

interface CartSummaryProps {
  totals: CartTotals;
  totalItems: number;
  selectedItems: CartItem[];
}

export default function CartSummary({
  totals,
  totalItems,
  selectedItems,
}: CartSummaryProps) {
  const { subtotal, vat, total, itemsCount, totalItemsCount } = totals;

  const handleProceedToCheckout = () => {
    // حفظ المنتجات المختارة فقط للـ checkout
    storage.set(STORAGE_KEYS.CHECKOUT_ITEMS, selectedItems);
  };

  return (
    <aside className="bg-white rounded-2xl border border-gray-200 shadow-sm p-4 h-fit">
      <h2
        className="text-lg font-semibold mb-3"
        style={{ fontFamily: "var(--font-almarai)" }}
      >
        {CART_MESSAGES.ORDER_SUMMARY}
      </h2>
      <div className="space-y-2 text-sm">
        <div className="flex justify-between text-xs text-gray-500 mb-2 pb-2 border-b border-gray-200">
          <span>{CART_MESSAGES.SELECTED_PRODUCTS}</span>
          <span className="font-semibold">
            {itemsCount} من {totalItems}
          </span>
        </div>
        {totalItemsCount > itemsCount && (
          <div className="flex justify-between text-xs text-gray-500 mb-2 pb-2 border-b border-gray-200">
            <span>{CART_MESSAGES.TOTAL_QUANTITY}</span>
            <span className="font-semibold">
              {totalItemsCount} {CART_MESSAGES.PIECES}
            </span>
          </div>
        )}
        {itemsCount === 0 ? (
          <div className="text-center py-4 text-gray-500 text-xs">
            {CART_MESSAGES.SELECT_AT_LEAST_ONE}
          </div>
        ) : (
          <>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">{CART_MESSAGES.SUBTOTAL}</span>
              <span className="font-semibold">
                {subtotal.toFixed(2)} {APP_CONFIG.CURRENCY}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">
                {CART_MESSAGES.VAT} ({(APP_CONFIG.VAT_RATE * 100).toFixed(0)}%)
              </span>
              <span className="font-semibold">
                {vat.toFixed(2)} {APP_CONFIG.CURRENCY}
              </span>
            </div>
            <div className="flex justify-between font-bold pt-2 text-base border-t border-gray-200 mt-2">
              <span>{CART_MESSAGES.TOTAL}</span>
              <span style={{ color: COLORS.PRIMARY }}>
                {total.toFixed(2)} {APP_CONFIG.CURRENCY}
              </span>
            </div>
          </>
        )}
      </div>
      {itemsCount === 0 ? (
        <button
          disabled
          className="mt-4 w-full rounded-md py-2 transition-colors bg-gray-300 text-gray-500 cursor-not-allowed"
        >
          {CART_MESSAGES.PROCEED_TO_CHECKOUT}
        </button>
      ) : (
        <Link
          href={CART_ROUTES.CHECKOUT}
          onClick={handleProceedToCheckout}
          className="mt-4 w-full rounded-md py-2 transition-colors text-white hover:bg-[#4b5244] cursor-pointer block text-center"
          style={{ backgroundColor: COLORS.PRIMARY }}
        >
          {CART_MESSAGES.PROCEED_TO_CHECKOUT} ({totalItemsCount}{" "}
          {CART_MESSAGES.PIECES})
        </Link>
      )}
    </aside>
  );
}
