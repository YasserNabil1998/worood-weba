import { Order } from "@/src/@types/orders/order.type";
import { almaraiFont } from "@/src/lib/ordersHelpers";
import OrderStatusTracker from "./OrderStatusTracker";

interface OrderCardHeaderProps {
  order: Order;
}

export default function OrderCardHeader({ order }: OrderCardHeaderProps) {
  return (
    <div className="bg-gray-50 border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h3
            className="text-xl font-bold text-gray-800 mb-1"
            style={almaraiFont}
            dir="rtl"
          >
            طلب {order.orderNumber}
          </h3>
          <p
            className="text-sm text-gray-600"
            style={almaraiFont}
            dir="rtl"
          >
            {order.date}
          </p>
        </div>
        <div className="text-left flex flex-col items-end gap-2">
          <OrderStatusTracker status={order.status} />
          <p
            className="text-lg font-bold text-gray-800"
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

