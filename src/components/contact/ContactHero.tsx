"use client";

import Image from "next/image";
import { ContactHeroProps } from "@/src/@types/contact/index.type";
import { renderMultilineText } from "@/src/lib/textUtils";
import { HERO_HEIGHT } from "@/src/constants/contact";

export default function ContactHero({ data }: ContactHeroProps) {
  return (
    <section className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className="relative rounded-xl overflow-hidden"
          style={{ height: `${HERO_HEIGHT}px` }}
        >
          <Image
            src={data.image}
            alt={data.title}
            fill
            className="object-cover object-center"
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
            style={{
              transform: "scale(1.02)",
              filter: "brightness(1.1) contrast(1.05) saturate(1.1)",
            }}
          />

          {/* Blur effect from right - could be optimized */}
          <div
            className="absolute inset-0 backdrop-blur-[0.5px]"
            style={{
              maskImage:
                "linear-gradient(to left, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.3) 30%, rgba(0,0,0,0.1) 60%, rgba(0,0,0,0) 80%)",
              WebkitMaskImage:
                "linear-gradient(to left, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.3) 30%, rgba(0,0,0,0.1) 60%, rgba(0,0,0,0) 80%)",
            }}
          />

          {/* Overlay للتباين */}
          <div
            className="absolute inset-0"
            style={{
              backgroundColor: "#5A5E4D",
              opacity: 0.08,
            }}
          />

          <div className="absolute inset-0 bg-gradient-to-l from-black/30 via-black/10 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/10" />

          {/* Content */}
          <div className="relative z-10 h-full flex items-center">
            <div className="w-full px-6 md:px-10 text-right">
              <div className="ml-auto max-w-xl">
                <h1
                  className="text-3xl md:text-4xl font-extrabold text-white mb-3 drop-shadow-xl"
                  style={{
                    fontFamily: "var(--font-almarai)",
                    textShadow:
                      "0 3px 6px rgba(0,0,0,0.4), 0 1px 2px rgba(0,0,0,0.2)",
                  }}
                >
                  {data.title}
                </h1>
                <p
                  className="text-white/98 text-base md:text-lg leading-relaxed drop-shadow-lg"
                  style={{
                    textShadow: "0 2px 4px rgba(0,0,0,0.3)",
                  }}
                >
                  {renderMultilineText(data.description)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
