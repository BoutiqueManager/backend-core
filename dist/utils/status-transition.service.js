"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatusTransitionService = void 0;
const order_v2_enum_1 = require("../enums/order-v2.enum");
/**
 * Service to handle status transitions and their corresponding events.
 * Ensures consistent event creation across the application.
 */
class StatusTransitionService {
    /**
     * Get the event type for a status transition.
     */
    static getEventTypeForStatus(newStatus) {
        return this.statusToEventMap[newStatus] || order_v2_enum_1.OrderEventTypeV2.STATUS_CHANGED;
    }
    /**
     * Get default description for status transitions.
     */
    static getDefaultDescription(fromStatus, toStatus, actorType, reason) {
        const descriptions = {
            [order_v2_enum_1.OrderItemStatusV2.NEW]: "Order has been placed",
            [order_v2_enum_1.OrderItemStatusV2.CONFIRMED]: "Order has been confirmed by the boutique",
            [order_v2_enum_1.OrderItemStatusV2.IN_PROGRESS]: "Your item is being prepared/customized",
            [order_v2_enum_1.OrderItemStatusV2.LOGISTICS_APPROVAL_PENDING]: "Your item is awaiting logistics approval",
            [order_v2_enum_1.OrderItemStatusV2.SHIPPED]: "Your item has been shipped",
            [order_v2_enum_1.OrderItemStatusV2.OUT_FOR_DELIVERY]: "Your item is out for delivery",
            [order_v2_enum_1.OrderItemStatusV2.DELIVERED]: "Your item has been delivered successfully",
            [order_v2_enum_1.OrderItemStatusV2.CANCELLED]: reason
                ? `Item cancelled by ${actorType}. Reason: ${reason}`
                : `Item cancelled by ${actorType}`,
            [order_v2_enum_1.OrderItemStatusV2.RETURN_INITIATED]: "Return request has been initiated",
            [order_v2_enum_1.OrderItemStatusV2.RETURN_PICKUP_SCHEDULED]: "Return pickup has been scheduled",
            [order_v2_enum_1.OrderItemStatusV2.RETURN_PICKED_UP]: "Item has been picked up for return",
            [order_v2_enum_1.OrderItemStatusV2.RETURN_IN_TRANSIT]: "Returned item is in transit",
            [order_v2_enum_1.OrderItemStatusV2.RETURN_RECEIVED_BY_SELLER]: "Returned item received by seller",
            [order_v2_enum_1.OrderItemStatusV2.RETURNED]: "Item has been returned successfully",
            [order_v2_enum_1.OrderItemStatusV2.RETURN_REJECTED]: "Return request has been rejected",
            [order_v2_enum_1.OrderItemStatusV2.EXCHANGE_INITIATED]: "Exchange request has been initiated",
            [order_v2_enum_1.OrderItemStatusV2.EXCHANGE_PICKUP_SCHEDULED]: "Exchange pickup has been scheduled",
            [order_v2_enum_1.OrderItemStatusV2.EXCHANGE_PICKED_UP]: "Item has been picked up for exchange",
            [order_v2_enum_1.OrderItemStatusV2.EXCHANGE_IN_TRANSIT]: "Exchange item is in transit",
            [order_v2_enum_1.OrderItemStatusV2.EXCHANGE_RECEIVED_BY_SELLER]: "Exchange item received by seller",
            [order_v2_enum_1.OrderItemStatusV2.EXCHANGE_ORDER_PLACED]: "Exchange order has been placed",
            [order_v2_enum_1.OrderItemStatusV2.EXCHANGE_SHIPPED]: "Exchange item has been shipped",
            [order_v2_enum_1.OrderItemStatusV2.EXCHANGE_DELIVERED]: "Exchange item has been delivered",
            [order_v2_enum_1.OrderItemStatusV2.EXCHANGED]: "Item has been exchanged successfully",
            [order_v2_enum_1.OrderItemStatusV2.EXCHANGE_REJECTED]: "Exchange request has been rejected",
        };
        return descriptions[toStatus] || `Status changed to ${toStatus}`;
    }
    /**
     * Determine actor type based on context.
     */
    static getActorType(context) {
        const actorMap = {
            customer: order_v2_enum_1.EventActorTypeV2.CUSTOMER,
            seller: order_v2_enum_1.EventActorTypeV2.SELLER,
            system: order_v2_enum_1.EventActorTypeV2.SYSTEM,
            logistics: order_v2_enum_1.EventActorTypeV2.LOGISTICS,
        };
        return actorMap[context];
    }
}
exports.StatusTransitionService = StatusTransitionService;
/**
 * Maps order item status changes to their corresponding event types.
 */
