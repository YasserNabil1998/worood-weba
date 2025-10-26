"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useNotification } from "@/src/providers/notification-provider";
import { CartItem } from "@/src/@types/checkout/CartItem.type";
import { useCart } from "@/src/hooks/useCart";
import { storage } from "@/src/lib/utils";
import { STORAGE_KEYS, APP_CONFIG } from "@/src/constants";
import { Order } from "@/src/@types/orders/order.type";

export default function CheckoutPage() {
  const [items, setItems] = useState<CartItem[]>([]);
  const [address, setAddress] = useState({
    city: "",
    district: "",
    street: "",
    landmark: "",
    phone: "",
  });
  const [notes, setNotes] = useState("");
  const [payMethod, setPayMethod] = useState<"mada" | "visa" | "apple" | "cod">(
    "mada"
  );
  const { showNotification } = useNotification();
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        // قراءة المنتجات المختارة للـ checkout
        const checkoutItems = storage.get(STORAGE_KEYS.CHECKOUT_ITEMS, []);
        const safeItems = Array.isArray(checkoutItems) ? checkoutItems : [];

        // إذا لم توجد منتجات محددة، الرجوع للسلة
        if (safeItems.length === 0) {
          window.location.href = "/cart";
          return;
        }

        setItems(safeItems);
      } catch (error) {
        console.error("خطأ في تحميل المنتجات:", error);
        window.location.href = "/cart";
      }
    }
  }, []);

  const subtotal = items.reduce((s, i) => {
    const itemPrice = i.isCustom ? i.price ?? 0 : i.total ?? i.price ?? 0;
    return s + itemPrice;
  }, 0);
  const vat = Math.round(subtotal * APP_CONFIG.VAT_RATE);
  const grand = subtotal + vat;

  // دالة توليد رقم طلب فريد
  const generateOrderNumber = () => {
    const year = new Date().getFullYear();
    const existingOrders = storage.get<Order[]>(STORAGE_KEYS.ORDERS, []);
    const orderCount = existingOrders.length + 1;
    return `ORD-${year}-${String(orderCount).padStart(3, "0")}`;
  };

  // دالة تحويل اسم طريقة الدفع إلى العربية
  const getPaymentMethodName = (method: string) => {
    switch (method) {
      case "mada":
        return "مدى";
      case "visa":
        return "فيزا";
      case "apple":
        return "Apple Pay";
      case "cod":
        return "الدفع عند الاستلام";
      default:
        return "غير محدد";
    }
  };

  // دالة الحصول على التاريخ بالعربية
  const getArabicDate = () => {
    const date = new Date();
    const months = [
      "يناير",
      "فبراير",
      "مارس",
      "أبريل",
      "مايو",
      "يونيو",
      "يوليو",
      "أغسطس",
      "سبتمبر",
      "أكتوبر",
      "نوفمبر",
      "ديسمبر",
    ];
    return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
  };

  const placeOrder = () => {
    // التحقق من البيانات المطلوبة
    if (
      !address.city ||
      !address.district ||
      !address.street ||
      !address.phone
    ) {
      showNotification("يرجى ملء جميع حقول العنوان المطلوبة", "error", 4000);
      return;
    }

    if (items.length === 0) {
      showNotification("السلة فارغة، يرجى إضافة منتجات", "error", 4000);
      return;
    }

    // إنشاء الطلب الجديد
    const newOrder: Order = {
      id: Date.now().toString(),
      orderNumber: generateOrderNumber(),
      status: "قيد المعالجة",
      statusColor: "bg-orange-100 text-orange-800",
      date: getArabicDate(),
      totalAmount: grand,
      items: items.map((item) => ({
        id: item.id.toString(),
        name: item.title,
        image: item.image || "/images/bouquets/IMG-196.png",
        price: item.total,
        quantity: 1,
        bouquetType: `${item.size} - ${item.style}`,
      })),
      deliveryAddress: `${address.city}، ${address.district}، ${
        address.street
      }${address.landmark ? `، ${address.landmark}` : ""}`,
      paymentMethod: getPaymentMethodName(payMethod),
      notes: notes || undefined,
    };

    // حفظ الطلب في localStorage
    const existingOrders = storage.get<Order[]>(STORAGE_KEYS.ORDERS, []);
    const updatedOrders = [newOrder, ...existingOrders];
    storage.set(STORAGE_KEYS.ORDERS, updatedOrders);

    // إزالة المنتجات المختارة فقط من السلة
    const fullCart = storage.get(STORAGE_KEYS.CART, []);
    const itemIdsToRemove = items.map((item) => item.id);
    const updatedCart = fullCart.filter(
      (cartItem: any) => !itemIdsToRemove.includes(cartItem.id)
    );
    storage.set(STORAGE_KEYS.CART, updatedCart);

    // مسح المنتجات المختارة للـ checkout
    storage.remove(STORAGE_KEYS.CHECKOUT_ITEMS);

    // إطلاق حدث تحديث السلة
    window.dispatchEvent(new CustomEvent("cartUpdated"));

    // إظهار إشعار النجاح
    showNotification("تم تأكيد الطلب بنجاح! شكراً لثقتكم بنا", "success", 4000);

    // إعادة التوجيه إلى صفحة الطلبات
    setTimeout(() => {
      router.push("/orders");
    }, 1000);
  };

  return (
    <div className="min-h-screen" dir="rtl">
      <main className="py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1
            className="text-2xl md:text-3xl font-extrabold text-gray-800 mb-6"
            style={{ fontFamily: "var(--font-almarai)" }}
          >
            متابعة الدفع
          </h1>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Form */}
            <div className="lg:col-span-2 space-y-6">
              <section className="bg-white rounded-2xl border border-gray-200 shadow-sm p-4">
                <h2
                  className="text-lg font-semibold mb-3"
                  style={{
                    fontFamily: "var(--font-almarai)",
                  }}
                >
                  عنوان التوصيل
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    placeholder="المدينة"
                    value={address.city}
                    onChange={(e) =>
                      setAddress({
                        ...address,
                        city: e.target.value,
                      })
                    }
                    className="rounded-lg border border-gray-200 px-3 py-2"
                  />
                  <input
                    placeholder="الحي"
                    value={address.district}
                    onChange={(e) =>
                      setAddress({
                        ...address,
                        district: e.target.value,
                      })
                    }
                    className="rounded-lg border border-gray-200 px-3 py-2"
                  />
                  <input
                    placeholder="الشارع"
                    value={address.street}
                    onChange={(e) =>
                      setAddress({
                        ...address,
                        street: e.target.value,
                      })
                    }
                    className="rounded-lg border border-gray-200 px-3 py-2"
                  />
                  <input
                    placeholder="أقرب معلم"
                    value={address.landmark}
                    onChange={(e) =>
                      setAddress({
                        ...address,
                        landmark: e.target.value,
                      })
                    }
                    className="rounded-lg border border-gray-200 px-3 py-2"
                  />
                  <input
                    placeholder="رقم الجوال"
                    value={address.phone}
                    onChange={(e) =>
                      setAddress({
                        ...address,
                        phone: e.target.value,
                      })
                    }
                    className="rounded-lg border border-gray-200 px-3 py-2"
                  />
                  <textarea
                    placeholder="ملاحظات إضافية (اختياري)"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="rounded-lg border border-gray-200 px-3 py-2 sm:col-span-2 resize-none"
                    rows={3}
                  />
                </div>
              </section>

              <section className="bg-white rounded-2xl border border-gray-200 shadow-sm p-4">
                <h2
                  className="text-lg font-semibold mb-3"
                  style={{
                    fontFamily: "var(--font-almarai)",
                  }}
                >
                  طريقة الدفع
                </h2>
                <div className="space-y-3">
                  {[
                    {
                      key: "mada",
                      label: "Mada",
                      icon: "💳",
                    },
                    {
                      key: "visa",
                      label: "Visa",
                      icon: "💳",
                    },
                    {
                      key: "apple",
                      label: "Apple Pay",
                      icon: "🍎",
                    },
                    {
                      key: "cod",
                      label: "الدفع عند الاستلام",
                      icon: "💵",
                    },
                  ].map((g: any) => (
                    <button
                      key={g.key}
                      type="button"
                      onClick={() => setPayMethod(g.key)}
                      className={`w-full flex items-center justify-between rounded-md border px-3 py-2 text-right ${
                        payMethod === g.key
                          ? "border-[#5A5E4D] bg-[#5A5E4D]/5"
                          : "border-gray-200 bg-white hover:bg-gray-50"
                      }`}
                    >
                      <span className="flex items-center gap-3">
                        <span className="inline-flex h-5 w-5 items-center justify-center text-gray-700">
                          {g.icon}
                        </span>
                        <span className="text-sm text-gray-800">{g.label}</span>
                      </span>
                      <span
                        className={`h-4 w-4 rounded-full border ${
                          payMethod === g.key
                            ? "border-[#5A5E4D] ring-2 ring-[#5A5E4D]/30 bg-[#5A5E4D]"
                            : "border-gray-300"
                        }`}
                      ></span>
                    </button>
                  ))}
                </div>
              </section>
            </div>

            {/* Summary */}
            <aside className="bg-white rounded-2xl border border-gray-200 shadow-sm p-4 h-fit">
              <h2
                className="text-lg font-semibold mb-3"
                style={{ fontFamily: "var(--font-almarai)" }}
              >
                ملخص الطلب
              </h2>
              <ul className="mb-3 divide-y">
                {items.map((it) => {
                  const itemPrice = it.isCustom
                    ? it.price ?? 0
                    : it.total ?? it.price ?? 0;
                  return (
                    <li
                      key={it.id}
                      className="py-2 flex items-center justify-between text-sm"
                    >
                      <span className="text-gray-700">{it.title}</span>
                      <span className="font-semibold">
                        ريال {itemPrice.toFixed(2)}
                      </span>
                    </li>
                  );
                })}
              </ul>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">الإجمالي الفرعي</span>
                  <span>ريال {subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">
                    ضريبة القيمة المضافة{" "}
                    {(APP_CONFIG.VAT_RATE * 100).toFixed(0)}%
                  </span>
                  <span>ريال {vat.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-bold border-t pt-2">
                  <span>المجموع</span>
                  <span>ريال {grand.toFixed(2)}</span>
                </div>
              </div>
              <button
                onClick={placeOrder}
                className="mt-4 w-full rounded-md bg-[#5A5E4D] text-white py-2"
              >
                تأكيد الطلب
              </button>
            </aside>
          </div>
        </div>
      </main>
    </div>
  );
}
