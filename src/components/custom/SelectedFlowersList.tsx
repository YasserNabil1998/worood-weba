import { Flower } from "@/types/custom";

interface SelectedFlowersListProps {
  selectedFlowers: Record<number, number>;
  flowers: Flower[];
  totalFlowersCount: number;
}

export default function SelectedFlowersList({
  selectedFlowers,
  flowers,
  totalFlowersCount,
}: SelectedFlowersListProps) {
  if (totalFlowersCount === 0) {
    return (
      <p className="text-[12px] text-gray-500 mb-3 bg-gray-50 p-2 rounded-md text-center">
        اختر الزهور التي تفضلها لإنشاء باقتك المخصصة
      </p>
    );
  }

  return (
    <div className="mb-3 space-y-1">
      {Object.entries(selectedFlowers)
        .filter(([_, qty]) => qty > 0)
        .map(([id, qty]) => {
          const flower = flowers.find((f) => f.id === Number(id));
          if (!flower) return null;
          return (
            <div
              key={id}
              className="flex items-center justify-between text-[12px] bg-gray-50 px-3 py-2 rounded-md"
            >
              <span className="text-gray-700">{flower.name}</span>
              <div className="flex items-center gap-1">
                <span className="text-sm font-bold text-[#5A5E4D]">
                  {qty} × {flower.price}
                </span>
                <span className="text-xs text-[#5A5E4D]">
                  ر.س
                </span>
              </div>
            </div>
          );
        })}
    </div>
  );
}
