"use client";

import { Edit } from "lucide-react";

interface OccasionCardProps {
  /** Occasion data */
  occasion: {
    id: string;
    name: string;
    date: string;
    icon: string;
  };
  /** Callback when edit button is clicked */
  onEdit: (e: React.MouseEvent, occasionId: string) => void;
}

/**
 * Card component for displaying an occasion
 */
export default function OccasionCard({ occasion, onEdit }: OccasionCardProps) {
  return (
    <div className="bg-[#fbfbfb] border border-[#e0e0e0] rounded-[15px] p-4 flex items-center justify-between gap-3">
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <div className="text-[24px] sm:text-[28px] flex-shrink-0">{occasion.icon}</div>
        <div className="flex-1 min-w-0">
          <h3
            className="text-[16px] sm:text-[18px] font-bold text-black mb-1 truncate"
          >
            {occasion.name}
          </h3>
          <p className="text-[14px] sm:text-[16px] text-[#727272]">
            {occasion.date}
          </p>
        </div>
      </div>
      <button
        onClick={(e) => onEdit(e, occasion.id)}
        className="bg-[gainsboro] w-[40px] h-[36px] rounded-[5px] flex items-center justify-center hover:bg-gray-300 transition-colors cursor-pointer flex-shrink-0"
      >
        <Edit className="w-[20px] h-[20px] text-gray-700" />
      </button>
    </div>
  );
}

