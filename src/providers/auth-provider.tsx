"use client";

import React, { useEffect } from "react";
import { useAuthStore, type AuthState } from "@/stores/authStore";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const initialize = useAuthStore((state: AuthState) => state.initialize);

  useEffect(() => {
    initialize();
  }, [initialize]);

  return <>{children}</>;
}

export function useAuth() {
  const user = useAuthStore((state: AuthState) => state.user);
  const isLoading = useAuthStore((state: AuthState) => state.isLoading);
  const login = useAuthStore((state: AuthState) => state.login);
  const logout = useAuthStore((state: AuthState) => state.logout);
  const signup = useAuthStore((state: AuthState) => state.signup);

  return {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    logout,
    signup,
  };
}
