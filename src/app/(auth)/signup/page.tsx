"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export const dynamic = "force-dynamic";
import Link from "next/link";
import Image from "next/image";
import { MapPin } from "lucide-react";
import { fontStyle } from "@/lib/styles";
import { logger } from "@/lib/logger";
import { useAuth } from "@/providers/auth-provider";
import { useNotification } from "@/providers/notification-provider";
import { getPendingAction } from "@/utils/pendingActions";
import { executePendingAction } from "@/utils/pendingActionsExecutor";
import { useCartStore } from "@/stores";
import { useFavorites } from "@/hooks/useFavorites";
import { useCustomBouquetFavorites } from "@/hooks/useCustomBouquetFavorites";
import { signupSchema, type SignupFormData } from "@/validations/schemas/signupSchema";

export default function SignupPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { signup, isAuthenticated } = useAuth();
  const { showNotification } = useNotification();
  const addToCart = useCartStore((state) => state.addItem);
  const { addToFavorites } = useFavorites();
  const { addToCart: addCustomBouquetToCart, addToFavorites: addCustomBouquetToFavorites } =
    useCustomBouquetFavorites();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      fullName: "",
      phone: "",
      email: "",
      address: "",
      password: "",
      gender: "ذكر",
      agree: false,
    },
  });

  // إذا كان المستخدم مسجل دخول بالفعل، توجيهه
  useEffect(() => {
    if (isAuthenticated) {
      const returnPath = searchParams.get("return") || "/";
      router.push(returnPath);
    }
  }, [isAuthenticated, router, searchParams]);

  const handleMapClick = () => {
    // محاكاة لفتح الخريطة
    alert("سيتم فتح خريطة لتحديد الموقع (محاكاة)");
    // في التطبيق الحقيقي، يمكن استخدام:
    // - Google Maps API
    // - MapBox
    // - أو أي خدمة خرائط أخرى
  };

  const onSubmit = async (data: SignupFormData) => {
    try {
      const result = await signup({
        fullName: data.fullName,
        email: data.email,
        phone: data.phone,
        password: data.password,
        address: data.address,
        gender: data.gender,
      });

      if (result.success) {
        showNotification("تم إنشاء الحساب بنجاح! ✓", "success");

        // TODO: إرسال رمز التحقق إلى رقم الهاتف (معطل حالياً)
        // const verificationResult = await sendVerificationCode(data.phone);

        // Mock - محاكاة إرسال رمز التحقق
        logger.debug(`[Mock] إرسال رمز التحقق إلى: ${data.phone}`);
        const verificationResult = { success: true }; // محاكاة نجاح الإرسال

        if (verificationResult.success) {
          // حفظ الإجراء المعلق إن وجد للتنفيذ بعد التحقق
          const pendingAction = getPendingAction();
          const returnPath = pendingAction?.returnPath || searchParams.get("return") || "/";

          // التوجيه إلى صفحة التحقق مع تمرير رقم الهاتف ومسار العودة
          const verifyUrl = `/verify?phone=${encodeURIComponent(data.phone)}${returnPath !== "/" ? `&return=${encodeURIComponent(returnPath)}` : ""}`;

          setTimeout(() => {
            router.push(verifyUrl);
          }, 500);
        } else {
          // فشل إرسال رمز التحقق - التوجيه مباشرة
          showNotification("تم إنشاء الحساب ولكن فشل إرسال رمز التحقق", "warning");

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

          const returnPath = pendingAction?.returnPath || searchParams.get("return") || "/";
          setTimeout(() => {
            router.push(returnPath);
          }, 500);
        }
      } else {
        showNotification(result.error || "فشل إنشاء الحساب", "error");
      }
    } catch {
      showNotification("حدث خطأ أثناء إنشاء الحساب", "error");
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
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm text-gray-700 mb-1" htmlFor="fullName">
              الاسم الكامل
            </label>
            <input
              id="fullName"
              {...register("fullName")}
              className="w-full h-10 rounded-md border border-gray-300 bg-white px-3 text-right focus:outline-none focus:ring-2 focus:ring-[#5A5E4D]/30"
              placeholder="اكتب اسمك"
            />
            {errors.fullName && (
              <p className="mt-1 text-xs text-red-600">{errors.fullName.message}</p>
            )}
          </div>
          <div>
            <label className="block text-sm text-gray-700 mb-1" htmlFor="phone">
              رقم الهاتف
            </label>
            <input
              id="phone"
              {...register("phone")}
              className="w-full h-10 rounded-md border border-gray-300 bg-white px-3 text-right focus:outline-none focus:ring-2 focus:ring-[#5A5E4D]/30"
              placeholder="مثال: 9665xxxxxxxx+"
            />
            {errors.phone && <p className="mt-1 text-xs text-red-600">{errors.phone.message}</p>}
          </div>
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
              placeholder="••••••••"
            />
            {errors.password && (
              <p className="mt-1 text-xs text-red-600">{errors.password.message}</p>
            )}
          </div>
          <div>
            <label className="block text-sm text-gray-700 mb-1" htmlFor="address">
              العنوان
            </label>
            <div className="relative">
              <input
                id="address"
                type="text"
                {...register("address")}
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
            {errors.address && (
              <p className="mt-1 text-xs text-red-600">{errors.address.message}</p>
            )}
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <input id="male" type="radio" value="ذكر" {...register("gender")} />
              <label htmlFor="male" className="text-sm text-gray-700">
                ذكر
              </label>
              <input
                id="female"
                type="radio"
                value="أنثى"
                className="ml-4"
                {...register("gender")}
              />
              <label htmlFor="female" className="text-sm text-gray-700">
                أنثى
              </label>
            </div>
          </div>
          {errors.gender && <p className="-mt-2 text-xs text-red-600">{errors.gender.message}</p>}

          <div className="flex items-center gap-2">
            <input id="agree" type="checkbox" {...register("agree")} />
            <label htmlFor="agree" className="text-sm text-gray-700">
              أوافق على الشروط والأحكام
            </label>
          </div>
          {errors.agree && <p className="-mt-2 text-xs text-red-600">{errors.agree.message}</p>}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full h-10 rounded-md text-white font-semibold transition-opacity cursor-pointer disabled:cursor-not-allowed"
            style={{
              backgroundColor: "#5A5E4D",
              opacity: isSubmitting ? 0.8 : 1,
              fontFamily: "var(--font-almarai)",
            }}
          >
            {isSubmitting ? "... جاري الإنشاء" : "إنشاء حساب"}
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
