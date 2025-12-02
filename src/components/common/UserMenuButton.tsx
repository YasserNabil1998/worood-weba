"use client";

import { useState, useEffect } from "react";
import { User } from "lucide-react";
import UserMenuDropdown from "./UserMenuDropdown";

interface UserMenuButtonProps {
  onLogout: () => void;
  buttonClassName?: string;
}

export default function UserMenuButton({ onLogout, buttonClassName = "" }: UserMenuButtonProps) {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

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

  return (
    <div className="relative">
      <button
        onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
        className={`user-menu-button ${buttonClassName}`}
        aria-label="فتح قائمة المستخدم"
        aria-expanded={isUserMenuOpen}
      >
        <User className="w-6 h-6" fill="currentColor" />
      </button>

      {isUserMenuOpen && (
        <UserMenuDropdown onClose={() => setIsUserMenuOpen(false)} onLogout={onLogout} />
      )}
    </div>
  );
}
