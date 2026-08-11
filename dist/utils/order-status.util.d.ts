import { OrderItemStatusV2, OrderStatusV2 } from "../enums/order-v2.enum";
/**
 * Derives the parent order-level status from an array of item statuses.
 *
 * This is the single source of truth used by both boutique-server and
 * customer-server so the computation is always consistent.
 *
 * Priority rules (evaluated top-to-bottom, first match wins):
 *
 *  1. ALL items CANCELLED                         → CANCELLED
 *  2. All non-cancelled items DELIVERED (partial) → PARTIALLY_CANCELLED
 *  3. All non-cancelled items DELIVERED (full)    → DELIVERED
 *  4. ALL active items RETURNED/RECEIVED_BY_SELLER/REFUNDED → RETURNED (TERMINAL)
 *  5. ALL active items EXCHANGED                  → EXCHANGED
 *  5.4. ALL active items in terminal non-return states
 *      (DELIVERED, EXCHANGED, RETURN_REJECTED, EXCHANGE_REJECTED)
 *      without any returns/refunds                → DELIVERED
 *  5.5. Mixed terminal states with ANY RETURNED/REFUND → RETURNED (highest priority)
 *  5.6. ALL active items SHIPPED                   → SHIPPED
 *  5.7. ALL active items OUT_FOR_DELIVERY          → OUT_FOR_DELIVERY
 *  6. Any item in an active transition state
 *     (IN_PROGRESS / SCHEDULED_PICKUP / PICKUP_SCHEDULED /
 *      OUT_FOR_DELIVERY / SHIPPED /
 *      RETURN_INITIATED / RETURN_PICKUP_SCHEDULED / RETURN_PICKED_UP / RETURN_IN_TRANSIT /
 *      EXCHANGE_* except EXCHANGED/EXCHANGE_REJECTED)  → IN_PROGRESS
 *     NOTE: RETURN_RECEIVED_BY_SELLER is TERMINAL, not a transition
 *  7. ALL items NEW                               → NEW
 *  8. Mixed / unresolvable                        → null (caller keeps current)
 */
export declare function computeOrderStatusFromItemStatuses(itemStatuses: string[]): OrderStatusV2 | null;
/**
 * Determines whether to show the estimated delivery date for an item.
 * Shows for all active statuses until the item is delivered, cancelled, returned, or exchanged.
 */
export declare function shouldShowEstimatedDelivery(status: OrderItemStatusV2): boolean;
/**
 * Returns true if the status is part of the refund flow.
 * Includes refund statuses and the terminal return status that triggers refund.
 */
export declare function isRefundFlowStatus(status: OrderItemStatusV2): boolean;
/**
 * Determines whether to show the refund/cancellation stepper UI.
 * Shows for:
 * - CANCELLED status (non-COD orders only)
 * - Any refund flow status
 */
export declare function shouldShowRefundStepper(status: OrderItemStatusV2, isCodOrder: boolean): boolean;
