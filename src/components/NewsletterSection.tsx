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
      <div className="max-w-5xl min-w-[80vw] mx-auto px-4 sm:px-6 lg:px-8 bg-[#EEF0EA] rounded-xl">
        <div className="relative overflow-hidden rounded-xl  py-6 px-4 sm:px-8 text-center">
          <h2
            className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-800 mb-2"
            style={{ fontFamily: "var(--font-almarai)" }}
          >
            اشترك في نشرتنا البريدية
          </h2>
          <p
            className="text-base sm:text-lg md:text-xl text-gray-600 mb-5"
            style={{ fontFamily: "var(--font-almarai)" }}
          >
            احصل على آخر العروض والتخفيضات مباشرة إلى بريدك الإلكتروني
          </p>
          <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
            <div className="flex items-center gap-3 flex-row-reverse">
              <button
                type="submit"
                aria-label="اشتراك في النشرة"
                className={`px-5 md:px-6 h-10 md:h-11 rounded-md text-white font-semibold shrink-0 transition-all ${
                  isLoading ? "opacity-80 cursor-not-allowed" : "hover:opacity-95"
                }`}
                style={{
                  backgroundColor: "#5A5E4D",
                  fontFamily: "var(--font-almarai)",
                }}
                disabled={isLoading}
              >
                {isLoading ? "... جارٍ" : "اشتراك"}
              </button>
              <div className="relative flex-1">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (error) setError("");
                  }}
                  placeholder="أدخل بريدك الإلكتروني"
                  className={`w-full h-10 md:h-11 pr-4 pl-11 rounded-md border bg-white text-right placeholder-gray-400 focus:outline-none focus:ring-2 shadow-sm transition-all duration-200 ${
                    error
                      ? "border-red-300 focus:ring-red-300/30 bg-red-50/50"
                      : "border-gray-300 focus:ring-[#5A5E4D]/30"
                  }`}
                />
                <span
                  className={`pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 transition-colors duration-200 ${
                    error ? "text-red-400" : "text-gray-400"
                  }`}
                >
                  <Mail className="w-4 h-4" />
                </span>
              </div>
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
                <div className="flex-shrink-0">
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
                <div className="flex-shrink-0">
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
    </section>
  );
};

export default NewsletterSection;
