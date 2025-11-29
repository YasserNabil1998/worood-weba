"use client";

import { useState } from "react";
import { useNotification } from "@/src/providers/notification-provider";
import RatingPopup from "@/src/components/RatingPopup";
import type { ReviewItem } from "@/types";
import { addReview } from "@/src/actions/reviews-manager";
import { useOrders } from "@/src/hooks/useOrders";
import { Order } from "@/src/@types/orders/order.type";
import OrdersPageHeader from "@/src/components/orders/OrdersPageHeader";
import OrderStatusFilter from "@/src/components/orders/OrderStatusFilter";
import EmptyOrders from "@/src/components/orders/EmptyOrders";
import OrderCard from "@/src/components/orders/OrderCard";

export default function OrdersPage() {
  const { orders, filteredOrders, selectedStatus, setSelectedStatus } = useOrders();
  const { showNotification } = useNotification();

  const [ratingPopup, setRatingPopup] = useState<{
    isOpen: boolean;
    orderNumber: string;
    productName: string;
  }>({
    isOpen: false,
    orderNumber: "",
    productName: "",
  });

  // بيانات العميل (يمكن جلبها من الملف الشخصي)
  const customerData = {
    name: "أحمد محمد",
    image: null,
  };

  const handleRatingSubmit = (review: ReviewItem) => {
    // حفظ التقييم في النظام المحلي
    addReview(review);
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

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-3 sm:px-4 md:px-6 py-4 sm:py-6 md:py-8">
        <div className="max-w-5xl mx-auto">
          {/* Page Header */}
          <OrdersPageHeader totalOrders={orders.length} />

          {/* Filter Section */}
          <OrderStatusFilter selectedStatus={selectedStatus} onStatusChange={setSelectedStatus} />

          {/* Orders List */}
          {filteredOrders.length === 0 ? (
            <EmptyOrders selectedStatus={selectedStatus} />
          ) : (
            <div className="space-y-3 sm:space-y-4">
              {filteredOrders.map((order: Order) => (
                <OrderCard key={order.id} order={order} onRateOrder={openRatingPopup} />
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
