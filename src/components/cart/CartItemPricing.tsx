"use client";

import { CartItem as CartItemType } from "@/types/cart";
import QuantitySelector from "@/components/product/QuantitySelector";
import { CART_LABELS } from "@/constants/cart";
import { APP_CONFIG } from "@/constants";
import { getItemId, getItemPrice, getItemTotal } from "@/lib/utils/cart";

interface CartItemPricingProps {
  item: CartItemType;
  onUpdateQuantity: (itemId: string | number, quantity: number) => void;
}

export default function CartItemPricing({ item, onUpdateQuantity }: CartItemPricingProps) {
  const itemId = getItemId(item);
  const itemPrice = getItemPrice(item);
  const itemTotal = getItemTotal(item);

  return (
    <div className="mt-3 pt-3">
      <div className="flex justify-between items-baseline mb-2">
        <div className="text-[18px] font-normal text-black text-right flex-1 leading-normal">
          {CART_LABELS.PRICE}
        </div>
        <div className="flex items-baseline justify-end gap-1.5 flex-1">
          <span className="text-[18px] font-normal text-black text-right leading-normal">
            {itemPrice.toFixed(2)} {APP_CONFIG.CURRENCY}
          </span>
        </div>
      </div>
      <div className="h-px bg-gray-300 my-2"></div>

      {/* عداد الكمية */}
      <div className="flex justify-between items-center mb-2.5">
        <span className="text-[18px] font-normal text-black text-right flex-1 leading-normal">
          {CART_LABELS.QUANTITY}
        </span>
        <div className="flex-1 flex justify-end items-center">
          <QuantitySelector
            itemId={itemId}
            initialQuantity={item.quantity || 1}
            productData={item}
            onQuantityChange={onUpdateQuantity}
          />
        </div>
      </div>
      <div className="h-px bg-gray-300 my-2"></div>

      {/* إجمالي السعر للكمية */}
      <div className="flex justify-between items-baseline">
        <span className="font-bold text-[20px] text-black text-right flex-1 leading-normal">
          {CART_LABELS.TOTAL_PRICE}
        </span>
        <div className="flex items-baseline justify-end gap-1.5 flex-1">
          <span className="text-[20px] font-bold text-black text-right leading-normal">
            {itemTotal.toFixed(2)} {APP_CONFIG.CURRENCY}
          </span>
        </div>
      </div>
    </div>
  );
}

