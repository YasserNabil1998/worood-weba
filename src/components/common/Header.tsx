"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useNotification } from "@/src/providers/notification-provider";
import { ASSETS } from "@/src/assets";
import { useCart } from "@/src/hooks/useCart";
import { storage } from "@/src/lib/utils";
import { ShoppingCart, User, Menu, Search, X } from "lucide-react";

const Header = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { showNotification } = useNotification();
  const { totalItems } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<
    Array<{ element: HTMLElement; text: string; context: string }>
  >([]);

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
      if (!target.closest(".user-menu-dropdown") && !target.closest(".user-menu-button")) {
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

  // وظيفة البحث في محتوى الصفحة
  const performSearch = (query: string) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    const results: Array<{ element: HTMLElement; text: string; context: string }> = [];
    const searchText = query.trim().toLowerCase();

    // البحث في جميع العناصر النصية في الصفحة
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
      acceptNode: (node) => {
        // تجاهل العناصر المخفية أو في scripts/styles
        const parent = node.parentElement;
        if (!parent) return NodeFilter.FILTER_REJECT;

        const style = window.getComputedStyle(parent);
        if (
          style.display === "none" ||
          style.visibility === "hidden" ||
          parent.tagName === "SCRIPT" ||
          parent.tagName === "STYLE" ||
          parent.closest("header") ||
          parent.closest("nav") ||
          parent.closest("[role='dialog']") ||
          parent.closest(".search-modal")
        ) {
          return NodeFilter.FILTER_REJECT;
        }

        const text = node.textContent || "";
        if (text.trim().length < 2) return NodeFilter.FILTER_REJECT;

        if (text.toLowerCase().includes(searchText)) {
          return NodeFilter.FILTER_ACCEPT;
        }
        return NodeFilter.FILTER_REJECT;
      },
    });

    let node;
    const processedElements = new Set<HTMLElement>();

    while ((node = walker.nextNode())) {
      const parent = node.parentElement;
      if (!parent || processedElements.has(parent)) continue;

      // تجنب العناصر الصغيرة جداً
      if (parent.textContent && parent.textContent.trim().length < 3) continue;

      processedElements.add(parent);
      const text = node.textContent || "";

      // الحصول على سياق النص (60 حرف قبل وبعد)
      const index = text.toLowerCase().indexOf(searchText);
      if (index !== -1) {
        const start = Math.max(0, index - 60);
        const end = Math.min(text.length, index + searchText.length + 60);
        let context = text.substring(start, end);

        // إضافة "..." في البداية والنهاية إذا كان هناك نص أكثر
        if (start > 0) context = "..." + context;
        if (end < text.length) context = context + "...";

        results.push({
          element: parent,
          text: text.trim(),
          context: context.trim(),
        });
      }
    }

    setSearchResults(results.slice(0, 10)); // حد أقصى 10 نتائج
  };

  // معالجة تغيير نص البحث
  useEffect(() => {
    if (isSearchOpen) {
      const timeoutId = setTimeout(() => {
        performSearch(searchQuery);
      }, 300); // تأخير 300ms للبحث

      return () => clearTimeout(timeoutId);
    }
  }, [searchQuery, isSearchOpen]);

  // الانتقال إلى العنصر عند النقر على نتيجة
  const scrollToResult = (element: HTMLElement) => {
    element.scrollIntoView({ behavior: "smooth", block: "center" });

    // تمييز العنصر مؤقتاً
    element.style.backgroundColor = "rgba(255, 255, 0, 0.3)";
    element.style.transition = "background-color 0.3s";

    setTimeout(() => {
      element.style.backgroundColor = "";
    }, 2000);

    setIsSearchOpen(false);
    setSearchQuery("");
    setSearchResults([]);
  };

  // إغلاق البحث عند الضغط على ESC
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isSearchOpen) {
        setIsSearchOpen(false);
        setSearchQuery("");
        setSearchResults([]);
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isSearchOpen]);

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
                className={`text-responsive-base font-medium relative transition-all duration-200 hover:scale-105 ${
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
            {/* Search */}
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="flex items-center gap-2 text-gray-700 hover:text-[#5A5E4D] transition-all"
              aria-label="فتح البحث"
            >
              <Search className="w-6 h-6" />
            </button>

            {/* Cart */}
            <Link
              href="/cart"
              className="relative flex items-center gap-2 text-gray-700 hover:text-[#5A5E4D] transition-all"
              aria-label={totalItems > 0 ? `السلة (${totalItems} منتج)` : "السلة"}
            >
              <ShoppingCart className="w-6 h-6" fill="currentColor" />
              <span className="sr-only">السلة</span>
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#5A5E4D] text-white text-responsive-xs rounded-full h-4 w-4 flex items-center justify-center font-bold">
                  {totalItems}
                </span>
              )}
            </Link>

            {/* User */}
            <div className="relative">
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="user-menu-button flex items-center gap-2 text-gray-700 hover:text-[#5A5E4D] transition-all"
                aria-label="فتح قائمة المستخدم"
                aria-expanded={isUserMenuOpen}
              >
                <User className="w-6 h-6" fill="currentColor" />
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
            aria-label="فتح القائمة"
            aria-expanded={isMenuOpen}
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
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="text-gray-700 hover:text-[#5A5E4D] transition"
              aria-label="فتح البحث"
            >
              <Search className="w-6 h-6" />
            </button>

            <Link
              href="/cart"
              className="relative flex items-center gap-2 text-gray-700 hover:text-[#5A5E4D]"
              aria-label={totalItems > 0 ? `السلة (${totalItems} منتج)` : "السلة"}
            >
              <ShoppingCart className="w-6 h-6" fill="currentColor" />
              <span className="sr-only">السلة</span>
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#5A5E4D] text-white text-[10px] rounded-full h-4 w-4 flex items-center justify-center font-bold">
                  {totalItems}
                </span>
              )}
            </Link>

            <div className="relative">
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="user-menu-button flex items-center gap-2 text-gray-700 hover:text-[#5A5E4D]"
                aria-label="فتح قائمة المستخدم"
                aria-expanded={isUserMenuOpen}
              >
                <User className="w-6 h-6" fill="currentColor" />
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
            aria-label="فتح القائمة"
            aria-expanded={isMenuOpen}
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
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="text-gray-700 hover:text-[#5A5E4D] transition"
              aria-label="فتح البحث"
            >
              <Search className="w-6 h-6" />
            </button>

            <Link
              href="/cart"
              className="relative text-gray-700 hover:text-[#5A5E4D]"
              aria-label={totalItems > 0 ? `السلة (${totalItems} منتج)` : "السلة"}
            >
              <ShoppingCart className="w-6 h-6" fill="currentColor" />
              <span className="sr-only">السلة</span>
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#5A5E4D] text-white text-[10px] rounded-full h-4 w-4 flex items-center justify-center font-bold">
                  {totalItems}
                </span>
              )}
            </Link>

            <div className="relative">
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="user-menu-button text-gray-700 hover:text-[#5A5E4D]"
                aria-label="فتح قائمة المستخدم"
                aria-expanded={isUserMenuOpen}
              >
                <User className="w-6 h-6" fill="currentColor" />
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
                  className={`block px-3 py-2 rounded-lg text-responsive-base ${
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

        {/* Search Modal */}
        {isSearchOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-100 flex items-start justify-end pt-20 px-4 search-modal"
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                setIsSearchOpen(false);
                setSearchQuery("");
                setSearchResults([]);
              }
            }}
          >
            <div className="bg-white rounded-lg shadow-xl w-full max-w-xl max-h-[70vh] flex flex-col overflow-hidden">
              {/* Search Input */}
              <div className="flex items-center gap-3 p-4 border-b">
                <Search className="w-5 h-5 text-gray-400 shrink-0" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="ابحث في الصفحة..."
                  className="flex-1 outline-none text-gray-800 placeholder-gray-400"
                  autoFocus
                />
                <button
                  onClick={() => {
                    setIsSearchOpen(false);
                    setSearchQuery("");
                    setSearchResults([]);
                  }}
                  className="text-gray-400 hover:text-gray-600 transition"
                  aria-label="إغلاق البحث"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Search Results */}
              <div className="flex-1 overflow-y-auto p-4">
                {searchQuery.trim() && searchResults.length === 0 ? (
                  <div className="text-center text-gray-500 py-8">
                    <p className="text-sm">لم يتم العثور على نتائج</p>
                  </div>
                ) : searchResults.length > 0 ? (
                  <div className="space-y-1">
                    <p className="text-xs text-gray-500 mb-3">
                      {searchResults.length} {searchResults.length === 1 ? "نتيجة" : "نتائج"}
                    </p>
                    {searchResults.map((result, index) => (
                      <button
                        key={index}
                        onClick={() => scrollToResult(result.element)}
                        className="w-full text-right p-3 rounded-lg hover:bg-gray-50 transition text-sm text-gray-700"
                      >
                        <p className="line-clamp-2">{result.context}</p>
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="text-center text-gray-400 py-8">
                    <p className="text-sm">ابدأ الكتابة للبحث</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
