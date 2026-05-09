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
 *  4. ALL items RETURNED                          → RETURNED
 *  5. ALL items EXCHANGED                         → EXCHANGED
 *  6. Any item in an active transition state
 *     (IN_PROGRESS / SCHEDULED_PICKUP / PICKUP_SCHEDULED /
 *      OUT_FOR_DELIVERY / SHIPPED /
 *      RETURN_* except RETURNED/RETURN_REJECTED /
 *      EXCHANGE_* except EXCHANGED/EXCHANGE_REJECTED)  → IN_PROGRESS
 *  7. ALL items NEW                               → NEW
 *  8. Mixed / unresolvable                        → null (caller keeps current)
 */
export function computeOrderStatusFromItemStatuses(
  itemStatuses: string[],
): OrderStatusV2 | null {
  if (!itemStatuses || itemStatuses.length === 0) return null;

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
      case OrderItemStatusV2.NEW:
        newCount++;
        break;
      case OrderItemStatusV2.IN_PROGRESS:
        inProgressCount++;
        break;
      case OrderItemStatusV2.SCHEDULED_PICKUP:
        scheduledPickupCount++;
        break;
      case OrderItemStatusV2.PICKUP_SCHEDULED:
        pickupScheduledCount++;
        break;
      case OrderItemStatusV2.SHIPPED:
        shippedCount++;
        break;
      case OrderItemStatusV2.OUT_FOR_DELIVERY:
        outForDeliveryCount++;
        break;
      case OrderItemStatusV2.DELIVERED:
        deliveredCount++;
        break;
      case OrderItemStatusV2.CANCELLED:
        cancelledCount++;
        break;
      // ── Return lifecycle ──────────────────────────────────────────────────
      case OrderItemStatusV2.RETURN_INITIATED:
        returnInitiatedCount++;
        break;
      case OrderItemStatusV2.RETURN_PICKUP_SCHEDULED:
        returnPickupScheduledCount++;
        break;
      case OrderItemStatusV2.RETURN_PICKED_UP:
        returnPickedUpCount++;
        break;
      case OrderItemStatusV2.RETURN_IN_TRANSIT:
        returnInTransitCount++;
        break;
      case OrderItemStatusV2.RETURN_RECEIVED_BY_SELLER:
        returnReceivedBySellerCount++;
        break;
      case OrderItemStatusV2.RETURNED:
        returnedCount++;
        break;
      case OrderItemStatusV2.RETURN_REJECTED:
        returnRejectedCount++;
        break;
      // ── Exchange lifecycle ────────────────────────────────────────────────
      case OrderItemStatusV2.EXCHANGE_INITIATED:
        exchangeInitiatedCount++;
        break;
      case OrderItemStatusV2.EXCHANGE_PICKUP_SCHEDULED:
        exchangePickupScheduledCount++;
        break;
      case OrderItemStatusV2.EXCHANGE_PICKED_UP:
        exchangePickedUpCount++;
        break;
      case OrderItemStatusV2.EXCHANGE_IN_TRANSIT:
        exchangeInTransitCount++;
        break;
      case OrderItemStatusV2.EXCHANGE_RECEIVED_BY_SELLER:
        exchangeReceivedBySellerCount++;
        break;
      case OrderItemStatusV2.EXCHANGE_ORDER_PLACED:
        exchangeOrderPlacedCount++;
        break;
      case OrderItemStatusV2.EXCHANGE_SHIPPED:
        exchangeShippedCount++;
        break;
      case OrderItemStatusV2.EXCHANGE_DELIVERED:
        exchangeDeliveredCount++;
        break;
      case OrderItemStatusV2.EXCHANGED:
        exchangedCount++;
        break;
      case OrderItemStatusV2.EXCHANGE_REJECTED:
        exchangeRejectedCount++;
        break;
      // ── Refund statuses (item-level only) ────────────────────────────────
      case OrderItemStatusV2.REFUND_INITIATED:
      case OrderItemStatusV2.REFUND_CREDITED:
      case OrderItemStatusV2.REFUND_FAILED:
        refundCount++;
        break;
      default:
        // Unknown status — treat as NEW to avoid getting stuck
        newCount++;
        break;
    }
  }

  // ── Rule 1: ALL cancelled → CANCELLED ────────────────────────────────────
  if (cancelledCount === total) return OrderStatusV2.CANCELLED;

  // ── Derive "active" (non-cancelled) items ─────────────────────────────────
  const activeCount = total - cancelledCount;

  // ── Rule 2 & 3: ALL active items DELIVERED ────────────────────────────────
  if (deliveredCount === activeCount) {
    return cancelledCount > 0
      ? OrderStatusV2.PARTIALLY_CANCELLED
      : OrderStatusV2.DELIVERED;
  }

  // ── Rule 4: ALL active items RETURNED or REFUNDED (terminal return) ────────
  // Refund statuses (REFUND_INITIATED/CREDITED/FAILED) are also terminal return
  // states, so count them alongside RETURNED.
  if (
    returnedCount + refundCount === activeCount &&
    returnedCount + refundCount > 0
  ) {
    return OrderStatusV2.RETURNED;
  }

  // ── Rule 5: ALL active items EXCHANGED (terminal exchange) ────────────────
  if (exchangedCount === activeCount) return OrderStatusV2.EXCHANGED;

  // ── Rule 6: Any item in an ACTIVE transition state → IN_PROGRESS ──────────
  // This covers the forward fulfilment flow and all mid-flight return/exchange
  // steps (not yet at a terminal status).
  const hasActiveTransition =
    inProgressCount > 0 ||
    scheduledPickupCount > 0 ||
    pickupScheduledCount > 0 ||
    shippedCount > 0 ||
    outForDeliveryCount > 0 ||
    returnInitiatedCount > 0 ||
    returnPickupScheduledCount > 0 ||
    returnPickedUpCount > 0 ||
    returnInTransitCount > 0 ||
    returnReceivedBySellerCount > 0 ||
    exchangeInitiatedCount > 0 ||
    exchangePickupScheduledCount > 0 ||
    exchangePickedUpCount > 0 ||
    exchangeInTransitCount > 0 ||
    exchangeReceivedBySellerCount > 0 ||
    exchangeOrderPlacedCount > 0 ||
    exchangeShippedCount > 0 ||
    exchangeDeliveredCount > 0;

  if (hasActiveTransition) return OrderStatusV2.IN_PROGRESS;

  // ── Rule 7: ALL active items NEW ─────────────────────────────────────────
  if (newCount === activeCount) return OrderStatusV2.NEW;

  // ── Rule 8: Mixed / unresolvable — caller preserves current status ────────
  return null;
}
