'use client';

import { useState } from 'react';

const NewsletterSection = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoading) return;
    setIsSuccess(false);
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
      setEmail('');
      setTimeout(() => setIsSuccess(false), 3000);
    }, 1600);
  };

  return (
    <section className="py-12 bg-[#F8EEEF]/70">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-xl  py-6 px-4 sm:px-8 text-center">
          <h2 className="text-xl md:text-2xl font-extrabold text-gray-800 mb-2" style={{fontFamily: 'var(--font-almarai)'}}>
            اشترك في نشرتنا البريدية
          </h2>
          <p className="text-sm md:text-base text-gray-600 mb-5" style={{fontFamily: 'var(--font-almarai)'}}>
            احصل على آخر العروض والتخفيضات مباشرة إلى بريدك الإلكتروني
          </p>
          <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
            <div className="flex items-center gap-3 flex-row-reverse">
              <button
                type="submit"
                aria-label="اشتراك في النشرة"
                className={`px-5 md:px-6 h-10 md:h-11 rounded-md text-white font-semibold shrink-0 transition-all ${isLoading ? 'opacity-80 cursor-not-allowed' : 'hover:opacity-95'}`}
                style={{backgroundColor:'#5A5E4D', fontFamily:'var(--font-almarai)'}}
                disabled={isLoading}
              >
                {isLoading ? '... جارٍ' : 'اشتراك'}
              </button>
              <div className="relative flex-1">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="أدخل بريدك الإلكتروني"
                  className="w-full h-10 md:h-11 pr-4 pl-11 rounded-md border border-gray-300 bg-white text-right placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#5A5E4D]/30 shadow-sm"
                  required
                />
                <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2Zm0 3.238-7.428 5.2a2 2 0 0 1-2.144 0L3 7.238V6l7.2 5.04a4 4 0 0 0 4.6 0L22 6v1.238Z"/></svg>
                </span>
              </div>
            </div>
          </form>

          {/* شريط تقدم عند الإرسال */}
          <div className="mt-4 h-1 rounded bg-white/60 overflow-hidden">
            <div
              className="h-full bg-[#5A5E4D] transition-all duration-200"
              style={{width: `${isLoading ? progress : isSuccess ? 100 : 0}%`}}
            />
          </div>

          {isSuccess && (
            <div className="mt-3 text-sm text-green-700" style={{fontFamily:'var(--font-almarai)'}}>
              تم الاشتراك بنجاح! شكرًا لانضمامك.
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;
