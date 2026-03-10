import {
  OrderItemStatusV2,
  OrderEventTypeV2,
  EventActorTypeV2,
} from "../enums/order-v2.enum";

/**
 * Service to handle status transitions and their corresponding events.
 * Ensures consistent event creation across the application.
 */
export class StatusTransitionService {
  /**
   * Maps order item status changes to their corresponding event types.
   */
  private static statusToEventMap: Record<OrderItemStatusV2, OrderEventTypeV2> =
    {
      [OrderItemStatusV2.NEW]: OrderEventTypeV2.ORDER_PLACED,
      [OrderItemStatusV2.CONFIRMED]: OrderEventTypeV2.ITEM_CONFIRMED,
      [OrderItemStatusV2.IN_PROGRESS]: OrderEventTypeV2.IN_PROGRESS,
      [OrderItemStatusV2.SHIPPED]: OrderEventTypeV2.ITEM_SHIPPED,
      [OrderItemStatusV2.OUT_FOR_DELIVERY]:
        OrderEventTypeV2.ITEM_OUT_FOR_DELIVERY,
      [OrderItemStatusV2.DELIVERED]: OrderEventTypeV2.ITEM_DELIVERED,
      [OrderItemStatusV2.CANCELLED]: OrderEventTypeV2.ITEM_CANCELLED,
      [OrderItemStatusV2.RETURN_INITIATED]: OrderEventTypeV2.RETURN_INITIATED,
      [OrderItemStatusV2.RETURN_PICKUP_SCHEDULED]:
        OrderEventTypeV2.RETURN_INITIATED,
      [OrderItemStatusV2.RETURN_PICKED_UP]: OrderEventTypeV2.RETURN_PICKED_UP,
      [OrderItemStatusV2.RETURN_IN_TRANSIT]: OrderEventTypeV2.RETURN_PICKED_UP,
      [OrderItemStatusV2.RETURN_RECEIVED_BY_SELLER]:
        OrderEventTypeV2.RETURN_RECEIVED,
      [OrderItemStatusV2.RETURNED]: OrderEventTypeV2.RETURNED,
      [OrderItemStatusV2.RETURN_REJECTED]: OrderEventTypeV2.STATUS_CHANGED,
      [OrderItemStatusV2.EXCHANGE_INITIATED]:
        OrderEventTypeV2.EXCHANGE_INITIATED,
      [OrderItemStatusV2.EXCHANGE_PICKUP_SCHEDULED]:
        OrderEventTypeV2.EXCHANGE_INITIATED,
      [OrderItemStatusV2.EXCHANGE_PICKED_UP]:
        OrderEventTypeV2.EXCHANGE_PICKED_UP,
      [OrderItemStatusV2.EXCHANGE_IN_TRANSIT]:
        OrderEventTypeV2.EXCHANGE_PICKED_UP,
      [OrderItemStatusV2.EXCHANGE_RECEIVED_BY_SELLER]:
        OrderEventTypeV2.EXCHANGE_RECEIVED,
      [OrderItemStatusV2.EXCHANGE_ORDER_PLACED]:
        OrderEventTypeV2.STATUS_CHANGED,
      [OrderItemStatusV2.EXCHANGE_SHIPPED]: OrderEventTypeV2.ITEM_SHIPPED,
      [OrderItemStatusV2.EXCHANGE_DELIVERED]: OrderEventTypeV2.ITEM_DELIVERED,
      [OrderItemStatusV2.EXCHANGED]: OrderEventTypeV2.EXCHANGED,
      [OrderItemStatusV2.EXCHANGE_REJECTED]: OrderEventTypeV2.STATUS_CHANGED,
    };

  /**
   * Get the event type for a status transition.
   */
  static getEventTypeForStatus(newStatus: OrderItemStatusV2): OrderEventTypeV2 {
    return this.statusToEventMap[newStatus] || OrderEventTypeV2.STATUS_CHANGED;
  }

  /**
   * Get default description for status transitions.
   */
  static getDefaultDescription(
    fromStatus: OrderItemStatusV2 | null,
    toStatus: OrderItemStatusV2,
    actorType: EventActorTypeV2,
    reason?: string,
  ): string {
    const descriptions: Record<OrderItemStatusV2, string> = {
      [OrderItemStatusV2.NEW]: "Order has been placed",
      [OrderItemStatusV2.CONFIRMED]: "Order has been confirmed by the boutique",
      [OrderItemStatusV2.IN_PROGRESS]: "Your item is being prepared/customized",
      [OrderItemStatusV2.SHIPPED]: "Your item has been shipped",
      [OrderItemStatusV2.OUT_FOR_DELIVERY]: "Your item is out for delivery",
      [OrderItemStatusV2.DELIVERED]:
        "Your item has been delivered successfully",
      [OrderItemStatusV2.CANCELLED]: reason
        ? `Item cancelled by ${actorType}. Reason: ${reason}`
        : `Item cancelled by ${actorType}`,
      [OrderItemStatusV2.RETURN_INITIATED]: "Return request has been initiated",
      [OrderItemStatusV2.RETURN_PICKUP_SCHEDULED]:
        "Return pickup has been scheduled",
      [OrderItemStatusV2.RETURN_PICKED_UP]:
        "Item has been picked up for return",
      [OrderItemStatusV2.RETURN_IN_TRANSIT]: "Returned item is in transit",
      [OrderItemStatusV2.RETURN_RECEIVED_BY_SELLER]:
        "Returned item received by seller",
      [OrderItemStatusV2.RETURNED]: "Item has been returned successfully",
      [OrderItemStatusV2.RETURN_REJECTED]: "Return request has been rejected",
      [OrderItemStatusV2.EXCHANGE_INITIATED]:
        "Exchange request has been initiated",
      [OrderItemStatusV2.EXCHANGE_PICKUP_SCHEDULED]:
        "Exchange pickup has been scheduled",
      [OrderItemStatusV2.EXCHANGE_PICKED_UP]:
        "Item has been picked up for exchange",
      [OrderItemStatusV2.EXCHANGE_IN_TRANSIT]: "Exchange item is in transit",
      [OrderItemStatusV2.EXCHANGE_RECEIVED_BY_SELLER]:
        "Exchange item received by seller",
      [OrderItemStatusV2.EXCHANGE_ORDER_PLACED]:
        "Exchange order has been placed",
      [OrderItemStatusV2.EXCHANGE_SHIPPED]: "Exchange item has been shipped",
      [OrderItemStatusV2.EXCHANGE_DELIVERED]:
        "Exchange item has been delivered",
      [OrderItemStatusV2.EXCHANGED]: "Item has been exchanged successfully",
      [OrderItemStatusV2.EXCHANGE_REJECTED]:
        "Exchange request has been rejected",
    };

    return descriptions[toStatus] || `Status changed to ${toStatus}`;
  }

  /**
   * Determine actor type based on context.
   */
  static getActorType(
    context: "customer" | "seller" | "system" | "logistics",
  ): EventActorTypeV2 {
    const actorMap = {
      customer: EventActorTypeV2.CUSTOMER,
      seller: EventActorTypeV2.SELLER,
      system: EventActorTypeV2.SYSTEM,
      logistics: EventActorTypeV2.LOGISTICS,
    };
    return actorMap[context];
  }
}
