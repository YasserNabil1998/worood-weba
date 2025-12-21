import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import bouquetsData from "@/app/(pages)/custom/bouquets.json";
import type {
  Flower,
  BouquetSize,
  BouquetStyle,
  Color,
  Occasion,
  DeliveryTime,
  Config,
  Vase,
} from "@/types/custom";
import { logError } from "@/lib/logger";
import { useCustomBouquetStore } from "@/stores";

export function useCustomBuilderData() {
  const searchParams = useSearchParams();

  // Use store data
  const storeFlowers = useCustomBouquetStore((state) => state.flowers);
  const storeSizes = useCustomBouquetStore((state) => state.sizes);
  const storeOccasions = useCustomBouquetStore((state) => state.occasions);
  const storeIsLoading = useCustomBouquetStore((state) => state.isLoading);

  const fetchFlowers = useCustomBouquetStore((state) => state.fetchFlowers);
  const fetchSizes = useCustomBouquetStore((state) => state.fetchSizes);
  const fetchOccasions = useCustomBouquetStore((state) => state.fetchOccasions);
  const fetchPackagingTypes = useCustomBouquetStore((state) => state.fetchPackagingTypes);

  // Fetch data on mount
  useEffect(() => {
    fetchFlowers();
    fetchSizes();
    fetchOccasions();
    fetchPackagingTypes();
  }, [fetchFlowers, fetchSizes, fetchOccasions, fetchPackagingTypes]);

  // Use store data if available, otherwise fallback to JSON data
  const flowers = storeFlowers.length > 0 ? storeFlowers : bouquetsData.flowers;
  const bouquetSizes = storeSizes.length > 0 ? storeSizes : bouquetsData.bouquetSizes;
  const occasions = storeOccasions.length > 0 ? storeOccasions : bouquetsData.occasions;

  // For now, keep using JSON data for these (they might not be in the store yet)
  const bouquetStyles = bouquetsData.bouquetStyles;
  const vases = bouquetsData.vases;
  const colors = bouquetsData.colors;
  const deliveryTimes = bouquetsData.deliveryTimes;
  const config = bouquetsData.config;
  const isLoading = storeIsLoading;

  return {
    flowers,
    bouquetSizes,
    bouquetStyles,
    vases,
    colors,
    occasions,
    deliveryTimes,
    config,
    isLoading,
  };
}
