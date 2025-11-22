/**
 * CartSummary Component
 * مكون ملخص الطلب
 */

import Link from "next/link";
import { AlertTriangle } from "lucide-react";
import { CartTotals } from "@/src/@types/cart/CartItem.type";
import { CartItem } from "@/src/@types/cart/CartItem.type";
import { CART_MESSAGES, CART_ROUTES } from "@/src/constants/cart";
import { APP_CONFIG, STORAGE_KEYS } from "@/src/constants";
import { storage } from "@/src/lib/utils";

interface CartSummaryProps {
  totals: CartTotals;
  totalItems: number;
  selectedItems: CartItem[];
}

export default function CartSummary({ totals, totalItems, selectedItems }: CartSummaryProps) {
  const { subtotal, vat, total, itemsCount, totalItemsCount } = totals;

  const handleProceedToCheckout = () => {
    // حفظ المنتجات المختارة فقط للـ checkout
    storage.set(STORAGE_KEYS.CHECKOUT_ITEMS, selectedItems);
  };

  return (
    <aside className="bg-white rounded-[25px] p-6 h-fit">
      <div className="mb-6">
        <h2
          className="text-[25px] font-bold text-black text-right mb-4"
          style={{ fontFamily: "var(--font-almarai)" }}
        >
          {CART_MESSAGES.ORDER_SUMMARY}
        </h2>
        <div className="flex justify-between items-center mb-4">
          <span 
            className="text-[22px] font-bold text-black text-right"
            style={{ fontFamily: "var(--font-almarai)" }}
          >
            {CART_MESSAGES.SELECTED_PRODUCTS}
          </span>
          <span 
            className="text-[22px] font-bold text-[#58614c] text-right"
            style={{ fontFamily: "var(--font-almarai)" }}
          >
            {itemsCount} من {totalItems}
          </span>
        </div>
        <div className="h-px bg-gray-300 mb-4"></div>
      </div>
      <div className="space-y-4">
        {itemsCount === 0 ? (
          <div className="bg-[#fcfcfc] rounded-[10px] p-6 text-center">
            <div className="flex justify-center mb-4">
              <AlertTriangle className="w-8 h-8 text-yellow-600" />
            </div>
            <p 
              className="text-[18px] font-normal text-[#857f7f]"
              style={{ fontFamily: "var(--font-almarai)" }}
            >
              {CART_MESSAGES.SELECT_AT_LEAST_ONE}
            </p>
          </div>
        ) : (
          <div className="bg-gray-50 rounded-[10px] p-6 space-y-4">
            <div className="flex justify-between items-center">
              <span 
                className="text-[18px] font-normal text-black text-right"
                style={{ fontFamily: "var(--font-almarai)" }}
              >
                المبلغ
              </span>
              <span 
                className="text-[22px] font-bold text-[#a1a1a1] text-right"
                style={{ fontFamily: "var(--font-almarai)" }}
              >
                {subtotal.toFixed(2)} {APP_CONFIG.CURRENCY}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span 
                className="text-[18px] font-normal text-black text-right"
                style={{ fontFamily: "var(--font-almarai)" }}
              >
                {CART_MESSAGES.VAT} ({(APP_CONFIG.VAT_RATE * 100).toFixed(0)}%)
              </span>
              <span 
                className="text-[22px] font-bold text-[#a1a1a1] text-right"
                style={{ fontFamily: "var(--font-almarai)" }}
              >
                {vat.toFixed(2)} {APP_CONFIG.CURRENCY}
              </span>
            </div>
            <div className="h-px bg-gray-300 my-4"></div>
            <div className="flex justify-between items-center">
              <span 
                className="text-[22px] font-bold text-black text-right"
                style={{ fontFamily: "var(--font-almarai)" }}
              >
                {CART_MESSAGES.TOTAL}
              </span>
              <span 
                className="text-[22px] font-bold text-[#a1a1a1] text-right"
                style={{ fontFamily: "var(--font-almarai)" }}
              >
                {total.toFixed(2)} {APP_CONFIG.CURRENCY}
              </span>
            </div>
          </div>
        )}
      </div>
      {itemsCount === 0 ? (
        <button
          disabled
          className="mt-6 w-full rounded-[10px] py-4 bg-[#a9a7a3] text-white font-bold text-[22px] cursor-not-allowed"
          style={{ fontFamily: "var(--font-almarai)" }}
        >
          {CART_MESSAGES.PROCEED_TO_CHECKOUT}
        </button>
      ) : (
        <Link
          href={CART_ROUTES.CHECKOUT}
          onClick={handleProceedToCheckout}
          className="mt-6 w-full rounded-[10px] py-4 bg-[#5f664f] text-white font-bold text-[22px] hover:opacity-90 transition-opacity text-center block"
          style={{ fontFamily: "var(--font-almarai)" }}
        >
          متابعة للدفع
        </Link>
      )}
    </aside>
  );
}
