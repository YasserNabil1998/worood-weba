import { useCallback } from "react";
import { useSearchParams } from "next/navigation";
import {
    Flower,
    BouquetSize,
    BouquetStyle,
    Vase,
    Occasion,
    DeliveryTime,
    PaymentMethod,
    Config,
    PackagingType,
} from "@/src/@types/custom/index.type";

interface UseCartOperationsProps {
    selectedFlowers: Record<number, number>;
    selectedColors: { [flowerId: string]: number[] };
    size: "small" | "medium" | "large" | "custom";
    style: "classic" | "premium" | "gift" | "eco";
    packagingType: PackagingType;
    selectedVase: string;
    occasion: string;
    cardMessage: string;
    includeCard: boolean;
    notes: string;
    deliveryDate: string;
    deliveryTime: string;
    city: string;
    district: string;
    street: string;
    landmark: string;
    phone: string;
    payMethod: string;
    bouquetImage: string;
    totalFlowersCount: number;
    subtotal: number;
    vat: number;
    total: number;
    isAddingToCart: boolean;
    setIsAddingToCart: (value: boolean) => void;
    showNotification: (message: string) => void;
    saveToHistory: () => void;
    flowers: Flower[];
    bouquetSizes: BouquetSize[];
    bouquetStyles: BouquetStyle[];
    vases: Vase[];
    occasions: Occasion[];
    deliveryTimes: DeliveryTime[];
    paymentMethods: PaymentMethod[];
    config: Config;
}

