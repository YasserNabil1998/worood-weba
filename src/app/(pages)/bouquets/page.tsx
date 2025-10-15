
import Link from "next/link";
import Image from "next/image";
import BouquetsListingClient from "@/src/components/BouquetsListingClient";
import OccasionsSection from "@/src/components/OccasionsSection";
import CustomBouquetSection from "@/src/components/CustomBouquetSection";
import { Item } from "@/src/@types/bouquets/index.type";

async function fetchProducts(): Promise<Item[]> {
    const res = await fetch("https://dummyjson.com/products?limit=18", {
        next: { revalidate: 120 },
    });
    const data = await res.json();
    const badges = ["الأكثر شهرة", "عرض خاص", "جديد"];
    const colors = ["green", "red", "orange", "cyan", "violet", "amber"];
    const occs = [
        "wedding",
        "anniversary",
        "graduation",
        "engagement",
        "newborn",
        "getwell",
        "thanks",
    ];
    // استخدم صور الورود المحلية بدل صور المكياج من الـ API
    const bouquetImages = [
        "/images/bouquets/DIV-237.png",
        "/images/bouquets/IMG-196.png",
        "/images/bouquets/IMG-210.png",
        "/images/bouquets/IMG-224.png",
    ];

    return (data.products || []).map((p: any, idx: number) => ({
        id: p.id,
        title: p.title,
        image: bouquetImages[idx % bouquetImages.length],
        price: Math.round(p.price),
        badge: badges[idx % badges.length],
        isPopular: idx % 3 === 0, // كل ثالث منتج هو الأكثر شهرة
        color: colors[idx % colors.length],
        occasion: occs[idx % occs.length],
    }));
}

// Card rendering moved to Client Component `components/ProductCard.tsx`

export default async function BouquetsPage() {
    const items = await fetchProducts();
    return (
        <div
            className="min-h-screen bg-gradient-to-b from-[#FDFFF7] to-[#ECF1DD]"
            dir="rtl"
        >
            <main>
                {/* Page Title Section */}
                <section className="pt-8 pb-4">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-right">
                        <h1 className="text-[36px] font-bold leading-[40px] text-[#2D3319] mb-2 tracking-[0px]">
                            الباقات الجاهزة
                        </h1>
                        <p className="text-[16px] font-normal leading-[24px] text-[#5A5E4D] tracking-[0px]">
                            تشكيلة واسعة من الباقات المميزة لجميع المناسبات
                        </p>
                    </div>
                </section>

                {/* Hero */}
                <section className="py-6">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="relative h-[400px] rounded-xl overflow-hidden">
                            <Image
                                src="/images/hero/DIV-133.png"
                                alt="متجر زهور"
                                fill
                                className="object-cover"
                                priority
                                quality={90}
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
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
                                            باقات مميزة لكل مناسبة
                                        </h2>
                                        <p className="text-[18px] font-normal leading-[28px] text-white/90 mb-6 tracking-[0px]">
                                            اختر من تشكيلتنا الواسعة من الباقات
                                            المصممة بعناية لتناسب جميع المناسبات
                                            والأذواق
                                        </p>
                                        <a
                                            href="#bouquets-section"
                                            className="inline-block bg-white hover:bg-[#5A5E4D] text-[#5A5E4D] hover:text-white font-semibold px-8 py-3 rounded-lg shadow-lg transition-all duration-300"
                                        >
                                            تصفح الباقات
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Content */}
                <section id="bouquets-section" className="py-8">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        {/* Listing (sidebar + grid handled inside the client component) */}
                        <BouquetsListingClient items={items as any} />

                        {/* Pagination (static) */}
                    </div>
                </section>

                {/* Occasions Section */}
                <OccasionsSection
                    title="تسوق حسب المناسبة"
                    description="اختر من تشكيلتنا المميزة حسب المناسبة"
                />

                {/* Custom Bouquet Section */}
                <CustomBouquetSection
                    title="لم تجد ما تبحث عنه؟"
                    description="دعنا نساعدك في تصميم باقة فريدة تناسب ذوقك ومناسبتك الخاصة"
                    buttonText="ابدأ التصميم الآن"
                    buttonHref="/custom"
                />
            </main>
        </div>
    );
}
