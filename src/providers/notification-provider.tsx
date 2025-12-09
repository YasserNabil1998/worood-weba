"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { CheckCircle2, XCircle, AlertCircle, Info, X } from "lucide-react";
import { COLORS } from "@/constants";
import { fontStyle } from "@/lib/styles";

interface Notification {
  id: string;
  message: string;
  type: "success" | "error" | "warning" | "info";
  duration?: number;
  createdAt: number;
}

interface NotificationContextType {
  showNotification: (
    message: string,
    type: "success" | "error" | "warning" | "info",
    duration?: number
  ) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error("useNotification must be used within a NotificationProvider");
  }
  return context;
};

interface NotificationProviderProps {
  children: ReactNode;
}

export const NotificationProvider = ({ children }: NotificationProviderProps) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const showNotification = (
    message: string,
    type: "success" | "error" | "warning" | "info",
    duration: number = 3000
  ) => {
    const id = Date.now().toString();
    const newNotification: Notification = {
      id,
      message,
      type,
      duration,
      createdAt: Date.now(),
    };

    setNotifications((prev) => [...prev, newNotification]);

    setTimeout(() => {
      setNotifications((prev) => prev.filter((notification) => notification.id !== id));
    }, duration);
  };

  const removeNotification = (id: string) => {
    setNotifications((prev) => prev.filter((notification) => notification.id !== id));
  };

  const getNotificationConfig = (type: string) => {
    // استخدام اللون الأساسي للمشروع لجميع أنواع الإشعارات
    const primaryColor = COLORS.PRIMARY;
    return {
      bg: "bg-[#5A5E4D] border-[#5A5E4D]",
      text: "text-white",
      icon: <Info className="w-5 h-5 text-white" />,
      progressBg: "bg-white/30",
    };
  };

  return (
    <NotificationContext.Provider value={{ showNotification }}>
      {children}

      {/* Notification Container */}
      <div
        className="fixed top-20 right-4 z-50 space-y-2 pointer-events-none"
        role="region"
        aria-live="polite"
        aria-label="الإشعارات"
      >
        {notifications.map((notification) => {
          const config = getNotificationConfig(notification.type);
          return (
            <div
              key={notification.id}
              className={`
                ${config.bg} ${config.text}
                px-4 py-3 rounded-lg shadow-lg border
                flex items-start gap-3
                max-w-md mx-auto
                pointer-events-auto
                animate-in slide-in-from-right-full fade-in duration-300
                hover:shadow-xl transition-shadow
                relative overflow-hidden
              `}
              style={fontStyle}
              role="alert"
            >
              {/* Icon */}
              <div className="shrink-0 mt-0.5">{config.icon}</div>

              {/* Message */}
              <span className="flex-1 text-sm font-medium leading-relaxed">
                {notification.message}
              </span>

              {/* Close Button */}
              <button
                onClick={() => removeNotification(notification.id)}
                className="shrink-0 hover:opacity-70 transition-opacity text-white"
                aria-label="إغلاق الإشعار"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Progress Bar */}
              {notification.duration && (
                <div
                  className={`absolute bottom-0 left-0 h-1 ${config.progressBg} transition-all`}
                  style={{
                    animation: `shrink ${notification.duration}ms linear`,
                  }}
                />
              )}
            </div>
          );
        })}
      </div>

      {/* Progress Bar Animation */}
      <style jsx>{`
        @keyframes shrink {
          from {
            width: 100%;
          }
          to {
            width: 0%;
          }
        }
      `}</style>
    </NotificationContext.Provider>
  );
};
