"use client";

import Link from "next/link";

interface UserMenuDropdownProps {
  onClose: () => void;
  onLogout: () => void;
}

export default function UserMenuDropdown({ onClose, onLogout }: UserMenuDropdownProps) {
  return (
    <div className="user-menu-dropdown absolute left-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
      <div className="py-2">
        <Link
          href="/profile"
          onClick={onClose}
          className="block px-4 py-2 hover:bg-gray-50 text-gray-700"
        >
          الملف الشخصي
        </Link>
        <Link
          href="/orders"
          onClick={onClose}
          className="block px-4 py-2 hover:bg-gray-50 text-gray-700"
        >
          طلباتي
        </Link>
        <Link
          href="/favorites"
          onClick={onClose}
          className="block px-4 py-2 hover:bg-gray-50 text-gray-700"
        >
          المفضلة
        </Link>
        <div className="border-t border-gray-100 my-1"></div>
        <button
          onClick={() => {
            onLogout();
            onClose();
          }}
          className="block w-full text-right text-red-600 px-4 py-2 hover:bg-red-50"
        >
          تسجيل الخروج
        </button>
      </div>
    </div>
  );
}
