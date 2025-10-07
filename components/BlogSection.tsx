import Link from "next/link";
import type { BlogItem } from "../types";

type BlogSectionProps = {
    articles?: BlogItem[];
    isLoading?: boolean;
};

const defaultArticles: BlogItem[] = [
    {
        id: 1,
        title: "لغة الزهور : ماذا تعني كل وردة؟",
        description:
            "تعرف على المعاني الرمزية للورود المختلفة واختر الباقة المناسبة للتعبير عن مشاعرك.",
        image: "/images/blog/IMG-396.png",
        date: "15 يناير 2025",
    },
    {
        id: 2,
        title: "أفضل الباقات المناسبات الزفاف",
        description:
            "دليلك الشامل لاختيار باقات الزهور المثالية لحفل زفافك بما يتناسب مع ألوان وأجواء الحفل.",
        image: "/images/blog/IMG-410.png",
        date: "10 يناير 2025",
    },
    {
        id: 3,
        title: "كيفية الحفاظ على باقة الورد لفترة أطول",
        description:
            "نصائح مهمة للحفاظ على جمال ونضارة باقة الورد الخاصة بك لأطول فترة ممكنة.",
        image: "/images/blog/IMG-424.png",
        date: "5 يناير 2025",
    },
];

const BlogSection = ({
    articles = defaultArticles,
    isLoading = false,
}: BlogSectionProps) => {
    return (
        <section className="py-12 sm:py-14 md:py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 sm:mb-10 md:mb-12 gap-4">
                    <h2
                        className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800"
                        style={{ fontFamily: "var(--font-almarai)" }}
                    >
                        المدونة
                    </h2>
                    <Link
                        href="/blog"
                        className="flex items-center text-gray-600 hover:text-gray-800 font-semibold transition-colors text-sm sm:text-base"
                        style={{ fontFamily: "var(--font-almarai)" }}
                    >
                        عرض جميع المقالات
                        <svg
                            className="w-4 h-4 mr-2"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M15 19l-7-7 7-7"
                            />
                        </svg>
                    </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                    {isLoading && (
                        <div
                            className="col-span-full text-center text-gray-600"
                            style={{ fontFamily: "var(--font-almarai)" }}
                        >
                            جاري التحميل...
                        </div>
                    )}
                    {articles.map((article) => (
                        <article
                            key={article.id}
                            className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                        >
                            <div className="relative h-40 sm:h-48 overflow-hidden">
                                <img
                                    src={article.image}
                                    alt={article.title}
                                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                                />
                            </div>
                            <div className="p-4 sm:p-6">
                                <h3
                                    className="text-base sm:text-lg font-bold text-gray-800 mb-2 sm:mb-3 line-clamp-2"
                                    style={{
                                        fontFamily: "var(--font-almarai)",
                                    }}
                                >
                                    {article.title}
                                </h3>
                                <p
                                    className="text-gray-600 mb-3 sm:mb-4 line-clamp-3 text-xs sm:text-sm"
                                    style={{
                                        fontFamily: "var(--font-almarai)",
                                    }}
                                >
                                    {article.description}
                                </p>
                                <Link
                                    href={`/blog/${article.id}`}
                                    className="text-gray-600 hover:text-gray-800 font-semibold transition-colors text-xs sm:text-sm"
                                    style={{
                                        fontFamily: "var(--font-almarai)",
                                    }}
                                >
                                    اقرأ المزيد
                                    <svg
                                        className="w-3 h-3 mr-1 inline"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M15 19l-7-7 7-7"
                                        />
                                    </svg>
                                </Link>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default BlogSection;
