import { OrderEventTypeV2, EventActorTypeV2 } from "../../enums/order-v2.enum";
/**
 * Append-only audit trail for every state change on an order item.
 * Powers the timeline displayed on both customer app and seller app.
 * Records are NEVER updated — only inserted.
 */
export declare class V2OrderItemEvent {
    id: string;
    orderItemId: string;
    /** Denormalized for efficient order-level timeline queries */
    orderId: string;
    customerId: string;
    boutiqueId: string;
    eventType: OrderEventTypeV2;
    /** Status value before this event (null for first event) */
    fromStatus: string;
    /** Status value after this event */
    toStatus: string;
    /** Human-readable description displayed in timeline UI */
    description: string;
    /** Display title for timeline UI */
    title: string;
    /** Icon for timeline UI (emoji or icon name) */
    icon: string;
    /** Color hex code for timeline UI */
    color: string;
    actorType: EventActorTypeV2;
    /** UUID of the customer/seller/logistics partner who triggered this event */
    actorId: string;
    actorName: string;
    /**
     * Extra structured data relevant to this event type.
     * Examples:
     *   STATUS_CHANGED → { previousStatus, newStatus }
     *   ITEM_SHIPPED   → { trackingNumber, carrier, trackingUrl }
     *   ITEM_CANCELLED → { reason, cancelledBy }
     *   REFUND_INITIATED → { refundId, amount, destination }
     */
    metadata: Record<string, any>;
    occurredAt: Date;
    /** No updatedAt — this table is append-only */
    createdAt: Date;
}
