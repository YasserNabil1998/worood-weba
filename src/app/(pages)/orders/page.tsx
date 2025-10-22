"use client";

import Image from "next/image";
import { useNotification } from "@/src/providers/notification-provider";
import RatingPopup from "@/src/components/RatingPopup";
import { useState } from "react";
import Link from "next/link";
import ordersData from "./orders-data.json";
import type { ReviewItem } from "@/types";
import { addReview } from "@/src/actions/reviews-manager";
import { Order } from "@/src/@types/orders/order.type";
import { Package, Truck, CheckCircle, Clock, Star, X } from "lucide-react";

export default function OrdersPage() {
    const [orders] = useState<Order[]>(ordersData.orders as Order[]);
    const [selectedStatus, setSelectedStatus] = useState<string>("الكل");
    const [ratingPopup, setRatingPopup] = useState<{
        isOpen: boolean;
        orderNumber: string;
        productName: string;
    }>({
        isOpen: false,
        orderNumber: "",
        productName: "",
    });
    const { showNotification } = useNotification();

    // بيانات العميل (يمكن جلبها من الملف الشخصي)
    const customerData = {
        name: "أحمد محمد",
        image: null,
    };

    const handleRatingSubmit = (review: ReviewItem) => {
        // حفظ التقييم في النظام المحلي
        addReview(review);
        console.log("New review submitted:", review);
    };

    const openRatingPopup = (orderNumber: string, productName: string) => {
        setRatingPopup({
            isOpen: true,
            orderNumber,
            productName,
        });
    };

    const closeRatingPopup = () => {
        setRatingPopup({
            isOpen: false,
            orderNumber: "",
            productName: "",
        });
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case "قيد المعالجة":
                return <Clock className="w-5 h-5" />;
            case "تم التجهيز":
                return <Package className="w-5 h-5" />;
            case "في الطريق":
                return <Truck className="w-5 h-5" />;
            case "تم التسليم":
                return <CheckCircle className="w-5 h-5" />;
            case "ملغي":
                return <X className="w-5 h-5" />;
            default:
                return null;
        }
    };

    const filteredOrders =
        selectedStatus === "الكل"
            ? orders
            : orders.filter((order) => order.status === selectedStatus);

    const statusOptions = [
        "الكل",
        "قيد المعالجة",
        "تم التجهيز",
        "في الطريق",
        "تم التسليم",
        "ملغي",
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="container mx-auto px-4 py-8">
                <div className="max-w-5xl mx-auto">
                    {/* Page Header */}
                    <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                            <div>
                                <h1
                                    className="text-3xl font-bold text-gray-800 mb-1"
                                    style={{
                                        fontFamily: "var(--font-almarai)",
                                    }}
                                >
                                    طلباتي
                                </h1>
                                <p
                                    className="text-gray-600"
                                    style={{
                                        fontFamily: "var(--font-almarai)",
                                    }}
                                >
                                    تتبع جميع طلباتك
                                </p>
                            </div>

                            <div className="flex items-center gap-2">
                                <span
                                    className="text-gray-600"
                                    style={{
                                        fontFamily: "var(--font-almarai)",
                                    }}
                                >
                                    إجمالي الطلبات:
                                </span>
                                <span
                                    className="text-xl font-bold text-[#5A5E4D]"
                                    style={{
                                        fontFamily: "var(--font-almarai)",
                                    }}
                                >
                                    {orders.length}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Filter Section */}
                    <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
                        <div className="flex flex-wrap items-center gap-3">
                            <span
                                className="text-gray-700 font-medium"
                                style={{ fontFamily: "var(--font-almarai)" }}
                            >
                                فلترة حسب الحالة:
                            </span>
                            <div className="flex flex-wrap gap-2">
                                {statusOptions.map((status) => (
                                    <button
                                        key={status}
                                        onClick={() =>
                                            setSelectedStatus(status)
                                        }
                                        className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                                            selectedStatus === status
                                                ? "bg-[#5A5E4D] text-white"
                                                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                        }`}
                                        style={{
                                            fontFamily: "var(--font-almarai)",
                                        }}
                                    >
                                        {status}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Orders List */}
                    {filteredOrders.length === 0 ? (
                        <div className="bg-white rounded-lg shadow-sm p-8 text-center">
                            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Package className="w-8 h-8 text-gray-400" />
                            </div>
                            <h3
                                className="text-lg font-semibold text-gray-600 mb-2"
                                style={{ fontFamily: "var(--font-almarai)" }}
                            >
                                لا توجد طلبات
                            </h3>
                            <p
                                className="text-gray-500 mb-4"
                                style={{ fontFamily: "var(--font-almarai)" }}
                            >
                                {selectedStatus === "الكل"
                                    ? "لم تقم بأي طلبات بعد"
                                    : `لا توجد طلبات بحالة "${selectedStatus}"`}
                            </p>
                            {selectedStatus === "الكل" && (
                                <Link
                                    href="/bouquets"
                                    className="inline-block bg-[#5A5E4D] text-white px-6 py-2 rounded-md hover:bg-[#4A4E3D] transition-colors font-medium"
                                    style={{
                                        fontFamily: "var(--font-almarai)",
                                    }}
                                >
                                    تصفح الباقات
                                </Link>
                            )}
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {filteredOrders.map((order) => (
                                <div
                                    key={order.id}
                                    className="bg-white rounded-lg shadow-sm border border-gray-200"
                                >
                                    {/* Order Header */}
                                    <div className="border-b border-gray-200 p-4">
                                        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                                            <div className="flex items-center gap-3">
                                                <div className="text-[#5A5E4D]">
                                                    {getStatusIcon(
                                                        order.status
                                                    )}
                                                </div>
                                                <div>
                                                    <h3
                                                        className="text-lg font-semibold text-gray-800"
                                                        style={{
                                                            fontFamily:
                                                                "var(--font-almarai)",
                                                        }}
                                                    >
                                                        طلب #{order.orderNumber}
                                                    </h3>
                                                    <p
                                                        className="text-gray-600 text-sm"
                                                        style={{
                                                            fontFamily:
                                                                "var(--font-almarai)",
                                                        }}
                                                    >
                                                        {order.date}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="text-left md:text-right">
                                                <div
                                                    className={`inline-block px-3 py-1 rounded-md text-sm font-medium ${order.statusColor}`}
                                                    style={{
                                                        fontFamily:
                                                            "var(--font-almarai)",
                                                    }}
                                                >
                                                    {order.status}
                                                </div>
                                                <p
                                                    className="text-gray-800 font-semibold mt-1"
                                                    style={{
                                                        fontFamily:
                                                            "var(--font-almarai)",
                                                    }}
                                                >
                                                    {order.totalAmount} ر.س
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Order Details */}
                                    <div className="p-4">
                                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                                            {/* Items */}
                                            <div>
                                                <h4
                                                    className="text-base font-semibold text-gray-800 mb-3"
                                                    style={{
                                                        fontFamily:
                                                            "var(--font-almarai)",
                                                    }}
                                                >
                                                    المنتجات
                                                </h4>
                                                <div className="space-y-2">
                                                    {order.items.map((item) => (
                                                        <div
                                                            key={item.id}
                                                            className="flex items-center gap-3 p-2 bg-gray-50 rounded-md"
                                                        >
                                                            <Image
                                                                src={item.image}
                                                                alt={item.name}
                                                                width={48}
                                                                height={48}
                                                                className="rounded-md object-cover"
                                                                loading="lazy"
                                                            />
                                                            <div className="flex-1">
                                                                <h5
                                                                    className="font-medium text-gray-800 text-sm"
                                                                    style={{
                                                                        fontFamily:
                                                                            "var(--font-almarai)",
                                                                    }}
                                                                >
                                                                    {item.name}
                                                                </h5>
                                                                {item.bouquetType && (
                                                                    <p
                                                                        className="text-xs text-gray-600"
                                                                        style={{
                                                                            fontFamily:
                                                                                "var(--font-almarai)",
                                                                        }}
                                                                    >
                                                                        نوع
                                                                        الباقة:{" "}
                                                                        {
                                                                            item.bouquetType
                                                                        }
                                                                    </p>
                                                                )}
                                                                <p
                                                                    className="text-xs text-gray-600"
                                                                    style={{
                                                                        fontFamily:
                                                                            "var(--font-almarai)",
                                                                    }}
                                                                >
                                                                    {
                                                                        item.quantity
                                                                    }{" "}
                                                                    ×{" "}
                                                                    {item.price}{" "}
                                                                    ر.س
                                                                </p>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>

                                            {/* Order Info */}
                                            <div>
                                                <h4
                                                    className="text-base font-semibold text-gray-800 mb-3"
                                                    style={{
                                                        fontFamily:
                                                            "var(--font-almarai)",
                                                    }}
                                                >
                                                    تفاصيل الطلب
                                                </h4>
                                                <div className="space-y-2">
                                                    <div className="flex justify-between items-center p-2 bg-gray-50 rounded-md">
                                                        <span
                                                            className="text-gray-600 text-sm"
                                                            style={{
                                                                fontFamily:
                                                                    "var(--font-almarai)",
                                                            }}
                                                        >
                                                            عنوان التسليم:
                                                        </span>
                                                        <span
                                                            className="text-gray-800 font-medium text-sm text-left"
                                                            style={{
                                                                fontFamily:
                                                                    "var(--font-almarai)",
                                                            }}
                                                        >
                                                            {
                                                                order.deliveryAddress
                                                            }
                                                        </span>
                                                    </div>
                                                    <div className="flex justify-between items-center p-2 bg-gray-50 rounded-md">
                                                        <span
                                                            className="text-gray-600 text-sm"
                                                            style={{
                                                                fontFamily:
                                                                    "var(--font-almarai)",
                                                            }}
                                                        >
                                                            طريقة الدفع:
                                                        </span>
                                                        <span
                                                            className="text-gray-800 font-medium text-sm"
                                                            style={{
                                                                fontFamily:
                                                                    "var(--font-almarai)",
                                                            }}
                                                        >
                                                            {
                                                                order.paymentMethod
                                                            }
                                                        </span>
                                                    </div>
                                                    {order.trackingNumber && (
                                                        <div className="flex justify-between items-center p-2 bg-gray-50 rounded-md">
                                                            <span
                                                                className="text-gray-600 text-sm"
                                                                style={{
                                                                    fontFamily:
                                                                        "var(--font-almarai)",
                                                                }}
                                                            >
                                                                رقم التتبع:
                                                            </span>
                                                            <span
                                                                className="text-gray-800 font-medium text-sm"
                                                                style={{
                                                                    fontFamily:
                                                                        "var(--font-almarai)",
                                                                }}
                                                            >
                                                                {
                                                                    order.trackingNumber
                                                                }
                                                            </span>
                                                        </div>
                                                    )}
                                                    {order.notes && (
                                                        <div className="p-2 bg-gray-50 rounded-md">
                                                            <span
                                                                className="text-gray-600 block mb-1 text-sm"
                                                                style={{
                                                                    fontFamily:
                                                                        "var(--font-almarai)",
                                                                }}
                                                            >
                                                                ملاحظات:
                                                            </span>
                                                            <span
                                                                className="text-gray-800 text-sm"
                                                                style={{
                                                                    fontFamily:
                                                                        "var(--font-almarai)",
                                                                }}
                                                            >
                                                                {order.notes}
                                                            </span>
                                                        </div>
                                                    )}
                                                </div>

                                                {/* Action Buttons */}
                                                <div className="mt-4 flex flex-col sm:flex-row gap-2">
                                                    <button
                                                        className="flex-1 bg-[#5A5E4D] text-white px-4 py-2 rounded-md hover:bg-[#4A4E3D] transition-colors text-sm font-medium"
                                                        style={{
                                                            fontFamily:
                                                                "var(--font-almarai)",
                                                        }}
                                                        onClick={() =>
                                                            showNotification(
                                                                "تم إرسال الطلب مرة أخرى!",
                                                                "success"
                                                            )
                                                        }
                                                    >
                                                        إعادة الطلب
                                                    </button>
                                                    {order.status ===
                                                        "في الطريق" && (
                                                        <button
                                                            className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors text-sm font-medium"
                                                            style={{
                                                                fontFamily:
                                                                    "var(--font-almarai)",
                                                            }}
                                                            onClick={() =>
                                                                showNotification(
                                                                    "تتبع الطلب قريباً!",
                                                                    "info"
                                                                )
                                                            }
                                                        >
                                                            تتبع الطلب
                                                        </button>
                                                    )}
                                                    {order.status ===
                                                        "تم التسليم" && (
                                                        <button
                                                            className="flex-1 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors text-sm font-medium"
                                                            style={{
                                                                fontFamily:
                                                                    "var(--font-almarai)",
                                                            }}
                                                            onClick={() =>
                                                                openRatingPopup(
                                                                    order.orderNumber,
                                                                    order
                                                                        .items[0]
                                                                        ?.name ||
                                                                        "الطلب"
                                                                )
                                                            }
                                                        >
                                                            تقييم الطلب
                                                        </button>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Rating Popup */}
            <RatingPopup
                isOpen={ratingPopup.isOpen}
                onClose={closeRatingPopup}
                orderNumber={ratingPopup.orderNumber}
                productName={ratingPopup.productName}
                onRatingSubmit={handleRatingSubmit}
                customerName={customerData.name}
                customerImage={customerData.image}
            />
        </div>
    );
}
