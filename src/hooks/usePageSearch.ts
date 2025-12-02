import { useState, useEffect, useCallback } from "react";

interface SearchResult {
  element: HTMLElement;
  text: string;
  context: string;
}

const MIN_TEXT_LENGTH = 2;
const CONTEXT_RANGE = 60;
const MAX_RESULTS = 10;

function shouldIncludeNode(node: Node): boolean {
  const parent = node.parentElement;
  if (!parent) return false;

  const style = window.getComputedStyle(parent);
  if (
    style.display === "none" ||
    style.visibility === "hidden" ||
    parent.tagName === "SCRIPT" ||
    parent.tagName === "STYLE" ||
    parent.closest("header") ||
    parent.closest("nav") ||
    parent.closest("[role='dialog']") ||
    parent.closest(".search-modal")
  ) {
    return false;
  }

  const text = node.textContent || "";
  return text.trim().length >= MIN_TEXT_LENGTH;
}

function extractSearchContext(text: string, searchText: string): string {
  const index = text.toLowerCase().indexOf(searchText);
  if (index === -1) return "";

  const start = Math.max(0, index - CONTEXT_RANGE);
  const end = Math.min(text.length, index + searchText.length + CONTEXT_RANGE);
  let context = text.substring(start, end);

  if (start > 0) context = "..." + context;
  if (end < text.length) context = context + "...";

  return context.trim();
}

export function usePageSearch(isOpen: boolean) {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);

  const performSearch = useCallback((query: string) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    const results: SearchResult[] = [];
    const searchText = query.trim().toLowerCase();
    const processedElements = new Set<HTMLElement>();

    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
      acceptNode: (node) => {
        if (!shouldIncludeNode(node)) return NodeFilter.FILTER_REJECT;
        const text = node.textContent || "";
        return text.toLowerCase().includes(searchText)
          ? NodeFilter.FILTER_ACCEPT
          : NodeFilter.FILTER_REJECT;
      },
    });

    let node;
    while ((node = walker.nextNode())) {
      const parent = node.parentElement;
      if (!parent || processedElements.has(parent)) continue;

      if (parent.textContent && parent.textContent.trim().length < 3) continue;

      processedElements.add(parent);
      const text = node.textContent || "";
      const context = extractSearchContext(text, searchText);

      if (context) {
        results.push({
          element: parent,
          text: text.trim(),
          context,
        });
      }
    }

    setSearchResults(results.slice(0, MAX_RESULTS));
  }, []);

  useEffect(() => {
    if (isOpen) {
      const timeoutId = setTimeout(() => {
        performSearch(searchQuery);
      }, 300);

      return () => clearTimeout(timeoutId);
    }
  }, [searchQuery, isOpen, performSearch]);

  const clearSearch = useCallback(() => {
    setSearchQuery("");
    setSearchResults([]);
  }, []);

  return {
    searchQuery,
    setSearchQuery,
    searchResults,
    clearSearch,
  };
}

