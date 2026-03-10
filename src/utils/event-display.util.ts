import { OrderEventTypeV2 } from "../enums/order-v2.enum";

/**
 * Timeline event display information matching the UI requirements.
 * Maps OrderEventTypeV2 enum values to their UI display properties.
 */
export interface EventDisplayInfo {
  title: string;
  description: string;
  icon: string;
  color: string;
}

/**
 * Get display information for order item events.
 * Maps from OrderEventTypeV2 to UI-friendly display properties.
 */
export const getEventDisplayInfo = (
  eventType: OrderEventTypeV2,
  customDescription?: string,
): EventDisplayInfo => {
  const eventInfo: Record<OrderEventTypeV2, EventDisplayInfo> = {
    [OrderEventTypeV2.ORDER_PLACED]: {
      title: "Order Placed",
      description: "Your order has been received and is being processed",
      icon: "📝",
      color: "#4CAF50",
    },
    [OrderEventTypeV2.ORDER_CONFIRMED]: {
      title: "Order Confirmed",
      description: "Your order has been confirmed by the boutique",
      icon: "✅",
      color: "#4CAF50",
    },
    [OrderEventTypeV2.PAYMENT_CONFIRMED]: {
      title: "Payment Confirmed",
      description: "Payment has been processed successfully",
      icon: "💳",
      color: "#4CAF50",
    },
    [OrderEventTypeV2.STATUS_CHANGED]: {
      title: "Status Updated",
      description: "Order status has been updated",
      icon: "🔄",
      color: "#FF9800",
    },
    [OrderEventTypeV2.ITEM_CONFIRMED]: {
      title: "Order Confirmed",
      description: "Your order has been confirmed by the boutique",
      icon: "✅",
      color: "#4CAF50",
    },
    [OrderEventTypeV2.IN_PROGRESS]: {
      title: "In Progress",
      description: "Your item is being prepared/customized",
      icon: "🏭",
      color: "#FF9800",
    },
    [OrderEventTypeV2.READY_TO_SHIP]: {
      title: "Ready to Ship",
      description: "Your item is packed and ready for dispatch",
      icon: "📦",
      color: "#2196F3",
    },
    [OrderEventTypeV2.ITEM_SHIPPED]: {
      title: "Shipped",
      description: "Your item has been dispatched",
      icon: "🚚",
      color: "#2196F3",
    },
    [OrderEventTypeV2.ITEM_OUT_FOR_DELIVERY]: {
      title: "Out for Delivery",
      description: "Your item is out for delivery",
      icon: "🏃",
      color: "#9C27B0",
    },
    [OrderEventTypeV2.ITEM_DELIVERED]: {
      title: "Delivered",
      description: "Your item has been delivered successfully",
      icon: "🎉",
      color: "#4CAF50",
    },
    [OrderEventTypeV2.ITEM_CANCELLED]: {
      title: "Cancelled",
      description: "Order has been cancelled",
      icon: "❌",
      color: "#F44336",
    },
    [OrderEventTypeV2.RETURN_INITIATED]: {
      title: "Return Initiated",
      description: "Return request has been initiated",
      icon: "↩️",
      color: "#FF5722",
    },
    [OrderEventTypeV2.RETURN_PICKED_UP]: {
      title: "Return Picked Up",
      description: "Item has been picked up for return",
      icon: "📦",
      color: "#FF5722",
    },
    [OrderEventTypeV2.RETURN_RECEIVED]: {
      title: "Return Received",
      description: "Returned item received by seller",
      icon: "✅",
      color: "#FF5722",
    },
    [OrderEventTypeV2.RETURNED]: {
      title: "Returned",
      description: "Item has been returned",
      icon: "↩️",
      color: "#FF5722",
    },
    [OrderEventTypeV2.EXCHANGE_INITIATED]: {
      title: "Exchange Initiated",
      description: "Exchange request has been initiated",
      icon: "🔄",
      color: "#607D8B",
    },
    [OrderEventTypeV2.EXCHANGE_PICKED_UP]: {
      title: "Exchange Picked Up",
      description: "Item has been picked up for exchange",
      icon: "📦",
      color: "#607D8B",
    },
    [OrderEventTypeV2.EXCHANGE_RECEIVED]: {
      title: "Exchange Received",
      description: "Exchange item received by seller",
      icon: "✅",
      color: "#607D8B",
    },
    [OrderEventTypeV2.EXCHANGED]: {
      title: "Exchanged",
      description: "Item has been exchanged",
      icon: "🔄",
      color: "#607D8B",
    },
    [OrderEventTypeV2.PAYMENT_CAPTURED]: {
      title: "Payment Captured",
      description: "Payment has been captured successfully",
      icon: "💳",
      color: "#4CAF50",
    },
    [OrderEventTypeV2.REFUND_INITIATED]: {
      title: "Refund Initiated",
      description: "Refund has been initiated",
      icon: "💰",
      color: "#795548",
    },
    [OrderEventTypeV2.REFUND_CREDITED]: {
      title: "Refunded",
      description: "Refund has been processed",
      icon: "💰",
      color: "#795548",
    },
    [OrderEventTypeV2.NOTE_ADDED]: {
      title: "Note Added",
      description: "A note has been added to the order",
      icon: "📝",
      color: "#9E9E9E",
    },
  };

  const info = eventInfo[eventType];
  return {
    ...info,
    description: customDescription || info.description,
  };
};
