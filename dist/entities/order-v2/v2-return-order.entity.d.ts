import { ReturnOrderStatus } from "../../enums/order-v2.enum";
import { V2ReturnOrderItem } from "./v2-return-order-item.entity";
/**
 * One Return Order groups items being returned together in a single pickup.
 *
 * Merge rules per PRD §1.3 / §3.2.1:
 *   - Same-time requests → ONE return order, ONE reverse shipment
 *   - New item added before pickup → merged into existing open return order
 *   - New item added after pickup → NEW return order + new reverse shipment
 *   - isPickupLocked = true after first item picked up (no further merges allowed)
 *
 * Return Order ID format: RET-YYYY-#####
 */
export declare class V2ReturnOrder {
    id: string;
    /** e.g. RET-2026-00005 — displayed (seller tabs, customer order detail) */
    returnOrderId: string;
    /** The original v2_order that items are being returned from */
    originalOrderId: string;
    checkoutSessionId: string;
    customerId: string;
    boutiqueId: string;
    boutiqueName: string;
    /**
     * FK to v2_reverse_shipments.
     * Set when pickup is first scheduled (after customer initiates request).
     */
    reverseShipmentId: string;
    /**
     * Flipped to true when the first item in this return order is picked up.
     * After this point no new items may be merged into this return order.
     */
    isPickupLocked: boolean;
    pickedUpAt: Date;
    /** Sum of totalFinalPrice for all return order items */
    totalReturnValue: number;
    /**
     * Amount to refund = totalReturnValue.
     * Shipping charges NOT included per PRD §2.3.1 and §1.5.
     */
    refundAmount: number;
    /**
     * FK to v2_refunds — set ONLY after seller confirms receipt (receivedBySellerAt).
     * Refund must NOT be triggered at pickup time per PRD §1.5.
     */
    refundId: string;
    status: ReturnOrderStatus;
    scheduledPickupDate: Date;
    scheduledPickupSlot: string;
    /**
     * Set by seller when they confirm receipt of the returned item.
     * This timestamp triggers refund initiation per PRD §1.5 and §3.3.1.
     */
    receivedBySellerAt: Date;
    completedAt: Date;
    rejectedAt: Date;
    rejectionReason: string;
    isActive: boolean;
    returnOrderItems: V2ReturnOrderItem[];
    createdAt: Date;
    updatedAt: Date;
}
