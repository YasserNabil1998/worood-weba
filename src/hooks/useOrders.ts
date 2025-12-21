import { useState, useEffect, useMemo } from "react";
import { filterOrdersByStatus } from "@/lib/utils/orders";
import { useOrdersStore } from "@/stores";

/**
 * Hook لإدارة الطلبات وحالاتها
 */
export function useOrders() {
  const [selectedStatus, setSelectedStatus] = useState<string>("الكل");

  const orders = useOrdersStore((state) => state.orders);
  const fetchOrders = useOrdersStore((state) => state.fetchOrders);

  // Fetch orders on mount
  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

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
