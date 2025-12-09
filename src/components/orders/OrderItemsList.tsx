import Image from "next/image";
import { OrderItem } from "@/@types/orders/order.type";
import { almaraiFont } from "@/lib/ordersHelpers";

interface OrderItemsListProps {
  items: OrderItem[];
}

export default function OrderItemsList({ items }: OrderItemsListProps) {
  return (
    <div>
      <div
        className="h-[200px] sm:h-[250px] md:h-[300px] overflow-y-auto overflow-x-hidden space-y-2 sm:space-y-3 p-1.5 sm:p-2 custom-scrollbar"
        style={{
          scrollbarWidth: "thin",
          scrollbarColor: "#cbd5e1 #f1f5f9",
        }}
        dir="rtl"
      >
        {items.map((item) => (
          <div
            key={item.id}
            className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 border-b-2 border-gray-200"
          >
            <div className="relative w-12 h-12 sm:w-14 sm:h-14 shrink-0">
              <Image
                src={item.image}
                alt={item.name}
                width={56}
                height={56}
                className="rounded-lg object-cover shadow-sm"
                loading="lazy"
              />
            </div>

            <div className="flex-1 min-w-0">
              <h5
                className="font-semibold text-gray-800 text-xs sm:text-sm truncate"
                style={almaraiFont}
              >
                {item.name}
              </h5>

              {item.bouquetType && (
                <p className="text-[10px] sm:text-xs text-gray-600 mt-0.5" style={almaraiFont}>
                  نوع الباقة: {item.bouquetType}
                </p>
              )}

              <div className="flex items-center gap-1.5 sm:gap-2 mt-1">
                <span
                  className="text-[10px] sm:text-xs font-medium text-[#5A5E4D] bg-[#5A5E4D]/10 px-1.5 py-0.5 sm:px-2 rounded-md"
                  style={almaraiFont}
                >
                  {item.quantity} ×
                </span>
                <div className="flex items-center gap-1" style={almaraiFont}>
                  <span className="text-xs sm:text-sm font-bold text-[#5A5E4D]">{item.price}</span>
                  <span className="text-[10px] sm:text-xs text-[#5A5E4D]">ر.س</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
