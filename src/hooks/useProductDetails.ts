"use client";

import { useState, useEffect } from "react";
import { Product } from "@/src/@types/product/Product.type";
import { PRODUCT_DATA } from "@/src/constants/productData";
import { addProductToCart } from "@/src/lib/cartUtils";
import { useNotification } from "@/src/providers/notification-provider";
import { useDataLoading } from "./useDataLoading";
import { CartItem } from "@/src/@types/cart/CartItem.type";
import { STORAGE_KEYS } from "@/src/constants";
import { storage } from "@/src/lib/utils";

interface ProductOptions {
  selectedSize: string;
  addCard: boolean;
  cardMessage: string;
  addChocolate: boolean;
  giftWrap: boolean;
  quantity: number;
}

export function useProductDetails(productId: string) {
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const { isLoading, withLoading } = useDataLoading();
  const { showNotification } = useNotification();

  // Product options state
  const [options, setOptions] = useState<ProductOptions>({
    selectedSize: "medium",
    addCard: false,
    cardMessage: "",
    addChocolate: false,
    giftWrap: false,
    quantity: 1,
  });

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
          console.error("Error fetching product:", error);
        }
      });
    }

    if (productId) {
      fetchProduct();
    }
  }, [productId, withLoading]);

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

    if (typeof window !== "undefined") {
      try {
        const cart = storage.get<CartItem[]>(STORAGE_KEYS.CART, []);
        const safeCart = Array.isArray(cart) ? cart : [];

        const cartItem = {
          id: product.id,
          title: product.title,
          price: getTotalPrice(),
          quantity: options.quantity,
          image: product.image,
          size: options.selectedSize,
          addCard: options.addCard,
          cardMessage: options.cardMessage,
          addChocolate: options.addChocolate,
          giftWrap: options.giftWrap,
          total: getTotalPrice(),
        };

        const { cart: updatedCart, isNew } = addProductToCart(safeCart, cartItem);

        storage.set(STORAGE_KEYS.CART, updatedCart);
        window.dispatchEvent(new CustomEvent("cartUpdated"));

        const message = isNew ? "تم إضافة المنتج إلى السلة" : "تم زيادة كمية المنتج في السلة";
        showNotification(message, "success");
      } catch (error) {
        console.error("خطأ:", error);
        storage.set(STORAGE_KEYS.CART, []);
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
  };
}
