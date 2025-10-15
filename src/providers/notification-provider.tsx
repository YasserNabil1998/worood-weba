"use client";

import {
    createContext,
    useContext,
    useState,
    useEffect,
    ReactNode,
} from "react";

interface Notification {
    id: string;
    message: string;
    type: "success" | "error" | "warning" | "info";
    duration?: number;
}

interface NotificationContextType {
    showNotification: (
        message: string,
        type: "success" | "error" | "warning" | "info",
        duration?: number
    ) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(
    undefined
);

export const useNotification = () => {
    const context = useContext(NotificationContext);
    if (!context) {
        throw new Error(
            "useNotification must be used within a NotificationProvider"
        );
    }
    return context;
};

interface NotificationProviderProps {
    children: ReactNode;
}

export const NotificationProvider = ({
    children,
}: NotificationProviderProps) => {
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
        };

        setNotifications((prev) => [...prev, newNotification]);

        setTimeout(() => {
            setNotifications((prev) =>
                prev.filter((notification) => notification.id !== id)
            );
        }, duration);
    };

    const removeNotification = (id: string) => {
        setNotifications((prev) =>
            prev.filter((notification) => notification.id !== id)
        );
    };

    const getNotificationStyles = (type: string) => {
        switch (type) {
            case "success":
                return "bg-[#5A5E4D] text-white"; // اللون الأساسي للموقع
            case "error":
                return "bg-[#5A5E4D] text-white"; // اللون الأساسي للموقع
            case "warning":
                return "bg-[#5A5E4D] text-white"; // اللون الأساسي للموقع
            case "info":
                return "bg-[#5A5E4D] text-white"; // اللون الأساسي للموقع
            default:
                return "bg-[#5A5E4D] text-white"; // اللون الأساسي للموقع
        }
    };

    const getNotificationIcon = (type: string) => {
        switch (type) {
            case "success":
                return (
                    <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                        />
                    </svg>
                );
            case "error":
                return (
                    <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                        />
                    </svg>
                );
            case "warning":
                return (
                    <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z"
                        />
                    </svg>
                );
            case "info":
                return (
                    <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                    </svg>
                );
            default:
                return null;
        }
    };

    return (
        <NotificationContext.Provider value={{ showNotification }}>
            {children}

            {/* Notification Container */}
            <div className="fixed top-20 right-4 z-50 space-y-2">
                {notifications.map((notification) => (
                    <div
                        key={notification.id}
                        className={`
                            ${getNotificationStyles(notification.type)}
                            px-4 py-3 rounded-lg shadow-lg flex items-center gap-3
                            animate-in slide-in-from-top-2 duration-300
                            max-w-md mx-auto
                        `}
                        style={{ fontFamily: "var(--font-almarai)" }}
                    >
                        <div className="flex-shrink-0">
                            {getNotificationIcon(notification.type)}
                        </div>
                        <span className="flex-1 text-sm font-medium">
                            {notification.message}
                        </span>
                        <button
                            onClick={() => removeNotification(notification.id)}
                            className="flex-shrink-0 ml-2 hover:opacity-70 transition-opacity"
                        >
                            <svg
                                className="w-4 h-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>
                    </div>
                ))}
            </div>
        </NotificationContext.Provider>
    );
};
