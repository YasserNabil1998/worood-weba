"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { STORAGE_KEYS } from "@/constants";
import { logError } from "@/lib/logger";
import type { Order } from "@/types/orders";
import { defaultOrders } from "@/content/orders";

// Types
export interface RatingData {
  id: string | number;
  customerName: string;
  customerImage?: string | null;
  rating: number;
  comment?: string;
  date: string;
  productName: string;
}

// Re-export Order from types for API compatibility
export type { Order };

interface OrdersState {
  // Data
  orders: Order[];

  // Loading & Error
  isLoading: boolean;
  error: string | null;
  lastFetched: number | null;

  // Tracking
  trackedOrders: Set<string>; // Set of order IDs being tracked

  // Actions
  fetchOrders: () => Promise<void>;
  cancelOrder: (orderId: string) => Promise<{ success: boolean; error?: string }>;
  updateOrderStatus: (
    orderId: string,
    status: string
  ) => Promise<{ success: boolean; error?: string }>;
  reorder: (orderId: string) => Promise<{ success: boolean; error?: string }>;
  rateOrder: (orderId: string, rating: RatingData) => Promise<{ success: boolean; error?: string }>;
  refreshOrders: () => Promise<void>;
  trackOrder: (orderId: string) => void;
  stopTrackingOrder: (orderId: string) => void;
  checkOrderStatus: (orderId: string) => Promise<{
    success: boolean;
    statusChanged?: boolean;
    newStatus?: Order["status"];
    currentStatus?: Order["status"];
  }>;
}

const CACHE_DURATION = 3600000; // 1 hour in milliseconds

export const useOrdersStore = create<OrdersState>()(
  persist(
    (set, get) => ({
      // Initial state - use default orders data
      orders: defaultOrders,
      isLoading: false,
      error: null,
      lastFetched: null,
      trackedOrders: new Set<string>(),

      // Fetch orders
      fetchOrders: async () => {
        const { lastFetched, isLoading } = get();

        // Check cache
        if (lastFetched && Date.now() - lastFetched < CACHE_DURATION && get().orders.length > 0) {
          return; // Use cached data
        }

        if (isLoading) return;

        set({ isLoading: true, error: null });

        // TODO: Implement API call here
        // For now, use default orders if store is empty
        if (get().orders.length === 0) {
          set({ orders: defaultOrders, isLoading: false, error: null });
        } else {
          set({ isLoading: false, error: null });
        }
      },

      // Cancel order
      cancelOrder: async (orderId: string) => {
        set({ isLoading: true, error: null });

        // البحث عن الطلب
        const order = get().orders.find((o) => o.id === orderId);

        if (!order) {
          set({ isLoading: false, error: "الطلب غير موجود" });
          return { success: false, error: "الطلب غير موجود" };
        }

        // التحقق من أن الطلب في حالة "قيد التجهيز" فقط
        if (order.status !== "قيد التجهيز") {
          set({ isLoading: false, error: "لا يمكن إلغاء الطلب في هذه الحالة" });
          return { success: false, error: "لا يمكن إلغاء الطلب في هذه الحالة" };
        }

        // TODO: Implement API call here
        // Update local state
        set((state) => ({
          orders: state.orders.map((order) =>
            order.id === orderId ? { ...order, status: "ملغي" as const } : order
          ),
          isLoading: false,
          error: null,
        }));

        return { success: true };
      },

      // Update order status
      updateOrderStatus: async (orderId: string, status: string) => {
        set({ isLoading: true, error: null });

        // TODO: Implement API call here
        // Update local state
        set((state) => ({
          orders: state.orders.map((order) =>
            order.id === orderId ? { ...order, status: status as Order["status"] } : order
          ),
          isLoading: false,
          error: null,
        }));

        return { success: true };
      },

      // Reorder (add items to cart)
      reorder: async (orderId: string) => {
        set({ isLoading: true, error: null });

        const order = get().orders.find((o) => o.id === orderId);
        if (!order) {
          set({ isLoading: false, error: "الطلب غير موجود" });
          return { success: false, error: "الطلب غير موجود" };
        }

        // TODO: Implement API call here
        // TODO: Add items to cart using cartStore
        // import { useCartStore } from './cartStore';
        // const addItem = useCartStore.getState().addItem;
        // order.items.forEach(item => addItem(item));

        set({ isLoading: false, error: null });
        return { success: true };
      },

      // Rate order
      rateOrder: async (orderId: string, rating: RatingData) => {
        set({ isLoading: true, error: null });

        // TODO: Implement API call here
        set({ isLoading: false, error: null });
        return { success: true };
      },

      // Refresh orders
      refreshOrders: async () => {
        set({ lastFetched: null }); // Force refresh
        await get().fetchOrders();
      },

      // Track order status
      trackOrder: (orderId: string) => {
        const trackedOrders = new Set(get().trackedOrders);
        trackedOrders.add(orderId);
        set({ trackedOrders });
      },

      // Stop tracking order
      stopTrackingOrder: (orderId: string) => {
        const trackedOrders = new Set(get().trackedOrders);
        trackedOrders.delete(orderId);
        set({ trackedOrders });
      },

      // Check order status (for tracking)
      checkOrderStatus: async (orderId: string) => {
        const order = get().orders.find((o) => o.id === orderId);
        if (!order) {
          return { success: false };
        }

        const previousStatus = order.status;

        try {
          // TODO: Implement API call here to get latest status
          // import { getOrderStatus } from '@/lib/api/orders';
          // const { status: newStatus } = await getOrderStatus(orderId);

          // For now, simulate - in production this would fetch from API
          // If status changed, update it
          // if (newStatus !== previousStatus) {
          //   await get().updateOrderStatus(orderId, newStatus);
          //   return { success: true, statusChanged: true, newStatus };
          // }

          // إرجاع الحالة الحالية حتى لو لم تتغير (لإظهارها في الإشعار)
          return {
            success: true,
            statusChanged: false,
            currentStatus: previousStatus, // إرجاع الحالة الحالية
          };
        } catch (error) {
          logError("Error checking order status", error);
          return { success: false };
        }
      },
    }),
    {
      name: STORAGE_KEYS.ORDERS_STORE || "ordersStore",
      partialize: (state) => ({
        orders: state.orders,
        lastFetched: state.lastFetched,
        // trackedOrders is not persisted (Set cannot be serialized)
      }),
    }
  )
);
