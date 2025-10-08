"use client";

import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import NewsletterSection from "@/components/NewsletterSection";

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
        excerpt:
            "اكتشف أجمل أنواع الورود التي تناسب حفلات الزفاف وتضفي لمسة رومانسية على يومك المميز",
        content: "محتوى المقال الكامل...",
        author: "فريق شمس للورود",
        date: "15 ديسمبر 2024",
        image: "/images/bouquets/DIV-237.png",
        category: "الزفاف",
        readTime: "5 دقائق",
        tags: ["ورود", "زفاف", "رومانسية"],
    },
    {
        id: 2,
        title: "كيفية العناية بالورود في المنزل",
        excerpt: "نصائح مهمة للحفاظ على جمال الورود وطول عمرها في منزلك",
        content: "محتوى المقال الكامل...",
        author: "خبير النباتات",
        date: "12 ديسمبر 2024",
        image: "/images/bouquets/IMG-196.png",
        category: "العناية",
        readTime: "7 دقائق",
        tags: ["عناية", "نباتات", "منزل"],
    },
    {
        id: 3,
        title: "تاريخ الورود في الثقافة العربية",
        excerpt: "رحلة عبر التاريخ لاستكشاف مكانة الورود في التراث العربي",
        content: "محتوى المقال الكامل...",
        author: "د. أحمد الثقافي",
        date: "10 ديسمبر 2024",
        image: "/images/bouquets/IMG-210.png",
        category: "ثقافة",
        readTime: "8 دقائق",
        tags: ["تاريخ", "ثقافة", "تراث"],
    },
    {
        id: 4,
        title: "ألوان الورود ومعانيها",
        excerpt: "تعرف على معاني الألوان المختلفة للورود وكيفية اختيار الأنسب",
        content: "محتوى المقال الكامل...",
        author: "مستشار الورود",
        date: "8 ديسمبر 2024",
        image: "/images/bouquets/IMG-224.png",
        category: "معاني",
        readTime: "6 دقائق",
        tags: ["ألوان", "معاني", "اختيار"],
    },
    {
        id: 5,
        title: "تصميم باقات الورود للمناسبات",
        excerpt: "أفكار إبداعية لتصميم باقات الورود المناسبة لكل مناسبة",
        content: "محتوى المقال الكامل...",
        author: "مصمم الباقات",
        date: "5 ديسمبر 2024",
        image: "/images/bouquets/DIV-237.png",
        category: "تصميم",
        readTime: "9 دقائق",
        tags: ["تصميم", "باقات", "مناسبات"],
    },
    {
        id: 6,
        title: "الورود في الطب التقليدي",
        excerpt: "استخدامات الورود في الطب التقليدي والفوائد الصحية",
        content: "محتوى المقال الكامل...",
        author: "د. فاطمة الطبية",
        date: "3 ديسمبر 2024",
        image: "/images/bouquets/IMG-196.png",
        category: "صحة",
        readTime: "10 دقائق",
        tags: ["طب", "صحة", "تقليدي"],
    },
];

