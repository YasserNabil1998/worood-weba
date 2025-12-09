import { UI_TEXTS } from "@/constants";

/**
 * Skeleton Card Component
 * مكون عام لعرض placeholder أثناء التحميل
 */

interface SkeletonCardProps {
  className?: string;
}

export default function SkeletonCard({ className = "" }: SkeletonCardProps) {
  return (
    <div
      className={`bg-white rounded-xl shadow-md overflow-hidden animate-pulse ${className}`}
      role="status"
      aria-label={UI_TEXTS.LOADING}
    >
      {/* Image placeholder */}
      <div className="h-80 bg-linear-to-r from-gray-200 via-gray-300 to-gray-200 bg-size-[200%_100%] animate-shimmer" />

      {/* Content placeholder */}
      <div className="p-4 space-y-3">
        {/* Title */}
        <div className="h-5 bg-gray-200 rounded-md w-3/4" />

        {/* Description lines */}
        <div className="space-y-2">
          <div className="h-3 bg-gray-200 rounded w-full" />
          <div className="h-3 bg-gray-200 rounded w-5/6" />
        </div>

        {/* Price and button area */}
        <div className="pt-3 space-y-3">
          <div className="h-6 bg-gray-200 rounded w-1/3" />
          <div className="h-10 bg-gray-200 rounded-md w-full" />
        </div>
      </div>
    </div>
  );
}

/**
 * Skeleton Grid Component
 * عرض عدة skeleton cards في grid
 */
interface SkeletonGridProps {
  count?: number;
  className?: string;
}

export function SkeletonGrid({ count = 6, className = "" }: SkeletonGridProps) {
  return (
    <div
      className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 ${className}`}
      role="status"
      aria-label="جاري تحميل المنتجات..."
    >
      {Array.from({ length: count }).map((_, index) => (
        <SkeletonCard key={index} />
      ))}
    </div>
  );
}

