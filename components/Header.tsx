'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  // تحديث عداد السلة
  useEffect(() => {
    const updateCartCount = () => {
      const cart = JSON.parse(localStorage.getItem('cart') || '[]');
      const totalItems = cart.reduce((sum: number, item: any) => sum + (item.quantity || 1), 0);
      setCartCount(totalItems);
    };

    updateCartCount();
    
    // الاستماع لتغييرات السلة
    window.addEventListener('storage', updateCartCount);
    window.addEventListener('cartUpdated', updateCartCount);

    return () => {
      window.removeEventListener('storage', updateCartCount);
      window.removeEventListener('cartUpdated', updateCartCount);
    };
  }, []);

  // إغلاق القوائم المنسدلة عند النقر خارجها
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.user-menu-dropdown') && !target.closest('.user-menu-button')) {
        setIsUserMenuOpen(false);
      }
    };

    if (isUserMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isUserMenuOpen]);

  // تسجيل الخروج
  const handleLogout = () => {
    // هنا يمكن إضافة منطق تسجيل الخروج
    alert('تم تسجيل الخروج بنجاح');
    setIsUserMenuOpen(false);
  };

  return (
    <header className="bg-white/95 backdrop-blur sticky top-0 z-50">
      <div className="w-full mx-auto px-8 sm:px-12 lg:px-16 xl:px-24 2xl:px-32">
        <div className="flex justify-between items-center h-20">
          {/* Left side - Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <img
                src="/images/log.png"
                alt="زهور الشمس"
                className="h-12 w-auto object-contain"
              />
            </Link>
          </div>

          {/* Center - Desktop Navigation */}
          <nav className="hidden md:flex flex-1 items-center justify-center gap-12">
            <Link href="/" className="text-[15px] text-gray-700 hover:text-gray-900 transition-colors font-medium">
              الرئيسية
            </Link>
            <Link href="/bouquets" className="text-[15px] text-gray-700 hover:text-gray-900 transition-colors font-medium">
              الباقات الجاهزة
            </Link>
            <Link href="/custom" className="text-[15px] text-gray-700 hover:text-gray-900 transition-colors font-medium">
              تنسيق خاص
            </Link>
            <Link href="/occasions" className="text-[15px] text-gray-700 hover:text-gray-900 transition-colors font-medium">
              المناسبات
            </Link>
            <Link href="/blog" className="text-[15px] text-gray-700 hover:text-gray-900 transition-colors font-medium">
              المدونة
            </Link>
            <Link href="/contact" className="text-[15px] text-gray-700 hover:text-gray-900 transition-colors font-medium">
              تواصل معنا
            </Link>
          </nav>

          {/* Right side - Icons */}
          <div className="flex items-center gap-10 text-gray-700">
            {/* Search Icon */}
            <button 
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-2 hover:text-gray-900 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>

            {/* Cart Button */}
            <Link 
              href="/cart" 
              className="flex items-center gap-3 text-gray-700 hover:text-gray-900 transition-colors relative"
            >
              <span className="text-[15px] font-medium" style={{fontFamily:'var(--font-almarai)'}}>
                السلة
              </span>
              <div className="w-7 h-7 rounded-full border-2 border-current flex items-center justify-center relative">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] rounded-full h-4 w-4 flex items-center justify-center font-bold">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* User Button */}
            <div className="relative">
              <button 
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="user-menu-button flex items-center gap-3 text-gray-700 hover:text-gray-900 transition-colors"
              >
                <span className="text-[15px] font-medium" style={{fontFamily:'var(--font-almarai)'}}>
                  حسابي
                </span>
                <div className="w-7 h-7 rounded-full border-2 border-current flex items-center justify-center">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                  </svg>
                </div>
              </button>

              {/* User Menu Dropdown */}
              {isUserMenuOpen && (
                <div className="user-menu-dropdown absolute left-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                  <div className="py-2">
                    <Link 
                      href="/profile"
                      className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      <span style={{fontFamily:'var(--font-almarai)'}}>الملف الشخصي</span>
                    </Link>
                    
                    <Link 
                      href="/profile"
                      className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
                      </svg>
                      <span style={{fontFamily:'var(--font-almarai)'}}>طلباتي</span>
                    </Link>
                    
                    <Link 
                      href="/profile"
                      className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.636l1.318-1.318a4.5 4.5 0 116.364 6.364L12 21l-7.682-7.682a4.5 4.5 0 010-6.364z" />
                      </svg>
                      <span style={{fontFamily:'var(--font-almarai)'}}>المفضلة</span>
                    </Link>
                    
                    <div className="border-t border-gray-100 my-1"></div>
                    
                    <button 
                      onClick={handleLogout}
                      className="flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 transition-colors w-full text-right"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                      </svg>
                      <span style={{fontFamily:'var(--font-almarai)'}}>تسجيل الخروج</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 text-gray-800 hover:text-gray-600 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Search Bar */}
        {isSearchOpen && (
          <div className="border-t border-gray-200 py-4">
            <div className="max-w-md mx-auto">
              <div className="relative">
                <input
                  type="text"
                  placeholder="ابحث عن الورود والباقات..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5A5E4D]"
                  style={{fontFamily:'var(--font-almarai)'}}
                />
                <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
              <Link href="/" className="block px-3 py-2 text-gray-700 hover:text-green-600 transition-colors">
                الرئيسية
              </Link>
              <Link href="/bouquets" className="block px-3 py-2 text-gray-700 hover:text-green-600 transition-colors">
                الباقات الجاهزة
              </Link>
              <Link href="/custom" className="block px-3 py-2 text-gray-700 hover:text-green-600 transition-colors">
                تنسيق خاص
              </Link>
              <Link href="/occasions" className="block px-3 py-2 text-gray-700 hover:text-green-600 transition-colors">
                المناسبات
              </Link>
              <Link href="/blog" className="block px-3 py-2 text-gray-700 hover:text-green-600 transition-colors">
                المدونة
              </Link>
              <Link href="/contact" className="block px-3 py-2 text-gray-700 hover:text-green-600 transition-colors">
                تواصل معنا
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
