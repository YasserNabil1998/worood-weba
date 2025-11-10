/**
 * CartItem Component
 * مكون عرض عنصر في السلة
 */

import Image from "next/image";
import { ChevronUp, ChevronDown, Pencil, Trash2 } from "lucide-react";
import { CartItem as CartItemType } from "@/src/@types/cart/CartItem.type";
import { isCustomBouquet } from "@/src/@types/cart/CartItem.type";
import QuantitySelector from "@/src/components/QuantitySelector";
import CustomBouquetDetails from "./CustomBouquetDetails";
import { getItemId, getItemPrice, getItemTotal } from "@/src/lib/cartHelpers";
import { CART_LABELS, CART_SIZES } from "@/src/constants/cart";
import { APP_CONFIG, COLORS } from "@/src/constants";
import { PRODUCT_DATA } from "@/src/constants/productData";

interface CartItemProps {
  item: CartItemType;
  isSelected: boolean;
  isExpanded: boolean;
  onToggleSelect: (itemId: string | number) => void;
  onToggleExpand: (itemId: string | number) => void;
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

  const canEdit = isCustom ? Boolean(item.customData) : true;
  const hasDetails = isCustom ? Boolean(item.customData) : true;
  const cardAddonPrice = PRODUCT_DATA.addons.card.price;
  const chocolateAddonPrice = PRODUCT_DATA.addons.chocolate.price;
  const giftWrapAddonPrice = PRODUCT_DATA.addons.giftWrap.price;

  const hasAddons = item.addCard || item.addChocolate || item.giftWrap;

  const handleEdit = () => {
    onEdit(item);
  };

  const handleRemove = () => {
    onRemove(itemId);
  };

  return (
    <div
      className={`bg-white rounded-xl sm:rounded-2xl shadow-sm p-3 sm:p-6 transition-all duration-300 hover:shadow-lg hover:scale-[1.01] sm:hover:scale-[1.02] ${
        isSelected ? "shadow-lg ring-2 ring-[#5A5E4D]/20" : ""
      }`}
    >
      <div className="flex flex-col sm:flex-row gap-2.5 sm:gap-4">
        {/* Checkbox والصور */}
        <div className="flex gap-2.5 sm:gap-4">
          {/* Checkbox للاختيار */}
          <div className="flex items-start pt-0.5 sm:pt-2">
            <input
              type="checkbox"
              checked={isSelected}
              onChange={() => onToggleSelect(itemId)}
              className="h-5 w-5 rounded border-gray-300 cursor-pointer transition-all duration-200 hover:scale-110"
              style={{
                accentColor: COLORS.PRIMARY,
              }}
            />
          </div>

          {/* الصورة */}
          <div
            className={`${
              isCustom ? "w-19 h-19 sm:w-28 sm:h-28" : "w-18 h-18 sm:w-24 sm:h-24"
            } shrink-0`}
          >
            <Image
              src={item.image}
              alt={item.title}
              width={112}
              height={112}
              className={`rounded-xl sm:rounded-2xl object-cover shadow-md transition-all duration-300 hover:shadow-lg ${
                isCustom ? "h-19 sm:h-28" : "h-18 sm:h-24"
              }`}
              loading="lazy"
            />
          </div>
        </div>

        {/* التفاصيل */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 sm:gap-0 mb-2">
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-gray-800 text-base sm:text-lg md:text-xl mb-2 line-clamp-2">
                {item.title}
              </h3>
              <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
                {isCustom && (
                  <span className="inline-block text-xs bg-linear-to-r from-[#5A5E4D]/10 to-[#4A4E3D]/10 text-[#5A5E4D] px-2 sm:px-3 py-1 sm:py-1.5 rounded-full font-medium border border-[#5A5E4D]/20">
                    {CART_LABELS.CUSTOM_BOUQUET}
                  </span>
                )}
                {hasDetails && (
                  <button
                    onClick={() => onToggleExpand(itemId)}
                    className="text-xs text-[#5A5E4D] hover:bg-[#5A5E4D]/10 hover:text-[#4b5244] flex items-center gap-1 cursor-pointer px-2 py-1 rounded-lg transition-all duration-200"
                  >
                    {isExpanded ? (
                      <>
                        <span className="font-medium">{CART_LABELS.HIDE_DETAILS}</span>
                        <ChevronUp size={14} />
                      </>
                    ) : (
                      <>
                        <span className="font-medium">{CART_LABELS.SHOW_DETAILS}</span>
                        <ChevronDown size={14} />
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>
            <div className="flex gap-2 sm:gap-3 shrink-0">
              {canEdit && (
                <button
                  onClick={handleEdit}
                  className="text-[#5A5E4D] text-xs sm:text-sm hover:bg-[#5A5E4D]/10 hover:text-[#4b5244] cursor-pointer px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg transition-all duration-200 font-medium flex items-center gap-1"
                >
                  <Pencil className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  {CART_LABELS.EDIT}
                </button>
              )}
              <button
                onClick={handleRemove}
                className="text-red-600 text-xs sm:text-sm hover:bg-red-50 hover:text-red-700 cursor-pointer px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg transition-all duration-200 font-medium flex items-center gap-1"
              >
                <Trash2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                {CART_LABELS.DELETE}
              </button>
            </div>
          </div>

          {/* التفاصيل - باقة مخصصة أو عادية */}
          {isCustom && item.customData ? (
            <CustomBouquetDetails customData={item.customData} isExpanded={isExpanded} />
          ) : (
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

                  {hasAddons && (
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
                              <span className="text-xs font-semibold text-gray-700">
                                +{cardAddonPrice.toFixed(2)} {APP_CONFIG.CURRENCY}
                              </span>
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
                            <span>
                              +{chocolateAddonPrice.toFixed(2)} {APP_CONFIG.CURRENCY}
                            </span>
                          </div>
                        )}
                        {item.giftWrap && (
                          <div className="flex items-center justify-between rounded-lg bg-gray-50 px-3 py-2 text-xs font-semibold text-gray-700">
                            <span>تغليف هدية</span>
                            <span>
                              +{giftWrapAddonPrice.toFixed(2)} {APP_CONFIG.CURRENCY}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          )}

          {/* السعر وعداد الكمية */}
          <div className="mt-3 border-t pt-3 border-gray-200">
            <div className="flex justify-between items-center mb-2">
              <div className="text-xs sm:text-sm font-medium text-gray-600">
                {CART_LABELS.PRICE}
              </div>
              <div className="font-bold text-lg sm:text-xl bg-linear-to-r from-[#5A5E4D] to-[#4A4E3D] bg-clip-text text-transparent">
                {itemPrice.toFixed(2)} {APP_CONFIG.CURRENCY}
              </div>
            </div>

            {/* عداد الكمية */}
            <div className="flex justify-between items-center bg-linear-to-r from-gray-50 to-gray-100 rounded-lg sm:rounded-xl p-1.5 sm:p-3 mb-2.5">
              <span className="text-xs sm:text-sm font-semibold text-gray-700">
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
            <div className="flex justify_between items-center bg-linear-to-r from-[#5A5E4D]/5 to-[#4A4E3D]/5 rounded-lg sm:rounded-xl p-1.5 sm:p-3">
              <span className="font-bold text-sm sm:text-base text-gray-800">
                {CART_LABELS.TOTAL_PRICE}:
              </span>
              <span className="font-bold text-lg sm:text-xl" style={{ color: COLORS.PRIMARY }}>
                {itemTotal.toFixed(2)} {APP_CONFIG.CURRENCY}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
