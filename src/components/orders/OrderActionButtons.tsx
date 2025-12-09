import { Order } from "@/@types/orders/order.type";
import { almaraiFont } from "@/lib/ordersHelpers";
import { useNotification } from "@/providers/notification-provider";
import { RefreshCw, Truck as TruckIcon, Star } from "lucide-react";

interface OrderActionButtonsProps {
  order: Order;
  onRateOrder: (orderNumber: string, productName: string) => void;
}

export default function OrderActionButtons({ order, onRateOrder }: OrderActionButtonsProps) {
  const { showNotification } = useNotification();

  return (
    <div className="mt-2 flex flex-col sm:flex-row gap-2 sm:gap-2.5">
      <button
        className="flex-1 bg-linear-to-r from-[#5A5E4D] to-[#6B6F5E] text-white px-3 py-2 sm:px-4 sm:py-2.5 rounded-lg sm:rounded-xl hover:shadow-lg transition-all duration-300 text-xs sm:text-sm font-semibold flex items-center justify-center gap-1.5 sm:gap-2 transform hover:scale-105"
        style={almaraiFont}
        onClick={() => showNotification("تم إرسال الطلب مرة أخرى!", "success")}
      >
        <RefreshCw className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
        <span>إعادة الطلب</span>
      </button>

      {order.status === "في الطريق" && (
        <button
          className="flex-1 bg-linear-to-r from-[#5A5E4D] to-[#6B6F5E] text-white px-3 py-2 sm:px-4 sm:py-2.5 rounded-lg sm:rounded-xl hover:shadow-lg transition-all duration-300 text-xs sm:text-sm font-semibold flex items-center justify-center gap-1.5 sm:gap-2 transform hover:scale-105"
          style={almaraiFont}
          onClick={() => showNotification("تتبع الطلب قريباً!", "info")}
        >
          <TruckIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          <span>تتبع الطلب</span>
        </button>
      )}

      {order.status === "تم التسليم" && (
        <button
          className="flex-1 bg-white text-gray-700 shadow-md px-3 py-2 sm:px-4 sm:py-2.5 rounded-lg sm:rounded-xl hover:shadow-lg transition-all duration-300 text-xs sm:text-sm font-semibold flex items-center justify-center gap-1.5 sm:gap-2 transform hover:scale-105"
          style={almaraiFont}
          onClick={() => onRateOrder(order.orderNumber, order.items[0]?.name || "الطلب")}
        >
          <Star className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-yellow-400 fill-yellow-400" />
          <span>تقييم الطلب</span>
        </button>
      )}
    </div>
  );
}
