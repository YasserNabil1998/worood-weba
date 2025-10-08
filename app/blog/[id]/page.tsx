"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

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

// Sample blog data (same as in main blog page)
const blogPosts: BlogPost[] = [
    {
        id: 1,
        title: "أفضل أنواع الورود للزفاف",
        excerpt:
            "اكتشف أجمل أنواع الورود التي تناسب حفلات الزفاف وتضفي لمسة رومانسية على يومك المميز",
        content: `
      <p>الورود هي رمز الحب والرومانسية، ولا يوجد مكان أفضل لتظهر جمالها من حفلات الزفاف. في هذا المقال، سنستكشف أفضل أنواع الورود التي تناسب مناسبات الزفاف.</p>
      
      <h3>الورود الحمراء الكلاسيكية</h3>
      <p>الورود الحمراء هي الخيار الأكثر شعبية لحفلات الزفاف. تمثل الحب والعاطفة العميقة، وتضفي لمسة رومانسية لا تُنسى على اليوم المميز.</p>
      
      <h3>الورود البيضاء النقية</h3>
      <p>تمثل الورود البيضاء النقاء والبراءة، وهي مثالية للعروس. يمكن استخدامها وحدها أو مع ألوان أخرى لإنشاء تركيبات جميلة.</p>
      
      <h3>الورود الوردية الرقيقة</h3>
      <p>تضفي الورود الوردية لمسة من الأنوثة والرقة على باقة العروس. تأتي بدرجات مختلفة من الوردي، مما يسمح بإنشاء تركيبات متناسقة.</p>
      
      <h3>نصائح لاختيار الورود المناسبة</h3>
      <ul>
        <li>اختر الورود الطازجة والكثيفة</li>
        <li>تأكد من تناسق الألوان مع ديكور الحفل</li>
        <li>فكر في الموسم والطقس</li>
        <li>استشر خبير الورود للحصول على أفضل النتائج</li>
      </ul>
    `,
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
        content: `
      <p>العناية بالورود في المنزل تتطلب معرفة بعض الأساسيات المهمة. في هذا المقال، سنشارك معك أفضل النصائح للحفاظ على جمال ورودك.</p>
      
      <h3>الري الصحيح</h3>
      <p>الورود تحتاج إلى ري منتظم ولكن ليس مفرط. تأكد من أن التربة رطبة وليس مبللة، وازرع الورود في تربة جيدة التصريف.</p>
      
      <h3>التعرض للشمس</h3>
      <p>معظم أنواع الورود تحتاج إلى 6-8 ساعات من أشعة الشمس المباشرة يومياً. اختر مكاناً مشمساً في حديقتك أو شرفتك.</p>
      
      <h3>التسميد</h3>
      <p>استخدم سماداً متوازناً يحتوي على النيتروجين والفوسفور والبوتاسيوم. قم بالتسميد في الربيع والصيف.</p>
    `,
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
        content: `
      <p>للورود مكانة خاصة في الثقافة العربية منذ القدم. في هذا المقال، سنستكشف تاريخ الورود في التراث العربي.</p>
      
      <h3>الورود في الشعر العربي</h3>
      <p>استخدم الشعراء العرب الورود كرمز للحب والجمال في قصائدهم. من المتنبي إلى نزار قباني، كانت الورود مصدر إلهام لا ينضب.</p>
      
      <h3>الورود في الطب التقليدي</h3>
      <p>استخدم العرب القدماء الورود في الطب التقليدي، حيث استخرجوا منها الزيوت والمراهم لعلاج العديد من الأمراض.</p>
    `,
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
        content: `
      <p>كل لون من ألوان الورود يحمل معنى خاصاً. في هذا المقال، سنستكشف معاني الألوان المختلفة.</p>
      
      <h3>الورود الحمراء</h3>
      <p>تمثل الحب والعاطفة العميقة. مثالية للتعبير عن المشاعر الرومانسية.</p>
      
      <h3>الورود البيضاء</h3>
      <p>ترمز إلى النقاء والبراءة والسلام. مناسبة للمناسبات الرسمية.</p>
      
      <h3>الورود الوردية</h3>
      <p>تعبير عن الامتنان والأنوثة والرقة. مناسبة للأصدقاء والعائلة.</p>
    `,
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
        content: `
      <p>تصميم باقات الورود فن يحتاج إلى ذوق وإبداع. في هذا المقال، سنشارك معك أفضل الأفكار لتصميم باقات مميزة.</p>
      
      <h3>باقات الزفاف</h3>
      <p>تتميز باقات الزفاف بالأناقة والبساطة. اختر الورود التي تتناسب مع فستان العروس.</p>
      
      <h3>باقات التخرج</h3>
      <p>استخدم ألواناً زاهية ومبهجة للاحتفال بهذا الإنجاز المهم.</p>
    `,
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
        content: `
      <p>للورود فوائد صحية عديدة تم اكتشافها منذ القدم. في هذا المقال، سنستكشف الاستخدامات الطبية للورود.</p>
      
      <h3>زيت الورد</h3>
      <p>يستخدم زيت الورد في علاج العديد من المشاكل الجلدية وله خصائص مهدئة.</p>
      
      <h3>شاي الورد</h3>
      <p>شاي الورد غني بالفيتامينات ومضادات الأكسدة، وله فوائد صحية عديدة.</p>
    `,
        author: "د. فاطمة الطبية",
        date: "3 ديسمبر 2024",
        image: "/images/bouquets/IMG-196.png",
        category: "صحة",
        readTime: "10 دقائق",
        tags: ["طب", "صحة", "تقليدي"],
    },
];

