"use client";

import { useState } from "react";
import { fontStyle } from "@/src/lib/styles";
import { TIMEOUTS, NOTIFICATION_DURATION } from "@/src/constants";

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
    }, TIMEOUTS.NEWSLETTER_PROGRESS_INTERVAL);

    setTimeout(() => {
      clearInterval(interval);
      setProgress(100);
      setIsLoading(false);
      setIsSuccess(true);
      setEmail("");
      setTimeout(() => setIsSuccess(false), TIMEOUTS.SUCCESS_MESSAGE_HIDE);
    }, TIMEOUTS.NEWSLETTER_COMPLETE);
  };

  return (
    <section className="py-12 bg-[#fbfaf2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Container - matching bouquets section width */}
        <div className="relative">
          {/* Matching image design: bg-[#B5BAAA], rounded box, centered */}
          <div className="bg-[#B5BAAA] rounded-[16px] p-8">
            <div className="text-center max-w-4xl mx-auto">
            {/* Title - centered, bold, dark gray */}
            <h2 className="text-[22px] sm:text-[24px] font-bold text-gray-800 mb-4" style={fontStyle}>
              اشترك في نشرتنا البريدية
            </h2>
            {/* Description - centered, lighter gray */}
            <p className="text-[14px] sm:text-[16px] text-gray-600 mb-6" style={fontStyle}>
              احصل على آخر العروض والتخفيضات مباشرة إلى بريدك الإلكتروني
            </p>
            {/* Form - horizontal row with input and button */}
            <form onSubmit={handleSubmit} className="flex items-center justify-center gap-2 flex-wrap">
              {/* Email Input - white background, rounded corners */}
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (error) setError("");
                }}
                placeholder="أدخل بريدك الإلكتروني"
                className={`flex-1 min-w-[200px] max-w-md h-[48px] pr-4 pl-4 rounded-[4px] border border-gray-300 bg-white text-right placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-400 text-[14px] sm:text-[16px] ${
                  error ? "border-red-300 bg-red-50/50" : ""
                }`}
                style={{
                  fontFamily: "var(--font-almarai)",
                }}
              />
              {/* Subscribe Button - darker green/gray, rounded corners */}
              <button
                type="submit"
                aria-label="اشتراك في النشرة"
                className={`bg-[#6B7565] h-[48px] px-6 rounded-[4px] text-white font-normal text-[14px] sm:text-[16px] shrink-0 transition-all hover:opacity-90 ${
                  isLoading ? "opacity-80 cursor-not-allowed" : ""
                }`}
                style={{
                  fontFamily: "var(--font-almarai)",
                }}
                disabled={isLoading}
              >
                {isLoading ? "... جارٍ" : "اشتراك"}
              </button>
            </form>

            {/* رسائل الحالة - simplified */}
            {error && (
              <div className="mt-4 text-center">
                <p
                  className="text-sm text-red-700"
                  style={{
                    fontFamily: "var(--font-almarai)",
                  }}
                >
                  {error}
                </p>
              </div>
            )}

            {isSuccess && (
              <div className="mt-4 text-center">
                <p
                  className="text-sm text-green-700"
                  style={{
                    fontFamily: "var(--font-almarai)",
                  }}
                >
                  تم الاشتراك بنجاح! شكرًا لانضمامك.
                </p>
              </div>
            )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;
