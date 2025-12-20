import { create } from "zustand";
import { storage } from "@/lib/utils";
import { STORAGE_KEYS } from "@/constants";
import { logError } from "@/lib/logger";

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  address?: string;
  gender?: "ذكر" | "أنثى";
}

export interface AuthState {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signup: (userData: {
    fullName: string;
    email: string;
    phone: string;
    password: string;
    address: string;
    gender: "ذكر" | "أنثى";
  }) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  initialize: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoading: true,

  initialize: () => {
    try {
      const storedUser = storage.get<User | null>(STORAGE_KEYS.USER, null);
      const token = storage.get<string | null>(STORAGE_KEYS.AUTH_TOKEN, null);

      if (storedUser && token) {
        set({ user: storedUser, isLoading: false });
      } else {
        set({ user: null, isLoading: false });
      }
    } catch (error) {
      logError("Error loading user in auth store", error);
      set({ user: null, isLoading: false });
    }
  },

  login: async (
    email: string,
    _password: string
  ): Promise<{ success: boolean; error?: string }> => {
    try {
      // محاكاة API call
      await new Promise((resolve) => setTimeout(resolve, 600));

      // محاكاة بيانات المستخدم
      const mockUser: User = {
        id: `user-${Date.now()}`,
        email,
        name: email.split("@")[0],
      };

      // حفظ بيانات المستخدم
      storage.set(STORAGE_KEYS.USER, mockUser);
      storage.set(STORAGE_KEYS.AUTH_TOKEN, `token-${Date.now()}`);

      set({ user: mockUser });

      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "حدث خطأ أثناء تسجيل الدخول",
      };
    }
  },

  signup: async (userData: {
    fullName: string;
    email: string;
    phone: string;
    password: string;
    address: string;
    gender: "ذكر" | "أنثى";
  }): Promise<{ success: boolean; error?: string }> => {
    try {
      // محاكاة API call
      await new Promise((resolve) => setTimeout(resolve, 800));

      // محاكاة بيانات المستخدم
      const mockUser: User = {
        id: `user-${Date.now()}`,
        email: userData.email,
        name: userData.fullName,
        phone: userData.phone,
        address: userData.address,
        gender: userData.gender,
      };

      // حفظ بيانات المستخدم
      storage.set(STORAGE_KEYS.USER, mockUser);
      storage.set(STORAGE_KEYS.AUTH_TOKEN, `token-${Date.now()}`);

      set({ user: mockUser });

      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "حدث خطأ أثناء إنشاء الحساب",
      };
    }
  },

  logout: () => {
    storage.remove(STORAGE_KEYS.USER);
    storage.remove(STORAGE_KEYS.AUTH_TOKEN);
    set({ user: null });
  },
}));
