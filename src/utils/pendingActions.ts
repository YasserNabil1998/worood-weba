"use client";

import { storage } from "@/lib/utils";
import { STORAGE_KEYS } from "@/constants";
import type { CartItem } from "@/types/cart";
import type { BouquetItem } from "@/types/bouquets";
import type { CustomBouquet } from "@/types/favorites";

export type PendingActionType =
  | "addToCart"
  | "addToFavorites"
  | "addCustomBouquetToCart"
  | "addCustomBouquetToFavorites";

// Discriminated union لتحسين type safety
export type PendingAction =
  | {
      type: "addToCart";
      data: CartItem;
      timestamp: number;
      returnPath?: string;
    }
  | {
      type: "addToFavorites";
      data: BouquetItem;
      timestamp: number;
      returnPath?: string;
    }
  | {
      type: "addCustomBouquetToCart";
      data: CartItem;
      timestamp: number;
      returnPath?: string;
    }
  | {
      type: "addCustomBouquetToFavorites";
      data: CustomBouquet;
      timestamp: number;
      returnPath?: string;
    };

/**
 * حفظ إجراء معلق في localStorage
 */
export function savePendingAction<T extends PendingActionType>(
  type: T,
  data: T extends "addToCart"
    ? CartItem
    : T extends "addToFavorites"
    ? BouquetItem
    : T extends "addCustomBouquetToCart"
    ? CartItem
    : T extends "addCustomBouquetToFavorites"
    ? CustomBouquet
    : never,
  returnPath?: string
): void {
  const pendingAction = {
    type,
    data,
    timestamp: Date.now(),
    returnPath: returnPath || (typeof window !== "undefined" ? window.location.pathname : "/"),
  } as PendingAction;

  storage.set(STORAGE_KEYS.PENDING_ACTION, pendingAction);
}

/**
 * قراءة الإجراء المعلق من localStorage
 */
export function getPendingAction(): PendingAction | null {
  return storage.get<PendingAction | null>(STORAGE_KEYS.PENDING_ACTION, null);
}

/**
 * حذف الإجراء المعلق من localStorage
 */
export function clearPendingAction(): void {
  storage.remove(STORAGE_KEYS.PENDING_ACTION);
}

/**
 * التحقق من وجود إجراء معلق
 */
export function hasPendingAction(): boolean {
  const action = getPendingAction();
  if (!action) return false;

  // التحقق من أن الإجراء لم يمر عليه أكثر من 24 ساعة
  const maxAge = 24 * 60 * 60 * 1000; // 24 ساعة
  const age = Date.now() - action.timestamp;

  if (age > maxAge) {
    clearPendingAction();
    return false;
  }

  return true;
}

