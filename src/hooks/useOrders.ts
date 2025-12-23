import { useEffect, useMemo } from "react";
import { useShallow } from "zustand/react/shallow";
import { filterOrdersByStatus } from "@/lib/utils/orders";
import { useOrdersStore } from "@/stores";

/**
 * Hook لإدارة الطلبات وحالاتها
 */
export function useOrders() {
  // استخدام useShallow لتقليل الاشتراكات وتحسين الأداء
  const {
    orders,
    selectedStatus,
    fetchOrders,
    setSelectedStatus,
  } = useOrdersStore(
    useShallow((state) => ({
      orders: state.orders,
      selectedStatus: state.selectedStatus,
      fetchOrders: state.fetchOrders,
      setSelectedStatus: state.setSelectedStatus,
    }))
  );

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
