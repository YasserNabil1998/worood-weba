"use client";

import type { OccasionItem } from "../types";
import Link from "next/link";
import Image from "next/image";
import { useMemo } from "react";

// Extended type for occasions with href
type OccasionWithHref = OccasionItem & {
    href?: string;
};

type OccasionsSectionProps = {
    occasions?: OccasionWithHref[];
    isLoading?: boolean;
    title?: string;
    description?: string;
};

const defaultOccasions: OccasionWithHref[] = [
    {
        id: 1,
        title: "مولود جديد",
        image: "/images/occasions/DIV-74.png",
        icon: "/icons/occasionsSection/I-79.svg",
        href: "/occasions/newborn",
    },
    {
        id: 2,
        title: "نجاح",
        image: "/images/occasions/DIV-64.png",
        icon: "/icons/occasionsSection/Icon-70.svg",
        href: "/occasions/graduation",
    },
    {
        id: 3,
        title: "خطوبة",
        image: "/images/occasions/DIV-56.png",
        icon: "/icons/occasionsSection/Icon-52.svg",
        href: "/occasions/engagement",
    },
    {
        id: 4,
        title: "زواج",
        image: "/images/occasions/DIV-46.png",
        icon: "/icons/occasionsSection/Icon-52.svg",
        href: "/occasions/wedding",
    },
];

const OccasionsSection = ({
    occasions = defaultOccasions,
    isLoading = false,
    title = "المناسبات",
    description = "اختر من تشكيلتنا المميزة حسب المناسبة",
}: OccasionsSectionProps) => {
    // Memoize occasions to prevent unnecessary re-renders
    const memoizedOccasions = useMemo(() => occasions, [occasions]);

    return (
        <section className="py-8 sm:py-10 md:py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-right mb-6 sm:mb-8">
                    <h2
                        className="text-[20px] sm:text-[22px] md:text-[24px] font-bold text-gray-800 mb-2 leading-[28px] sm:leading-[30px] md:leading-[32px] tracking-[0px]"
                        style={{ fontFamily: "var(--font-almarai)" }}
                    >
                        {title}
                    </h2>
                    <p
                        className="text-[14px] sm:text-[15px] md:text-[16px] font-normal text-gray-600 leading-[20px] sm:leading-[22px] md:leading-[24px] tracking-[0px]"
                        style={{ fontFamily: "var(--font-almarai)" }}
                    >
                        {description}
                    </p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
                    {isLoading && (
                        <div
                            className="col-span-full text-center text-gray-600"
                            style={{ fontFamily: "var(--font-almarai)" }}
                        >
                            جاري التحميل...
                        </div>
                    )}
                    {memoizedOccasions.map((occasion) => (
                        <Link
                            key={occasion.id}
                            href={
                                occasion.href ||
                                `/occasions/${occasion.title
                                    .toLowerCase()
                                    .replace(/\s+/g, "-")}`
                            }
                            className="group cursor-pointer"
                        >
                            <div className="relative overflow-hidden rounded-xl sm:rounded-2xl shadow-md hover:shadow-xl transition-all duration-300">
                                <div className="relative w-full aspect-[4/5]">
                                    <Image
                                        src={occasion.image}
                                        alt={occasion.title}
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                                        sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
                                        quality={85}
                                        loading="lazy"
                                    />
                                </div>
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

                                {/* النص والأيقونة */}
                                <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 text-center">
                                    {/* الأيقونة */}
                                    {occasion.icon && (
                                        <div className="flex justify-center mb-1 sm:mb-2">
                                            <Image
                                                src={occasion.icon}
                                                alt={`${occasion.title} icon`}
                                                width={32}
                                                height={32}
                                                className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 filter brightness-0 invert opacity-90"
                                                loading="lazy"
                                            />
                                        </div>
                                    )}

                                    {/* النص */}
                                    <h3
                                        className="text-sm sm:text-base md:text-lg font-semibold text-white"
                                        style={{
                                            fontFamily: "var(--font-almarai)",
                                        }}
                                    >
                                        {occasion.title}
                                    </h3>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default OccasionsSection;
