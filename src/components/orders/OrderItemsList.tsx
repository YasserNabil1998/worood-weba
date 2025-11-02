import Image from "next/image";
import { OrderItem } from "@/src/@types/orders/order.type";
import { almaraiFont } from "@/src/lib/ordersHelpers";
import { Package } from "lucide-react";

interface OrderItemsListProps {
  items: OrderItem[];
}

export default function OrderItemsList({ items }: OrderItemsListProps) {
  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <div className="bg-gradient-to-br from-[#5A5E4D] to-[#6B6F5E] p-2 rounded-lg">
          <Package className="w-4 h-4 text-white" />
        </div>
        <h4 className="text-lg font-bold text-gray-800" style={almaraiFont}>
          المنتجات
        </h4>
      </div>

      <div className="h-[300px] overflow-y-auto overflow-x-hidden space-y-3 p-2 scrollbar-hide">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex items-center gap-3 p-3 bg-gradient-to-br from-gray-50 to-white rounded-xl border border-gray-100 hover:shadow-md transition-all duration-300 transform hover:scale-[1.02]"
          >
            <div className="relative w-14 h-14 flex-shrink-0">
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
              <h5 className="font-semibold text-gray-800 text-sm truncate" style={almaraiFont}>
                {item.name}
              </h5>

              {item.bouquetType && (
                <p className="text-xs text-gray-600 mt-0.5" style={almaraiFont}>
                  نوع الباقة: {item.bouquetType}
                </p>
              )}

              <div className="flex items-center gap-2 mt-1">
                <span
                  className="text-xs font-medium text-[#5A5E4D] bg-[#5A5E4D]/10 px-2 py-0.5 rounded-md"
                  style={almaraiFont}
                >
                  {item.quantity} ×
                </span>
                <span className="text-xs font-semibold text-gray-700" style={almaraiFont}>
                  {item.price} ر.س
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
