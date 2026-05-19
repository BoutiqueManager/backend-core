import { OrderStatusV2 } from "../enums/order-v2.enum";
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
 *  5.5. Mixed terminal states with ANY RETURNED/REFUND → RETURNED (highest priority)
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
