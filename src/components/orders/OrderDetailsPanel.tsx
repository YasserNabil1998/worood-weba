import { Order } from "@/src/@types/orders/order.type";
import { almaraiFont } from "@/src/lib/ordersHelpers";
import { useNotification } from "@/src/providers/notification-provider";
import {
  MapPin,
  CreditCard,
  Truck as TruckIcon,
  StickyNote,
  Info,
  RefreshCw,
  Star,
} from "lucide-react";

interface OrderDetailsPanelProps {
  order: Order;
  onRateOrder: (orderNumber: string, productName: string) => void;
}

export default function OrderDetailsPanel({ order, onRateOrder }: OrderDetailsPanelProps) {
  const { showNotification } = useNotification();

  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <div className="bg-gradient-to-br from-[#5A5E4D] to-[#6B6F5E] p-2 rounded-lg">
          <Info className="w-4 h-4 text-white" />
        </div>
        <h4 className="text-lg font-bold text-gray-800" style={almaraiFont}>
          تفاصيل الطلب
        </h4>
      </div>

      <div className="space-y-3">
        {/* عنوان التسليم */}
        <div className="flex items-start gap-3 p-3 bg-gradient-to-br from-blue-50 to-white rounded-xl border border-blue-100">
          <div className="bg-blue-100 p-2 rounded-lg mt-0.5">
            <MapPin className="w-4 h-4 text-blue-600" />
          </div>
          <div className="flex-1">
            <span className="text-xs font-semibold text-blue-800 block mb-1" style={almaraiFont}>
              عنوان التسليم
            </span>
            <span className="text-sm text-gray-700 leading-relaxed" style={almaraiFont}>
              {order.deliveryAddress}
            </span>
          </div>
        </div>

        {/* طريقة الدفع */}
        <div className="flex items-center justify-between gap-3 p-3 bg-gradient-to-br from-green-50 to-white rounded-xl border border-green-100">
          <div className="flex items-center gap-2">
            <div className="bg-green-100 p-2 rounded-lg">
              <CreditCard className="w-4 h-4 text-green-600" />
            </div>
            <span className="text-xs font-semibold text-green-800" style={almaraiFont}>
              طريقة الدفع
            </span>
          </div>
          <span className="text-sm font-medium text-gray-700" style={almaraiFont}>
            {order.paymentMethod}
          </span>
        </div>

        {/* رقم التتبع */}
        {order.trackingNumber && (
          <div className="flex items-center justify-between gap-3 p-3 bg-gradient-to-br from-purple-50 to-white rounded-xl border border-purple-100">
            <div className="flex items-center gap-2">
              <div className="bg-purple-100 p-2 rounded-lg">
                <TruckIcon className="w-4 h-4 text-purple-600" />
              </div>
              <span className="text-xs font-semibold text-purple-800" style={almaraiFont}>
                رقم التتبع
              </span>
            </div>
            <span className="text-sm font-mono font-medium text-gray-700" style={almaraiFont}>
              {order.trackingNumber}
            </span>
          </div>
        )}

        {/* الملاحظات */}
        {order.notes && (
          <div className="flex items-start gap-3 p-3 bg-gradient-to-br from-amber-50 to-white rounded-xl border border-amber-100">
            <div className="bg-amber-100 p-2 rounded-lg mt-0.5">
              <StickyNote className="w-4 h-4 text-amber-600" />
            </div>
            <div className="flex-1">
              <span className="text-xs font-semibold text-amber-800 block mb-1" style={almaraiFont}>
                ملاحظات
              </span>
              <span className="text-sm text-gray-700 leading-relaxed" style={almaraiFont}>
                {order.notes}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* أزرار الإجراءات */}
      <div className="mt-5 flex flex-col sm:flex-row gap-2.5">
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
            className="flex-1 bg-gradient-to-r from-yellow-400 to-yellow-500 text-white px-4 py-2.5 rounded-xl hover:shadow-lg transition-all duration-300 text-sm font-semibold flex items-center justify-center gap-2 transform hover:scale-105"
            style={almaraiFont}
            onClick={() => onRateOrder(order.orderNumber, order.items[0]?.name || "الطلب")}
          >
            <Star className="w-4 h-4" />
            تقييم الطلب
          </button>
        )}
      </div>
    </div>
  );
}
