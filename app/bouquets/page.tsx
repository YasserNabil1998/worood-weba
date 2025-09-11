import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import BouquetsListingClient from '@/components/BouquetsListingClient';

type Item = {
  id: number;
  title: string;
  image: string;
  price: number;
  badge?: string;
};

async function fetchProducts(): Promise<Item[]> {
  const res = await fetch('https://dummyjson.com/products?limit=12', { next: { revalidate: 120 } });
  const data = await res.json();
  const badges = ['الأكثر شهرة','عرض خاص','جديد'];
  const colors = ['green','red','orange','cyan','violet','amber'];
  const occs = ['wedding','anniversary','graduation','engagement','newborn','getwell','thanks'];
  // استخدم صور الورود المحلية بدل صور المكياج من الـ API
  const bouquetImages = [
    '/images/bouquets/DIV-237.png',
    '/images/bouquets/IMG-196.png',
    '/images/bouquets/IMG-210.png',
    '/images/bouquets/IMG-224.png'
  ];

  return (data.products || []).map((p: any, idx: number) => ({
    id: p.id,
    title: p.title,
    image: bouquetImages[idx % bouquetImages.length],
    price: Math.round(p.price),
    badge: badges[idx % badges.length],
    color: colors[idx % colors.length],
    occasion: occs[idx % occs.length]
  }));
}

// Card rendering moved to Client Component `components/ProductCard.tsx`

export default async function BouquetsPage() {
  const items = await fetchProducts();
  return (
    <div className="min-h-screen" dir="rtl">
      <Header />
      <main>
        {/* Hero */}
        <section className="py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative h-64 md:h-72 rounded-2xl overflow-hidden">
              <img src="/images/hero/DIV-133.png" alt="متجر زهور" className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-0" style={{ backgroundColor: '#5A5E4D', opacity: 0.08 }}></div>
              <div className="absolute inset-0 bg-gradient-to-l from-black/35 via-black/15 to-transparent"></div>
              <div className="relative z-10 h-full flex items-center">
                <div className="w-full pr-6 md:pr-10">
                  <div className="ml-auto max-w-xl text-right">
                    <h1 className="text-2xl md:text-3xl font-extrabold text-white mb-2" style={{fontFamily:'var(--font-almarai)'}}>الباقات الجاهزة</h1>
                    <p className="text-white/85 text-sm md:text-base">تشكيلة واسعة من الباقات المتنوعة لكل المناسبات.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Listing (sidebar + grid handled inside the client component) */}
            <BouquetsListingClient items={items as any} />

            {/* Pagination (static) */}
            
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}


