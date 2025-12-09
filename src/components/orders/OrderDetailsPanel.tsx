import { Order } from "@/types/orders";
import { almaraiFont } from "@/lib/ordersHelpers";
import {
  MapPin,
  CreditCard,
  Truck as TruckIcon,
  StickyNote,
} from "lucide-react";

interface OrderDetailsPanelProps {
  order: Order;
}

export default function OrderDetailsPanel({ order }: OrderDetailsPanelProps) {
  return (
    <div>
      <div className="space-y-2 sm:space-y-3">
        {/* عنوان التسليم وطريقة الدفع في نفس السطر */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
          {/* عنوان التسليم */}
          <div className="flex items-center justify-between gap-2 sm:gap-3 p-2.5 sm:p-3 bg-gradient-to-br from-blue-50 to-white rounded-lg sm:rounded-xl border border-blue-100" dir="rtl">
            <div className="bg-blue-100 p-1.5 sm:p-2 rounded-lg flex-shrink-0">
              <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-600" />
            </div>
            <span className="text-xs sm:text-sm text-gray-700 leading-relaxed flex-1" style={almaraiFont}>
              {order.deliveryAddress}
            </span>
          </div>

          {/* طريقة الدفع */}
          <div className="flex items-center justify-between gap-2 sm:gap-3 p-2.5 sm:p-3 bg-gradient-to-br from-green-50 to-white rounded-lg sm:rounded-xl border border-green-100">
            <div className="flex items-center gap-1.5 sm:gap-2">
              <div className="bg-green-100 p-1.5 sm:p-2 rounded-lg">
                <CreditCard className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-green-600" />
              </div>
              <span className="text-[10px] sm:text-xs font-semibold text-green-800" style={almaraiFont}>
                طريقة الدفع
              </span>
            </div>
            <span className="text-xs sm:text-sm font-medium text-gray-700" style={almaraiFont}>
              {order.paymentMethod}
            </span>
          </div>
        </div>

        {/* رقم التتبع */}
        {order.trackingNumber && (
          <div className="flex items-center justify-between gap-2 sm:gap-3 p-2.5 sm:p-3 bg-gradient-to-br from-purple-50 to-white rounded-lg sm:rounded-xl border border-purple-100">
            <div className="flex items-center gap-1.5 sm:gap-2">
              <div className="bg-purple-100 p-1.5 sm:p-2 rounded-lg">
                <TruckIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-purple-600" />
              </div>
              <span className="text-[10px] sm:text-xs font-semibold text-purple-800" style={almaraiFont}>
                رقم التتبع
              </span>
            </div>
            <span className="text-xs sm:text-sm font-mono font-medium text-gray-700 break-all" style={almaraiFont}>
              {order.trackingNumber}
            </span>
          </div>
        )}

        {/* الملاحظات */}
        {order.notes && (
          <div className="flex items-start gap-2 sm:gap-3 p-2.5 sm:p-3 bg-gradient-to-br from-amber-50 to-white rounded-lg sm:rounded-xl border border-amber-100">
            <div className="bg-amber-100 p-1.5 sm:p-2 rounded-lg mt-0.5 flex-shrink-0">
              <StickyNote className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-600" />
            </div>
            <div className="flex-1 min-w-0">
              <span className="text-[10px] sm:text-xs font-semibold text-amber-800 block mb-1" style={almaraiFont}>
                ملاحظات
              </span>
              <span className="text-xs sm:text-sm text-gray-700 leading-relaxed break-words" style={almaraiFont}>
                {order.notes}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
