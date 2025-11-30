"use client";

import Link from "next/link";
import Image from "next/image";
import { ROUTES } from "@/src/constants/routes";
import { ArrowLeft } from "lucide-react";

const OccasionsSection = () => {
  const occasions = [
    {
      id: 1,
      title: "مولود جديد",
      description: "باقات ناعمة ترحب بالحياة الجديدة",
      image: "/assets/home/occasions-img/newborn.png",
      href: ROUTES.BOUQUETS + "?occasion=newborn&openFilter=occasion",
    },
    {
      id: 2,
      title: "نجاح",
      description: "احتفل بإنجازك بأجمل الورود",
      image: "/assets/home/occasions-img/Success.png",
      href: ROUTES.BOUQUETS + "?occasion=graduation&openFilter=occasion",
    },
    {
      id: 3,
      title: "زواج",
      description: "ورود بألوان فخمة ولمسات ناعمة",
      image: "/assets/home/occasions-img/Wedding.png",
      href: ROUTES.BOUQUETS + "?occasion=wedding&openFilter=occasion",
    },
    {
      id: 4,
      title: "خطوبة",
      description: "باقتك المميزة بداية تعبر عن فرحتك",
      image: "/assets/home/occasions-img/Engagement.png",
      href: ROUTES.BOUQUETS + "?occasion=engagement&openFilter=occasion",
    },
  ];

  return (
    <section className="py-8 sm:py-10 md:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 sm:mb-8 gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-heading mb-2">
              المناسبات
            </h2>
            <p className="text-base sm:text-lg md:text-xl font-normal text-primary">
              كل لحظة تستحق باقة مميزة
            </p>
          </div>
          <Link
            href="/bouquets"
            className="text-primary hover:underline text-sm font-semibold cursor-pointer"
          >
            عرض الكل <ArrowLeft className="w-4 h-4 inline mr-1" />
          </Link>
        </div>

        {/* Grid of occasions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {occasions.map((occasion) => (
            <Link key={occasion.id} href={occasion.href} className="group cursor-pointer">
              <div className="bg-neutral-100 border border-border rounded-[20px] overflow-hidden hover:shadow-xl transition-all duration-300 h-[283px] flex flex-col">
                {/* Image container - circular */}
                <div className="flex justify-center items-center pt-6 pb-4">
                  <div className="relative w-[120px] h-[120px] rounded-full overflow-hidden border border-border-soft">
                    <Image
                      src={occasion.image}
                      alt={occasion.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                      sizes="120px"
                      loading="lazy"
                    />
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 flex flex-col items-center justify-start text-center px-4 pb-6">
                  <h3
                    className="text-lg sm:text-xl font-bold text-black mb-3"
                    style={{
                      fontFamily: "var(--font-almarai)",
                    }}
                  >
                    {occasion.title}
                  </h3>
                  <p
                    className="text-sm sm:text-base text-text-soft leading-relaxed"
                    style={{
                      fontFamily: "var(--font-almarai)",
                    }}
                  >
                    {occasion.description}
                  </p>
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
