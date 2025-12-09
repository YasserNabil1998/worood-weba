"use client";

import type { FeatureItem } from "@/types";
import { localFeatures } from "@/content/features";
import { useEffect, useRef, useState } from "react";
import { fontStyle } from "@/lib/styles";
import AOSWrapper from "./common/AOSWrapper";

type FeaturesSectionProps = {
  features?: FeatureItem[];
};

const FeaturesSection = ({ features }: FeaturesSectionProps) => {
  const featuresToShow = features || localFeatures;

  return (
    <section
      className="py-6 sm:py-8 md:py-10 relative"
      style={{ backgroundColor: "var(--color-background)" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 sm:mb-8 gap-4">
          <div className="text-right">
            {/* Title - أصغر قليلاً */}
            <h2
              className="text-[24px] sm:text-[26px] md:text-[28px] font-bold text-black mb-2"
              style={{
                fontFamily: "var(--font-almarai)",
              }}
              dir="auto"
            >
              لماذا تختارنا ؟
            </h2>
            {/* Description - أصغر قليلاً */}
            <p
              className="text-[18px] sm:text-[20px] md:text-[22px] font-normal text-black"
              style={{
                fontFamily: "var(--font-almarai)",
              }}
              dir="auto"
            >
              لأننا نهتم بكل تفصيلة بتجربتك مع الورد
            </p>
          </div>
        </div>

        {/* Cards Grid - flat design matching the image: no borders, no shadows, same background */}
        <div className="grid gap-2 sm:gap-3 md:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 justify-items-center items-start">
          {featuresToShow.map((feature: FeatureItem, index: number) => {
            // Middle card (index 1) should be higher up, side cards should be lower
            const isMiddleCard = index === 1;
            const isSideCard = index === 0 || index === 2;
            // التفاف جانبي: العناصر الفردية من اليمين، الزوجية من اليسار
            const flipAnimation = index % 2 === 0 ? "flip-left" : "flip-right";
            return (
              <AOSWrapper
                key={feature.id}
                animation={flipAnimation}
                delay={index * 100}
                duration={800}
              >
                <div
                  className={`
                    feature-card
                    relative
                    w-full
                    max-w-[407px]
                    flex flex-col items-center justify-center
                    transition-transform duration-300
                    ${isMiddleCard ? "lg:-translate-y-12" : ""}
                    ${isSideCard ? "lg:translate-y-12" : ""}
                  `}
                >
                  {/* Icon Container - أصغر قليلاً */}
                  <div className="mb-4 sm:mb-6 flex justify-center items-center relative">
                    {feature.icon}
                  </div>

                  {/* Content - أصغر قليلاً */}
                  <div className="flex-1 flex flex-col items-center justify-center text-center space-y-2">
                    <h3
                      className="text-[20px] sm:text-[22px] md:text-[24px] font-bold text-gray-800 leading-[26px]"
                      style={fontStyle}
                      dir="auto"
                    >
                      {feature.title}
                    </h3>
                    <p
                      className="text-[16px] sm:text-[18px] md:text-[20px] text-[#727272] font-medium leading-[26px] sm:leading-[28px] max-w-[319px]"
                      style={fontStyle}
                      dir="auto"
                    >
                      {feature.description}
                    </p>
                  </div>
                </div>
              </AOSWrapper>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
