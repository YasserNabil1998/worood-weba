import Link from "next/link";

import { Home, Search, ShoppingBag, Heart } from "lucide-react";

export default function NotFound() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-[#FDFFF7] to-[#ECF1DD] flex flex-col">

            <main className="flex-1 flex items-center justify-center px-4 py-16">
                <div className="max-w-4xl w-full text-center">
                    {/* Large 404 Number with Flower Icon */}
                    <div className="relative mb-8">
                        <h1 className="text-[150px] md:text-[200px] font-bold text-[#8B9D83] opacity-20 leading-none">
                            404
                        </h1>
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                            <div className="text-8xl">🌸</div>
                        </div>
                    </div>

                    {/* Error Message */}
                    <div className="mb-12 space-y-4">
                        <h2 className="text-3xl md:text-4xl font-bold text-[#2C3E2B] mb-4">
                            عذراً، الصفحة غير موجودة
                        </h2>
                        <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
                            يبدو أن الصفحة التي تبحث عنها قد تم نقلها أو لم تعد
                            موجودة.
                            <br />
                            لكن لا تقلق، لدينا الكثير من الباقات الجميلة في
                            انتظارك!
                        </p>
                    </div>

                    {/* Decorative Divider */}
                    <div className="flex items-center justify-center mb-12 gap-4">
                        <div className="h-px bg-[#8B9D83] w-20"></div>
                        <span className="text-3xl">✿</span>
                        <div className="h-px bg-[#8B9D83] w-20"></div>
                    </div>

                    {/* Quick Links Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
                        <Link
                            href="/"
                            className="group bg-white hover:bg-[#F5F8F0] border-2 border-[#E1E8D8] hover:border-[#8B9D83] rounded-xl p-6 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg"
                        >
                            <div className="flex flex-col items-center gap-3">
                                <div className="w-12 h-12 bg-[#F5F8F0] group-hover:bg-[#8B9D83] rounded-full flex items-center justify-center transition-colors">
                                    <Home className="w-6 h-6 text-[#8B9D83] group-hover:text-white transition-colors" />
                                </div>
                                <span className="text-lg font-semibold text-[#2C3E2B]">
                                    الصفحة الرئيسية
                                </span>
                            </div>
                        </Link>

                        <Link
                            href="/bouquets"
                            className="group bg-white hover:bg-[#F5F8F0] border-2 border-[#E1E8D8] hover:border-[#8B9D83] rounded-xl p-6 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg"
                        >
                            <div className="flex flex-col items-center gap-3">
                                <div className="w-12 h-12 bg-[#F5F8F0] group-hover:bg-[#8B9D83] rounded-full flex items-center justify-center transition-colors">
                                    <Search className="w-6 h-6 text-[#8B9D83] group-hover:text-white transition-colors" />
                                </div>
                                <span className="text-lg font-semibold text-[#2C3E2B]">
                                    تصفح الباقات
                                </span>
                            </div>
                        </Link>

                        <Link
                            href="/occasions"
                            className="group bg-white hover:bg-[#F5F8F0] border-2 border-[#E1E8D8] hover:border-[#8B9D83] rounded-xl p-6 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg"
                        >
                            <div className="flex flex-col items-center gap-3">
                                <div className="w-12 h-12 bg-[#F5F8F0] group-hover:bg-[#8B9D83] rounded-full flex items-center justify-center transition-colors">
                                    <ShoppingBag className="w-6 h-6 text-[#8B9D83] group-hover:text-white transition-colors" />
                                </div>
                                <span className="text-lg font-semibold text-[#2C3E2B]">
                                    المناسبات
                                </span>
                            </div>
                        </Link>

                        <Link
                            href="/favorites"
                            className="group bg-white hover:bg-[#F5F8F0] border-2 border-[#E1E8D8] hover:border-[#8B9D83] rounded-xl p-6 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg"
                        >
                            <div className="flex flex-col items-center gap-3">
                                <div className="w-12 h-12 bg-[#F5F8F0] group-hover:bg-[#8B9D83] rounded-full flex items-center justify-center transition-colors">
                                    <Heart className="w-6 h-6 text-[#8B9D83] group-hover:text-white transition-colors" />
                                </div>
                                <span className="text-lg font-semibold text-[#2C3E2B]">
                                    المفضلة
                                </span>
                            </div>
                        </Link>
                    </div>

                    {/* Call to Action */}
                    <div className="bg-gradient-to-r from-[#8B9D83] to-[#6B8E5F] rounded-2xl p-8 text-white">
                        <h3 className="text-2xl font-bold mb-3">
                            هل تحتاج إلى مساعدة؟
                        </h3>
                        <p className="mb-6 text-white/90">
                            فريقنا جاهز لمساعدتك في اختيار الباقة المثالية
                            لمناسبتك
                        </p>
                        <Link
                            href="/contact"
                            className="inline-block bg-white text-[#8B9D83] hover:bg-[#F5F8F0] font-semibold px-8 py-3 rounded-full transition-colors shadow-lg hover:shadow-xl"
                        >
                            تواصل معنا
                        </Link>
                    </div>

                    {/* Decorative Flowers */}
                    <div className="mt-12 flex justify-center gap-4 text-4xl opacity-50">
                        <span
                            className="animate-bounce"
                            style={{ animationDelay: "0s" }}
                        >
                            🌹
                        </span>
                        <span
                            className="animate-bounce"
                            style={{ animationDelay: "0.2s" }}
                        >
                            🌺
                        </span>
                        <span
                            className="animate-bounce"
                            style={{ animationDelay: "0.4s" }}
                        >
                            🌻
                        </span>
                        <span
                            className="animate-bounce"
                            style={{ animationDelay: "0.6s" }}
                        >
                            🌷
                        </span>
                    </div>
                </div>
            </main>

        </div>
    );
}
