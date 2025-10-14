"use client";

import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useNotification } from "@/components/NotificationSystem";

interface CartItem {
    id: number;
    title: string;
    size: string;
    style: string;
    color: string;
    total: number;
}

export default function CheckoutPage() {
    const [items, setItems] = useState<CartItem[]>([]);
    const [address, setAddress] = useState({
        city: "",
        district: "",
        street: "",
        landmark: "",
        phone: "",
    });
    const [payMethod, setPayMethod] = useState<
        "mada" | "apple" | "stc" | "cod"
    >("mada");
    const { showNotification } = useNotification();

    useEffect(() => {
        if (typeof window !== "undefined") {
            try {
                const cart = JSON.parse(localStorage.getItem("cart") || "[]");
                const safeCart = Array.isArray(cart) ? cart : [];
                setItems(safeCart);
            } catch (error) {
                console.error("خطأ في تحميل السلة:", error);
                localStorage.setItem("cart", "[]");
                setItems([]);
            }
        }
    }, []);

    const subtotal = items.reduce((s, i) => s + i.total, 0);
    const vat = Math.round(subtotal * 0.15);
    const grand = subtotal + vat;

    const placeOrder = () => {
        showNotification(
            "تم تأكيد الطلب بنجاح! شكراً لثقتكم بنا",
            "success",
            4000
        );
        // في مشروع حقيقي: إرسال الطلب إلى الخادم
    };

    return (
        <div className="min-h-screen" dir="rtl">
            <Header />
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
                                            label: "بطاقة مدى",
                                            icon: "💳",
                                        },
                                        {
                                            key: "apple",
                                            label: "Apple Pay",
                                            icon: "",
                                        },
                                        {
                                            key: "stc",
                                            label: "STC Pay",
                                            icon: "💠",
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
                                                <span className="text-sm text-gray-800">
                                                    {g.label}
                                                </span>
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
                                {items.map((it) => (
                                    <li
                                        key={it.id}
                                        className="py-2 flex items-center justify-between text-sm"
                                    >
                                        <span className="text-gray-700">
                                            {it.title}
                                        </span>
                                        <span className="font-semibold">
                                            ريال {it.total}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                            <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-gray-600">
                                        الإجمالي الفرعي
                                    </span>
                                    <span>ريال {subtotal}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">
                                        ضريبة القيمة المضافة 15%
                                    </span>
                                    <span>ريال {vat}</span>
                                </div>
                                <div className="flex justify-between font-bold border-t pt-2">
                                    <span>المجموع</span>
                                    <span>ريال {grand}</span>
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
            <Footer />
        </div>
    );
}
