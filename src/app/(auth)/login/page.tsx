"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export const dynamic = "force-dynamic";
import isValidEmail from "@/validations/isValidEmail";
import Link from "next/link";
import Image from "next/image";
import { fontStyle } from "@/lib/styles";
import { useAuth } from "@/providers/auth-provider";
import { useNotification } from "@/providers/notification-provider";
import { getPendingAction } from "@/utils/pendingActions";
import { executePendingAction } from "@/utils/pendingActionsExecutor";
import { useCartStore } from "@/stores";
import { useFavorites } from "@/hooks/useFavorites";
import { useCustomBouquetFavorites } from "@/hooks/useCustomBouquetFavorites";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login, isAuthenticated } = useAuth();
  const { showNotification } = useNotification();
  const addToCart = useCartStore((state) => state.addItem);
  const { addToFavorites } = useFavorites();
  const { addToCart: addCustomBouquetToCart, addToFavorites: addCustomBouquetToFavorites } =
    useCustomBouquetFavorites();

  const [form, setForm] = useState({ email: "", password: "" });
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
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  };

  const validate = () => {
    const err: Record<string, string> = {};

    if (!form.email.trim()) {
      err.email = "البريد الإلكتروني مطلوب";
    } else if (!isValidEmail(form.email)) {
      err.email = "الرجاء إدخال بريد إلكتروني صحيح";
    }

    if (!form.password.trim()) {
      err.password = "كلمة المرور مطلوبة";
    } else if (form.password.length < 6) {
      err.password = "كلمة المرور يجب أن تكون 6 أحرف على الأقل";
    }

    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);

    try {
      const result = await login(form.email, form.password);

      if (result.success) {
        showNotification("تم تسجيل الدخول بنجاح! ✓", "success");

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
        showNotification(result.error || "فشل تسجيل الدخول", "error");
        setSubmitting(false);
      }
    } catch {
      showNotification("حدث خطأ أثناء تسجيل الدخول", "error");
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
          مرحبًا بعودتك
        </p>
      </div>
      <div className="px-6 pb-6">
        <form onSubmit={onSubmit} className="space-y-4">
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
              placeholder="********"
            />
            {errors.password && <p className="mt-1 text-xs text-red-600">{errors.password}</p>}
          </div>

          <div className="text-right">
            <Link href="/forgot-password" className="text-xs text-[#5A5E4D] hover:underline">
              نسيت كلمة المرور؟
            </Link>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full h-10 rounded-md text-white font-semibold transition-opacity"
            style={{
              backgroundColor: "#5A5E4D",
              opacity: submitting ? 0.8 : 1,
              fontFamily: "var(--font-almarai)",
            }}
          >
            {submitting ? "... جاري تسجيل الدخول" : "تسجيل الدخول"}
          </button>
          <div className="text-center text-xs text-gray-600">
            <Link href="/signup" className="hover:underline">
              ليس لديك حساب؟ إنشاء حساب
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
