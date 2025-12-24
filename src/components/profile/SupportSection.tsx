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

  return (
    <div 
      className="bg-white rounded-[25px] p-6 mb-4 cursor-pointer" 
      onClick={() => setIsExpanded(!isExpanded)}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <HelpCircle className="w-[36px] h-[36px] text-[#5f664f]" />
          <h2 className="text-[20px] font-bold text-black">
            {title}
          </h2>
        </div>
        <div className="flex items-center justify-center">
          {isExpanded ? (
            <ChevronUp className="w-[32px] h-[32px] text-[#585858]" />
          ) : (
            <div className="rotate-[180deg]">
              <ChevronUp className="w-[32px] h-[32px] text-[#585858]" />
            </div>
          )}
        </div>
      </div>

      {/* FAQ Content */}
      {isExpanded && (
        <div className="space-y-6" onClick={(e) => e.stopPropagation()}>
          {faqs.map((faq, index) => (
            <div key={index} className="border-b border-gray-200 pb-4 last:border-b-0">
              <h3 className="text-[18px] font-bold text-black mb-3">
                {index + 1}. {faq.question}
              </h3>
              {faq.answer.length > 0 && (
                <ul className="list-disc list-inside space-y-2 mr-6">
                  {faq.answer.map((item, itemIndex) => (
                    <li
                      key={itemIndex}
                      className="text-[16px] text-black leading-[28px]"
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

