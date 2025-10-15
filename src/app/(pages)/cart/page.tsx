"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

import { storage } from "@/src/lib/utils";
import { STORAGE_KEYS } from "@/src/constants";
import { CartItem } from "@/src/@types/cart/CartItem.type";
import QuantitySelector from "@/src/components/QuantitySelector";

export default function CartPage() {
    const [items, setItems] = useState<CartItem[]>([]);
    const [expandedItems, setExpandedItems] = useState<Set<number>>(new Set());
    const [selectedItems, setSelectedItems] = useState<Set<number>>(new Set());

    useEffect(() => {
        const cart = storage.get<CartItem[]>(STORAGE_KEYS.CART, []);
        setItems(cart);
        // تحديد جميع العناصر افتراضياً
        setSelectedItems(new Set(cart.map((item: CartItem) => item.id)));
    }, []);

    // الاستماع لتحديثات السلة
    useEffect(() => {
        const handleCartUpdate = () => {
            const cart = storage.get<CartItem[]>(STORAGE_KEYS.CART, []);
            setItems(cart);
        };

        window.addEventListener("cartUpdated", handleCartUpdate);
        return () =>
            window.removeEventListener("cartUpdated", handleCartUpdate);
    }, []);

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

    const toggleSelectItem = (itemId: number) => {
        setSelectedItems((prev) => {
            const newSet = new Set(prev);
            if (newSet.has(itemId)) {
                newSet.delete(itemId);
            } else {
                newSet.add(itemId);
            }
            return newSet;
        });
    };

    const toggleSelectAll = () => {
        if (selectedItems.size === items.length) {
            // إلغاء تحديد الكل
            setSelectedItems(new Set());
        } else {
            // تحديد الكل
            setSelectedItems(new Set(items.map((item) => item.id)));
        }
    };

    const removeItem = (id: number | string) => {
        const next = items.filter((i) => {
            // استخدام uniqueKey إذا كان متوفراً، وإلا استخدم id
            const itemId = i.uniqueKey || i.id;
            return itemId !== id;
        });
        setItems(next);
        // تحديث المختارات أيضاً
        setSelectedItems((prev) => {
            const newSet = new Set(prev);
            newSet.delete(id as number);
            return newSet;
        });
        storage.set(STORAGE_KEYS.CART, next);
        window.dispatchEvent(new CustomEvent("cartUpdated"));
    };

    const editCustomItem = (item: CartItem) => {
        if (!item.isCustom || !item.customData) return;

        // حفظ معرف العنصر المراد تعديله
        storage.set(STORAGE_KEYS.EDIT_ITEM_ID, item.id.toString());

        // إنشاء البيانات للتعديل
        const editData = {
            flowers:
                item.customData.flowers?.reduce((acc: any, f: any) => {
                    acc[f.id] = f.quantity;
                    return acc;
                }, {}) || {},
            colors: item.customData.colors || [],
            size: item.customData.size?.key || "medium",
            style: item.customData.style?.key || "classic",
            occasion: item.customData.occasion?.name || "",
            cardMessage: item.customData.cardMessage || "",
            includeCard: item.customData.includeCard || false,
            notes: item.customData.notes || "",
            image: item.image,
        };

        // الانتقال إلى صفحة التنسيق الخاص مع البيانات
        const encodedData = encodeURIComponent(JSON.stringify(editData));
        window.location.href = `/custom?design=${encodedData}&edit=true`;
    };

    const removeSelectedItems = () => {
        const next = items.filter((i) => !selectedItems.has(i.id));
        setItems(next);
        setSelectedItems(new Set());
        storage.set(STORAGE_KEYS.CART, next);
        window.dispatchEvent(new CustomEvent("cartUpdated"));
    };

    // حساب الإجمالي للعناصر المختارة فقط
    const calculateTotals = () => {
        const selectedItemsList = items.filter((item) =>
            selectedItems.has(item.id)
        );

        const totalPrice = selectedItemsList.reduce((sum, item) => {
            const itemPrice = item.isCustom
                ? item.price || 0
                : item.total || item.price || 0;
            return sum + itemPrice * (item.quantity || 1);
        }, 0);

        const totalItemsCount = selectedItemsList.reduce((sum, item) => {
            return sum + (item.quantity || 1);
        }, 0);

        return {
            total: Number(totalPrice.toFixed(2)),
            itemsCount: selectedItemsList.length,
            totalItemsCount: totalItemsCount,
        };
    };

    const {
        total: grandTotal,
        itemsCount,
        totalItemsCount,
    } = calculateTotals();

    return (
        <div className="min-h-screen" dir="rtl">
            <main className="py-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center mb-6">
                        <h1
                            className="text-2xl md:text-3xl font-extrabold text-gray-800"
                            style={{ fontFamily: "var(--font-almarai)" }}
                        >
                            سلة المشتريات
                        </h1>
                        {items.length > 0 && (
                            <div className="flex items-center gap-3">
                                <button
                                    onClick={toggleSelectAll}
                                    className="text-sm text-[#5A5E4D] hover:underline flex items-center gap-2 cursor-pointer"
                                >
                                    <input
                                        type="checkbox"
                                        checked={
                                            selectedItems.size ===
                                                items.length && items.length > 0
                                        }
                                        readOnly
                                        className="h-4 w-4 rounded border-gray-300 text-[#5A5E4D] focus:ring-[#5A5E4D] cursor-pointer"
                                    />
                                    <span>تحديد الكل ({items.length})</span>
                                </button>
                                {selectedItems.size > 0 && (
                                    <button
                                        onClick={removeSelectedItems}
                                        className="text-sm text-red-600 hover:underline cursor-pointer"
                                    >
                                        حذف المحدد ({selectedItems.size})
                                    </button>
                                )}
                            </div>
                        )}
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Items */}
                        <div className="lg:col-span-2 space-y-4">
                            {items.length === 0 ? (
                                <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-8 text-center">
                                    <div className="text-4xl mb-3">🛒</div>
                                    <p className="text-gray-600">سلتك فارغة.</p>
                                    <button
                                        onClick={() =>
                                            (window.location.href = "/bouquets")
                                        }
                                        className="mt-4 px-6 py-2 bg-[#5A5E4D] text-white rounded-md hover:bg-[#4b5244] cursor-pointer"
                                    >
                                        تصفح الباقات
                                    </button>
                                </div>
                            ) : (
                                <>
                                    {selectedItems.size < items.length &&
                                        selectedItems.size > 0 && (
                                            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 text-sm text-yellow-800">
                                                ⚠️ لديك{" "}
                                                {items.length -
                                                    selectedItems.size}{" "}
                                                منتج غير محدد. فقط المنتجات
                                                المحددة سيتم شراؤها.
                                            </div>
                                        )}
                                    {selectedItems.size === 0 && (
                                        <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-sm text-red-800">
                                            ⚠️ لم تقم بتحديد أي منتج. يرجى تحديد
                                            المنتجات التي تريد شراءها.
                                        </div>
                                    )}
                                    {items.map((item) => (
                                        <div
                                            key={item.id}
                                            className={`bg-white rounded-lg border shadow-sm p-4 transition-all ${
                                                selectedItems.has(item.id)
                                                    ? "border-[#d1d4ca] border shadow"
                                                    : "border-gray-200"
                                            }`}
                                        >
                                            <div className="flex gap-4">
                                                {/* Checkbox للاختيار */}
                                                <div className="flex items-start pt-2">
                                                    <input
                                                        type="checkbox"
                                                        checked={selectedItems.has(
                                                            item.id
                                                        )}
                                                        onChange={() =>
                                                            toggleSelectItem(
                                                                item.id
                                                            )
                                                        }
                                                        className="h-5 w-5 rounded border-gray-300 text-[#5A5E4D] focus:ring-[#5A5E4D] cursor-pointer"
                                                    />
                                                </div>

                                                {/* الصورة */}
                                                <div
                                                    className={`${
                                                        item.isCustom
                                                            ? "w-24 h-24"
                                                            : ""
                                                    }`}
                                                >
                                                    <Image
                                                        src={item.image}
                                                        alt={item.title}
                                                        width={96}
                                                        height={96}
                                                        className={`rounded-lg object-cover ${
                                                            item.isCustom
                                                                ? "h-24"
                                                                : ""
                                                        }`}
                                                        loading="lazy"
                                                    />
                                                </div>

                                                {/* التفاصيل */}
                                                <div className="flex-1">
                                                    <div className="flex justify-between items-start mb-2">
                                                        <div className="flex-1">
                                                            <h3 className="font-semibold text-gray-800 text-lg">
                                                                {item.title}
                                                            </h3>
                                                            <div className="flex items-center gap-2 mt-1">
                                                                {item.isCustom && (
                                                                    <span className="inline-block text-xs bg-[#5A5E4D]/10 text-[#5A5E4D] px-2 py-1 rounded">
                                                                        باقة
                                                                        مخصصة
                                                                    </span>
                                                                )}
                                                                {item.isCustom &&
                                                                    item.customData && (
                                                                        <button
                                                                            onClick={() =>
                                                                                toggleDetails(
                                                                                    item.id
                                                                                )
                                                                            }
                                                                            className="text-xs text-[#5A5E4D] hover:underline flex items-center gap-1 cursor-pointer"
                                                                        >
                                                                            {expandedItems.has(
                                                                                item.id
                                                                            ) ? (
                                                                                <>
                                                                                    <span>
                                                                                        إخفاء
                                                                                        التفاصيل
                                                                                    </span>
                                                                                    <span>
                                                                                        ▲
                                                                                    </span>
                                                                                </>
                                                                            ) : (
                                                                                <>
                                                                                    <span>
                                                                                        عرض
                                                                                        التفاصيل
                                                                                    </span>
                                                                                    <span>
                                                                                        ▼
                                                                                    </span>
                                                                                </>
                                                                            )}
                                                                        </button>
                                                                    )}
                                                            </div>
                                                        </div>
                                                        <div className="flex gap-2">
                                                            {item.isCustom &&
                                                                item.customData && (
                                                                    <button
                                                                        onClick={() =>
                                                                            editCustomItem(
                                                                                item
                                                                            )
                                                                        }
                                                                        className="text-[#5A5E4D] text-sm hover:text-[#4b5244] cursor-pointer"
                                                                    >
                                                                        تعديل
                                                                    </button>
                                                                )}
                                                            <button
                                                                onClick={() =>
                                                                    removeItem(
                                                                        item.uniqueKey ||
                                                                            item.id
                                                                    )
                                                                }
                                                                className="text-red-600 text-sm hover:text-red-700 cursor-pointer"
                                                            >
                                                                حذف
                                                            </button>
                                                        </div>
                                                    </div>

                                                    {/* ملخص سريع للباقة المخصصة */}
                                                    {item.isCustom &&
                                                        item.customData &&
                                                        !expandedItems.has(
                                                            item.id
                                                        ) && (
                                                            <div className="text-sm text-gray-600">
                                                                <span className="font-medium">
                                                                    {item
                                                                        .customData
                                                                        .size
                                                                        ?.label ||
                                                                        "متوسط"}
                                                                </span>
                                                                <span className="mx-2">
                                                                    •
                                                                </span>
                                                                <span>
                                                                    {item
                                                                        .customData
                                                                        .flowersCount ||
                                                                        0}{" "}
                                                                    زهرة
                                                                </span>
                                                                {item.customData
                                                                    .occasion
                                                                    ?.name && (
                                                                    <>
                                                                        <span className="mx-2">
                                                                            •
                                                                        </span>
                                                                        <span>
                                                                            {
                                                                                item
                                                                                    .customData
                                                                                    .occasion
                                                                                    .name
                                                                            }
                                                                        </span>
                                                                    </>
                                                                )}
                                                            </div>
                                                        )}

                                                    {/* تفاصيل الباقة المخصصة (قابلة للطي) */}
                                                    {item.isCustom &&
                                                    item.customData &&
                                                    expandedItems.has(
                                                        item.id
                                                    ) ? (
                                                        <div className="text-sm text-gray-600 space-y-1">
                                                            {/* الحجم والتغليف */}
                                                            <div>
                                                                <span className="font-medium">
                                                                    الحجم:
                                                                </span>{" "}
                                                                {item.customData
                                                                    .size
                                                                    ?.label ||
                                                                    "غير محدد"}
                                                                <span className="mx-2">
                                                                    •
                                                                </span>
                                                                <span className="font-medium">
                                                                    التغليف:
                                                                </span>{" "}
                                                                {item.customData
                                                                    .style
                                                                    ?.label ||
                                                                    "غير محدد"}
                                                            </div>

                                                            {/* الزهور */}
                                                            {item.customData
                                                                .flowers &&
                                                                item.customData
                                                                    .flowers
                                                                    .length >
                                                                    0 && (
                                                                    <div>
                                                                        <span className="font-medium">
                                                                            الزهور:
                                                                        </span>
                                                                        <div className="mr-4 mt-1">
                                                                            {item.customData.flowers.map(
                                                                                (
                                                                                    f: any,
                                                                                    idx: number
                                                                                ) => (
                                                                                    <div
                                                                                        key={
                                                                                            idx
                                                                                        }
                                                                                        className="text-xs"
                                                                                    >
                                                                                        •{" "}
                                                                                        {
                                                                                            f.name
                                                                                        }{" "}
                                                                                        ×{" "}
                                                                                        {
                                                                                            f.quantity
                                                                                        }{" "}
                                                                                        ={" "}
                                                                                        {
                                                                                            f.total
                                                                                        }{" "}
                                                                                        ريال
                                                                                    </div>
                                                                                )
                                                                            )}
                                                                        </div>
                                                                    </div>
                                                                )}

                                                            {/* الألوان */}
                                                            {item.customData
                                                                .colors &&
                                                                item.customData
                                                                    .colors
                                                                    .length >
                                                                    0 && (
                                                                    <div className="flex items-center gap-2">
                                                                        <span className="font-medium">
                                                                            الألوان:
                                                                        </span>
                                                                        <div className="flex gap-1">
                                                                            {item.customData.colors.map(
                                                                                (
                                                                                    color: string,
                                                                                    idx: number
                                                                                ) => (
                                                                                    <span
                                                                                        key={
                                                                                            idx
                                                                                        }
                                                                                        className="inline-block h-4 w-4 rounded-full border"
                                                                                        style={{
                                                                                            backgroundColor:
                                                                                                color,
                                                                                        }}
                                                                                    />
                                                                                )
                                                                            )}
                                                                        </div>
                                                                    </div>
                                                                )}

                                                            {/* المناسبة */}
                                                            {item.customData
                                                                .occasion
                                                                ?.name && (
                                                                <div>
                                                                    <span className="font-medium">
                                                                        المناسبة:
                                                                    </span>{" "}
                                                                    {
                                                                        item
                                                                            .customData
                                                                            .occasion
                                                                            .name
                                                                    }
                                                                </div>
                                                            )}

                                                            {/* بطاقة التهنئة */}
                                                            {item.customData
                                                                .includeCard && (
                                                                <div className="bg-gray-50 p-2 rounded mt-2">
                                                                    <div className="font-medium text-xs">
                                                                        💌 بطاقة
                                                                        تهنئة (
                                                                        {
                                                                            item
                                                                                .customData
                                                                                .cardPrice
                                                                        }{" "}
                                                                        ريال):
                                                                    </div>
                                                                    <div className="text-xs italic mt-1">
                                                                        {item
                                                                            .customData
                                                                            .cardMessage ||
                                                                            "لا توجد رسالة"}
                                                                    </div>
                                                                </div>
                                                            )}
                                                        </div>
                                                    ) : (
                                                        // تفاصيل الباقات الجاهزة القديمة
                                                        <div className="text-sm text-gray-600">
                                                            الحجم:{" "}
                                                            {item.size ===
                                                            "small"
                                                                ? "صغير"
                                                                : item.size ===
                                                                  "medium"
                                                                ? "متوسط"
                                                                : "كبير"}
                                                            {item.style && (
                                                                <>
                                                                    {" "}
                                                                    • التغليف:{" "}
                                                                    {item.style}
                                                                </>
                                                            )}
                                                            {item.color && (
                                                                <>
                                                                    {" "}
                                                                    • اللون:{" "}
                                                                    <span
                                                                        className="inline-block h-3 w-3 rounded-full align-middle"
                                                                        style={{
                                                                            backgroundColor:
                                                                                item.color,
                                                                        }}
                                                                    ></span>
                                                                </>
                                                            )}
                                                        </div>
                                                    )}

                                                    {/* السعر وعداد الكمية */}
                                                    <div className="mt-3 border-t pt-3 border-gray-200">
                                                        <div className="flex justify-between items-center mb-2">
                                                            <div className="text-xs text-gray-500 italic">
                                                                شامل الضريبة
                                                            </div>
                                                            <div className="font-bold text-[#5A5E4D] text-lg">
                                                                {item.isCustom
                                                                    ? (
                                                                          item.price ||
                                                                          0
                                                                      ).toFixed(
                                                                          2
                                                                      )
                                                                    : item.total ||
                                                                      item.price ||
                                                                      0}{" "}
                                                                ريال
                                                            </div>
                                                        </div>

                                                        {/* عداد الكمية */}
                                                        <div className="flex justify-between items-center bg-gradient-to-r from-[#5A5E4D]/5 to-[#5A5E4D]/10 rounded-xl p-4 border border-[#5A5E4D]/20 shadow-sm backdrop-blur-sm">
                                                            <div className="flex items-center gap-3">
                                                                <div className="w-8 h-8 bg-[#5A5E4D]/10 rounded-full flex items-center justify-center shadow-sm">
                                                                    <svg
                                                                        className="w-4 h-4 text-[#5A5E4D]"
                                                                        fill="none"
                                                                        stroke="currentColor"
                                                                        viewBox="0 0 24 24"
                                                                    >
                                                                        <path
                                                                            strokeLinecap="round"
                                                                            strokeLinejoin="round"
                                                                            strokeWidth={
                                                                                2
                                                                            }
                                                                            d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                                                                        />
                                                                    </svg>
                                                                </div>
                                                                <span className="text-sm font-bold text-gray-800">
                                                                    الكمية
                                                                </span>
                                                            </div>
                                                            <QuantitySelector
                                                                itemId={
                                                                    item.uniqueKey ||
                                                                    item.id
                                                                }
                                                                initialQuantity={
                                                                    item.quantity ||
                                                                    1
                                                                }
                                                                productData={
                                                                    item
                                                                }
                                                            />
                                                        </div>

                                                        {/* إجمالي السعر للكمية */}
                                                        <div className="flex justify-between items-center mt-2 text-sm">
                                                            <span className="font-medium text-gray-700">
                                                                الإجمالي:
                                                            </span>
                                                            <span className="font-bold text-[#5A5E4D]">
                                                                {(
                                                                    (item.isCustom
                                                                        ? item.price ||
                                                                          0
                                                                        : item.total ||
                                                                          item.price ||
                                                                          0) *
                                                                    (item.quantity ||
                                                                        1)
                                                                ).toFixed(
                                                                    2
                                                                )}{" "}
                                                                ريال
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </>
                            )}
                        </div>

                        {/* Summary */}
                        <aside className="bg-white rounded-2xl border border-gray-200 shadow-sm p-4 h-fit">
                            <h2
                                className="text-lg font-semibold mb-3"
                                style={{ fontFamily: "var(--font-almarai)" }}
                            >
                                ملخص الطلب
                            </h2>
                            <div className="space-y-2 text-sm">
                                <div className="flex justify-between text-xs text-gray-500 mb-2 pb-2 border-b border-gray-200">
                                    <span>المنتجات المختارة</span>
                                    <span className="font-semibold">
                                        {itemsCount} من {items.length}
                                    </span>
                                </div>
                                {totalItemsCount > itemsCount && (
                                    <div className="flex justify-between text-xs text-gray-500 mb-2 pb-2 border-b border-gray-200">
                                        <span>إجمالي الكمية</span>
                                        <span className="font-semibold">
                                            {totalItemsCount} قطعة
                                        </span>
                                    </div>
                                )}
                                {itemsCount === 0 ? (
                                    <div className="text-center py-4 text-gray-500 text-xs">
                                        يرجى اختيار منتج واحد على الأقل
                                    </div>
                                ) : (
                                    <>
                                        <div className="flex justify-between font-bold pt-2 text-base">
                                            <span>الإجمالي</span>
                                            <span className="text-[#5A5E4D]">
                                                {grandTotal.toFixed(2)} ريال
                                            </span>
                                        </div>
                                        <div className="text-xs text-gray-500 italic">
                                            * الأسعار شاملة ضريبة القيمة المضافة
                                        </div>
                                    </>
                                )}
                            </div>
                            <button
                                onClick={() =>
                                    (window.location.href = "/checkout")
                                }
                                disabled={itemsCount === 0}
                                className={`mt-4 w-full rounded-md py-2 transition-colors ${
                                    itemsCount === 0
                                        ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                                        : "bg-[#5A5E4D] text-white hover:bg-[#4b5244] cursor-pointer"
                                }`}
                            >
                                متابعة الدفع{" "}
                                {itemsCount > 0 && `(${totalItemsCount} قطعة)`}
                            </button>
                        </aside>
                    </div>
                </div>
            </main>
        </div>
    );
}
