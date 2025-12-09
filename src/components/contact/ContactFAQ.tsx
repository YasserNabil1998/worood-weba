"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { ContactFAQProps } from "@/@types/contact/index.type";
import { generateId } from "@/lib/utils";
import { cn } from "@/lib/utils";
import { fontStyle } from "@/lib/styles";

export default function ContactFAQ({ data }: ContactFAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(1); // فتح السؤال الثاني افتراضياً كما في التصميم

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-8 sm:py-12 lg:py-16 bg-background">
      <div className="max-w-[1364px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
        {/* Header */}
        <div className="text-right mb-8 sm:mb-10 lg:mb-12">
          <h3
            className="text-[18px] sm:text-[19px] lg:text-[20px] font-bold text-black mb-2 sm:mb-3"
            style={fontStyle}
          >
            {data.title}
          </h3>
          {data.subtitle && (
            <p
              className="text-[15px] sm:text-[16px] lg:text-[17px] text-[#727272]"
              style={fontStyle}
            >
              {data.subtitle}
            </p>
          )}
        </div>

        {/* FAQ Items */}
        <div className="space-y-0">
          {data.items.map((item, index) => {
            const isOpen = openIndex === index;
            const faqId = generateId();

            return (
              <div
                key={faqId}
                className={cn(
                  "bg-white border border-[#cdcdcd] rounded-[10px] overflow-hidden transition-all duration-300 mb-3.5",
                  index < data.items.length - 1 && "mb-0"
                )}
              >
                {/* Header Button */}
                <button
                  onClick={() => toggleFAQ(index)}
                  className={cn(
                    "w-full px-4 sm:px-6 lg:px-8 h-[56px] sm:h-[60px] lg:h-[64px] flex items-center justify-between text-right transition-all duration-300",
                    isOpen ? "bg-gray-50 rounded-t-[10px]" : "bg-white"
                  )}
                  aria-expanded={isOpen}
                >
                  <span
                    className="text-[15px] sm:text-[16px] lg:text-[17px] font-normal text-black flex-1 ml-2 sm:ml-3 lg:ml-4"
                    style={fontStyle}
                  >
                    {item.question}
                  </span>

                  <div className="shrink-0 w-[24px] h-[24px] sm:w-[26px] sm:h-[26px] lg:w-[28px] lg:h-[28px] flex items-center justify-center">
                    {isOpen ? (
                      <ChevronUp className="w-full h-full text-[#585858]" />
                    ) : (
                      <ChevronDown className="w-full h-full text-[#585858]" />
                    )}
                  </div>
                </button>

                {/* Answer Content */}
                <div
                  className={cn(
                    "transition-all duration-300 ease-in-out overflow-hidden bg-white",
                    isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                  )}
                >
                  <div className="px-4 sm:px-6 lg:px-8 pb-3 sm:pb-4 pt-2">
                    <p
                      className="text-[15px] sm:text-[16px] lg:text-[17px] text-[#5c5a57] leading-relaxed"
                      style={fontStyle}
                    >
                      {item.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
