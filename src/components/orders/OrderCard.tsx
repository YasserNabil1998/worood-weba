import { Order } from "@/src/@types/orders/order.type";
// import OrderCardHeader from "./OrderCardHeader";
import OrderItemsList from "./OrderItemsList";
import OrderDetailsPanel from "./OrderDetailsPanel";
import OrderStatusTracker from "./OrderStatusTracker";

interface OrderCardProps {
  order: Order;
  onRateOrder: (orderNumber: string, productName: string) => void;
}

export default function OrderCard({ order, onRateOrder }: OrderCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden">
      {/* <OrderCardHeader order={order} /> */}

      <div className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <OrderItemsList items={order.items} />
          <div className="space-y-4">
            <OrderStatusTracker status={order.status} />
            <OrderDetailsPanel order={order} onRateOrder={onRateOrder} />
          </div>
        </div>
      </div>
    </div>
  );
}
