import React from "react";
import { NotificationProvider } from "./notification-provider";
import NavigationWrapper from "./navigation-wrapper";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <NotificationProvider>
        <NavigationWrapper>{children}</NavigationWrapper>
      </NotificationProvider>
    </div>
  );
}
