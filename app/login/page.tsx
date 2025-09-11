'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function LoginPage() {
  const [form, setForm] = useState({ phone: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  };

  const validate = () => {
    const err: Record<string, string> = {};
    const cleaned = form.phone.replace(/\s|-/g, '');
    const saPattern = /^(?:\+?966|00966)?5\d{8}$|^05\d{8}$/; // 05XXXXXXXX or +9665XXXXXXXX ...
    if (!saPattern.test(cleaned)) err.phone = 'الرجاء إدخال رقم سعودي صحيح (مثال: 05XXXXXXXX أو +9665XXXXXXXX)';
    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    // normalize to E.164
    const raw = form.phone.replace(/\s|-/g, '');
    let normalized = raw;
    if (/^05\d{8}$/.test(raw)) normalized = '+966' + raw.slice(1);
    else if (/^5\d{8}$/.test(raw)) normalized = '+966' + raw;
    else if (/^009665\d{8}$/.test(raw)) normalized = '+966' + raw.slice(5);
    else if (/^9665\d{8}$/.test(raw)) normalized = '+966' + raw.slice(3);
    else if (!/^\+\d{10,15}$/.test(raw)) normalized = '+' + raw;

    setTimeout(() => {
      setSubmitting(false);
      window.location.href = `/verify?phone=${encodeURIComponent(normalized)}`;
    }, 600);
  };

  return (
    <div className="min-h-screen flex flex-col" dir="rtl">
      <Header />
      <main className="flex-1 py-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto w-full max-w-md rounded-xl bg-white shadow-[0_10px_30px_rgba(0,0,0,0.08)]">
            <div className="py-6 text-center">
              <div className="text-2xl font-extrabold tracking-widest text-gray-800" style={{fontFamily:'var(--font-almarai)'}}>SHAMS</div>
              <p className="mt-2 text-sm text-gray-600" style={{fontFamily:'var(--font-almarai)'}}>مرحبًا بعودتك</p>
            </div>
            <div className="px-6 pb-6">
              <form onSubmit={onSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-700 mb-1" htmlFor="phone">رقم الهاتف</label>
                  <input id="phone" name="phone" value={form.phone} onChange={handleChange}
                         className="w-full h-10 rounded-md border border-gray-300 bg-white px-3 text-right focus:outline-none focus:ring-2 focus:ring-[#5A5E4D]/30" placeholder="مثال: 05XXXXXXXX أو +9665XXXXXXXX" />
                  {errors.phone && <p className="mt-1 text-xs text-red-600">{errors.phone}</p>}
                </div>

                <button type="submit" disabled={submitting}
                        className="w-full h-10 rounded-md text-white font-semibold transition-opacity"
                        style={{backgroundColor:'#5A5E4D', opacity: submitting?0.8:1, fontFamily:'var(--font-almarai)'}}>
                  {submitting ? '... جاري الإرسال' : 'إرسال الرمز'}
                </button>
                <div className="text-center text-xs text-gray-600"><a href="/signup" className="hover:underline">ليس لديك حساب؟ إنشاء حساب</a></div>
              </form>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}


