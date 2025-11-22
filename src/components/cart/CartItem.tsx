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
      className={`bg-white rounded-[25px] p-4 sm:p-6 transition-all duration-300 shadow-[0_2px_8px_rgba(0,0,0,0.08)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.12)] hover:scale-[1.01] max-w-3xl ${
        isSelected ? "" : ""
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
          <div className="w-[142px] h-[155px] shrink-0">
            <Image
              src={item.image}
              alt={item.title}
              width={142}
              height={155}
              className="w-[142px] h-[155px] rounded-[15px] object-cover transition-all duration-300"
              loading="lazy"
            />
          </div>
        </div>

        {/* التفاصيل */}
        <div className="flex-1 min-w-0">
          {/* العنوان والأزرار في نفس السطر */}
          <div className="flex items-center justify-between gap-2 mb-2">
            <h3
              className="font-bold text-gray-800 text-[23px] line-clamp-2 flex-1 min-w-0"
              style={{ fontFamily: "var(--font-almarai)" }}
            >
              {item.title}
            </h3>
            <div className="flex gap-2 shrink-0">
              {canEdit && (
                <button
                  onClick={handleEdit}
                  className="bg-[#6e7b5a] text-white cursor-pointer px-3 py-2 h-[41px] rounded-[5px] transition-all duration-200 hover:bg-[#5a6550] hover:scale-105 flex items-center justify-center"
                  style={{ fontFamily: "var(--font-almarai)" }}
                >
                  <Pencil className="w-5 h-5" />
                </button>
              )}
              <button
                onClick={handleRemove}
                className="bg-[#e57373] text-white cursor-pointer px-3 py-2 h-[41px] rounded-[5px] transition-all duration-200 hover:bg-[#ef5350] hover:scale-105 flex items-center justify-center"
                style={{ fontFamily: "var(--font-almarai)" }}
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* عرض التفاصيل */}
          <div className="flex items-center gap-2 flex-wrap mb-2">
            {isCustom && (
              <span className="inline-block text-xs bg-linear-to-r from-[#5A5E4D]/10 to-[#4A4E3D]/10 text-[#5A5E4D] px-2 sm:px-3 py-1 sm:py-1.5 rounded-full font-medium border border-[#5A5E4D]/20">
                {CART_LABELS.CUSTOM_BOUQUET}
              </span>
            )}
            {hasDetails && (
              <button
                onClick={() => onToggleExpand(itemId)}
                className="text-[18px] text-[#727272] hover:bg-[#5A5E4D]/10 hover:text-[#4b5244] flex items-center gap-1 cursor-pointer px-2 py-1 rounded-lg transition-all duration-200 text-center"
                style={{ fontFamily: "var(--font-almarai)" }}
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
                              <div className="flex items-center gap-1">
                                <span className="text-sm font-bold text-[#5A5E4D]">
                                  +{cardAddonPrice.toFixed(2)}
                                </span>
                                <span className="text-xs text-[#5A5E4D]">
                                  {APP_CONFIG.CURRENCY}
                                </span>
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
                  )}
                </>
              )}
            </div>
          )}

          {/* السعر وعداد الكمية */}
          <div className="mt-3 pt-3">
            <div className="flex justify-between items-baseline mb-2">
              <div
                className="text-[18px] font-normal text-black text-right flex-1 leading-normal"
                style={{ fontFamily: "var(--font-almarai)" }}
              >
                {CART_LABELS.PRICE}
              </div>
              <div className="flex items-baseline justify-end gap-1.5 flex-1">
                <span
                  className="text-[18px] font-normal text-black text-right leading-normal"
                  style={{ fontFamily: "var(--font-almarai)" }}
                >
                  {itemPrice.toFixed(2)} {APP_CONFIG.CURRENCY}
                </span>
              </div>
            </div>
            <div className="h-px bg-gray-300 my-2"></div>

            {/* عداد الكمية */}
            <div className="flex justify-between items-center mb-2.5">
              <span
                className="text-[18px] font-normal text-black text-right flex-1 leading-normal"
                style={{ fontFamily: "var(--font-almarai)" }}
              >
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
              <span
                className="font-bold text-[20px] text-black text-right flex-1 leading-normal"
                style={{ fontFamily: "var(--font-almarai)" }}
              >
                {CART_LABELS.TOTAL_PRICE}
              </span>
              <div className="flex items-baseline justify-end gap-1.5 flex-1">
                <span
                  className="text-[20px] font-bold text-black text-right leading-normal"
                  style={{ fontFamily: "var(--font-almarai)" }}
                >
                  {itemTotal.toFixed(2)} {APP_CONFIG.CURRENCY}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
