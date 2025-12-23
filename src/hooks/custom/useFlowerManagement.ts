import { useEffect, useCallback, useRef } from "react";

interface UseFlowerManagementProps {
  selectedFlowers: Record<number, number>;
  setSelectedFlowers: (
    flowers: Record<number, number> | ((prev: Record<number, number>) => Record<number, number>)
  ) => void;
  selectedColors: { [flowerId: string]: number[] };
  setSelectedColors: (
    colors:
      | { [flowerId: string]: number[] }
      | ((prev: { [flowerId: string]: number[] }) => { [flowerId: string]: number[] })
  ) => void;
  size: "small" | "medium" | "large" | "custom";
  setSize: (size: "small" | "medium" | "large" | "custom") => void;
  customFlowerCount: number;
  setCustomFlowerCount: (count: number) => void;
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
  setCustomFlowerCount,
  totalFlowersCount,
  isUpdatingFlowersRef,
}: UseFlowerManagementProps) {
  // Flower quantity handlers
  const qty = (id: number) => selectedFlowers[id] ?? 0;

  const inc = useCallback(
    (id: number) => {
      // منع التحديث التلقائي أثناء الضغط على الزر
      isUpdatingFlowersRef.current = true;
      setSelectedFlowers((s) => ({ ...s, [id]: (s[id] ?? 0) + 1 }));
      // إعادة تفعيل التحديث التلقائي بعد التحديث
      setTimeout(() => {
        isUpdatingFlowersRef.current = false;
      }, 100);
    },
    [setSelectedFlowers, isUpdatingFlowersRef]
  );

  const dec = useCallback(
    (id: number) => {
      // منع التحديث التلقائي أثناء الضغط على الزر
      isUpdatingFlowersRef.current = true;
      setSelectedFlowers((s) => ({
        ...s,
        [id]: Math.max(0, (s[id] ?? 0) - 1),
      }));
      // إعادة تفعيل التحديث التلقائي بعد التحديث
      setTimeout(() => {
        isUpdatingFlowersRef.current = false;
      }, 100);
    },
    [setSelectedFlowers, isUpdatingFlowersRef]
  );

  // Color selection handler
  const setFlowerColor = useCallback(
    (flowerId: string, colorId: number) => {
      const numericId = Number(flowerId);
      const qtyForFlower = selectedFlowers[numericId] ?? 0;

      setSelectedColors((prev) => {
        const current = prev[flowerId] || [];

        // إذا كان اللون مختارًا بالفعل، قم بإزالته (إلغاء التحديد)
        if (current.includes(colorId)) {
          return {
            ...prev,
            [flowerId]: current.filter((c) => c !== colorId),
          };
        }

        // إذا لم يتم اختيار أي كمية من هذه الزهرة، لا نسمح باختيار ألوان
        if (qtyForFlower <= 0) {
          return prev;
        }

        // إذا كانت الكمية 1 -> اسمح بلون واحد فقط (استبدل أي لون سابق بهذا اللون)
        if (qtyForFlower === 1) {
          return {
            ...prev,
            [flowerId]: [colorId],
          };
        }

        // لا تسمح بعدد ألوان أكبر من عدد الزهور المختارة لنفس النوع
        if (current.length >= qtyForFlower) {
          return prev;
        }

        // إضافة لون جديد مع الحفاظ على الحدود
        return {
          ...prev,
            [flowerId]: [...current, colorId],
          };
      });
    },
    [setSelectedColors, selectedFlowers]
  );

  // Complete flowers for size
  const completeFlowersForSize = useCallback(() => {
    const targetCount = size === "large" ? 18 : size === "medium" ? 12 : 7;

    if (totalFlowersCount < targetCount && totalFlowersCount > 0) {
      const currentFlowers = Object.entries(selectedFlowers).filter(([_, qty]) => qty > 0);

      if (currentFlowers.length > 0) {
        const newFlowers: Record<number, number> = {};
        let remaining = targetCount;

        currentFlowers.forEach(([id, qty], index) => {
          const ratio = qty / totalFlowersCount;

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
    }
  }, [size, totalFlowersCount, selectedFlowers, setSelectedFlowers]);

  // Handle size change
  const handleSizeChange = useCallback(
    (newSize: "small" | "medium" | "large" | "custom") => {
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

      const currentFlowers = Object.entries(selectedFlowers).filter(([_, qty]) => qty > 0);

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
    },
    [totalFlowersCount, customFlowerCount, selectedFlowers, setSelectedFlowers, setSize]
  );

  // Auto-select size based on flower count
  useEffect(() => {
    // إذا كان عدد الزهور 0، لا نفعل شيء (يبقى custom)
    if (totalFlowersCount === 0) {
      return;
    }

    // تحديد الحجم بناءً على عدد الزهور بدقة
    // small: 7-10, medium: 12-15, large: 18-25, custom: أي عدد آخر
    if (totalFlowersCount >= 18 && totalFlowersCount <= 25) {
      if (size !== "large") {
        setSize("large");
      }
    } else if (totalFlowersCount >= 12 && totalFlowersCount <= 15) {
      if (size !== "medium") {
        setSize("medium");
      }
    } else if (totalFlowersCount >= 7 && totalFlowersCount <= 10) {
      if (size !== "small") {
        setSize("small");
      }
    } else {
      // إذا كان العدد خارج النطاقات، نختار custom ونحدّث customFlowerCount
      if (size !== "custom") {
        setSize("custom");
        setCustomFlowerCount(totalFlowersCount);
      } else if (customFlowerCount !== totalFlowersCount) {
        // إذا كان الحجم custom بالفعل، نحدّث customFlowerCount
        setCustomFlowerCount(totalFlowersCount);
      }
    }
  }, [totalFlowersCount, size, setSize, setCustomFlowerCount, customFlowerCount]);

  // استخدام useRef لتتبع آخر selectedFlowers لتجنب حلقة التحديثات
  const selectedFlowersRef = useRef(selectedFlowers);
  useEffect(() => {
    selectedFlowersRef.current = selectedFlowers;
  }, [selectedFlowers]);

  // Auto-update flowers for custom count
  // هذا الـ useEffect يعمل فقط عندما يتغير customFlowerCount يدوياً (من المستخدم)
  useEffect(() => {
    // إذا كان هناك تحديث يدوي قيد التنفيذ، لا نفعل شيء
    if (isUpdatingFlowersRef.current) {
      return;
    }

    if (
      size === "custom" &&
      totalFlowersCount > 0 &&
      customFlowerCount !== totalFlowersCount &&
      customFlowerCount >= 1 &&
      customFlowerCount <= 1000
    ) {
      isUpdatingFlowersRef.current = true;

      // استخدام ref بدلاً من state مباشرة لتجنب حلقة التحديثات
      const currentFlowers = Object.entries(selectedFlowersRef.current).filter(([_, qty]) => qty > 0);

      if (currentFlowers.length > 0) {
        const newFlowers: Record<number, number> = {};
        let remaining = customFlowerCount;

        currentFlowers.forEach(([id, qty], index) => {
          const ratio = qty / totalFlowersCount;

          if (index === currentFlowers.length - 1) {
            newFlowers[Number(id)] = Math.max(1, remaining);
          } else {
            const newQty = Math.max(1, Math.round(customFlowerCount * ratio));
            newFlowers[Number(id)] = newQty;
            remaining -= newQty;
          }
        });

        setSelectedFlowers(newFlowers);
      }

      setTimeout(() => {
        isUpdatingFlowersRef.current = false;
      }, 50);
    }
  }, [
    customFlowerCount,
    size,
    totalFlowersCount,
    setSelectedFlowers,
    isUpdatingFlowersRef,
  ]);

  return {
    qty,
    inc,
    dec,
    setFlowerColor,
    completeFlowersForSize,
    handleSizeChange,
  };
}
