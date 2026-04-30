import { OrderItemStatusV2, OrderEventTypeV2, EventActorTypeV2 } from "../enums/order-v2.enum";
/**
 * Service to handle status transitions and their corresponding events.
 * Ensures consistent event creation across the application.
 */
export declare class StatusTransitionService {
    /**
     * Maps order item status changes to their corresponding event types.
     */
    private static statusToEventMap;
    /**
     * Get the event type for a status transition.
     */
    static getEventTypeForStatus(newStatus: OrderItemStatusV2): OrderEventTypeV2;
    /**
     * Get default description for status transitions.
     */
    static getDefaultDescription(fromStatus: OrderItemStatusV2 | null, toStatus: OrderItemStatusV2, actorType: EventActorTypeV2, reason?: string): string;
    /**
     * Determine actor type based on context.
     */
    static getActorType(context: "customer" | "seller" | "system" | "logistics"): EventActorTypeV2;
}
