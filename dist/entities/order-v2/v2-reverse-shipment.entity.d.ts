import { ReverseShipmentStatus } from "../../enums/order-v2.enum";
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
    customerId: string;
    /** FK to customer_addresses */
    pickupAddressId: string;
    /** Immutable address snapshot — locked at creation, never changes */
    pickupAddress: Record<string, any>;
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
