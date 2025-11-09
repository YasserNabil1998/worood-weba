"use client";

import { ChevronDown } from "lucide-react";
import { ContactFAQProps } from "@/src/@types/contact/index.type";
import { generateId } from "@/src/lib/utils";

export default function ContactFAQ({ data }: ContactFAQProps) {
  return (
    <section className="py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-right mb-8">
          <h3
            className="text-2xl font-extrabold text-gray-900 mb-2"
            style={{ fontFamily: "var(--font-almarai)" }}
          >
            {data.title}
          </h3>
          <p className="text-gray-600 text-base">إجابات على الأسئلة الأكثر شيوعاً</p>
        </div>

        <div className="space-y-4">
          {data.items.map((item) => (
            <details
              key={generateId()}
              className="group bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden"
            >
              <summary className="cursor-pointer list-none px-5 h-14 flex items-center justify-between text-[15px] text-gray-900 font-medium transition-colors duration-200 group-open:bg-gray-50">
                <span className="truncate">{item.question}</span>
                <ChevronDown
                  size={18}
                  className="text-gray-500 transition-transform duration-200 group-open:rotate-180"
                />
              </summary>
              <div className="px-5 pb-5 pt-2 text-sm md:text-base leading-7 text-gray-600">
                {item.answer}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
