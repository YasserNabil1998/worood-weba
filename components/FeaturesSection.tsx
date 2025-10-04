import type { FeatureItem } from "../types";

type FeaturesSectionProps = {
    features?: FeatureItem[];
};

const FeaturesSection = ({ features }: FeaturesSectionProps) => {
    const localFeatures: FeatureItem[] = features ?? [
        {
            id: 1,
            icon: (
                // شاحنة للتوصيل السريع
                <svg
                    className="w-7 h-7 md:w-8 md:h-8"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    style={{ color: "#5A5E4D" }}
                >
                    <path d="M3 7h11v8H3zM14 10h3l3 3v2h-6V10zM5 19a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm10 0a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" />
                </svg>
            ),
            title: "توصيل سريع",
            description: "خدمة توصيل في نفس اليوم لجميع مناطق المدينة.",
        },
        {
            id: 2,
            icon: (
                // قلب لضمان الجودة
                <svg
                    className="w-7 h-7 md:w-8 md:h-8"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    style={{ color: "#5A5E4D" }}
                >
                    <path d="M12 21s-6.5-4.35-8.485-6.334a5 5 0 0 1 7.071-7.071L12 7l1.414-1.405a5 5 0 1 1 7.071 7.071C18.5 16.65 12 21 12 21z" />
                </svg>
            ),
            title: "ضمان الجودة",
            description: "نضمن لك أعلى جودة من الزهور الطازجة",
        },
        {
            id: 3,
            icon: (
                // هدية لتغليف مميز
                <svg
                    className="w-7 h-7 md:w-8 md:h-8"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    style={{ color: "#5A5E4D" }}
                >
                    <path d="M20 8h-3.17A3.001 3.001 0 0 0 12 6a3.001 3.001 0 0 0-4.83 2H4a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-6a1 1 0 0 0 1-1V9a1 1 0 0 0-1-1zm-9-1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm6 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2zM5 20v-6h14v6H5z" />
                </svg>
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
                            className="group text-right bg-white rounded-xl p-7 md:p-8 shadow-[0_6px_18px_rgba(0,0,0,0.06)] hover:shadow-[0_12px_30px_rgba(0,0,0,0.12)] hover:-translate-y-2 transition-all duration-300 border border-transparent hover:border-[#5A5E4D]/20 cursor-pointer"
                        >
                            <div className="mb-2 md:mb-3">
                                <div className="w-full flex justify-start transition-transform duration-300 group-hover:scale-105">
                                    {feature.icon}
                                </div>
                                <h3
                                    dir="rtl"
                                    className="mt-2 text-base md:text-lg font-bold text-gray-800 text-right group-hover:text-[#5A5E4D] transition-colors duration-300"
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
