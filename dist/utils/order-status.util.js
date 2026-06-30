"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.computeOrderStatusFromItemStatuses = computeOrderStatusFromItemStatuses;
exports.shouldShowEstimatedDelivery = shouldShowEstimatedDelivery;
exports.isRefundFlowStatus = isRefundFlowStatus;
exports.shouldShowRefundStepper = shouldShowRefundStepper;
const order_v2_enum_1 = require("../enums/order-v2.enum");
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
function computeOrderStatusFromItemStatuses(itemStatuses) {
    if (!itemStatuses || itemStatuses.length === 0)
        return null;
    const total = itemStatuses.length;
    // ── Bucket counts ─────────────────────────────────────────────────────────
    let newCount = 0;
    let inProgressCount = 0;
    let scheduledPickupCount = 0;
    let pickupScheduledCount = 0;
    let shippedCount = 0;
    let outForDeliveryCount = 0;
    let deliveredCount = 0;
    let cancelledCount = 0;
    // Return lifecycle (active — not yet terminal)
    let returnInitiatedCount = 0;
    let returnPickupScheduledCount = 0;
    let returnPickedUpCount = 0;
    let returnInTransitCount = 0;
    let returnReceivedBySellerCount = 0;
    // Return terminal
    let returnedCount = 0;
    let returnRejectedCount = 0;
    // Exchange lifecycle (active — not yet terminal)
    let exchangeInitiatedCount = 0;
    let exchangePickupScheduledCount = 0;
    let exchangePickedUpCount = 0;
    let exchangeInTransitCount = 0;
    let exchangeReceivedBySellerCount = 0;
    let exchangeOrderPlacedCount = 0;
    let exchangeShippedCount = 0;
    let exchangeDeliveredCount = 0;
    // Exchange terminal
    let exchangedCount = 0;
    let exchangeRejectedCount = 0;
    // Refund statuses (item-level only; don't affect order-level flow)
    let refundCount = 0;
    for (const s of itemStatuses) {
        switch (s) {
            case order_v2_enum_1.OrderItemStatusV2.NEW:
                newCount++;
                break;
            case order_v2_enum_1.OrderItemStatusV2.IN_PROGRESS:
                inProgressCount++;
                break;
            case order_v2_enum_1.OrderItemStatusV2.SCHEDULED_PICKUP:
                scheduledPickupCount++;
                break;
            case order_v2_enum_1.OrderItemStatusV2.PICKUP_SCHEDULED:
                pickupScheduledCount++;
                break;
            case order_v2_enum_1.OrderItemStatusV2.SHIPPED:
                shippedCount++;
                break;
            case order_v2_enum_1.OrderItemStatusV2.OUT_FOR_DELIVERY:
                outForDeliveryCount++;
                break;
            case order_v2_enum_1.OrderItemStatusV2.DELIVERED:
                deliveredCount++;
                break;
            case order_v2_enum_1.OrderItemStatusV2.CANCELLED:
                cancelledCount++;
                break;
            // ── Return lifecycle ──────────────────────────────────────────────────
            case order_v2_enum_1.OrderItemStatusV2.RETURN_INITIATED:
                returnInitiatedCount++;
                break;
            case order_v2_enum_1.OrderItemStatusV2.RETURN_PICKUP_SCHEDULED:
                returnPickupScheduledCount++;
                break;
            case order_v2_enum_1.OrderItemStatusV2.RETURN_PICKED_UP:
                returnPickedUpCount++;
                break;
            case order_v2_enum_1.OrderItemStatusV2.RETURN_IN_TRANSIT:
                returnInTransitCount++;
                break;
            case order_v2_enum_1.OrderItemStatusV2.RETURN_RECEIVED_BY_SELLER:
                returnReceivedBySellerCount++;
                break;
            case order_v2_enum_1.OrderItemStatusV2.RETURNED:
                returnedCount++;
                break;
            case order_v2_enum_1.OrderItemStatusV2.RETURN_REJECTED:
                returnRejectedCount++;
                break;
            // ── Exchange lifecycle ────────────────────────────────────────────────
            case order_v2_enum_1.OrderItemStatusV2.EXCHANGE_INITIATED:
                exchangeInitiatedCount++;
                break;
            case order_v2_enum_1.OrderItemStatusV2.EXCHANGE_PICKUP_SCHEDULED:
                exchangePickupScheduledCount++;
                break;
            case order_v2_enum_1.OrderItemStatusV2.EXCHANGE_PICKED_UP:
                exchangePickedUpCount++;
                break;
            case order_v2_enum_1.OrderItemStatusV2.EXCHANGE_IN_TRANSIT:
                exchangeInTransitCount++;
                break;
            case order_v2_enum_1.OrderItemStatusV2.EXCHANGE_RECEIVED_BY_SELLER:
                exchangeReceivedBySellerCount++;
                break;
            case order_v2_enum_1.OrderItemStatusV2.EXCHANGE_ORDER_PLACED:
                exchangeOrderPlacedCount++;
                break;
            case order_v2_enum_1.OrderItemStatusV2.EXCHANGE_SHIPPED:
                exchangeShippedCount++;
                break;
            case order_v2_enum_1.OrderItemStatusV2.EXCHANGE_DELIVERED:
                exchangeDeliveredCount++;
                break;
            case order_v2_enum_1.OrderItemStatusV2.EXCHANGED:
                exchangedCount++;
                break;
            case order_v2_enum_1.OrderItemStatusV2.EXCHANGE_REJECTED:
                exchangeRejectedCount++;
                break;
            // ── Refund statuses (item-level only) ────────────────────────────────
            case order_v2_enum_1.OrderItemStatusV2.REFUND_INITIATED:
            case order_v2_enum_1.OrderItemStatusV2.REFUND_CREDITED:
            case order_v2_enum_1.OrderItemStatusV2.REFUND_FAILED:
                refundCount++;
                break;
            default:
                // Unknown status — treat as NEW to avoid getting stuck
                newCount++;
                break;
        }
    }
    // ── Rule 1: ALL cancelled → CANCELLED ────────────────────────────────────
    if (cancelledCount === total)
        return order_v2_enum_1.OrderStatusV2.CANCELLED;
    // ── Derive "active" (non-cancelled) items ─────────────────────────────────
    const activeCount = total - cancelledCount;
    // ── Rule 2 & 3: ALL active items DELIVERED ────────────────────────────────
    if (deliveredCount === activeCount) {
        return cancelledCount > 0
            ? order_v2_enum_1.OrderStatusV2.PARTIALLY_CANCELLED
            : order_v2_enum_1.OrderStatusV2.DELIVERED;
    }
    // ── Rule 4: ALL active items RETURNED or REFUNDED (terminal return) ────────
    // Once item is received by seller, it's in a terminal return state.
    // Refund statuses (REFUND_INITIATED/CREDITED/FAILED) are also terminal return states.
    const terminalReturnCount = returnedCount + returnReceivedBySellerCount + refundCount;
    if (terminalReturnCount === activeCount && terminalReturnCount > 0) {
        return order_v2_enum_1.OrderStatusV2.RETURNED;
    }
    // ── Rule 5: ALL active items EXCHANGED (terminal exchange) ────────────────
    if (exchangedCount === activeCount)
        return order_v2_enum_1.OrderStatusV2.EXCHANGED;
    // ── Rule 5.5: Mixed terminal states with ANY return/refund → RETURNED ──────
    // If all items are in terminal states (DELIVERED, RETURNED, REFUND_*, EXCHANGED, etc.)
    // and at least one is in a return/refund terminal state, then RETURNED is the highest priority
    const terminalStateCount = deliveredCount +
        terminalReturnCount +
        exchangedCount +
        returnRejectedCount +
        exchangeRejectedCount;
    if (terminalStateCount === activeCount && terminalReturnCount > 0) {
        // All items are in final states, and at least one is RETURNED or REFUND_*
        // RETURNED is the most advanced/highest priority status
        return order_v2_enum_1.OrderStatusV2.RETURNED;
    }
    // ── Rule 6: Any item in an ACTIVE transition state → IN_PROGRESS ──────────
    // This covers the forward fulfilment flow and all mid-flight return/exchange
    // steps (not yet at a terminal status).
    // NOTE: RETURN_RECEIVED_BY_SELLER is a TERMINAL state (removed from active transitions)
    const hasActiveTransition = inProgressCount > 0 ||
        scheduledPickupCount > 0 ||
        pickupScheduledCount > 0 ||
        shippedCount > 0 ||
        outForDeliveryCount > 0 ||
        returnInitiatedCount > 0 ||
        returnPickupScheduledCount > 0 ||
        returnPickedUpCount > 0 ||
        returnInTransitCount > 0 ||
        exchangeInitiatedCount > 0 ||
        exchangePickupScheduledCount > 0 ||
        exchangePickedUpCount > 0 ||
        exchangeInTransitCount > 0 ||
        exchangeReceivedBySellerCount > 0 ||
        exchangeOrderPlacedCount > 0 ||
        exchangeShippedCount > 0 ||
        exchangeDeliveredCount > 0;
    if (hasActiveTransition)
        return order_v2_enum_1.OrderStatusV2.IN_PROGRESS;
    // ── Rule 7: ALL active items NEW ─────────────────────────────────────────
    if (newCount === activeCount)
        return order_v2_enum_1.OrderStatusV2.NEW;
    // ── Rule 8: Mixed / unresolvable — caller preserves current status ────────
    return null;
}
// ─────────────────────────────────────────────────────────────────────────────
// UI Display Helpers
// ─────────────────────────────────────────────────────────────────────────────
/**
 * Determines whether to show the estimated delivery date for an item.
 * Shows for all active statuses until the item is delivered, cancelled, returned, or exchanged.
 */
