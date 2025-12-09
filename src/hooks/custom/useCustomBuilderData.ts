import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import bouquetsData from "@/app/(pages)/custom/bouquets.json";
import type {
  Flower,
  BouquetSize,
  BouquetStyle,
  Color,
  Occasion,
  DeliveryTime,
  CustomPaymentMethod,
  Config,
  Vase,
} from "@/types/custom";
import { logError } from "@/lib/logger";

export function useCustomBuilderData() {
  const searchParams = useSearchParams();
  const [flowers, setFlowers] = useState<Flower[]>([]);
  const [bouquetSizes, setBouquetSizes] = useState<BouquetSize[]>([]);
  const [bouquetStyles, setBouquetStyles] = useState<BouquetStyle[]>([]);
  const [vases, setVases] = useState<Vase[]>([]);
  const [colors, setColors] = useState<Color[]>([]);
  const [occasions, setOccasions] = useState<Occasion[]>([]);
  const [deliveryTimes, setDeliveryTimes] = useState<DeliveryTime[]>([]);
  const [paymentMethods, setPaymentMethods] = useState<CustomPaymentMethod[]>([]);
  const [config, setConfig] = useState<Config>({
    vatRate: 0.15,
    cardPrice: 15,
  });
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        setFlowers(bouquetsData.flowers);
        setBouquetSizes(bouquetsData.bouquetSizes);
        setBouquetStyles(bouquetsData.bouquetStyles);
        setVases(bouquetsData.vases);
        setColors(bouquetsData.colors);
        setOccasions(bouquetsData.occasions);
        setDeliveryTimes(bouquetsData.deliveryTimes);
        setPaymentMethods(bouquetsData.paymentMethods);
        setConfig(bouquetsData.config);
        setIsLoading(false);
      } catch (error) {
        logError("Error loading bouquet data", error);
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  return {
    flowers,
    bouquetSizes,
    bouquetStyles,
    vases,
    colors,
    occasions,
    deliveryTimes,
    paymentMethods,
    config,
    isLoading,
  };
}