StatusTransitionService.statusToEventMap = {
    [order_v2_enum_1.OrderItemStatusV2.NEW]: order_v2_enum_1.OrderEventTypeV2.ORDER_PLACED,
    [order_v2_enum_1.OrderItemStatusV2.CONFIRMED]: order_v2_enum_1.OrderEventTypeV2.ITEM_CONFIRMED,
    [order_v2_enum_1.OrderItemStatusV2.IN_PROGRESS]: order_v2_enum_1.OrderEventTypeV2.IN_PROGRESS,
    [order_v2_enum_1.OrderItemStatusV2.LOGISTICS_APPROVAL_PENDING]: order_v2_enum_1.OrderEventTypeV2.READY_TO_SHIP,
    [order_v2_enum_1.OrderItemStatusV2.SHIPPED]: order_v2_enum_1.OrderEventTypeV2.ITEM_SHIPPED,
    [order_v2_enum_1.OrderItemStatusV2.OUT_FOR_DELIVERY]: order_v2_enum_1.OrderEventTypeV2.ITEM_OUT_FOR_DELIVERY,
    [order_v2_enum_1.OrderItemStatusV2.DELIVERED]: order_v2_enum_1.OrderEventTypeV2.ITEM_DELIVERED,
    [order_v2_enum_1.OrderItemStatusV2.CANCELLED]: order_v2_enum_1.OrderEventTypeV2.ITEM_CANCELLED,
    [order_v2_enum_1.OrderItemStatusV2.RETURN_INITIATED]: order_v2_enum_1.OrderEventTypeV2.RETURN_INITIATED,
    [order_v2_enum_1.OrderItemStatusV2.RETURN_PICKUP_SCHEDULED]: order_v2_enum_1.OrderEventTypeV2.RETURN_INITIATED,
    [order_v2_enum_1.OrderItemStatusV2.RETURN_PICKED_UP]: order_v2_enum_1.OrderEventTypeV2.RETURN_PICKED_UP,
    [order_v2_enum_1.OrderItemStatusV2.RETURN_IN_TRANSIT]: order_v2_enum_1.OrderEventTypeV2.RETURN_PICKED_UP,
    [order_v2_enum_1.OrderItemStatusV2.RETURN_RECEIVED_BY_SELLER]: order_v2_enum_1.OrderEventTypeV2.RETURN_RECEIVED,
    [order_v2_enum_1.OrderItemStatusV2.RETURNED]: order_v2_enum_1.OrderEventTypeV2.RETURNED,
    [order_v2_enum_1.OrderItemStatusV2.RETURN_REJECTED]: order_v2_enum_1.OrderEventTypeV2.STATUS_CHANGED,
    [order_v2_enum_1.OrderItemStatusV2.EXCHANGE_INITIATED]: order_v2_enum_1.OrderEventTypeV2.EXCHANGE_INITIATED,
    [order_v2_enum_1.OrderItemStatusV2.EXCHANGE_PICKUP_SCHEDULED]: order_v2_enum_1.OrderEventTypeV2.EXCHANGE_INITIATED,
    [order_v2_enum_1.OrderItemStatusV2.EXCHANGE_PICKED_UP]: order_v2_enum_1.OrderEventTypeV2.EXCHANGE_PICKED_UP,
    [order_v2_enum_1.OrderItemStatusV2.EXCHANGE_IN_TRANSIT]: order_v2_enum_1.OrderEventTypeV2.EXCHANGE_PICKED_UP,
    [order_v2_enum_1.OrderItemStatusV2.EXCHANGE_RECEIVED_BY_SELLER]: order_v2_enum_1.OrderEventTypeV2.EXCHANGE_RECEIVED,
    [order_v2_enum_1.OrderItemStatusV2.EXCHANGE_ORDER_PLACED]: order_v2_enum_1.OrderEventTypeV2.STATUS_CHANGED,
    [order_v2_enum_1.OrderItemStatusV2.EXCHANGE_SHIPPED]: order_v2_enum_1.OrderEventTypeV2.ITEM_SHIPPED,
    [order_v2_enum_1.OrderItemStatusV2.EXCHANGE_DELIVERED]: order_v2_enum_1.OrderEventTypeV2.ITEM_DELIVERED,
    [order_v2_enum_1.OrderItemStatusV2.EXCHANGED]: order_v2_enum_1.OrderEventTypeV2.EXCHANGED,
    [order_v2_enum_1.OrderItemStatusV2.EXCHANGE_REJECTED]: order_v2_enum_1.OrderEventTypeV2.STATUS_CHANGED,
};
//# sourceMappingURL=status-transition.service.js.map