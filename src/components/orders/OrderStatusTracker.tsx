import { Order } from "@/src/@types/orders/order.type";
import { almaraiFont } from "@/src/lib/ordersHelpers";
import { Flower2, XCircle } from "lucide-react";

const TRACK_STEPS: Array<{
  key: Exclude<Order["status"], "قيد التجهيز" | "ملغي">;
  label: string;
}> = [
  { key: "تم التجهيز", label: "قيد التجهيز" },
  { key: "في الطريق", label: "في الطريق" },
  { key: "تم التسليم", label: "تم التسليم" },
];

const STATUS_INDEX: Record<Order["status"], number> = {
  "قيد التجهيز": -1,
  "تم التجهيز": 0,
  "في الطريق": 1,
  "تم التسليم": 2,
  ملغي: -2,
};

interface OrderStatusTrackerProps {
  status: Order["status"];
}

export default function OrderStatusTracker({ status }: OrderStatusTrackerProps) {
  const activeIndex = STATUS_INDEX[status] ?? -1;
  const isCancelled = status === "ملغي";
  const isPending = activeIndex < 0 && !isCancelled;
  const indicatorPosition = isCancelled
    ? 0
    : activeIndex < 0
      ? 0
      : (activeIndex / (TRACK_STEPS.length - 1)) * 100;
  const trackFillWidth = Math.max(0, Math.min(100, isPending ? 0 : indicatorPosition));
  const indicatorRight = Math.max(0, Math.min(100, indicatorPosition));
  const indicatorStyle = isCancelled
    ? {}
    : indicatorRight <= 0
      ? { right: "0%", transform: "translate(0, -50%)" }
      : indicatorRight >= 100
        ? { right: "100%", transform: "translate(100%, -50%)" }
        : { right: `${indicatorRight}%`, transform: "translate(50%, -50%)" };

  return (
    <div className="w-full">
      {isCancelled ? (
        <div className="flex items-center gap-3 rounded-xl bg-red-50 px-4 py-3 text-red-700">
          <XCircle className="h-5 w-5" />
          <div className="space-y-1" style={almaraiFont}>
            <p className="text-sm font-semibold">تم إلغاء الطلب</p>
            <p className="text-xs text-red-600/80">لا يمكن تتبع طلب ملغي.</p>
          </div>
        </div>
      ) : (
        <div className="mt-2" style={almaraiFont}>
          <div className="relative h-1.5 w-full rounded-full bg-gray-200">
            <div
              className="absolute inset-y-0 right-0 rounded-full bg-gradient-to-l from-[#5A5E4D] to-[#6B6F5E] transition-all duration-500"
              style={{ width: `${trackFillWidth}%` }}
            />

            <span
              className={`absolute top-1/2 flex h-12 w-12 items-center justify-center rounded-full border-2 transition-all duration-500 ${
                isPending
                  ? "border-gray-200 bg-white text-gray-300"
                  : "border-white bg-gradient-to-r from-[#5A5E4D] to-[#6B6F5E] text-white shadow"
              }`}
              style={indicatorStyle}
            >
              <Flower2 className="h-5 w-5" />
            </span>
          </div>

          <div className="mt-6 flex justify-between text-xs font-semibold">
            {TRACK_STEPS.map((step, index) => {
              const stepState =
                activeIndex > index ? "complete" : activeIndex === index ? "current" : "upcoming";

              return (
                <span
                  key={step.key}
                  className={`transition-colors ${
                    stepState === "complete"
                      ? "text-[#5A5E4D]"
                      : stepState === "current"
                        ? "text-[#6B6F5E]"
                        : "text-gray-400"
                  }`}
                >
                  {step.label}
                </span>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
