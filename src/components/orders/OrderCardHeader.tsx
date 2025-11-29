import { Order } from "@/src/@types/orders/order.type";
import { almaraiFont } from "@/src/lib/ordersHelpers";
import OrderStatusTracker from "./OrderStatusTracker";

interface OrderCardHeaderProps {
  order: Order;
}

export default function OrderCardHeader({ order }: OrderCardHeaderProps) {
  return (
    <div className="bg-gray-50 border-b border-gray-200 px-3 sm:px-4 md:px-6 py-3 sm:py-4">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
        <div className="flex-1 min-w-0">
          <h3
            className="text-base sm:text-lg md:text-xl font-bold text-gray-800 mb-0.5 sm:mb-1"
            style={almaraiFont}
            dir="rtl"
          >
            طلب {order.orderNumber}
          </h3>
          <p
            className="text-xs sm:text-sm text-gray-600"
            style={almaraiFont}
            dir="rtl"
          >
            {order.date}
          </p>
        </div>
        <div className="text-left flex flex-col items-start sm:items-end gap-2 w-full sm:w-auto">
          <OrderStatusTracker status={order.status} />
          <p
            className="text-base sm:text-lg font-bold text-gray-800"
            style={almaraiFont}
            dir="rtl"
          >
            {order.totalAmount} ر.س
          </p>
        </div>
      </div>
    </div>
  );
}

