import { notFound } from "next/navigation";
import Link from "next/link";
import { OccasionData } from "@/src/@types/occasions/category/OccasionData.type";

// قائمة موحدة لجميع المناسبات للاستخدام في الـ sidebar
const allOccasions = [
    { key: "wedding", name: "زواج", icon: "❤️" },
    { key: "engagement", name: "خطوبة", icon: "💕" },
    { key: "graduation", name: "نجاح وتخرج", icon: "🎓" },
    { key: "newborn", name: "مولود جديد", icon: "👶" },
    { key: "anniversary", name: "ذكرى سنوية", icon: "📅" },
    { key: "getwell", name: "شفاء عاجل", icon: "🌸" },
    { key: "thanks", name: "شكر وتقدير", icon: "🙏" },
];

const occasionsData: Record<string, OccasionData> = {
    wedding: {
        id: 1,
        title: "باقات الزفاف",
        category: "wedding",
        description:
            "اجعل يوم زفافك أكثر جمالاً وروعة مع تشكيلتنا المميزة من باقات الزفاف الفاخرة. باقات الورود البيضاء والناعمة، الترتيبات الرومانسية، والديكورات الأنيقة التي تحول حفل زفافك إلى حلم جميل. كل باقة مصممة بعناية فائقة لتكون جزءاً لا يُنسى من أجمل أيام حياتك.",
        productsCount: 189,
        image: "/images/occasions/IMG-78.png",
        subcategories: [
            { id: 1, name: "باقات hkk", image: "💐" },
            { id: 2, name: "باقات العريس", image: "🌹" },
            { id: 3, name: "ديكورات الزفاف", image: "🎀" },
            { id: 4, name: "باقات الضيوف", image: "🌸" },
            { id: 5, name: "أكاليل الورد", image: "🌺" },
            { id: 6, name: "ترتيبات المائدة", image: "🕯️" },
        ],
    },
    engagement: {
        id: 2,
        title: "خطوبة",
        category: "engagement",
        description:
            "احتفل بلحظات الخطوبة المميزة مع باقاتنا الرومانسية الساحرة. تشكيلة واسعة من الورود والزهور المنتقاة بعناية لتعبر عن الحب والفرحة في هذه المناسبة الخاصة. كل باقة مصممة بحب لتكون جزءاً من ذكريات هذا اليوم الجميل.",
        productsCount: 145,
        image: "/images/occasions/IMG-94.png",
        subcategories: [
            { id: 1, name: "باقات رومانسية", image: "💕" },
            { id: 2, name: "ورود حمراء", image: "🌹" },
            { id: 3, name: "باقات فاخرة", image: "💐" },
            { id: 4, name: "هدايا الخطوبة", image: "🎁" },
        ],
    },
    graduation: {
        id: 3,
        title: "نجاح وتخرج",
        category: "graduation",
        description:
            "احتفل بإنجازات أحبائك مع مجموعة مميزة من الهدايا المخصصة للتخرج والنجاح. باقات الورود الفاخرة والهدايا الأنيقة التي تعبر عن فخرك وسعادتك بهذا الإنجاز العظيم. كل هدية مصممة لتكون ذكرى جميلة تدوم للأبد.",
        productsCount: 156,
        image: "/images/occasions/IMG-110.png",
        subcategories: [
            { id: 1, name: "باقات تخرج", image: "🎓" },
            { id: 2, name: "هدايا التخرج", image: "🎁" },
            { id: 3, name: "ورود وبالونات", image: "🎈" },
            { id: 4, name: "تورتة وحلويات", image: "🍰" },
        ],
    },
    newborn: {
        id: 4,
        title: "مولود جديد",
        category: "newborn",
        description:
            "رحب بالمولود الجديد مع مجموعة مميزة من الهدايا الرقيقة واللطيفة. باقات الورود الناعمة، الدباديب اللطيفة، والهدايا المصممة خصيصاً للاحتفال بقدوم المولود الجديد. كل هدية تحمل مشاعر الفرح والحب لتكون جزءاً من ذكريات هذه اللحظة السعيدة.",
        productsCount: 134,
        image: "/images/occasions/IMG-126.png",
        subcategories: [
            { id: 1, name: "هدايا البيبي", image: "👶" },
            { id: 2, name: "باقات الأطفال", image: "🍼" },
            { id: 3, name: "ألعاب ناعمة", image: "🧸" },
            { id: 4, name: "باقات زرقاء", image: "💙" },
            { id: 5, name: "باقات وردية", image: "💗" },
        ],
    },
    anniversary: {
        id: 5,
        title: "ذكرى سنوية",
        category: "anniversary",
        description:
            "احتفل بذكرياتك السنوية مع باقات الورود الفاخرة والهدايا الرومانسية المميزة. تشكيلة واسعة من الباقات المصممة خصيصاً للتعبير عن الحب والتقدير في هذه المناسبة الخاصة. كل باقة تحمل رسالة حب تدوم مدى الحياة.",
        productsCount: 178,
        image: "/images/occasions/IMG-142.png",
        subcategories: [
            { id: 1, name: "ورود حمراء", image: "🌹" },
            { id: 2, name: "باقات رومانسية", image: "💕" },
            { id: 3, name: "شوكولاتة فاخرة", image: "🍫" },
            { id: 4, name: "هدايا مميزة", image: "🎁" },
            { id: 5, name: "باقات كلاسيكية", image: "💐" },
        ],
    },
    getwell: {
        id: 6,
        title: "شفاء عاجل",
        category: "getwell",
        description:
            "أرسل أطيب التمنيات بالشفاء العاجل مع باقاتنا الجميلة والهدايا المريحة. مجموعة مختارة بعناية لتبعث الأمل والسعادة في قلوب المرضى، وترسم البسمة على وجوههم. كل هدية تحمل رسالة حب ودعم لتكون سبباً في تحسين معنوياتهم.",
        productsCount: 89,
        image: "/images/occasions/IMG-156.png",
        subcategories: [
            { id: 1, name: "باقات الشفاء", image: "🌸" },
            { id: 2, name: "دباديب لطيفة", image: "🧸" },
            { id: 3, name: "سلال الفواكه", image: "🧺" },
            { id: 4, name: "بالونات مبهجة", image: "🎈" },
        ],
    },
    thanks: {
        id: 7,
        title: "شكر وتقدير",
        category: "thanks",
        description:
            "عبر عن شكرك وتقديرك بأجمل الطرق مع باقاتنا المميزة. تشكيلة واسعة من الورود والهدايا المنتقاة بعناية لتعبر عن امتنانك وتقديرك للأشخاص المميزين في حياتك. كل هدية تحمل رسالة شكر صادقة من القلب.",
        productsCount: 112,
        image: "/images/occasions/IMG-172.png",
        subcategories: [
            { id: 1, name: "باقات الشكر", image: "🙏" },
            { id: 2, name: "ورود مميزة", image: "🌺" },
            { id: 3, name: "هدايا تقدير", image: "🎁" },
            { id: 4, name: "شوكولاتة", image: "🍫" },
        ],
    },
};

