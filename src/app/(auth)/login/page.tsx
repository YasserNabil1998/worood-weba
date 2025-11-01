"use client";

import { useState } from "react";
import isValidEmail from "@/src/validations/isValidEmail";
import Link from "next/link";
import Image from "next/image";

export default function LoginPage() {
    const [form, setForm] = useState({ email: "", password: "" });
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [submitting, setSubmitting] = useState(false);

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

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) return;
        setSubmitting(true);

        // Mock API call - سيتم استبدالها بالـ API الحقيقي لاحقاً
        setTimeout(() => {
            setSubmitting(false);
            // Placeholder: In production, replace with actual API authentication
            // Example: const response = await fetch('/api/auth/login', { method: 'POST', body: JSON.stringify(form) });
            // if (response.ok) window.location.href = '/profile';
            
            // Temporary redirect - سيتم تحديثها لاحقاً
            alert("تم تسجيل الدخول بنجاح! (سيتم الربط بالـ API لاحقاً)");
        }, 600);
    };

    return (
        <div className="mx-auto w-full max-w-md rounded-xl bg-white shadow-[0_10px_30px_rgba(0,0,0,0.08)]">
            <div className="py-6 text-center">
                <div className="flex justify-center">
                    <Image
                        src="/Logo-shams.svg"
                        alt="شعار الموقع"
                        width={120}
                        height={60}
                        priority
                    />
                </div>
                <p
                    className="mt-2 text-sm text-gray-600"
                    style={{ fontFamily: "var(--font-almarai)" }}
                >
                    مرحبًا بعودتك
                </p>
            </div>
            <div className="px-6 pb-6">
                <form onSubmit={onSubmit} className="space-y-4">
                    <div>
                        <label
                            className="block text-sm text-gray-700 mb-1"
                            htmlFor="email"
                        >
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
                        {errors.email && (
                            <p className="mt-1 text-xs text-red-600">
                                {errors.email}
                            </p>
                        )}
                    </div>

                    <div>
                        <label
                            className="block text-sm text-gray-700 mb-1"
                            htmlFor="password"
                        >
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
                        {errors.password && (
                            <p className="mt-1 text-xs text-red-600">
                                {errors.password}
                            </p>
                        )}
                    </div>

                    <div className="text-right">
                        <Link
                            href="/forgot-password"
                            className="text-xs text-[#5A5E4D] hover:underline"
                        >
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
