'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';

const categories = [
  { key: 'wedding', title: 'زواج', image: '/images/bouquets/IMG-224.png' },
  { key: 'engagement', title: 'خطوبة', image: '/images/bouquets/IMG-196.png' },
  { key: 'graduation', title: 'نجاح', image: '/images/bouquets/IMG-210.png' },
  { key: 'newborn', title: 'مولود جديد', image: '/images/bouquets/DIV-237.png' },
  { key: 'anniversary', title: 'ذكرى سنوية', image: '/images/bouquets/IMG-196.png' },
  { key: 'getwell', title: 'سلامتك', image: '/images/bouquets/IMG-210.png' },
  { key: 'thanks', title: 'شكر وتقدير', image: '/images/bouquets/IMG-224.png' },
];

export default function OccasionsPage() {
  return (
    <div className="min-h-screen" dir="rtl">
      <Header />
      <main>
        {/* Hero */}
        <section className="py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative h-64 md:h-80 rounded-2xl overflow-hidden">
              <img src="/images/hero/DIV-133.png" alt="مناسبات" className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-l from-black/35 via-black/15 to-transparent"></div>
              <div className="relative z-10 h-full flex items-center">
                <div className="w-full pr-6 md:pr-10">
                  <div className="ml-auto max-w-xl text-right">
                    <h1 className="text-2xl md:text-3xl font-extrabold text-white mb-2" style={{ fontFamily: 'var(--font-almarai)' }}>المناسبات</h1>
                    <p className="text-white/85 text-sm md:text-base">تشكيلة واسعة من الباقات المصممة لجميع المناسبات الخاصة.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Categories */}
        <section className="py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-3 text-right">
              <h2 className="text-lg font-bold text-gray-800" style={{fontFamily:'var(--font-almarai)'}}>اختر حسب المناسبة</h2>
              <p className="text-xs text-gray-600">باقات مصممة خصيصًا لكل مناسبة</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
              {categories.map((c) => (
                <a key={c.key} href="#" className="group block rounded-2xl overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.08)]">
                  <div className="relative h-40 sm:h-44">
                    <img src={c.image} alt={c.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.03]" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/30 to-transparent"></div>
                    <div className="absolute inset-0 p-4 flex flex-col justify-end">
                      <div className="flex items-center gap-2 text-white justify-start text-left">
                        <span className="text-base md:text-lg font-extrabold" style={{fontFamily:'var(--font-almarai)'}}>{c.title}</span>
                        <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-white text-gray-800 text-[12px]">❤</span>
                      </div>
                      <p className="text-[12px] md:text-[13px] text-white/90 mt-1 leading-5 text-right">باقات فاخرة من الورود والزهور المميزة لمناسبات خاصة</p>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Featured section example */}
        <section className="py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative h-48 md:h-56 rounded-2xl overflow-hidden mb-4">
              <img src="/images/bouquets/IMG-196.png" alt="زواج" className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/25 to-transparent" />
              <div className="absolute inset-0 p-4 flex flex-col justify-end items-start text-left">
                <div className="flex items-center gap-2 text-white mb-1">
                  <span className="text-lg font-extrabold" style={{fontFamily:'var(--font-almarai)'}}>زواج</span>
                  <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-white text-gray-800 text-[12px]">❤</span>
                </div>
                <p className="text-[12px] text-white/90 mb-2">باقات فاخرة من الورود والزهور المميزة لحفلات الزفاف</p>
                <a href="#" className="inline-block rounded-md bg-white px-3 py-1.5 text-xs text-gray-900">عرض جميع باقات زواج</a>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold text-gray-800" style={{fontFamily:'var(--font-almarai)'}}>باقات زواج المميزة</h3>
                <a href="#" className="text-xs text-gray-700 inline-flex items-center gap-1 hover:underline">
                  <span>عرض الكل</span>
                  <span>→</span>
                </a>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[{t:'باقة الفرح الملكية',p:599,img:'/images/bouquets/IMG-224.png'},{t:'باقة الحب الأبيض',p:499,img:'/images/bouquets/IMG-210.png'},{t:'باقة الأميرة',p:650,img:'/images/bouquets/IMG-196.png'}].map((b)=> (
                <div key={b.t} className="rounded-xl border border-gray-200 overflow-hidden bg-white">
                  <img src={b.img} className="h-72 w-full object-cover" />
                  <div className="p-3">
                    <div className="text-center text-sm font-semibold mb-1" style={{fontFamily:'var(--font-almarai)'}}>{b.t}</div>
                    <div className="text-right text-xs text-gray-600 mb-2">ريال {b.p}</div>
                    <button className="w-full h-9 rounded-md text-white text-sm" style={{backgroundColor:'#5A5E4D'}}>أضف إلى السلة</button>
                  </div>
                </div>
              ))}
              </div>
            </div>
          </div>
        </section>

        {/* Occasion blocks grid (خطوبة/نجاح/مولود جديد/ذكرى سنوية) */}
        <section className="py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[{
                title:'خطوبة',
                banner:'/images/bouquets/IMG-196.png',
                thumbs:['/images/bouquets/IMG-224.png','/images/bouquets/IMG-210.png','/images/bouquets/IMG-196.png']
              },{
                title:'نجاح',
                banner:'/images/bouquets/IMG-210.png',
                thumbs:['/images/bouquets/DIV-237.png','/images/bouquets/IMG-196.png','/images/bouquets/IMG-224.png']
              },{
                title:'مولود جديد',
                banner:'/images/bouquets/DIV-237.png',
                thumbs:['/images/bouquets/IMG-196.png','/images/bouquets/IMG-210.png','/images/bouquets/IMG-224.png']
              },{
                title:'ذكرى سنوية',
                banner:'/images/bouquets/IMG-224.png',
                thumbs:['/images/bouquets/IMG-210.png','/images/bouquets/IMG-196.png','/images/bouquets/DIV-237.png']
              }].map((blk)=> (
                <div key={blk.title} className="space-y-3">
                  <div className="relative h-32 sm:h-40 rounded-2xl overflow-hidden">
                    <img src={blk.banner} className="absolute inset-0 w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/25 to-transparent" />
                    <div className="absolute inset-0 p-3 flex items-end justify-between">
                      <div className="text-white text-base font-bold" style={{fontFamily:'var(--font-almarai)'}}>{blk.title}</div>
                      <a href="#" className="inline-block rounded-md bg-white/90 px-3 py-1 text-[11px] text-gray-900">عرض الفئات</a>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    {blk.thumbs.map((img)=> (
                      <div key={img} className="rounded-xl overflow-hidden bg-white shadow-sm">
                        <img src={img} className="aspect-square h-40 md:h-60 w-full object-cover" />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative h-40 rounded-2xl overflow-hidden">
              <img src="/images/hero/DIV-133.png" className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/25"></div>
              <div className="relative z-10 h-full flex items-center">
                <div className="w-full pr-6 md:pr-10">
                  <div className="ml-auto max-w-xl text-right text-white">
                    <div className="text-lg font-bold" style={{fontFamily:'var(--font-almarai)'}}>لم تجد المناسبة المناسبة؟</div>
                    <a href="/custom" className="mt-2 inline-block rounded-md bg-white/90 px-4 py-2 text-xs text-gray-900">صمم باقتك الخاصة</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
