"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import type { Product } from "@/types/product";
import { PRODUCT_DATA } from "@/constants/productData";
import { addProductToCart, generateProductKey } from "@/lib/utils/cart";
import { useNotification } from "@/providers/notification-provider";
import { useRequireAuth } from "@/hooks/useRequireAuth";
import { useDataLoading } from "./useDataLoading";
import type { CartItem } from "@/types/cart";
import { STORAGE_KEYS } from "@/constants";
import { storage } from "@/lib/utils";
import { CART_ROUTES } from "@/constants/cart";
import { handleAndLogError } from "@/lib/errors";
import { ErrorCode } from "@/lib/errors/errorTypes";

interface ProductOptions {
  selectedSize: string;
  color: string;
  addCard: boolean;
  cardMessage: string;
  addChocolate: boolean;
  giftWrap: boolean;
  quantity: number;
}

interface ReadyMadeEditData {
  id: number;
  uniqueKey?: string;
  size?: string;
  color?: string;
  colorValue?: string;
  colorHex?: string;
  colorLabel?: string;
  addCard?: boolean;
  cardMessage?: string;
  addChocolate?: boolean;
  giftWrap?: boolean;
  quantity?: number;
}

export function useProductDetails(productId: string) {
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const { isLoading, withLoading } = useDataLoading();
  const { showNotification } = useNotification();
  const { requireAuth } = useRequireAuth();
  const router = useRouter();
  const searchParams = useSearchParams();

  // Product options state
  const [options, setOptions] = useState<ProductOptions>({
    selectedSize: "medium",
    color: PRODUCT_DATA.colors?.[0]?.value || "classic",
    addCard: false,
    cardMessage: "",
    addChocolate: false,
    giftWrap: false,
    quantity: 1,
  });
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingKey, setEditingKey] = useState<string | null>(null);
  const editInitializedRef = useRef(false);

  // Fetch product data
  useEffect(() => {
    async function fetchProduct() {
      await withLoading(async () => {
        try {
          const res = await fetch(`https://dummyjson.com/products/${productId}`);
          const data = await res.json();

          // تحويل البيانات من API إلى صيغة المنتج
          const mainImage =
            PRODUCT_DATA.bouquetImages[parseInt(productId) % PRODUCT_DATA.bouquetImages.length];
          const product: Product = {
            id: data.id || parseInt(productId) || 0,
            title: data.title || "منتج غير محدد",
            price: Math.round((data.price || 0) * PRODUCT_DATA.priceMultiplier),
            image: mainImage,
            images: [
              mainImage,
              PRODUCT_DATA.productImages[parseInt(productId) % PRODUCT_DATA.productImages.length],
              PRODUCT_DATA.productImages[
                (parseInt(productId) + 1) % PRODUCT_DATA.productImages.length
              ],
              PRODUCT_DATA.productImages[
                (parseInt(productId) + 2) % PRODUCT_DATA.productImages.length
              ],
            ],
            description: PRODUCT_DATA.defaultDescription,
            currency: PRODUCT_DATA.currency,
          };

          setProduct(product);
        } catch (error) {
          handleAndLogError(error, "Error fetching product", ErrorCode.PRODUCT_LOAD_ERROR, {
            productId,
          });
        }
      });
    }

    if (productId) {
      fetchProduct();
    }
  }, [productId, withLoading]);

  useEffect(() => {
    if (!product) return;
    if (editInitializedRef.current) return;
    if (searchParams?.get("edit") !== "true") return;

    const storedEditData = storage.get<ReadyMadeEditData | null>(STORAGE_KEYS.EDIT_ITEM_DATA, null);
    const storedKey = storage.get<string | null>(STORAGE_KEYS.EDIT_ITEM_ID, null);

    if (storedEditData && storedKey && Number(storedEditData.id) === Number(product.id)) {
      setOptions({
        selectedSize: storedEditData.size || "medium",
        color:
          storedEditData.colorValue ||
          storedEditData.color ||
          PRODUCT_DATA.colors?.[0]?.value ||
          "classic",
        addCard: storedEditData.addCard ?? false,
        cardMessage: storedEditData.cardMessage || "",
        addChocolate: storedEditData.addChocolate ?? false,
        giftWrap: storedEditData.giftWrap ?? false,
        quantity:
          storedEditData.quantity && storedEditData.quantity > 0 ? storedEditData.quantity : 1,
      });
      setIsEditMode(true);
      setEditingKey(storedKey);
    }
    editInitializedRef.current = true;
  }, [product, searchParams]);

  // Calculate total price
  const getTotalPrice = () => {
    if (!product) return 0;
    let total = product.price;

    const selectedSizeData = PRODUCT_DATA.sizes.find((s) => s.value === options.selectedSize);
    if (selectedSizeData) total += selectedSizeData.price;
    if (options.addCard) total += PRODUCT_DATA.addons.card.price;
    if (options.addChocolate) total += PRODUCT_DATA.addons.chocolate.price;
    if (options.giftWrap) total += PRODUCT_DATA.addons.giftWrap.price;

    return total * options.quantity;
  };

  // Add to cart handler
  const handleAddToCart = () => {
    if (!product) return;

    if (options.quantity < 1) {
      showNotification("الكمية يجب أن تكون 1 على الأقل", "error");
      return;
    }

    if (typeof window !== "undefined") {
      try {
        const cart = storage.get<CartItem[]>(STORAGE_KEYS.CART, []);
        const safeCart = Array.isArray(cart) ? cart : [];
        const lineTotal = getTotalPrice();
        const selectedColorOption =
          PRODUCT_DATA.colors.find((color) => color.value === options.color) ||
          PRODUCT_DATA.colors[0];
        const colorHex = selectedColorOption?.hex || "#E27281";
        const colorLabel = selectedColorOption?.label || "";
        const colorValue = selectedColorOption?.value || options.color;

        const baseCartItem = {
          id: product.id,
          title: product.title,
          price: lineTotal,
          quantity: options.quantity,
          image: product.image,
          size: options.selectedSize,
          color: colorHex,
          colorValue,
          colorLabel,
          addCard: options.addCard,
          cardMessage: options.cardMessage,
          addChocolate: options.addChocolate,
          giftWrap: options.giftWrap,
          total: lineTotal,
        };

        // التحقق من تسجيل الدخول قبل إضافة المنتج للسلة
        if (!requireAuth("addToCart", baseCartItem, "يجب تسجيل الدخول لإضافة المنتج إلى السلة")) {
          return;
        }

        if (isEditMode && editingKey) {
          const targetIndex = safeCart.findIndex((item) => {
            const key = (item.uniqueKey || item.id)?.toString();
            return key === editingKey;
          });

          if (targetIndex !== -1) {
            const originalItem = safeCart[targetIndex];
            const updatedItem: CartItem = {
              ...originalItem,
              ...baseCartItem,
              quantity: options.quantity,
            };

            const updatedKey = generateProductKey({
              ...updatedItem,
              id: updatedItem.id,
            });

            updatedItem.uniqueKey = updatedKey;

            const duplicateIndex = safeCart.findIndex((item, index) => {
              if (index === targetIndex) return false;
              const comparisonKey =
                item.uniqueKey ||
                generateProductKey({
                  ...item,
                  id: item.id,
                });
              return comparisonKey === updatedKey;
            });

            let newCart: CartItem[];

            if (duplicateIndex !== -1) {
              const duplicateItem = safeCart[duplicateIndex];
              const mergedQuantity = (duplicateItem.quantity || 1) + (updatedItem.quantity || 1);
              const mergedTotal =
                (duplicateItem.total || duplicateItem.price || 0) +
                (updatedItem.total || updatedItem.price || 0);

              newCart = safeCart
                .map((item, index) => {
                  if (index === duplicateIndex) {
                    return {
                      ...duplicateItem,
                      ...updatedItem,
                      quantity: mergedQuantity,
                      price: mergedTotal,
                      total: mergedTotal,
                      uniqueKey: updatedKey,
                    };
                  }
                  return item;
                })
                .filter((_, index) => index !== targetIndex);
            } else {
              newCart = [...safeCart];
              newCart[targetIndex] = updatedItem;
            }

            storage.set(STORAGE_KEYS.CART, newCart);
            storage.remove(STORAGE_KEYS.EDIT_ITEM_ID);
            storage.remove(STORAGE_KEYS.EDIT_ITEM_DATA);
            window.dispatchEvent(new CustomEvent("cartUpdated"));
            showNotification("تم تحديث المنتج في السلة", "success");
            setIsEditMode(false);
            setEditingKey(null);
            router.push(CART_ROUTES.CART);
            return;
          }

          storage.remove(STORAGE_KEYS.EDIT_ITEM_ID);
          storage.remove(STORAGE_KEYS.EDIT_ITEM_DATA);
          setIsEditMode(false);
          setEditingKey(null);
        }

        const { cart: updatedCart, isNew } = addProductToCart(safeCart, baseCartItem);

        storage.set(STORAGE_KEYS.CART, updatedCart);
        window.dispatchEvent(new CustomEvent("cartUpdated"));

        const message = isNew ? "تم إضافة المنتج إلى السلة" : "تم زيادة كمية المنتج في السلة";
        showNotification(message, "success");
      } catch (error) {
        handleAndLogError(error, "خطأ في إضافة المنتج للسلة", ErrorCode.CART_SAVE_ERROR, {
          productId,
          quantity: options.quantity,
          size: options.selectedSize,
          color: options.color,
        });
        showNotification("حدث خطأ في إضافة المنتج للسلة", "error");
      }
    }
  };

  // Update specific option
  const updateOption = <K extends keyof ProductOptions>(key: K, value: ProductOptions[K]) => {
    setOptions((prev) => ({ ...prev, [key]: value }));
  };

  return {
    product,
    isLoading,
    selectedImage,
    setSelectedImage,
    options,
    updateOption,
    getTotalPrice,
    handleAddToCart,
    isEditMode,
  };
}
