"use client";

import { useMemo, useState } from "react";
import { useCartItems } from "@/src/hooks/useCartItems";
import { useCartSelection } from "@/src/hooks/useCartSelection";
import {
  calculateCartTotals,
  getUnselectedCount,
  isCartEmpty,
} from "@/src/lib/cartHelpers";
import CartItem from "@/src/components/cart/CartItem";
import CartSummary from "@/src/components/cart/CartSummary";
import EmptyCart from "@/src/components/cart/EmptyCart";
import { CART_MESSAGES, CART_ICONS } from "@/src/constants/cart";
import { COLORS } from "@/src/constants";

export default function CartPage() {
  const [expandedItems, setExpandedItems] = useState<Set<number>>(new Set());

  // استخدام الـ hooks المخصصة
  const {
    items,
    isLoading,
    error,
    updateItemQuantity,
    removeItem,
    editCustomItem,
  } = useCartItems();

  const {
    selectedItems,
    toggleSelectItem,
    toggleSelectAll,
    removeSelected,
    isAllSelected,
    hasSelection,
  } = useCartSelection(items);

  // حساب الإجماليات باستخدام useMemo للأداء
  const totals = useMemo(() => {
    return calculateCartTotals(items, selectedItems);
  }, [items, selectedItems]);

  // التعامل مع طي/فتح التفاصيل
  const toggleDetails = (itemId: number) => {
    setExpandedItems((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(itemId)) {
        newSet.delete(itemId);
      } else {
        newSet.add(itemId);
      }
      return newSet;
    });
  };

  // حذف العناصر المحددة
  const handleRemoveSelected = () => {
    removeSelected(items);
  };

  // حساب عدد العناصر غير المحددة
  const unselectedCount = getUnselectedCount(items, selectedItems);

  // عرض loader أثناء التحميل
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center" dir="rtl">
        <div className="text-center">
          <div className="text-2xl mb-2">⏳</div>
          <p className="text-gray-600">جاري التحميل...</p>
        </div>
      </div>
    );
  }

  // عرض رسالة خطأ إذا حدث خطأ
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center" dir="rtl">
        <div className="text-center">
          <div className="text-2xl mb-2">❌</div>
          <p className="text-red-600">{error.message}</p>
        </div>
      </div>
    );
  }

  const isEmpty = isCartEmpty(items);
  const allSelected = isAllSelected(items);
  const selectedItemsList = items.filter((item) => selectedItems.has(item.id));

  return (
    <div className="min-h-screen" dir="rtl">
      <main className="py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h1
              className="text-2xl md:text-3xl font-extrabold text-gray-800"
              style={{ fontFamily: "var(--font-almarai)" }}
            >
              {CART_MESSAGES.CART_TITLE}
            </h1>
            {!isEmpty && (
              <div className="flex items-center gap-3">
                <button
                  onClick={() => toggleSelectAll(items)}
                  className="text-sm hover:underline flex items-center gap-2 cursor-pointer"
                  style={{ color: COLORS.PRIMARY }}
                >
                  <input
                    type="checkbox"
                    checked={allSelected}
                    readOnly
                    className="h-4 w-4 rounded border-gray-300 cursor-pointer"
                    style={{ accentColor: COLORS.PRIMARY }}
                  />
                  <span>
                    {CART_MESSAGES.SELECT_ALL} ({items.length})
                  </span>
                </button>
                {hasSelection && (
                  <button
                    onClick={handleRemoveSelected}
                    className="text-sm text-red-600 hover:underline cursor-pointer"
                  >
                    {CART_MESSAGES.REMOVE_SELECTED} ({selectedItems.size})
                  </button>
                )}
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Items */}
            <div className="lg:col-span-2 space-y-4">
              {isEmpty ? (
                <EmptyCart />
              ) : (
                <>
                  {/* Warning Messages */}
                  {unselectedCount > 0 && hasSelection && (
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 text-sm text-yellow-800">
                      {CART_ICONS.WARNING}{" "}
                      {CART_MESSAGES.PARTIAL_SELECTION_WARNING.replace(
                        "{count}",
                        unselectedCount.toString()
                      )}
                    </div>
                  )}
                  {!hasSelection && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-sm text-red-800">
                      {CART_ICONS.WARNING} {CART_MESSAGES.NO_SELECTION_WARNING}
                    </div>
                  )}

                  {/* Cart Items */}
                  {items.map((item) => (
                    <CartItem
                      key={item.id}
                      item={item}
                      isSelected={selectedItems.has(item.id)}
                      isExpanded={expandedItems.has(item.id)}
                      onToggleSelect={toggleSelectItem}
                      onToggleExpand={toggleDetails}
                      onUpdateQuantity={updateItemQuantity}
                      onRemove={removeItem}
                      onEdit={editCustomItem}
                    />
                  ))}
                </>
              )}
            </div>

            {/* Summary */}
            <CartSummary
              totals={totals}
              totalItems={items.length}
              selectedItems={selectedItemsList}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
