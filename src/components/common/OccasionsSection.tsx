"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect } from "react";
import { OccasionWithHref } from "@/types/home";
import { defaultOccasions } from "@/content/occasions";
import { ROUTES } from "@/constants/routes";
import { ArrowLeft } from "lucide-react";
import { UI_TEXTS } from "@/constants";
import AOSWrapper from "./AOSWrapper";
import { useHomePageStore } from "@/stores";

type OccasionsSectionProps = {
  occasions?: OccasionWithHref[];
  isLoading?: boolean;
  title?: string;
  description?: string;
};

const OccasionsSection = ({
  occasions: propOccasions,
  isLoading: propIsLoading,
  title = "المناسبات",
  description = "كل لحظة تستحق باقة مميزة",
}: OccasionsSectionProps) => {
  const storeIsLoading = useHomePageStore((state) => state.isLoading);
  const fetchHomePageData = useHomePageStore((state) => state.fetchHomePageData);

  useEffect(() => {
    fetchHomePageData();
  }, [fetchHomePageData]);

  const isLoading = propIsLoading !== undefined ? propIsLoading : storeIsLoading;

  // Occasion data matching Figma design - ordered as in design: مولود جديد, نجاح, عيد ميلاد, خطوبة
  const occasionsData = [
    {
      title: "مولود جديد",
      description: "باقات ناعمة ترحب بالحياة الجديدة",
      image: "/assets/home/occasions-img/icons8-baby-stroller-96 1.svg",
      imageSize: 96,
      occasionKey: "newborn",
    },
    {
      title: "نجاح",
      description: "احتفل بإنجازك بأجمل الورود",
      image: "/assets/home/occasions-img/noto_graduation-cap.svg",
      imageSize: 85,
      occasionKey: "graduation",
    },
    {
      title: "عيد ميلاد",
      description: "ورود مناسبة للحفل عيد ميلاد",
      image: "/assets/home/occasions-img/noto_birthday-cake.svg",
      imageSize: 100,
      occasionKey: "anniversary",
    },
    {
      title: "خطوبة",
      description: "باقتك المميزة بداية تعبر عن فرحتك",
      image: "/assets/home/occasions-img/stash_engagement.svg",
      imageSize: 70,
      occasionKey: "engagement",
    },
  ];

  return (
    <section className="py-6 sm:py-8 md:py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 sm:mb-8 gap-4">
          <div className="text-right">
            {/* Title - matching سعادة في مزهرية section: 28px mobile, 30px tablet+ */}
            <h2 className="text-[28px] sm:text-[30px] font-bold text-black mb-2">
              {title}
            </h2>
            {/* Description - matching سعادة في مزهرية section: 20px mobile, 23px tablet, 25px desktop */}
            <p
              className="text-[20px] sm:text-[23px] md:text-[25px] font-normal text-black"
            >
              {description || "كل لحظة تستحق باقة مميزة"}
            </p>
          </div>
          <Link
            href={`${ROUTES.BOUQUETS}?openFilter=occasion`}
            className="text-[#5a5e4d] hover:text-[#4a4e3d] text-[20px] font-normal cursor-pointer flex items-center gap-2 transition-colors"
          >
            <span>{UI_TEXTS.VIEW_ALL}</span>
            <ArrowLeft className="w-4 h-4" />
          </Link>
        </div>

        {/* 4 horizontal cards - matching Figma design */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {isLoading && (
            <div
              className="col-span-full text-center text-gray-600 flex items-center justify-center h-[283px]"
            >
              {UI_TEXTS.LOADING}
            </div>
          )}

          {/* 4 occasion cards - matching Figma design */}
          {occasionsData.map((occasion, index) => {
            const href = `${ROUTES.BOUQUETS}?occasion=${occasion.occasionKey}&openFilter=occasion`;

            return (
              <AOSWrapper key={index} animation="zoom-in" delay={index * 100} duration={800}>
                <div className="h-full">
                  <Link href={href} className="group cursor-pointer block h-full">
                    {/* Card - matching Figma: bg-neutral-100, border #e0dede, rounded-[20px], 260px width, 283px height */}
                    <div className="bg-neutral-100 border border-[#e0dede] rounded-[20px] h-[283px] p-6 flex flex-col items-center justify-start text-center hover:shadow-lg transition-all duration-300">
                      {/* Image - matching Figma design with appropriate sizes */}
                      <div
                        className="flex items-center justify-center shrink-0 mb-4"
                        style={{ minHeight: "120px", maxHeight: "120px" }}
                      >
                        <Image
                          src={occasion.image}
                          alt={occasion.title}
                          width={occasion.imageSize}
                          height={occasion.imageSize}
                          className="object-contain"
                        />
                      </div>

                      {/* Title and Description - Fixed position below image */}
                      <div className="w-full">
                        {/* Title - matching Figma: 20px, Almarai Bold, black */}
                        <h3 className="text-[20px] font-bold text-black mb-2">
                          {occasion.title}
                        </h3>

                        {/* Description - matching Figma: 16px, Almarai Bold, #5c5a57 */}
                        <p
                          className="text-[16px] font-bold text-[#5c5a57] text-center leading-relaxed"
                        >
                          {occasion.description}
                        </p>
                      </div>
                    </div>
                  </Link>
                </div>
              </AOSWrapper>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default OccasionsSection;
