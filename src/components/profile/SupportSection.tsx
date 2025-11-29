"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { HelpCircle } from "lucide-react";

interface FAQ {
  question: string;
  answer: string[];
}

interface SupportSectionProps {
  title: string;
  faqs: FAQ[];
}

export default function SupportSection({ title, faqs }: SupportSectionProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const fontStyle = { fontFamily: "var(--font-almarai)" };

  return (
    <div 
      className="bg-white rounded-[25px] p-8 mb-6 cursor-pointer" 
      style={fontStyle}
      onClick={() => setIsExpanded(!isExpanded)}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <HelpCircle className="w-[48px] h-[48px] text-[#5f664f]" />
          <h2 className="text-[30px] font-bold text-black" style={fontStyle}>
            {title}
          </h2>
        </div>
        <div className="flex items-center justify-center">
          {isExpanded ? (
            <ChevronUp className="w-[37px] h-[37px] text-[#585858]" />
          ) : (
            <div className="rotate-[180deg]">
              <ChevronUp className="w-[37px] h-[37px] text-[#585858]" />
            </div>
          )}
        </div>
      </div>

      {/* FAQ Content */}
      {isExpanded && (
        <div className="space-y-8" onClick={(e) => e.stopPropagation()}>
          {faqs.map((faq, index) => (
            <div key={index} className="border-b border-gray-200 pb-6 last:border-b-0">
              <h3 className="text-[25px] font-bold text-black mb-4" style={fontStyle}>
                {index + 1}. {faq.question}
              </h3>
              {faq.answer.length > 0 && (
                <ul className="list-disc list-inside space-y-2 mr-6">
                  {faq.answer.map((item, itemIndex) => (
                    <li
                      key={itemIndex}
                      className="text-[20px] text-black leading-[50px]"
                      style={fontStyle}
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

