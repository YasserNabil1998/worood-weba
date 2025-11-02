import Link from "next/link";
import { Package, ShoppingBag, Sparkles } from "lucide-react";
import { almaraiFont } from "@/src/lib/ordersHelpers";

interface EmptyOrdersProps {
  selectedStatus: string;
}

export default function EmptyOrders({ selectedStatus }: EmptyOrdersProps) {
  const isAllStatus = selectedStatus === "الكل";

  return (
    <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-sm p-12 text-center border border-gray-100">
      <div className="relative inline-block mb-6">
        <div className="w-24 h-24 bg-gradient-to-br from-[#5A5E4D]/10 to-[#6B6F5E]/10 rounded-full flex items-center justify-center mx-auto">
          <Package className="w-12 h-12 text-[#5A5E4D]" />
        </div>
        <div className="absolute -top-1 -right-1 bg-yellow-400 rounded-full p-1.5">
          <Sparkles className="w-4 h-4 text-white" />
        </div>
      </div>

      <h3 className="text-2xl font-bold text-gray-800 mb-3" style={almaraiFont}>
        {isAllStatus ? "لا توجد طلبات حتى الآن" : "لا توجد نتائج"}
      </h3>

      <p className="text-gray-600 text-base mb-6 max-w-md mx-auto" style={almaraiFont}>
        {isAllStatus
          ? "ابدأ رحلة التسوق الآن واختر من بين مجموعة رائعة من الباقات"
          : `لا توجد طلبات بحالة "${selectedStatus}" في الوقت الحالي`}
      </p>

      {isAllStatus && (
        <Link
          href="/bouquets"
          className="inline-flex items-center gap-2 bg-gradient-to-r from-[#5A5E4D] to-[#6B6F5E] text-white px-8 py-3.5 rounded-xl hover:shadow-lg transition-all duration-300 font-semibold transform hover:scale-105"
          style={almaraiFont}
        >
          <ShoppingBag className="w-5 h-5" />
          تصفح الباقات
        </Link>
      )}
    </div>
  );
}
