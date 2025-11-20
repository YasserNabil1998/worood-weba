"use client";

import { Mail } from "lucide-react";
import { useState } from "react";

const NewsletterSection = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoading) return;

    setError("");
    setIsSuccess(false);

    // التحقق من صحة البريد الإلكتروني
    if (!email.trim()) {
      setError("يرجى إدخال بريدك الإلكتروني");
      return;
    }

    if (!validateEmail(email)) {
      setError("يرجى إدخال بريد إلكتروني صحيح");
      return;
    }

    setIsLoading(true);
    setProgress(0);

    // محاكاة طلب اشتراك مع شريط تقدم
    const interval = setInterval(() => {
      setProgress((p) => {
        const next = Math.min(100, p + Math.random() * 20 + 10);
        return next;
      });
    }, 250);

    setTimeout(() => {
      clearInterval(interval);
      setProgress(100);
      setIsLoading(false);
      setIsSuccess(true);
      setEmail("");
      setTimeout(() => setIsSuccess(false), 3000);
    }, 1600);
  };

  return (
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Matching Figma: bg-[#dadada], rounded-[16px], padding 32px */}
        <div className="bg-[#dadada] rounded-[16px] p-8">
          <div className="max-w-[672px] mx-auto text-center">
            {/* Title - matching Figma: 24px, Almarai Bold, gray-800 */}
            <h2
              className="text-[22px] sm:text-[24px] font-bold text-gray-800 mb-4"
              style={{ fontFamily: "var(--font-almarai)" }}
            >
              اشترك في نشرتنا البريدية
            </h2>
            {/* Description - matching Figma: 16px, Almarai Regular, gray-600 */}
            <p
              className="text-[14px] sm:text-[16px] text-gray-600 mb-6"
              style={{ fontFamily: "var(--font-almarai)" }}
            >
              ادخل على آخر العروض والتحديثات مباشرة إلى بريدك الإلكتروني
            </p>
            {/* Form - matching Figma layout */}
            <form onSubmit={handleSubmit} className="flex items-center justify-end gap-0">
              {/* Button - matching Figma: #5a5e4d, 97.14px width, 48px height */}
              <button
                type="submit"
                aria-label="اشتراك في النشرة"
                className={`bg-[#5a5e4d] h-[48px] px-6 rounded-[4px] text-white font-normal text-[16px] shrink-0 transition-all ${
                  isLoading ? "opacity-80 cursor-not-allowed" : "hover:opacity-95"
                }`}
                style={{
                  fontFamily: "var(--font-almarai)",
                  width: "97.14px",
                }}
                disabled={isLoading}
              >
                {isLoading ? "... جارٍ" : "اشتراك"}
              </button>
              {/* Input - matching Figma: white bg, border gray-300, 574.86px width, 48px height */}
              <div className="relative flex-1">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (error) setError("");
                  }}
                  placeholder="أدخل بريدك الإلكتروني"
                  className={`w-full h-[48px] pr-4 pl-4 rounded-tr-[8px] rounded-br-[8px] border border-gray-300 bg-white text-right placeholder-gray-500 focus:outline-none text-[14px] ${
                    error ? "border-red-300 bg-red-50/50" : ""
                  }`}
                  style={{
                    fontFamily: "var(--font-almarai)",
                  }}
                />
              </div>
            </form>

            {/* شريط تقدم عند الإرسال */}
            <div className="mt-4 h-1 rounded bg-white/50 overflow-hidden">
              <div
                className="h-full bg-[#5A5E4D] transition-all duration-200"
                style={{
                  width: `${isLoading ? progress : isSuccess ? 100 : 0}%`,
                }}
              />
            </div>

            {/* رسائل الحالة */}
            {error && (
              <div className="mt-4 flex items-center justify-center">
                <div className="flex items-center gap-2 bg-red-50 border border-red-200 rounded-lg px-4 py-3 max-w-md">
                  <div className="shrink-0">
                    <Mail className="w-5 h-5 text-red-500" />
                  </div>
                  <p
                    className="text-sm text-red-700 text-right"
                    style={{
                      fontFamily: "var(--font-almarai)",
                    }}
                  >
                    {error}
                  </p>
                </div>
              </div>
            )}

            {isSuccess && (
              <div className="mt-4 flex items-center justify-center">
                <div className="flex items-center gap-2 bg-green-50 border border-green-200 rounded-lg px-4 py-3 max-w-md">
                  <div className="shrink-0">
                    <Mail className="w-5 h-5 text-green-500" />
                  </div>
                  <p
                    className="text-sm text-green-700 text-right"
                    style={{
                      fontFamily: "var(--font-almarai)",
                    }}
                  >
                    تم الاشتراك بنجاح! شكرًا لانضمامك.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;
