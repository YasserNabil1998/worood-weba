'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: 'استفسار عام', message: '' });
  const [sent, setSent] = useState(false);

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 2000);
  };

  return (
    <div className="min-h-screen" dir="rtl">
      <Header />
      <main>
        {/* Hero */}
        <section className="py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative h-64 md:h-72 rounded-2xl overflow-hidden">
              <img src="/images/hero/DIV-133.png" alt="تواصل معنا" className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-l from-black/35 via-black/15 to-transparent" />
              <div className="relative z-10 h-full flex items-center">
                <div className="w-full pr-6 md:pr-10">
                  <div className="ml-auto max-w-xl text-right">
                    <h1 className="text-2xl md:text-3xl font-extrabold text-white mb-2" style={{ fontFamily: 'var(--font-almarai)' }}>تواصل معنا</h1>
                    <p className="text-white/90 text-sm md:text-base">نحن هنا لمساعدتك في جميع استفساراتك ومساعدتك في اختيار أفضل الباقات.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Form (moved to اليسار على الشاشات الكبيرة) */}
            <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-200 shadow-sm p-5 order-1 lg:order-1">
              <h3 className="text-lg font-bold text-gray-800 mb-4" style={{fontFamily:'var(--font-almarai)'}}>أرسل لنا رسالة</h3>
              <form onSubmit={onSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-gray-700 mb-1">الاسم الكامل</label>
                  <input name="name" value={form.name} onChange={onChange} className="w-full h-10 rounded-lg border border-gray-300 px-3 text-right focus:outline-none focus:ring-2 focus:ring-[#5A5E4D]/30" />
                </div>
                <div>
                  <label className="block text-xs text-gray-700 mb-1">البريد الإلكتروني</label>
                  <input type="email" name="email" value={form.email} onChange={onChange} className="w-full h-10 rounded-lg border border-gray-300 px-3 text-right focus:outline-none focus:ring-2 focus:ring-[#5A5E4D]/30" />
                </div>
                <div>
                  <label className="block text-xs text-gray-700 mb-1">رقم الهاتف</label>
                  <input name="phone" value={form.phone} onChange={onChange} className="w-full h-10 rounded-lg border border-gray-300 px-3 text-right focus:outline-none focus:ring-2 focus:ring-[#5A5E4D]/30" />
                </div>
                <div>
                  <label className="block text-xs text-gray-700 mb-1">الموضوع</label>
                  <select name="subject" value={form.subject} onChange={onChange} className="w-full h-10 rounded-lg border border-gray-300 px-3 text-right focus:outline-none focus:ring-2 focus:ring-[#5A5E4D]/30">
                    <option>استفسار عام</option>
                    <option>طلب مخصص</option>
                    <option>مشكلة في الطلب</option>
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-xs text-gray-700 mb-1">الرسالة</label>
                  <textarea name="message" value={form.message} onChange={onChange} rows={5} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-right focus:outline-none focus:ring-2 focus:ring-[#5A5E4D]/30" placeholder="اكتب رسالتك هنا..." />
                </div>
                <div className="md:col-span-2">
                  <button type="submit" className="w-full h-10 rounded-md bg-gray-800/90 text-white font-semibold hover:bg-gray-800 transition-colors">
                    {sent ? 'تم الإرسال ✓' : 'إرسال الرسالة'}
                  </button>
                </div>
              </form>
            </div>

            {/* Info (moved to اليمين على الشاشات الكبيرة) */}
            <aside className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5 order-2 lg:order-2">
              <h3 className="text-lg font-bold text-gray-800 mb-4" style={{fontFamily:'var(--font-almarai)'}}>معلومات التواصل</h3>
              <ul className="space-y-4 text-sm">
                <li className="flex items-start gap-3">
                  <span className="mt-0.5 inline-flex h-7 w-7 items-center justify-center rounded-full bg-gray-300 text-gray-800">📍</span>
                  <div>
                    <div className="font-semibold text-gray-800 mb-0.5">العنوان</div>
                    <p className="text-gray-600 leading-5">شارع الأمير سلطان، حي الزهراء، جدة<br/>المملكة العربية السعودية</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-0.5 inline-flex h-7 w-7 items-center justify-center rounded-full bg-gray-300 text-gray-800">📞</span>
                  <div>
                    <div className="font-semibold text-gray-800 mb-0.5">رقم الهاتف</div>
                    <p className="text-gray-600 leading-5">+966 12 345 6789<br/>+966 12 345 6780</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-0.5 inline-flex h-7 w-7 items-center justify-center rounded-full bg-gray-300 text-gray-800">✉️</span>
                  <div>
                    <div className="font-semibold text-gray-800 mb-0.5">البريد الإلكتروني</div>
                    <p className="text-gray-600 leading-5">info@gulfflowers.com<br/>support@gulfflowers.com</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-0.5 inline-flex h-7 w-7 items-center justify-center rounded-full bg-gray-300 text-gray-800">⏰</span>
                  <div>
                    <div className="font-semibold text-gray-800 mb-0.5">ساعات العمل</div>
                    <p className="text-gray-600 leading-5">السبت - الخميس 9:00 صباحًا - 10:00 مساءً<br/>الجمعة 2:00 ظهرًا - 10:00 مساءً</p>
                  </div>
                </li>
              </ul>

              <div className="mt-6">
                <h4 className="text-sm font-semibold text-gray-800 mb-2">تابعنا على</h4>
                <div className="flex items-center gap-3 text-gray-700">
                  {['','','','▶'].map((ic,i)=> (
                    <a key={i} href="#" className="h-9 w-9 rounded-full bg-gray-300/70 text-gray-900 flex items-center justify-center">
                      {ic}
                    </a>
                  ))}
                </div>
              </div>
            </aside>

            {/* Follow us standalone card */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5 order-3 lg:order-3">
              <h4 className="text-sm font-semibold text-gray-800 mb-3" style={{fontFamily:'var(--font-almarai)'}}>تابعنا على</h4>
              <div className="flex items-center gap-4 text-gray-700">
                {['','','','▶'].map((ic,i)=> (
                  <a key={i} href="#" className="h-9 w-9 rounded-full bg-gray-600/30 text-white flex items-center justify-center">
                    {ic}
                  </a>
                ))}
              </div>
            </div>

            
          </div>
        </section>

        {/* FAQ */}
        <section className="py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h3 className="text-lg font-bold text-gray-800 mb-3" style={{fontFamily:'var(--font-almarai)'}}>الأسئلة الشائعة</h3>
            <div className="space-y-3">
              {[
                {q:'كيف يمكنني طلب باقة مخصصة؟',a:'يمكنك استخدام صفحة تنسيق خاص لاختيار الزهور والألوان والحجم ثم إرسال الطلب.'},
                {q:'ما هي مواعيد التوصيل؟',a:'نقوم بالتوصيل يوميًا من 9 صباحًا حتى 10 مساءً، والجمعة من 2 ظهرًا حتى 10 مساءً.'},
                {q:'هل يمكنني إضافة هدية مع الباقة؟',a:'نعم، يمكنك إضافة بطاقة تهنئة أو هدية صغيرة أثناء إتمام الطلب.'},
                {q:'ما هي سياسة الاسترجاع؟',a:'يمكنك التواصل معنا خلال 24 ساعة لحالات الاستبدال أو الاسترجاع وفق الشروط.'},
              ].map((item) => (
                <details key={item.q} className="bg-white rounded-lg border border-gray-200">
                  <summary className="cursor-pointer list-none px-4 h-12 flex items-center justify-between text-sm text-gray-800">
                    <span>{item.q}</span>
                    <span>＋</span>
                  </summary>
                  <div className="px-4 pb-4 text-sm text-gray-600">{item.a}</div>
                </details>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}


