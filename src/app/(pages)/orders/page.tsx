"use client";

import { useState, useEffect, useMemo } from "react";
import RatingPopup from "@/components/product/RatingPopup";
import type { ReviewItem } from "@/types";
import AOSWrapper from "@/components/common/AOSWrapper";
import { useOrders } from "@/hooks/useOrders";
import type { Order } from "@/types/orders";
import OrdersPageHeader from "@/components/orders/OrdersPageHeader";
import OrderStatusFilter from "@/components/orders/OrderStatusFilter";
import EmptyOrders from "@/components/orders/EmptyOrders";
import OrderCard from "@/components/orders/OrderCard";
import { useOrdersStore, useProfileStore, useReviewsStore } from "@/stores";
import { useNotification } from "@/providers/notification-provider";

// البيانات الافتراضية للمستخدم
const DEFAULT_USER_DATA = {
  name: "مستخدم",
  profileImage: null,
};

export default function OrdersPage() {
  const { orders, filteredOrders, selectedStatus, setSelectedStatus } = useOrders();
  const rateOrder = useOrdersStore((state) => state.rateOrder);
  const addReview = useReviewsStore((state) => state.addReview);
  const { showNotification } = useNotification();

  // جلب بيانات المستخدم من store
  const storeUserData = useProfileStore((state) => state.userData);
  const fetchUserData = useProfileStore((state) => state.fetchUserData);

  // جلب بيانات المستخدم عند تحميل الصفحة
  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);

  // دمج بيانات المستخدم من store مع البيانات الافتراضية
  const customerData = useMemo(() => {
    return {
      name: storeUserData?.name || DEFAULT_USER_DATA.name,
      image: storeUserData?.image || DEFAULT_USER_DATA.profileImage,
    };
  }, [storeUserData]);

  const [ratingPopup, setRatingPopup] = useState<{
    isOpen: boolean;
    orderNumber: string;
    productName: string;
    orderId?: string;
  }>({
    isOpen: false,
    orderNumber: "",
    productName: "",
    orderId: undefined,
  });

  const handleRatingSubmit = async (review: ReviewItem) => {
    // حفظ التقييم في النظام المحلي
    addReview(review);

    // إرسال التقييم للـ API عبر store
    if (ratingPopup.orderId) {
      // Ensure required fields are present
      if (!review.date || !review.productName) {
        showNotification("بيانات التقييم غير مكتملة", "error");
        return;
      }

      const result = await rateOrder(ratingPopup.orderId, {
        id: review.id,
        customerName: review.customerName,
        customerImage: review.customerImage,
        rating: review.rating,
        comment: review.comment,
        date: review.date,
        productName: review.productName,
      });

      if (result.success) {
        showNotification("تم إرسال التقييم بنجاح!", "success");
      } else {
        showNotification(result.error || "فشل إرسال التقييم", "error");
      }
    }
  };

  const openRatingPopup = (orderNumber: string, productName: string) => {
    // Find order by orderNumber to get orderId
    const order = orders.find((o) => o.orderNumber === orderNumber);
    setRatingPopup({
      isOpen: true,
      orderNumber,
      productName,
      orderId: order?.id,
    });
  };

  const closeRatingPopup = () => {
    setRatingPopup({
      isOpen: false,
      orderNumber: "",
      productName: "",
      orderId: undefined,
    });
  };

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-3 sm:px-4 md:px-6 py-4 sm:py-6 md:py-8">
        <div className="max-w-5xl mx-auto">
          {/* Page Header */}
          <AOSWrapper animation="fade-in" delay={50} duration={800}>
            <OrdersPageHeader totalOrders={orders.length} />
          </AOSWrapper>

          {/* Filter Section */}
          <AOSWrapper animation="fade-in" delay={50} duration={800}>
            <OrderStatusFilter selectedStatus={selectedStatus} onStatusChange={setSelectedStatus} />
          </AOSWrapper>

          {/* Orders List */}
          {filteredOrders.length === 0 ? (
            <AOSWrapper animation="fade-in" delay={100} duration={800}>
              <EmptyOrders selectedStatus={selectedStatus} />
            </AOSWrapper>
          ) : (
            <div className="space-y-3 sm:space-y-4">
              {filteredOrders.map((order: Order, index: number) => (
                <AOSWrapper
                  key={order.id}
                  animation="fade-in"
                  delay={index * 20}
                  duration={800}
                  offset={30}
                >
                  <OrderCard order={order} onRateOrder={openRatingPopup} />
                </AOSWrapper>
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
