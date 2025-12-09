"use client";

import React from "react";
import { Loader2 } from "lucide-react";
import { SkeletonGrid } from "@/components/common/SkeletonCard";
import { fontStyle } from "@/lib/styles";
import { UI_TEXTS } from "@/constants";

interface DataLoaderProps {
  isLoading: boolean;
  loadingText?: string;
  children: React.ReactNode;
  /** Use skeleton instead of overlay spinner */
  skeleton?: boolean;
  /** Number of skeleton items to show */
  skeletonCount?: number;
  /** Loading type: 'overlay' (default) | 'inline' */
  type?: "overlay" | "inline";
}

const DataLoader = ({
  isLoading,
  loadingText = UI_TEXTS.LOADING,
  children,
  skeleton = false,
  skeletonCount = 6,
  type = "overlay",
}: DataLoaderProps) => {
  if (!isLoading) {
    return <>{children}</>;
  }

  // Use skeleton loader for better UX
  if (skeleton) {
    return <SkeletonGrid count={skeletonCount} />;
  }

  // Inline loading (minimal spinner)
  if (type === "inline") {
    return (
      <div className="flex flex-col items-center justify-center py-12 space-y-3">
        <Loader2 className="w-10 h-10 text-[#5A5E4D] animate-spin" />
        <p className="text-gray-600 font-medium">{loadingText}</p>
      </div>
    );
  }

  // Default overlay loading
  return (
    <>
      {children}
      <div className="fixed inset-0 z-[9999] bg-white/80 backdrop-blur-sm flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          {/* Spinner Animation */}
          <div className="relative">
            <div className="w-16 h-16 border-4 border-gray-200 rounded-full animate-spin border-t-[#5A5E4D]"></div>
            <div className="absolute inset-0 w-16 h-16 border-4 border-transparent rounded-full animate-ping border-t-[#5A5E4D] opacity-20"></div>
          </div>

          {/* Loading Text */}
          <div className="text-center">
            <p className="text-[#5A5E4D] font-medium text-lg" style={fontStyle}>
              {loadingText}
            </p>
            <p className="text-gray-500 text-sm mt-1" style={fontStyle}>
              يرجى الانتظار
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default DataLoader;