function shouldShowEstimatedDelivery(status) {
    const terminalStatuses = new Set([
        order_v2_enum_1.OrderItemStatusV2.DELIVERED,
        order_v2_enum_1.OrderItemStatusV2.CANCELLED,
        order_v2_enum_1.OrderItemStatusV2.RETURNED,
        order_v2_enum_1.OrderItemStatusV2.EXCHANGED,
        order_v2_enum_1.OrderItemStatusV2.RETURN_REJECTED,
        order_v2_enum_1.OrderItemStatusV2.EXCHANGE_REJECTED,
    ]);
    return !terminalStatuses.has(status);
}
/**
 * Returns true if the status is part of the refund flow.
 * Includes refund statuses and the terminal return status that triggers refund.
 */
function isRefundFlowStatus(status) {
    const refundFlowStatuses = new Set([
        order_v2_enum_1.OrderItemStatusV2.REFUND_INITIATED,
        order_v2_enum_1.OrderItemStatusV2.REFUND_CREDITED,
        order_v2_enum_1.OrderItemStatusV2.REFUND_FAILED,
        order_v2_enum_1.OrderItemStatusV2.RETURN_RECEIVED_BY_SELLER,
        order_v2_enum_1.OrderItemStatusV2.RETURNED,
    ]);
    return refundFlowStatuses.has(status);
}
/**
 * Determines whether to show the refund/cancellation stepper UI.
 * Shows for:
 * - CANCELLED status (non-COD orders only)
 * - Any refund flow status
 */
function shouldShowRefundStepper(status, isCodOrder) {
    if (status === order_v2_enum_1.OrderItemStatusV2.CANCELLED && !isCodOrder) {
        return true;
    }
    return isRefundFlowStatus(status);
}
//# sourceMappingURL=order-status.util.js.map