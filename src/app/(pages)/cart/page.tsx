"use client";

import { useMemo, useState } from "react";
import { useCartItems } from "@/src/hooks/useCartItems";
import { useCartSelection } from "@/src/hooks/useCartSelection";
import {
  calculateCartTotals,
  getUnselectedCount,
  isCartEmpty,
  getItemId,
} from "@/src/lib/cartHelpers";
import { ShoppingCart, AlertTriangle } from "lucide-react";
import CartItem from "@/src/components/cart/CartItem";
import CartSummary from "@/src/components/cart/CartSummary";
import EmptyCart from "@/src/components/cart/EmptyCart";
import { CART_MESSAGES } from "@/src/constants/cart";
import { COLORS } from "@/src/constants";

export default function CartPage() {
  const [expandedItems, setExpandedItems] = useState<Set<string | number>>(new Set());

  // استخدام الـ hooks المخصصة
  const { items, isLoading, error, updateItemQuantity, removeItem, editCustomItem } =
    useCartItems();

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
  const toggleDetails = (itemId: string | number) => {
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

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen" dir="rtl">
        <main className="py-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-center min-h-[60vh]">
              <div className="text-center">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#5A5E4D] mb-4"></div>
                <p className="text-gray-600">جاري تحميل البيانات...</p>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  // عرض رسالة خطأ إذا حدث خطأ
  if (error) {
    return (
      <div
        className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#f1f4e8] to-[#e6ead7]"
        dir="rtl"
      >
        <div className="text-center bg-white rounded-2xl shadow-lg p-8 border border-red-200 max-w-md mx-4">
          <AlertTriangle className="w-12 h-12 mx-auto mb-4 text-red-600" />
          <h2 className="text-xl font-bold text-red-700 mb-2">حدث خطأ</h2>
          <p className="text-red-600 mb-4">{error.message}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            إعادة المحاولة
          </button>
        </div>
      </div>
    );
  }

  const isEmpty = isCartEmpty(items);
  const allSelected = isAllSelected(items);
  const selectedItemsList = items.filter((item) => {
    const itemId = getItemId(item);
    return selectedItems.has(itemId);
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f1f4e8] to-[#e6ead7]" dir="rtl">
      <main className="py-6 sm:py-8 md:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Page Title */}
          <div className="mb-8 md:mb-10">
            <div className="flex items-center gap-3 mb-3">
              <ShoppingCart
                className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 text-[#5A5E4D]"
                fill="#5A5E4D"
              />
              <h1
                className="text-[28px] sm:text-[32px] md:text-[40px] font-bold leading-tight text-[#2D3319] tracking-[-0.5px]"
                style={{ fontFamily: "var(--font-almarai)" }}
              >
                {CART_MESSAGES.CART_TITLE}
              </h1>
            </div>
            <p
              className="text-[15px] md:text-[16px] font-normal leading-relaxed text-[#5A5E4D] pr-12"
              style={{ fontFamily: "var(--font-almarai)" }}
            >
              المنتجات التي أضفتها إلى سلة المشتريات
            </p>
          </div>

          {/* Action Buttons */}
          {!isEmpty && (
            <div className="flex items-center gap-2 sm:gap-4 flex-wrap mb-6">
              <button
                onClick={() => toggleSelectAll(items)}
                className="text-xs sm:text-sm hover:bg-white hover:shadow-md flex items-center gap-2 cursor-pointer bg-white/80 rounded-lg px-3 sm:px-4 py-2 transition-all duration-200 border border-gray-200"
                style={{ color: COLORS.PRIMARY }}
              >
                <input
                  type="checkbox"
                  checked={allSelected}
                  readOnly
                  className="h-4 w-4 rounded border-gray-300 cursor-pointer"
                  style={{ accentColor: COLORS.PRIMARY }}
                />
                <span className="font-medium whitespace-nowrap">
                  {CART_MESSAGES.SELECT_ALL} ({items.length})
                </span>
              </button>
              {hasSelection && (
                <button
                  onClick={handleRemoveSelected}
                  className="text-xs sm:text-sm text-red-600 hover:bg-red-50 hover:shadow-md cursor-pointer bg-white/80 rounded-lg px-3 sm:px-4 py-2 transition-all duration-200 border border-red-200 font-medium whitespace-nowrap"
                >
                  {CART_MESSAGES.REMOVE_SELECTED} ({selectedItems.size})
                </button>
              )}
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Items */}
            <div className="lg:col-span-2 space-y-6">
              {isEmpty ? (
                <EmptyCart />
              ) : (
                <>
                  {/* Warning Messages */}
                  {unselectedCount > 0 && hasSelection && (
                    <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-300 rounded-lg sm:rounded-xl p-3 sm:p-4 text-xs sm:text-sm text-yellow-800 shadow-sm">
                      <div className="flex items-center gap-2">
                        <AlertTriangle className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                        <span className="font-medium">
                          {CART_MESSAGES.PARTIAL_SELECTION_WARNING.replace(
                            "{count}",
                            unselectedCount.toString()
                          )}
                        </span>
                      </div>
                    </div>
                  )}
                  {!hasSelection && (
                    <div className="bg-gradient-to-r from-red-50 to-pink-50 border border-red-300 rounded-lg sm:rounded-xl p-3 sm:p-4 text-xs sm:text-sm text-red-800 shadow-sm">
                      <div className="flex items-center gap-2">
                        <AlertTriangle className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                        <span className="font-medium">{CART_MESSAGES.NO_SELECTION_WARNING}</span>
                      </div>
                    </div>
                  )}

                  {/* Cart Items */}
                  {items.map((item) => {
                    const itemId = getItemId(item);
                    return (
                      <CartItem
                        key={itemId}
                        item={item}
                        isSelected={selectedItems.has(itemId)}
                        isExpanded={expandedItems.has(itemId)}
                        onToggleSelect={toggleSelectItem}
                        onToggleExpand={toggleDetails}
                        onUpdateQuantity={updateItemQuantity}
                        onRemove={removeItem}
                        onEdit={editCustomItem}
                      />
                    );
                  })}
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
