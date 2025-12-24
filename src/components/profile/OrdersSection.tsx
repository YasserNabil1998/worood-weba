"use client";

import Link from "next/link";
import { ChevronUp, Package } from "lucide-react";

export default function OrdersSection() {

  return (
    <Link href="/orders" className="block">
      <div className="bg-white rounded-[25px] p-5 mb-4 cursor-pointer hover:shadow-lg transition-shadow">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Package className="w-[36px] h-[36px] text-[#5f664f]" />
            <h2 className="text-[20px] font-bold text-black">
              طلباتي
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

