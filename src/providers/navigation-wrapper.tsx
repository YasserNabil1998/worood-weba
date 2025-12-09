"use client";

import { useNavigationLoading } from "@/hooks/useNavigationLoading";
import DataLoader from "@/components/shared/DataLoader";
import { UI_TEXTS } from "@/constants";

interface NavigationWrapperProps {
  children: React.ReactNode;
}

const NavigationWrapper = ({ children }: NavigationWrapperProps) => {
  const { isLoading } = useNavigationLoading();

  return (
    <DataLoader isLoading={isLoading} loadingText={UI_TEXTS.LOADING}>
      {children}
    </DataLoader>
  );
};

export default NavigationWrapper;
