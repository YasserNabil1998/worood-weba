import React from "react";
import { NotificationProvider } from "./notification-provider";
import NavigationWrapper from "./navigation-wrapper";
import { AuthProvider } from "./auth-provider";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <NotificationProvider>
        <AuthProvider>
          <NavigationWrapper>{children}</NavigationWrapper>
        </AuthProvider>
      </NotificationProvider>
    </div>
  );
}
