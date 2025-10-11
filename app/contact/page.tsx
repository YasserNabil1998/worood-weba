"use client";

import { useState } from "react";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import contactData from "./contact-data.json";
import {
    MapPin,
    Phone,
    Mail,
    Clock,
    Instagram,
    Twitter,
    Facebook,
    MessageCircle,
    ChevronDown,
} from "lucide-react";

export default function ContactPage() {
    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        subject: contactData.form.fields.subject.options[0],
        message: "",
    });
    const [sent, setSent] = useState(false);

    const onChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >
    ) => {
        const { name, value } = e.target;
        setForm((p) => ({ ...p, [name]: value }));
    };

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSent(true);
        setTimeout(() => setSent(false), 2000);
    };

    return (
        <div className="min-h-screen" dir="rtl">
            <Header />
            <main>
                {/* Hero */}
                <section className="py-6">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="relative h-[400px] rounded-xl overflow-hidden">
                            <Image
                                src={contactData.hero.image}
                                alt={contactData.hero.title}
                                fill
                                className="object-cover object-center"
                                priority
                                quality={90}
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                                style={{
                                    transform: "scale(1.02)",
                                    filter: "brightness(1.1) contrast(1.05) saturate(1.1)",
                                }}
                            />
                            {/* Blur تدريجي من اليمين */}
                            <div
                                className="absolute inset-0 backdrop-blur-[0.5px]"
                                style={{
                                    maskImage:
                                        "linear-gradient(to left, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.3) 30%, rgba(0,0,0,0.1) 60%, rgba(0,0,0,0) 80%)",
                                    WebkitMaskImage:
                                        "linear-gradient(to left, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.3) 30%, rgba(0,0,0,0.1) 60%, rgba(0,0,0,0) 80%)",
                                }}
                            ></div>
                            <div
                                className="absolute inset-0"
                                style={{
                                    backgroundColor: "#5A5E4D",
                                    opacity: 0.08,
                                }}
                            ></div>
                            <div className="absolute inset-0 bg-gradient-to-l from-black/30 via-black/10 to-transparent"></div>
                            {/* تحسين إضافي للتباين */}
                            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/10"></div>
                            <div className="relative z-10 h-full flex items-center">
                                <div className="w-full px-6 md:px-10 text-right">
                                    <div className="ml-auto max-w-xl">
                                        <h1
                                            className="text-3xl md:text-4xl font-extrabold text-white mb-3 drop-shadow-xl"
                                            style={{
                                                fontFamily:
                                                    "var(--font-almarai)",
                                                textShadow:
                                                    "0 3px 6px rgba(0,0,0,0.4), 0 1px 2px rgba(0,0,0,0.2)",
                                            }}
                                        >
                                            {contactData.hero.title}
                                        </h1>
                                        <p
                                            className="text-white/98 text-base md:text-lg leading-relaxed drop-shadow-lg"
                                            style={{
                                                textShadow:
                                                    "0 2px 4px rgba(0,0,0,0.3)",
                                            }}
                                        >
                                            {contactData.hero.description
                                                .split("\n")
                                                .map((line, index) => (
                                                    <span key={index}>
                                                        {line}
                                                        {index <
                                                            contactData.hero.description.split(
                                                                "\n"
                                                            ).length -
                                                                1 && <br />}
                                                    </span>
                                                ))}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Content */}
                <section className="py-8">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Form */}
                        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-200 shadow-sm p-6 order-1 lg:order-1">
                            <h3
                                className="text-xl font-bold text-gray-900 mb-6"
                                style={{ fontFamily: "var(--font-almarai)" }}
                            >
                                {contactData.form.title}
                            </h3>
                            <form
                                onSubmit={onSubmit}
                                className="grid grid-cols-1 md:grid-cols-2 gap-4"
                            >
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        {contactData.form.fields.name.label}
                                    </label>
                                    <input
                                        name="name"
                                        value={form.name}
                                        onChange={onChange}
                                        placeholder="أدخل اسمك الكامل"
                                        className="w-full h-12 rounded-lg border border-gray-300 px-4 text-right focus:outline-none focus:ring-2 focus:ring-[#5A5E4D]/30 focus:border-[#5A5E4D] transition-colors"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        {contactData.form.fields.email.label}
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={form.email}
                                        onChange={onChange}
                                        placeholder="أدخل بريدك الإلكتروني"
                                        className="w-full h-12 rounded-lg border border-gray-300 px-4 text-right focus:outline-none focus:ring-2 focus:ring-[#5A5E4D]/30 focus:border-[#5A5E4D] transition-colors"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        {contactData.form.fields.phone.label}
                                    </label>
                                    <input
                                        name="phone"
                                        value={form.phone}
                                        onChange={onChange}
                                        placeholder="أدخل رقم هاتفك"
                                        className="w-full h-12 rounded-lg border border-gray-300 px-4 text-right focus:outline-none focus:ring-2 focus:ring-[#5A5E4D]/30 focus:border-[#5A5E4D] transition-colors"
                                    />
                                </div>
                                <div className="min-w-0">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        {contactData.form.fields.subject.label}
                                    </label>
                                    <div className="relative">
                                        <select
                                            name="subject"
                                            value={form.subject}
                                            onChange={onChange}
                                            className="w-full h-12 rounded-lg border border-gray-300 pl-4 pr-10 text-right appearance-none bg-white focus:outline-none focus:ring-2 focus:ring-[#5A5E4D]/30 focus:border-[#5A5E4D] transition-colors text-sm md:text-base"
                                            style={{
                                                direction: "rtl",
                                                maxWidth: "100%",
                                            }}
                                        >
                                            {contactData.form.fields.subject.options.map(
                                                (option, index) => (
                                                    <option
                                                        key={index}
                                                        value={option}
                                                        style={{
                                                            direction: "rtl",
                                                        }}
                                                    >
                                                        {option}
                                                    </option>
                                                )
                                            )}
                                        </select>
                                        <ChevronDown
                                            size={18}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"
                                        />
                                    </div>
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        {contactData.form.fields.message.label}
                                    </label>
                                    <textarea
                                        name="message"
                                        value={form.message}
                                        onChange={onChange}
                                        rows={5}
                                        className="w-full rounded-lg border border-gray-300 px-4 py-3 text-right focus:outline-none focus:ring-2 focus:ring-[#5A5E4D]/30 focus:border-[#5A5E4D] transition-colors resize-none"
                                        placeholder={
                                            contactData.form.fields.message
                                                .placeholder
                                        }
                                    />
                                </div>
                                <div className="md:col-span-2">
                                    <button
                                        type="submit"
                                        className="w-full h-12 rounded-lg bg-[#5A5E4D] text-white font-semibold hover:bg-[#4A4E3D] transition-colors duration-200"
                                    >
                                        {sent
                                            ? contactData.form.submitButton
                                                  .sentText
                                            : contactData.form.submitButton
                                                  .text}
                                    </button>
                                </div>
                            </form>
                        </div>

                        {/* Contact Info */}
                        <aside className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 order-2 lg:order-2">
                            <h3
                                className="text-xl font-bold text-gray-900 mb-6"
                                style={{ fontFamily: "var(--font-almarai)" }}
                            >
                                {contactData.contactInfo.title}
                            </h3>
                            <ul className="space-y-4 text-sm">
                                <li className="flex items-start gap-3">
                                    <span className="mt-0.5 inline-flex h-8 w-8 items-center justify-center rounded-full bg-gray-200 text-gray-700">
                                        <MapPin size={16} />
                                    </span>
                                    <div>
                                        <div className="font-semibold text-gray-900 mb-1 text-sm">
                                            {
                                                contactData.contactInfo.address
                                                    .title
                                            }
                                        </div>
                                        <p className="text-gray-600 leading-5 text-sm">
                                            {contactData.contactInfo.address.content
                                                .split("\n")
                                                .map((line, index) => (
                                                    <span key={index}>
                                                        {line}
                                                        {index <
                                                            contactData.contactInfo.address.content.split(
                                                                "\n"
                                                            ).length -
                                                                1 && <br />}
                                                    </span>
                                                ))}
                                        </p>
                                    </div>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="mt-0.5 inline-flex h-8 w-8 items-center justify-center rounded-full bg-gray-200 text-gray-700">
                                        <Phone size={16} />
                                    </span>
                                    <div>
                                        <div className="font-semibold text-gray-900 mb-1 text-sm">
                                            {
                                                contactData.contactInfo.phone
                                                    .title
                                            }
                                        </div>
                                        <p className="text-gray-600 leading-5 text-sm">
                                            {contactData.contactInfo.phone.content
                                                .split("\n")
                                                .map((line, index) => (
                                                    <span key={index}>
                                                        {line}
                                                        {index <
                                                            contactData.contactInfo.phone.content.split(
                                                                "\n"
                                                            ).length -
                                                                1 && <br />}
                                                    </span>
                                                ))}
                                        </p>
                                    </div>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="mt-0.5 inline-flex h-8 w-8 items-center justify-center rounded-full bg-gray-200 text-gray-700">
                                        <Mail size={16} />
                                    </span>
                                    <div>
                                        <div className="font-semibold text-gray-900 mb-1 text-sm">
                                            {
                                                contactData.contactInfo.email
                                                    .title
                                            }
                                        </div>
                                        <p className="text-gray-600 leading-5 text-sm">
                                            {contactData.contactInfo.email.content
                                                .split("\n")
                                                .map((line, index) => (
                                                    <span key={index}>
                                                        {line}
                                                        {index <
                                                            contactData.contactInfo.email.content.split(
                                                                "\n"
                                                            ).length -
                                                                1 && <br />}
                                                    </span>
                                                ))}
                                        </p>
                                    </div>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="mt-0.5 inline-flex h-8 w-8 items-center justify-center rounded-full bg-gray-200 text-gray-700">
                                        <Clock size={16} />
                                    </span>
                                    <div>
                                        <div className="font-semibold text-gray-900 mb-1 text-sm">
                                            {
                                                contactData.contactInfo.hours
                                                    .title
                                            }
                                        </div>
                                        <p className="text-gray-600 leading-5 text-sm">
                                            {contactData.contactInfo.hours.content
                                                .split("\n")
                                                .map((line, index) => (
                                                    <span key={index}>
                                                        {line}
                                                        {index <
                                                            contactData.contactInfo.hours.content.split(
                                                                "\n"
                                                            ).length -
                                                                1 && <br />}
                                                    </span>
                                                ))}
                                        </p>
                                    </div>
                                </li>
                            </ul>

                            {/* Social Media Section */}
                            <div className="mt-8 pt-6 border-t border-gray-200">
                                <h4
                                    className="text-lg font-bold text-gray-900 mb-4"
                                    style={{
                                        fontFamily: "var(--font-almarai)",
                                    }}
                                >
                                    {contactData.socialMedia.title}
                                </h4>
                                <div className="flex items-center justify-between w-full">
                                    <a
                                        href="https://www.instagram.com/gulfflowers"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="h-10 w-10 rounded-full bg-gray-200 text-gray-700 flex items-center justify-center hover:bg-gray-300 hover:scale-105 transition-all duration-200 flex-1 mx-1"
                                        title="تابعنا على إنستغرام"
                                    >
                                        <Instagram size={20} />
                                    </a>
                                    <a
                                        href="https://twitter.com/gulfflowers"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="h-10 w-10 rounded-full bg-gray-200 text-gray-700 flex items-center justify-center hover:bg-gray-300 hover:scale-105 transition-all duration-200 flex-1 mx-1"
                                        title="تابعنا على تويتر"
                                    >
                                        <Twitter size={20} />
                                    </a>
                                    <a
                                        href="https://www.facebook.com/gulfflowers"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="h-10 w-10 rounded-full bg-gray-200 text-gray-700 flex items-center justify-center hover:bg-gray-300 hover:scale-105 transition-all duration-200 flex-1 mx-1"
                                        title="تابعنا على فيسبوك"
                                    >
                                        <Facebook size={20} />
                                    </a>
                                    <a
                                        href="https://wa.me/966123456789"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="h-10 w-10 rounded-full bg-gray-200 text-gray-700 flex items-center justify-center hover:bg-gray-300 hover:scale-105 transition-all duration-200 flex-1 mx-1"
                                        title="تواصل معنا على واتساب"
                                    >
                                        <MessageCircle size={20} />
                                    </a>
                                </div>
                            </div>
                        </aside>
                    </div>
                </section>

                {/* FAQ */}
                <section className="py-10">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-right mb-8">
                            <h3
                                className="text-2xl font-extrabold text-gray-900 mb-2"
                                style={{ fontFamily: "var(--font-almarai)" }}
                            >
                                {contactData.faq.title}
                            </h3>
                            <p className="text-gray-600 text-base">
                                إجابات على الأسئلة الأكثر شيوعاً
                            </p>
                        </div>
                        <div className="space-y-4">
                            {contactData.faq.items.map((item) => (
                                <details
                                    key={item.question}
                                    className="group bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden"
                                >
                                    <summary className="cursor-pointer list-none px-5 h-14 flex items-center justify-between text-[15px] text-gray-900 font-medium transition-colors duration-200 group-open:bg-gray-50">
                                        <span className="truncate">
                                            {item.question}
                                        </span>
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
            </main>
            <Footer />
        </div>
    );
}
