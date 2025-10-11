import Link from "next/link";
import Image from "next/image";

const Footer = () => {
    return (
        <footer className="text-white" style={{ backgroundColor: "#0F2433" }}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 mb-6">
                    {/* About Us */}
                    <div className="sm:col-span-2 md:col-span-1">
                        <h3
                            className="text-base md:text-lg font-semibold mb-3"
                            style={{ fontFamily: "var(--font-almarai)" }}
                        >
                            زهور الشمس
                        </h3>
                        <p
                            className="text-gray-300 leading-relaxed text-sm"
                            style={{ fontFamily: "var(--font-almarai)" }}
                        >
                            أجمل الباقات لأجمل المناسبات. تقدم خدمات تنسيق
                            الزهور لجميع المناسبات بأعلى جودة وأفضل الأسعار.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3
                            className="text-base md:text-lg font-semibold mb-3"
                            style={{ fontFamily: "var(--font-almarai)" }}
                        >
                            روابط سريعة
                        </h3>
                        <ul
                            className="space-y-2 text-sm"
                            style={{ fontFamily: "var(--font-almarai)" }}
                        >
                            <li>
                                <Link
                                    href="/bouquets"
                                    className="text-gray-300 hover:text-white transition-colors"
                                >
                                    الباقات الجاهزة
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/custom"
                                    className="text-gray-300 hover:text-white transition-colors"
                                >
                                    تنسيق باقة خاصة
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/contact"
                                    className="text-gray-300 hover:text-white transition-colors"
                                >
                                    الاشتراكات
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/blog"
                                    className="text-gray-300 hover:text-white transition-colors"
                                >
                                    المدونة
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Us */}
                    <div>
                        <h3
                            className="text-base md:text-lg font-semibold mb-3"
                            style={{ fontFamily: "var(--font-almarai)" }}
                        >
                            تواصل معنا
                        </h3>
                        <div className="flex items-center gap-3 sm:gap-4 mb-3">
                            <a
                                href="#"
                                aria-label="Instagram"
                                className="text-gray-300 hover:text-white transition-colors"
                            >
                                <svg
                                    className="w-5 h-5 sm:w-6 sm:h-6"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.746-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001.012.001z" />
                                </svg>
                            </a>
                            <a
                                href="#"
                                aria-label="Twitter"
                                className="text-gray-300 hover:text-white transition-colors"
                            >
                                <svg
                                    className="w-5 h-5 sm:w-6 sm:h-6"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                                </svg>
                            </a>
                            <a
                                href="#"
                                aria-label="Facebook"
                                className="text-gray-300 hover:text-white transition-colors"
                            >
                                <svg
                                    className="w-5 h-5 sm:w-6 sm:h-6"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                </svg>
                            </a>
                            <a
                                href="#"
                                aria-label="WhatsApp"
                                className="text-gray-300 hover:text-white transition-colors"
                            >
                                <svg
                                    className="w-5 h-5 sm:w-6 sm:h-6"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
                                </svg>
                            </a>
                        </div>
                        <div
                            className="space-y-1 text-sm"
                            style={{ fontFamily: "var(--font-almarai)" }}
                        >
                            <p className="text-gray-300">+966 12 345 6789</p>
                            <p className="text-gray-300">
                                info@shamsflowers.com
                            </p>
                        </div>
                    </div>
                </div>

                <div className="mt-4 pt-4 sm:pt-6 border-t border-white/10">
                    <div className="text-center">
                        <p
                            className="text-gray-300 text-xs sm:text-sm"
                            style={{ fontFamily: "var(--font-almarai)" }}
                        >
                            جميع الحقوق محفوظة زهور الشمس © 2025
                        </p>
                        <div className="mt-2 sm:mt-3 flex items-center justify-center gap-2 sm:gap-3 opacity-90">
                            <Image
                                src="/images/payment/visa.png"
                                alt="Visa"
                                width={60}
                                height={40}
                                className="h-8 sm:h-10 w-auto object-cover"
                                loading="lazy"
                            />
                            <Image
                                src="/images/payment/mastercard.png"
                                alt="Mastercard"
                                width={60}
                                height={40}
                                className="h-8 sm:h-10 w-auto object-cover"
                                loading="lazy"
                            />
                            <Image
                                src="/images/payment/apple-pay.png"
                                alt="Apple Pay"
                                width={60}
                                height={40}
                                className="h-8 sm:h-10 w-auto object-cover"
                                loading="lazy"
                            />
                            <Image
                                src="/images/payment/paypal.png"
                                alt="PayPal"
                                width={60}
                                height={40}
                                className="h-8 sm:h-10 w-auto object-cover"
                                loading="lazy"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
