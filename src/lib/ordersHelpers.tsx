import { Order } from "@/src/@types/orders/order.type";
import { Package, Truck, CheckCircle, Clock, X } from "lucide-react";
import { ReactElement } from "react";

/**
 * دمج الطلبات المحفوظة مع الطلبات التجريبية
 */
export function mergeOrders(
  savedOrders: Order[],
  demoOrders: Order[]
): Order[] {
  return [...savedOrders, ...demoOrders];
}

/**
 * ترتيب الطلبات حسب التاريخ (الأحدث أولاً)
 * الطلبات الجديدة لها id من timestamp
 */
export function sortOrders(orders: Order[]): Order[] {
  return [...orders].sort((a, b) => {
    const aId = parseInt(a.id);
    const bId = parseInt(b.id);

    // إذا كان كلاهما رقمي، نرتب حسب القيمة
    if (!isNaN(aId) && !isNaN(bId)) {
      return bId - aId; // الأحدث أولاً
    }

    // إذا كان أحدهما فقط رقمي (طلب جديد)، نضعه أولاً
    if (!isNaN(aId)) return -1;
    if (!isNaN(bId)) return 1;

    return 0;
  });
}

/**
 * فلترة الطلبات حسب الحالة
 */
export function filterOrdersByStatus(orders: Order[], status: string): Order[] {
  if (status === "الكل") {
    return orders;
  }
  return orders.filter((order) => order.status === status);
}

/**
 * الحصول على أيقونة الحالة المناسبة
 */
export function getStatusIcon(status: string): ReactElement | null {
  switch (status) {
    case "قيد المعالجة":
      return <Clock className="w-5 h-5" />;
    case "تم التجهيز":
      return <Package className="w-5 h-5" />;
    case "في الطريق":
      return <Truck className="w-5 h-5" />;
    case "تم التسليم":
      return <CheckCircle className="w-5 h-5" />;
    case "ملغي":
      return <X className="w-5 h-5" />;
    default:
      return null;
  }
}

/**
 * خيارات حالات الطلبات
 */
export const ORDER_STATUS_OPTIONS = [
  "الكل",
  "قيد المعالجة",
  "تم التجهيز",
  "في الطريق",
  "تم التسليم",
  "ملغي",
] as const;

/**
 * الكلاسات المشتركة للـ Almarai font
 */
export const almaraiFont = {
  fontFamily: "var(--font-almarai)",
} as const;
