"use client";

import { Search } from "lucide-react";
import Link from "next/link";
import CartIcon from "./CartIcon";
import UserMenuButton from "./UserMenuButton";
import { useAuth } from "@/providers/auth-provider";
import { ROUTES } from "@/constants/routes";

interface HeaderActionsProps {
  totalItems: number;
  onLogout: () => void;
  onSearchClick: () => void;
  className?: string;
  badgeClassName?: string;
}

export default function HeaderActions({
  totalItems,
  onLogout,
  onSearchClick,
  className = "",
  badgeClassName = "",
}: HeaderActionsProps) {
  const { isAuthenticated } = useAuth();

  return (
    <>
      <button
        onClick={onSearchClick}
        className={`flex items-center gap-2 text-gray-700 hover:text-[#5A5E4D] transition-all ${className}`}
        aria-label="فتح البحث"
      >
        <Search className="w-6 h-6" />
      </button>

      {isAuthenticated ? (
        <>
          <CartIcon
            totalItems={totalItems}
            className={`flex items-center gap-2 text-gray-700 hover:text-[#5A5E4D] transition-all ${className}`}
            badgeClassName={badgeClassName}
          />

          <UserMenuButton
            onLogout={onLogout}
            buttonClassName={`flex items-center gap-2 text-gray-700 hover:text-[#5A5E4D] transition-all ${className}`}
          />
        </>
      ) : (
        <>
          <Link
            href={ROUTES.LOGIN}
            className={`flex items-center gap-2 text-gray-700 hover:text-[#5A5E4D] transition-all ${className}`}
            aria-label="تسجيل الدخول"
          >
            <span className="text-sm font-medium">تسجيل الدخول</span>
          </Link>

          <Link
            href={ROUTES.SIGNUP}
            className={`flex items-center gap-2 bg-[#5A5E4D] text-white px-4 py-2 rounded-md hover:bg-[#4A4E3D] transition-all ${className}`}
            aria-label="إنشاء حساب"
          >
            <span className="text-sm font-medium">إنشاء حساب</span>
          </Link>
        </>
      )}
    </>
  );
}
