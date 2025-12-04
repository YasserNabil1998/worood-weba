"use client";

import { CartItem as CartItemType } from "@/src/@types/cart/CartItem.type";
import { CART_LABELS } from "@/src/constants/cart";
import { APP_CONFIG } from "@/src/constants";
import { PRODUCT_DATA } from "@/src/constants/productData";

interface CartItemAddonsProps {
  item: CartItemType;
}

export default function CartItemAddons({ item }: CartItemAddonsProps) {
  const hasAddons = item.addCard || item.addChocolate || item.giftWrap;
  const cardAddonPrice = PRODUCT_DATA.addons.card.price;
  const chocolateAddonPrice = PRODUCT_DATA.addons.chocolate.price;
  const giftWrapAddonPrice = PRODUCT_DATA.addons.giftWrap.price;

  if (!hasAddons) return null;

  return (
    <div className="space-y-2">
      <span className="text-[11px] font-semibold uppercase tracking-wide text-gray-500">
        إضافات المنتج
      </span>
      <div className="flex flex-col gap-2">
        {item.addCard && (
          <div className="flex flex-col gap-1 rounded-lg bg-gray-50 px-3 py-2 text-xs text-gray-700">
            <div className="flex items-center justify-between gap-4">
              <span className="text-xs font-semibold text-[#5A5E4D]">
                {CART_LABELS.GREETING_CARD}
              </span>
              <div className="flex items-center gap-1">
                <span className="text-sm font-bold text-[#5A5E4D]">
                  +{cardAddonPrice.toFixed(2)}
                </span>
                <span className="text-xs text-[#5A5E4D]">{APP_CONFIG.CURRENCY}</span>
              </div>
            </div>
            <span className="text-xs text-gray-600">
              {item.cardMessage && item.cardMessage.trim().length > 0
                ? item.cardMessage
                : CART_LABELS.NO_MESSAGE}
            </span>
          </div>
        )}
        {item.addChocolate && (
          <div className="flex items-center justify-between rounded-lg bg-gray-50 px-3 py-2 text-xs font-semibold text-gray-700">
            <span>إضافة شوكولاتة</span>
            <div className="flex items-center gap-1">
              <span className="text-sm font-bold text-[#5A5E4D]">
                +{chocolateAddonPrice.toFixed(2)}
              </span>
              <span className="text-xs text-[#5A5E4D]">{APP_CONFIG.CURRENCY}</span>
            </div>
          </div>
        )}
        {item.giftWrap && (
          <div className="flex items-center justify-between rounded-lg bg-gray-50 px-3 py-2 text-xs font-semibold text-gray-700">
            <span>تغليف هدية</span>
            <div className="flex items-center gap-1">
              <span className="text-sm font-bold text-[#5A5E4D]">
                +{giftWrapAddonPrice.toFixed(2)}
              </span>
              <span className="text-xs text-[#5A5E4D]">{APP_CONFIG.CURRENCY}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

