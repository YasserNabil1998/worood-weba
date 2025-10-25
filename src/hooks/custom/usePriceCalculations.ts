import { useMemo } from "react";
import {
    Flower,
    BouquetSize,
    BouquetStyle,
    Vase,
    Config,
    PackagingType,
} from "@/src/@types/custom/index.type";

interface UsePriceCalculationsProps {
    selectedFlowers: Record<number, number>;
    flowers: Flower[];
    bouquetSizes: BouquetSize[];
    bouquetStyles: BouquetStyle[];
    vases: Vase[];
    size: "small" | "medium" | "large" | "custom";
    style: "classic" | "premium" | "gift" | "eco";
    packagingType: PackagingType;
    selectedVase: string;
    includeCard: boolean;
    config: Config;
}

export function usePriceCalculations({
    selectedFlowers,
    flowers,
    bouquetSizes,
    bouquetStyles,
    vases,
    size,
    style,
    packagingType,
    selectedVase,
    includeCard,
    config,
}: UsePriceCalculationsProps) {
    
    const getSizePrice = (s: "small" | "medium" | "large") => {
        const sizeData = bouquetSizes.find((x) => x.key === s);
        return sizeData?.price || 0;
    };

    const getStylePrice = (s: "classic" | "premium" | "gift" | "eco") => {
        const styleData = bouquetStyles.find((x) => x.key === s);
        return styleData?.price || 0;
    };

    // Calculate total flowers count
    const totalFlowersCount = useMemo(
        () => Object.values(selectedFlowers).reduce((sum, qty) => sum + qty, 0),
        [selectedFlowers]
    );

    // Calculate individual prices
    const stylePrice = useMemo(
        () => getStylePrice(style),
        [style, bouquetStyles]
    );

    const vasePrice = useMemo(() => {
        if (packagingType === "vase" && selectedVase) {
            const vase = vases.find((v) => v.id.toString() === selectedVase);
            return vase ? vase.price : 0;
        }
        return 0;
    }, [packagingType, selectedVase, vases]);

    const flowersPrice = useMemo(() => {
        return Object.entries(selectedFlowers).reduce((sum, [id, qty]) => {
            const f = flowers.find((x) => x.id === Number(id));
            return sum + (f ? f.price * qty : 0);
        }, 0);
    }, [selectedFlowers, flowers]);

    const cardPrice = useMemo(
        () => (includeCard ? config.cardPrice : 0),
        [includeCard, config]
    );

    // Calculate subtotal
    const subtotal = useMemo(() => {
        if (totalFlowersCount === 0) {
            return 0;
        }

        const stylePriceValue = packagingType === "paper" ? getStylePrice(style) : 0;
        const vasePriceValue =
            packagingType === "vase" && selectedVase
                ? vases.find((v) => v.id.toString() === selectedVase)?.price || 0
                : 0;
        const flowersPriceValue = Object.entries(selectedFlowers).reduce(
            (sum, [id, qty]) => {
                const f = flowers.find((x) => x.id === Number(id));
                return sum + (f ? f.price * qty : 0);
            },
            0
        );
        const cardPriceValue = includeCard ? config.cardPrice : 0;
        return stylePriceValue + vasePriceValue + flowersPriceValue + cardPriceValue;
    }, [
        selectedFlowers,
        size,
        style,
        packagingType,
        selectedVase,
        includeCard,
        totalFlowersCount,
        flowers,
        bouquetSizes,
        bouquetStyles,
        vases,
        config,
    ]);

    const vat = useMemo(() => subtotal * config.vatRate, [subtotal, config]);
    const total = useMemo(() => subtotal + vat, [subtotal, vat]);

    return {
        totalFlowersCount,
        stylePrice,
        vasePrice,
        flowersPrice,
        cardPrice,
        subtotal,
        vat,
        total,
        getSizePrice,
        getStylePrice,
    };
}

