import { ExchangeOrderStatus, ExchangePricingType } from "../../enums/order-v2.enum";
import { V2ExchangeOrderItem } from "./v2-exchange-order-item.entity";
/**
 * One Exchange Order groups items exchanged in a single pickup+delivery operation.
 *
 * Merge rules are identical to return orders per PRD §3.2.2.
 * Exchange Order ID format: EXC-YYYY-#####
 *
 * Key pricing rules per PRD §1.6:
 *   - priceDifference > 0 → customer pays BEFORE exchange is placed
 *   - priceDifference < 0 → refund ONLY after seller confirms receipt
 *   - priceDifference = 0 → no payment/refund action
 *
 * Exchange restrictions per PRD §1.2:
 *   - made_to_measure → can only exchange for ready_to_ship from SAME boutique
 *   - ready_to_ship → can exchange for ready_to_ship from same OR different boutique
 */
export declare class V2ExchangeOrder {
    id: string;
    /** e.g. EXC-2026-00002 */
    exchangeOrderId: string;
    originalOrderId: string;
    checkoutSessionId: string;
    customerId: string;
    /** Original boutique (where original item is being returned to) */
    boutiqueId: string;
    boutiqueName: string;
    /**
     * Customer may change delivery address for the new exchange item.
     * Pickup address is always fixed (original delivery address).
     * Per PRD §2.4.1 step-1 and §3.3.6.
     */
    newItemDeliveryAddressId: string;
    /** Immutable snapshot after exchange placed — reflects any address change */
    newItemDeliveryAddress: Record<string, any>;
    reverseShipmentId: string;
    /** Locked after first item in this exchange order is picked up */
    isPickupLocked: boolean;
    pickedUpAt: Date;
    forwardTrackingNumber: string;
    forwardTrackingCarrier: string;
    forwardTrackingUrl: string;
    /** Shipping charges for the new item delivery — charged to customer */
    forwardShippingCharges: number;
    originalItemFinalPrice: number;
    newItemFinalPrice: number;
    /**
     * newItemFinalPrice + forwardShippingCharges − originalItemFinalPrice
     * Positive → customer must pay this extra amount before exchange is placed
     * Negative → customer gets this amount as refund after seller confirms receipt
     * Zero → no action required
     */
    priceDifference: number;
    exchangePricingType: ExchangePricingType;
    /**
     * FK to v2_payments (paymentType = exchange_top_up).
     * Set when priceDifference > 0 and customer completes additional payment.
     */
    additionalPaymentId: string;
    /**
     * FK to v2_refunds.
     * Set ONLY when priceDifference < 0 AND seller confirms receipt.
     * Per PRD §1.5 — refund never triggered at pickup time.
     */
    refundId: string;
    status: ExchangeOrderStatus;
    scheduledPickupDate: Date;
    scheduledPickupSlot: string;
    /** Triggers refund initiation if priceDifference < 0 per PRD §3.3.1 */
    receivedBySellerAt: Date;
    completedAt: Date;
    rejectedAt: Date;
    rejectionReason: string;
    isActive: boolean;
    exchangeOrderItems: V2ExchangeOrderItem[];
    createdAt: Date;
    updatedAt: Date;
}