export default function BlogDetailPage() {
    const params = useParams();
    const id = params.id as string;
    const postId = parseInt(id);
    const post = blogPosts.find((p) => p.id === postId);

    if (!post) {
        return (
            <div className="min-h-screen bg-gradient-to-b from-[#FDFFF7] to-[#ECF1DD] flex items-center justify-center">
                <Header />
                <div
                    className="text-center"
                    style={{ fontFamily: "var(--font-almarai)" }}
                >
                    <h1 className="text-4xl font-bold text-[#5A5E4D] mb-4">
                        المقال غير موجود
                    </h1>
                    <Link
                        href="/blog"
                        className="text-rose-500 hover:text-rose-600"
                    >
                        العودة للمدونة
                    </Link>
                </div>
                <Footer />
            </div>
        );
    }

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
                        <Link
                            href="/blog"
                            className="inline-flex items-center gap-2 text-[#5A5E4D] hover:text-[#4A4E3D] transition-colors mb-4"
                            style={{ fontFamily: "var(--font-almarai)" }}
                        >
                            <svg
                                className="w-5 h-5"
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
                            العودة للمدونة
                        </Link>
                        <div className="flex items-center gap-3 mb-3">
                            <span
                                className="bg-[#5A5E4D] text-white px-3 py-1 rounded-full text-sm"
                                style={{ fontFamily: "var(--font-almarai)" }}
                            >
                                {post.category}
                            </span>
                        </div>
                        <h1 className="text-[36px] font-bold leading-[40px] text-[#2D3319] mb-2 tracking-[0px]">
                            {post.title}
                        </h1>
                        <div className="flex items-center gap-3 text-[14px] text-[#5A5E4D]">
                            <span style={{ fontFamily: "var(--font-almarai)" }}>
                                {post.author}
                            </span>
                            <span>•</span>
                            <span style={{ fontFamily: "var(--font-almarai)" }}>
                                {post.date}
                            </span>
                            <span>•</span>
                            <span style={{ fontFamily: "var(--font-almarai)" }}>
                                {post.readTime}
                            </span>
                        </div>
                    </div>
                </section>

                {/* Article Content */}
                <section className="py-8">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="max-w-4xl mx-auto">
                            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                                {/* Featured Image */}
                                <div className="relative h-64 mx-16 mt-8 rounded-xl overflow-hidden shadow-md">
                                    <Image
                                        src={post.image}
                                        alt={post.title}
                                        fill
                                        className="object-cover transition-transform duration-300 hover:scale-105"
                                        quality={100}
                                        priority
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 40vw, 600px"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                                </div>

                                <div className="p-8">
                                    {/* Tags Section */}
                                    <div className="flex flex-wrap gap-2 mb-6 pb-6 border-b border-gray-200">
                                        {post.tags.map((tag, index) => (
                                            <span
                                                key={index}
                                                className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm"
                                                style={{
                                                    fontFamily:
                                                        "var(--font-almarai)",
                                                }}
                                            >
                                                #{tag}
                                            </span>
                                        ))}
                                    </div>

                                    {/* Article Content */}
                                    <div
                                        className="prose prose-lg max-w-none text-gray-700"
                                        style={{
                                            fontFamily: "var(--font-almarai)",
                                        }}
                                        dangerouslySetInnerHTML={{
                                            __html: post.content,
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <style jsx>{`
                    .prose h3 {
                        color: #5a5e4d;
                        font-weight: bold;
                        font-size: 1.5rem;
                        margin-top: 2rem;
                        margin-bottom: 1rem;
                        font-family: var(--font-almarai);
                    }
                    .prose p {
                        margin-bottom: 1.25rem;
                        line-height: 1.8;
                        color: #4b5563;
                        font-family: var(--font-almarai);
                    }
                    .prose ul {
                        margin: 1.5rem 0;
                        padding-right: 1.5rem;
                    }
                    .prose li {
                        margin-bottom: 0.75rem;
                        color: #4b5563;
                        font-family: var(--font-almarai);
                    }
                `}</style>

                {/* Related Articles */}
                <section className="py-16">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-12">
                            <h2
                                className="text-3xl font-bold text-[#5A5E4D] mb-3"
                                style={{ fontFamily: "var(--font-almarai)" }}
                            >
                                مقالات ذات صلة
                            </h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {blogPosts
                                .filter((p) => p.id !== postId)
                                .slice(0, 3)
                                .map((relatedPost) => (
                                    <article
                                        key={relatedPost.id}
                                        className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow flex flex-col"
                                    >
                                        <div className="relative h-52">
                                            <Image
                                                src={relatedPost.image}
                                                alt={relatedPost.title}
                                                fill
                                                className="object-cover"
                                                quality={95}
                                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 400px"
                                            />
                                            <div className="absolute top-3 right-3">
                                                <span
                                                    className="bg-[#5A5E4D] text-white px-3 py-1 rounded-full text-sm"
                                                    style={{
                                                        fontFamily:
                                                            "var(--font-almarai)",
                                                    }}
                                                >
                                                    {relatedPost.category}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="p-6 flex flex-col flex-grow">
                                            <h3
                                                className="text-lg font-bold text-[#5A5E4D] mb-2 line-clamp-2"
                                                style={{
                                                    fontFamily:
                                                        "var(--font-almarai)",
                                                }}
                                            >
                                                {relatedPost.title}
                                            </h3>

                                            <p
                                                className="text-gray-600 mb-4 line-clamp-3 flex-grow"
                                                style={{
                                                    fontFamily:
                                                        "var(--font-almarai)",
                                                }}
                                            >
                                                {relatedPost.excerpt}
                                            </p>

                                            <Link
                                                href={`/blog/${relatedPost.id}`}
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
            </main>
            <Footer />
        </div>
    );
}
