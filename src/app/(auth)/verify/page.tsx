"use client";

import { useRef, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { TIMEOUTS } from "@/constants";
import { logger } from "@/lib/logger";
import {
  verificationCodeSchema,
  phoneVerificationSchema,
} from "@/validations/schemas/verificationSchema";

export default function VerifyPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const phone = searchParams.get("phone") || "";
  const [code, setCode] = useState<string[]>(["", "", "", ""]);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const verificationCode = code.join("");

    // Zod validation للكود
    const codeValidation = verificationCodeSchema.safeParse({ code: verificationCode });
    if (!codeValidation.success) {
      setError(codeValidation.error.issues[0].message);
      return;
    }

    // Zod validation للهاتف
    const phoneValidation = phoneVerificationSchema.safeParse({ phone });
    if (!phoneValidation.success) {
      setError("رقم الهاتف غير صالح");
      return;
    }

    setError("");
    setSubmitting(true);

    try {
      // TODO: استدعاء Server Action للتحقق من الكود 

      // Mock verification - محاكاة التحقق
      logger.debug(`[Mock] التحقق من الكود ${verificationCode} للهاتف: ${phone}`);

      // محاكاة delay للشبكة
      await new Promise((resolve) => setTimeout(resolve, TIMEOUTS.VERIFICATION_CODE_MOCK_DELAY));

      // في الوقت الحالي نقبل أي كود من 4 أرقام
      logger.debug("✓ تم التحقق بنجاح (mock)");
      router.push("/");
    } catch (err) {
      setError("حدث خطأ أثناء التحقق");
    } finally {
      setSubmitting(false);
    }
  };

  const handleResendCode = async () => {
    try {
      // Zod validation للهاتف
      const phoneValidation = phoneVerificationSchema.safeParse({ phone });
      if (!phoneValidation.success) {
        setError("رقم الهاتف غير صالح");
        return;
      }

      // TODO: استدعاء Server Action لإعادة إرسال الكود (معطل حالياً)
  
      // Mock - محاكاة إعادة الإرسال
      logger.debug(`[Mock] إعادة إرسال الكود إلى: ${phone}`);
      alert("تم إعادة إرسال الرمز (محاكاة)");
    } catch (err) {
      setError("حدث خطأ أثناء إعادة إرسال الرمز");
    }
  };

  return (
    <div className="mx-auto w-full max-w-md rounded-xl bg-white shadow-[0_10px_30px_rgba(0,0,0,0.08)]">
      <div className="py-6 text-center">
        <div className="flex justify-center">
          <Image src="/Logo-shams.svg" alt="شعار الموقع" width={120} height={60} priority />
        </div>
        <p className="mt-2 text-sm text-gray-600">مرحبًا بك في زهور الشمس</p>
      </div>
      <div className="px-6 pb-6">
        <form onSubmit={onSubmit} className="space-y-5">
          <div>
            <label className="block text-sm text-gray-700 mb-2">رمز الدخول</label>
            <div className="flex justify-center gap-2">
              {[0, 1, 2, 3].map((i) => (
                <input
                  key={i}
                  ref={(el) => {
                    inputsRef.current[i] = el;
                  }}
                  inputMode="numeric"
                  maxLength={1}
                  value={code[i]}
                  onChange={(e) => {
                    const v = e.target.value.replace(/[^\d]/g, "");
                    const next = [...code];
                    next[i] = v;
                    setCode(next);
                    if (v && inputsRef.current[i + 1]) inputsRef.current[i + 1]?.focus();
                  }}
                  onKeyDown={(e) => {
                    const target = e.target as HTMLInputElement;
                    if (
                      e.key === "Backspace" &&
                      !code[target.selectionStart ?? 0] &&
                      target.dataset.index
                    ) {
                      const idx = Number(target.dataset.index);
                      if (idx > 0) inputsRef.current[idx - 1]?.focus();
                    }
                  }}
                  data-index={i}
                  className="w-12 h-12 text-center text-lg rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#5A5E4D]/30"
                />
              ))}
            </div>
            <p className="mt-2 text-[11px] text-gray-500 text-center" suppressHydrationWarning>
              تم الإرسال إلى {phone || "+966 ••• ••• ••••"}
            </p>
            {error && <p className="mt-1 text-xs text-red-600 text-center">{error}</p>}
          </div>

          <button
            type="submit"
            disabled={submitting}
            className={`w-full h-10 rounded-md text-white font-semibold transition-opacity bg-[#5A5E4D] ${submitting ? "opacity-80" : "opacity-100"}`}
          >
            {submitting ? "... تسجيل الدخول" : "تسجيل الدخول"}
          </button>
          <div className="text-center text-xs text-gray-600 space-y-2">
            <Link href="/signup" className="block hover:underline">
              العودة لتغيير رقم الهاتف
            </Link>
            <button
              type="button"
              onClick={handleResendCode}
              className="text-gray-700 hover:underline"
            >
              إعادة إرسال الرمز
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
