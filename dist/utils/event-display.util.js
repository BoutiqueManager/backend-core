"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEventDisplayInfo = void 0;
const order_v2_enum_1 = require("../enums/order-v2.enum");
/**
 * Get display information for order item events.
 * Maps from OrderEventTypeV2 to UI-friendly display properties.
 */
const getEventDisplayInfo = (eventType, customDescription) => {
    const eventInfo = {
        [order_v2_enum_1.OrderEventTypeV2.ORDER_PLACED]: {
            title: "Order Placed",
            description: "Your order has been received and is being processed",
            icon: "📝",
            color: "#4CAF50",
        },
        [order_v2_enum_1.OrderEventTypeV2.ORDER_CONFIRMED]: {
            title: "Order Confirmed",
            description: "Your order has been confirmed by the designer",
            icon: "✅",
            color: "#4CAF50",
        },
        [order_v2_enum_1.OrderEventTypeV2.PAYMENT_CONFIRMED]: {
            title: "Payment Confirmed",
            description: "Payment has been processed successfully",
            icon: "💳",
            color: "#4CAF50",
        },
        [order_v2_enum_1.OrderEventTypeV2.STATUS_CHANGED]: {
            title: "Status Updated",
            description: "Order status has been updated",
            icon: "🔄",
            color: "#FF9800",
        },
        [order_v2_enum_1.OrderEventTypeV2.ITEM_CONFIRMED]: {
            title: "Order Confirmed",
            description: "Your order has been confirmed by the designer",
            icon: "✅",
            color: "#4CAF50",
        },
        [order_v2_enum_1.OrderEventTypeV2.IN_PROGRESS]: {
            title: "In Progress",
            description: "Your item is being prepared/customized",
            icon: "🏭",
            color: "#FF9800",
        },
        [order_v2_enum_1.OrderEventTypeV2.READY_TO_SHIP]: {
            title: "Ready to Ship",
            description: "Your item is packed and ready for dispatch",
            icon: "📦",
            color: "#2196F3",
        },
        [order_v2_enum_1.OrderEventTypeV2.PICKUP_REQUESTED]: {
            title: "Pickup Requested",
            description: "Seller has packed the item and requested a logistics pickup",
            icon: "🏷️",
            color: "#2196F3",
        },
        [order_v2_enum_1.OrderEventTypeV2.PICKUP_CONFIRMED]: {
            title: "Pickup Confirmed",
            description: "Logistics has confirmed and scheduled the pickup slot",
            icon: "🚐",
            color: "#1565C0",
        },
        [order_v2_enum_1.OrderEventTypeV2.ITEM_SHIPPED]: {
            title: "Shipped",
            description: "Your item has been dispatched",
            icon: "🚚",
            color: "#2196F3",
        },
        [order_v2_enum_1.OrderEventTypeV2.ITEM_OUT_FOR_DELIVERY]: {
            title: "Out for Delivery",
            description: "Your item is out for delivery",
            icon: "🏃",
            color: "#9C27B0",
        },
        [order_v2_enum_1.OrderEventTypeV2.ITEM_DELIVERED]: {
            title: "Delivered",
            description: "Your item has been delivered successfully",
            icon: "🎉",
            color: "#4CAF50",
        },
        [order_v2_enum_1.OrderEventTypeV2.ITEM_CANCELLED]: {
            title: "Cancelled",
            description: "Order has been cancelled",
            icon: "❌",
            color: "#F44336",
        },
        [order_v2_enum_1.OrderEventTypeV2.RTO_INITIATED]: {
            title: "RTO Initiated",
            description: "Delivery was refused — item is being returned to seller",
            icon: "↩️",
            color: "#FF5722",
        },
        [order_v2_enum_1.OrderEventTypeV2.RTO_IN_TRANSIT]: {
            title: "RTO In Transit",
            description: "Refused item is in transit back to seller",
            icon: "🚚",
            color: "#FF5722",
        },
        [order_v2_enum_1.OrderEventTypeV2.RTO_DELIVERED]: {
            title: "RTO Delivered",
            description: "Refused item has reached the seller",
            icon: "📦",
            color: "#FF5722",
        },
        [order_v2_enum_1.OrderEventTypeV2.RTO_APPROVED_BY_SELLER]: {
            title: "Return Approved by Seller",
            description: "Seller confirmed receipt of the refused item",
            icon: "✅",
            color: "#FF5722",
        },
        [order_v2_enum_1.OrderEventTypeV2.MTM_REFUSED_NON_REFUNDABLE]: {
            title: "Non-Refundable — Delivery Refused",
            description: "Delivery was refused despite multiple attempts — this payment is non-refundable",
            icon: "🚫",
            color: "#B91C1C",
        },
        [order_v2_enum_1.OrderEventTypeV2.NDR_HELD]: {
            title: "Awaiting Balance Payment",
            description: "Delivery attempt failed — awaiting your remaining balance payment",
            icon: "⏳",
            color: "#0284C7",
        },
        [order_v2_enum_1.OrderEventTypeV2.NDR_RELEASED]: {
            title: "Balance Received",
            description: "Balance received — item is being redelivered",
            icon: "🚴",
            color: "#0284C7",
        },
        [order_v2_enum_1.OrderEventTypeV2.RETURN_INITIATED]: {
            title: "Return Initiated",
            description: "Return request has been initiated",
            icon: "↩️",
            color: "#FF5722",
        },
        [order_v2_enum_1.OrderEventTypeV2.RETURN_PICKED_UP]: {
            title: "Return Picked Up",
            description: "Item has been picked up for return",
            icon: "📦",
            color: "#FF5722",
        },
        [order_v2_enum_1.OrderEventTypeV2.RETURN_RECEIVED]: {
            title: "Return Received",
            description: "Returned item received by seller",
            icon: "✅",
            color: "#FF5722",
        },
        [order_v2_enum_1.OrderEventTypeV2.RETURNED]: {
            title: "Returned",
            description: "Item has been returned",
            icon: "↩️",
            color: "#FF5722",
        },
        [order_v2_enum_1.OrderEventTypeV2.EXCHANGE_INITIATED]: {
            title: "Exchange Initiated",
            description: "Exchange request has been initiated",
            icon: "🔄",
            color: "#607D8B",
        },
        [order_v2_enum_1.OrderEventTypeV2.EXCHANGE_PICKED_UP]: {
            title: "Exchange Picked Up",
            description: "Item has been picked up for exchange",
            icon: "📦",
            color: "#607D8B",
        },
        [order_v2_enum_1.OrderEventTypeV2.EXCHANGE_RECEIVED]: {
            title: "Exchange Received",
            description: "Exchange item received by seller",
            icon: "✅",
            color: "#607D8B",
        },
        [order_v2_enum_1.OrderEventTypeV2.EXCHANGED]: {
            title: "Exchanged",
            description: "Item has been exchanged",
            icon: "🔄",
            color: "#607D8B",
        },
        [order_v2_enum_1.OrderEventTypeV2.ALTERATION_REQUESTED]: {
            title: "Alteration Requested",
            description: "Alteration request has been initiated",
            icon: "✂️",
            color: "#8B5CF6",
        },
        [order_v2_enum_1.OrderEventTypeV2.ALTERATION_PICKED_UP]: {
            title: "Picked Up for Alteration",
            description: "Item has been picked up for alteration",
            icon: "📦",
            color: "#8B5CF6",
        },
        [order_v2_enum_1.OrderEventTypeV2.ALTERATION_AT_SELLER]: {
            title: "At Seller",
            description: "Item received by seller — alteration in progress",
            icon: "🧵",
            color: "#8B5CF6",
        },
        [order_v2_enum_1.OrderEventTypeV2.ALTERATION_SHIPPED_BACK]: {
            title: "Shipped Back",
            description: "Altered item is on its way back to you",
            icon: "🚚",
            color: "#8B5CF6",
        },
        [order_v2_enum_1.OrderEventTypeV2.ALTERATION_COMPLETED]: {
            title: "Alteration Completed",
            description: "Alteration completed and item delivered",
            icon: "✅",
            color: "#8B5CF6",
        },
        [order_v2_enum_1.OrderEventTypeV2.PAYMENT_CAPTURED]: {
            title: "Payment Captured",
            description: "Payment has been captured successfully",
            icon: "💳",
            color: "#4CAF50",
        },
        [order_v2_enum_1.OrderEventTypeV2.REFUND_INITIATED]: {
            title: "Refund Initiated",
            description: "Refund has been initiated",
            icon: "💰",
            color: "#795548",
        },
        [order_v2_enum_1.OrderEventTypeV2.REFUND_CREDITED]: {
            title: "Refunded",
            description: "Refund has been processed",
            icon: "💰",
            color: "#795548",
        },
        [order_v2_enum_1.OrderEventTypeV2.NOTE_ADDED]: {
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
exports.getEventDisplayInfo = getEventDisplayInfo;
//# sourceMappingURL=event-display.util.js.map