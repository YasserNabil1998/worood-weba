"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";

import type { BouquetItem } from "@/types/bouquets";
import { PRODUCT_DATA } from "@/constants/productData";
import { APP_CONFIG } from "@/constants";
import { useNotification } from "@/providers/notification-provider";
import { useRequireAuth } from "@/hooks/useRequireAuth";
import { logError } from "@/lib/logger";
import { fontStyle } from "@/lib/styles";
import { useCartStore } from "@/stores";

import SizeSelector from "./SizeSelector";
import ColorSelector from "./ColorSelector";
import ProductAddons from "./ProductAddons";
import ProductActions from "./ProductActions";

type ProductOptions = {
  selectedSize: string;
  color: string;
  addCard: boolean;
  cardMessage: string;
  addChocolate: boolean;
  giftWrap: boolean;
  quantity: number;
};

const createDefaultOptions = (): ProductOptions => ({
  selectedSize: "medium",
  color: PRODUCT_DATA.colors?.[0]?.value || "classic",
  addCard: false,
  cardMessage: "",
  addChocolate: false,
  giftWrap: false,
  quantity: 1,
});

type QuickAddModalProps = {
  bouquet: BouquetItem | null;
  isOpen: boolean;
  onClose: () => void;
};

const QuickAddModal = ({ bouquet, isOpen, onClose }: QuickAddModalProps) => {
  const { showNotification } = useNotification();
  const { requireAuth } = useRequireAuth();
  const addItem = useCartStore((state) => state.addItem);
  const [options, setOptions] = useState<ProductOptions>(createDefaultOptions);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    setOptions(createDefaultOptions());
  }, [isOpen, bouquet?.id]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (typeof document === "undefined") return;
    if (isOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
    return;
  }, [isOpen]);

  const currency = bouquet?.currency || APP_CONFIG.CURRENCY;

  const sizeExtras = useMemo(() => {
    return PRODUCT_DATA.sizes.find((size) => size.value === options.selectedSize)?.price ?? 0;
  }, [options.selectedSize]);

  const addonsExtras = useMemo(() => {
    let total = 0;
    if (options.addCard) total += PRODUCT_DATA.addons.card.price;
    if (options.addChocolate) total += PRODUCT_DATA.addons.chocolate.price;
    if (options.giftWrap) total += PRODUCT_DATA.addons.giftWrap.price;
    return total;
  }, [options.addCard, options.addChocolate, options.giftWrap]);

  const totalPrice = useMemo(() => {
    if (!bouquet) return 0;
    const base = bouquet.price + sizeExtras + addonsExtras;
    return base * options.quantity;
  }, [addonsExtras, bouquet, options.quantity, sizeExtras]);

  const selectedColorOption = useMemo(() => {
    return (
      PRODUCT_DATA.colors.find((color) => color.value === options.color) || PRODUCT_DATA.colors[0]
    );
  }, [options.color]);

  const handleQuantityChange = useCallback((quantity: number) => {
    setOptions((prev) => ({ ...prev, quantity: Math.max(1, quantity) }));
  }, []);

  const handleSizeChange = useCallback((size: string) => {
    setOptions((prev) => ({ ...prev, selectedSize: size }));
  }, []);

  const handleColorChange = useCallback((color: string) => {
    setOptions((prev) => ({ ...prev, color }));
  }, []);

  const handleCardToggle = useCallback((checked: boolean) => {
    setOptions((prev) => ({
      ...prev,
      addCard: checked,
      cardMessage: checked ? prev.cardMessage : "",
    }));
  }, []);

  const handleChocolateToggle = useCallback((checked: boolean) => {
    setOptions((prev) => ({ ...prev, addChocolate: checked }));
  }, []);

  const handleGiftWrapToggle = useCallback((checked: boolean) => {
    setOptions((prev) => ({ ...prev, giftWrap: checked }));
  }, []);

  const handleCardMessageChange = useCallback((message: string) => {
    setOptions((prev) => ({ ...prev, cardMessage: message }));
  }, []);

  const handleAddToCart = useCallback(() => {
    if (!bouquet) return;

    try {
      const lineTotal = totalPrice;
      const colorHex = selectedColorOption?.hex || "#E27281";
      const colorLabel = selectedColorOption?.label || "";
      const colorValue = selectedColorOption?.value || options.color;

      const productToAdd = {
        id: bouquet.id,
        title: bouquet.title,
        price: lineTotal,
        total: lineTotal,
        quantity: options.quantity,
        image: bouquet.image,
        size: options.selectedSize,
        color: colorHex,
        colorValue,
        colorLabel,
        addCard: options.addCard,
        cardMessage: options.cardMessage,
        addChocolate: options.addChocolate,
        giftWrap: options.giftWrap,
      };

      // التحقق من تسجيل الدخول قبل إضافة المنتج للسلة
      if (!requireAuth("addToCart", productToAdd, "يجب تسجيل الدخول لإضافة المنتج إلى السلة")) {
        return;
      }

      addItem(productToAdd);

      showNotification("تم إضافة المنتج إلى السلة ✓", "success");
      onClose();
    } catch (error) {
      if (!bouquet) return;
      logError("خطأ في إضافة المنتج للسلة", error, {
        bouquetId: bouquet.id,
        bouquetTitle: bouquet.title,
      });
      showNotification("حدث خطأ أثناء إضافة المنتج للسلة", "error");
    }
  }, [
    bouquet,
    onClose,
    options.addCard,
    options.addChocolate,
    options.cardMessage,
    options.giftWrap,
    options.quantity,
    options.selectedSize,
    requireAuth,
    selectedColorOption?.hex,
    selectedColorOption?.label,
    selectedColorOption?.value,
    showNotification,
    totalPrice,
    addItem,
  ]);

  if (!isOpen || !bouquet || !mounted) {
    return null;
  }

  const modalContent = (
    <div className="fixed inset-0 z-9999 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />
      <div className="relative z-10 mx-4 w-full max-w-3xl overflow-hidden rounded-3xl bg-white shadow-2xl">
        <button
          onClick={onClose}
          className="absolute left-4 top-4 z-20 flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-600 transition hover:bg-gray-100"
          aria-label="إغلاق النافذة"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="flex flex-col p-5 sm:p-6">
          <div className="mb-4">
            <div className="mb-1 text-xs font-medium text-gray-500">إضافة سريعة للسلة</div>
            <h3 className="text-lg font-bold text-[#2D3319]" style={fontStyle}>
              {bouquet.title}
            </h3>
            <div className="mt-2 flex items-center gap-2 text-sm text-[#5A5E4D]">
              <span className="text-base font-semibold text-[#2D3319]">
                {bouquet.price} {currency}
              </span>
              <span className="text-xs text-gray-500">(+ خيارات إضافية)</span>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto pr-1">
            <SizeSelector
              sizes={PRODUCT_DATA.sizes}
              selectedSize={options.selectedSize}
              onSizeChange={handleSizeChange}
              currency={currency}
            />

            <ColorSelector
              colors={PRODUCT_DATA.colors}
              selectedColor={options.color}
              onColorChange={handleColorChange}
            />

            <ProductAddons
              cardAddon={PRODUCT_DATA.addons.card}
              chocolateAddon={PRODUCT_DATA.addons.chocolate}
              giftWrapAddon={PRODUCT_DATA.addons.giftWrap}
              currency={currency}
              addCard={options.addCard}
              addChocolate={options.addChocolate}
              giftWrap={options.giftWrap}
              cardMessage={options.cardMessage}
              onCardToggle={handleCardToggle}
              onChocolateToggle={handleChocolateToggle}
              onGiftWrapToggle={handleGiftWrapToggle}
              onCardMessageChange={handleCardMessageChange}
            />
          </div>

          <ProductActions
            quantity={options.quantity}
            totalPrice={totalPrice}
            currency={currency}
            onQuantityChange={handleQuantityChange}
            onAddToCart={handleAddToCart}
          />
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
};

export default QuickAddModal;
