import { useCallback, useMemo } from "react";
import { CartItem } from "@/src/@types/cart/CartItem.type";
import { storage } from "@/src/lib/utils";
import { STORAGE_KEYS } from "@/src/constants";
import { createCustomBouquetEditData, getItemId } from "@/src/lib/cartHelpers";
import { CART_ROUTES } from "@/src/constants/cart";
import { useCartStore } from "@/src/stores/cartStore";

interface UseCartItemsReturn {
  items: CartItem[];
  isLoading: boolean;
  error: Error | null;
  updateItemQuantity: (itemId: string | number, newQuantity: number) => void;
  removeItem: (itemId: string | number) => void;
  editCustomItem: (item: CartItem) => void;
}

export function useCartItems(): UseCartItemsReturn {
  const items = useCartStore((state) => state.items);
  const isLoading = useCartStore((state) => state.isLoading);
  const error = useCartStore((state) => state.error);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeItem = useCartStore((state) => state.removeItem);
  const setError = useCartStore((state) => state.setError);

  const editCustomItem = useCallback(
    (item: CartItem) => {
      try {
        if (!item.isCustom || !item.customData) {
          throw new Error("Item is not a custom bouquet");
        }

        const itemId = getItemId(item);
        storage.set(STORAGE_KEYS.EDIT_ITEM_ID, itemId.toString());
        const editData = createCustomBouquetEditData(item);
        const encodedData = encodeURIComponent(JSON.stringify(editData));
        window.location.href = `${CART_ROUTES.CUSTOM}?design=${encodedData}&edit=true`;
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Failed to edit item"));
      }
    },
    [setError]
  );

  return useMemo(
    () => ({
      items,
      isLoading,
      error,
      updateItemQuantity: updateQuantity,
      removeItem,
      editCustomItem,
    }),
    [items, isLoading, error, updateQuantity, removeItem, editCustomItem]
  );
}
