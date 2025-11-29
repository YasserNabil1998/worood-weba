import { Order } from "@/src/@types/orders/order.type";
import { almaraiFont } from "@/src/lib/ordersHelpers";
import { useNotification } from "@/src/providers/notification-provider";
import { RefreshCw, Truck as TruckIcon, Star } from "lucide-react";

interface OrderActionButtonsProps {
  order: Order;
  onRateOrder: (orderNumber: string, productName: string) => void;
}

export default function OrderActionButtons({ order, onRateOrder }: OrderActionButtonsProps) {
  const { showNotification } = useNotification();

  return (
    <div className="mt-2 flex flex-col sm:flex-row gap-2.5">
      <button
        className="flex-1 bg-gradient-to-r from-[#5A5E4D] to-[#6B6F5E] text-white px-4 py-2.5 rounded-xl hover:shadow-lg transition-all duration-300 text-sm font-semibold flex items-center justify-center gap-2 transform hover:scale-105"
        style={almaraiFont}
        onClick={() => showNotification("تم إرسال الطلب مرة أخرى!", "success")}
      >
        <RefreshCw className="w-4 h-4" />
        إعادة الطلب
      </button>

      {order.status === "في الطريق" && (
        <button
          className="flex-1 bg-gradient-to-r from-[#5A5E4D] to-[#6B6F5E] text-white px-4 py-2.5 rounded-xl hover:shadow-lg transition-all duration-300 text-sm font-semibold flex items-center justify-center gap-2 transform hover:scale-105"
          style={almaraiFont}
          onClick={() => showNotification("تتبع الطلب قريباً!", "info")}
        >
          <TruckIcon className="w-4 h-4" />
          تتبع الطلب
        </button>
      )}

      {order.status === "تم التسليم" && (
        <button
          className="flex-1 bg-white text-gray-700 shadow-md px-4 py-2.5 rounded-xl hover:shadow-lg transition-all duration-300 text-sm font-semibold flex items-center justify-center gap-2 transform hover:scale-105"
          style={almaraiFont}
          onClick={() => onRateOrder(order.orderNumber, order.items[0]?.name || "الطلب")}
        >
          <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
          تقييم الطلب
        </button>
      )}
    </div>
  );
}

