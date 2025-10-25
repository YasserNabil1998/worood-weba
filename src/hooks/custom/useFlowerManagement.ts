import { useEffect, useCallback } from "react";

interface UseFlowerManagementProps {
    selectedFlowers: Record<number, number>;
    setSelectedFlowers: (flowers: Record<number, number> | ((prev: Record<number, number>) => Record<number, number>)) => void;
    selectedColors: { [flowerId: string]: number[] };
    setSelectedColors: (colors: { [flowerId: string]: number[] } | ((prev: { [flowerId: string]: number[] }) => { [flowerId: string]: number[] })) => void;
    size: "small" | "medium" | "large" | "custom";
    setSize: (size: "small" | "medium" | "large" | "custom") => void;
    customFlowerCount: number;
    totalFlowersCount: number;
    isUpdatingFlowersRef: React.MutableRefObject<boolean>;
}

export function useFlowerManagement({
    selectedFlowers,
    setSelectedFlowers,
    selectedColors,
    setSelectedColors,
    size,
    setSize,
    customFlowerCount,
    totalFlowersCount,
    isUpdatingFlowersRef,
}: UseFlowerManagementProps) {
    
    // Flower quantity handlers
    const qty = (id: number) => selectedFlowers[id] ?? 0;
    
    const inc = useCallback((id: number) => {
        setSelectedFlowers((s) => ({ ...s, [id]: (s[id] ?? 0) + 1 }));
    }, [setSelectedFlowers]);
    
    const dec = useCallback((id: number) => {
        setSelectedFlowers((s) => ({
            ...s,
            [id]: Math.max(0, (s[id] ?? 0) - 1),
        }));
    }, [setSelectedFlowers]);

    // Color selection handler
    const setFlowerColor = useCallback((flowerId: string, colorId: number) => {
        setSelectedColors((prev) => {
            const current = prev[flowerId] || [];
            if (current.includes(colorId)) {
                // Remove color
                return {
                    ...prev,
                    [flowerId]: current.filter((c) => c !== colorId),
                };
            } else {
                // Add color
                return {
                    ...prev,
                    [flowerId]: [...current, colorId],
                };
            }
        });
    }, [setSelectedColors]);

    // Complete flowers for size
    const completeFlowersForSize = useCallback(() => {
        const targetCount = size === "large" ? 18 : size === "medium" ? 12 : 7;

        if (totalFlowersCount < targetCount && totalFlowersCount > 0) {
            const currentFlowers = Object.entries(selectedFlowers).filter(
                ([_, qty]) => qty > 0
            );

            if (currentFlowers.length > 0) {
                const newFlowers: Record<number, number> = {};
                let remaining = targetCount;

                currentFlowers.forEach(([id, qty], index) => {
                    const ratio = qty / totalFlowersCount;

                    if (index === currentFlowers.length - 1) {
                        newFlowers[Number(id)] = Math.max(1, remaining);
                    } else {
                        const newQty = Math.max(
                            1,
                            Math.round(targetCount * ratio)
                        );
                        newFlowers[Number(id)] = newQty;
                        remaining -= newQty;
                    }
                });

                setSelectedFlowers(newFlowers);
            }
        }
    }, [size, totalFlowersCount, selectedFlowers, setSelectedFlowers]);

    // Handle size change
    const handleSizeChange = useCallback((newSize: "small" | "medium" | "large" | "custom") => {
        const currentCount = totalFlowersCount;
        const targetCount =
            newSize === "custom"
                ? customFlowerCount
                : newSize === "large"
                ? 18
                : newSize === "medium"
                ? 12
                : 7;

        if (currentCount === 0) {
            setSize(newSize);
            return;
        }

        if (newSize === "custom") {
            setSize(newSize);
            return;
        }

        const currentFlowers = Object.entries(selectedFlowers).filter(
            ([_, qty]) => qty > 0
        );

        if (currentFlowers.length > 0) {
            const newFlowers: Record<number, number> = {};
            let remaining = targetCount;

            currentFlowers.forEach(([id, qty], index) => {
                const ratio = qty / currentCount;

                if (index === currentFlowers.length - 1) {
                    newFlowers[Number(id)] = Math.max(1, remaining);
                } else {
                    const newQty = Math.max(1, Math.round(targetCount * ratio));
                    newFlowers[Number(id)] = newQty;
                    remaining -= newQty;
                }
            });

            setSelectedFlowers(newFlowers);
        }

        setSize(newSize);
    }, [totalFlowersCount, customFlowerCount, selectedFlowers, setSelectedFlowers, setSize]);

    // Auto-select size based on flower count
    useEffect(() => {
        if (size === "custom") {
            return;
        }

        if (totalFlowersCount === 0) {
            setSize("medium");
            return;
        }

        if (totalFlowersCount >= 18) {
            setSize("large");
        } else if (totalFlowersCount >= 12) {
            setSize("medium");
        } else {
            setSize("small");
        }
    }, [totalFlowersCount, size, setSize]);

    // Auto-update flowers for custom count
    useEffect(() => {
        if (
            size === "custom" &&
            totalFlowersCount > 0 &&
            customFlowerCount !== totalFlowersCount &&
            customFlowerCount >= 5 &&
            customFlowerCount <= 1000 &&
            !isUpdatingFlowersRef.current
        ) {
            isUpdatingFlowersRef.current = true;

            const currentFlowers = Object.entries(selectedFlowers).filter(
                ([_, qty]) => qty > 0
            );

            if (currentFlowers.length > 0) {
                const newFlowers: Record<number, number> = {};
                let remaining = customFlowerCount;

                currentFlowers.forEach(([id, qty], index) => {
                    const ratio = qty / totalFlowersCount;

                    if (index === currentFlowers.length - 1) {
                        newFlowers[Number(id)] = Math.max(1, remaining);
                    } else {
                        const newQty = Math.max(
                            1,
                            Math.round(customFlowerCount * ratio)
                        );
                        newFlowers[Number(id)] = newQty;
                        remaining -= newQty;
                    }
                });

                setSelectedFlowers(newFlowers);
            }

            setTimeout(() => {
                isUpdatingFlowersRef.current = false;
            }, 0);
        }
    }, [customFlowerCount, size, selectedFlowers, totalFlowersCount, setSelectedFlowers, isUpdatingFlowersRef]);

    return {
        qty,
        inc,
        dec,
        setFlowerColor,
        completeFlowersForSize,
        handleSizeChange,
    };
}

