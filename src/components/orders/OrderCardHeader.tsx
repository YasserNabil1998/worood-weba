import { Order } from "@/src/@types/orders/order.type";
import { almaraiFont, getStatusIcon } from "@/src/lib/ordersHelpers";
import { Calendar } from "lucide-react";

interface OrderCardHeaderProps {
  order: Order;
}

export default function OrderCardHeader({ order }: OrderCardHeaderProps) {
  return (
    <div className="bg-gradient-to-r from-gray-50 to-gray-100/50 border-b border-gray-200 p-5">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="bg-white p-3 rounded-xl shadow-sm text-[#5A5E4D]">
            {getStatusIcon(order.status)}
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-800 mb-1" style={almaraiFont}>
              طلب #{order.orderNumber}
            </h3>
            <div className="flex items-center gap-2 text-gray-600">
              <Calendar className="w-4 h-4" />
              <p className="text-sm" style={almaraiFont}>
                {order.date}
              </p>
            </div>
          </div>
        </div>

        <div className="text-left md:text-right">
          <div
            className={`inline-block px-4 py-2 rounded-xl text-sm font-semibold shadow-sm ${order.statusColor}`}
            style={almaraiFont}
          >
            {order.status}
          </div>
          <div className="flex items-center justify-end gap-1.5 mt-2" style={almaraiFont}>
            <span className="text-xl sm:text-2xl font-bold text-[#5A5E4D]">
              {order.totalAmount}
            </span>
            <span className="text-sm sm:text-base text-[#5A5E4D]">
              ر.س
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
