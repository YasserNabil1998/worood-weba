"use client";
import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useNotification } from "@/src/providers/notification-provider";
import { ASSETS } from "@/src/assets";
import { useCart } from "@/src/hooks/useCart";
import { usePageSearch } from "@/src/hooks/usePageSearch";
import { storage } from "@/src/lib/utils";
import { NAVIGATION_LINKS } from "@/src/constants/routes";
import { Menu } from "lucide-react";
import HeaderActions from "./HeaderActions";
import SearchModal from "./SearchModal";

const SCROLL_THRESHOLD = 10;
const SCROLL_HIDE_THRESHOLD = 100;

const Header = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { showNotification } = useNotification();
  const { totalItems } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { searchQuery, setSearchQuery, searchResults, clearSearch } = usePageSearch(isSearchOpen);

  // إخفاء/إظهار الهيدر عند السكرول
  useEffect(() => {
    const controlNavbar = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY < SCROLL_THRESHOLD) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > SCROLL_HIDE_THRESHOLD) {
        setIsVisible(false);
        setIsMenuOpen(false);
      } else if (currentScrollY < lastScrollY) {
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", controlNavbar);
    return () => window.removeEventListener("scroll", controlNavbar);
  }, [lastScrollY]);

  const handleLogout = () => {
    // مسح بيانات المستخدم من localStorage
    storage.remove("user");
    storage.remove("authToken");

    showNotification("تم تسجيل الخروج بنجاح! 👋", "success");

    setTimeout(() => {
      router.push("/login");
    }, 1000);
  };

  const isActivePage = (path: string) => {
    if (path === "/" && pathname === "/") return true;
    if (path !== "/" && pathname.startsWith(path)) return true;
    return false;
  };


  const scrollToResult = (element: HTMLElement) => {
    element.scrollIntoView({ behavior: "smooth", block: "center" });

    element.style.backgroundColor = "rgba(255, 255, 0, 0.3)";
    element.style.transition = "background-color 0.3s";

    setTimeout(() => {
      element.style.backgroundColor = "";
    }, 2000);

    setIsSearchOpen(false);
    clearSearch();
  };

  const handleCloseSearch = useCallback(() => {
    setIsSearchOpen(false);
    clearSearch();
  }, [clearSearch]);

  return (
    <header
      className={`bg-white/95 backdrop-blur fixed top-0 left-0 right-0 z-50 shadow-md transition-transform duration-300 ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-12">
        <div className="hidden lg:flex justify-between items-center h-20">
          <Link href="/" className="flex items-center">
            <Image
              src={ASSETS.logos.main}
              alt="زهور الشمس"
              width={200}
              height={48}
              className="h-12 w-auto object-contain"
              style={{ maxWidth: '200px', height: '48px', width: 'auto' }}
              priority
            />
          </Link>

          <nav className="flex items-center gap-12">
            {NAVIGATION_LINKS.map((link) => (
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

          <div className="flex items-center gap-8">
            <HeaderActions
              totalItems={totalItems}
              onLogout={handleLogout}
              onSearchClick={() => setIsSearchOpen(!isSearchOpen)}
              badgeClassName="-top-2 -right-2 text-responsive-xs"
            />
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
              style={{ maxWidth: '200px', height: '48px', width: 'auto' }}
              priority
            />
          </Link>

          {/* Right: Icons */}
          <div className="flex items-center gap-6">
            <HeaderActions
              totalItems={totalItems}
              onLogout={handleLogout}
              onSearchClick={() => setIsSearchOpen(!isSearchOpen)}
              className=""
            />
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
              style={{ maxWidth: '200px', height: '40px', width: 'auto' }}
              priority
            />
          </Link>

          {/* Right: Icons */}
          <div className="flex items-center gap-4">
            <HeaderActions
              totalItems={totalItems}
              onLogout={handleLogout}
              onSearchClick={() => setIsSearchOpen(!isSearchOpen)}
              className=""
            />
          </div>
        </div>

        {/* ✅ Mobile & Tablet Sidebar Menu */}
        {isMenuOpen && (
          <div className="lg:hidden absolute top-16 md:top-16 left-0 w-full bg-white border-t shadow-lg animate-in slide-in-from-top-2">
            <nav className="px-4 py-4 space-y-2">
              {NAVIGATION_LINKS.map((link) => (
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
        <SearchModal
          isOpen={isSearchOpen}
          searchQuery={searchQuery}
          searchResults={searchResults}
          onClose={handleCloseSearch}
          onSearchQueryChange={setSearchQuery}
          onScrollToResult={scrollToResult}
        />
      </div>
    </header>
  );
};

export default Header;
