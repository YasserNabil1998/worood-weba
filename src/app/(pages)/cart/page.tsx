"use client";

import { useMemo, useState } from "react";
import { useCartItems } from "@/hooks/useCartItems";
import { useCartSelection } from "@/hooks/useCartSelection";
import { calculateCartTotals, getUnselectedCount, isCartEmpty, getItemId } from "@/lib/cartHelpers";
import { AlertTriangle } from "lucide-react";
import CartItem from "@/components/cart/CartItem";
import CartSummary from "@/components/cart/CartSummary";
import EmptyCart from "@/components/cart/EmptyCart";
import { CART_MESSAGES } from "@/constants/cart";
import { COLORS } from "@/constants";
import { fontStyle } from "@/lib/styles";

export default function CartPage() {
  const [expandedItems, setExpandedItems] = useState<Set<string | number>>(new Set());

  // استخدام الـ hooks المخصصة
  const { items, isLoading, error, updateItemQuantity, removeItem, editItem } = useCartItems();

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
      <div className="min-h-screen flex items-center justify-center" dir="rtl">
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
    <div className="min-h-screen bg-background" dir="rtl">
      <main>
        {/* Page Title Section */}
        <section className="pt-8 pb-4">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-right">
            <h1 className="text-[32px] font-bold leading-[40px] text-[#2D3319] mb-2 tracking-[0px]">
              {CART_MESSAGES.CART_TITLE}
            </h1>
            <p className="text-[16px] font-normal leading-[20px] text-[#5A5E4D] tracking-[0px]">
              المنتجات التي أضفتها إلى سلة المشتريات
            </p>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-8">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div
              className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:items-start"
              style={{ transform: "none" }}
            >
              {/* Summary Sidebar */}
              <div className="lg:sticky lg:top-24 lg:self-start lg:z-10 lg:h-fit" data-aos="none">
                {/* Action Buttons */}
                {!isEmpty && (
                  <div className="flex items-center gap-2 sm:gap-4 flex-wrap mb-4">
                    <button
                      onClick={() => toggleSelectAll(items)}
                      className="text-sm hover:bg-white hover:shadow-md flex items-center gap-2 cursor-pointer bg-white rounded-lg px-4 py-2 transition-all duration-200 border border-gray-200"
                      style={{ ...fontStyle, color: COLORS.PRIMARY }}
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
                        className="text-sm text-red-600 hover:bg-red-50 hover:shadow-md cursor-pointer bg-white rounded-lg px-4 py-2 transition-all duration-200 border border-red-200 font-medium whitespace-nowrap"
                        style={fontStyle}
                      >
                        {CART_MESSAGES.REMOVE_SELECTED} ({selectedItems.size})
                      </button>
                    )}
                  </div>
                )}
                {/* Summary */}
                <CartSummary
                  totals={totals}
                  totalItems={items.length}
                  selectedItems={selectedItemsList}
                />
              </div>
              {/* Items */}
              <div className="lg:col-span-2 space-y-6 lg:pr-4">
                {isEmpty ? (
                  <EmptyCart />
                ) : (
                  <>
                    {/* Warning Messages */}
                    {unselectedCount > 0 && hasSelection && (
                      <div className="bg-linear-to-r from-yellow-50 to-orange-50 border border-yellow-300 rounded-lg sm:rounded-xl p-3 sm:p-4 text-xs sm:text-sm text-yellow-800 shadow-sm">
                        <div className="flex items-center gap-2">
                          <AlertTriangle className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
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
                      <div className="bg-linear-to-r from-red-50 to-pink-50 border border-red-300 rounded-lg sm:rounded-xl p-3 sm:p-4 text-xs sm:text-sm text-red-800 shadow-sm">
                        <div className="flex items-center gap-2">
                          <AlertTriangle className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
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
                          onEdit={editItem}
                        />
                      );
                    })}
                  </>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
