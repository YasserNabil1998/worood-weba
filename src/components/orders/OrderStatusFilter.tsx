import { almaraiFont, ORDER_STATUS_OPTIONS } from "@/src/lib/ordersHelpers";
import { Filter } from "lucide-react";

interface OrderStatusFilterProps {
  selectedStatus: string;
  onStatusChange: (status: string) => void;
}

export default function OrderStatusFilter({
  selectedStatus,
  onStatusChange,
}: OrderStatusFilterProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-5 mb-6 border border-gray-100 hover:shadow-md transition-shadow duration-300">
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2">
          <div className="bg-gradient-to-br from-[#5A5E4D] to-[#6B6F5E] p-2 rounded-lg">
            <Filter className="w-4 h-4 text-white" />
          </div>
          <span
            className="text-gray-800 font-semibold text-base"
            style={almaraiFont}
          >
            فلترة حسب الحالة:
          </span>
        </div>

        <div className="flex flex-wrap gap-2.5">
          {ORDER_STATUS_OPTIONS.map((status) => (
            <button
              key={status}
              onClick={() => onStatusChange(status)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 transform hover:scale-105 ${
                selectedStatus === status
                  ? "bg-gradient-to-r from-[#5A5E4D] to-[#6B6F5E] text-white shadow-md"
                  : "bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-200"
              }`}
              style={almaraiFont}
            >
              {status}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
