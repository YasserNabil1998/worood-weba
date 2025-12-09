import { useState, useEffect, useMemo } from "react";
import type { Order } from "@/types/orders";
import { storage } from "@/lib/utils";
import { STORAGE_KEYS } from "@/constants";
import { mergeOrders, sortOrders, filterOrdersByStatus } from "@/lib/ordersHelpers";
import ordersData from "@/app/(pages)/orders/orders-data.json";

/**
 * Hook لإدارة الطلبات وحالاتها
 */
export function useOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<string>("الكل");

  // تحميل الطلبات من localStorage ودمجها مع البيانات التجريبية
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedOrders = storage.get<Order[]>(STORAGE_KEYS.ORDERS, []);
      const demoOrders = ordersData.orders as Order[];

      // دمج وترتيب الطلبات
      const allOrders = mergeOrders(savedOrders, demoOrders);
      const sortedOrders = sortOrders(allOrders);

      setOrders(sortedOrders);
    }
  }, []);

  // فلترة الطلبات حسب الحالة المختارة
  const filteredOrders = useMemo(
    () => filterOrdersByStatus(orders, selectedStatus),
    [orders, selectedStatus]
  );

  return {
    orders,
    filteredOrders,
    selectedStatus,
    setSelectedStatus,
  };
}
