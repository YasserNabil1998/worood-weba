import { Order } from "@/src/@types/orders/order.type";
import { almaraiFont } from "@/src/lib/ordersHelpers";

interface OrderStatusTrackerProps {
  status: Order["status"];
}

export default function OrderStatusTracker({ status }: OrderStatusTrackerProps) {
  // تحديد ألوان شارة الحالة حسب التصميم
  const getStatusBadgeStyle = () => {
    if (status === "ملغي") {
      return "bg-[#800020] text-white";
    }
    if (status === "تم التسليم") {
      return "bg-[#dbfce7] text-[#5a5e4d]";
    }
    // حالات أخرى
    return "bg-[#5a5e4d] text-white";
  };

  return (
    <div className="w-full flex justify-end">
      <span
        className={`px-4 py-2 rounded-lg text-sm font-semibold ${getStatusBadgeStyle()}`}
        style={almaraiFont}
      >
        {status}
      </span>
    </div>
  );
}
