"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { storage } from "@/lib/utils";
import { STORAGE_KEYS } from "@/constants";
import { logError } from "@/lib/logger";

interface User {
  id: string;
  email: string;
  name: string;
  phone?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  signup: (userData: {
    fullName: string;
    email: string;
    phone: string;
    password: string;
  }) => Promise<{ success: boolean; error?: string }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // تحميل بيانات المستخدم من localStorage عند التحميل
  useEffect(() => {
    const loadUser = () => {
      try {
        const storedUser = storage.get<User | null>(STORAGE_KEYS.USER, null);
        const token = storage.get<string | null>(STORAGE_KEYS.AUTH_TOKEN, null);

        if (storedUser && token) {
          setUser(storedUser);
        }
      } catch (error) {
        logError("Error loading user", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadUser();
  }, []);

  const login = useCallback(
    async (email: string, _password: string): Promise<{ success: boolean; error?: string }> => {
      try {
        // محاكاة API call
        await new Promise((resolve) => setTimeout(resolve, 600));

        // في التطبيق الحقيقي، هنا سيتم استدعاء API
        // const response = await fetch('/api/auth/login', { ... });
        // const data = await response.json();

        // محاكاة بيانات المستخدم
        const mockUser: User = {
          id: `user-${Date.now()}`,
          email,
          name: email.split("@")[0], // استخدام جزء من البريد كاسم
        };

        // حفظ بيانات المستخدم
        storage.set(STORAGE_KEYS.USER, mockUser);
        storage.set(STORAGE_KEYS.AUTH_TOKEN, `token-${Date.now()}`);

        setUser(mockUser);

        return { success: true };
      } catch (error) {
        return {
          success: false,
          error: error instanceof Error ? error.message : "حدث خطأ أثناء تسجيل الدخول",
        };
      }
    },
    []
  );

  const signup = useCallback(
    async (userData: {
      fullName: string;
      email: string;
      phone: string;
      password: string;
    }): Promise<{ success: boolean; error?: string }> => {
      try {
        // محاكاة API call
        await new Promise((resolve) => setTimeout(resolve, 800));

        // في التطبيق الحقيقي، هنا سيتم استدعاء API
        // const response = await fetch('/api/auth/signup', { ... });
        // const data = await response.json();

        // محاكاة بيانات المستخدم
        const mockUser: User = {
          id: `user-${Date.now()}`,
          email: userData.email,
          name: userData.fullName,
          phone: userData.phone,
        };

        // حفظ بيانات المستخدم
        storage.set(STORAGE_KEYS.USER, mockUser);
        storage.set(STORAGE_KEYS.AUTH_TOKEN, `token-${Date.now()}`);

        setUser(mockUser);

        return { success: true };
      } catch (error) {
        return {
          success: false,
          error: error instanceof Error ? error.message : "حدث خطأ أثناء إنشاء الحساب",
        };
      }
    },
    []
  );

  const logout = useCallback(() => {
    storage.remove(STORAGE_KEYS.USER);
    storage.remove(STORAGE_KEYS.AUTH_TOKEN);
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout,
        signup,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

