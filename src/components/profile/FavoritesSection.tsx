"use client";

import Link from "next/link";
import { ChevronUp, Heart } from "lucide-react";

export default function FavoritesSection() {
  const fontStyle = { fontFamily: "var(--font-almarai)" };

  return (
    <Link href="/favorites" className="block">
      <div className="bg-white rounded-[25px] p-5 mb-4 cursor-pointer hover:shadow-lg transition-shadow" style={fontStyle}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Heart className="w-[36px] h-[36px] text-[#5f664f] fill-[#5f664f]" />
            <h2 className="text-[20px] font-bold text-black" style={fontStyle}>
              المفضلة
            </h2>
          </div>
          <div className="flex items-center justify-center">
            <div className="rotate-[270deg]">
              <ChevronUp className="w-[32px] h-[32px] text-[#585858]" />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

