import { Gift, Heart, Truck } from "lucide-react";
import type { FeatureItem } from "../../types";
import { localFeatures } from "../content/features";

type FeaturesSectionProps = {
    features?: FeatureItem[];
};

const FeaturesSection = ({ features }: FeaturesSectionProps) => {

    const featuresToShow = features || localFeatures;
    return (
        <section className="py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-7">
                    {featuresToShow.map((feature: FeatureItem) => (
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
