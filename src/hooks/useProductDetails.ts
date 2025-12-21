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
import { CART_ROUTES } from "@/constants/cart";
import { handleAndLogError } from "@/lib/errors";
import { ErrorCode } from "@/lib/errors/errorTypes";
import { useCartStore, useProductStore, type EditItemData } from "@/stores";

interface ProductOptions {
  selectedSize: string;
  color: string;
  addCard: boolean;
  cardMessage: string;
  addChocolate: boolean;
  giftWrap: boolean;
  quantity: number;
}

// Use EditItemData from productStore
type ReadyMadeEditData = EditItemData;

export function useProductDetails(productId: string) {
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const { isLoading, withLoading } = useDataLoading();
  const { showNotification } = useNotification();
  const { requireAuth } = useRequireAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const cartItems = useCartStore((state) => state.items);
  const setCartItems = useCartStore((state) => state.setItems);

  // Use product store
  const storeProduct = useProductStore((state) => state.productData);
  const fetchProduct = useProductStore((state) => state.fetchProduct);
  const fetchProductOptions = useProductStore((state) => state.fetchProductOptions);
  const editItemId = useProductStore((state) => state.editItemId);
  const editItemData = useProductStore((state) => state.editItemData);
  const setEditItem = useProductStore((state) => state.setEditItem);
  const clearEditItem = useProductStore((state) => state.clearEditItem);

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
    async function loadProduct() {
      await withLoading(async () => {
        try {
          await fetchProduct(productId);
          await fetchProductOptions(productId);

          // Convert store product to Product type if available
          if (storeProduct) {
            const product: Product = {
              id: typeof storeProduct.id === "number" ? storeProduct.id : Number(storeProduct.id),
              title: storeProduct.title,
              price: storeProduct.price,
              image: storeProduct.images[0] || "",
              images: storeProduct.images,
              description: storeProduct.description || "",
              currency: storeProduct.currency || PRODUCT_DATA.currency,
            };
            setProduct(product);
          } else {
            // Fallback to old method if store doesn't have data
            const res = await fetch(`https://dummyjson.com/products/${productId}`);
            const data = await res.json();

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
          }
        } catch (error) {
          handleAndLogError(error, "Error fetching product", ErrorCode.PRODUCT_LOAD_ERROR, {
            productId,
          });
        }
      });
    }

    if (productId) {
      loadProduct();
    }
  }, [productId, withLoading, fetchProduct, fetchProductOptions, storeProduct]);

  useEffect(() => {
    if (!product) return;
    if (editInitializedRef.current) return;
    if (searchParams?.get("edit") !== "true") return;

    if (editItemData && editItemId && Number(editItemData.id) === Number(product.id)) {
      setOptions({
        selectedSize: editItemData.size || "medium",
        color:
          editItemData.colorValue ||
          editItemData.color ||
          PRODUCT_DATA.colors?.[0]?.value ||
          "classic",
        addCard: editItemData.addCard ?? false,
        cardMessage: editItemData.cardMessage || "",
        addChocolate: editItemData.addChocolate ?? false,
        giftWrap: editItemData.giftWrap ?? false,
        quantity: editItemData.quantity && editItemData.quantity > 0 ? editItemData.quantity : 1,
      });
      setIsEditMode(true);
      setEditingKey(editItemId);
    }
    editInitializedRef.current = true;
  }, [product, searchParams, editItemData, editItemId]);

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
        const safeCart = Array.isArray(cartItems) ? cartItems : [];
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

            setCartItems(newCart);
            clearEditItem();
            showNotification("تم تحديث المنتج في السلة", "success");
            setIsEditMode(false);
            setEditingKey(null);
            router.push(CART_ROUTES.CART);
            return;
          }

          clearEditItem();
          setIsEditMode(false);
          setEditingKey(null);
        }

        const { cart: updatedCart, isNew } = addProductToCart(safeCart, baseCartItem);

        setCartItems(updatedCart);

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
