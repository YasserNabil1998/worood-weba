"use client";

import Image from "next/image";
import Link from "next/link";
import { Baby, GraduationCap, Heart, Gift, Sparkles, Calendar } from "lucide-react";

import CustomBouquetSection from "@/src/components/common/CustomBouquetSection";
import occasionsData from "./data/occasions.json";

export default function OccasionsPage() {
  const { pageContent, categories } = occasionsData;

  // Map icon names to Lucide components
  const getIconComponent = (iconName: string) => {
    const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
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
    <div className="min-h-screen" dir="rtl">
      <main>
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
                      المناسبات
                    </h2>
                    <p className="text-[18px] font-normal leading-[28px] text-white/90 mb-6 tracking-[0px]">
                      {pageContent.hero.description}
                    </p>
                    <Link
                      href={pageContent.hero.buttonLink}
                      className="inline-block bg-white hover:bg-[#5A5E4D] text-[#5A5E4D] hover:text-white font-semibold px-8 py-3 rounded-lg shadow-lg transition-all duration-300"
                    >
                      {pageContent.hero.buttonText}
                    </Link>
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
              <p className="text-sm text-gray-600">{pageContent.categoriesSection.subtitle}</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {categories.map((c) => (
                <Link
                  key={c.key}
                  href={c.categoryLink}
                  className="group block rounded-2xl overflow-hidden shadow-[0_8px_20px_rgba(0,0,0,0.12)] hover:shadow-[0_12px_30px_rgba(0,0,0,0.18)] transition-all duration-300 bg-white cursor-pointer"
                >
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={c.image}
                      alt={c.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                      sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent"></div>
                    <div className="absolute inset-0 p-4 flex flex-col justify-end">
                      <div className="flex items-center gap-2 mb-2">
                        {(() => {
                          const IconComponent = getIconComponent(c.icon);
                          return <IconComponent className="w-7 h-7 text-white" />;
                        })()}
                        <h3
                          className="text-white text-lg md:text-xl font-bold"
                          style={{
                            fontFamily: "var(--font-almarai)",
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
                </Link>
              ))}
            </div>
          </div>
        </section>

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
