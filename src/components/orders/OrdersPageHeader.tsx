import { almaraiFont } from "@/src/lib/ordersHelpers";
import { ShoppingBag, TrendingUp } from "lucide-react";

interface OrdersPageHeaderProps {
  totalOrders: number;
}

export default function OrdersPageHeader({
  totalOrders,
}: OrdersPageHeaderProps) {
  return (
    <div className="bg-gradient-to-br from-[#5A5E4D] to-[#6B6F5E] rounded-2xl shadow-lg p-8 mb-6 relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2"></div>

      <div className="relative flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="bg-white/20 backdrop-blur-sm p-4 rounded-xl">
            <ShoppingBag className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1
              className="text-3xl md:text-4xl font-bold text-white mb-1"
              style={almaraiFont}
            >
              طلباتي
            </h1>
            <p className="text-white/90 text-lg" style={almaraiFont}>
              تتبع جميع طلباتك بسهولة
            </p>
          </div>
        </div>

        <div className="bg-white/20 backdrop-blur-sm rounded-2xl px-6 py-4 border border-white/30">
          <div className="flex items-center gap-3">
            <div className="bg-white/30 p-2 rounded-lg">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-white/80 text-sm" style={almaraiFont}>
                إجمالي الطلبات
              </p>
              <span
                className="text-3xl font-bold text-white"
                style={almaraiFont}
              >
                {totalOrders}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
