"use client";

import { useNavigationLoading } from "@/src/hooks/useNavigationLoading";
import DataLoader from "@/src/components/DataLoader";
import { UI_TEXTS } from "@/src/constants";

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