export default async function OccasionPage({
    params,
}: {
    params: Promise<{ category: string }>;
}) {
    const { category } = await params;
    const occasionData = occasionsData[category];

    if (!occasionData) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-white">
            <main>
                {/* Breadcrumb */}
                <div className="w-full px-8 sm:px-12 lg:px-16 xl:px-24 2xl:px-32 py-6">
                    <div
                        className="flex items-center gap-2 text-sm"
                        style={{ fontFamily: "var(--font-almarai)" }}
                    >
                        <Link
                            href="/"
                            className="text-gray-600 hover:text-gray-800"
                        >
                            الرئيسية
                        </Link>
                        <span className="text-gray-400">×</span>
                        <span className="text-[#5A5E4D] font-medium">
                            {occasionData.title}
                        </span>
                    </div>
                </div>

                {/* Hero Section */}
                <section className="w-full px-8 sm:px-12 lg:px-16 xl:px-24 2xl:px-32 py-8">
                    <div className="flex justify-end">
                        <div className="text-right mb-6 max-w-6xl">
                            <h1
                                className="text-3xl md:text-4xl font-bold text-[#5A5E4D] mb-2"
                                style={{ fontFamily: "var(--font-almarai)" }}
                            >
                                {occasionData.title}
                            </h1>
                            <p
                                className="text-lg text-gray-600 mb-4"
                                style={{ fontFamily: "var(--font-almarai)" }}
                            >
                                {occasionData.productsCount} منتج
                            </p>
                            <p
                                className="text-sm md:text-base text-gray-700 leading-relaxed"
                                style={{ fontFamily: "var(--font-almarai)" }}
                            >
                                {occasionData.description}
                            </p>
                        </div>
                    </div>
                </section>

                {/* Products Grid Section with Filter */}
                <section className="w-full px-8 sm:px-12 lg:px-16 xl:px-24 2xl:px-32 py-12">
                    <div className="flex gap-8">
                        {/* Sidebar Filter */}
                        <aside className="hidden lg:block w-64 flex-shrink-0">
                            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 sticky top-24">
                                <h3
                                    className="text-lg font-bold text-gray-800 mb-4 text-right border-b border-gray-200 pb-3"
                                    style={{
                                        fontFamily: "var(--font-almarai)",
                                    }}
                                >
                                    المناسبات
                                </h3>
                                <div className="space-y-2">
                                    {allOccasions.map((occasion) => {
                                        const isActive =
                                            occasion.key === category;
                                        return (
                                            <Link
                                                key={occasion.key}
                                                href={`/occasions/${occasion.key}`}
                                                className={`flex items-center justify-end gap-3 p-3 rounded-xl transition-all duration-200 group ${
                                                    isActive
                                                        ? "bg-[#F5F3ED] text-[#5A5E4D] shadow-md"
                                                        : "hover:bg-[#F8F6F0] text-gray-700 hover:text-gray-900"
                                                }`}
                                            >
                                                <span
                                                    className={`text-sm font-medium ${
                                                        isActive
                                                            ? "text-[#5A5E4D]"
                                                            : "text-gray-700 group-hover:text-gray-900"
                                                    }`}
                                                    style={{
                                                        fontFamily:
                                                            "var(--font-almarai)",
                                                    }}
                                                >
                                                    {occasion.name}
                                                </span>
                                                <div
                                                    className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 ${
                                                        isActive
                                                            ? "bg-[#5A5E4D]/10 scale-110"
                                                            : "bg-[#F5F1E8] group-hover:scale-110"
                                                    }`}
                                                >
                                                    <span className="text-base">
                                                        {occasion.icon}
                                                    </span>
                                                </div>
                                            </Link>
                                        );
                                    })}
                                </div>
                            </div>
                        </aside>

                        {/* Products Grid */}
                        <div className="flex-1">
                            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
                                {/* Placeholder for actual products - you can fetch from API */}
                                {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
                                    <div
                                        key={item}
                                        className="group cursor-pointer"
                                    >
                                        <div className="bg-[#F5F3ED] rounded-3xl overflow-hidden transition-all duration-300 relative">
                                            <div className="relative aspect-square overflow-hidden bg-gray-200">
                                                <div className="absolute inset-0 flex items-center justify-center">
                                                    <span
                                                        className="text-gray-400"
                                                        style={{
                                                            fontFamily:
                                                                "var(--font-almarai)",
                                                        }}
                                                    >
                                                        صورة المنتج
                                                    </span>
                                                </div>

                                                {/* Hover Overlay */}
                                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
                                                    <button
                                                        className="bg-white text-[#5A5E4D] px-6 py-2.5 rounded-full text-sm font-medium transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 flex items-center gap-2"
                                                        style={{
                                                            fontFamily:
                                                                "var(--font-almarai)",
                                                        }}
                                                    >
                                                        <svg
                                                            className="w-4 h-4"
                                                            fill="none"
                                                            stroke="currentColor"
                                                            viewBox="0 0 24 24"
                                                        >
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                strokeWidth={2}
                                                                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                                                            />
                                                        </svg>
                                                        أضف إلى سلة التسوق
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="p-4 text-right">
                                                <h3
                                                    className="text-sm font-medium text-gray-700 mb-2 text-right line-clamp-2"
                                                    style={{
                                                        fontFamily:
                                                            "var(--font-almarai)",
                                                    }}
                                                >
                                                    باقة الحوري الأحمر المثالي |
                                                    25 زهرة
                                                </h3>
                                                <div className="flex items-center justify-end gap-1.5">
                                                    <span
                                                        className="text-xs text-gray-600"
                                                        style={{
                                                            fontFamily:
                                                                "var(--font-almarai)",
                                                        }}
                                                    >
                                                        ر.س
                                                    </span>
                                                    <span
                                                        className="text-lg font-bold text-gray-800"
                                                        style={{
                                                            fontFamily:
                                                                "var(--font-almarai)",
                                                        }}
                                                    >
                                                        450
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}

// Generate static params for all occasions
export async function generateStaticParams() {
    return Object.keys(occasionsData).map((category) => ({
        category: category,
    }));
}