export function useCartOperations(props: UseCartOperationsProps) {
    const searchParams = useSearchParams();

    const addToCart = useCallback(async () => {
        if (typeof window === "undefined") return;

        // Prevent multiple clicks
        if (props.isAddingToCart) return;

        // Verify flowers are selected
        if (props.totalFlowersCount === 0) {
            props.showNotification("⚠️ يرجى اختيار الزهور أولاً");
            return;
        }

        // Activate loading state
        props.setIsAddingToCart(true);

        // Prepare flower details
        const flowersDetails = Object.entries(props.selectedFlowers)
            .filter(([_, qty]) => qty > 0)
            .map(([id, quantity]) => {
                const flower = props.flowers.find((f) => f.id === Number(id));
                return {
                    id: Number(id),
                    name: flower?.name || "",
                    price: flower?.price || 0,
                    quantity,
                    total: (flower?.price || 0) * quantity,
                };
            });

        // Size details
        const sizeDetails = props.bouquetSizes.find((s) => s.key === props.size);

        // Style details
        const styleDetails = props.bouquetStyles.find((s) => s.key === props.style);

        // Occasion details
        const occasionDetails = props.occasions.find((o) => o.name === props.occasion);

        // Validate values
        const finalSubtotal = isNaN(props.subtotal) || props.subtotal === 0 ? 0 : props.subtotal;
        const finalVat = isNaN(props.vat) || props.vat === 0 ? 0 : props.vat;
        const finalTotal = isNaN(props.total) || props.total === 0 ? 0 : props.total;

        // Check if editing
        const editItemId = localStorage.getItem("editItemId");
        const isEditMode = searchParams.get("edit") === "true" && editItemId;

        const cart = JSON.parse(localStorage.getItem("cart") || "[]");
        const safeCart = Array.isArray(cart) ? cart : [];

        const itemData = {
            title: "باقة مخصصة",
            price: Number(finalTotal.toFixed(2)) || 0,
            subtotal: Number(finalSubtotal.toFixed(2)) || 0,
            vat: Number(finalVat.toFixed(2)) || 0,
            quantity: 1,
            image: props.bouquetImage,
            isCustom: true,
            customData: {
                // Step 1 - Flowers with full details
                flowers: flowersDetails,
                flowersCount: props.totalFlowersCount,
                colors: props.selectedColors,

                // Step 2 - Size and packaging with details
                size: {
                    key: props.size,
                    label: sizeDetails?.label || "",
                    price: sizeDetails?.price || 0,
                    stems: sizeDetails?.stems || "",
                },
                packaging: {
                    type: props.packagingType,
                    ...(props.packagingType === "paper"
                        ? {
                              style: {
                                  key: props.style,
                                  label: styleDetails?.label || "",
                                  price: styleDetails?.price || 0,
                              },
                          }
                        : {}),
                    ...(props.packagingType === "vase" && props.selectedVase
                        ? {
                              vase: {
                                  id: props.selectedVase,
                                  name:
                                      props.vases.find(
                                          (v) => v.id.toString() === props.selectedVase
                                      )?.name || "",
                                  price:
                                      props.vases.find(
                                          (v) => v.id.toString() === props.selectedVase
                                      )?.price || 0,
                              },
                          }
                        : {}),
                },

                // Step 3 - Customization
                occasion: {
                    name: props.occasion,
                    message: occasionDetails?.message || "",
                },
                cardMessage: props.cardMessage,
                includeCard: props.includeCard,
                cardPrice: props.includeCard ? props.config.cardPrice : 0,
                notes: props.notes,

                // Step 4 - Delivery and payment
                deliveryInfo: {
                    date: props.deliveryDate,
                    time: props.deliveryTime,
                    timeLabel:
                        props.deliveryTimes.find((t) => t.value === props.deliveryTime)
                            ?.label || "",
                    address: {
                        city: props.city,
                        district: props.district,
                        street: props.street,
                        landmark: props.landmark,
                    },
                    phone: props.phone,
                    paymentMethod: props.payMethod,
                    paymentMethodLabel:
                        props.paymentMethods.find((p) => p.key === props.payMethod)
                            ?.label || "",
                },
            },
        };

        // Add uniqueKey for custom bouquet
        const { addProductToCart } = await import("@/src/lib/cartUtils");
        const { generateProductKey } = await import("@/src/lib/cartUtils");

        const itemWithKey = {
            ...itemData,
            uniqueKey: generateProductKey(itemData),
        };

        if (isEditMode) {
            // Edit mode: update existing item
            const itemIndex = safeCart.findIndex(
                (item: any) => item.id.toString() === editItemId
            );
            if (itemIndex !== -1) {
                // Keep original id
                safeCart[itemIndex] = {
                    ...itemWithKey,
                    id: safeCart[itemIndex].id,
                };
                props.showNotification("تم تحديث الباقة بنجاح! ✅");
            } else {
                // If item not found, add as new
                safeCart.push({
                    ...itemWithKey,
                    id: Date.now(),
                });
                props.showNotification("تمت إضافة الباقة إلى السلة بنجاح! 🛒");
            }
            // Remove edit ID
            localStorage.removeItem("editItemId");
        } else {
            // Normal add mode
            safeCart.push({
                ...itemWithKey,
                id: Date.now(),
            });
            props.showNotification("تمت إضافة الباقة إلى السلة بنجاح! 🛒");
        }

        localStorage.setItem("cart", JSON.stringify(safeCart));

        // Dispatch event
        window.dispatchEvent(new Event("cartUpdated"));

        props.saveToHistory();

        setTimeout(() => {
            window.location.href = "/cart";
        }, 1500);
    }, [
        props.isAddingToCart,
        props.totalFlowersCount,
        props.selectedFlowers,
        props.flowers,
        props.bouquetSizes,
        props.size,
        props.bouquetStyles,
        props.style,
        props.occasions,
        props.occasion,
        props.subtotal,
        props.vat,
        props.total,
        props.bouquetImage,
        props.selectedColors,
        props.packagingType,
        props.selectedVase,
        props.vases,
        props.cardMessage,
        props.includeCard,
        props.config,
        props.notes,
        props.deliveryDate,
        props.deliveryTime,
        props.deliveryTimes,
        props.city,
        props.district,
        props.street,
        props.landmark,
        props.phone,
        props.payMethod,
        props.paymentMethods,
        props.setIsAddingToCart,
        props.showNotification,
        props.saveToHistory,
        searchParams,
    ]);

    return { addToCart };
}

