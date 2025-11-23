"use client";

import { useState } from "react";
import contactData from "./contact-data.json";
import ContactForm from "@/src/components/contact/ContactForm";
import ContactInfo from "@/src/components/contact/ContactInfo";
import ContactFAQ from "@/src/components/contact/ContactFAQ";
import { ContactData, ContactFormData } from "@/src/@types/contact/index.type";

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Type assertion for JSON data
  const typedContactData = contactData as ContactData;

  const handleFormSubmit = async (formData: ContactFormData) => {
    setIsSubmitting(true);

    // Simulate API call - In production, replace with actual API endpoint
    // Example: await fetch('/api/contact', { method: 'POST', body: JSON.stringify(formData) });
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-[#fbfaf2]" dir="rtl">
      <main>
        {/* Page Title Section */}
        <section className="pt-8 pb-4">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-right">
            <h1 className="text-[20px] font-bold leading-[24px] text-[#2D3319] mb-2 tracking-[0px]">
              تواصل معنا
            </h1>
            <p className="text-[16px] font-normal leading-[20px] text-[#5A5E4D] tracking-[0px]">
              نحن هنا للإجابة على جميع استفساراتك ومساعدتك في اختيار أجمل الباقات
            </p>
          </div>
        </section>

        <section className="py-8 sm:py-12 lg:py-10 bg-[#fbfaf2]" id="contact-form-section">
          <div className="max-w-[1364px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
            <div className="flex flex-col lg:flex-row-reverse gap-4 sm:gap-6 lg:gap-8">
              {/* نموذج التواصل - سيظهر على اليمين في الديسكتوب */}
              <div className="w-full lg:w-[964px] lg:shrink-0">
                <ContactForm data={typedContactData.form} onSubmit={handleFormSubmit} />
              </div>
              {/* معلومات التواصل - سيظهر على اليسار في الديسكتوب */}
              <div className="w-full lg:w-[311px] lg:shrink-0">
                <ContactInfo
                  data={typedContactData.contactInfo}
                  socialMedia={typedContactData.socialMedia}
                />
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <ContactFAQ data={typedContactData.faq} />
      </main>
    </div>
  );
}
