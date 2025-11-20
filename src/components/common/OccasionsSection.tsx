"use client";

import Link from "next/link";
import Image from "next/image";
import { useMemo } from "react";
import { ASSETS } from "@/src/assets";
import { OccasionItem, OccasionWithHref } from "@/src/@types/home/index.type";
import { defaultOccasions } from "@/src/content/occasions";
import { ROUTES } from "@/src/constants/routes";
import { Baby, GraduationCap, Heart, Gift, Sparkles, Calendar, ArrowLeft } from "lucide-react";

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
  description = "كل لحظة تستحق باقة مميزة",
}: OccasionsSectionProps) => {
  // Memoize occasions to prevent unnecessary re-renders
  const memoizedOccasions = useMemo(() => occasions, [occasions]);

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

  // Occasion data matching Figma design
  const occasionsData = [
    {
      title: "خطوبة",
      description: "باقتك المميزة بداية تعبر عن فرحتك",
      image: "/assets/home/occasions-img/Engagement.png",
    },
    {
      title: "زواج",
      description: "ورود بألوان فخمة ولمسات ناعمة",
      image: "/assets/home/occasions-img/Wedding.png",
    },
    {
      title: "نجاح",
      description: "احتفل بإنجازك بأجمل الورود",
      image: "/assets/home/occasions-img/Success.png",
    },
    {
      title: "مولود جديد",
      description: "باقات ناعمة ترحب بالحياة الجديدة",
      image: "/assets/home/occasions-img/newborn.png",
    },
  ];

  return (
    <section className="py-6 sm:py-8 md:py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 sm:mb-8 gap-4">
          <div className="text-right">
            {/* Title - matching Figma: 30px, Almarai Bold */}
            <h2
              className="text-[24px] sm:text-[28px] md:text-[30px] font-bold text-black mb-2"
              style={{ fontFamily: "var(--font-almarai)" }}
            >
              {title}
            </h2>
            {/* Description - matching Figma: 25px, Almarai Regular */}
            <p
              className="text-[20px] sm:text-[23px] md:text-[25px] font-normal text-black"
              style={{ fontFamily: "var(--font-almarai)" }}
            >
              {description || "كل لحظة تستحق باقة مميزة"}
            </p>
          </div>
          <Link
            href={ROUTES.OCCASIONS}
            className="text-[#5a5e4d] hover:underline text-[16px] font-normal cursor-pointer flex items-center gap-2"
            style={{ fontFamily: "var(--font-almarai)" }}
          >
            <span>عرض الكل</span>
            <ArrowLeft className="w-4 h-4" />
          </Link>
        </div>

        {/* 4 horizontal cards - matching Figma design */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {isLoading && (
            <div
              className="col-span-full text-center text-gray-600 flex items-center justify-center h-[283px]"
              style={{ fontFamily: "var(--font-almarai)" }}
            >
              جاري التحميل...
            </div>
          )}

          {/* 4 occasion cards - matching Figma design */}
          {occasionsData.map((occasion, index) => {
            const occasionItem = memoizedOccasions[index];
            const href = occasionItem?.href || ROUTES.OCCASIONS + `/${occasion.title.toLowerCase().replace(/\s+/g, "-")}`;
            
            return (
              <Link
                key={index}
                href={href}
                className="group cursor-pointer"
              >
                {/* Card - matching Figma: bg-neutral-100, border #e0dede, rounded-[20px], 260px width, 283px height */}
                <div className="bg-neutral-100 border border-[#e0dede] rounded-[20px] h-[281px] sm:h-[283px] p-6 flex flex-col items-center text-center hover:shadow-lg transition-all duration-300">
                  {/* Image - matching Figma: 120px circle, border #9d9d9d */}
                  <div className="w-[120px] h-[120px] rounded-[60px] border border-[#9d9d9d] overflow-hidden mb-4">
                    <Image
                      src={occasion.image}
                      alt={occasion.title}
                      width={120}
                      height={120}
                      className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                  </div>

                  {/* Title - matching Figma: 20px, Almarai Bold, black */}
                  <h3
                    className="text-[18px] sm:text-[20px] font-bold text-black mb-2"
                    style={{
                      fontFamily: "var(--font-almarai)",
                    }}
                  >
                    {occasion.title}
                  </h3>

                  {/* Description - matching Figma: 16px, Almarai Bold, #5c5a57 */}
                  <p
                    className="text-[14px] sm:text-[16px] font-bold text-[#5c5a57] text-center leading-relaxed"
                    style={{
                      fontFamily: "var(--font-almarai)",
                    }}
                  >
                    {occasion.description}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default OccasionsSection;
