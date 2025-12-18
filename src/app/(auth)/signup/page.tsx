"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export const dynamic = "force-dynamic";
import Link from "next/link";
import Image from "next/image";
import { MapPin } from "lucide-react";
import { fontStyle } from "@/lib/styles";
import { useAuth } from "@/providers/auth-provider";
import { useNotification } from "@/providers/notification-provider";
import { getPendingAction } from "@/utils/pendingActions";
import { executePendingAction } from "@/utils/pendingActionsExecutor";
import { useCartStore } from "@/stores";
import { useFavorites } from "@/hooks/useFavorites";
import { useCustomBouquetFavorites } from "@/hooks/useCustomBouquetFavorites";

export default function SignupPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { signup, isAuthenticated } = useAuth();
  const { showNotification } = useNotification();
  const addToCart = useCartStore((state) => state.addItem);
  const { addToFavorites } = useFavorites();
  const { addToCart: addCustomBouquetToCart, addToFavorites: addCustomBouquetToFavorites } =
    useCustomBouquetFavorites();

  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    email: "",
    address: "",
    password: "",
    gender: "ذكر",
    agree: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  // إذا كان المستخدم مسجل دخول بالفعل، توجيهه
  useEffect(() => {
    if (isAuthenticated) {
      const returnPath = searchParams.get("return") || "/";
      router.push(returnPath);
    }
  }, [isAuthenticated, router, searchParams]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setForm((p) => ({
      ...p,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const validate = () => {
    const err: Record<string, string> = {};
    if (!form.fullName.trim()) err.fullName = "الاسم مطلوب";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) err.email = "بريد غير صالح";
    if (!/^\+?\d{8,15}$/.test(form.phone)) err.phone = "رقم غير صالح";
    if (!form.address.trim()) err.address = "العنوان مطلوب";
    if (form.password.length < 6) err.password = "كلمة المرور 6 أحرف على الأقل";
    if (!form.agree) err.agree = "يجب الموافقة على الشروط";
    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleMapClick = () => {
    // محاكاة لفتح الخريطة
    alert("سيتم فتح خريطة لتحديد الموقع (محاكاة)");
    // في التطبيق الحقيقي، يمكن استخدام:
    // - Google Maps API
    // - MapBox
    // - أو أي خدمة خرائط أخرى
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);

    try {
      const result = await signup({
        fullName: form.fullName,
        email: form.email,
        phone: form.phone,
        password: form.password,
      });

      if (result.success) {
        showNotification("تم إنشاء الحساب بنجاح! ✓", "success");

        // تنفيذ الإجراء المعلق إن وجد
        const pendingAction = getPendingAction();
        if (pendingAction) {
          await executePendingAction(pendingAction, {
            addToCart,
            addToFavorites,
            addCustomBouquetToCart,
            addCustomBouquetToFavorites,
            showNotification,
          });
        }

        // التوجيه للصفحة السابقة أو الصفحة الرئيسية
        const returnPath = pendingAction?.returnPath || searchParams.get("return") || "/";
        setTimeout(() => {
          router.push(returnPath);
        }, 500);
      } else {
        showNotification(result.error || "فشل إنشاء الحساب", "error");
        setSubmitting(false);
      }
    } catch {
      showNotification("حدث خطأ أثناء إنشاء الحساب", "error");
      setSubmitting(false);
    }
  };

  return (
    <div className="mx-auto w-full max-w-md rounded-xl bg-white shadow-[0_10px_30px_rgba(0,0,0,0.08)]">
      <div className="py-6 text-center">
        <div className="flex justify-center">
          <Image src="/Logo-shams.svg" alt="شعار الموقع" width={120} height={60} priority />
        </div>
        <p className="mt-2 text-sm text-gray-600" style={fontStyle}>
          مرحبًا بك في زهور الشمس
        </p>
      </div>
      <div className="px-6 pb-6">
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-gray-700 mb-1" htmlFor="fullName">
              الاسم الكامل
            </label>
            <input
              id="fullName"
              name="fullName"
              value={form.fullName}
              onChange={handleChange}
              className="w-full h-10 rounded-md border border-gray-300 bg-white px-3 text-right focus:outline-none focus:ring-2 focus:ring-[#5A5E4D]/30"
              placeholder="اكتب اسمك"
            />
            {errors.fullName && <p className="mt-1 text-xs text-red-600">{errors.fullName}</p>}
          </div>
          <div>
            <label className="block text-sm text-gray-700 mb-1" htmlFor="phone">
              رقم الهاتف
            </label>
            <input
              id="phone"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              className="w-full h-10 rounded-md border border-gray-300 bg-white px-3 text-right focus:outline-none focus:ring-2 focus:ring-[#5A5E4D]/30"
              placeholder="مثال: 9665xxxxxxxx+"
            />
            {errors.phone && <p className="mt-1 text-xs text-red-600">{errors.phone}</p>}
          </div>
          <div>
            <label className="block text-sm text-gray-700 mb-1" htmlFor="email">
              البريد الإلكتروني
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              className="w-full h-10 rounded-md border border-gray-300 bg-white px-3 text-right focus:outline-none focus:ring-2 focus:ring-[#5A5E4D]/30"
              placeholder="example@mail.com"
            />
            {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email}</p>}
          </div>
          <div>
            <label className="block text-sm text-gray-700 mb-1" htmlFor="password">
              كلمة المرور
            </label>
            <input
              id="password"
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              className="w-full h-10 rounded-md border border-gray-300 bg-white px-3 text-right focus:outline-none focus:ring-2 focus:ring-[#5A5E4D]/30"
              placeholder="••••••••"
            />
            {errors.password && <p className="mt-1 text-xs text-red-600">{errors.password}</p>}
          </div>
          <div>
            <label className="block text-sm text-gray-700 mb-1" htmlFor="address">
              العنوان
            </label>
            <div className="relative">
              <input
                id="address"
                name="address"
                type="text"
                value={form.address}
                onChange={handleChange}
                className="w-full h-10 rounded-md border border-gray-300 bg-white pl-10 pr-3 text-right focus:outline-none focus:ring-2 focus:ring-[#5A5E4D]/30"
                placeholder="مثال: مكة، شارع الملك سعود"
              />
              <button
                type="button"
                onClick={handleMapClick}
                className="absolute left-1 top-1/2 -translate-y-1/2 p-1.5 hover:bg-gray-100 rounded-md transition-colors cursor-pointer"
                aria-label="فتح الخريطة لتحديد الموقع"
              >
                <MapPin className="w-5 h-5 text-gray-600" />
              </button>
            </div>
            {errors.address && <p className="mt-1 text-xs text-red-600">{errors.address}</p>}
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <input
                id="male"
                name="gender"
                type="radio"
                value="ذكر"
                checked={form.gender === "ذكر"}
                onChange={handleChange}
              />
              <label htmlFor="male" className="text-sm text-gray-700">
                ذكر
              </label>
              <input
                id="female"
                name="gender"
                type="radio"
                value="أنثى"
                className="ml-4"
                checked={form.gender === "أنثى"}
                onChange={handleChange}
              />
              <label htmlFor="female" className="text-sm text-gray-700">
                أنثى
              </label>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <input
              id="agree"
              name="agree"
              type="checkbox"
              checked={form.agree}
              onChange={handleChange}
            />
            <label htmlFor="agree" className="text-sm text-gray-700">
              أوافق على الشروط والأحكام
            </label>
          </div>
          {errors.agree && <p className="-mt-2 text-xs text-red-600">{errors.agree}</p>}

          <button
            type="submit"
            disabled={submitting}
            className="w-full h-10 rounded-md text-white font-semibold transition-opacity cursor-pointer disabled:cursor-not-allowed"
            style={{
              backgroundColor: "#5A5E4D",
              opacity: submitting ? 0.8 : 1,
              fontFamily: "var(--font-almarai)",
            }}
          >
            {submitting ? "... جاري الإنشاء" : "إنشاء حساب"}
          </button>
          <div className="text-center text-xs text-gray-600">
            <Link href="/login" className="hover:underline cursor-pointer">
              لديك حساب؟ تسجيل الدخول
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
