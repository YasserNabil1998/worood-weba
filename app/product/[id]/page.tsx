"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useNotification } from "@/components/NotificationSystem";
import { useParams } from "next/navigation";
import DataLoader from "@/components/DataLoader";
import { useDataLoading } from "@/lib/useDataLoading";
import productData from "./product-data.json";

interface Product {
    id: number;
    title: string;
    price: number;
    image: string;
    images: string[];
    description: string;
    currency: string;
}

interface Size {
    value: string;
    label: string;
    price: number;
}

interface ProductData {
    bouquetImages: string[];
    productImages: string[];
    sizes: Size[];
    addons: {
        card: { price: number; label: string };
        chocolate: { price: number; label: string };
        giftWrap: { price: number; label: string };
    };
    defaultDescription: string;
    priceMultiplier: number;
    currency: string;
}

export default function ProductDetailPage() {
    const params = useParams();
    const id = params?.id as string;
    const [product, setProduct] = useState<Product | null>(null);
    const { isLoading, withLoading } = useDataLoading();
    const { showNotification } = useNotification();

    useEffect(() => {
        async function fetchProduct() {
            await withLoading(async () => {
                try {
                    const res = await fetch(
                        `https://dummyjson.com/products/${id}`
                    );
                    const data = await res.json();

                    // تحويل البيانات من API إلى صيغة المنتج
                    const mainImage =
                        productData.bouquetImages[
                            parseInt(id) % productData.bouquetImages.length
                        ];
                    const product: Product = {
                        id: data.id,
                        title: data.title,
                        price: Math.round(
                            data.price * productData.priceMultiplier
                        ), // ضرب في 10 لجعل السعر واقعي بالريال
                        image: mainImage,
                        images: [
                            mainImage,
                            productData.productImages[
                                parseInt(id) % productData.productImages.length
                            ],
                            productData.productImages[
                                (parseInt(id) + 1) %
                                    productData.productImages.length
                            ],
                            productData.productImages[
                                (parseInt(id) + 2) %
                                    productData.productImages.length
                            ],
                        ],
                        description: productData.defaultDescription,
                        currency: productData.currency,
                    };

                    setProduct(product);
                } catch (error) {
                    console.error("Error fetching product:", error);
                }
            });
        }

        if (id) {
            fetchProduct();
        }
    }, [id, withLoading]);

    const [selectedImage, setSelectedImage] = useState(0);
    const [selectedSize, setSelectedSize] = useState("medium");
    const [addCard, setAddCard] = useState(false);
    const [cardMessage, setCardMessage] = useState("");
    const [addChocolate, setAddChocolate] = useState(false);
    const [giftWrap, setGiftWrap] = useState(false);
    const [quantity, setQuantity] = useState(1);

    const addToCart = () => {
        if (!product) return;

        if (typeof window !== "undefined") {
            try {
                const cart = JSON.parse(localStorage.getItem("cart") || "[]");
                const safeCart = Array.isArray(cart) ? cart : [];
                const cartItem = {
                    id: product.id,
                    title: product.title,
                    price: product.price,
                    quantity: quantity,
                    image: product.image,
                    size: selectedSize,
                    addCard,
                    cardMessage,
                    addChocolate,
                    giftWrap,
                };

                const existingIndex = safeCart.findIndex(
                    (item: any) => item.id === product.id
                );
                if (existingIndex >= 0) {
                    safeCart[existingIndex].quantity += quantity;
                } else {
                    safeCart.push(cartItem);
                }

                localStorage.setItem("cart", JSON.stringify(safeCart));
                window.dispatchEvent(new CustomEvent("cartUpdated"));

                // إشعار موحد
                showNotification("تم إضافة المنتج إلى السلة", "success");
            } catch (error) {
                console.error("خطأ:", error);
                localStorage.setItem("cart", "[]");
                showNotification("حدث خطأ في إضافة المنتج للسلة", "error");
            }
        }
    };

    const getTotalPrice = () => {
        if (!product) return 0;
        let total = product.price;
        const selectedSizeData = productData.sizes.find(
            (s) => s.value === selectedSize
        );
        if (selectedSizeData) total += selectedSizeData.price;
        if (addCard) total += productData.addons.card.price;
        if (addChocolate) total += productData.addons.chocolate.price;
        if (giftWrap) total += productData.addons.giftWrap.price;
        return total * quantity;
    };

    return (
        <DataLoader isLoading={isLoading} loadingText="جاري تحميل المنتج...">
            <div className="min-h-screen bg-gradient-to-br from-[#faf9f6] to-white">
                <Header />
                {!product ? (
                    <div className="max-w-7xl mx-auto px-4 py-20 text-center">
                        <div className="bg-white rounded-3xl shadow-xl p-12 max-w-md mx-auto">
                            <div className="w-20 h-20 bg-[#5A5E4D]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                                <svg
                                    className="w-10 h-10 text-[#5A5E4D]"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
                                </svg>
                            </div>
                            <h1 className="text-2xl font-bold text-gray-800 mb-4">
                                المنتج غير موجود
                            </h1>
                            <p className="text-gray-600 mb-6">
                                عذراً، لم نتمكن من العثور على المنتج المطلوب
                            </p>
                            <Link
                                href="/bouquets"
                                className="inline-block bg-[#5A5E4D] text-white px-8 py-3 rounded-full font-semibold hover:bg-[#4A4E3D] transition-all transform hover:scale-105"
                            >
                                العودة إلى الباقات
                            </Link>
                        </div>
                    </div>
                ) : (
                    <main className="max-w-7xl mx-auto px-4 py-8 lg:py-12">
                        {/* Breadcrumb */}
                        <nav className="flex items-center gap-2 text-sm mb-8">
                            <Link
                                href="/"
                                className="text-gray-500 hover:text-[#5A5E4D] transition-colors"
                            >
                                الرئيسية
                            </Link>
                            <span className="text-gray-400">/</span>
                            <Link
                                href="/bouquets"
                                className="text-gray-500 hover:text-[#5A5E4D] transition-colors"
                            >
                                الباقات
                            </Link>
                            <span className="text-gray-400">/</span>
                            <span className="text-[#5A5E4D] font-medium">
                                {product.title}
                            </span>
                        </nav>

                        {/* Product Content */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                            {/* Product Images */}
                            <div className="flex gap-3">
                                {/* Thumbnails on the side */}
                                <div className="flex flex-col gap-3 w-24">
                                    {product.images.map((image, index) => (
                                        <button
                                            key={index}
                                            onClick={() =>
                                                setSelectedImage(index)
                                            }
                                            className={`h-24 w-24 rounded-lg overflow-hidden border-2 transition-all ${
                                                selectedImage === index
                                                    ? "border-[#5A5E4D] ring-2 ring-[#5A5E4D]/30"
                                                    : "border-gray-200 hover:border-[#5A5E4D]/50"
                                            }`}
                                        >
                                            <Image
                                                src={image}
                                                alt={`${product.title} ${
                                                    index + 1
                                                }`}
                                                width={96}
                                                height={96}
                                                className="object-cover"
                                                quality={85}
                                                loading="lazy"
                                            />
                                        </button>
                                    ))}
                                </div>

                                {/* Main Image */}
                                <div
                                    className="flex-1 rounded-lg overflow-hidden bg-gray-50 shadow-md relative"
                                    style={{ height: "408px" }}
                                >
                                    <Image
                                        src={product.images[selectedImage]}
                                        alt={product.title}
                                        fill
                                        className="object-cover"
                                        priority={selectedImage === 0}
                                        loading={
                                            selectedImage === 0
                                                ? undefined
                                                : "lazy"
                                        }
                                        sizes="(max-width: 1024px) 100vw, 50vw"
                                        quality={90}
                                    />
                                </div>
                            </div>

                            {/* Product Info */}
                            <div className="space-y-4">
                                {/* Title & Price */}
                                <div>
                                    <h1 className="text-2xl font-bold text-gray-900 mb-2">
                                        {product.title}
                                    </h1>
                                    <div className="flex items-center gap-1 mb-2">
                                        {[...Array(5)].map((_, i) => (
                                            <svg
                                                key={i}
                                                className="w-3.5 h-3.5 text-yellow-400 fill-current"
                                                viewBox="0 0 20 20"
                                            >
                                                <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                                            </svg>
                                        ))}
                                    </div>
                                    <div className="flex items-baseline gap-2 mb-3">
                                        <span className="text-2xl font-bold text-[#5A5E4D]">
                                            {product.price}
                                        </span>
                                        <span className="text-base text-gray-600">
                                            {product.currency}
                                        </span>
                                    </div>
                                    <p className="text-sm text-gray-600 leading-relaxed">
                                        {product.description}
                                    </p>
                                </div>

                                <div className="border-t border-gray-200 pt-4">
                                    {/* Size Selection */}
                                    <div className="mb-4">
                                        <h3 className="text-sm font-semibold text-gray-900 mb-2">
                                            اختر الحجم
                                        </h3>
                                        <div className="flex gap-2">
                                            {productData.sizes.map((size) => (
                                                <button
                                                    key={size.value}
                                                    onClick={() =>
                                                        setSelectedSize(
                                                            size.value
                                                        )
                                                    }
                                                    className={`flex-1 px-3 py-2 rounded-lg border-2 transition-all ${
                                                        selectedSize ===
                                                        size.value
                                                            ? "border-[#5A5E4D] bg-[#5A5E4D] text-white"
                                                            : "border-gray-300 text-gray-700 hover:border-[#5A5E4D]"
                                                    }`}
                                                >
                                                    <div className="font-medium text-xs">
                                                        {size.label}
                                                    </div>
                                                    {size.price > 0 && (
                                                        <div className="text-[10px] mt-0.5">
                                                            +{size.price}{" "}
                                                            {product.currency}
                                                        </div>
                                                    )}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Addons */}
                                    <div className="mb-4">
                                        <h3 className="text-sm font-semibold text-gray-900 mb-2">
                                            إضافات اختيارية
                                        </h3>
                                        <div className="space-y-1.5">
                                            <label className="flex items-center justify-between p-2 rounded-lg border border-gray-200 cursor-pointer hover:bg-gray-50 transition-colors">
                                                <div className="flex items-center gap-2">
                                                    <input
                                                        type="checkbox"
                                                        checked={addCard}
                                                        onChange={(e) =>
                                                            setAddCard(
                                                                e.target.checked
                                                            )
                                                        }
                                                        className="w-3.5 h-3.5 text-[#5A5E4D] rounded focus:ring-[#5A5E4D]"
                                                    />
                                                    <span className="text-xs text-gray-700">
                                                        {
                                                            productData.addons
                                                                .card.label
                                                        }
                                                    </span>
                                                </div>
                                                <span className="text-xs text-[#5A5E4D] font-medium">
                                                    +
                                                    {
                                                        productData.addons.card
                                                            .price
                                                    }{" "}
                                                    {product.currency}
                                                </span>
                                            </label>

                                            <label className="flex items-center justify-between p-2 rounded-lg border border-gray-200 cursor-pointer hover:bg-gray-50 transition-colors">
                                                <div className="flex items-center gap-2">
                                                    <input
                                                        type="checkbox"
                                                        checked={addChocolate}
                                                        onChange={(e) =>
                                                            setAddChocolate(
                                                                e.target.checked
                                                            )
                                                        }
                                                        className="w-3.5 h-3.5 text-[#5A5E4D] rounded focus:ring-[#5A5E4D]"
                                                    />
                                                    <span className="text-xs text-gray-700">
                                                        {
                                                            productData.addons
                                                                .chocolate.label
                                                        }
                                                    </span>
                                                </div>
                                                <span className="text-xs text-[#5A5E4D] font-medium">
                                                    +
                                                    {
                                                        productData.addons
                                                            .chocolate.price
                                                    }{" "}
                                                    {product.currency}
                                                </span>
                                            </label>

                                            <label className="flex items-center justify-between p-2 rounded-lg border border-gray-200 cursor-pointer hover:bg-gray-50 transition-colors">
                                                <div className="flex items-center gap-2">
                                                    <input
                                                        type="checkbox"
                                                        checked={giftWrap}
                                                        onChange={(e) =>
                                                            setGiftWrap(
                                                                e.target.checked
                                                            )
                                                        }
                                                        className="w-3.5 h-3.5 text-[#5A5E4D] rounded focus:ring-[#5A5E4D]"
                                                    />
                                                    <span className="text-xs text-gray-700">
                                                        {
                                                            productData.addons
                                                                .giftWrap.label
                                                        }
                                                    </span>
                                                </div>
                                                <span className="text-xs text-[#5A5E4D] font-medium">
                                                    +
                                                    {
                                                        productData.addons
                                                            .giftWrap.price
                                                    }{" "}
                                                    {product.currency}
                                                </span>
                                            </label>
                                        </div>

                                        {addCard && (
                                            <div className="mt-2 animate-fadeIn">
                                                <label className="block text-xs font-medium text-gray-700 mb-1.5">
                                                    رسالة البطاقة
                                                </label>
                                                <textarea
                                                    value={cardMessage}
                                                    onChange={(e) =>
                                                        setCardMessage(
                                                            e.target.value
                                                        )
                                                    }
                                                    placeholder="اكتب رسالتك هنا..."
                                                    className="w-full px-2.5 py-2 border border-gray-300 rounded-lg focus:border-[#5A5E4D] focus:ring-1 focus:ring-[#5A5E4D] transition-all resize-none text-xs"
                                                    rows={2}
                                                />
                                            </div>
                                        )}
                                    </div>

                                    {/* Quantity & Add to Cart */}
                                    <div className="border-t border-gray-200 pt-4">
                                        <div className="flex items-center justify-between mb-3">
                                            <span className="text-sm font-semibold text-gray-900">
                                                الكمية
                                            </span>
                                            <div className="flex items-center gap-2">
                                                <button
                                                    onClick={() =>
                                                        setQuantity(
                                                            Math.max(
                                                                1,
                                                                quantity - 1
                                                            )
                                                        )
                                                    }
                                                    className="w-8 h-8 rounded-lg border border-gray-300 hover:border-[#5A5E4D] hover:bg-[#5A5E4D] hover:text-white flex items-center justify-center transition-all font-bold text-sm"
                                                >
                                                    -
                                                </button>
                                                <span className="text-lg font-bold w-8 text-center text-[#5A5E4D]">
                                                    {quantity}
                                                </span>
                                                <button
                                                    onClick={() =>
                                                        setQuantity(
                                                            quantity + 1
                                                        )
                                                    }
                                                    className="w-8 h-8 rounded-lg border border-gray-300 hover:border-[#5A5E4D] hover:bg-[#5A5E4D] hover:text-white flex items-center justify-center transition-all font-bold text-sm"
                                                >
                                                    +
                                                </button>
                                            </div>
                                        </div>

                                        {/* Total Price */}
                                        <div className="bg-gray-50 rounded-lg p-3 mb-3">
                                            <div className="flex items-center justify-between">
                                                <span className="text-sm text-gray-700 font-medium">
                                                    الإجمالي
                                                </span>
                                                <span className="text-xl font-bold text-[#5A5E4D]">
                                                    {getTotalPrice()}{" "}
                                                    {product.currency}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Add to Cart Button */}
                                        <button
                                            onClick={addToCart}
                                            className="w-full bg-[#5A5E4D] text-white py-2.5 px-4 rounded-lg font-semibold text-sm hover:bg-[#4A4E3D] transition-all flex items-center justify-center gap-2"
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
                                            إضافة إلى السلة
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </main>
                )}
                <Footer />
            </div>
        </DataLoader>
    );
}
