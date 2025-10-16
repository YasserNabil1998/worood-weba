"use client";

import { useState } from "react";
import Image from "next/image";
import {
    Baby,
    GraduationCap,
    Heart,
    Gift,
    Sparkles,
    Calendar,
    ChevronUp,
    ChevronDown,
    ArrowLeft,
} from "lucide-react";

import CustomBouquetSection from "@/src/components/common/CustomBouquetSection";
import occasionsData from "./data/occasions.json";

export default function OccasionsPage() {
    const { pageContent, categories, featuredSection, occasionBlocks } =
        occasionsData;
    const [showWeddingBouquets, setShowWeddingBouquets] = useState(false);

    // Map icon names to Lucide components
    const getIconComponent = (iconName: string) => {
        const iconMap: Record<string, React.ComponentType<any>> = {
            Baby,
            GraduationCap,
            Heart,
            Gift,
            Sparkles,
            Calendar,
        };
        return iconMap[iconName] || Heart; // Default to Heart if not found
    };
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
                            {pageContent.title}
                        </h1>
                        <p className="text-[16px] font-normal leading-[24px] text-[#5A5E4D] tracking-[0px]">
                            {pageContent.subtitle}
                        </p>
                    </div>
                </section>

                {/* Hero */}
                <section className="py-6">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="relative h-[400px] rounded-xl overflow-hidden">
                            <Image
                                src={pageContent.hero.image}
                                alt="مناسبات"
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
                                            {pageContent.hero.title}
                                        </h2>
                                        <p className="text-[18px] font-normal leading-[28px] text-white/90 mb-6 tracking-[0px]">
                                            {pageContent.hero.description}
                                        </p>
                                        <a
                                            href={pageContent.hero.buttonLink}
                                            className="inline-block bg-white hover:bg-[#5A5E4D] text-[#5A5E4D] hover:text-white font-semibold px-8 py-3 rounded-lg shadow-lg transition-all duration-300"
                                        >
                                            {pageContent.hero.buttonText}
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Categories */}
                <section id="occasions-section" className="py-6">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="mb-6 text-right">
                            <h2
                                className="text-2xl md:text-3xl font-bold text-gray-800 mb-2"
                                style={{ fontFamily: "var(--font-almarai)" }}
                            >
                                {pageContent.categoriesSection.title}
                            </h2>
                            <p className="text-sm text-gray-600">
                                {pageContent.categoriesSection.subtitle}
                            </p>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {categories.map((c) => (
                                <a
                                    key={c.key}
                                    href={`#${c.sectionId}`}
                                    className="group block rounded-2xl overflow-hidden shadow-[0_8px_20px_rgba(0,0,0,0.12)] hover:shadow-[0_12px_30px_rgba(0,0,0,0.18)] transition-all duration-300 bg-white cursor-pointer"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        document
                                            .getElementById(c.sectionId)
                                            ?.scrollIntoView({
                                                behavior: "smooth",
                                                block: "start",
                                            });
                                    }}
                                >
                                    <div className="relative h-48 overflow-hidden">
                                        <Image
                                            src={c.image}
                                            alt={c.title}
                                            fill
                                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                                            sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                                            quality={85}
                                            loading="lazy"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent"></div>
                                        <div className="absolute inset-0 p-4 flex flex-col justify-end">
                                            <div className="flex items-center gap-2 mb-2">
                                                {(() => {
                                                    const IconComponent =
                                                        getIconComponent(
                                                            c.icon
                                                        );
                                                    return (
                                                        <IconComponent className="w-7 h-7 text-white" />
                                                    );
                                                })()}
                                                <h3
                                                    className="text-white text-lg md:text-xl font-bold"
                                                    style={{
                                                        fontFamily:
                                                            "var(--font-almarai)",
                                                    }}
                                                >
                                                    {c.title}
                                                </h3>
                                            </div>
                                            <p className="text-[13px] text-white/95 leading-5 h-10 line-clamp-2">
                                                {c.description}
                                            </p>
                                        </div>
                                    </div>
                                </a>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Featured Wedding Section */}
                <section id="wedding-section" className="py-6 scroll-mt-20">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div
                            className={`relative h-64 md:h-80 overflow-hidden shadow-lg transition-all duration-300 ${
                                showWeddingBouquets
                                    ? "rounded-t-2xl"
                                    : "rounded-2xl"
                            }`}
                        >
                            <Image
                                src={featuredSection.image}
                                alt={featuredSection.title}
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                                quality={90}
                                loading="lazy"
                            />
                            <div className="absolute inset-0 backdrop-blur-[1px]"></div>
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />
                            <div className="absolute inset-0 p-6 flex flex-col justify-end">
                                <div className="flex items-center gap-2 text-white mb-3">
                                    <Heart className="w-8 h-8" />
                                    <h2
                                        className="text-2xl md:text-3xl font-bold"
                                        style={{
                                            fontFamily: "var(--font-almarai)",
                                        }}
                                    >
                                        {featuredSection.title}
                                    </h2>
                                </div>
                                <p className="text-[15px] text-white/95 mb-4 max-w-2xl">
                                    {featuredSection.description}
                                </p>
                                <button
                                    onClick={() =>
                                        setShowWeddingBouquets(
                                            !showWeddingBouquets
                                        )
                                    }
                                    className={`inline-block self-start rounded-md px-6 py-3 text-sm font-semibold transition-all duration-300 ${
                                        showWeddingBouquets
                                            ? "bg-[#5A5E4D] text-white"
                                            : "bg-white text-gray-900 hover:bg-gray-100"
                                    }`}
                                >
                                    {featuredSection.buttonText}
                                    <span className="mr-2 inline">
                                        {showWeddingBouquets ? (
                                            <ChevronUp className="w-5 h-5 inline" />
                                        ) : (
                                            <ChevronDown className="w-5 h-5 inline" />
                                        )}
                                    </span>
                                </button>
                            </div>
                        </div>

                        {/* Bouquets Section - Toggle */}
                        <div
                            className={`transition-all duration-500 ease-in-out overflow-hidden ${
                                showWeddingBouquets
                                    ? "max-h-[2000px] opacity-100"
                                    : "max-h-0 opacity-0"
                            }`}
                        >
                            <div className="bg-white rounded-t-none rounded-b-2xl p-6 shadow-lg -mt-2">
                                <div className="flex items-center justify-between mb-6">
                                    <h3
                                        className="text-xl font-bold text-gray-800"
                                        style={{
                                            fontFamily: "var(--font-almarai)",
                                        }}
                                    >
                                        {featuredSection.sectionTitle}
                                    </h3>
                                    <a
                                        href={featuredSection.viewAllLink}
                                        className="text-sm text-[#5A5E4D] font-semibold inline-flex items-center gap-2 hover:gap-3 transition-all"
                                    >
                                        <span>
                                            {featuredSection.viewAllText}
                                        </span>
                                        <ArrowLeft className="w-5 h-5 inline" />
                                    </a>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    {featuredSection.bouquets.map((b) => (
                                        <a
                                            key={b.id}
                                            href={b.productLink}
                                            className="group rounded-2xl border border-gray-200 overflow-hidden bg-white hover:shadow-xl transition-all duration-300 block"
                                        >
                                            <div className="relative h-80 overflow-hidden">
                                                <Image
                                                    src={b.image}
                                                    alt={b.title}
                                                    fill
                                                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                                                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                                    quality={85}
                                                    loading="lazy"
                                                />
                                                {/* شارات المنتج */}
                                                <div className="absolute top-3 right-3 flex flex-col gap-2">
                                                    {b.isBestseller && (
                                                        <span className="bg-[#5A5E4D] text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                                                            الأكثر مبيعاً
                                                        </span>
                                                    )}
                                                    {b.oldPrice && (
                                                        <span className="bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                                                            خصم{" "}
                                                            {Math.round(
                                                                ((b.oldPrice -
                                                                    b.price) /
                                                                    b.oldPrice) *
                                                                    100
                                                            )}
                                                            %
                                                        </span>
                                                    )}
                                                </div>
                                                {/* حالة التوفر */}
                                                {!b.isAvailable && (
                                                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                                                        <span className="bg-white text-gray-800 px-4 py-2 rounded-lg font-bold">
                                                            غير متوفر حالياً
                                                        </span>
                                                    </div>
                                                )}
                                            </div>
                                            <div className="p-4">
                                                <h4
                                                    className="text-center text-base font-bold mb-3 text-gray-800 group-hover:text-[#5A5E4D] transition-colors"
                                                    style={{
                                                        fontFamily:
                                                            "var(--font-almarai)",
                                                    }}
                                                >
                                                    {b.title}
                                                </h4>
                                                {/* السعر */}
                                                <div className="text-center mb-3">
                                                    <div className="flex items-center justify-center gap-2">
                                                        <span className="text-lg font-bold text-[#5A5E4D]">
                                                            {b.price} ریال
                                                        </span>
                                                        {b.oldPrice && (
                                                            <span className="text-sm text-gray-400 line-through">
                                                                {b.oldPrice}{" "}
                                                                ریال
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                                <button
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        // سيتم إضافة وظيفة إضافة للسلة هنا
                                                        alert(
                                                            `تمت إضافة ${b.title} إلى السلة`
                                                        );
                                                    }}
                                                    className="w-full py-3 rounded-lg text-white text-sm font-semibold bg-[#5A5E4D] hover:bg-[#4a4e3d] transition-colors"
                                                >
                                                    أضف إلى السلة
                                                </button>
                                            </div>
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Occasion blocks grid (خطوبة/نجاح/مولود جديد/ذكرى سنوية) */}
                <section className="py-6">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {occasionBlocks.map((blk) => (
                                <div
                                    key={blk.key}
                                    id={blk.sectionId}
                                    className="bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 scroll-mt-20"
                                >
                                    {/* الصورة الرئيسية */}
                                    <div className="relative h-40 sm:h-48 overflow-hidden">
                                        <Image
                                            src={blk.banner}
                                            alt={blk.title}
                                            fill
                                            className="object-cover"
                                            sizes="(max-width: 768px) 100vw, 50vw"
                                            quality={85}
                                            loading="lazy"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />
                                        <div className="absolute inset-0 p-5 flex flex-col justify-end">
                                            <div className="flex items-center gap-2 mb-3">
                                                {(() => {
                                                    const IconComponent =
                                                        getIconComponent(
                                                            blk.icon
                                                        );
                                                    return (
                                                        <IconComponent className="w-7 h-7 text-white" />
                                                    );
                                                })()}
                                                <h3
                                                    className="text-white text-xl md:text-2xl font-bold"
                                                    style={{
                                                        fontFamily:
                                                            "var(--font-almarai)",
                                                    }}
                                                >
                                                    {blk.title}
                                                </h3>
                                            </div>
                                            <a
                                                href={blk.categoryLink}
                                                className="inline-block self-start rounded-lg bg-white/95 hover:bg-white px-5 py-2 text-sm font-semibold text-gray-900 transition-all duration-300 hover:shadow-lg"
                                            >
                                                {blk.buttonText}
                                            </a>
                                        </div>
                                    </div>

                                    {/* الباقات أسفل الصورة مباشرة */}
                                    <div className="bg-white p-4">
                                        <div className="grid grid-cols-3 gap-4">
                                            {blk.products.map((product) => (
                                                <a
                                                    key={product.id}
                                                    href={product.productLink}
                                                    className="group relative rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 block"
                                                >
                                                    <div className="relative w-full h-52 md:h-64 overflow-hidden bg-gray-100">
                                                        <Image
                                                            src={product.image}
                                                            alt={`${blk.title} منتج ${product.id}`}
                                                            fill
                                                            className="object-cover group-hover:scale-110 transition-transform duration-500"
                                                            sizes="(max-width: 768px) 33vw, 16vw"
                                                            quality={85}
                                                            loading="lazy"
                                                        />
                                                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                                    </div>
                                                </a>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Additional occasions - Get Well & Thanks */}
                <section className="py-6">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {[
                                categories.find((c) => c.key === "getwell"),
                                categories.find((c) => c.key === "thanks"),
                            ].map(
                                (occasion) =>
                                    occasion && (
                                        <div
                                            key={occasion.key}
                                            id={occasion.sectionId}
                                            className="bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 scroll-mt-20"
                                        >
                                            {/* الصورة الرئيسية */}
                                            <div className="relative h-40 sm:h-48 overflow-hidden">
                                                <Image
                                                    src={occasion.image}
                                                    alt={occasion.title}
                                                    fill
                                                    className="object-cover"
                                                    sizes="(max-width: 768px) 100vw, 50vw"
                                                    quality={85}
                                                    loading="lazy"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />
                                                <div className="absolute inset-0 p-5 flex flex-col justify-end">
                                                    <div className="flex items-center gap-2 mb-3">
                                                        {(() => {
                                                            const IconComponent =
                                                                getIconComponent(
                                                                    occasion.icon
                                                                );
                                                            return (
                                                                <IconComponent className="w-7 h-7 text-white" />
                                                            );
                                                        })()}
                                                        <h3
                                                            className="text-white text-xl md:text-2xl font-bold"
                                                            style={{
                                                                fontFamily:
                                                                    "var(--font-almarai)",
                                                            }}
                                                        >
                                                            {occasion.title}
                                                        </h3>
                                                    </div>
                                                    <a
                                                        href={
                                                            occasion.categoryLink
                                                        }
                                                        className="inline-block self-start rounded-lg bg-white/95 hover:bg-white px-5 py-2 text-sm font-semibold text-gray-900 transition-all duration-300 hover:shadow-lg"
                                                    >
                                                        {occasion.buttonText}
                                                    </a>
                                                </div>
                                            </div>

                                            {/* الباقات أسفل الصورة مباشرة */}
                                            <div className="bg-white p-4">
                                                <div className="grid grid-cols-3 gap-4">
                                                    {occasion.products?.map(
                                                        (product) => (
                                                            <a
                                                                key={product.id}
                                                                href={
                                                                    product.productLink
                                                                }
                                                                className="group relative rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 block"
                                                            >
                                                                <div className="relative w-full h-52 md:h-64 overflow-hidden bg-gray-100">
                                                                    <Image
                                                                        src={
                                                                            product.image
                                                                        }
                                                                        alt={`${occasion.title} منتج ${product.id}`}
                                                                        fill
                                                                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                                                                        sizes="(max-width: 768px) 33vw, 16vw"
                                                                        quality={
                                                                            85
                                                                        }
                                                                        loading="lazy"
                                                                    />
                                                                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                                                </div>
                                                            </a>
                                                        )
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    )
                            )}
                        </div>
                    </div>
                </section>

                {/* Custom Bouquet Section */}
                <CustomBouquetSection
                    title="لم تجد المناسبة المناسبة؟"
                    description="جي تستمد في تصميم باقة فريدة تناسب مناسبتك الخاصة بمناسباتك"
                    buttonText="صمم باقتك الخاصة"
                    buttonHref="/custom"
                />
            </main>
        </div>
    );
}
