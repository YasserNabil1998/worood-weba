"use client";

import { useState } from "react";
import type { Order } from "@/types/orders";
import OrderCardHeader from "./OrderCardHeader";
import OrderItemsList from "./OrderItemsList";
import OrderDetailsPanel from "./OrderDetailsPanel";
import OrderActionButtons from "./OrderActionButtons";
import { almaraiFont } from "@/lib/ordersHelpers";
import { ChevronDown, ChevronUp, Package } from "lucide-react";

interface OrderCardProps {
  order: Order;
  onRateOrder: (orderNumber: string, productName: string) => void;
}

export default function OrderCard({ order, onRateOrder }: OrderCardProps) {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden">
      <OrderCardHeader order={order} />
      <div className="p-3 sm:p-4 md:p-6">
        {/* عنوان المنتجات */}
        <div className="flex items-center gap-2 mb-2 sm:mb-3">
          <div className="bg-linear-to-br from-[#5A5E4D] to-[#6B6F5E] p-1.5 sm:p-2 rounded-lg">
            <Package className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
          </div>
          <h4 className="text-base sm:text-lg font-bold text-gray-800" style={almaraiFont}>
            المنتجات
          </h4>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5 md:gap-6 bg-gray-50 rounded-lg p-3 sm:p-4 border border-gray-200">
          <OrderItemsList items={order.items} />

          <div className="flex flex-col min-h-[250px] sm:min-h-[300px]">
            <div className="space-y-3 sm:space-y-4 flex-1">
              {/* زر عرض التفاصيل */}
              <div className="flex justify-end">
                <button
                  onClick={() => setShowDetails(!showDetails)}
                  className="bg-gray-200 text-gray-700 px-4 py-2 sm:px-6 sm:py-3 rounded-lg hover:bg-gray-200 transition-colors duration-200 flex items-center gap-2"
                  style={almaraiFont}
                  dir="rtl"
                >
                  <span className="text-xs sm:text-sm font-medium">عرض التفاصيل</span>
                  {showDetails ? (
                    <ChevronUp className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  ) : (
                    <ChevronDown className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  )}
                </button>
              </div>

              {/* تفاصيل الطلب (مخفية بشكل افتراضي) */}
              {showDetails && <OrderDetailsPanel order={order} />}
            </div>

            {/* أزرار الإجراءات (ثابتة في الأسفل) */}
            <div className="mt-auto pt-2">
              <OrderActionButtons order={order} onRateOrder={onRateOrder} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
