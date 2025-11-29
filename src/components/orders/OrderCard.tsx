"use client";

import { useState } from "react";
import { Order } from "@/src/@types/orders/order.type";
import OrderCardHeader from "./OrderCardHeader";
import OrderItemsList from "./OrderItemsList";
import OrderDetailsPanel from "./OrderDetailsPanel";
import OrderActionButtons from "./OrderActionButtons";
import { almaraiFont } from "@/src/lib/ordersHelpers";
import { ChevronDown, ChevronUp, Package } from "lucide-react";

interface OrderCardProps {
  order: Order;
  onRateOrder: (orderNumber: string, productName: string) => void;
}

export default function OrderCard({ order, onRateOrder }: OrderCardProps) {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden">
      <OrderCardHeader order={order} />
      <div className="p-6">
        {/* عنوان المنتجات */}
        <div className="flex items-center gap-2 mb-2">
          <div className="bg-gradient-to-br from-[#5A5E4D] to-[#6B6F5E] p-2 rounded-lg">
            <Package className="w-4 h-4 text-white" />
          </div>
          <h4 className="text-lg font-bold text-gray-800" style={almaraiFont}>
            المنتجات
          </h4>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 bg-gray-50 rounded-lg p-4 border border-gray-200">
          <OrderItemsList items={order.items} />

          <div className="flex flex-col min-h-[300px]">
            <div className="space-y-4 flex-1">
              {/* زر عرض التفاصيل */}
              <div className="flex justify-end">
                <button
                  onClick={() => setShowDetails(!showDetails)}
                  className="bg-gray-200 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-200 transition-colors duration-200 flex items-center gap-2"
                  style={almaraiFont}
                  dir="rtl"
                >
                  <span className="text-sm font-medium">عرض التفاصيل</span>
                  {showDetails ? (
                    <ChevronUp className="w-4 h-4" />
                  ) : (
                    <ChevronDown className="w-4 h-4" />
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
