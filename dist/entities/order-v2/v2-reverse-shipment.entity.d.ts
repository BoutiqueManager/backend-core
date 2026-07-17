import { ReverseShipmentCostBearer, ReverseShipmentStatus } from "../../enums/order-v2.enum";
/**
 * Shared reverse logistics entity for both return and exchange pickup operations.
 *
 * Exactly one of (returnOrderId, exchangeOrderId) is set — they are mutually exclusive.
 *
 * Shipment ID lock rule per PRD §3.3.3:
 *   Once pickedUpAt is set (status → PICKED_UP), the parent return/exchange order's
 *   isPickupLocked flag is set to true. No additional items may be merged after this point.
 *
 * Pickup address is ALWAYS the original delivery address and cannot be changed by customer.
 * Per PRD §2.3.1 and §2.4.1 step-1.
 */
export declare class V2ReverseShipment {
    id: string;
    /** e.g. RSHIP-2026-00001 */
    reverseShipmentId: string;
    returnOrderId: string;
    exchangeOrderId: string;
    /**
     * Set for RTO legs created when a customer refuses delivery at the door
     * (RTS Delivery Refused scenario) — no return/exchange order exists there.
     */
    orderItemId: string | null;
    customerId: string;
    pickupAddressId: string | null;
    /** Immutable address snapshot — locked at creation, never changes */
    pickupAddress: Record<string, any>;
    /** Shiprocket courier company ID used for the reverse leg (same as forward). */
    courierCompanyId: number | null;
    /** Reverse shipping cost (ex-GST). Packaging excluded by design. */
    shippingCost: number;
    /** GST @18% on shippingCost. */
    gstOnShippingCost: number;
    /** shippingCost + gstOnShippingCost. */
    totalCost: number;
    /**
     * Who bears the reverse-shipment cost:
     *   - LABELD  (default) → returns/exchanges: absorbed, never deducted from refund
     *   - CUSTOMER          → RTS delivery refused: deducted from the customer refund
     */
    costBearer: ReverseShipmentCostBearer;
    logisticsProvider: string;
    trackingNumber: string;
    trackingUrl: string;
    status: ReverseShipmentStatus;
    scheduledPickupDate: Date;
    scheduledPickupSlot: string;
    /**
     * Setting this timestamp triggers isPickupLocked = true on the parent
     * return/exchange order, preventing any further item merges per PRD §3.3.3.
     */
    pickedUpAt: Date;
    deliveredToSellerAt: Date;
    estimatedDeliveryToSeller: Date;
    pickupAttempts: number;
    lastAttemptAt: Date;
    failureReason: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}
