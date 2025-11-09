"use client";

import { useState } from "react";
import isValidEmail from "@/src/validations/isValidEmail";
import Link from "next/link";
import Image from "next/image";

export default function ForgotPasswordPage() {
  const [form, setForm] = useState({ email: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

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

    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);

    // Mock API call - سيتم استبدالها بالـ API الحقيقي لاحقاً
    setTimeout(() => {
      setSubmitting(false);
      setEmailSent(true);
    }, 600);
  };

  if (emailSent) {
    return (
      <div className="mx-auto w-full max-w-md rounded-xl bg-white shadow-[0_10px_30px_rgba(0,0,0,0.08)]">
        <div className="py-6 text-center">
          <div className="flex justify-center">
            <Image src="/Logo-shams.svg" alt="شعار الموقع" width={120} height={60} priority />
          </div>
          <p className="mt-2 text-sm text-gray-600" style={{ fontFamily: "var(--font-almarai)" }}>
            تم إرسال رابط إعادة تعيين كلمة المرور
          </p>
        </div>
        <div className="px-6 pb-6">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center">
              <svg
                className="w-8 h-8 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <div>
              <h3
                className="text-lg font-semibold text-gray-800 mb-2"
                style={{ fontFamily: "var(--font-almarai)" }}
              >
                تحقق من بريدك الإلكتروني
              </h3>
              <p className="text-sm text-gray-600" style={{ fontFamily: "var(--font-almarai)" }}>
                تم إرسال رابط إعادة تعيين كلمة المرور إلى:
              </p>
              <p
                className="text-sm font-medium text-[#5A5E4D] mt-1"
                style={{ fontFamily: "var(--font-almarai)" }}
              >
                {form.email}
              </p>
            </div>
            <div className="text-xs text-gray-500">
              <p>لم تستلم الرسالة؟ تحقق من مجلد الرسائل المزعجة</p>
            </div>
            <div className="pt-4">
              <Link
                href="/login"
                className="inline-block w-full h-10 rounded-md text-white font-semibold transition-opacity text-center leading-10"
                style={{
                  backgroundColor: "#5A5E4D",
                  fontFamily: "var(--font-almarai)",
                }}
              >
                العودة لتسجيل الدخول
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-md rounded-xl bg-white shadow-[0_10px_30px_rgba(0,0,0,0.08)]">
      <div className="py-6 text-center">
        <div className="flex justify-center">
          <Image src="/Logo-shams.svg" alt="شعار الموقع" width={120} height={60} priority />
        </div>
        <p className="mt-2 text-sm text-gray-600" style={{ fontFamily: "var(--font-almarai)" }}>
          نسيت كلمة المرور؟
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

          <div className="text-xs text-gray-500 text-center">
            <p>سنرسل لك رابطاً لإعادة تعيين كلمة المرور</p>
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
            {submitting ? "... جاري الإرسال" : "إرسال الرابط"}
          </button>
          <div className="text-center text-xs text-gray-600">
            <Link href="/login" className="hover:underline">
              تذكرت كلمة المرور؟ تسجيل الدخول
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
