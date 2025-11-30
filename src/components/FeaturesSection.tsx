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
    <section
      className="py-6 sm:py-8 md:py-10 relative"
      ref={sectionRef}
      style={{ backgroundColor: "#fbfaf2" }}
    >
      <div className="w-full flex justify-center px-4 sm:px-6">
        <div className="w-[95%] max-w-[1440px] relative">
          {/* Title and Description - original sizes */}
          <div className="text-right mb-8 sm:mb-10">
            <h2
              className="text-[26px] sm:text-[28px] md:text-[30px] font-bold text-black mb-3 leading-[36px]"
              style={{
                fontFamily: "var(--font-almarai)",
              }}
              dir="auto"
            >
              لماذا تختارنا ؟
            </h2>
            <p
              className="text-[20px] sm:text-[22px] md:text-[25px] text-[#727272] font-normal leading-[28px]"
              style={{
                fontFamily: "var(--font-almarai)",
              }}
              dir="auto"
            >
              لأننا نهتم بكل تفصيلة بتجربتك مع الورد
            </p>
          </div>

          {/* Cards Grid - flat design matching the image: no borders, no shadows, same background */}
          <div className="grid gap-2 sm:gap-3 md:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 justify-items-center items-start">
            {featuresToShow.map((feature: FeatureItem, index: number) => {
              const isVisible = mounted || visibleCards.has(String(feature.id));
              // Middle card (index 1) should be higher up, side cards should be lower
              const isMiddleCard = index === 1;
              const isSideCard = index === 0 || index === 2;
              return (
                <div
                  key={feature.id}
                  data-card-id={String(feature.id)}
                  className={`
                  feature-card
                  relative
                  w-full
                  max-w-[407px]
                  flex flex-col items-center justify-center
                  ${isVisible ? "animate-fadeInUp" : "opacity-0"}
                  transition-transform duration-300
                  ${isMiddleCard ? "lg:-translate-y-12" : ""}
                  ${isSideCard ? "lg:translate-y-12" : ""}
                `}
                  style={{
                    animationDelay: `${index * 150}ms`,
                  }}
                >
                  {/* Icon Container - simple, no background circles */}
                  <div className="mb-6 sm:mb-8 flex justify-center items-center relative">
                    {feature.icon}
                  </div>

                  {/* Content - original sizes */}
                  <div className="flex-1 flex flex-col items-center justify-center text-center space-y-2">
                    <h3
                      className="text-[22px] sm:text-[24px] md:text-[26px] font-bold text-gray-800 leading-[28px]"
                      style={{
                        fontFamily: "var(--font-almarai)",
                      }}
                      dir="auto"
                    >
                      {feature.title}
                    </h3>
                    <p
                      className="text-[18px] sm:text-[20px] md:text-[22px] text-[#727272] font-medium leading-[28px] sm:leading-[30px] max-w-[319px]"
                      style={{ fontFamily: "var(--font-almarai)" }}
                      dir="auto"
                    >
                      {feature.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
