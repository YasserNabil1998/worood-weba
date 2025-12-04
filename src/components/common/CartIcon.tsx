"use client";

import Link from "next/link";
import { ShoppingCart } from "lucide-react";

interface CartIconProps {
  totalItems: number;
  className?: string;
  badgeClassName?: string;
}

export default function CartIcon({
  totalItems,
  className = "",
  badgeClassName = "",
}: CartIconProps) {
  return (
    <Link
      href="/cart"
      className={`relative ${className}`}
      aria-label={totalItems > 0 ? `السلة (${totalItems} منتج)` : "السلة"}
    >
      <ShoppingCart className="w-6 h-6" fill="currentColor" />
      <span className="sr-only">السلة</span>
      {totalItems > 0 && (
        <span
          className={`absolute -top-1 -right-1 bg-[#5A5E4D] text-white text-[10px] rounded-full h-4 w-4 flex items-center justify-center font-bold ${badgeClassName}`}
        >
          {totalItems}
        </span>
      )}
    </Link>
  );
}
