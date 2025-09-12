import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

// Blog data structure
interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  image: string;
  category: string;
  readTime: string;
  tags: string[];
}

// Sample blog data
const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "أفضل أنواع الورود للزفاف",
    excerpt: "اكتشف أجمل أنواع الورود التي تناسب حفلات الزفاف وتضفي لمسة رومانسية على يومك المميز",
    content: "محتوى المقال الكامل...",
    author: "فريق شمس للورود",
    date: "15 ديسمبر 2024",
    image: "https://images.unsplash.com/photo-1518895949257-7621c3c786d7?w=600&h=400&fit=crop&crop=center",
    category: "الزفاف",
    readTime: "5 دقائق",
    tags: ["ورود", "زفاف", "رومانسية"]
  },
  {
    id: 2,
    title: "كيفية العناية بالورود في المنزل",
    excerpt: "نصائح مهمة للحفاظ على جمال الورود وطول عمرها في منزلك",
    content: "محتوى المقال الكامل...",
    author: "خبير النباتات",
    date: "12 ديسمبر 2024",
    image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=600&h=400&fit=crop&crop=center",
    category: "العناية",
    readTime: "7 دقائق",
    tags: ["عناية", "نباتات", "منزل"]
  },
  {
    id: 3,
    title: "تاريخ الورود في الثقافة العربية",
    excerpt: "رحلة عبر التاريخ لاستكشاف مكانة الورود في التراث العربي",
    content: "محتوى المقال الكامل...",
    author: "د. أحمد الثقافي",
    date: "10 ديسمبر 2024",
    image: "https://images.unsplash.com/photo-1518895949257-7621c3c786d7?w=600&h=400&fit=crop&crop=center",
    category: "ثقافة",
    readTime: "8 دقائق",
    tags: ["تاريخ", "ثقافة", "تراث"]
  },
  {
    id: 4,
    title: "ألوان الورود ومعانيها",
    excerpt: "تعرف على معاني الألوان المختلفة للورود وكيفية اختيار الأنسب",
    content: "محتوى المقال الكامل...",
    author: "مستشار الورود",
    date: "8 ديسمبر 2024",
    image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=600&h=400&fit=crop&crop=center",
    category: "معاني",
    readTime: "6 دقائق",
    tags: ["ألوان", "معاني", "اختيار"]
  },
  {
    id: 5,
    title: "تصميم باقات الورود للمناسبات",
    excerpt: "أفكار إبداعية لتصميم باقات الورود المناسبة لكل مناسبة",
    content: "محتوى المقال الكامل...",
    author: "مصمم الباقات",
    date: "5 ديسمبر 2024",
    image: "https://images.unsplash.com/photo-1518895949257-7621c3c786d7?w=600&h=400&fit=crop&crop=center",
    category: "تصميم",
    readTime: "9 دقائق",
    tags: ["تصميم", "باقات", "مناسبات"]
  },
  {
    id: 6,
    title: "الورود في الطب التقليدي",
    excerpt: "استخدامات الورود في الطب التقليدي والفوائد الصحية",
    content: "محتوى المقال الكامل...",
    author: "د. فاطمة الطبية",
    date: "3 ديسمبر 2024",
    image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=600&h=400&fit=crop&crop=center",
    category: "صحة",
    readTime: "10 دقائق",
    tags: ["طب", "صحة", "تقليدي"]
  }
];

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#E3E6D8] to-[#D1D6C4]">
      <Header />
      {/* Hero Section */}
      <section className="relative h-96 bg-[#5A5E4D]">
        <div className="absolute inset-0 bg-gradient-to-r from-[#5A5E4D] to-[#7A7E6D]"></div>
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative z-10 container mx-auto px-4 h-full flex items-center">
          <div className="text-white text-right">
            <h1 className="text-4xl md:text-5xl font-bold mb-4" style={{fontFamily:'var(--font-almarai)'}}>
              مدونة شمس للورود
            </h1>
            <p className="text-xl md:text-2xl opacity-90" style={{fontFamily:'var(--font-almarai)'}}>
              اكتشف عالم الورود الجميل معنا
            </p>
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#5A5E4D] mb-4" style={{fontFamily:'var(--font-almarai)'}}>
              أحدث المقالات
            </h2>
            <p className="text-lg text-gray-600" style={{fontFamily:'var(--font-almarai)'}}>
              نصائح ومعلومات مفيدة عن عالم الورود
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <article key={post.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <div className="relative h-48">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-4 right-4">
                    <span className="bg-[#5A5E4D] text-white px-3 py-1 rounded-full text-sm" style={{fontFamily:'var(--font-almarai)'}}>
                      {post.category}
                    </span>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                    <span style={{fontFamily:'var(--font-almarai)'}}>{post.author}</span>
                    <span style={{fontFamily:'var(--font-almarai)'}}>{post.date}</span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-[#5A5E4D] mb-3 line-clamp-2" style={{fontFamily:'var(--font-almarai)'}}>
                    {post.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-4 line-clamp-3" style={{fontFamily:'var(--font-almarai)'}}>
                    {post.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex flex-wrap gap-2">
                      {post.tags.slice(0, 2).map((tag, index) => (
                        <span key={index} className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs" style={{fontFamily:'var(--font-almarai)'}}>
                          #{tag}
                        </span>
                      ))}
                    </div>
                    <span className="text-sm text-gray-500" style={{fontFamily:'var(--font-almarai)'}}>
                      {post.readTime}
                    </span>
                  </div>
                  
                  <Link 
                    href={`/blog/${post.id}`}
                    className="inline-block mt-4 bg-[#5A5E4D] text-white px-6 py-2 rounded-lg hover:bg-[#4A4E3D] transition-colors duration-300"
                    style={{fontFamily:'var(--font-almarai)'}}
                  >
                    اقرأ المزيد
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-[#5A5E4D] mb-4" style={{fontFamily:'var(--font-almarai)'}}>
              اشترك في نشرتنا الإخبارية
            </h2>
            <p className="text-lg text-gray-600 mb-8" style={{fontFamily:'var(--font-almarai)'}}>
              احصل على أحدث المقالات والنصائح حول الورود
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                placeholder="بريدك الإلكتروني"
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5A5E4D]"
                style={{fontFamily:'var(--font-almarai)'}}
              />
              <button className="bg-[#5A5E4D] text-white px-8 py-3 rounded-lg hover:bg-[#4A4E3D] transition-colors duration-300" style={{fontFamily:'var(--font-almarai)'}}>
                اشترك الآن
              </button>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
