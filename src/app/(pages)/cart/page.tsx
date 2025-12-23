"use client";

import { useMemo, useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useShallow } from "zustand/react/shallow";
import { useCartStore, useProductStore } from "@/stores";
import {
  calculateCartTotals,
  getUnselectedCount,
  isCartEmpty,
  getItemId,
  createCustomBouquetEditData,
} from "@/lib/utils/cart";
import { CART_ROUTES } from "@/constants/cart";
import { handleAndLogError } from "@/lib/errors";
import { ErrorCode } from "@/lib/errors/errorTypes";
import { AlertTriangle } from "lucide-react";
import CartItem from "@/components/cart/CartItem";
import CartSummary from "@/components/cart/CartSummary";
import EmptyCart from "@/components/cart/EmptyCart";
import DeleteConfirmationModal from "@/components/cart/DeleteConfirmationModal";
import { CART_MESSAGES } from "@/constants/cart";
import { COLORS } from "@/constants";
import { fontStyle } from "@/lib/styles";
import type { CartItem as CartItemType } from "@/types/cart";

export default function CartPage() {
  const router = useRouter();
  const [expandedItems, setExpandedItems] = useState<Set<string | number>>(new Set());
  const [showDeleteSelectedModal, setShowDeleteSelectedModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  // استخدام Cart Store - استخدام useShallow لتقليل الاشتراكات وتحسين الأداء
  const {
    items,
    selectedItems,
    updateQuantity,
    removeItem,
    toggleSelectItem,
    toggleSelectAll,
    removeSelected,
    isAllSelected,
    hasSelection,
  } = useCartStore(
    useShallow((state) => ({
      items: state.items,
      selectedItems: state.selectedItems,
      updateQuantity: state.updateQuantity,
      removeItem: state.removeItem,
      toggleSelectItem: state.toggleSelectItem,
      toggleSelectAll: state.toggleSelectAll,
      removeSelected: state.removeSelected,
      isAllSelected: state.isAllSelected,
      hasSelection: state.hasSelection,
    }))
  );

  // تحميل السلة عند التحميل الأولي
  useEffect(() => {
    try {
      setIsLoading(false);
      setError(null);
    } catch (err) {
      const error = err instanceof Error ? err : new Error("Failed to load cart");
      setError(error);
      handleAndLogError(err, "Error loading cart", ErrorCode.CART_LOAD_ERROR);
      setIsLoading(false);
    }
  }, []);

  // تحديد جميع العناصر افتراضياً عند التحميل (مثل useCartSelection)
  useEffect(() => {
    if (items.length > 0 && selectedItems.size === 0) {
      // Use toggleSelectAll to select all items when cart loads
      toggleSelectAll();
    }
  }, [items.length, toggleSelectAll]); // Only run when items length changes

  // دالة تعديل عنصر (تحتاج router)
  const editItem = useCallback(
    (item: CartItemType) => {
      try {
        const setEditItem = useProductStore.getState().setEditItem;

        if (item.isCustom && item.customData) {
          setEditItem(item.id.toString(), null);

          const editData = createCustomBouquetEditData(item);
          const encodedData = encodeURIComponent(JSON.stringify(editData));
          router.push(`${CART_ROUTES.CUSTOM}?design=${encodedData}&edit=true`);
          return;
        }

        const itemIdentifier = (item.uniqueKey || item.id)?.toString();
        if (!itemIdentifier) {
          throw new Error("Item identifier is missing");
        }

        setEditItem(itemIdentifier, {
          id: item.id,
          uniqueKey: item.uniqueKey,
          size: item.size,
          color: item.color,
          colorValue: item.colorValue,
          colorHex: item.color,
          colorLabel: item.colorLabel,
          addCard: item.addCard ?? false,
          cardMessage: item.cardMessage ?? "",
          addChocolate: item.addChocolate ?? false,
          giftWrap: item.giftWrap ?? false,
          quantity: item.quantity ?? 1,
        });

        router.push(`${CART_ROUTES.PRODUCT}/${item.id}?edit=true`);
      } catch (err) {
        const error = err instanceof Error ? err : new Error("Failed to edit item");
        setError(error);
        handleAndLogError(err, "Error editing item", ErrorCode.CART_ITEM_NOT_FOUND, {
          itemId: item.id,
          itemTitle: item.title,
        });
      }
    },
    [router]
  );

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

  // فتح popup تأكيد حذف المحدد
  const handleRemoveSelected = () => {
    if (selectedItems.size > 0) {
      setShowDeleteSelectedModal(true);
    }
  };

  // تأكيد حذف العناصر المحددة
  const handleConfirmDeleteSelected = () => {
    removeSelected();
    setShowDeleteSelectedModal(false);
  };

  // إلغاء حذف العناصر المحددة
  const handleCancelDeleteSelected = () => {
    setShowDeleteSelectedModal(false);
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
  const allSelected = isAllSelected();
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
                      onClick={() => toggleSelectAll()}
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
                          onUpdateQuantity={updateQuantity}
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

      {/* Popup تأكيد حذف العناصر المحددة */}
      <DeleteConfirmationModal
        isOpen={showDeleteSelectedModal}
        onClose={handleCancelDeleteSelected}
        onConfirm={handleConfirmDeleteSelected}
        itemTitle={
          selectedItems.size > 1
            ? `${selectedItems.size} عنصر محدد`
            : selectedItems.size === 1
              ? "العنصر المحدد"
              : undefined
        }
      />
    </div>
  );
}
