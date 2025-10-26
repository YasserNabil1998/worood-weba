/**
 * CartItem Component
 * مكون عرض عنصر في السلة
 */

import Image from "next/image";
import { ChevronUp, ChevronDown } from "lucide-react";
import { CartItem as CartItemType } from "@/src/@types/cart/CartItem.type";
import { isCustomBouquet } from "@/src/@types/cart/CartItem.type";
import QuantitySelector from "@/src/components/QuantitySelector";
import CustomBouquetDetails from "./CustomBouquetDetails";
import { getItemId, getItemPrice, getItemTotal } from "@/src/lib/cartHelpers";
import { CART_LABELS, CART_SIZES } from "@/src/constants/cart";
import { APP_CONFIG, COLORS } from "@/src/constants";

interface CartItemProps {
  item: CartItemType;
  isSelected: boolean;
  isExpanded: boolean;
  onToggleSelect: (itemId: number) => void;
  onToggleExpand: (itemId: number) => void;
  onUpdateQuantity: (itemId: string | number, quantity: number) => void;
  onRemove: (itemId: string | number) => void;
  onEdit: (item: CartItemType) => void;
}

export default function CartItem({
  item,
  isSelected,
  isExpanded,
  onToggleSelect,
  onToggleExpand,
  onUpdateQuantity,
  onRemove,
  onEdit,
}: CartItemProps) {
  const itemId = getItemId(item);
  const itemPrice = getItemPrice(item);
  const itemTotal = getItemTotal(item);
  const isCustom = isCustomBouquet(item);

  const handleEdit = () => {
    if (isCustom) {
      onEdit(item);
    }
  };

  const handleRemove = () => {
    onRemove(itemId);
  };

  return (
    <div
      className={`bg-white rounded-lg border shadow-sm p-4 transition-all ${
        isSelected ? "border-[#d1d4ca] shadow" : "border-gray-200"
      }`}
    >
      <div className="flex gap-4">
        {/* Checkbox للاختيار */}
        <div className="flex items-start pt-2">
          <input
            type="checkbox"
            checked={isSelected}
            onChange={() => onToggleSelect(item.id)}
            className="h-5 w-5 rounded border-gray-300 cursor-pointer"
            style={{
              accentColor: COLORS.PRIMARY,
            }}
          />
        </div>

        {/* الصورة */}
        <div className={`${isCustom ? "w-24 h-24" : ""}`}>
          <Image
            src={item.image}
            alt={item.title}
            width={96}
            height={96}
            className={`rounded-lg object-cover ${isCustom ? "h-24" : ""}`}
            loading="lazy"
          />
        </div>

        {/* التفاصيل */}
        <div className="flex-1">
          <div className="flex justify-between items-start mb-2">
            <div className="flex-1">
              <h3 className="font-semibold text-gray-800 text-lg">
                {item.title}
              </h3>
              <div className="flex items-center gap-2 mt-1">
                {isCustom && (
                  <span className="inline-block text-xs bg-[#5A5E4D]/10 text-[#5A5E4D] px-2 py-1 rounded">
                    {CART_LABELS.CUSTOM_BOUQUET}
                  </span>
                )}
                {isCustom && item.customData && (
                  <button
                    onClick={() => onToggleExpand(item.id)}
                    className="text-xs text-[#5A5E4D] hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    {isExpanded ? (
                      <>
                        <span>{CART_LABELS.HIDE_DETAILS}</span>
                        <ChevronUp size={14} />
                      </>
                    ) : (
                      <>
                        <span>{CART_LABELS.SHOW_DETAILS}</span>
                        <ChevronDown size={14} />
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>
            <div className="flex gap-2">
              {isCustom && item.customData && (
                <button
                  onClick={handleEdit}
                  className="text-[#5A5E4D] text-sm hover:text-[#4b5244] cursor-pointer"
                >
                  {CART_LABELS.EDIT}
                </button>
              )}
              <button
                onClick={handleRemove}
                className="text-red-600 text-sm hover:text-red-700 cursor-pointer"
              >
                {CART_LABELS.DELETE}
              </button>
            </div>
          </div>

          {/* التفاصيل - باقة مخصصة أو عادية */}
          {isCustom && item.customData ? (
            <CustomBouquetDetails
              customData={item.customData}
              isExpanded={isExpanded}
            />
          ) : (
            // تفاصيل الباقات الجاهزة
            <div className="text-sm text-gray-600">
              {CART_LABELS.SIZE}:{" "}
              {item.size && CART_SIZES[item.size as keyof typeof CART_SIZES]
                ? CART_SIZES[item.size as keyof typeof CART_SIZES]
                : item.size}
              {item.style && (
                <>
                  {" "}
                  • {CART_LABELS.WRAPPING}: {item.style}
                </>
              )}
              {item.color && (
                <>
                  {" "}
                  • {CART_LABELS.COLOR}:{" "}
                  <span
                    className="inline-block h-3 w-3 rounded-full align-middle"
                    style={{
                      backgroundColor: item.color,
                    }}
                  ></span>
                </>
              )}
            </div>
          )}

          {/* السعر وعداد الكمية */}
          <div className="mt-3 border-t pt-3 border-gray-200">
            <div className="flex justify-between items-center mb-2">
              <div className="text-xs text-gray-500">{CART_LABELS.PRICE}</div>
              <div
                className="font-bold text-lg"
                style={{ color: COLORS.PRIMARY }}
              >
                {itemPrice.toFixed(2)} {APP_CONFIG.CURRENCY}
              </div>
            </div>

            {/* عداد الكمية */}
            <div className="flex justify-between items-center bg-gray-50 rounded-md p-2">
              <span className="text-xs font-medium text-gray-600">
                {CART_LABELS.QUANTITY}
              </span>
              <QuantitySelector
                itemId={itemId}
                initialQuantity={item.quantity || 1}
                productData={item}
                onQuantityChange={onUpdateQuantity}
              />
            </div>

            {/* إجمالي السعر للكمية */}
            <div className="flex justify-between items-center mt-2 text-sm">
              <span className="font-medium text-gray-700">
                {CART_LABELS.TOTAL_PRICE}:
              </span>
              <span className="font-bold" style={{ color: COLORS.PRIMARY }}>
                {itemTotal.toFixed(2)} {APP_CONFIG.CURRENCY}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
