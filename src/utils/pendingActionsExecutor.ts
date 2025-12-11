"use client";

import { clearPendingAction } from "./pendingActions";
import { logError } from "@/lib/logger";
import type { PendingAction } from "./pendingActions";
import type { CartItem } from "@/types/cart";
import type { BouquetItem } from "@/types/bouquets";
import type { CustomBouquet } from "@/types/favorites";

interface PendingActionExecutorDependencies {
  addToCart: (item: CartItem) => void;
  addToFavorites: (item: BouquetItem) => boolean;
  addCustomBouquetToCart: (bouquet: CustomBouquet) => boolean;
  addCustomBouquetToFavorites: (bouquet: CustomBouquet) => boolean;
  showNotification: (message: string, type: "success" | "error" | "warning" | "info") => void;
}

/**
 * تنفيذ الإجراء المعلق بعد تسجيل الدخول
 */
export async function executePendingAction(
  pendingAction: PendingAction,
  deps: PendingActionExecutorDependencies
): Promise<void> {
  try {
    switch (pendingAction.type) {
      case "addToCart": {
        // TypeScript يعرف أن pendingAction.data هو CartItem هنا
        deps.addToCart(pendingAction.data);
        deps.showNotification("تم إضافة المنتج إلى السلة بنجاح! ✓", "success");
        break;
      }

      case "addToFavorites": {
        // TypeScript يعرف أن pendingAction.data هو BouquetItem هنا
        const added = deps.addToFavorites(pendingAction.data);
        if (added) {
          deps.showNotification("تم إضافة المنتج إلى المفضلة بنجاح! ✓", "success");
        }
        break;
      }

      case "addCustomBouquetToCart": {
        // TypeScript يعرف أن pendingAction.data هو CartItem هنا
        deps.addToCart(pendingAction.data);
        deps.showNotification("تم إضافة الباقة إلى السلة بنجاح! ✓", "success");
        break;
      }

      case "addCustomBouquetToFavorites": {
        // TypeScript يعرف أن pendingAction.data هو CustomBouquet هنا
        deps.addCustomBouquetToFavorites(pendingAction.data);
        deps.showNotification("تم إضافة الباقة إلى المفضلة بنجاح! ✓", "success");
        break;
      }

      default:
        break;
    }

    clearPendingAction();
  } catch (error) {
    logError("Error executing pending action", error, {
      actionType: pendingAction.type,
      timestamp: pendingAction.timestamp,
    });
    deps.showNotification("حدث خطأ أثناء تنفيذ الإجراء المعلق", "error");
    throw error;
  }
}

