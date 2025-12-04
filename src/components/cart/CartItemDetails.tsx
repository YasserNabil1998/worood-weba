"use client";

import { CartItem as CartItemType } from "@/src/@types/cart/CartItem.type";
import { CART_LABELS, CART_SIZES } from "@/src/constants/cart";
import CartItemAddons from "./CartItemAddons";

interface CartItemDetailsProps {
  item: CartItemType;
  isExpanded: boolean;
}

export default function CartItemDetails({ item, isExpanded }: CartItemDetailsProps) {
  return (
    <div
      className={`transition-all duration-300 ${
        isExpanded ? "mt-3 space-y-4 opacity-100" : "h-0 overflow-hidden opacity-0"
      }`}
    >
      {isExpanded && (
        <>
          <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm text-gray-700">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-gray-800">{CART_LABELS.SIZE}:</span>
              <span className="inline-flex items-center px-2.5 py-1 text-xs font-semibold text-[#5A5E4D]">
                {item.size && CART_SIZES[item.size as keyof typeof CART_SIZES]
                  ? CART_SIZES[item.size as keyof typeof CART_SIZES]
                  : item.size}
              </span>
            </div>
            {item.style && (
              <div className="flex items-center gap-2">
                <span className="font-semibold text-gray-800">{CART_LABELS.WRAPPING}:</span>
                <span className="inline-flex items-center px-2.5 py-1 text-xs font-semibold text-gray-700">
                  {item.style}
                </span>
              </div>
            )}
          </div>

          {item.color && (
            <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-700">
              <span className="font-semibold text-gray-800">{CART_LABELS.COLOR}:</span>
              <span className="inline-flex items-center gap-2 text-xs font-semibold text-gray-700">
                <span
                  className="inline-block h-3 w-3 rounded-full border border-gray-200"
                  style={{
                    backgroundColor: item.color,
                  }}
                />
                <span>{item.colorLabel || item.colorValue || item.color}</span>
              </span>
            </div>
          )}

          <CartItemAddons item={item} />
        </>
      )}
    </div>
  );
}

