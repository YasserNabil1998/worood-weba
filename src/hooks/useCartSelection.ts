import { useMemo, useCallback, useEffect, useRef } from "react";
import { CartItem } from "@/src/@types/cart/CartItem.type";
import { getItemId } from "@/src/lib/cartHelpers";
import { useCartStore } from "@/src/stores/cartStore";

interface UseCartSelectionReturn {
  selectedItems: Set<string | number>;
  toggleSelectItem: (itemId: string | number) => void;
  toggleSelectAll: (items: CartItem[]) => void;
  removeSelected: () => void;
  isAllSelected: (items: CartItem[]) => boolean;
  hasSelection: boolean;
}

export function useCartSelection(initialItems: CartItem[] = []): UseCartSelectionReturn {
  const selectedItems = useCartStore((state) => state.selectedItems);
  const items = useCartStore((state) => state.items);

  const toggleSelect = useCartStore((state) => state.toggleSelect);
  const toggleSelectAllAction = useCartStore((state) => state.toggleSelectAll);
  const removeSelectedAction = useCartStore((state) => state.removeSelected);

  const hasAutoSelectedRef = useRef(false);

  useEffect(() => {
    if (
      !hasAutoSelectedRef.current &&
      initialItems.length > 0 &&
      selectedItems.size === 0 &&
      initialItems.length === items.length
    ) {
      toggleSelectAllAction(initialItems);
      hasAutoSelectedRef.current = true;
    }
  }, [initialItems.length, items.length, selectedItems.size, toggleSelectAllAction]);

  const toggleSelectItem = useCallback(
    (itemId: string | number) => {
      toggleSelect(itemId);
    },
    [toggleSelect]
  );

  const toggleSelectAll = useCallback(
    (itemsToToggle: CartItem[]) => {
      toggleSelectAllAction(itemsToToggle);
    },
    [toggleSelectAllAction]
  );

  const removeSelected = useCallback(
    () => {
      removeSelectedAction();
    },
    [removeSelectedAction]
  );

  const isAllSelected = useCallback(
    (itemsToCheck: CartItem[]): boolean => {
      if (itemsToCheck.length === 0) return false;
      return itemsToCheck.every((item) => selectedItems.has(getItemId(item)));
    },
    [selectedItems]
  );

  const hasSelection = useMemo(() => selectedItems.size > 0, [selectedItems.size]);

  return {
    selectedItems,
    toggleSelectItem,
    toggleSelectAll,
    removeSelected,
    isAllSelected,
    hasSelection,
  };
}
