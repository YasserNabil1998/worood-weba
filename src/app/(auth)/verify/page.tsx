"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function VerifyPage() {
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState<string[]>(["", "", "", ""]);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);

  useEffect(() => {
    try {
      const p = new URLSearchParams(window.location.search).get("phone") || "";
      setPhone(p);
    } catch {
      setPhone("");
    }
  }, []);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const value = code.join("");
    if (!/^\d{4}$/.test(value)) {
      setError("رمز غير صالح");
      return;
    }
    setError("");
    setSubmitting(true);
    setTimeout(() => setSubmitting(false), 600);
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
          مرحبًا بك في زهور الشمس
        </p>
      </div>
      <div className="px-6 pb-6">
        <form onSubmit={onSubmit} className="space-y-5">
          <div>
            <label className="block text-sm text-gray-700 mb-2">
              رمز الدخول
            </label>
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
                    if (v && inputsRef.current[i + 1])
                      inputsRef.current[i + 1]?.focus();
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
            <p
              className="mt-2 text-[11px] text-gray-500 text-center"
              suppressHydrationWarning
            >
              تم الإرسال إلى {phone || "+966 ••• ••• ••••"}
            </p>
            {error && (
              <p className="mt-1 text-xs text-red-600 text-center">{error}</p>
            )}
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
            {submitting ? "... تسجيل الدخول" : "تسجيل الدخول"}
          </button>
          <div className="text-center text-xs text-gray-600 space-y-2">
            <Link href="/login" className="block hover:underline">
              العودة لتغيير رقم الهاتف
            </Link>
            <button type="button" className="text-gray-700 hover:underline">
              إعادة إرسال الرمز
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
