"use client";

import { useMemo, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FeaturedBouquets from "@/components/FeaturedBouquets";
import bouquetsData from "./bouquets.json";
import cardSuggestionsData from "./card-suggestions.json";

type Flower = { id: number; name: string; price: number; image: string };
type BouquetSize = { key: string; label: string; price: number; stems: string };
type BouquetStyle = {
    key: string;
    label: string;
    price: number;
    image: string;
};
type Color = { id: number; color: string; name: string };
type Occasion = {
    id: number;
    name: string;
    message: string;
};
type DeliveryTime = { id: number; label: string; value: string };
type PaymentMethod = { key: string; label: string; icon: string };
type Config = { vatRate: number; cardPrice: number };

export default function CustomBuilderPage() {
    const searchParams = useSearchParams();

    // Dynamic Data States
    const [flowers, setFlowers] = useState<Flower[]>([]);
    const [bouquetSizes, setBouquetSizes] = useState<BouquetSize[]>([]);
    const [bouquetStyles, setBouquetStyles] = useState<BouquetStyle[]>([]);
    const [colors, setColors] = useState<Color[]>([]);
    const [occasions, setOccasions] = useState<Occasion[]>([]);
    const [deliveryTimes, setDeliveryTimes] = useState<DeliveryTime[]>([]);
    const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
    const [config, setConfig] = useState<Config>({
        vatRate: 0.15,
        cardPrice: 15,
    });
    const [isLoading, setIsLoading] = useState<boolean>(true);

    // Load data - can be replaced with API call
    useEffect(() => {
        const loadData = async () => {
            try {
                setIsLoading(true);
                // في المستقبل، يمكن استبدال هذا بـ:
                // const response = await fetch('/api/bouquets');
                // const data = await response.json();

                // حالياً نستخدم البيانات من JSON
                setFlowers(bouquetsData.flowers);
                setBouquetSizes(bouquetsData.bouquetSizes);
                setBouquetStyles(bouquetsData.bouquetStyles);
                setColors(bouquetsData.colors);
                setOccasions(bouquetsData.occasions);
                setDeliveryTimes(bouquetsData.deliveryTimes);
                setPaymentMethods(bouquetsData.paymentMethods);
                setConfig(bouquetsData.config);

                // تعيين المناسبة الافتراضية
                if (bouquetsData.occasions.length > 0) {
                    setOccasion(bouquetsData.occasions[0].name);
                }

                setIsLoading(false);
            } catch (error) {
                console.error("Error loading bouquet data:", error);
                setIsLoading(false);
            }
        };

        loadData();
    }, []);

    // States
    const [selectedFlowers, setSelectedFlowers] = useState<
        Record<number, number>
    >({});
    const [selectedColors, setSelectedColors] = useState<string[]>([]);
    const [size, setSize] = useState<"small" | "medium" | "large">("medium");
    const [style, setStyle] = useState<"classic" | "premium" | "gift" | "eco">(
        "classic"
    );
    const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
    const [occasion, setOccasion] = useState<string>("");
    const [cardMessage, setCardMessage] = useState<string>("");
    const [includeCard, setIncludeCard] = useState<boolean>(false);
    const [notes, setNotes] = useState<string>("");
    const [payMethod, setPayMethod] = useState<string>("mada");
    const [bouquetImage, setBouquetImage] = useState<string>(
        "/images/bouquets/IMG-224.png"
    );

    // Delivery & Payment States (Step 4)
    const [deliveryDate, setDeliveryDate] = useState<string>("");
    const [deliveryTime, setDeliveryTime] = useState<string>("");
    const [city, setCity] = useState<string>("");
    const [district, setDistrict] = useState<string>("");
    const [street, setStreet] = useState<string>("");
    const [landmark, setLandmark] = useState<string>("");
    const [phone, setPhone] = useState<string>("");

    // Search State
    const [searchQuery, setSearchQuery] = useState<string>("");

    // Notification system
    const [notification, setNotification] = useState<{
        message: string;
        visible: boolean;
    }>({
        message: "",
        visible: false,
    });

    const showNotification = (message: string) => {
        setNotification({ message, visible: true });
        setTimeout(() => {
            setNotification({ message: "", visible: false });
        }, 3000);
    };

    // Load shared design from URL
    useEffect(() => {
        const designParam = searchParams.get("design");
        if (designParam) {
            try {
                const design = JSON.parse(decodeURIComponent(designParam));
                setSelectedFlowers(design.flowers || {});
                setSelectedColors(design.colors || []);
                setSize(design.size || "medium");
                setStyle(design.style || "classic");
                setOccasion(design.occasion || "عيد ميلاد");
                setCardMessage(design.cardMessage || "");
                setIncludeCard(design.includeCard || false);
                setNotes(design.notes || "");
                if (design.image) {
                    setBouquetImage(design.image);
                }
            } catch (e) {
                console.error("Failed to parse design data:", e);
            }
        }
    }, [searchParams]);

    const getStyleLabel = (s: "classic" | "premium" | "gift" | "eco") =>
        bouquetStyles.find((x) => x.key === s)?.label || s;

    const getSizePrice = (s: "small" | "medium" | "large") => {
        const sizeData = bouquetSizes.find((x) => x.key === s);
        return sizeData?.price || 0;
    };

    const getStylePrice = (s: "classic" | "premium" | "gift" | "eco") => {
        const styleData = bouquetStyles.find((x) => x.key === s);
        return styleData?.price || 0;
    };

    // Calculate total flowers count first
    const totalFlowersCount = useMemo(
        () => Object.values(selectedFlowers).reduce((sum, qty) => sum + qty, 0),
        [selectedFlowers]
    );

    // Calculate total with VAT
    const subtotal = useMemo(() => {
        // إذا لم يتم اختيار زهور بعد، الإجمالي = صفر
        if (totalFlowersCount === 0) {
            return 0;
        }

        const basePrice = getSizePrice(size);
        const stylePrice = getStylePrice(style);
        const flowersPrice = Object.entries(selectedFlowers).reduce(
            (sum, [id, qty]) => {
                const f = flowers.find((x) => x.id === Number(id));
                return sum + (f ? f.price * qty : 0);
            },
            0
        );
        const cardPrice = includeCard ? config.cardPrice : 0;
        return basePrice + stylePrice + flowersPrice + cardPrice;
    }, [
        selectedFlowers,
        size,
        style,
        includeCard,
        totalFlowersCount,
        flowers,
        bouquetSizes,
        bouquetStyles,
        config,
    ]);

    const vat = useMemo(() => subtotal * config.vatRate, [subtotal, config]);
    const total = useMemo(() => subtotal + vat, [subtotal, vat]);

    const qty = (id: number) => selectedFlowers[id] ?? 0;
    const inc = (id: number) =>
        setSelectedFlowers((s) => ({ ...s, [id]: (s[id] ?? 0) + 1 }));
    const dec = (id: number) =>
        setSelectedFlowers((s) => ({
            ...s,
            [id]: Math.max(0, (s[id] ?? 0) - 1),
        }));

    const toggleColor = (color: string) => {
        setSelectedColors((prev) =>
            prev.includes(color)
                ? prev.filter((c) => c !== color)
                : [...prev, color]
        );
    };

    // Filter flowers based on search query
    const filteredFlowers = useMemo(() => {
        if (!searchQuery.trim()) {
            return flowers;
        }
        return flowers.filter((flower) =>
            flower.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [flowers, searchQuery]);

    // Save to history
    const saveToHistory = () => {
        if (typeof window === "undefined") return;

        const designData = {
            flowers: selectedFlowers,
            colors: selectedColors,
            size,
            style,
            occasion,
            cardMessage,
            includeCard,
            notes,
            total,
            image: bouquetImage,
            timestamp: Date.now(),
        };

        const history = JSON.parse(
            localStorage.getItem("designHistory") || "[]"
        );
        history.unshift(designData);

        // Keep only last 50 designs
        if (history.length > 50) {
            history.splice(50);
        }

        localStorage.setItem("designHistory", JSON.stringify(history));
    };

    // Save to favorites
    const saveToFavorites = () => {
        if (typeof window === "undefined") return;

        const designData = {
            id: Date.now(),
            flowers: Object.entries(selectedFlowers)
                .filter(([_, qty]) => qty > 0)
                .map(([id, quantity]) => {
                    const flower = flowers.find((f) => f.id === Number(id));
                    return { flower, quantity };
                }),
            colors: selectedColors,
            size,
            style,
            occasion,
            cardMessage,
            includeCard,
            notes,
            total,
            image: bouquetImage,
            timestamp: Date.now(),
        };

        const favorites = JSON.parse(
            localStorage.getItem("bouquetFavorites") || "[]"
        );
        favorites.push(designData);
        localStorage.setItem("bouquetFavorites", JSON.stringify(favorites));

        saveToHistory();
        showNotification("تم حفظ التصميم في المفضلة بنجاح! ❤️");
    };

    // Share design
    const shareDesign = () => {
        if (typeof window === "undefined") return;

        const designData = {
            flowers: selectedFlowers,
            colors: selectedColors,
            size,
            style,
            occasion,
            cardMessage,
            includeCard,
            notes,
            image: bouquetImage,
        };

        const encodedDesign = encodeURIComponent(JSON.stringify(designData));
        const shareUrl = `${window.location.origin}/custom?design=${encodedDesign}`;

        navigator.clipboard
            .writeText(shareUrl)
            .then(() => {
                saveToHistory();
                showNotification("تم نسخ رابط التصميم بنجاح! 🔗");
            })
            .catch(() => {
                showNotification("فشل نسخ الرابط، حاول مرة أخرى");
            });
    };

    // Add to cart
    const addToCart = () => {
        if (typeof window === "undefined") return;

        // التحقق من أن هناك زهور مختارة
        if (totalFlowersCount === 0) {
            showNotification("⚠️ يرجى اختيار الزهور أولاً");
            return;
        }

        // تحضير بيانات الزهور مع التفاصيل الكاملة
        const flowersDetails = Object.entries(selectedFlowers)
            .filter(([_, qty]) => qty > 0)
            .map(([id, quantity]) => {
                const flower = flowers.find((f) => f.id === Number(id));
                return {
                    id: Number(id),
                    name: flower?.name || "",
                    price: flower?.price || 0,
                    quantity,
                    total: (flower?.price || 0) * quantity,
                };
            });

        // تفاصيل الحجم
        const sizeDetails = bouquetSizes.find((s) => s.key === size);

        // تفاصيل التغليف
        const styleDetails = bouquetStyles.find((s) => s.key === style);

        // تفاصيل المناسبة
        const occasionDetails = occasions.find((o) => o.name === occasion);

        // التأكد من صحة القيم
        const finalSubtotal = isNaN(subtotal) || subtotal === 0 ? 0 : subtotal;
        const finalVat = isNaN(vat) || vat === 0 ? 0 : vat;
        const finalTotal = isNaN(total) || total === 0 ? 0 : total;

        const cart = JSON.parse(localStorage.getItem("cart") || "[]");
        const item = {
            id: Date.now(),
            title: "باقة مخصصة",
            price: Number(finalTotal.toFixed(2)) || 0,
            subtotal: Number(finalSubtotal.toFixed(2)) || 0,
            vat: Number(finalVat.toFixed(2)) || 0,
            quantity: 1,
            image: bouquetImage,
            isCustom: true,
            customData: {
                // Step 1 - الزهور مع التفاصيل الكاملة
                flowers: flowersDetails,
                flowersCount: totalFlowersCount,
                colors: selectedColors,

                // Step 2 - الحجم والتغليف مع التفاصيل
                size: {
                    key: size,
                    label: sizeDetails?.label || "",
                    price: sizeDetails?.price || 0,
                    stems: sizeDetails?.stems || "",
                },
                style: {
                    key: style,
                    label: styleDetails?.label || "",
                    price: styleDetails?.price || 0,
                },

                // Step 3 - التخصيص
                occasion: {
                    name: occasion,
                    message: occasionDetails?.message || "",
                },
                cardMessage,
                includeCard,
                cardPrice: includeCard ? config.cardPrice : 0,
                notes,

                // Step 4 - التوصيل والدفع
                deliveryInfo: {
                    date: deliveryDate,
                    time: deliveryTime,
                    timeLabel:
                        deliveryTimes.find((t) => t.value === deliveryTime)
                            ?.label || "",
                    address: {
                        city,
                        district,
                        street,
                        landmark,
                    },
                    phone,
                    paymentMethod: payMethod,
                    paymentMethodLabel:
                        paymentMethods.find((p) => p.key === payMethod)
                            ?.label || "",
                },
            },
        };

        cart.push(item);
        localStorage.setItem("cart", JSON.stringify(cart));

        // Dispatch event
        window.dispatchEvent(new Event("cartUpdated"));

        saveToHistory();
        showNotification("تمت إضافة الباقة إلى السلة بنجاح! 🛒");

        setTimeout(() => {
            window.location.href = "/cart";
        }, 1500);
    };

    // Auto-select size based on flower count (without completing flowers)
    useEffect(() => {
        if (totalFlowersCount === 0) {
            setSize("medium"); // الحجم الافتراضي
            return;
        }

        // فقط تحديد الحجم المناسب بدون إكمال الزهور
        if (totalFlowersCount >= 18) {
            setSize("large");
        } else if (totalFlowersCount >= 12) {
            setSize("medium");
        } else {
            setSize("small");
        }
    }, [totalFlowersCount]);

    // Function to complete flowers when moving to step 3
    const completeFlowersForSize = () => {
        const targetCount = size === "large" ? 18 : size === "medium" ? 12 : 7;

        // إذا كان العدد الحالي أقل من المطلوب، أكمل الزهور بنفس النسبة
        if (totalFlowersCount < targetCount && totalFlowersCount > 0) {
            const currentFlowers = Object.entries(selectedFlowers).filter(
                ([_, qty]) => qty > 0
            );

            if (currentFlowers.length > 0) {
                const newFlowers: Record<number, number> = {};
                let remaining = targetCount;

                // حساب النسبة لكل نوع زهرة
                currentFlowers.forEach(([id, qty], index) => {
                    const ratio = qty / totalFlowersCount;

                    if (index === currentFlowers.length - 1) {
                        // آخر زهرة تأخذ الباقي لضمان الوصول للعدد المطلوب
                        newFlowers[Number(id)] = Math.max(1, remaining);
                    } else {
                        const newQty = Math.max(
                            1,
                            Math.round(targetCount * ratio)
                        );
                        newFlowers[Number(id)] = newQty;
                        remaining -= newQty;
                    }
                });

                setSelectedFlowers(newFlowers);
            }
        }
    };

    // Function to adjust flowers based on size change
    const handleSizeChange = (newSize: "small" | "medium" | "large") => {
        const currentCount = totalFlowersCount;
        const targetCount =
            newSize === "large" ? 18 : newSize === "medium" ? 12 : 7;

        // إذا لم يكن هناك زهور مختارة، فقط غيّر الحجم
        if (currentCount === 0) {
            setSize(newSize);
            return;
        }

        // حساب النسبة الحالية للزهور
        const currentFlowers = Object.entries(selectedFlowers).filter(
            ([_, qty]) => qty > 0
        );

        if (currentFlowers.length > 0) {
            const newFlowers: Record<number, number> = {};
            let remaining = targetCount;

            // حساب النسبة لكل نوع زهرة
            currentFlowers.forEach(([id, qty], index) => {
                const ratio = qty / currentCount;

                if (index === currentFlowers.length - 1) {
                    // آخر زهرة تأخذ الباقي لضمان الوصول للعدد المطلوب
                    newFlowers[Number(id)] = Math.max(1, remaining);
                } else {
                    const newQty = Math.max(1, Math.round(targetCount * ratio));
                    newFlowers[Number(id)] = newQty;
                    remaining -= newQty;
                }
            });

            setSelectedFlowers(newFlowers);
        }

        setSize(newSize);
    };

    // Calculate individual prices for display
    const sizePrice = useMemo(() => getSizePrice(size), [size, bouquetSizes]);
    const stylePrice = useMemo(
        () => getStylePrice(style),
        [style, bouquetStyles]
    );
    const flowersPrice = useMemo(() => {
        return Object.entries(selectedFlowers).reduce((sum, [id, qty]) => {
            const f = flowers.find((x) => x.id === Number(id));
            return sum + (f ? f.price * qty : 0);
        }, 0);
    }, [selectedFlowers, flowers]);
    const cardPrice = useMemo(
        () => (includeCard ? config.cardPrice : 0),
        [includeCard, config]
    );

    // Loading state
    if (isLoading) {
        return (
            <div className="min-h-screen" dir="rtl">
                <Header />
                <main className="py-10">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex items-center justify-center min-h-[60vh]">
                            <div className="text-center">
                                <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#5A5E4D] mb-4"></div>
                                <p className="text-gray-600">
                                    جاري تحميل البيانات...
                                </p>
                            </div>
                        </div>
                    </div>
                </main>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen" dir="rtl">
            <Header />

            {/* Toast Notification */}
            {notification.visible && (
                <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 px-4 sm:px-6 py-2 sm:py-3 bg-[#5A5E4D] text-white rounded-lg shadow-lg text-xs sm:text-sm max-w-[90%] sm:max-w-none text-center">
                    {notification.message}
                </div>
            )}

            <main>
                {/* Page Title Section */}
                <section className="pt-8 pb-4">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-right">
                        <h1 className="text-[36px] font-bold leading-[40px] text-[#2D3319] mb-2 tracking-[0px]">
                            تنسيق باقة خاص
                        </h1>
                        <p className="text-[16px] font-normal leading-[24px] text-[#5A5E4D] tracking-[0px]">
                            صمّم باقتك الخاصة بالألوان والزهور التي تفضّلها
                        </p>
                    </div>
                </section>

                {/* Content Section */}
                <section className="py-8">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
                            {/* Left - selector */}
                            <div className="order-2 lg:order-2 lg:col-span-2">
                                <div className="bg-white rounded-lg border border-gray-200 p-3 sm:p-5 mb-4">
                                    {/* شريط الخطوات */}
                                    <div className=" flex items-center justify-between text-[10px] sm:text-[12px] text-gray-600 mb-3 overflow-x-auto pb-2">
                                        {[
                                            { n: 1, t: "اختيار الزهور" },
                                            { n: 2, t: "الحجم واللون" },
                                            { n: 3, t: "التخصيص" },
                                            { n: 4, t: "التوصيل" },
                                        ].map((s) => (
                                            <button
                                                key={s.n}
                                                onClick={() =>
                                                    setStep(
                                                        s.n as 1 | 2 | 3 | 4
                                                    )
                                                }
                                                className={`flex items-center gap-1 sm:gap-2 px-1 sm:px-4 py-1 rounded-full  transition-colors  flex-shrink-0 ${
                                                    step === s.n
                                                        ? "bg-gray-100 text-gray-900"
                                                        : "hover:bg-gray-50"
                                                }`}
                                                aria-pressed={step === s.n}
                                            >
                                                <span
                                                    className={`h-5 w-5 sm:h-6 sm:w-6 rounded-full flex items-center justify-center text-[10px] sm:text-sm ${
                                                        step === s.n
                                                            ? "bg-[#5A5E4D] text-white"
                                                            : "bg-gray-100 text-gray-700"
                                                    }`}
                                                >
                                                    {s.n}
                                                </span>
                                                <span className="whitespace-nowrap">
                                                    {s.t}
                                                </span>
                                            </button>
                                        ))}
                                    </div>

                                    {/* عنوان القسم */}
                                    <div className="flex items-center justify-between mb-2">
                                        <h3
                                            className="text-sm font-semibold text-gray-800"
                                            style={{
                                                fontFamily:
                                                    "var(--font-almarai)",
                                            }}
                                        >
                                            {step === 1 && "اختر الزهور"}
                                            {step === 2 &&
                                                "اختيار الحجم والتغليف"}
                                            {step === 3 && "التخصيص"}
                                            {step === 4 && "معلومات التوصيل"}
                                        </h3>
                                    </div>

                                    {/* محتوى الخطوات */}
                                    {step === 1 && (
                                        <>
                                            {/* حقل البحث */}
                                            <div className="relative mb-4">
                                                <input
                                                    type="text"
                                                    value={searchQuery}
                                                    onChange={(e) =>
                                                        setSearchQuery(
                                                            e.target.value
                                                        )
                                                    }
                                                    placeholder="ابحث عن الزهور"
                                                    className="w-full rounded-lg border border-gray-200 bg-white shadow-sm pl-10 pr-3 py-2 text-right focus:outline-none focus:ring-2 focus:ring-[#5A5E4D]/30"
                                                />
                                                <svg
                                                    className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                                    />
                                                </svg>
                                                {searchQuery && (
                                                    <button
                                                        onClick={() =>
                                                            setSearchQuery("")
                                                        }
                                                        className="absolute left-10 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
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
                                                                d="M6 18L18 6M6 6l12 12"
                                                            />
                                                        </svg>
                                                    </button>
                                                )}
                                            </div>

                                            {filteredFlowers.length === 0 ? (
                                                <div className="text-center py-8 text-gray-500">
                                                    <div className="text-3xl mb-2">
                                                        🔍
                                                    </div>
                                                    <p className="text-sm">
                                                        لا توجد نتائج للبحث "
                                                        {searchQuery}"
                                                    </p>
                                                    <button
                                                        onClick={() =>
                                                            setSearchQuery("")
                                                        }
                                                        className="mt-3 text-[#5A5E4D] text-sm hover:underline cursor-pointer"
                                                    >
                                                        مسح البحث
                                                    </button>
                                                </div>
                                            ) : (
                                                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 sm:gap-3">
                                                    {filteredFlowers.map(
                                                        (f) => {
                                                            const currentQty =
                                                                qty(f.id);
                                                            return (
                                                                <div
                                                                    key={f.id}
                                                                    className="rounded-lg border border-gray-200 p-2 sm:p-3 text-center"
                                                                >
                                                                    <div className="mx-auto h-16 w-16 sm:h-20 sm:w-20 rounded-full overflow-hidden mb-2 border border-gray-200 bg-gray-50 p-1">
                                                                        <img
                                                                            src={
                                                                                f.image
                                                                            }
                                                                            alt={
                                                                                f.name
                                                                            }
                                                                            className="h-full w-full object-cover rounded-full"
                                                                        />
                                                                    </div>
                                                                    <div className="text-[11px] sm:text-[12px] font-semibold truncate">
                                                                        {f.name}
                                                                    </div>
                                                                    <div className="text-[10px] sm:text-[11px] text-gray-500 mb-2">
                                                                        ريال{" "}
                                                                        {
                                                                            f.price
                                                                        }
                                                                    </div>
                                                                    {currentQty ===
                                                                    0 ? (
                                                                        <button
                                                                            onClick={() =>
                                                                                inc(
                                                                                    f.id
                                                                                )
                                                                            }
                                                                            className="mx-auto inline-block text-[11px] sm:text-[12px] px-2 sm:px-3 py-1 rounded bg-[#5A5E4D] text-white cursor-pointer"
                                                                        >
                                                                            إضافة
                                                                        </button>
                                                                    ) : (
                                                                        <div className="flex items-center justify-center gap-1 sm:gap-2">
                                                                            <button
                                                                                onClick={() =>
                                                                                    inc(
                                                                                        f.id
                                                                                    )
                                                                                }
                                                                                className="h-5 w-5 sm:h-6 sm:w-6 rounded bg-[#5A5E4D] text-white flex items-center justify-center cursor-pointer text-xs sm:text-sm"
                                                                            >
                                                                                +
                                                                            </button>
                                                                            <span className="text-xs sm:text-sm font-semibold min-w-[1.5rem] text-center">
                                                                                {
                                                                                    currentQty
                                                                                }
                                                                            </span>
                                                                            <button
                                                                                onClick={() =>
                                                                                    dec(
                                                                                        f.id
                                                                                    )
                                                                                }
                                                                                className="h-5 w-5 sm:h-6 sm:w-6 rounded bg-gray-300 text-gray-700 flex items-center justify-center cursor-pointer text-xs sm:text-sm"
                                                                            >
                                                                                -
                                                                            </button>
                                                                        </div>
                                                                    )}
                                                                </div>
                                                            );
                                                        }
                                                    )}
                                                </div>
                                            )}

                                            <div className="mt-6 text-right">
                                                <div
                                                    className="mb-2 text-sm font-semibold text-gray-800"
                                                    style={{
                                                        fontFamily:
                                                            "var(--font-almarai)",
                                                    }}
                                                >
                                                    الزهور المختارة
                                                </div>
                                                {totalFlowersCount === 0 ? (
                                                    <p className="text-[12px] text-gray-500 mb-3 bg-gray-50 p-2 rounded-md text-center">
                                                        اختر الزهور التي تفضلها
                                                        لإنشاء باقتك المخصصة
                                                    </p>
                                                ) : (
                                                    <div className="mb-3 space-y-1">
                                                        {Object.entries(
                                                            selectedFlowers
                                                        )
                                                            .filter(
                                                                ([_, qty]) =>
                                                                    qty > 0
                                                            )
                                                            .map(
                                                                ([id, qty]) => {
                                                                    const flower =
                                                                        flowers.find(
                                                                            (
                                                                                f
                                                                            ) =>
                                                                                f.id ===
                                                                                Number(
                                                                                    id
                                                                                )
                                                                        );
                                                                    if (!flower)
                                                                        return null;
                                                                    return (
                                                                        <div
                                                                            key={
                                                                                id
                                                                            }
                                                                            className="flex items-center justify-between text-[12px] bg-gray-50 px-3 py-2 rounded-md"
                                                                        >
                                                                            <span className="text-gray-700">
                                                                                {
                                                                                    flower.name
                                                                                }
                                                                            </span>
                                                                            <span className="text-gray-900 font-semibold">
                                                                                {
                                                                                    qty
                                                                                }{" "}
                                                                                ×{" "}
                                                                                {
                                                                                    flower.price
                                                                                }{" "}
                                                                                ريال
                                                                            </span>
                                                                        </div>
                                                                    );
                                                                }
                                                            )}
                                                    </div>
                                                )}
                                                <div
                                                    className="mb-2 text-sm font-semibold text-gray-800"
                                                    style={{
                                                        fontFamily:
                                                            "var(--font-almarai)",
                                                    }}
                                                >
                                                    اختر الألوان المفضلة
                                                </div>
                                                <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
                                                    {colors.map((c) => (
                                                        <button
                                                            key={c.color}
                                                            onClick={() =>
                                                                toggleColor(
                                                                    c.color
                                                                )
                                                            }
                                                            className={`relative h-7 w-7 sm:h-8 sm:w-8 rounded-full border border-gray-300 transition-shadow ${
                                                                selectedColors.includes(
                                                                    c.color
                                                                )
                                                                    ? "ring-2 ring-offset-2 ring-[#5A5E4D]"
                                                                    : ""
                                                            }`}
                                                            style={{
                                                                backgroundColor:
                                                                    c.color,
                                                            }}
                                                            aria-label={c.name}
                                                            title={c.name}
                                                        >
                                                            {selectedColors.includes(
                                                                c.color
                                                            ) && (
                                                                <span className="absolute inset-0 flex items-center justify-center text-white text-xs font-bold">
                                                                    ✓
                                                                </span>
                                                            )}
                                                        </button>
                                                    ))}
                                                </div>
                                                <p className="mt-2 text-[11px] text-gray-500">
                                                    سيتم اختيار الزهور بالألوان
                                                    المحددة قدر الإمكان
                                                </p>
                                            </div>
                                        </>
                                    )}

                                    {step === 2 && (
                                        <div className="space-y-6">
                                            {/* حجم الباقة */}
                                            <div>
                                                <div
                                                    className="mb-3 text-sm font-semibold text-gray-800"
                                                    style={{
                                                        fontFamily:
                                                            "var(--font-almarai)",
                                                    }}
                                                >
                                                    حجم الباقة
                                                </div>
                                                {totalFlowersCount > 0 && (
                                                    <div className="mb-3 bg-[#5A5E4D]/10 border border-[#d0d2c7]/30 rounded-md p-2 text-xs text-[#5A5E4D] flex items-center gap-2">
                                                        <span>💡</span>
                                                        <span>
                                                            تم اختيار الحجم
                                                            تلقائياً. يمكنك
                                                            تغييره وسيتم تعديل
                                                            عدد الزهور بنفس
                                                            النسبة
                                                        </span>
                                                    </div>
                                                )}
                                                <div className="grid grid-cols-3 gap-2 sm:gap-3">
                                                    {bouquetSizes.map((opt) => {
                                                        const targetCount =
                                                            opt.key === "large"
                                                                ? 18
                                                                : opt.key ===
                                                                  "medium"
                                                                ? 12
                                                                : 7;
                                                        return (
                                                            <button
                                                                key={opt.key}
                                                                onClick={() =>
                                                                    handleSizeChange(
                                                                        opt.key as any
                                                                    )
                                                                }
                                                                disabled={
                                                                    totalFlowersCount ===
                                                                    0
                                                                }
                                                                className={`text-center rounded-lg border px-2 sm:px-3 py-2 sm:py-3 transition-all ${
                                                                    size ===
                                                                    opt.key
                                                                        ? "border-[#d0d2c7] bg-[#5A5E4D]/5"
                                                                        : totalFlowersCount ===
                                                                          0
                                                                        ? "border-gray-200 bg-gray-50 opacity-50 cursor-not-allowed"
                                                                        : "border-gray-200 bg-white hover:border-[#b5bf95]/30 hover:bg-gray-50 cursor-pointer"
                                                                }`}
                                                            >
                                                                <div className="mx-auto mb-1 sm:mb-2 h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-gray-200 flex items-center justify-center text-xl sm:text-2xl">
                                                                    {opt.key ===
                                                                    "large"
                                                                        ? "🌹"
                                                                        : opt.key ===
                                                                          "medium"
                                                                        ? "🌸"
                                                                        : "🌼"}
                                                                </div>
                                                                <div className="font-semibold text-gray-800 text-xs sm:text-sm mb-1">
                                                                    {opt.label}
                                                                </div>
                                                                <div className="text-gray-600 text-[10px] sm:text-xs mb-1">
                                                                    {opt.price}{" "}
                                                                    ريال
                                                                </div>
                                                                <div className="text-[10px] sm:text-[11px] text-gray-500">
                                                                    {opt.stems}
                                                                </div>
                                                                {size ===
                                                                    opt.key &&
                                                                    totalFlowersCount >
                                                                        0 && (
                                                                        <div className="mt-2 text-xs text-[#5A5E4D] font-semibold bg-[#5A5E4D]/10 rounded px-2 py-1">
                                                                            ✓{" "}
                                                                            {
                                                                                totalFlowersCount
                                                                            }{" "}
                                                                            زهرة
                                                                        </div>
                                                                    )}
                                                            </button>
                                                        );
                                                    })}
                                                </div>
                                                {totalFlowersCount === 0 && (
                                                    <p className="mt-3 text-xs text-gray-500 text-center bg-gray-50 rounded-md p-2">
                                                        ⚠️ يرجى اختيار الزهور
                                                        أولاً من الخطوة السابقة
                                                    </p>
                                                )}
                                            </div>

                                            {/* نوع التغليف */}
                                            <div>
                                                <div
                                                    className="mb-3 text-sm font-semibold text-gray-800"
                                                    style={{
                                                        fontFamily:
                                                            "var(--font-almarai)",
                                                    }}
                                                >
                                                    نوع التغليف
                                                </div>
                                                <div className="grid grid-cols-2 gap-2 sm:gap-3 md:gap-4">
                                                    {bouquetStyles.map(
                                                        (opt) => (
                                                            <button
                                                                key={opt.key}
                                                                onClick={() =>
                                                                    setStyle(
                                                                        opt.key as any
                                                                    )
                                                                }
                                                                className={`rounded-lg border text-right p-2 sm:p-3 transition-all ${
                                                                    style ===
                                                                    opt.key
                                                                        ? "border-[#d0d2c7] bg-[#5A5E4D]/5"
                                                                        : "border-gray-200 bg-white hover:bg-gray-50"
                                                                }`}
                                                            >
                                                                <div className="flex items-center gap-2 sm:gap-3">
                                                                    <img
                                                                        src={
                                                                            opt.image
                                                                        }
                                                                        alt={
                                                                            opt.label
                                                                        }
                                                                        className="h-10 w-10 sm:h-12 sm:w-12 rounded-md object-cover flex-shrink-0"
                                                                    />
                                                                    <div className="flex-1 min-w-0">
                                                                        <div className="text-xs sm:text-sm font-semibold text-gray-800 truncate">
                                                                            {
                                                                                opt.label
                                                                            }
                                                                        </div>
                                                                        <div className="text-[11px] sm:text-[12px] text-gray-500">
                                                                            ريال{" "}
                                                                            {
                                                                                opt.price
                                                                            }
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </button>
                                                        )
                                                    )}
                                                </div>

                                                <div className="mt-6 flex items-center justify-between gap-2">
                                                    <button
                                                        onClick={() =>
                                                            setStep(1)
                                                        }
                                                        className="px-3 sm:px-4 py-2 rounded-md text-xs sm:text-sm bg-white border border-gray-300 text-gray-800 hover:bg-gray-50 transition-colors flex items-center gap-1 sm:gap-2 cursor-pointer"
                                                    >
                                                        <span>▶</span>
                                                        <span>السابق</span>
                                                    </button>
                                                    <button
                                                        onClick={() => {
                                                            completeFlowersForSize();
                                                            setStep(3);
                                                        }}
                                                        className="px-3 sm:px-4 py-2 rounded-md text-xs sm:text-sm bg-[#5A5E4D] text-white hover:bg-[#4b5244] transition-colors flex items-center gap-1 sm:gap-2 cursor-pointer"
                                                    >
                                                        <span>التالي</span>
                                                        <span>◀</span>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {step === 3 && (
                                        <div className="space-y-5">
                                            <div>
                                                <div
                                                    className="mb-2 text-sm font-semibold text-gray-800"
                                                    style={{
                                                        fontFamily:
                                                            "var(--font-almarai)",
                                                    }}
                                                >
                                                    المناسبة
                                                </div>
                                                <div className="relative">
                                                    <select
                                                        value={occasion}
                                                        onChange={(e) =>
                                                            setOccasion(
                                                                e.target.value
                                                            )
                                                        }
                                                        className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-right focus:outline-none focus:ring-2 focus:ring-[#5A5E4D]/30 appearance-none cursor-pointer"
                                                        style={{
                                                            paddingLeft:
                                                                "2.5rem",
                                                        }}
                                                    >
                                                        {occasions.map((o) => (
                                                            <option
                                                                key={o.id}
                                                                value={o.name}
                                                            >
                                                                {o.name}
                                                            </option>
                                                        ))}
                                                    </select>
                                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                                                        ▼
                                                    </span>
                                                </div>
                                            </div>

                                            <div>
                                                <div
                                                    className="mb-2 text-sm font-semibold text-gray-800"
                                                    style={{
                                                        fontFamily:
                                                            "var(--font-almarai)",
                                                    }}
                                                >
                                                    بطاقة التهنئة
                                                </div>

                                                <label className="mb-3 flex items-center gap-2 text-sm text-gray-800">
                                                    <input
                                                        type="checkbox"
                                                        checked={includeCard}
                                                        onChange={(e) =>
                                                            setIncludeCard(
                                                                e.target.checked
                                                            )
                                                        }
                                                        className="h-4 w-4 rounded border-gray-300 text-[#5A5E4D] focus:ring-[#5A5E4D]"
                                                    />
                                                    <span>
                                                        إضافة بطاقة تهنئة (+
                                                        {config.cardPrice} ريال)
                                                    </span>
                                                </label>

                                                {includeCard && (
                                                    <div className="space-y-3">
                                                        {/* اقتراحات بطاقات التهنئة */}
                                                        {occasion ? (
                                                            <div className="animate-in slide-in-from-top-2 duration-300">
                                                                <div className="mb-3 flex items-center gap-2">
                                                                    <div className="flex items-center gap-1">
                                                                        <span className="text-sm">
                                                                            💌
                                                                        </span>
                                                                        <span className="text-xs font-medium text-[#5A5E4D]">
                                                                            اقتراحات
                                                                            لبطاقة
                                                                            التهنئة:
                                                                        </span>
                                                                    </div>
                                                                    <div className="flex-1 h-px bg-gradient-to-r from-[#5A5E4D]/30 to-transparent"></div>
                                                                </div>
                                                                <div className="h-32 overflow-y-auto hide-scrollbar relative">
                                                                    <div className="space-y-2 pr-1">
                                                                        {(() => {
                                                                            const suggestions =
                                                                                cardSuggestionsData
                                                                                    .cardSuggestions[
                                                                                    occasion as keyof typeof cardSuggestionsData.cardSuggestions
                                                                                ] ||
                                                                                [];
                                                                            return suggestions.map(
                                                                                (
                                                                                    suggestion: string,
                                                                                    index: number
                                                                                ) => (
                                                                                    <button
                                                                                        key={
                                                                                            index
                                                                                        }
                                                                                        type="button"
                                                                                        onClick={() => {
                                                                                            setCardMessage(
                                                                                                suggestion
                                                                                            );
                                                                                            // تأثير بصري عند النقر
                                                                                            const button =
                                                                                                document.activeElement as HTMLElement;
                                                                                            button.style.transform =
                                                                                                "scale(0.98)";
                                                                                            setTimeout(
                                                                                                () => {
                                                                                                    button.style.transform =
                                                                                                        "scale(1)";
                                                                                                },
                                                                                                150
                                                                                            );
                                                                                        }}
                                                                                        className="group w-full text-right p-3 text-xs bg-gradient-to-r from-[#5A5E4D]/5 via-[#5A5E4D]/10 to-[#5A5E4D]/5 hover:from-[#5A5E4D]/10 hover:via-[#5A5E4D]/15 hover:to-[#5A5E4D]/10 border border-[#5A5E4D]/20 hover:border-[#5A5E4D]/30 rounded-xl transition-all duration-300 cursor-pointer relative overflow-hidden"
                                                                                        style={{
                                                                                            fontFamily:
                                                                                                "var(--font-almarai)",
                                                                                            height: "40px",
                                                                                        }}
                                                                                    >
                                                                                        {/* تأثير خلفية متحرك */}
                                                                                        <div className="absolute inset-0 bg-gradient-to-r from-[#5A5E4D]/0 via-[#5A5E4D]/0 to-[#5A5E4D]/0 group-hover:from-[#5A5E4D]/10 group-hover:via-[#5A5E4D]/15 group-hover:to-[#5A5E4D]/10 transition-all duration-500"></div>

                                                                                        <div className="relative flex items-center justify-between gap-3 h-full">
                                                                                            <div className="flex items-center gap-2">
                                                                                                <span className="text-[#5A5E4D] group-hover:text-[#4b5244] transition-colors duration-200 text-base">
                                                                                                    ✨
                                                                                                </span>
                                                                                                <div className="w-1 h-1 bg-[#5A5E4D]/40 rounded-full group-hover:bg-[#5A5E4D]/60 transition-colors duration-200"></div>
                                                                                            </div>
                                                                                            <span className="flex-1 text-[#5A5E4D] group-hover:text-[#4b5244] leading-tight transition-colors duration-200 text-right overflow-hidden text-ellipsis whitespace-nowrap">
                                                                                                {
                                                                                                    suggestion
                                                                                                }
                                                                                            </span>
                                                                                            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                                                                                <span className="text-xs text-[#5A5E4D]">
                                                                                                    استخدام
                                                                                                </span>
                                                                                                <span className="text-[#5A5E4D]">
                                                                                                    →
                                                                                                </span>
                                                                                            </div>
                                                                                        </div>
                                                                                    </button>
                                                                                )
                                                                            );
                                                                        })()}
                                                                    </div>
                                                                    {(() => {
                                                                        const totalSuggestions =
                                                                            cardSuggestionsData
                                                                                .cardSuggestions[
                                                                                occasion as keyof typeof cardSuggestionsData.cardSuggestions
                                                                            ]
                                                                                ?.length ||
                                                                            0;
                                                                        if (
                                                                            totalSuggestions >
                                                                            3
                                                                        ) {
                                                                            return (
                                                                                <div className="absolute bottom-0 left-0 right-0 h-6 bg-gradient-to-t from-white/80 to-transparent pointer-events-none flex items-end justify-center pb-1">
                                                                                    <div className="flex gap-1">
                                                                                        <div className="w-1 h-1 bg-[#5A5E4D]/30 rounded-full"></div>
                                                                                        <div className="w-1 h-1 bg-[#5A5E4D]/30 rounded-full"></div>
                                                                                        <div className="w-1 h-1 bg-[#5A5E4D]/30 rounded-full"></div>
                                                                                    </div>
                                                                                </div>
                                                                            );
                                                                        }
                                                                        return null;
                                                                    })()}
                                                                </div>
                                                                <div className="mt-2 text-[10px] text-[#5A5E4D]/60 text-center">
                                                                    انقر على أي
                                                                    اقتراح
                                                                    لاستخدامه
                                                                    {(() => {
                                                                        const totalSuggestions =
                                                                            cardSuggestionsData
                                                                                .cardSuggestions[
                                                                                occasion as keyof typeof cardSuggestionsData.cardSuggestions
                                                                            ]
                                                                                ?.length ||
                                                                            0;
                                                                        if (
                                                                            totalSuggestions >
                                                                            3
                                                                        ) {
                                                                            return ` • ${totalSuggestions} اقتراح متاح (مرر لرؤية المزيد)`;
                                                                        } else {
                                                                            return ` • ${totalSuggestions} اقتراح متاح`;
                                                                        }
                                                                    })()}
                                                                </div>
                                                            </div>
                                                        ) : (
                                                            <div className="animate-in slide-in-from-top-2 duration-300">
                                                                <div className="rounded-xl bg-gradient-to-r from-[#5A5E4D]/5 to-[#5A5E4D]/10 border border-[#5A5E4D]/20 p-4">
                                                                    <div className="flex items-center gap-3">
                                                                        <span className="text-[#5A5E4D] text-lg">
                                                                            💡
                                                                        </span>
                                                                        <div>
                                                                            <div className="text-xs font-medium text-[#5A5E4D] mb-1">
                                                                                اختر
                                                                                المناسبة
                                                                                أولاً
                                                                            </div>
                                                                            <div className="text-[10px] text-[#5A5E4D]/70">
                                                                                سيتم
                                                                                عرض
                                                                                اقتراحات
                                                                                جميلة
                                                                                لبطاقة
                                                                                التهنئة
                                                                                بناءً
                                                                                على
                                                                                المناسبة
                                                                                المختارة
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        )}

                                                        {/* حقل كتابة الرسالة */}
                                                        <div className="rounded-lg bg-white p-3 border border-gray-200">
                                                            <textarea
                                                                value={
                                                                    cardMessage
                                                                }
                                                                onChange={(e) =>
                                                                    setCardMessage(
                                                                        e.target.value.slice(
                                                                            0,
                                                                            150
                                                                        )
                                                                    )
                                                                }
                                                                placeholder="اكتب رسالتك هنا أو اختر من الاقتراحات أعلاه..."
                                                                className="w-full h-28 resize-none rounded-md border border-gray-200 p-3 text-right focus:outline-none focus:ring-2 focus:ring-[#5A5E4D]/30"
                                                                style={{
                                                                    fontFamily:
                                                                        "var(--font-almarai)",
                                                                }}
                                                            />
                                                            <div className="flex items-center justify-end text-[11px] text-gray-500 mt-1">
                                                                <span>
                                                                    {
                                                                        cardMessage.length
                                                                    }
                                                                    /150 حرف
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>

                                            <div>
                                                <div
                                                    className="mb-2 text-sm font-semibold text-gray-800"
                                                    style={{
                                                        fontFamily:
                                                            "var(--font-almarai)",
                                                    }}
                                                >
                                                    ملاحظات خاصة
                                                </div>
                                                <textarea
                                                    value={notes}
                                                    onChange={(e) =>
                                                        setNotes(e.target.value)
                                                    }
                                                    placeholder="أي متطلبات أو تفاصيل خاصة ترغب بإضافتها..."
                                                    className="w-full h-20 resize-none rounded-lg border border-gray-200 p-3 text-right focus:outline-none focus:ring-2 focus:ring-[#5A5E4D]/30"
                                                />
                                            </div>

                                            <div className="flex items-center justify-between gap-2">
                                                <button
                                                    onClick={() => setStep(2)}
                                                    className="px-3 sm:px-4 py-2 rounded-md text-xs sm:text-sm bg-white border border-gray-300 text-gray-800 hover:bg-gray-50 transition-colors flex items-center gap-1 sm:gap-2 cursor-pointer"
                                                >
                                                    <span>▶</span>
                                                    <span>السابق</span>
                                                </button>
                                                <button
                                                    onClick={() => setStep(4)}
                                                    className="px-3 sm:px-4 py-2 rounded-md text-xs sm:text-sm bg-[#5A5E4D] text-white hover:bg-[#4b5244] transition-colors flex items-center gap-1 sm:gap-2 cursor-pointer"
                                                >
                                                    <span>التالي</span>
                                                    <span>◀</span>
                                                </button>
                                            </div>
                                        </div>
                                    )}

                                    {step === 4 && (
                                        <div className="space-y-5">
                                            <div
                                                className="text-sm font-semibold text-gray-800"
                                                style={{
                                                    fontFamily:
                                                        "var(--font-almarai)",
                                                }}
                                            >
                                                التوصيل والدفع
                                            </div>

                                            {/* تاريخ التوصيل */}
                                            <div>
                                                <div className="mb-1 text-sm text-gray-700">
                                                    تاريخ التوصيل
                                                </div>
                                                <div className="relative">
                                                    <input
                                                        type="date"
                                                        value={deliveryDate}
                                                        onChange={(e) =>
                                                            setDeliveryDate(
                                                                e.target.value
                                                            )
                                                        }
                                                        className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-right focus:outline-none focus:ring-2 focus:ring-[#5A5E4D]/30"
                                                    />
                                                </div>
                                            </div>

                                            {/* وقت التوصيل */}
                                            <div>
                                                <div className="mb-1 text-sm text-gray-700">
                                                    وقت التوصيل
                                                </div>
                                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3 text-xs sm:text-sm">
                                                    {deliveryTimes.map(
                                                        (time) => (
                                                            <button
                                                                key={time.id}
                                                                type="button"
                                                                onClick={() =>
                                                                    setDeliveryTime(
                                                                        time.value
                                                                    )
                                                                }
                                                                className={`rounded-md border px-2 sm:px-3 py-2 transition-colors ${
                                                                    deliveryTime ===
                                                                    time.value
                                                                        ? "border-[#5A5E4D] bg-[#5A5E4D] text-white"
                                                                        : "border-[#5A5E4D] bg-white text-[#5A5E4D] hover:bg-[#5A5E4D]/5"
                                                                }`}
                                                            >
                                                                {time.label}
                                                            </button>
                                                        )
                                                    )}
                                                </div>
                                            </div>

                                            {/* عنوان التوصيل */}
                                            <div>
                                                <div className="mb-1 text-sm text-gray-700">
                                                    عنوان التوصيل
                                                </div>
                                                <input
                                                    value={city}
                                                    onChange={(e) =>
                                                        setCity(e.target.value)
                                                    }
                                                    placeholder="المدينة"
                                                    className="w-full mb-2 rounded-lg border border-gray-200 px-3 py-2 text-right focus:outline-none focus:ring-2 focus:ring-[#5A5E4D]/30"
                                                />
                                                <input
                                                    value={district}
                                                    onChange={(e) =>
                                                        setDistrict(
                                                            e.target.value
                                                        )
                                                    }
                                                    placeholder="الحي"
                                                    className="w-full mb-2 rounded-lg border border-gray-200 px-3 py-2 text-right focus:outline-none focus:ring-2 focus:ring-[#5A5E4D]/30"
                                                />
                                                <input
                                                    value={street}
                                                    onChange={(e) =>
                                                        setStreet(
                                                            e.target.value
                                                        )
                                                    }
                                                    placeholder="أدخل اسم الشارع"
                                                    className="w-full mb-2 rounded-lg border border-gray-200 px-3 py-2 text-right focus:outline-none focus:ring-2 focus:ring-[#5A5E4D]/30"
                                                />
                                                <input
                                                    value={landmark}
                                                    onChange={(e) =>
                                                        setLandmark(
                                                            e.target.value
                                                        )
                                                    }
                                                    placeholder="أدخل أقرب معلم"
                                                    className="w-full rounded-lg border border-gray-200 px-3 py-2 text-right focus:outline-none focus:ring-2 focus:ring-[#5A5E4D]/30"
                                                />
                                            </div>

                                            {/* رقم الجوال */}
                                            <div>
                                                <div className="mb-1 text-sm text-gray-700">
                                                    رقم الجوال
                                                </div>
                                                <input
                                                    value={phone}
                                                    onChange={(e) => {
                                                        const value =
                                                            e.target.value;
                                                        // قبول الأرقام فقط
                                                        if (
                                                            /^\d*$/.test(
                                                                value
                                                            ) &&
                                                            value.length <= 10
                                                        ) {
                                                            setPhone(value);
                                                        }
                                                    }}
                                                    placeholder="05xxxxxxxx"
                                                    type="tel"
                                                    maxLength={10}
                                                    inputMode="numeric"
                                                    pattern="[0-9]*"
                                                    className="w-full rounded-lg border border-gray-200 px-3 py-2 text-right focus:outline-none focus:ring-2 focus:ring-[#5A5E4D]/30"
                                                />
                                                {phone && phone.length < 10 && (
                                                    <p className="text-xs text-red-500 mt-1">
                                                        يجب أن يكون الرقم مكوناً
                                                        من 10 أرقام
                                                    </p>
                                                )}
                                            </div>

                                            {/* وسيلة الدفع */}
                                            <div>
                                                <div className="mb-1 text-sm text-gray-700">
                                                    طريقة الدفع
                                                </div>
                                                <div className="space-y-3">
                                                    {paymentMethods.map((g) => (
                                                        <button
                                                            key={g.key}
                                                            type="button"
                                                            onClick={() =>
                                                                setPayMethod(
                                                                    g.key
                                                                )
                                                            }
                                                            className={`w-full flex items-center justify-between rounded-md border px-3 py-2 text-right ${
                                                                payMethod ===
                                                                g.key
                                                                    ? "border-[#5A5E4D] bg-[#5A5E4D]/5"
                                                                    : "border-gray-200 bg-white hover:bg-gray-50"
                                                            }`}
                                                        >
                                                            <span className="flex items-center gap-3">
                                                                <span className="inline-flex h-5 w-5 items-center justify-center text-gray-700">
                                                                    {g.icon}
                                                                </span>
                                                                <span className="text-sm text-gray-800">
                                                                    {g.label}
                                                                </span>
                                                            </span>
                                                            <span
                                                                className={`h-4 w-4 rounded-full border ${
                                                                    payMethod ===
                                                                    g.key
                                                                        ? "border-[#5A5E4D] ring-2 ring-[#5A5E4D]/30 bg-[#5A5E4D]"
                                                                        : "border-gray-300"
                                                                }`}
                                                            ></span>
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>

                                            <div className="flex items-center justify-between gap-2">
                                                <button
                                                    onClick={() => setStep(3)}
                                                    className="px-3 sm:px-4 py-2 rounded-md text-xs sm:text-sm bg-white border border-gray-300 text-gray-800 hover:bg-gray-50 transition-colors flex items-center gap-1 sm:gap-2 cursor-pointer"
                                                >
                                                    <span>▶</span>
                                                    <span>السابق</span>
                                                </button>
                                                <button
                                                    onClick={addToCart}
                                                    className="px-3 sm:px-4 py-2 rounded-md text-xs sm:text-sm bg-[#5A5E4D] text-white hover:bg-[#4b5244] transition-colors cursor-pointer"
                                                >
                                                    إضافة إلى السلة
                                                </button>
                                            </div>
                                        </div>
                                    )}

                                    {step === 1 && (
                                        <div className="mt-6 flex">
                                            <button
                                                onClick={() => setStep(2)}
                                                className="ml-auto px-3 sm:px-4 py-2 rounded-md text-xs sm:text-sm bg-[#5A5E4D] text-white hover:bg-[#4b5244] transition-colors flex items-center gap-1 sm:gap-2 cursor-pointer"
                                            >
                                                <span>التالي</span>
                                                <span>◀</span>
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Right - preview */}
                            <div className="order-1 lg:order-1 w-full lg:max-w-sm lg:justify-self-start">
                                <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                                    <div className="px-3 sm:px-4 pt-3 sm:pt-4">
                                        <div
                                            className="text-sm font-semibold text-gray-800 mb-2"
                                            style={{
                                                fontFamily:
                                                    "var(--font-almarai)",
                                            }}
                                        >
                                            معاينة الباقة
                                        </div>
                                    </div>
                                    <div className="px-3 sm:px-4">
                                        <div className="rounded-lg overflow-hidden bg-gray-50">
                                            <div className="h-48 sm:h-64 p-2 sm:p-3 flex items-center justify-center">
                                                <img
                                                    src={bouquetImage}
                                                    alt="preview"
                                                    className="h-40 sm:h-56 object-contain"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="p-3 sm:p-4">
                                        {/* الإجمالي دائماً ظاهر */}
                                        <div className="flex items-center justify-between py-2 px-2 sm:px-3 border-b border-gray-200 rounded-md mb-3 sm:mb-4">
                                            <span className="text-gray-700 text-xs sm:text-sm font-semibold">
                                                الإجمالي
                                            </span>
                                            <span className="text-base sm:text-lg font-bold text-[#5A5E4D]">
                                                {total.toFixed(0)} ريال
                                            </span>
                                        </div>

                                        {totalFlowersCount === 0 ? (
                                            <div className="mb-4 text-center py-4">
                                                <div className="text-3xl mb-2">
                                                    🌸
                                                </div>
                                                <p className="text-xs text-gray-600">
                                                    ابدأ باختيار الزهور لإنشاء
                                                    باقتك
                                                </p>
                                            </div>
                                        ) : (
                                            <div className="mb-3 sm:mb-4 space-y-2 text-sm">
                                                {/* تفاصيل السعر */}
                                                <div className="text-[11px] sm:text-xs text-gray-500 mb-1 font-semibold">
                                                    تفاصيل السعر
                                                </div>
                                                <div className="space-y-1 text-[11px] sm:text-xs bg-gray-50 rounded-md p-2">
                                                    <div className="flex items-center justify-between">
                                                        <span className="text-gray-600">
                                                            الحجم (
                                                            {size === "small"
                                                                ? "صغير"
                                                                : size ===
                                                                  "medium"
                                                                ? "متوسط"
                                                                : "كبير"}
                                                            )
                                                        </span>
                                                        <span className="font-semibold text-gray-800">
                                                            {sizePrice.toFixed(
                                                                0
                                                            )}{" "}
                                                            ر.س
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center justify-between">
                                                        <span className="text-gray-600">
                                                            التغليف (
                                                            {getStyleLabel(
                                                                style
                                                            )}
                                                            )
                                                        </span>
                                                        <span className="font-semibold text-gray-800">
                                                            {stylePrice.toFixed(
                                                                0
                                                            )}{" "}
                                                            ر.س
                                                        </span>
                                                    </div>
                                                    {flowersPrice > 0 && (
                                                        <div className="flex items-center justify-between">
                                                            <span className="text-gray-600">
                                                                الزهور (
                                                                {
                                                                    totalFlowersCount
                                                                }
                                                                )
                                                            </span>
                                                            <span className="font-semibold text-gray-800">
                                                                {flowersPrice.toFixed(
                                                                    0
                                                                )}{" "}
                                                                ر.س
                                                            </span>
                                                        </div>
                                                    )}
                                                    {includeCard && (
                                                        <div className="flex items-center justify-between">
                                                            <span className="text-gray-600">
                                                                بطاقة تهنئة
                                                            </span>
                                                            <span className="font-semibold text-gray-800">
                                                                {cardPrice.toFixed(
                                                                    0
                                                                )}{" "}
                                                                ر.س
                                                            </span>
                                                        </div>
                                                    )}
                                                    <div className="flex items-center justify-between pt-1 border-t border-gray-200">
                                                        <span className="text-gray-600">
                                                            الضريبة (15%)
                                                        </span>
                                                        <span className="font-semibold text-gray-800">
                                                            {vat.toFixed(0)} ر.س
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                        <div className="text-xs sm:text-[13px] font-semibold text-gray-800 mb-2">
                                            تفاصيل الباقة
                                        </div>
                                        <div className="text-xs sm:text-sm rounded-lg overflow-hidden mb-3 sm:mb-4">
                                            <div className="flex items-center justify-between bg-gray-100 px-3 py-2">
                                                <span className="text-gray-600">
                                                    الحجم
                                                </span>
                                                <span>
                                                    {size === "small"
                                                        ? "صغير"
                                                        : size === "medium"
                                                        ? "متوسط"
                                                        : "كبير"}
                                                </span>
                                            </div>
                                            <div className="flex items-center justify-between bg-gray-100/70 px-3 py-2">
                                                <span className="text-gray-600">
                                                    عدد الزهور
                                                </span>
                                                <span>
                                                    {totalFlowersCount} زهرة
                                                </span>
                                            </div>
                                            <div className="flex items-center justify-between bg-gray-100 px-3 py-2">
                                                <span className="text-gray-600">
                                                    الألوان المختارة
                                                </span>
                                                <span className="flex items-center gap-1">
                                                    {selectedColors.length ===
                                                    0 ? (
                                                        <span className="text-gray-400 text-xs">
                                                            لا يوجد
                                                        </span>
                                                    ) : (
                                                        selectedColors
                                                            .slice(0, 3)
                                                            .map((color) => (
                                                                <span
                                                                    key={color}
                                                                    className="inline-block h-3 w-3 rounded-full border"
                                                                    style={{
                                                                        backgroundColor:
                                                                            color,
                                                                    }}
                                                                ></span>
                                                            ))
                                                    )}
                                                </span>
                                            </div>
                                            <div className="flex items-center justify-between bg-gray-100/70 px-3 py-2">
                                                <span className="text-gray-600">
                                                    التغليف
                                                </span>
                                                <span>
                                                    {getStyleLabel(style)}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 gap-2 sm:gap-3">
                                            <button
                                                onClick={saveToFavorites}
                                                className="w-full rounded-md bg-[#5A5E4D] text-white px-3 py-2 text-xs sm:text-sm flex items-center justify-center gap-2 hover:bg-[#4b5244] transition-colors cursor-pointer"
                                            >
                                                <span>حفظ التصميم</span>
                                                <span>♡</span>
                                            </button>
                                            <button
                                                onClick={shareDesign}
                                                className="w-full rounded-md bg-white border border-[#5A5E4D] text-[#5A5E4D] px-3 py-2 text-xs sm:text-sm flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors cursor-pointer"
                                            >
                                                <span>مشاركة التصميم</span>
                                                <span>↗️</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* قسم الباقات المميزة */}
                <FeaturedBouquets />
            </main>
            <Footer />
        </div>
    );
}
