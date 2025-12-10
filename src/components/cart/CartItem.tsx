"use client";

import { useState, memo } from "react";
import Image from "next/image";
import { ChevronUp, ChevronDown, Pencil, Trash2 } from "lucide-react";
import type { CartItem as CartItemType } from "@/types/cart";
import { isCustomBouquet } from "@/types/cart";
import CustomBouquetDetails from "./CustomBouquetDetails";
import DeleteConfirmationModal from "./DeleteConfirmationModal";
import CartItemDetails from "./CartItemDetails";
import CartItemPricing from "./CartItemPricing";
import { getItemId } from "@/lib/utils/cart";
import { CART_LABELS } from "@/constants/cart";
import { COLORS, CUSTOM_BOUQUET_PREVIEW_IMAGE, SIZES } from "@/constants";
import { fontStyle } from "@/lib/styles";
import { getButtonStyles, getButtonInlineStyles } from "@/lib/buttonStyles";

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

function CartItem({
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
  const isCustom = isCustomBouquet(item);
  const displayImage = isCustom ? item.image || CUSTOM_BOUQUET_PREVIEW_IMAGE : item.image;

  const canEdit = isCustom ? Boolean(item.customData) : true;
  const hasDetails = isCustom ? Boolean(item.customData) : true;
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleEdit = () => {
    onEdit(item);
  };

  const handleRemoveClick = () => {
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    onRemove(itemId);
    setShowDeleteModal(false);
  };

  const handleCloseModal = () => {
    setShowDeleteModal(false);
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
          <div
            className="shrink-0 rounded-[15px]"
            style={{ width: `${SIZES.CART_IMAGE_WIDTH}px`, height: `${SIZES.CART_IMAGE_HEIGHT}px` }}
          >
            <Image
              src={displayImage}
              alt={item.title}
              width={SIZES.CART_IMAGE_WIDTH}
              height={SIZES.CART_IMAGE_HEIGHT}
              className="rounded-[15px] object-cover transition-all duration-300"
              style={{
                width: `${SIZES.CART_IMAGE_WIDTH}px`,
                height: `${SIZES.CART_IMAGE_HEIGHT}px`,
              }}
              loading="lazy"
            />
          </div>
        </div>

        {/* التفاصيل */}
        <div className="flex-1 min-w-0">
          {/* العنوان والأزرار في نفس السطر */}
          <div className="flex items-center justify-between gap-2 mb-2">
            <h3
              className="font-bold text-gray-800 text-responsive-xl line-clamp-2 flex-1 min-w-0"
              style={fontStyle}
            >
              {item.title}
            </h3>
            <div className="flex gap-2 shrink-0">
              {canEdit && (
                <button
                  onClick={handleEdit}
                  className={getButtonStyles.edit()}
                  style={{ ...fontStyle, ...getButtonInlineStyles.edit() }}
                  aria-label={`تعديل ${item.title}`}
                >
                  <Pencil className="w-5 h-5" />
                </button>
              )}
              <button
                onClick={handleRemoveClick}
                className={getButtonStyles.delete()}
                style={{ ...fontStyle, ...getButtonInlineStyles.delete() }}
                aria-label={`حذف ${item.title}`}
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* عرض التفاصيل */}
          <div className="flex items-center gap-2 flex-wrap mb-2">
            {isCustom && (
              <span className="inline-block text-xs bg-gradient-to-r from-[#5A5E4D]/10 to-[#4A4E3D]/10 text-[#5A5E4D] px-2 sm:px-3 py-1 sm:py-1.5 rounded-full font-medium border border-[#5A5E4D]/20">
                {CART_LABELS.CUSTOM_BOUQUET}
              </span>
            )}
            {hasDetails && (
              <button
                onClick={() => onToggleExpand(itemId)}
                className="text-[18px] text-[#727272] hover:bg-[#5A5E4D]/10 hover:text-[#4b5244] flex items-center gap-1 cursor-pointer px-2 py-1 rounded-lg transition-all duration-200 text-center"
                style={fontStyle}
                aria-label={isExpanded ? "إخفاء التفاصيل" : "عرض التفاصيل"}
                aria-expanded={isExpanded}
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
            <CartItemDetails item={item} isExpanded={isExpanded} />
          )}

          {/* السعر وعداد الكمية */}
          <CartItemPricing item={item} onUpdateQuantity={onUpdateQuantity} />
        </div>
      </div>

      {/* بوب أب تأكيد الحذف */}
      <DeleteConfirmationModal
        isOpen={showDeleteModal}
        onClose={handleCloseModal}
        onConfirm={handleConfirmDelete}
        itemTitle={item.title}
      />
    </div>
  );
}

export default memo(CartItem, (prevProps, nextProps) => {
  // Custom comparison function for better performance
  return (
    prevProps.item.id === nextProps.item.id &&
    prevProps.item.quantity === nextProps.item.quantity &&
    prevProps.isSelected === nextProps.isSelected &&
    prevProps.isExpanded === nextProps.isExpanded
  );
});
