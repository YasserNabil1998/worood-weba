'use client';

import { useState } from 'react';
import Link from 'next/link';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
            <Link href="/contact" className="text-sm text-gray-700 hover:text-gray-900 transition-colors">
              تواصل معنا
            </Link>
          </nav>

          {/* Right side - Icons */}
          <div className="flex items-center space-x-3 space-x-reverse text-gray-700">
            {/* Search Icon */}
            <button className="p-1.5 hover:text-gray-900 transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>

            {/* Bell Icon */}
            <button className="p-1.5 hover:text-gray-900 transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V4a2 2 0 10-4 0v1.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </button>

            {/* Cart Icon */}
            <Link href="/cart" className="relative p-1.5 hover:text-gray-900 transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
              </svg>
              <span className="absolute -top-1 -right-1 bg-gray-800 text-white text-[10px] rounded-full h-4 w-4 flex items-center justify-center">0</span>
            </Link>

            {/* User Icon */}
            <button className="p-1.5 hover:text-gray-900 transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </button>
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
