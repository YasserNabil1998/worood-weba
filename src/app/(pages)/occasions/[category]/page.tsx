import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Heart, GraduationCap, Baby, Calendar, Sparkles, Gift } from "lucide-react";
import { OccasionData, OccasionProduct } from "@/src/@types/occasions/category/OccasionData.type";
import occasionsDataJson from "@/src/data/occasions-data.json";
import ProductCard from "@/src/components/ProductCard";
import { BouquetItem } from "@/src/@types/bouquets/index.type";

const occasionsData: Record<string, OccasionData> = occasionsDataJson;

// قائمة موحدة لجميع المناسبات للاستخدام في الـ sidebar
const allOccasions = [
  { key: "wedding", name: "زواج", icon: "Heart" },
  { key: "engagement", name: "خطوبة", icon: "Heart" },
  { key: "graduation", name: "نجاح وتخرج", icon: "GraduationCap" },
  { key: "newborn", name: "مولود جديد", icon: "Baby" },
  { key: "anniversary", name: "ذكرى سنوية", icon: "Calendar" },
  { key: "getwell", name: "شفاء عاجل", icon: "Sparkles" },
  { key: "thanks", name: "شكر وتقدير", icon: "Gift" },
];

// Map icon names to Lucide components
const getIconComponent = (iconName: string) => {
  const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
    Heart,
    GraduationCap,
    Baby,
    Calendar,
    Sparkles,
    Gift,
  };
  return iconMap[iconName] || Heart;
};

// تحويل منتج المناسبة إلى عنصر باقة
const convertToBouquetItem = (product: OccasionProduct): BouquetItem => {
  return {
    id: product.id,
    title: product.title,
    image: product.image,
    price: product.price,
    badge: product.badge || (product.isBestseller ? "الأكثر مبيعاً" : undefined),
    isPopular: product.isPopular,
  };
};

export default async function OccasionPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  const occasionData = occasionsData[category];

  if (!occasionData) {
    notFound();
  }

  return (
    <div className="min-h-screen">
      <main>
        {/* Breadcrumb */}
        <div className="w-full px-8 sm:px-12 lg:px-16 xl:px-24 2xl:px-32 py-6">
          <div
            className="flex items-center gap-2 text-sm"
            style={{ fontFamily: "var(--font-almarai)" }}
          >
            <Link href="/" className="text-gray-600 hover:text-gray-800">
              الرئيسية
            </Link>
            <span className="text-gray-400">×</span>
            <span className="text-[#5A5E4D] font-medium">{occasionData.title}</span>
          </div>
        </div>

        {/* Hero Section */}
        <section className="w-full px-8 sm:px-12 lg:px-16 xl:px-24 2xl:px-32 py-8">
          <div className="flex justify-end">
            <div className="text-right mb-6 max-w-6xl">
              <h1
                className="text-3xl md:text-4xl font-bold text-[#5A5E4D] mb-2"
                style={{ fontFamily: "var(--font-almarai)" }}
              >
                {occasionData.title}
              </h1>
              <p
                className="text-lg text-gray-600 mb-4"
                style={{ fontFamily: "var(--font-almarai)" }}
              >
                {occasionData.productsCount} منتج
              </p>
              <p
                className="text-sm md:text-base text-gray-700 leading-relaxed"
                style={{ fontFamily: "var(--font-almarai)" }}
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
                  style={{
                    fontFamily: "var(--font-almarai)",
                  }}
                >
                  المناسبات
                </h3>
                <div className="space-y-2">
                  {allOccasions.map((occasion) => {
                    const isActive = occasion.key === category;
                    const IconComponent = getIconComponent(occasion.icon);
                    return (
                      <Link
                        key={occasion.key}
                        href={`/occasions/${occasion.key}`}
                        className={`flex items-center justify-start gap-3 p-3 rounded-xl transition-all duration-200 group ${
                          isActive
                            ? "bg-[#F5F3ED] text-[#5A5E4D] shadow-md"
                            : "hover:bg-[#F8F6F0] text-gray-700 hover:text-gray-900"
                        }`}
                      >
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 ${
                            isActive
                              ? "bg-[#5A5E4D]/10 scale-110"
                              : "bg-[#F5F1E8] group-hover:scale-110"
                          }`}
                        >
                          <IconComponent className="w-4 h-4" />
                        </div>
                        <span
                          className={`text-sm font-medium ${
                            isActive ? "text-[#5A5E4D]" : "text-gray-700 group-hover:text-gray-900"
                          }`}
                          style={{
                            fontFamily: "var(--font-almarai)",
                          }}
                        >
                          {occasion.name}
                        </span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            </aside>

            {/* Products Grid */}
            <div className="flex-1">
              {occasionData.products && occasionData.products.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {occasionData.products.map((product) => (
                    <ProductCard key={product.id} item={convertToBouquetItem(product)} />
                  ))}
                </div>
              ) : (
                (() => {
                  const EmptyIcon = getIconComponent(occasionData.icon);
                  return (
                    <div className="flex items-center justify-center min-h-[400px]">
                      <div className="text-center max-w-md">
                        <div className="mb-6">
                          <EmptyIcon className="w-16 h-16 mx-auto text-[#5A5E4D]/30" />
                        </div>
                        <h3
                          className="text-xl font-bold text-gray-800 mb-3"
                          style={{
                            fontFamily: "var(--font-almarai)",
                          }}
                        >
                          المنتجات قيد التحضير
                        </h3>
                        <p
                          className="text-gray-600 mb-6"
                          style={{
                            fontFamily: "var(--font-almarai)",
                          }}
                        >
                          نعمل حالياً على إضافة منتجات {occasionData.title} المميزة. تابعونا قريباً
                          لرؤية تشكيلتنا الرائعة!
                        </p>
                        <Link
                          href="/occasions"
                          className="inline-block bg-[#5A5E4D] text-white px-6 py-3 rounded-lg hover:bg-[#4a4e3d] transition-colors"
                          style={{
                            fontFamily: "var(--font-almarai)",
                          }}
                        >
                          العودة إلى المناسبات
                        </Link>
                      </div>
                    </div>
                  );
                })()
              )}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

// Generate static params for all occasions
export async function generateStaticParams() {
  return Object.keys(occasionsData).map((category) => ({
    category: category,
  }));
}
