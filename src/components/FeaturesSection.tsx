"use client";

import type { FeatureItem } from "@/types";
import { localFeatures } from "@/src/content/features";
import { useEffect, useRef, useState } from "react";

type FeaturesSectionProps = {
  features?: FeatureItem[];
};

const FeaturesSection = ({ features }: FeaturesSectionProps) => {
  const featuresToShow = features || localFeatures;
  const [visibleCards, setVisibleCards] = useState<Set<string>>(new Set());
  const sectionRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Set mounted to true to show cards immediately
    setMounted(true);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const cardId = entry.target.getAttribute("data-card-id");
            if (cardId) {
              setVisibleCards((prev) => new Set(prev).add(cardId));
            }
          }
        });
      },
      { threshold: 0.05, rootMargin: "100px" }
    );

    const cards = sectionRef.current?.querySelectorAll("[data-card-id]");
    cards?.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-6 sm:py-8 md:py-10" ref={sectionRef}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title and Description - refined and softer */}
        <div className="text-right mb-8 sm:mb-10">
          <h2
            className="text-[26px] sm:text-[28px] md:text-[30px] font-bold text-black mb-3 leading-[36px]"
            style={{
              fontFamily: "var(--font-almarai)",
            }}
          >
            لماذا تختارنا ؟
          </h2>
          <p
            className="text-[20px] sm:text-[22px] md:text-[25px] text-[#727272] font-normal leading-[28px]"
            style={{
              fontFamily: "var(--font-almarai)",
            }}
          >
            لأننا نهتم بكل تفصيلة بتجربتك مع الورد
          </p>
        </div>

        {/* Cards Grid - matching Figma: 3 cards in a row on desktop */}
        <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 justify-items-center">
          {featuresToShow.map((feature: FeatureItem, index: number) => {
            const isVisible = mounted || visibleCards.has(String(feature.id));
            return (
              <div
                key={feature.id}
                data-card-id={String(feature.id)}
                className={`
                  feature-card
                  bg-white
                  border border-[#d2cccc] border-solid
                  rounded-[20px] 
                  p-5 sm:p-6
                  shadow-[0px_2px_8px_0px_rgba(0,0,0,0.1)]
                  hover:shadow-[0px_4px_12px_0px_rgba(0,0,0,0.15)]
                  relative
                  overflow-hidden
                  group
                  transition-all duration-300
                  h-[300px]
                  w-full
                  max-w-[407px]
                  flex flex-col items-center justify-center
                  ${isVisible ? "animate-fadeInUp" : "opacity-0"}
                `}
                style={{
                  animationDelay: `${index * 150}ms`,
                }}
              >
                {/* Icon Container - with beautiful effects */}
                <div className="mb-4 flex justify-center items-center relative">
                  <div className="feature-icon-wrapper relative z-10">
                    <div className="feature-icon-bg absolute inset-0 rounded-full bg-gradient-to-br from-[#f5f3e8] via-[#f0ede0] to-[#ebe8d8] opacity-0 group-hover:opacity-100 blur-xl scale-150 transition-all duration-500"></div>
                    <div className="feature-icon-inner relative bg-gradient-to-br from-[#faf9f5] to-[#f5f3e8] rounded-full p-4 sm:p-5 shadow-[0px_4px_12px_rgba(0,0,0,0.08)] group-hover:shadow-[0px_8px_24px_rgba(90,94,77,0.15)] transition-all duration-300 group-hover:scale-110">
                      <div className="flex items-center justify-center opacity-90 group-hover:opacity-100 transition-opacity duration-300">
                        {feature.icon}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Content - refined and softer */}
                <div className="flex-1 flex flex-col items-center justify-center text-center space-y-2">
                  <h3
                    className="text-[22px] sm:text-[24px] md:text-[26px] font-bold text-black leading-[28px]"
                    style={{
                      fontFamily: "var(--font-almarai)",
                    }}
                  >
                    {feature.title}
                  </h3>
                  <p
                    className="text-[16px] sm:text-[17px] md:text-[18px] text-[#727272] font-normal leading-[26px] max-w-[319px]"
                    style={{ fontFamily: "var(--font-almarai)" }}
                  >
                    {feature.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
