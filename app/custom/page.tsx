'use client';

import { useMemo, useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

type Flower = { id: number; name: string; price: number; image: string };

const FLOWERS: Flower[] = [
  { id: 1, name: 'ورد جوري', price: 25, image: '/images/bouquets/IMG-196.png' },
  { id: 2, name: 'توليب', price: 30, image: '/images/bouquets/DIV-237.png' },
  { id: 3, name: 'زنبق', price: 35, image: '/images/bouquets/IMG-210.png' },
  { id: 4, name: 'أوركيد', price: 45, image: '/images/bouquets/IMG-224.png' },
  { id: 5, name: 'جربيرا', price: 20, image: '/images/bouquets/IMG-210.png' },
  { id: 6, name: 'فرازيا', price: 25, image: '/images/bouquets/IMG-224.png' },
  { id: 7, name: 'إسبيريشن', price: 30, image: '/images/bouquets/IMG-196.png' },
  { id: 8, name: 'الهيدرانجيا', price: 40, image: '/images/bouquets/DIV-237.png' },
];

export default function CustomBuilderPage() {
  const [selected, setSelected] = useState<Record<number, number>>({});
  const [size, setSize] = useState<'small' | 'medium' | 'large'>('medium');
  const [style, setStyle] = useState<'classic' | 'premium' | 'gift' | 'eco'>('classic');
  const [color, setColor] = useState<string>('pink');
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [occasion, setOccasion] = useState<string>('عيد ميلاد');
  const [cardMessage, setCardMessage] = useState<string>('');
  const [includeCard, setIncludeCard] = useState<boolean>(false);
  const [notes, setNotes] = useState<string>('');
  const [payMethod, setPayMethod] = useState<'mada'|'apple'|'stc'|'cod'>('mada');

  const getStyleLabel = (s: 'classic'|'premium'|'gift'|'eco') => (
    s==='classic' ? 'كلاسيك' : s==='premium' ? 'فاخر' : s==='gift' ? 'هدية' : 'صديق للبيئة'
  );

  const total = useMemo(() => {
    const base = size === 'small' ? 150 : size === 'medium' ? 250 : 370;
    const flowers = Object.entries(selected).reduce((sum, [id, qty]) => {
      const f = FLOWERS.find((x) => x.id === Number(id));
      return sum + (f ? f.price * qty : 0);
    }, 0);
    return base + flowers;
  }, [selected, size]);

  const qty = (id: number) => selected[id] ?? 0;
  const inc = (id: number) => setSelected((s) => ({ ...s, [id]: (s[id] ?? 0) + 1 }));
  const dec = (id: number) => setSelected((s) => ({ ...s, [id]: Math.max(0, (s[id] ?? 0) - 1) }));

  return (
    <div className="min-h-screen" dir="rtl">
      <Header />
      <main className="py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* عنوان الصفحة */}
          <div className="text-right mb-4">
            <h1 className="text-2xl md:text-3xl font-extrabold text-gray-800" style={{fontFamily:'var(--font-almarai)'}}>تنسيق باقة خاص</h1>
            <p className="text-gray-600 text-xs md:text-sm">صمّم باقتك الخاصة بالألوان والزهور التي تفضّلها</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left - selector (ستظهر يمينًا بعد قلب الترتيب) */}
          <div className="order-2 lg:order-2 lg:col-span-2">
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5 mb-4">
              {/* شريط الخطوات */}
              <div className="flex items-center justify-between text-[12px] text-gray-600 mb-3">
                {[{n:1,t:'اختيار الزهور'},{n:2,t:'الحجم واللون'},{n:3,t:'التخصيص'},{n:4,t:'التوصيل'}].map(s=> (
                  <button
                    key={s.n}
                    onClick={()=> setStep(s.n as 1|2|3|4)}
                    className={`flex items-center gap-2 px-2 py-1 rounded-md transition-colors ${step===s.n ? 'bg-gray-100 text-gray-900' : 'hover:bg-gray-50'}`}
                    aria-pressed={step===s.n}
                  >
                    <span className={`h-6 w-6 rounded-full flex items-center justify-center ${step===s.n ? 'bg-[#5A5E4D] text-white' : 'bg-gray-100 text-gray-700'}`}>{s.n}</span>
                    <span>{s.t}</span>
                  </button>
                ))}
              </div>
              {/* عنوان القسم */}
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-semibold text-gray-800" style={{fontFamily:'var(--font-almarai)'}}>
                  {step===1 && 'اختر الزهور'}
                  {step===2 && 'اختيار الحجم والتغليف'}
                  {step===3 && 'التخصيص'}
                  {step===4 && 'معلومات التوصيل'}
                </h3>
              </div>
              {/* محتوى الخطوات */}
              {step===1 && (
                <>
                  {/* حقل البحث */}
                  <div className="relative mb-4">
                    <input placeholder="ابحث عن الزهور" className="w-full rounded-lg border border-gray-200 bg-white shadow-sm pl-10 pr-3 py-2 text-right focus:outline-none focus:ring-2 focus:ring-[#5A5E4D]/30" />
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
                  </div>

                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                    {FLOWERS.map((f) => (
                      <div key={f.id} className="rounded-xl border border-gray-200 p-3 text-center hover:shadow-sm transition-shadow">
                        <div className="mx-auto h-20 w-20 rounded-full overflow-hidden mb-2 border border-gray-200 bg-gray-50 p-1">
                          <img src={f.image} alt={f.name} className="h-full w-full object-cover rounded-full" />
                        </div>
                        <div className="text-[12px] font-semibold">{f.name}</div>
                        <div className="text-[11px] text-gray-500 mb-2">ريال {f.price}</div>
                        <button onClick={() => inc(f.id)} className="mx-auto inline-block text-[12px] px-3 py-1 rounded bg-[#5A5E4D] text-white">إضافة</button>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 text-right">
                    <div className="mb-1 text-sm font-semibold text-gray-800" style={{fontFamily:'var(--font-almarai)'}}>الزهور المختارة</div>
                    <p className="text-[12px] text-gray-500 mb-3">لم يتم اختيار أي زهور بعد</p>
                    <div className="mb-2 text-sm font-semibold text-gray-800" style={{fontFamily:'var(--font-almarai)'}}>اختر الألوان المفضلة</div>
                    <div className="flex items-center gap-3">
                      {['#EF4444','#F97316','#F59E0B','#22C55E','#3B82F6','#8B5CF6','#EC4899'].map((c)=> (
                        <button
                          key={c}
                          onClick={()=> setColor(c)}
                          className={`relative h-8 w-8 rounded-full border border-gray-300 transition-shadow ${color===c ? 'ring-2 ring-offset-2 ring-[#5A5E4D]' : ''}`}
                          style={{backgroundColor: c}}
                          aria-label={`color-${c}`}
                        >
                          {color===c && (
                            <span className="absolute inset-0 flex items-center justify-center text-white text-xs">✓</span>
                          )}
                        </button>
                      ))}
                    </div>
                    <p className="mt-2 text-[11px] text-gray-500">سيتم اختيار الزهور بالألوان المحددة قدر الإمكان</p>
                  </div>
                </>
              )}

              {step===2 && (
                <div className="space-y-6">
                  {/* حجم الباقة */}
                  <div>
                    <div className="mb-3 text-sm font-semibold text-gray-800" style={{fontFamily:'var(--font-almarai)'}}>حجم الباقة</div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      {[
                        {key:'large', label:'كبير', price:450, stems:'18-25 زهرة'},
                        {key:'medium', label:'متوسط', price:350, stems:'12-15 زهرة'},
                        {key:'small', label:'صغير', price:250, stems:'7-10 زهرة'},
                      ].map((opt:any)=> (
                        <button
                          key={opt.key}
                          onClick={()=> setSize(opt.key as any)}
                          className={`text-center rounded-xl border px-4 py-4 transition-all ${size===opt.key ? 'border-[#5A5E4D] ring-2 ring-[#5A5E4D]/20 bg-[#5A5E4D]/5' : 'border-gray-200 bg-white hover:bg-gray-50'}`}
                        >
                          <div className="mx-auto mb-3 h-14 w-14 rounded-full bg-gray-200" />
                          <div className="font-semibold text-gray-800 text-sm">{opt.label}</div>
                          <div className="text-gray-700 text-sm">ريال {opt.price}</div>
                          <div className="text-[11px] text-gray-500 mt-1">{opt.stems}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* نوع التغليف */}
                  <div>
                    <div className="mb-3 text-sm font-semibold text-gray-800" style={{fontFamily:'var(--font-almarai)'}}>نوع التغليف</div>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                      {[
                        {key:'classic', label:'كلاسيك', price:20, image:'/images/bouquets/IMG-196.png'},
                        {key:'premium', label:'فاخر', price:50, image:'/images/bouquets/IMG-210.png'},
                        {key:'gift', label:'هدية', price:35, image:'/images/bouquets/DIV-237.png'},
                        {key:'eco', label:'صديق للبيئة', price:25, image:'/images/bouquets/IMG-224.png'},
                      ].map((opt:any)=> (
                        <button
                          key={opt.key}
                          onClick={()=> setStyle(opt.key as any)}
                          className={`rounded-xl border text-right p-3 transition-all ${style===opt.key ? 'border-[#5A5E4D] ring-2 ring-[#5A5E4D]/20 bg-[#5A5E4D]/5' : 'border-gray-200 bg-white hover:bg-gray-50'}`}
                        >
                          <div className="flex items-center gap-3">
                            <img src={opt.image} alt={opt.label} className="h-12 w-12 rounded-md object-cover" />
                            <div>
                              <div className="text-sm font-semibold text-gray-800">{opt.label}</div>
                              <div className="text-[12px] text-gray-500">ريال {opt.price}</div>
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>

                    <div className="mt-6 flex items-center justify-between">
                      <button onClick={()=> setStep(1)} className="px-4 py-2 rounded-md text-sm bg-white border border-gray-300 text-gray-800 hover:bg-gray-50 transition-colors flex items-center gap-2">
                        <span>السابق</span>
                        <span>▶</span>
                      </button>
                      <button onClick={()=> setStep(3)} className="px-4 py-2 rounded-md text-sm bg-gray-800 text-white hover:bg-gray-700 transition-colors flex items-center gap-2">
                        <span>التالي</span>
                        <span>◀</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {step===3 && (
                <div className="space-y-5">
                  <div>
                    <div className="mb-2 text-sm font-semibold text-gray-800" style={{fontFamily:'var(--font-almarai)'}}>المناسبة</div>
                    <div className="relative">
                      <select value={occasion} onChange={(e)=> setOccasion(e.target.value)} className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 pr-8 text-right">
                        {['عيد ميلاد','تخرج','خطوبة','تهنئة','شكر'].map(o=> <option key={o} value={o}>{o}</option>)}
                      </select>
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">▾</span>
                    </div>
                  </div>

                  <div>
                    <div className="mb-2 text-sm font-semibold text-gray-800" style={{fontFamily:'var(--font-almarai)'}}>بطاقة التهنئة</div>
                    <div className="rounded-xl border border-gray-200 bg-white p-3">
                      <textarea value={cardMessage} onChange={(e)=> setCardMessage(e.target.value.slice(0,150))} placeholder="اكتب رسالتك هنا..." className="w-full h-28 resize-none rounded-md border border-gray-200 p-2 text-right focus:outline-none" />
                      <div className="mt-2 flex items-center justify-between text-[11px] text-gray-500">
                        <div className="flex items-center gap-3">
                          <span>س / ع / ب</span>
                        </div>
                        <span>{cardMessage.length}/150 حرف</span>
                      </div>
                    </div>
                    <label className="mt-2 flex items-center gap-2 text-sm text-gray-800">
                      <input type="checkbox" checked={includeCard} onChange={(e)=> setIncludeCard(e.target.checked)} className="h-4 w-4" />
                      <span>إضافة بطاقة تهنئة (+15 ريال)</span>
                    </label>
                  </div>

                  <div>
                    <div className="mb-2 text-sm font-semibold text-gray-800" style={{fontFamily:'var(--font-almarai)'}}>تعليقات خاصة</div>
                    <textarea value={notes} onChange={(e)=> setNotes(e.target.value)} placeholder="أي متطلبات أو تفاصيل خاصة ترغب بإضافتها..." className="w-full h-20 resize-none rounded-lg border border-gray-200 p-2 text-right" />
                  </div>

                  <div className="flex items-center justify-between">
                    <button onClick={()=> setStep(2)} className="px-4 py-2 rounded-md text-sm bg-white border border-gray-300 text-gray-800 hover:bg-gray-50 transition-colors flex items-center gap-2">
                      <span>السابق</span>
                      <span>▶</span>
                    </button>
                    <button onClick={()=> setStep(4)} className="px-4 py-2 rounded-md text-sm bg-gray-800 text-white hover:bg-gray-700 transition-colors flex items-center gap-2">
                      <span>التالي</span>
                      <span>◀</span>
                    </button>
                  </div>
                </div>
              )}

              {step===4 && (
                <div className="space-y-5">
                  <div className="text-sm font-semibold text-gray-800" style={{fontFamily:'var(--font-almarai)'}}>التوصيل والدفع</div>

                  {/* تاريخ التوصيل */}
                  <div>
                    <div className="mb-1 text-sm text-gray-700">تاريخ التوصيل</div>
                    <div className="relative">
                      <input type="date" className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-right" />
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">📅</span>
                    </div>
                  </div>

                  {/* وقت التوصيل */}
                  <div>
                    <div className="mb-1 text-sm text-gray-700">وقت التوصيل</div>
                    <div className="grid grid-cols-3 gap-3 text-sm">
                      <button className="rounded-md border border-gray-200 px-3 py-2 bg-white hover:bg-gray-50">صباحًا (9-12)</button>
                      <button className="rounded-md border border-gray-200 px-3 py-2 bg-white hover:bg-gray-50">ظهرًا (12-15)</button>
                      <button className="rounded-md border border-gray-200 px-3 py-2 bg-white hover:bg-gray-50">مساءً (15-21)</button>
                    </div>
                  </div>

                  {/* عنوان التوصيل */}
                  <div>
                    <div className="mb-1 text-sm text-gray-700">عنوان التوصيل</div>
                    <input placeholder="المدينة" className="w-full mb-2 rounded-lg border border-gray-200 px-3 py-2 text-right" />
                    <input placeholder="الحي" className="w-full mb-2 rounded-lg border border-gray-200 px-3 py-2 text-right" />
                    <input placeholder="أدخل اسم الشارع" className="w-full mb-2 rounded-lg border border-gray-200 px-3 py-2 text-right" />
                    <input placeholder="أدخل أقرب معلم" className="w-full rounded-lg border border-gray-200 px-3 py-2 text-right" />
                  </div>

                  {/* رقم الجوال */}
                  <div>
                    <div className="mb-1 text-sm text-gray-700">رقم الجوال</div>
                    <input placeholder="05xxxxxxxx" className="w-full rounded-lg border border-gray-200 px-3 py-2 text-right" />
                  </div>

                  {/* وسيلة الدفع */}
                  <div>
                    <div className="mb-1 text-sm text-gray-700">طريقة الدفع</div>
                    <div className="space-y-3">
                      {[
                        {key:'mada', label:'بطاقة مدى', icon:'💳'},
                        {key:'apple', label:'Apple Pay', icon:''},
                        {key:'stc', label:'STC Pay', icon:'💠'},
                        {key:'cod', label:'الدفع عند الاستلام', icon:'💵'},
                      ].map((g:any)=> (
                        <button
                          key={g.key}
                          type="button"
                          onClick={()=> setPayMethod(g.key)}
                          className={`w-full flex items-center justify-between rounded-md border px-3 py-2 text-right ${payMethod===g.key ? 'border-[#5A5E4D] bg-[#5A5E4D]/5' : 'border-gray-200 bg-white hover:bg-gray-50'}`}
                        >
                          <span className="flex items-center gap-3">
                            <span className="inline-flex h-5 w-5 items-center justify-center text-gray-700">{g.icon}</span>
                            <span className="text-sm text-gray-800">{g.label}</span>
                          </span>
                          <span className={`h-4 w-4 rounded-full border ${payMethod===g.key ? 'border-[#5A5E4D] ring-2 ring-[#5A5E4D]/30 bg-[#5A5E4D]' : 'border-gray-300'}`}></span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <button onClick={()=> setStep(3)} className="px-4 py-2 rounded-md text-sm bg-white border border-gray-300 text-gray-800 hover:bg-gray-50 transition-colors flex items-center gap-2">
                      <span>السابق</span>
                      <span>▶</span>
                    </button>
                    <button onClick={()=>{
                      if (typeof window!== 'undefined'){
                        const cart = JSON.parse(localStorage.getItem('cart')||'[]');
                        const item = { id: Date.now(), title: 'تصميم مخصص', size, style, color, total };
                        cart.push(item);
                        localStorage.setItem('cart', JSON.stringify(cart));
                        window.location.href = '/cart';
                      }
                    }} className="px-4 py-2 rounded-md text-sm bg-[#5A5E4D] text-white hover:bg-[#4b5244] transition-colors">إضافة إلى السلة</button>
                  </div>
                </div>
              )}
            
              
              {step===1 && (
                <div className="mt-6 flex">
                  <button onClick={()=> setStep(2)} className="ml-auto px-4 py-2 rounded-md text-sm bg-gray-200 border border-gray-300 text-gray-800 hover:bg-gray-300 transition-colors flex items-center gap-2">
                    <span>التالي</span>
                    <span>◀</span>
                  </button>
                </div>
              )}
            </div>  
           
          </div>
          {/* Right - preview (ستظهر يسارًا بعد قلب الترتيب) */}
          <div className="order-1 lg:order-1 w-full lg:max-w-sm lg:justify-self-start">
            <div className="bg-white rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.08)] overflow-hidden">
              <div className="px-4 pt-4">
                <div className="text-sm font-semibold text-gray-800 mb-2" style={{fontFamily:'var(--font-almarai)'}}>معاينة الباقة</div>
              </div>
              <div className="px-4">
                <div className="rounded-xl overflow-hidden bg-gray-50 border border-gray-100">
                  <div className="h-64 p-3 flex items-center justify-center">
                    <img src="/images/bouquets/IMG-224.png" alt="preview" className="h-56 object-contain" />
                  </div>
                </div>
              </div>
              <div className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="text-[13px] text-gray-800 font-semibold">الإجمالي</div>
                  <div className="text-sm font-bold">ريال {total}</div>
                </div>
                <div className="text-[11px] text-gray-500 text-center mb-3">السعر يشمل ضريبة القيمة المضافة</div>

                <div className="text-[13px] font-semibold text-gray-800 mb-2">تفاصيل الباقة</div>
                <div className="text-sm rounded-lg overflow-hidden">
                  <div className="flex items-center justify-between bg-gray-100 px-3 py-2">
                    <span className="text-gray-600">الحجم</span>
                    <span>{size==='small'?'صغير':size==='medium'?'متوسط':'كبير'}</span>
                  </div>
                  <div className="flex items-center justify-between bg-gray-100/70 px-3 py-2">
                    <span className="text-gray-600">الألوان</span>
                    <span className="flex items-center gap-2"><span className="inline-block h-3 w-3 rounded-full border" style={{backgroundColor: color}}></span></span>
                  </div>
                  <div className="flex items-center justify-between bg-gray-100 px-3 py-2">
                    <span className="text-gray-600">التغليف</span>
                    <span>{getStyleLabel(style)}</span>
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-1 gap-3">
                  <button className="w-full rounded-md bg-white border px-3 py-2 text-sm flex items-center justify-center gap-2 hover:bg-gray-50">
                    <span>حفظ التصميم</span>
                    <span>♡</span>
                  </button>
                  <button className="w-full rounded-md bg-white border px-3 py-2 text-sm flex items-center justify-center gap-2 hover:bg-gray-50">
                    <span>مشاركة التصميم</span>
                    <span>↗️</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>

        {/* recommended */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
          <h2 className="text-xl font-bold mb-4" style={{fontFamily:'var(--font-almarai)'}}>باقات مقترحة</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[{title:'باقة الفرح الوردية', price:320, image:'/images/bouquets/IMG-196.png'},{title:'باقة الندى البيضاء', price:380, image:'/images/bouquets/IMG-210.png'},{title:'باقة الحب الأحمر', price:420, image:'/images/bouquets/IMG-224.png'}].map((b)=> (
              <div key={b.title} className="bg-white rounded-xl shadow overflow-hidden">
                <img src={b.image} alt={b.title} className="h-56 w-full object-cover" />
                <div className="p-4">
                  <div className="font-bold mb-2">{b.title}</div>
                  <div className="flex items-center justify-between">
                    <div className="font-bold">ريال {b.price}</div>
                    <button className="px-3 py-2 rounded-md text-white" style={{backgroundColor:'#5A5E4D'}}>أضف إلى السلة</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

