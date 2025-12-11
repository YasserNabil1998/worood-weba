"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "@/providers/auth-provider";
import { useNotification } from "@/providers/notification-provider";
import { savePendingAction } from "@/utils/pendingActions";
import type { PendingActionType } from "@/utils/pendingActions";
import type { CartItem } from "@/types/cart";
import type { BouquetItem } from "@/types/bouquets";
import type { CustomBouquet } from "@/types/favorites";

/**
 * Hook للتحقق من تسجيل الدخول قبل تنفيذ إجراء معين
 */
export function useRequireAuth() {
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  const { showNotification } = useNotification();

  const requireAuth = <T extends PendingActionType>(
    actionType: T,
    actionData: T extends "addToCart"
      ? CartItem
      : T extends "addToFavorites"
      ? BouquetItem
      : T extends "addCustomBouquetToCart"
      ? CartItem
      : T extends "addCustomBouquetToFavorites"
      ? CustomBouquet
      : never,
    message: string = "يجب تسجيل الدخول لإكمال هذه العملية"
  ): boolean => {
    if (isAuthenticated) {
      return true;
    }

    // حفظ الإجراء المعلق
    savePendingAction(actionType, actionData as any);

    // إظهار رسالة توضيحية
    showNotification(message, "info");

    // التوجيه لصفحة تسجيل الدخول مع حفظ المسار الحالي
    if (typeof window !== "undefined") {
      const currentPath = window.location.pathname;
      router.push(`/login?return=${encodeURIComponent(currentPath)}`);
    } else {
      router.push("/login");
    }

    return false;
  };

  return { requireAuth, isAuthenticated };
}

