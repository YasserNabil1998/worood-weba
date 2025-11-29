"use client";

import Link from "next/link";
import { ChevronUp, Package } from "lucide-react";

export default function OrdersSection() {
  const fontStyle = { fontFamily: "var(--font-almarai)" };

  return (
    <Link href="/orders" className="block">
      <div className="bg-white rounded-[25px] p-8 mb-6 cursor-pointer hover:shadow-lg transition-shadow" style={fontStyle}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Package className="w-[52px] h-[52px] text-[#5f664f]" />
            <h2 className="text-[30px] font-bold text-black" style={fontStyle}>
              طلباتي
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

