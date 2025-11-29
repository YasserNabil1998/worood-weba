"use client";

import Link from "next/link";
import { ChevronUp, Heart } from "lucide-react";

export default function FavoritesSection() {
  const fontStyle = { fontFamily: "var(--font-almarai)" };

  return (
    <Link href="/favorites" className="block">
      <div className="bg-white rounded-[25px] p-8 mb-6 cursor-pointer hover:shadow-lg transition-shadow" style={fontStyle}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Heart className="w-[48px] h-[48px] text-[#5f664f] fill-[#5f664f]" />
            <h2 className="text-[30px] font-bold text-black" style={fontStyle}>
              المفضلة
            </h2>
          </div>
          <div className="flex items-center justify-center">
            <div className="rotate-[270deg]">
              <ChevronUp className="w-[42px] h-[42px] text-[#585858]" />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

