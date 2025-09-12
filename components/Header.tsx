'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "طلب جديد",
      message: "تم تأكيد طلبك #ORD-001 بنجاح",
      time: "منذ 5 دقائق",
      read: false
    },
    {
      id: 2,
      title: "تحديث الطلب",
      message: "طلبك #ORD-002 قيد التوصيل",
      time: "منذ ساعة",
      read: false
    },
    {
      id: 3,
      title: "عرض خاص",
      message: "خصم 20% على جميع باقات الورود الحمراء",
      time: "منذ يوم",
      read: true
    }
  ]);

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

  // إغلاق الإشعارات عند النقر خارجها
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.notifications-dropdown') && !target.closest('.notifications-button')) {
        setIsNotificationsOpen(false);
      }
      if (!target.closest('.user-menu-dropdown') && !target.closest('.user-menu-button')) {
        setIsUserMenuOpen(false);
      }
    };

    if (isNotificationsOpen || isUserMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isNotificationsOpen, isUserMenuOpen]);

  // حساب عدد الإشعارات غير المقروءة
  const unreadCount = notifications.filter(n => !n.read).length;

  // تعيين الإشعار كمقروء
  const markAsRead = (id: number) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id 
          ? { ...notification, read: true }
          : notification
      )
    );
  };

  // تعيين جميع الإشعارات كمقروءة
  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, read: true }))
    );
  };

  // تسجيل الخروج
  const handleLogout = () => {
    // هنا يمكن إضافة منطق تسجيل الخروج
    alert('تم تسجيل الخروج بنجاح');
    setIsUserMenuOpen(false);
  };

  return (
    <header className="bg-white/95 backdrop-blur sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-12">
          {/* Left side - Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <img
                src="/images/log.png"
                alt="زهور الشمس"
                className="h-8 w-auto object-contain"
              />
            </Link>
          </div>

          {/* Center - Desktop Navigation */}
          <nav className="hidden md:flex flex-1 items-center justify-center gap-10">
            <Link href="/" className="text-sm text-gray-700 hover:text-gray-900 transition-colors">
              الرئيسية
            </Link>
            <Link href="/bouquets" className="text-sm text-gray-700 hover:text-gray-900 transition-colors">
              الباقات الجاهزة
            </Link>
            <Link href="/custom" className="text-sm text-gray-700 hover:text-gray-900 transition-colors">
              تنسيق خاص
            </Link>
            <Link href="/occasions" className="text-sm text-gray-700 hover:text-gray-900 transition-colors">
              المناسبات
            </Link>
            <Link href="/blog" className="text-sm text-gray-700 hover:text-gray-900 transition-colors">
              المدونة
            </Link>
            <Link href="/contact" className="text-sm text-gray-700 hover:text-gray-900 transition-colors">
              تواصل معنا
            </Link>
          </nav>

          {/* Right side - Icons */}
          <div className="flex items-center space-x-3 space-x-reverse text-gray-700">
            {/* Search Icon */}
            <button 
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-1.5 hover:text-gray-900 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>

            {/* Bell Icon */}
            <div className="relative">
              <button 
                onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                className="notifications-button p-1.5 hover:text-gray-900 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V4a2 2 0 10-4 0v1.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] rounded-full h-4 w-4 flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </button>

              {/* Notifications Dropdown */}
              {isNotificationsOpen && (
                <div className="notifications-dropdown absolute left-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50 transform -translate-x-16">
                  <div className="p-4 border-b border-gray-200">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-gray-800" style={{fontFamily:'var(--font-almarai)'}}>
                        الإشعارات
                      </h3>
                      {unreadCount > 0 && (
                        <button 
                          onClick={markAllAsRead}
                          className="text-sm text-[#5A5E4D] hover:text-[#4A4E3D]"
                          style={{fontFamily:'var(--font-almarai)'}}
                        >
                          تعيين الكل كمقروء
                        </button>
                      )}
                    </div>
                  </div>
                  
                  <div className="max-h-96 overflow-y-auto">
                    {notifications.length === 0 ? (
                      <div className="p-4 text-center text-gray-500" style={{fontFamily:'var(--font-almarai)'}}>
                        لا توجد إشعارات
                      </div>
                    ) : (
                      notifications.map((notification) => (
                        <div 
                          key={notification.id}
                          onClick={() => markAsRead(notification.id)}
                          className={`p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer ${
                            !notification.read ? 'bg-blue-50' : ''
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            <div className={`w-2 h-2 rounded-full mt-2 ${
                              !notification.read ? 'bg-blue-500' : 'bg-gray-300'
                            }`}></div>
                            <div className="flex-1">
                              <h4 className={`font-medium text-sm ${
                                !notification.read ? 'text-gray-900' : 'text-gray-700'
                              }`} style={{fontFamily:'var(--font-almarai)'}}>
                                {notification.title}
                              </h4>
                              <p className="text-sm text-gray-600 mt-1" style={{fontFamily:'var(--font-almarai)'}}>
                                {notification.message}
                              </p>
                              <p className="text-xs text-gray-400 mt-1" style={{fontFamily:'var(--font-almarai)'}}>
                                {notification.time}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                  
                  {notifications.length > 0 && (
                    <div className="p-4 border-t border-gray-200">
                      <Link 
                        href="/profile"
                        className="block text-center text-sm text-[#5A5E4D] hover:text-[#4A4E3D]"
                        style={{fontFamily:'var(--font-almarai)'}}
                      >
                        عرض جميع الإشعارات
                      </Link>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Cart Icon */}
            <Link href="/cart" className="relative p-1.5 hover:text-gray-900 transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
              </svg>
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] rounded-full h-4 w-4 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* User Icon */}
            <div className="relative">
              <button 
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="user-menu-button p-1.5 hover:text-gray-900 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
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
