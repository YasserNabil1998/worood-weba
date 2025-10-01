import { notFound } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface OccasionData {
  id: number;
  title: string;
  category: string;
  description: string;
  productsCount: number;
  image: string;
  subcategories: {
    id: number;
    name: string;
    image: string;
  }[];
}

const occasionsData: Record<string, OccasionData> = {
  'love': {
    id: 4,
    title: 'أحبك',
    category: 'love',
    description: 'تعبر الهدايا عن الشعار بألوف من الكلمات، تخلق اللحظات، وتبني الذكريات، وتجسد الحب في أجمل صوره. تحتفي مجموعة هدايا أحبك بكل إحساس صادق، من باقات الورد الفاخرة إلى الشوكولاتة اللذيذة، لتكون كل هدية رسالة حب خالدة. استكشف أفكار هدايا تقول أحبك التي تترك أثراً لا يُنسى، اجعل هديتك تنبض بالمشاعر الصادقة في كل مرة تقدمها، فالمشاعر الحقيقية تستحق التعبير عنها بأناقة، فلاورد - هدايا من القلب ترجمه الحب إلى لمسة من الرقي والدفء.',
    productsCount: 222,
    image: '/images/OccasionsSlider/OccasionsSlider-4.png',
    subcategories: [
      { id: 1, name: 'أحبك', image: '❤️' },
      { id: 2, name: 'اليوم العالمي للصداقة', image: '🤝' },
      { id: 3, name: 'يوم الأجداد', image: '👴' },
      { id: 4, name: 'هدايا لأعز أخت', image: '💝' },
      { id: 5, name: 'يوم الأخوة', image: '👥' },
      { id: 6, name: 'عيد ميلاد سعيد', image: '🎂' },
      { id: 7, name: 'ألف مبروك لعمر', image: '🎈' }
    ]
  },
  'graduation': {
    id: 1,
    title: 'مبروك التخرج',
    category: 'graduation',
    description: 'احتفل بإنجازات أحبائك مع مجموعة مميزة من الهدايا المخصصة للتخرج. باقات الورود الفاخرة والهدايا الأنيقة التي تعبر عن فخرك وسعادتك بهذا الإنجاز العظيم. كل هدية مصممة لتكون ذكرى جميلة تدوم للأبد، وتحمل رسالة تقدير واعتزاز بالنجاح والتفوق.',
    productsCount: 156,
    image: '/images/OccasionsSlider/OccasionsSlider-1.png',
    subcategories: [
      { id: 1, name: 'باقات تخرج', image: '🎓' },
      { id: 2, name: 'هدايا التخرج', image: '🎁' },
      { id: 3, name: 'ورود وبالونات', image: '🎈' },
      { id: 4, name: 'تورتة وحلويات', image: '🍰' }
    ]
  },
  'get-well': {
    id: 2,
    title: 'تمنيات بالشفاء',
    category: 'get-well',
    description: 'أرسل أطيب التمنيات بالشفاء العاجل مع باقاتنا الجميلة والهدايا المريحة. مجموعة مختارة بعناية لتبعث الأمل والسعادة في قلوب المرضى، وترسم البسمة على وجوههم. كل هدية تحمل رسالة حب ودعم لتكون سبباً في تحسين معنوياتهم ورفع روحهم المعنوية.',
    productsCount: 89,
    image: '/images/OccasionsSlider/OccasionsSlider-2.png',
    subcategories: [
      { id: 1, name: 'باقات الشفاء', image: '🌸' },
      { id: 2, name: 'دباديب لطيفة', image: '🧸' },
      { id: 3, name: 'سلال الفواكه', image: '🧺' }
    ]
  },
  'congratulations': {
    id: 3,
    title: 'ألف مبروك',
    category: 'congratulations',
    description: 'احتفل بالإنجازات والمناسبات السعيدة مع مجموعتنا الرائعة من الهدايا والبالونات الاحتفالية. سواء كان ترقية في العمل، نجاح جديد، أو أي مناسبة سعيدة، لدينا الهدية المثالية التي تعبر عن فرحتك ومشاركتك في هذه اللحظات الجميلة.',
    productsCount: 198,
    image: '/images/OccasionsSlider/OccasionsSlider-3.png',
    subcategories: [
      { id: 1, name: 'بالونات الاحتفال', image: '🎈' },
      { id: 2, name: 'باقات فاخرة', image: '💐' },
      { id: 3, name: 'هدايا التهنئة', image: '🎁' }
    ]
  },
  'new-baby': {
    id: 5,
    title: 'تهنئة بالمولود',
    category: 'new-baby',
    description: 'رحب بالمولود الجديد مع مجموعة مميزة من الهدايا الرقيقة واللطيفة. باقات الورود الناعمة، الدباديب اللطيفة، والهدايا المصممة خصيصاً للاحتفال بقدوم المولود الجديد. كل هدية تحمل مشاعر الفرح والحب لتكون جزءاً من ذكريات هذه اللحظة السعيدة.',
    productsCount: 134,
    image: '/images/OccasionsSlider/OccasionsSlider-6.png',
    subcategories: [
      { id: 1, name: 'هدايا البيبي', image: '👶' },
      { id: 2, name: 'باقات الأطفال', image: '🍼' },
      { id: 3, name: 'ألعاب ناعمة', image: '🧸' }
    ]
  },
  'birthday': {
    id: 6,
    title: 'عيد ميلاد سعيد',
    category: 'birthday',
    description: 'احتفل بعيد ميلاد أحبائك مع تشكيلة رائعة من الهدايا والباقات المصممة خصيصاً لهذه المناسبة الخاصة. من الورود الجميلة إلى التورتات الشهية والبالونات المبهجة، كل هدية تحمل رسالة حب وتقدير لتجعل يوم ميلادهم لا يُنسى.',
    productsCount: 267,
    image: '/images/OccasionsSlider/OccasionsSlider-6.png',
    subcategories: [
      { id: 1, name: 'تورتات عيد الميلاد', image: '🎂' },
      { id: 2, name: 'باقات الورود', image: '🌹' },
      { id: 3, name: 'بالونات الاحتفال', image: '🎈' },
      { id: 4, name: 'هدايا مميزة', image: '🎁' }
    ]
  }
};