export default function BlogPage() {
    return (
        <div
            className="min-h-screen bg-gradient-to-b from-[#FDFFF7] to-[#ECF1DD]"
            dir="rtl"
        >
            <Header />
            <main>
                {/* Page Title Section */}
                <section className="pt-8 pb-4">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-right">
                        <h1 className="text-[36px] font-bold leading-[40px] text-[#2D3319] mb-2 tracking-[0px]">
                            مدونة شمس للورود
                        </h1>
                        <p className="text-[16px] font-normal leading-[24px] text-[#5A5E4D] tracking-[0px]">
                            اكتشف عالم الورود الجميل معنا
                        </p>
                    </div>
                </section>

                {/* Hero */}
                <section className="py-6">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="relative h-[400px] rounded-xl overflow-hidden">
                            <img
                                src="/images/hero/blog-hero.jpg"
                                alt="مدونة الورود"
                                className="absolute inset-0 w-full h-full object-cover"
                            />
                            {/* Blur تدريجي من اليمين */}
                            <div
                                className="absolute inset-0 backdrop-blur-sm"
                                style={{
                                    maskImage:
                                        "linear-gradient(to left, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.4) 30%, rgba(0,0,0,0) 60%)",
                                    WebkitMaskImage:
                                        "linear-gradient(to left, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.4) 30%, rgba(0,0,0,0) 60%)",
                                }}
                            ></div>
                            <div
                                className="absolute inset-0"
                                style={{
                                    backgroundColor: "#5A5E4D",
                                    opacity: 0.08,
                                }}
                            ></div>
                            <div className="absolute inset-0 bg-gradient-to-l from-black/35 via-black/15 to-transparent"></div>
                            <div className="relative z-10 h-full flex items-center">
                                <div className="w-full px-6 md:px-10 text-right">
                                    <div className="max-w-2xl ml-auto">
                                        <h2 className="text-[36px] font-bold leading-[40px] text-white mb-3 tracking-[0px]">
                                            أحدث المقالات والنصائح
                                        </h2>
                                        <p className="text-[18px] font-normal leading-[28px] text-white/90 mb-6 tracking-[0px]">
                                            اكتشف أسرار العناية بالورود ونصائح
                                            الخبراء لجعل باقاتك أكثر جمالاً
                                        </p>
                                        <a
                                            href="#blog-section"
                                            className="inline-block bg-white hover:bg-[#5A5E4D] text-[#5A5E4D] hover:text-white font-semibold px-8 py-3 rounded-lg shadow-lg transition-all duration-300"
                                        >
                                            تصفح المقالات
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Blog Posts Grid */}
                <section id="blog-section" className="py-8">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-12">
                            <h2
                                className="text-3xl md:text-4xl font-bold text-[#5A5E4D] mb-3"
                                style={{ fontFamily: "var(--font-almarai)" }}
                            >
                                أحدث المقالات
                            </h2>
                            <p
                                className="text-lg text-gray-600"
                                style={{ fontFamily: "var(--font-almarai)" }}
                            >
                                نصائح ومعلومات مفيدة عن عالم الورود
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {blogPosts.map((post) => (
                                <article
                                    key={post.id}
                                    className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow flex flex-col"
                                >
                                    <div className="relative h-52">
                                        <Image
                                            src={post.image}
                                            alt={post.title}
                                            fill
                                            className="object-cover"
                                            quality={95}
                                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
                                        />
                                        <div className="absolute top-3 right-3">
                                            <span
                                                className="bg-[#5A5E4D] text-white px-3 py-1 rounded-full text-sm"
                                                style={{
                                                    fontFamily:
                                                        "var(--font-almarai)",
                                                }}
                                            >
                                                {post.category}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="p-6 flex flex-col flex-grow">
                                        <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                                            <span
                                                style={{
                                                    fontFamily:
                                                        "var(--font-almarai)",
                                                }}
                                            >
                                                {post.author}
                                            </span>
                                            <span
                                                style={{
                                                    fontFamily:
                                                        "var(--font-almarai)",
                                                }}
                                            >
                                                {post.readTime}
                                            </span>
                                        </div>

                                        <h3
                                            className="text-xl font-bold text-[#5A5E4D] mb-2 line-clamp-2"
                                            style={{
                                                fontFamily:
                                                    "var(--font-almarai)",
                                            }}
                                        >
                                            {post.title}
                                        </h3>

                                        <p
                                            className="text-gray-600 mb-4 line-clamp-3 flex-grow"
                                            style={{
                                                fontFamily:
                                                    "var(--font-almarai)",
                                            }}
                                        >
                                            {post.excerpt}
                                        </p>

                                        <div className="flex flex-wrap gap-2 mb-4">
                                            {post.tags
                                                .slice(0, 2)
                                                .map((tag, index) => (
                                                    <span
                                                        key={index}
                                                        className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs"
                                                        style={{
                                                            fontFamily:
                                                                "var(--font-almarai)",
                                                        }}
                                                    >
                                                        #{tag}
                                                    </span>
                                                ))}
                                        </div>

                                        <Link
                                            href={`/blog/${post.id}`}
                                            className="inline-block bg-[#5A5E4D] text-white px-6 py-2 rounded-lg hover:bg-[#4A4E3D] transition-colors w-full text-center mt-auto"
                                            style={{
                                                fontFamily:
                                                    "var(--font-almarai)",
                                            }}
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
                <NewsletterSection />
            </main>
            <Footer />
        </div>
    );
}
