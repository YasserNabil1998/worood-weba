import { useState, useRef } from "react";
import { PackagingType } from "@/src/@types/custom/index.type";

export function useCustomBouquetState() {
    // Selected flowers and colors
    const [selectedFlowers, setSelectedFlowers] = useState<Record<number, number>>({});
    const [selectedColors, setSelectedColors] = useState<{ [flowerId: string]: number[] }>({});
    const [expandedFlower, setExpandedFlower] = useState<string | null>(null);
    
    // Size and packaging
    const [customFlowerCount, setCustomFlowerCount] = useState<number>(12);
    const [packagingType, setPackagingType] = useState<PackagingType>("paper");
    const [selectedVase, setSelectedVase] = useState<string>("");
    const [size, setSize] = useState<"small" | "medium" | "large" | "custom">("medium");
    const [style, setStyle] = useState<"classic" | "premium" | "gift" | "eco">("classic");
    
    // Step and customization
    const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
    const [occasion, setOccasion] = useState<string>("");
    const [cardMessage, setCardMessage] = useState<string>("");
    const [includeCard, setIncludeCard] = useState<boolean>(false);
    const [showSuggestions, setShowSuggestions] = useState<boolean>(false);
    const [notes, setNotes] = useState<string>("");
    
    // Delivery and payment
    const [deliveryType, setDeliveryType] = useState<"today" | "scheduled">("today");
    const [deliveryDate, setDeliveryDate] = useState<string>("");
    const [deliveryTime, setDeliveryTime] = useState<string>("");
    const [city, setCity] = useState<string>("");
    const [district, setDistrict] = useState<string>("");
    const [street, setStreet] = useState<string>("");
    const [landmark, setLandmark] = useState<string>("");
    const [phone, setPhone] = useState<string>("");
    const [payMethod, setPayMethod] = useState<string>("mada");
    
    // UI state
    const [bouquetImage, setBouquetImage] = useState<string>("/images/bouquets/IMG-224.png");
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [isAddingToCart, setIsAddingToCart] = useState<boolean>(false);
    const isUpdatingFlowersRef = useRef(false);
    
    // Notification
    const [notification, setNotification] = useState<{
        message: string;
        visible: boolean;
    }>({ message: "", visible: false });

    const showNotification = (message: string) => {
        setNotification({ message, visible: true });
        setTimeout(() => {
            setNotification({ message: "", visible: false });
        }, 3000);
    };

    return {
        // Flowers and colors
        selectedFlowers,
        setSelectedFlowers,
        selectedColors,
        setSelectedColors,
        expandedFlower,
        setExpandedFlower,
        
        // Size and packaging
        customFlowerCount,
        setCustomFlowerCount,
        packagingType,
        setPackagingType,
        selectedVase,
        setSelectedVase,
        size,
        setSize,
        style,
        setStyle,
        
        // Step and customization
        step,
        setStep,
        occasion,
        setOccasion,
        cardMessage,
        setCardMessage,
        includeCard,
        setIncludeCard,
        showSuggestions,
        setShowSuggestions,
        notes,
        setNotes,
        
        // Delivery and payment
        deliveryType,
        setDeliveryType,
        deliveryDate,
        setDeliveryDate,
        deliveryTime,
        setDeliveryTime,
        city,
        setCity,
        district,
        setDistrict,
        street,
        setStreet,
        landmark,
        setLandmark,
        phone,
        setPhone,
        payMethod,
        setPayMethod,
        
        // UI state
        bouquetImage,
        setBouquetImage,
        searchQuery,
        setSearchQuery,
        isAddingToCart,
        setIsAddingToCart,
        isUpdatingFlowersRef,
        
        // Notification
        notification,
        showNotification,
    };
}

