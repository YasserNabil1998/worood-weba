"use client";

import { useNavigationLoading } from "@/src/hooks/useNavigationLoading";
import DataLoader from "@/src/components/DataLoader";

interface NavigationWrapperProps {
    children: React.ReactNode;
}

const NavigationWrapper = ({ children }: NavigationWrapperProps) => {
    const { isLoading } = useNavigationLoading();

    return (
        <DataLoader isLoading={isLoading} loadingText="جاري التحميل...">
            {children}
        </DataLoader>
    );
};

export default NavigationWrapper;
