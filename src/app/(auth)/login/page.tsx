"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export const dynamic = "force-dynamic";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/providers/auth-provider";
import { useNotification } from "@/providers/notification-provider";
import { getPendingAction } from "@/utils/pendingActions";
import { executePendingAction } from "@/utils/pendingActionsExecutor";
import { useCartStore } from "@/stores";
import { useFavorites } from "@/hooks/useFavorites";
import { useCustomBouquetFavorites } from "@/hooks/useCustomBouquetFavorites";
import { loginSchema, type LoginFormData } from "@/validations/schemas/loginSchema";
import { TIMEOUTS, SIZES } from "@/constants";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login, isAuthenticated } = useAuth();
  const { showNotification } = useNotification();
  const addToCart = useCartStore((state) => state.addItem);
  const { addToFavorites } = useFavorites();
  const { addToCart: addCustomBouquetToCart, addToFavorites: addCustomBouquetToFavorites } =
    useCustomBouquetFavorites();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // إذا كان المستخدم مسجل دخول بالفعل، توجيهه
  useEffect(() => {
    if (isAuthenticated) {
      const returnPath = searchParams.get("return") || "/";
      router.push(returnPath);
    }
  }, [isAuthenticated, router, searchParams]);

  const onSubmit = async (data: LoginFormData) => {
    try {
      const result = await login(data.email, data.password);

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
        }, TIMEOUTS.AUTH_REDIRECT_DELAY);
      } else {
        showNotification(result.error || "فشل تسجيل الدخول", "error");
      }
    } catch {
      showNotification("حدث خطأ أثناء تسجيل الدخول", "error");
    }
  };

  return (
    <div className="mx-auto w-full max-w-md rounded-xl bg-white shadow-[0_10px_30px_rgba(0,0,0,0.08)]">
      <div className="py-6 text-center">
        <div className="flex justify-center">
          <Image
            src="/Logo-shams.svg"
            alt="شعار الموقع"
            width={SIZES.LOGO_WIDTH}
            height={SIZES.LOGO_HEIGHT}
            priority
          />
        </div>
        <p className="mt-2 text-sm text-gray-600">مرحبًا بعودتك</p>
      </div>
      <div className="px-6 pb-6">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm text-gray-700 mb-1" htmlFor="email">
              البريد الإلكتروني
            </label>
            <input
              id="email"
              type="email"
              {...register("email")}
              className="w-full h-10 rounded-md border border-gray-300 bg-white px-3 text-right focus:outline-none focus:ring-2 focus:ring-[#5A5E4D]/30"
              placeholder="example@mail.com"
            />
            {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email.message}</p>}
          </div>

          <div>
            <label className="block text-sm text-gray-700 mb-1" htmlFor="password">
              كلمة المرور
            </label>
            <input
              id="password"
              type="password"
              {...register("password")}
              className="w-full h-10 rounded-md border border-gray-300 bg-white px-3 text-right focus:outline-none focus:ring-2 focus:ring-[#5A5E4D]/30"
              placeholder="********"
            />
            {errors.password && (
              <p className="mt-1 text-xs text-red-600">{errors.password.message}</p>
            )}
          </div>

          <div className="text-right">
            <Link href="/forgot-password" className="text-xs text-[#5A5E4D] hover:underline">
              نسيت كلمة المرور؟
            </Link>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full h-10 rounded-md text-white font-semibold transition-opacity bg-[#5A5E4D] ${isSubmitting ? "opacity-80" : "opacity-100"}`}
          >
            {isSubmitting ? "... جاري تسجيل الدخول" : "تسجيل الدخول"}
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
