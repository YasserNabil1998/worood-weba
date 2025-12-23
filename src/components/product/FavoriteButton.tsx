"use client";

import { useNotification } from "@/providers/notification-provider";
import { useFavorites } from "@/hooks/useFavorites";
import { useRequireAuth } from "@/hooks/useRequireAuth";
import { Heart } from "lucide-react";
import { BouquetItem } from "@/types/bouquets";
import { logError } from "@/lib/logger";
import { PRODUCT_DATA } from "@/constants/productData";

interface FavoriteButtonProps {
  productId: string;
  product?: BouquetItem;
  // خيارات المنتج الحالية (للإضافات)
  productOptions?: {
    selectedSize?: string;
    color?: string;
    addCard?: boolean;
    cardMessage?: string;
    addChocolate?: boolean;
    giftWrap?: boolean;
    totalPrice?: number;
  };
}

export default function FavoriteButton({
  productId,
  product,
  productOptions,
}: FavoriteButtonProps) {
  const { showNotification } = useNotification();
  const { requireAuth } = useRequireAuth();
  const { isFavorite, addToFavorites, removeFromFavorites } = useFavorites();

  const productIdNum = typeof productId === "string" ? Number(productId) : productId;
  const isFavorited = isFavorite(productIdNum);

  const handleToggleFavorite = () => {
    try {
      if (isFavorited) {
        removeFromFavorites(productIdNum);
        showNotification("تم إزالة المنتج من المفضلة", "info");
      } else {
        if (product) {
          // الحصول على معلومات اللون من PRODUCT_DATA إذا كانت متاحة
          const selectedColorOption = productOptions?.color
            ? PRODUCT_DATA.colors.find((c) => c.value === productOptions.color)
            : null;

          const favoriteItem: BouquetItem = {
            ...product,
            id: productIdNum,
            // حفظ الإضافات المختارة
            selectedSize: productOptions?.selectedSize,
            selectedColor: selectedColorOption?.hex || productOptions?.color,
            selectedColorValue: productOptions?.color,
            selectedColorLabel: selectedColorOption?.label,
            addCard: productOptions?.addCard,
            cardMessage: productOptions?.cardMessage,
            addChocolate: productOptions?.addChocolate,
            giftWrap: productOptions?.giftWrap,
            totalPrice: productOptions?.totalPrice || product.price,
          };

          // التحقق من تسجيل الدخول قبل إضافة للمفضلة
          if (
            !requireAuth(
              "addToFavorites",
              favoriteItem,
              "يجب تسجيل الدخول لإضافة المنتج إلى المفضلة"
            )
          ) {
            return;
          }

          addToFavorites(favoriteItem);
          showNotification("تم إضافة المنتج إلى المفضلة ❤️", "success");
        } else {
          showNotification("يرجى استخدام زر المفضلة في صفحة المنتج", "info");
        }
      }
    } catch (error) {
      logError("خطأ في تحديث المفضلة", error, { productId: productIdNum });
      showNotification("حدث خطأ في تحديث المفضلة", "error");
    }
  };

  return (
    <button
      onClick={handleToggleFavorite}
      className={`p-2 rounded-full transition-all duration-200 hover:scale-110 ${
        isFavorited ? "" : "text-gray-400"
      }`}
      style={isFavorited ? { color: "#9F0712" } : {}}
      onMouseEnter={(e) => {
        if (!isFavorited) {
          e.currentTarget.style.color = "#9F0712";
        }
      }}
      onMouseLeave={(e) => {
        if (!isFavorited) {
          e.currentTarget.style.color = "";
        }
      }}
      aria-label={isFavorited ? "إزالة من المفضلة" : "إضافة إلى المفضلة"}
      title={isFavorited ? "إزالة من المفضلة" : "إضافة إلى المفضلة"}
    >
      <Heart
        className="w-6 h-6"
        fill={isFavorited ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth={2}
      />
    </button>
  );
}
