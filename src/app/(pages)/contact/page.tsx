"use client";

import { Suspense, lazy } from "react";
import Script from "next/script";
import contactData from "./contact-data.json";
import type { ContactData, ContactFormData } from "@/types/contact";
import AOSWrapper from "@/components/common/AOSWrapper";
import { generateFAQSchema, generateBreadcrumbSchema } from "@/lib/structuredData";
import { TIMEOUTS } from "@/constants";

const ContactForm = lazy(() => import("@/components/contact/ContactForm"));
const ContactInfo = lazy(() => import("@/components/contact/ContactInfo"));
const ContactFAQ = lazy(() => import("@/components/contact/ContactFAQ"));

export default function ContactPage() {
  const typedContactData = contactData as ContactData;

  const handleFormSubmit = async (_formData: ContactFormData) => {
    // Simulate API call - In production, replace with actual API endpoint
    // Example: await fetch('/api/contact', { method: 'POST', body: JSON.stringify(formData) });
    await new Promise((resolve) => setTimeout(resolve, TIMEOUTS.API_SIMULATION));
  };

  // Generate FAQ Schema for SEO
  const faqSchema = typedContactData.faq?.items
    ? generateFAQSchema(
        typedContactData.faq.items.map((item) => ({
          question: item.question,
          answer: item.answer,
        }))
      )
    : null;

  // Generate Breadcrumb Schema
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "الرئيسية", url: "https://shamsflowers.com/" },
    { name: "تواصل معنا", url: "https://shamsflowers.com/contact" },
  ]);

  return (
    <div className="min-h-screen bg-background" dir="rtl">
      {/* Structured Data for SEO */}
      {faqSchema && (
        <Script
          id="faq-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
      {breadcrumbSchema && (
        <Script
          id="breadcrumb-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        />
      )}
      <main>
        {/* Page Title Section */}
        <AOSWrapper animation="fade-up" delay={100} duration={800}>
          <section className="pt-8 pb-4">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-right">
              <h1 className="text-[32px] font-bold leading-[40px] text-[#2D3319] mb-2 tracking-[0px]">
                تواصل معنا
              </h1>
              <p className="text-[16px] font-normal leading-[20px] text-[#5A5E4D] tracking-[0px]">
                نحن هنا للإجابة على جميع استفساراتك ومساعدتك في اختيار أجمل الباقات
              </p>
            </div>
          </section>
        </AOSWrapper>

        <AOSWrapper animation="fade-up" delay={150} duration={800}>
          <section className="py-8 sm:py-12 lg:py-10 bg-background" id="contact-form-section">
            <div className="max-w-[1364px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
              <div className="flex flex-col lg:flex-row-reverse gap-4 sm:gap-6 lg:gap-8">
                {/* نموذج التواصل - سيظهر على اليمين في الديسكتوب */}
                <AOSWrapper animation="fade-right" delay={200} duration={800}>
                  <div className="w-full lg:w-[964px] lg:shrink-0">
                    <Suspense
                      fallback={
                        <div className="bg-white rounded-[20px] p-8 animate-pulse h-[400px]" />
                      }
                    >
                      <ContactForm data={typedContactData.form} onSubmit={handleFormSubmit} />
                    </Suspense>
                  </div>
                </AOSWrapper>
                {/* معلومات التواصل - سيظهر على اليسار في الديسكتوب */}
                <AOSWrapper animation="fade-left" delay={250} duration={800}>
                  <div className="w-full lg:w-[311px] lg:shrink-0">
                    <Suspense
                      fallback={
                        <div className="bg-white rounded-[20px] p-6 animate-pulse h-[300px]" />
                      }
                    >
                      <ContactInfo
                        data={typedContactData.contactInfo}
                        socialMedia={typedContactData.socialMedia}
                      />
                    </Suspense>
                  </div>
                </AOSWrapper>
              </div>
            </div>
          </section>
        </AOSWrapper>

        {/* FAQ Section */}
        <AOSWrapper animation="fade-up" delay={100} duration={800}>
          <Suspense fallback={<div className="bg-background py-8 animate-pulse h-[200px]" />}>
            <ContactFAQ data={typedContactData.faq} />
          </Suspense>
        </AOSWrapper>
      </main>
    </div>
  );
}
