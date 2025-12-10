import { almaraiFont } from "@/lib/utils/orders";
import { ShoppingBag, TrendingUp } from "lucide-react";

interface OrdersPageHeaderProps {
  totalOrders: number;
}

export default function OrdersPageHeader({ totalOrders }: OrdersPageHeaderProps) {
  return (
    <div className="bg-gradient-to-br from-[#5A5E4D] to-[#6B6F5E] rounded-2xl shadow-lg p-4 sm:p-6 md:p-8 mb-4 sm:mb-6 relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-0 right-0 w-20 h-20 sm:w-32 sm:h-32 md:w-40 md:h-40 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-16 h-16 sm:w-24 sm:h-24 md:w-32 md:h-32 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2"></div>

      <div className="relative flex flex-col md:flex-row items-center justify-between gap-3 sm:gap-4">
        <div className="flex items-center gap-2 sm:gap-3 md:gap-4 w-full md:w-auto">
          <div className="bg-white/20 backdrop-blur-sm p-2 sm:p-3 md:p-4 rounded-xl flex-shrink-0">
            <ShoppingBag className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-0.5 sm:mb-1" style={almaraiFont}>
              طلباتي
            </h1>
            <p className="text-white/90 text-sm sm:text-base md:text-lg" style={almaraiFont}>
              تتبع جميع طلباتك بسهولة
            </p>
          </div>
        </div>

        <div className="bg-white/20 backdrop-blur-sm rounded-xl sm:rounded-2xl px-4 py-3 sm:px-6 sm:py-4 border border-white/30 w-full md:w-auto">
          <div className="flex items-center gap-2 sm:gap-3 justify-center md:justify-start">
            <div className="bg-white/30 p-1.5 sm:p-2 rounded-lg">
              <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            </div>
            <div>
              <p className="text-white/80 text-xs sm:text-sm" style={almaraiFont}>
                إجمالي الطلبات
              </p>
              <span className="text-2xl sm:text-3xl font-bold text-white" style={almaraiFont}>
                {totalOrders}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
