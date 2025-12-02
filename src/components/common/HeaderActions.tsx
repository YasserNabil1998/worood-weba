import { Search } from "lucide-react";
import CartIcon from "./CartIcon";
import UserMenuButton from "./UserMenuButton";

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
  return (
    <>
      <button
        onClick={onSearchClick}
        className={`flex items-center gap-2 text-gray-700 hover:text-[#5A5E4D] transition-all ${className}`}
        aria-label="فتح البحث"
      >
        <Search className="w-6 h-6" />
      </button>

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
  );
}