export default async function OccasionPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  const occasionData = occasionsData[category];

  if (!occasionData) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        {/* Breadcrumb */}
        <div className="w-full px-8 sm:px-12 lg:px-16 xl:px-24 2xl:px-32 py-6">
          <div className="flex items-center gap-2 text-sm" style={{ fontFamily: 'var(--font-almarai)' }}>
            <a href="/" className="text-gray-600 hover:text-gray-800">الرئيسية</a>
            <span className="text-gray-400">×</span>
            <span className="text-[#5A5E4D] font-medium">{occasionData.title}</span>
          </div>
        </div>

        {/* Hero Section */}
        <section className="w-full px-8 sm:px-12 lg:px-16 xl:px-24 2xl:px-32 py-8">
          <div className="flex justify-end">
            <div className="text-right mb-6 max-w-6xl">
              <h1 
                className="text-3xl md:text-4xl font-bold text-[#5A5E4D] mb-4" 
                style={{ fontFamily: 'var(--font-almarai)' }}
              >
                {occasionData.title} / {occasionData.productsCount} منتج
              </h1>
              <p 
                className="text-sm md:text-base text-gray-700 leading-relaxed"
                style={{ fontFamily: 'var(--font-almarai)' }}
              >
                {occasionData.description}
              </p>
            </div>
          </div>
        </section>

        {/* Products Grid Section with Filter */}
        <section className="w-full px-8 sm:px-12 lg:px-16 xl:px-24 2xl:px-32 py-12">
          <div className="flex gap-8">
            {/* Sidebar Filter */}
            <aside className="hidden lg:block w-64 flex-shrink-0">
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 sticky top-24">
                <h3 
                  className="text-lg font-bold text-gray-800 mb-4 text-right border-b border-gray-200 pb-3" 
                  style={{ fontFamily: 'var(--font-almarai)' }}
                >
                  الفئات
                </h3>
                <div className="space-y-2">
                  {occasionData.subcategories.map((subcat) => (
                    <Link
                      key={subcat.id}
                      href={`/occasions/${category}/${subcat.id}`}
                      className="flex items-center justify-end gap-3 p-3 rounded-xl hover:bg-[#F5F3ED] transition-colors duration-200 group"
                    >
                      <span 
                        className="text-sm text-gray-700 group-hover:text-gray-900 font-medium" 
                        style={{ fontFamily: 'var(--font-almarai)' }}
                      >
                        {subcat.name}
                      </span>
                      <div className="w-8 h-8 bg-[#F5F1E8] rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                        <span className="text-base">{subcat.image}</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </aside>

            {/* Products Grid */}
            <div className="flex-1">
              <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
                {/* Placeholder for actual products - you can fetch from API */}
                {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
                  <div key={item} className="group cursor-pointer">
                    <div className="bg-[#F5F3ED] rounded-3xl overflow-hidden transition-all duration-300 relative">
                      <div className="relative aspect-square overflow-hidden bg-gray-200">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-gray-400" style={{ fontFamily: 'var(--font-almarai)' }}>
                            صورة المنتج
                          </span>
                        </div>
                        
                        {/* Hover Overlay */}
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
                          <button 
                            className="bg-white text-[#5A5E4D] px-6 py-2.5 rounded-full text-sm font-medium transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 flex items-center gap-2"
                            style={{ fontFamily: 'var(--font-almarai)' }}
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                            أضف إلى سلة التسوق
                          </button>
                        </div>
                      </div>
                      <div className="p-4 text-right">
                        <h3 className="text-sm font-medium text-gray-700 mb-2 text-right line-clamp-2" style={{ fontFamily: 'var(--font-almarai)' }}>
                          باقة الحوري الأحمر المثالي | 25 زهرة
                        </h3>
                        <div className="flex items-center justify-end gap-1.5">
                          <span className="text-xs text-gray-600" style={{ fontFamily: 'var(--font-almarai)' }}>
                            ر.س
                          </span>
                          <span className="text-lg font-bold text-gray-800" style={{ fontFamily: 'var(--font-almarai)' }}>
                            450
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

// Generate static params for all occasions
export async function generateStaticParams() {
  return Object.keys(occasionsData).map((category) => ({
    category: category,
  }));
}

