"use client";

import { useState, useEffect, useRef } from "react";
import { Order } from "@/types/orders";
import { almaraiFont } from "@/lib/utils/orders";
import { useNotification } from "@/providers/notification-provider";
import { RefreshCw, Truck as TruckIcon, Star, X } from "lucide-react";
import { useOrdersStore } from "@/stores";

interface OrderActionButtonsProps {
  order: Order;
  onRateOrder: (orderNumber: string, productName: string) => void;
}

const TRACKING_INTERVAL = 30000; // 30 seconds

export default function OrderActionButtons({ order, onRateOrder }: OrderActionButtonsProps) {
  const { showNotification } = useNotification();
  const reorder = useOrdersStore((state) => state.reorder);
  const cancelOrder = useOrdersStore((state) => state.cancelOrder);
  const trackOrder = useOrdersStore((state) => state.trackOrder);
  const stopTrackingOrder = useOrdersStore((state) => state.stopTrackingOrder);
  const checkOrderStatus = useOrdersStore((state) => state.checkOrderStatus);
  const trackedOrders = useOrdersStore((state) => state.trackedOrders);
  
  const [isTracking, setIsTracking] = useState(false);
  const previousStatusRef = useRef<Order["status"]>(order.status);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  
  // يمكن إلغاء الطلب فقط إذا كان في حالة "قيد التجهيز" (قبل موافقة المتجر)
  const canCancelOrder = order.status === "قيد التجهيز";
  
  // يمكن تتبع الطلب فقط إذا كان في حالة "في الطريق"
  const canTrackOrder = order.status === "في الطريق" || order.status === "تم التجهيز";
  
  // بدء/إيقاف التتبع
  useEffect(() => {
    const isCurrentlyTracked = trackedOrders.has(order.id);
    setIsTracking(isCurrentlyTracked);
    
    if (isCurrentlyTracked && canTrackOrder) {
      // بدء التتبع
      previousStatusRef.current = order.status;
      
      intervalRef.current = setInterval(async () => {
        const result = await checkOrderStatus(order.id);
        if (result.success) {
          const statusMessages: Record<Order["status"], string> = {
            "قيد التجهيز": "الطلب قيد التجهيز",
            "تم التجهيز": "تم تجهيز الطلب",
            "في الطريق": "الطلب في الطريق",
            "تم التسليم": "تم تسليم الطلب",
            "ملغي": "تم إلغاء الطلب",
          };

          // تحديد الحالة الحالية (الجديدة إذا تغيرت، أو الحالية إذا لم تتغير)
          const currentStatus = result.newStatus || result.currentStatus || order.status;
          
          if (result.statusChanged && result.newStatus) {
            // تحديث الحالة السابقة
            previousStatusRef.current = result.newStatus;
            
            // إشعار المستخدم بالحالة الجديدة
            showNotification(
              `تم تحديث حالة الطلب: ${statusMessages[result.newStatus]}`,
              "success"
            );
          } else {
            // إشعار المستخدم بالحالة الحالية (لم يتغير)
            showNotification(
              `حالة الطلب الحالية: ${statusMessages[currentStatus]}`,
              "info"
            );
          }
          
          // إيقاف التتبع إذا تم التسليم أو الإلغاء
          if (currentStatus === "تم التسليم" || currentStatus === "ملغي") {
            stopTrackingOrder(order.id);
            setIsTracking(false);
            if (intervalRef.current) {
              clearInterval(intervalRef.current);
              intervalRef.current = null;
            }
          }
        }
      }, TRACKING_INTERVAL);
    } else {
      // إيقاف التتبع
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }
    
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [trackedOrders, order.id, canTrackOrder, checkOrderStatus, stopTrackingOrder, showNotification]);
  
  const handleTrackOrder = () => {
    if (isTracking) {
      stopTrackingOrder(order.id);
      setIsTracking(false);
      showNotification("تم إيقاف تتبع الطلب", "info");
    } else {
      trackOrder(order.id);
      setIsTracking(true);
      showNotification("تم تفعيل تتبع الطلب. سيتم إشعارك عند تغيير الحالة. لإلغاء التتبع انقر مرة أخرى على زر التتبع", "success");
    }
  };

  return (
    <div className="mt-2 flex flex-col sm:flex-row gap-2 sm:gap-2.5">
      <button
        className="flex-1 bg-linear-to-r from-[#5A5E4D] to-[#6B6F5E] text-white px-3 py-2 sm:px-4 sm:py-2.5 rounded-lg sm:rounded-xl hover:shadow-lg transition-all duration-300 text-xs sm:text-sm font-semibold flex items-center justify-center gap-1.5 sm:gap-2 transform hover:scale-105"
        style={almaraiFont}
        onClick={async () => {
          const result = await reorder(order.id);
          if (result.success) {
            showNotification("تم إرسال الطلب مرة أخرى!", "success");
          } else {
            showNotification(result.error || "فشل إعادة الطلب", "error");
          }
        }}
      >
        <RefreshCw className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
        <span>إعادة الطلب</span>
      </button>

      {canTrackOrder && (
        <button
          className={`flex-1 px-3 py-2 sm:px-4 sm:py-2.5 rounded-lg sm:rounded-xl hover:shadow-lg transition-all duration-300 text-xs sm:text-sm font-semibold flex items-center justify-center gap-1.5 sm:gap-2 transform hover:scale-105 ${
            isTracking
              ? "bg-green-500 hover:bg-green-600 text-white"
              : "bg-linear-to-r from-[#5A5E4D] to-[#6B6F5E] text-white"
          }`}
          style={almaraiFont}
          onClick={handleTrackOrder}
        >
          <TruckIcon className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${isTracking ? "animate-pulse" : ""}`} />
          <span>{isTracking ? "جارٍ التتبع..." : "تتبع الطلب"}</span>
        </button>
      )}

      {order.status === "تم التسليم" && (
        <button
          className="flex-1 bg-white text-gray-700 shadow-md px-3 py-2 sm:px-4 sm:py-2.5 rounded-lg sm:rounded-xl hover:shadow-lg transition-all duration-300 text-xs sm:text-sm font-semibold flex items-center justify-center gap-1.5 sm:gap-2 transform hover:scale-105"
          style={almaraiFont}
          onClick={() => {
            onRateOrder(order.orderNumber, order.items[0]?.name || "الطلب");
            // Note: The actual rating submission will be handled by the RatingPopup component
          }}
        >
          <Star className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-yellow-400 fill-yellow-400" />
          <span>تقييم الطلب</span>
        </button>
      )}

      {canCancelOrder && (
        <button
          className="flex-1 bg-[#800020] hover:bg-[#70001a] text-white px-3 py-2 sm:px-4 sm:py-2.5 rounded-lg sm:rounded-xl hover:shadow-lg transition-all duration-300 text-xs sm:text-sm font-semibold flex items-center justify-center gap-1.5 sm:gap-2 transform hover:scale-105"
          style={almaraiFont}
          onClick={async () => {
            if (confirm("هل أنت متأكد من إلغاء هذا الطلب؟")) {
              const result = await cancelOrder(order.id);
              if (result.success) {
                showNotification("تم إلغاء الطلب بنجاح", "success");
              } else {
                showNotification(result.error || "فشل إلغاء الطلب", "error");
              }
            }
          }}
        >
          <X className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          <span>إلغاء الطلب</span>
        </button>
      )}
    </div>
  );
}
