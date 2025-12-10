"use client";

import { useEffect, useRef } from "react";
import { X } from "lucide-react";

interface SearchResult {
  element: HTMLElement;
  text: string;
  context: string;
}

interface SearchModalProps {
  isOpen: boolean;
  searchQuery: string;
  searchResults: SearchResult[];
  onClose: () => void;
  onSearchQueryChange: (query: string) => void;
  onScrollToResult: (element: HTMLElement) => void;
}

export default function SearchModal({
  isOpen,
  searchQuery,
  searchResults,
  onClose,
  onSearchQueryChange,
  onScrollToResult,
}: SearchModalProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  // إغلاق البحث عند الضغط على ESC
  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  // Focus input when modal opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [isOpen]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9999] flex items-center justify-center w-full h-screen search-modal"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      {/* Close Button - Top Left */}
      <button
        onClick={onClose}
        className="absolute top-6 left-6 w-10 h-10 flex items-center justify-center text-white hover:bg-white/10 rounded-full transition-all duration-200 z-10"
        aria-label="إغلاق البحث"
      >
        <X className="w-6 h-6" />
      </button>

      {/* Main Content - Centered and Full Width */}
      <div className="w-full flex flex-col items-center justify-center px-4 sm:px-6 md:px-8 py-20">
        <div className="w-full max-w-3xl flex flex-col items-center justify-center">
          {/* Search Input */}
          <div className="w-full mb-8">
            <input
              ref={inputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchQueryChange(e.target.value)}
              placeholder="البحث..."
              className="w-full bg-transparent border-b-2 border-white/30 text-white text-4xl sm:text-5xl md:text-6xl font-light outline-none pb-4 placeholder:text-white/60 focus:border-white/70 transition-colors duration-200 text-center"
              style={{
                fontFamily: "var(--font-almarai)",
              }}
              autoFocus
            />
          </div>

          {/* Description Text */}
          <div className="text-center mb-12">
            <p
              className="text-white/80 text-xl sm:text-2xl md:text-3xl font-light"
              style={{
                fontFamily: "var(--font-almarai)",
              }}
            >
              هدايا تعبر عن مشاعرك
            </p>
          </div>

          {/* Search Results */}
          {searchQuery.trim() && (
            <div className="w-full max-w-2xl max-h-[60vh] overflow-y-auto bg-white/10 backdrop-blur-md rounded-2xl p-6 mt-4">
              {searchResults.length === 0 ? (
                <div className="text-center text-white/70 py-8">
                  <p
                    className="text-base sm:text-lg"
                    style={{
                      fontFamily: "var(--font-almarai)",
                    }}
                  >
                    لم يتم العثور على نتائج
                  </p>
                </div>
              ) : (
                <div className="space-y-2">
                  <p
                    className="text-white/60 text-sm mb-4 text-right"
                    style={{
                      fontFamily: "var(--font-almarai)",
                    }}
                  >
                    {searchResults.length} {searchResults.length === 1 ? "نتيجة" : "نتائج"}
                  </p>
                  {searchResults.map((result, index) => (
                    <button
                      key={index}
                      onClick={() => onScrollToResult(result.element)}
                      className="w-full text-right p-4 rounded-lg hover:bg-white/10 transition-all duration-200 text-white/90 text-sm sm:text-base"
                      style={{
                        fontFamily: "var(--font-almarai)",
                      }}
                    >
                      <p className="line-clamp-2">{result.context}</p>
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

