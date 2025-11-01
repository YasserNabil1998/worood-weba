"use client";

import Link from "next/link";
import Image from "next/image";
import { useMemo } from "react";
import { ASSETS } from "@/src/assets";
import { OccasionItem, OccasionWithHref } from "@/src/@types/home/index.type";
import { defaultOccasions } from "@/src/content/occasions";
import { ROUTES } from "@/src/constants/routes";
import {
  Baby,
  GraduationCap,
  Heart,
  Gift,
  Sparkles,
  Calendar,
  ArrowLeft,
} from "lucide-react";

type OccasionsSectionProps = {
  occasions?: OccasionWithHref[];
  isLoading?: boolean;
  title?: string;
  description?: string;
};

const OccasionsSection = ({
  occasions = defaultOccasions,
  isLoading = false,
  title = "المناسبات",
  description = "اختر من تشكيلتنا المميزة حسب المناسبة",
}: OccasionsSectionProps) => {
  // Memoize occasions to prevent unnecessary re-renders
  const memoizedOccasions = useMemo(() => occasions, [occasions]);

  // Map icon names to Lucide components
  const getIconComponent = (iconName: string) => {
    const iconMap: Record<
      string,
      React.ComponentType<{ className?: string }>
    > = {
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
    <section className="py-6 sm:py-8 md:py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 sm:mb-8 gap-4">
          <div className="text-right">
            <h2
              className="text-[20px] sm:text-[22px] md:text-[24px] font-bold text-gray-800 mb-2 leading-[28px] sm:leading-[30px] md:leading-[32px] tracking-[0px]"
              style={{ fontFamily: "var(--font-almarai)" }}
            >
              {title}
            </h2>
            <p
              className="text-[14px] sm:text-[15px] md:text-[16px] font-normal text-gray-600 leading-[20px] sm:leading-[22px] md:leading-[24px] tracking-[0px]"
              style={{ fontFamily: "var(--font-almarai)" }}
            >
              {description}
            </p>
          </div>
          <Link
            href={ROUTES.OCCASIONS}
            className="text-[#5A5E4D] hover:underline text-sm font-semibold cursor-pointer flex items-center gap-2"
            style={{ fontFamily: "var(--font-almarai)" }}
          >
            <span>اكتشف أكثر</span>
            <ArrowLeft className="w-4 h-4" />
          </Link>
        </div>

        {/* تصميم Grid متداخل مثل الصورة - ترتيب Bento Box */}
        <div className="grid grid-cols-4 grid-rows-2 gap-3 sm:gap-4 md:gap-6 h-[350px] sm:h-[400px] md:h-[450px] lg:h-[500px]">
          {isLoading && (
            <div
              className="col-span-full row-span-full text-center text-gray-600 flex items-center justify-center h-full"
              style={{ fontFamily: "var(--font-almarai)" }}
            >
              جاري التحميل...
            </div>
          )}

          {/* العنصر الأول - مربع صغير في الأعلى اليسار */}
          <Link
            href={
              memoizedOccasions[0]?.href ||
              ROUTES.OCCASIONS +
                `/${memoizedOccasions[0]?.title
                  ?.toLowerCase()
                  .replace(/\s+/g, "-")}`
            }
            className="group cursor-pointer col-span-1 row-span-1"
          >
            <div className="relative overflow-hidden rounded-xl sm:rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 h-full">
              <div className="relative w-full h-full">
                <Image
                  src={memoizedOccasions[0]?.image || ""}
                  alt={memoizedOccasions[0]?.title || ""}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 640px) 25vw, (max-width: 768px) 25vw, 12.5vw"
                  loading="lazy"
                />
              </div>
              <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-2 sm:p-3 text-center">
                {memoizedOccasions[0]?.icon && (
                  <div className="flex justify-center mb-1">
                    {(() => {
                      const IconComponent = getIconComponent(
                        memoizedOccasions[0]?.icon || ""
                      );
                      return (
                        <IconComponent className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-white opacity-90" />
                      );
                    })()}
                  </div>
                )}
                <h3
                  className="text-xs sm:text-sm font-semibold text-white"
                  style={{
                    fontFamily: "var(--font-almarai)",
                  }}
                >
                  {memoizedOccasions[0]?.title}
                </h3>
              </div>
            </div>
          </Link>

          {/* العنصر الثاني - مستطيل عريض في الأعلى اليمين */}
          <Link
            href={
              memoizedOccasions[1]?.href ||
              ROUTES.OCCASIONS +
                `/${memoizedOccasions[1]?.title
                  ?.toLowerCase()
                  .replace(/\s+/g, "-")}`
            }
            className="group cursor-pointer col-span-3 row-span-1"
          >
            <div className="relative overflow-hidden rounded-xl sm:rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 h-full">
              <div className="relative w-full h-full">
                <Image
                  src={memoizedOccasions[1]?.image || ""}
                  alt={memoizedOccasions[1]?.title || ""}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 640px) 75vw, (max-width: 768px) 75vw, 37.5vw"
                  loading="lazy"
                />
              </div>
              <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 text-center">
                {memoizedOccasions[1]?.icon && (
                  <div className="flex justify-center mb-1 sm:mb-2">
                    {(() => {
                      const IconComponent = getIconComponent(
                        memoizedOccasions[1]?.icon || ""
                      );
                      return (
                        <IconComponent className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 text-white opacity-90" />
                      );
                    })()}
                  </div>
                )}
                <h3
                  className="text-sm sm:text-base md:text-lg font-semibold text-white"
                  style={{
                    fontFamily: "var(--font-almarai)",
                  }}
                >
                  {memoizedOccasions[1]?.title}
                </h3>
              </div>
            </div>
          </Link>

          {/* العنصر الثالث - مستطيل عريض في الأسفل اليسار */}
          <Link
            href={
              memoizedOccasions[2]?.href ||
              ROUTES.OCCASIONS +
                `/${memoizedOccasions[2]?.title
                  ?.toLowerCase()
                  .replace(/\s+/g, "-")}`
            }
            className="group cursor-pointer col-span-3 row-span-1"
          >
            <div className="relative overflow-hidden rounded-xl sm:rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 h-full">
              <div className="relative w-full h-full">
                <Image
                  src={memoizedOccasions[2]?.image || ""}
                  alt={memoizedOccasions[2]?.title || ""}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 640px) 75vw, (max-width: 768px) 75vw, 37.5vw"
                  loading="lazy"
                />
              </div>
              <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 text-center">
                {memoizedOccasions[2]?.icon && (
                  <div className="flex justify-center mb-1 sm:mb-2">
                    {(() => {
                      const IconComponent = getIconComponent(
                        memoizedOccasions[2]?.icon || ""
                      );
                      return (
                        <IconComponent className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 text-white opacity-90" />
                      );
                    })()}
                  </div>
                )}
                <h3
                  className="text-sm sm:text-base md:text-lg font-semibold text-white"
                  style={{
                    fontFamily: "var(--font-almarai)",
                  }}
                >
                  {memoizedOccasions[2]?.title}
                </h3>
              </div>
            </div>
          </Link>

          {/* العنصر الرابع - مربع صغير في الأسفل اليمين */}
          <Link
            href={
              memoizedOccasions[3]?.href ||
              ROUTES.OCCASIONS +
                `/${memoizedOccasions[3]?.title
                  ?.toLowerCase()
                  .replace(/\s+/g, "-")}`
            }
            className="group cursor-pointer col-span-1 row-span-1"
          >
            <div className="relative overflow-hidden rounded-xl sm:rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 h-full">
              <div className="relative w-full h-full">
                <Image
                  src={memoizedOccasions[3]?.image || ""}
                  alt={memoizedOccasions[3]?.title || ""}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 640px) 25vw, (max-width: 768px) 25vw, 12.5vw"
                  loading="lazy"
                />
              </div>
              <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-2 sm:p-3 text-center">
                {memoizedOccasions[3]?.icon && (
                  <div className="flex justify-center mb-1">
                    {(() => {
                      const IconComponent = getIconComponent(
                        memoizedOccasions[3]?.icon || ""
                      );
                      return (
                        <IconComponent className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-white opacity-90" />
                      );
                    })()}
                  </div>
                )}
                <h3
                  className="text-xs sm:text-sm font-semibold text-white"
                  style={{
                    fontFamily: "var(--font-almarai)",
                  }}
                >
                  {memoizedOccasions[3]?.title}
                </h3>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default OccasionsSection;
