import { Gift, Heart, Truck } from "lucide-react";
import type { FeatureItem } from "../../types";

type FeaturesSectionProps = {
    features?: FeatureItem[];
};

const FeaturesSection = ({ features }: FeaturesSectionProps) => {
    // TODO: Add to content
    const localFeatures: FeatureItem[] = features ?? [
        {
            id: 1,
            icon: (
                // شاحنة للتوصيل السريع
                <Truck className="w-7 h-7 md:w-8 md:h-8" />
            ),
            title: "توصيل سريع",
            description: "خدمة توصيل في نفس اليوم لجميع مناطق المدينة.",
        },
        {
            id: 2,
            icon: (
                // قلب لضمان الجودة
                <Heart className="w-7 h-7 md:w-8 md:h-8" />
            ),
            title: "ضمان الجودة",
            description: "نضمن لك أعلى جودة من الزهور الطازجة",
        },
        {
            id: 3,
            icon: (
                // هدية لتغليف مميز
                <Gift className="w-7 h-7 md:w-8 md:h-8" />
            ),
            title: "تغليف مميز",
            description: "تغليف راقي يليق بمناسباتك الخاصة",
        },
    ];

    return (
        <section className="py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-7">
                    {localFeatures.map((feature) => (
                        <div
                            key={feature.id}
                            className="text-right bg-white rounded-xl p-7 md:p-8 shadow-[0_6px_18px_rgba(0,0,0,0.06)]"
                        >
                            <div className="mb-2 md:mb-3">
                                <div className="w-full flex justify-start">
                                    {feature.icon}
                                </div>
                                <h3
                                    dir="rtl"
                                    className="mt-2 text-base md:text-lg font-bold text-gray-800 text-right"
                                    style={{
                                        fontFamily: "var(--font-almarai)",
                                    }}
                                >
                                    {feature.title}
                                </h3>
                            </div>
                            <p
                                dir="rtl"
                                className="text-[12px] md:text-sm text-gray-600 leading-relaxed text-right"
                                style={{ fontFamily: "var(--font-almarai)" }}
                            >
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FeaturesSection;
