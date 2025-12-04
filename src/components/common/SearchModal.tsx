"use client";

import { useEffect } from "react";
import { Search, X } from "lucide-react";

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

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 z-100 flex items-start justify-end pt-20 px-4 search-modal"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="bg-white rounded-lg shadow-xl w-full max-w-xl max-h-[70vh] flex flex-col overflow-hidden">
        {/* Search Input */}
        <div className="flex items-center gap-3 p-4 border-b">
          <Search className="w-5 h-5 text-gray-400 shrink-0" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchQueryChange(e.target.value)}
            placeholder="ابحث في الصفحة..."
            className="flex-1 outline-none text-gray-800 placeholder-gray-400"
            autoFocus
          />
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition"
            aria-label="إغلاق البحث"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Results */}
        <div className="flex-1 overflow-y-auto p-4">
          {searchQuery.trim() && searchResults.length === 0 ? (
            <div className="text-center text-gray-500 py-8">
              <p className="text-sm">لم يتم العثور على نتائج</p>
            </div>
          ) : searchResults.length > 0 ? (
            <div className="space-y-1">
              <p className="text-xs text-gray-500 mb-3">
                {searchResults.length} {searchResults.length === 1 ? "نتيجة" : "نتائج"}
              </p>
              {searchResults.map((result, index) => (
                <button
                  key={index}
                  onClick={() => onScrollToResult(result.element)}
                  className="w-full text-right p-3 rounded-lg hover:bg-gray-50 transition text-sm text-gray-700"
                >
                  <p className="line-clamp-2">{result.context}</p>
                </button>
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-400 py-8">
              <p className="text-sm">ابدأ الكتابة للبحث</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

