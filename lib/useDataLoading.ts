"use client";

import { useState, useCallback } from "react";

interface UseDataLoadingReturn {
    isLoading: boolean;
    startLoading: () => void;
    stopLoading: () => void;
    withLoading: <T>(asyncFunction: () => Promise<T>) => Promise<T>;
}

export const useDataLoading = (): UseDataLoadingReturn => {
    const [isLoading, setIsLoading] = useState(false);

    const startLoading = useCallback(() => {
        setIsLoading(true);
    }, []);

    const stopLoading = useCallback(() => {
        setIsLoading(false);
    }, []);

    const withLoading = useCallback(async <T>(asyncFunction: () => Promise<T>): Promise<T> => {
        try {
            startLoading();
            const result = await asyncFunction();
            return result;
        } finally {
            stopLoading();
        }
    }, [startLoading, stopLoading]);

    return {
        isLoading,
        startLoading,
        stopLoading,
        withLoading,
    };
};
