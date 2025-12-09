import Link from "next/link";
import { Instagram, Twitter, Facebook, MessageCircle } from "lucide-react";
import { fontStyle } from "@/lib/styles";
import { COLORS } from "@/constants";

const Footer = () => {
  return (
    <footer className="text-white" style={{ backgroundColor: COLORS.PRIMARY_DARK }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 mb-6">
          {/* About Us */}
          <div className="sm:col-span-2 md:col-span-1">
            <h3 className="text-base md:text-lg font-semibold mb-3" style={fontStyle}>
              زهور الشمس
            </h3>
            <p className="text-gray-300 leading-relaxed text-sm" style={fontStyle}>
              أجمل الباقات لأجمل المناسبات. تقدم خدمات تنسيق الزهور لجميع المناسبات بأعلى جودة وأفضل
              الأسعار.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-base md:text-lg font-semibold mb-3" style={fontStyle}>
              روابط سريعة
            </h3>
            <ul className="space-y-2 text-sm" style={fontStyle}>
              <li>
                <Link href="/bouquets" className="text-gray-300 hover:text-white transition-colors">
                  الباقات الجاهزة
                </Link>
              </li>
              <li>
                <Link href="/custom" className="text-gray-300 hover:text-white transition-colors">
                  تنسيق باقة خاصة
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-white transition-colors">
                  الاشتراكات
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Us */}
          <div>
            <h3 className="text-base md:text-lg font-semibold mb-3" style={fontStyle}>
              تواصل معنا
            </h3>
            <div className="flex items-center gap-3 sm:gap-4 mb-3">
              <a
                href="#"
                aria-label="Instagram"
                className="text-gray-300 hover:text-white transition-colors"
              >
                <Instagram className="w-5 h-5 sm:w-6 sm:h-6" />
              </a>
              <a
                href="#"
                aria-label="Twitter"
                className="text-gray-300 hover:text-white transition-colors"
              >
                <Twitter className="w-5 h-5 sm:w-6 sm:h-6" />
              </a>
              <a
                href="#"
                aria-label="Facebook"
                className="text-gray-300 hover:text-white transition-colors"
              >
                <Facebook className="w-5 h-5 sm:w-6 sm:h-6" />
              </a>
              <a
                href="#"
                aria-label="WhatsApp"
                className="text-gray-300 hover:text-white transition-colors"
              >
                <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6" />
              </a>
            </div>
            <div className="space-y-1 text-sm" style={fontStyle}>
              <p className="text-gray-300">+966 12 345 6789</p>
              <p className="text-gray-300">info@shamsflowers.com</p>
            </div>
          </div>
        </div>

        <div className="mt-4 pt-4 sm:pt-6 border-t border-white/10">
          <div className="text-center">
            <p className="text-gray-300 text-xs sm:text-sm" style={fontStyle}>
              جميع الحقوق محفوظة زهور الشمس © 2025
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
