"use client";

import { Gift, Heart, Truck } from "lucide-react";
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

  const getIconBackground = (id: number | string) => {
    // Use the same color as the subscription button (#5A5E4D)
    return "bg-[#5A5E4D]";
  };

  const getCardGradient = (id: number | string) => {
    // Use consistent shadow matching the subscription button color
    return "hover:shadow-[#5A5E4D]/20";
  };

  return (
    <section className="py-1 md:py-2" ref={sectionRef}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {featuresToShow.map((feature: FeatureItem, index: number) => {
            const isVisible = mounted || visibleCards.has(String(feature.id));
            return (
              <div
                key={feature.id}
                data-card-id={String(feature.id)}
                className={`
                                    feature-card
                                    text-right 
                                    bg-gradient-to-br from-white to-gray-50/50
                                    rounded-2xl 
                                    p-4 sm:p-6
                                    shadow-lg shadow-gray-200/60
                                    hover:shadow-2xl ${getCardGradient(feature.id)}
                                    border border-gray-100/50
                                    backdrop-blur-sm
                                    relative
                                    overflow-hidden
                                    group
                                    h-56 sm:h-64
                                    flex flex-col
                                    ${isVisible ? "animate-fadeInUp" : "opacity-0"}
                                `}
                style={{
                  animationDelay: `${index * 150}ms`,
                }}
              >
                {/* Decorative gradient overlay */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gray-200 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Icon Container */}
                <div className="mb-4 md:mb-5">
                  <div className="w-full flex justify-start">
                    <div
                      className={`
                                                feature-icon-wrapper
                                                ${getIconBackground(feature.id)}
                                                p-4 md:p-5
                                                rounded-2xl
                                                shadow-lg
                                                flex items-center justify-center
                                                relative
                                                overflow-hidden
                                            `}
                    >
                      {/* Icon glow effect */}
                      <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300" />

                      <div className="text-white relative z-10">{feature.icon}</div>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="space-y-3 flex-1 flex flex-col justify-center">
                  <h3
                    dir="rtl"
                    className="text-lg md:text-xl font-bold text-gray-800 text-right group-hover:text-gray-900 transition-colors duration-300"
                    style={{
                      fontFamily: "var(--font-almarai)",
                    }}
                  >
                    {feature.title}
                  </h3>
                  <p
                    dir="rtl"
                    className="text-sm md:text-base text-gray-600 leading-relaxed text-right group-hover:text-gray-700 transition-colors duration-300"
                    style={{ fontFamily: "var(--font-almarai)" }}
                  >
                    {feature.description}
                  </p>
                </div>

                {/* Bottom decorative line */}
                <div className="absolute bottom-0 right-0 w-0 group-hover:w-full h-1 bg-gradient-to-l from-transparent via-gray-300 to-transparent transition-all duration-700" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
