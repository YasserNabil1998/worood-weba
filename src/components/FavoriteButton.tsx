"use client";

import { useState } from "react";
import { useNotification } from "../providers/notification-provider";
import { storage } from "@/src/lib/utils";
import { STORAGE_KEYS } from "@/src/constants";

interface FavoriteButtonProps {
    productId: string;
}

export default function FavoriteButton({ productId }: FavoriteButtonProps) {
    const [isFavorited, setIsFavorited] = useState(false);
    const { showNotification } = useNotification();

    const handleToggleFavorite = () => {
        try {
            const favorites = storage.get<string[]>(STORAGE_KEYS.FAVORITES, []);

            if (isFavorited) {
                const updatedFavorites = favorites.filter(
                    (id: string) => id !== productId
                );
                storage.set(STORAGE_KEYS.FAVORITES, updatedFavorites);
            } else {
                favorites.push(productId);
                storage.set(STORAGE_KEYS.FAVORITES, favorites);
            }

            setIsFavorited(!isFavorited);

            // إشعار موحد
            showNotification(
                isFavorited
                    ? "تم إزالة المنتج من المفضلة"
                    : "تم إضافة المنتج إلى المفضلة",
                isFavorited ? "info" : "success"
            );
        } catch (error) {
            console.error("خطأ في تحديث المفضلة:", error);
            showNotification("حدث خطأ في تحديث المفضلة", "error");
        }

        return (
            <button
                onClick={handleToggleFavorite}
                className={`px-6 py-4 border rounded-lg font-semibold transition-colors ${
                    isFavorited
                        ? "bg-red-500 text-white border-red-500"
                        : "border-[#5A5E4D] text-[#5A5E4D] hover:bg-[#5A5E4D] hover:text-white"
                }`}
                style={{ fontFamily: "var(--font-almarai)" }}
            >
                {isFavorited ? "في المفضلة" : "المفضلة"}
            </button>
        );
    };
}
