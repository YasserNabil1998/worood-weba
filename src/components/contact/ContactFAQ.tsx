"use client";

import { useState } from "react";
import { Plus, Minus, HelpCircle } from "lucide-react";
import { ContactFAQProps } from "@/src/@types/contact/index.type";
import { generateId } from "@/src/lib/utils";

export default function ContactFAQ({ data }: ContactFAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const scrollToForm = () => {
    const formSection = document.getElementById('contact-form-section');
    if (formSection) {
      const offset = 100; // المسافة من أعلى الصفحة
      const elementPosition = formSection.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#5A5E4D]/10 mb-3">
            <HelpCircle className="w-6 h-6 text-[#5A5E4D]" />
          </div>
          <h3 className="text-2xl md:text-3xl font-bold text-[#2D3319] mb-2">
            {data.title}
          </h3>
          <p className="text-gray-600 text-base">
            إجابات سريعة على استفساراتك
          </p>
        </div>

        {/* FAQ Items */}
        <div className="space-y-2.5">
          {data.items.map((item, index) => {
            const isOpen = openIndex === index;
            const faqId = generateId();

            return (
              <div
                key={faqId}
                className="group bg-white rounded-xl border border-gray-200 overflow-hidden transition-all duration-300 hover:border-[#5A5E4D]/30 hover:shadow-md"
            >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-5 py-4 flex items-center justify-between text-right transition-all duration-300"
                  aria-expanded={isOpen}
                >
                  <span className="text-sm md:text-base font-semibold text-[#2D3319] flex-1 ml-3">
                    {item.question}
                  </span>
                  
                  <div
                    className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                      isOpen
                        ? "bg-[#5A5E4D] rotate-180"
                        : "bg-gray-100 group-hover:bg-[#5A5E4D]/10"
                    }`}
                  >
                    {isOpen ? (
                      <Minus className="w-4 h-4 text-white" />
                    ) : (
                      <Plus className="w-4 h-4 text-[#5A5E4D]" />
                    )}
                  </div>
                </button>

                <div
                  className={`transition-all duration-300 ease-in-out ${
                    isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="px-5 pb-4 pt-1">
                    <div className="pr-3 border-r-2 border-[#5A5E4D]/20">
                      <p className="text-gray-700 text-sm md:text-base leading-relaxed">
                {item.answer}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Contact CTA */}
        <button
          onClick={scrollToForm}
          className="mt-8 w-full text-center p-4 bg-white/60 backdrop-blur-sm rounded-xl border border-[#5A5E4D]/10 hover:bg-white hover:border-[#5A5E4D]/30 hover:shadow-lg transition-all duration-300 cursor-pointer group"
        >
          <p className="text-gray-700 text-sm mb-2">
            لم تجد إجابة لسؤالك؟
          </p>
          <p className="text-[#5A5E4D] font-semibold text-sm group-hover:text-[#4A4E3D] transition-colors duration-300">
            تواصل معنا مباشرة وسنكون سعداء بمساعدتك ↑
          </p>
        </button>
      </div>
    </section>
  );
}
