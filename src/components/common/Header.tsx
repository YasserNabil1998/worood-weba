"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useNotification } from "@/src/providers/notification-provider";
import { ASSETS } from "@/src/assets";
import { useCart } from "@/src/hooks/useCart";
import { storage } from "@/src/lib/utils";
import { ShoppingCart, User, Menu } from "lucide-react";

const Header = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { showNotification } = useNotification();
  const { totalItems } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // إخفاء/إظهار الهيدر عند السكرول
  useEffect(() => {
    const controlNavbar = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY < 10) {
        // إذا كنا في أعلى الصفحة، أظهر الهيدر دائماً
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // السكرول للأسفل - إخفاء الهيدر
        setIsVisible(false);
        setIsMenuOpen(false); // إغلاق القائمة إذا كانت مفتوحة
        setIsUserMenuOpen(false); // إغلاق قائمة المستخدم
      } else if (currentScrollY < lastScrollY) {
        // السكرول للأعلى - إظهار الهيدر
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", controlNavbar);
    return () => window.removeEventListener("scroll", controlNavbar);
  }, [lastScrollY]);

  // إغلاق القائمة عند النقر خارجها
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (
        !target.closest(".user-menu-dropdown") &&
        !target.closest(".user-menu-button")
      ) {
        setIsUserMenuOpen(false);
      }
    };
    if (isUserMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isUserMenuOpen]);

  const handleLogout = () => {
    // مسح بيانات المستخدم من localStorage
    storage.remove("user");
    storage.remove("authToken");

    setIsUserMenuOpen(false);

    // عرض إشعار تسجيل الخروج
    showNotification("تم تسجيل الخروج بنجاح! 👋", "success");

    // الانتقال إلى صفحة تسجيل الدخول بعد قليل
    setTimeout(() => {
      router.push("/login");
    }, 1000);
  };

  const isActivePage = (path: string) => {
    if (path === "/" && pathname === "/") return true;
    if (path !== "/" && pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <header
      className={`bg-white/95 backdrop-blur fixed top-0 left-0 right-0 z-50 shadow-md transition-transform duration-300 ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-12">
        {/* ✅ Desktop Header (lg and above) */}
        <div className="hidden lg:flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src={ASSETS.logos.main}
              alt="زهور الشمس"
              width={200}
              height={48}
              className="h-12 w-auto object-contain"
              priority
            />
          </Link>

          {/* Navigation */}
          <nav className="flex items-center gap-12">
            {[
              { href: "/", label: "الرئيسية" },
              { href: "/bouquets", label: "الباقات الجاهزة" },
              { href: "/custom", label: "تنسيق خاص" },
              { href: "/contact", label: "تواصل معنا" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-[15px] font-medium relative transition-all duration-200 hover:scale-105 ${
                  isActivePage(link.href)
                    ? "text-[#5A5E4D] font-bold"
                    : "text-gray-700 hover:text-[#5A5E4D]"
                }`}
              >
                {link.label}
                <span
                  className={`absolute bottom-[-4px] left-0 h-0.5 bg-[#5A5E4D] transition-all duration-300 ${
                    isActivePage(link.href) ? "w-full" : "w-0"
                  }`}
                ></span>
              </Link>
            ))}
          </nav>

          {/* Right icons */}
          <div className="flex items-center gap-8">
            {/* Cart */}
            <Link
              href="/cart"
              className="relative flex items-center gap-2 text-gray-700 hover:text-[#5A5E4D] transition-all"
            >
              <ShoppingCart className="w-6 h-6" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] rounded-full h-4 w-4 flex items-center justify-center font-bold">
                  {totalItems}
                </span>
              )}
              <span className="text-[15px] font-medium">السلة</span>
            </Link>

            {/* User */}
            <div className="relative">
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="user-menu-button flex items-center gap-2 text-gray-700 hover:text-[#5A5E4D] transition-all"
              >
                <User className="w-6 h-6" />
                <span className="text-[15px] font-medium">حسابي</span>
              </button>

              {/* Dropdown */}
              {isUserMenuOpen && (
                <div className="user-menu-dropdown absolute left-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                  <div className="py-2">
                    <Link
                      href="/profile"
                      onClick={() => setIsUserMenuOpen(false)}
                      className="block px-4 py-2 hover:bg-gray-50 text-gray-700"
                    >
                      الملف الشخصي
                    </Link>
                    <Link
                      href="/orders"
                      onClick={() => setIsUserMenuOpen(false)}
                      className="block px-4 py-2 hover:bg-gray-50 text-gray-700"
                    >
                      طلباتي
                    </Link>
                    <Link
                      href="/favorites"
                      onClick={() => setIsUserMenuOpen(false)}
                      className="block px-4 py-2 hover:bg-gray-50 text-gray-700"
                    >
                      المفضلة
                    </Link>
                    <div className="border-t border-gray-100 my-1"></div>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-right text-red-600 px-4 py-2 hover:bg-red-50"
                    >
                      تسجيل الخروج
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ✅ Tablet Header (iPad - md to lg) */}
        <div className="hidden md:flex lg:hidden items-center justify-between h-16 px-2">
          {/* Left: Menu Icon */}
          <button
            className="p-2 text-gray-700 hover:text-[#5A5E4D] transition"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu className="w-6 h-6" />
          </button>

          {/* Center: Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src={ASSETS.logos.alternate}
              alt="زهور الشمس"
              width={200}
              height={48}
              className="h-12 w-auto object-contain"
              priority
            />
          </Link>

          {/* Right: Icons */}
          <div className="flex items-center gap-6">
            <Link
              href="/cart"
              className="relative flex items-center gap-2 text-gray-700 hover:text-[#5A5E4D]"
            >
              <ShoppingCart className="w-6 h-6" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] rounded-full h-4 w-4 flex items-center justify-center font-bold">
                  {totalItems}
                </span>
              )}
              <span className="text-sm font-medium">السلة</span>
            </Link>

            <div className="relative">
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="user-menu-button flex items-center gap-2 text-gray-700 hover:text-[#5A5E4D]"
              >
                <User className="w-6 h-6" />
                <span className="text-sm font-medium">حسابي</span>
              </button>

              {isUserMenuOpen && (
                <div className="user-menu-dropdown absolute left-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                  <div className="py-2">
                    <Link
                      href="/profile"
                      onClick={() => setIsUserMenuOpen(false)}
                      className="block px-4 py-2 hover:bg-gray-50 text-gray-700"
                    >
                      الملف الشخصي
                    </Link>
                    <Link
                      href="/orders"
                      onClick={() => setIsUserMenuOpen(false)}
                      className="block px-4 py-2 hover:bg-gray-50 text-gray-700"
                    >
                      طلباتي
                    </Link>
                    <Link
                      href="/favorites"
                      onClick={() => setIsUserMenuOpen(false)}
                      className="block px-4 py-2 hover:bg-gray-50 text-gray-700"
                    >
                      المفضلة
                    </Link>
                    <div className="border-t border-gray-100 my-1"></div>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-right text-red-600 px-4 py-2 hover:bg-red-50"
                    >
                      تسجيل الخروج
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ✅ Mobile Header (below md) */}
        <div className="md:hidden flex items-center justify-between h-16">
          {/* Left: Menu Icon */}
          <button
            className="p-2 text-gray-700 hover:text-[#5A5E4D] transition"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu className="w-6 h-6" />
          </button>

          {/* Center: Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src={ASSETS.logos.alternate}
              alt="زهور الشمس"
              width={200}
              height={40}
              className="h-10 w-auto object-contain mx-auto"
              priority
            />
          </Link>

          {/* Right: Icons */}
          <div className="flex items-center gap-4">
            <Link
              href="/cart"
              className="relative text-gray-700 hover:text-[#5A5E4D]"
            >
              <ShoppingCart className="w-6 h-6" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] rounded-full h-4 w-4 flex items-center justify-center font-bold">
                  {totalItems}
                </span>
              )}
            </Link>

            <div className="relative">
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="user-menu-button text-gray-700 hover:text-[#5A5E4D]"
              >
                <User className="w-6 h-6" />
              </button>

              {/* Mobile User Menu Dropdown */}
              {isUserMenuOpen && (
                <div className="user-menu-dropdown absolute left-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                  <div className="py-2">
                    <Link
                      href="/profile"
                      onClick={() => setIsUserMenuOpen(false)}
                      className="block px-4 py-2 hover:bg-gray-50 text-gray-700"
                    >
                      الملف الشخصي
                    </Link>
                    <Link
                      href="/orders"
                      onClick={() => setIsUserMenuOpen(false)}
                      className="block px-4 py-2 hover:bg-gray-50 text-gray-700"
                    >
                      طلباتي
                    </Link>
                    <Link
                      href="/favorites"
                      onClick={() => setIsUserMenuOpen(false)}
                      className="block px-4 py-2 hover:bg-gray-50 text-gray-700"
                    >
                      المفضلة
                    </Link>
                    <div className="border-t border-gray-100 my-1"></div>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-right text-red-600 px-4 py-2 hover:bg-red-50"
                    >
                      تسجيل الخروج
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ✅ Mobile & Tablet Sidebar Menu */}
        {isMenuOpen && (
          <div className="lg:hidden absolute top-16 md:top-16 left-0 w-full bg-white border-t shadow-lg animate-in slide-in-from-top-2">
            <nav className="px-4 py-4 space-y-2">
              {[
                { href: "/", label: "الرئيسية" },
                { href: "/bouquets", label: "الباقات الجاهزة" },
                { href: "/custom", label: "تنسيق خاص" },
                { href: "/contact", label: "تواصل معنا" },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`block px-3 py-2 rounded-lg text-[15px] ${
                    isActivePage(link.href)
                      ? "text-[#5A5E4D] font-bold bg-gray-50 border-r-4 border-[#5A5E4D]"
                      : "text-gray-700 hover:text-[#5A5E4D] hover:bg-gray-50"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
