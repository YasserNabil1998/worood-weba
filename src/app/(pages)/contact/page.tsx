"use client";

import { useState } from "react";
import contactData from "./contact-data.json";
import ContactHero from "../../../components/contact/ContactHero";
import ContactForm from "../../../components/contact/ContactForm";
import ContactInfo from "../../../components/contact/ContactInfo";
import SocialMediaLinks from "../../../components/contact/SocialMediaLinks";
import ContactFAQ from "../../../components/contact/ContactFAQ";
import {
  ContactData,
  ContactFormData,
} from "../../../@types/contact/index.type";

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Type assertion for JSON data
  const typedContactData = contactData as ContactData;

  const handleFormSubmit = async (formData: ContactFormData) => {
    setIsSubmitting(true);

    // Simulate API call - TODO: replace with real API
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen" dir="rtl">
      <main>
        {/* Hero Section */}
        <ContactHero data={typedContactData.hero} />

        {/* Content Section */}
        <section className="py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Form */}
            <ContactForm
              data={typedContactData.form}
              onSubmit={handleFormSubmit}
            />

            {/* Contact Info */}
            <div className="order-2 lg:order-2">
              <ContactInfo data={typedContactData.contactInfo} />
              <SocialMediaLinks data={typedContactData.socialMedia} />
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <ContactFAQ data={typedContactData.faq} />
      </main>
    </div>
  );
}
