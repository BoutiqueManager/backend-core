"use strict";
// ─────────────────────────────────────────────────────────────────────────────
// Order Management v2 Enums
// Source of truth for all v2 order-related enumerations.
// ─────────────────────────────────────────────────────────────────────────────
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatOrderItemStatusOptions = exports.formatOrderStatusOptions = exports.getOrderItemStatusDisplayName = exports.getOrderStatusDisplayName = exports.ORDER_ITEM_STATUS_DISPLAY_NAMES = exports.ORDER_STATUS_DISPLAY_NAMES = exports.isItemStatusFinal = exports.isOrderStatusFinal = exports.getNextPossibleItemStatuses = exports.getNextPossibleOrderStatuses = exports.SellerCancellationReason = exports.RefundInitiatedBy = exports.OrderMediaType = exports.MediaSubtypeV2 = exports.ExchangeReasonCategory = exports.ReturnReasonCategory = exports.EventActorTypeV2 = exports.OrderEventTypeV2 = exports.CheckoutSessionStatus = exports.ExchangePricingType = exports.ReverseShipmentStatus = exports.ReverseShipmentCostBearer = exports.AlterationRequestStatus = exports.ExchangeOrderItemStatus = exports.ExchangeOrderStatus = exports.ReturnOrderItemStatus = exports.ReturnOrderStatus = exports.CancelledByV2 = exports.RefundDestination = exports.RefundTypeV2 = exports.RefundStatusV2 = exports.RazorpayPaymentStatus = exports.RazorpayPaymentMethod = exports.PaymentMethodV2 = exports.OrderPaymentStatusV2 = exports.PaymentStatusV2 = exports.PaymentTypeV2 = exports.ProductTypeV2 = exports.OrderItemStatusV2 = exports.OrderStatusV2 = void 0;
/** Top-level order status, computed from item statuses per PRD global rules. */
var OrderStatusV2;
(function (OrderStatusV2) {
    OrderStatusV2["NEW"] = "NEW";
    OrderStatusV2["IN_PROGRESS"] = "IN_PROGRESS";
    OrderStatusV2["SHIPPED"] = "SHIPPED";
    OrderStatusV2["OUT_FOR_DELIVERY"] = "OUT_FOR_DELIVERY";
    OrderStatusV2["DELIVERED"] = "DELIVERED";
    OrderStatusV2["CANCELLED"] = "CANCELLED";
    OrderStatusV2["PARTIALLY_CANCELLED"] = "PARTIALLY_CANCELLED";
    OrderStatusV2["RETURNED"] = "RETURNED";
    OrderStatusV2["EXCHANGED"] = "EXCHANGED";
})(OrderStatusV2 || (exports.OrderStatusV2 = OrderStatusV2 = {}));
/** Per-item status — tracks full lifecycle including return/exchange. */
var OrderItemStatusV2;
(function (OrderItemStatusV2) {
    OrderItemStatusV2["NEW"] = "NEW";
    OrderItemStatusV2["IN_PROGRESS"] = "IN_PROGRESS";
    OrderItemStatusV2["SCHEDULED_PICKUP"] = "SCHEDULED_PICKUP";
    OrderItemStatusV2["PICKUP_SCHEDULED"] = "PICKUP_SCHEDULED";
    OrderItemStatusV2["SHIPPED"] = "SHIPPED";
    OrderItemStatusV2["OUT_FOR_DELIVERY"] = "OUT_FOR_DELIVERY";
    OrderItemStatusV2["DELIVERED"] = "DELIVERED";
    OrderItemStatusV2["CANCELLED"] = "CANCELLED";
    // ── RTO flow (customer refused delivery at the door) ────────────────────
    // Courier auto-flips the SAME forward AWB to RTO status — no new
    // Shiprocket shipment/order is created for this chain.
    OrderItemStatusV2["RTO_INITIATED"] = "RTO_INITIATED";
    OrderItemStatusV2["RTO_IN_TRANSIT"] = "RTO_IN_TRANSIT";
    OrderItemStatusV2["RTO_DELIVERED"] = "RTO_DELIVERED";
    // Label'D-only state — set when seller taps "Approve — Item Received
    // Back"; not a Shiprocket-driven status. Only this action unlocks refund.
    OrderItemStatusV2["RTO_APPROVED_BY_SELLER"] = "RTO_APPROVED_BY_SELLER";
    // Terminal, permanent — §5.4: a Made-to-Measure item refused/unreachable
    // at delivery. Set instead of RETURNED so it's distinguishable from a
    // normal completed RTS return/refund. refund_blocked is set true at the
    // same step (approveRtoReceived). No refund is ever created for this item.
    OrderItemStatusV2["MTM_REFUSED_NON_REFUNDABLE"] = "MTM_REFUSED_NON_REFUNDABLE";
    // ── MTM doorstep-gating flow (balance not cleared at handover) ──────────
    // Set when a delivery attempt fails while the item's remaining MTM
    // balance is still unpaid — distinct from a genuine refusal (RTO_INITIATED),
    // which only fires once the balance is confirmed cleared. See
    // ShiprocketStatusWriterService's disambiguation logic.
    OrderItemStatusV2["NDR_HELD"] = "NDR_HELD";
    // Label'D-only — set once Razorpay confirms balance captured and
    // POST /ndr/{awb}/reattempt has been called. Not a Shiprocket-driven
    // status; mirrors RTO_APPROVED_BY_SELLER's role as the unlock gate.
    // Transitions back into OUT_FOR_DELIVERY, not a new terminal state.
    OrderItemStatusV2["NDR_RELEASED"] = "NDR_RELEASED";
    // ── Return flow ──────────────────────────────────────────────────────────
    OrderItemStatusV2["RETURN_INITIATED"] = "RETURN_INITIATED";
    OrderItemStatusV2["RETURN_PICKUP_SCHEDULED"] = "RETURN_PICKUP_SCHEDULED";
    OrderItemStatusV2["RETURN_PICKED_UP"] = "RETURN_PICKED_UP";
    OrderItemStatusV2["RETURN_IN_TRANSIT"] = "RETURN_IN_TRANSIT";
    OrderItemStatusV2["RETURN_RECEIVED_BY_SELLER"] = "RETURN_RECEIVED_BY_SELLER";
    OrderItemStatusV2["RETURNED"] = "RETURNED";
    OrderItemStatusV2["RETURN_REJECTED"] = "RETURN_REJECTED";
    // ── Exchange flow ─────────────────────────────────────────────────────────
    OrderItemStatusV2["EXCHANGE_INITIATED"] = "EXCHANGE_INITIATED";
    OrderItemStatusV2["EXCHANGE_PICKUP_SCHEDULED"] = "EXCHANGE_PICKUP_SCHEDULED";
    OrderItemStatusV2["EXCHANGE_PICKED_UP"] = "EXCHANGE_PICKED_UP";
    OrderItemStatusV2["EXCHANGE_IN_TRANSIT"] = "EXCHANGE_IN_TRANSIT";
    OrderItemStatusV2["EXCHANGE_RECEIVED_BY_SELLER"] = "EXCHANGE_RECEIVED_BY_SELLER";
    OrderItemStatusV2["EXCHANGE_ORDER_PLACED"] = "EXCHANGE_ORDER_PLACED";
    OrderItemStatusV2["EXCHANGE_SHIPPED"] = "EXCHANGE_SHIPPED";
    OrderItemStatusV2["EXCHANGE_DELIVERED"] = "EXCHANGE_DELIVERED";
    OrderItemStatusV2["EXCHANGED"] = "EXCHANGED";
    OrderItemStatusV2["EXCHANGE_REJECTED"] = "EXCHANGE_REJECTED";
    // ── MTM Alteration flow (§5.3) ───────────────────────────────────────────
    // Exactly ONE free alteration per item, no questions asked (manager
    // policy) — enforced via V2OrderItem.alterationCount, not by this status
    // chain itself. The parent ORDER stays in the "Delivered" bucket for the
    // entire chain (see order-status.util.ts's effectiveDeliveredCount) even
    // though the ITEM's own status genuinely progresses through pickup/transit.
    OrderItemStatusV2["ALTERATION_REQUESTED"] = "ALTERATION_REQUESTED";
    OrderItemStatusV2["ALTERATION_PICKED_UP"] = "ALTERATION_PICKED_UP";
    OrderItemStatusV2["ALTERATION_AT_SELLER"] = "ALTERATION_AT_SELLER";
    OrderItemStatusV2["ALTERATION_SHIPPED_BACK"] = "ALTERATION_SHIPPED_BACK";
    // Terminal AND permanent — never reverts to plain DELIVERED. The
    // alterationCount>=1 check (not this status) is what blocks a 2nd request.
    OrderItemStatusV2["ALTERATION_COMPLETED"] = "ALTERATION_COMPLETED";
    // Refund Process for Each item level status
    OrderItemStatusV2["REFUND_INITIATED"] = "REFUND_INITIATED";
    OrderItemStatusV2["REFUND_CREDITED"] = "REFUND_CREDITED";
    OrderItemStatusV2["REFUND_FAILED"] = "REFUND_FAILED";
})(OrderItemStatusV2 || (exports.OrderItemStatusV2 = OrderItemStatusV2 = {}));
/** Whether item is ready_to_ship or made_to_measure (customized). */
var ProductTypeV2;
(function (ProductTypeV2) {
    ProductTypeV2["READY_TO_SHIP"] = "ready_to_ship";
    ProductTypeV2["MADE_TO_MEASURE"] = "made_to_measure";
})(ProductTypeV2 || (exports.ProductTypeV2 = ProductTypeV2 = {}));
/** Distinguishes which payment leg a v2_payment record represents. */
var PaymentTypeV2;
(function (PaymentTypeV2) {
    PaymentTypeV2["FULL"] = "full";
    PaymentTypeV2["PARTIAL"] = "partial";
    PaymentTypeV2["REMAINING_BALANCE"] = "remaining_balance";
})(PaymentTypeV2 || (exports.PaymentTypeV2 = PaymentTypeV2 = {}));
/** Granular Razorpay-aligned payment status. */
var PaymentStatusV2;
(function (PaymentStatusV2) {
    PaymentStatusV2["PENDING"] = "pending";
    PaymentStatusV2["INITIATED"] = "initiated";
    PaymentStatusV2["PROCESSING"] = "processing";
    PaymentStatusV2["SUCCESS"] = "success";
    PaymentStatusV2["FAILED"] = "failed";
    PaymentStatusV2["CANCELLED"] = "cancelled";
})(PaymentStatusV2 || (exports.PaymentStatusV2 = PaymentStatusV2 = {}));
/** High-level payment status stored on v2_orders. */
var OrderPaymentStatusV2;
(function (OrderPaymentStatusV2) {
    OrderPaymentStatusV2["PENDING"] = "pending";
    OrderPaymentStatusV2["PARTIAL_PAID"] = "partial_paid";
    OrderPaymentStatusV2["COMPLETED"] = "completed";
    OrderPaymentStatusV2["FAILED"] = "failed";
    OrderPaymentStatusV2["REFUNDED"] = "refunded";
    OrderPaymentStatusV2["PARTIALLY_REFUNDED"] = "partially_refunded";
    OrderPaymentStatusV2["ADVANCE_PAID"] = "advance_paid";
})(OrderPaymentStatusV2 || (exports.OrderPaymentStatusV2 = OrderPaymentStatusV2 = {}));
var PaymentMethodV2;
(function (PaymentMethodV2) {
    PaymentMethodV2["COD"] = "cod";
    PaymentMethodV2["ONLINE"] = "online";
    PaymentMethodV2["CARD"] = "card";
    PaymentMethodV2["UPI"] = "upi";
    PaymentMethodV2["WALLET"] = "wallet";
})(PaymentMethodV2 || (exports.PaymentMethodV2 = PaymentMethodV2 = {}));
/**
 * Raw payment method string returned by Razorpay in the payment object.
 * Stored in v2_payments.razorpayMethod for direct querying.
 */
var RazorpayPaymentMethod;
(function (RazorpayPaymentMethod) {
    RazorpayPaymentMethod["CARD"] = "card";
    RazorpayPaymentMethod["NETBANKING"] = "netbanking";
    RazorpayPaymentMethod["WALLET"] = "wallet";
    RazorpayPaymentMethod["UPI"] = "upi";
    RazorpayPaymentMethod["EMI"] = "emi";
    RazorpayPaymentMethod["COD"] = "cod";
    RazorpayPaymentMethod["UNKNOWN"] = "unknown";
})(RazorpayPaymentMethod || (exports.RazorpayPaymentMethod = RazorpayPaymentMethod = {}));
/**
 * Raw payment status returned by Razorpay in the payment object.
 * Stored in v2_payments.razorpayStatus alongside our internal PaymentStatusV2.
 * Enables direct reconciliation without parsing razorpayResponse JSONB.
 *
 * Mapping:
 *   created     → payment order created, no attempt yet
 *   authorized  → authorized but not yet captured (auto-capture disabled)
 *   captured    → money captured → maps to our status=SUCCESS
 *   refunded    → fully refunded by Razorpay
 *   failed      → payment attempt failed → maps to our status=FAILED
 */
var RazorpayPaymentStatus;
(function (RazorpayPaymentStatus) {
    RazorpayPaymentStatus["CREATED"] = "created";
    RazorpayPaymentStatus["AUTHORIZED"] = "authorized";
    RazorpayPaymentStatus["CAPTURED"] = "captured";
    RazorpayPaymentStatus["REFUNDED"] = "refunded";
    RazorpayPaymentStatus["FAILED"] = "failed";
})(RazorpayPaymentStatus || (exports.RazorpayPaymentStatus = RazorpayPaymentStatus = {}));
/** Three-step cancellation refund tracker. Six-step return/exchange tracker. */
var RefundStatusV2;
(function (RefundStatusV2) {
    RefundStatusV2["INITIATED"] = "initiated";
    RefundStatusV2["BANK_PROCESSING"] = "bank_processing";
    RefundStatusV2["CREDITED"] = "credited";
    RefundStatusV2["FAILED"] = "failed";
})(RefundStatusV2 || (exports.RefundStatusV2 = RefundStatusV2 = {}));
var RefundTypeV2;
(function (RefundTypeV2) {
    RefundTypeV2["CANCELLATION"] = "cancellation";
    RefundTypeV2["RETURN"] = "return";
    RefundTypeV2["EXCHANGE_DOWNGRADE"] = "exchange_downgrade";
    /** Customer refused delivery at the door (RTO) — reported separately from RETURN. */
    RefundTypeV2["RTS_REFUSED"] = "rts_refused";
})(RefundTypeV2 || (exports.RefundTypeV2 = RefundTypeV2 = {}));
/** Where the customer wants the refund deposited. */
var RefundDestination;
(function (RefundDestination) {
    RefundDestination["ORIGINAL_PAYMENT_METHOD"] = "original_payment_method";
    RefundDestination["UPI"] = "upi";
    RefundDestination["BANK_ACCOUNT"] = "bank_account";
})(RefundDestination || (exports.RefundDestination = RefundDestination = {}));
var CancelledByV2;
(function (CancelledByV2) {
    CancelledByV2["CUSTOMER"] = "CUSTOMER";
    CancelledByV2["SELLER"] = "SELLER";
    CancelledByV2["SYSTEM"] = "SYSTEM";
})(CancelledByV2 || (exports.CancelledByV2 = CancelledByV2 = {}));
/** Six-step return order status per PRD §1.4. */
var ReturnOrderStatus;
(function (ReturnOrderStatus) {
    ReturnOrderStatus["INITIATED"] = "INITIATED";
    ReturnOrderStatus["PICKUP_SCHEDULED"] = "PICKUP_SCHEDULED";
    ReturnOrderStatus["PICKED_UP"] = "PICKED_UP";
    ReturnOrderStatus["IN_TRANSIT"] = "IN_TRANSIT";
    ReturnOrderStatus["RECEIVED_BY_SELLER"] = "RECEIVED_BY_SELLER";
    ReturnOrderStatus["REFUND_INITIATED"] = "REFUND_INITIATED";
    ReturnOrderStatus["COMPLETED"] = "COMPLETED";
    ReturnOrderStatus["REJECTED"] = "REJECTED";
})(ReturnOrderStatus || (exports.ReturnOrderStatus = ReturnOrderStatus = {}));
/** Per-item status within a return order. */
var ReturnOrderItemStatus;
(function (ReturnOrderItemStatus) {
    ReturnOrderItemStatus["INITIATED"] = "INITIATED";
    ReturnOrderItemStatus["PICKED_UP"] = "PICKED_UP";
    ReturnOrderItemStatus["RECEIVED"] = "RECEIVED";
    ReturnOrderItemStatus["REFUNDED"] = "REFUNDED";
    ReturnOrderItemStatus["REJECTED"] = "REJECTED";
})(ReturnOrderItemStatus || (exports.ReturnOrderItemStatus = ReturnOrderItemStatus = {}));
/** Six-step exchange order status per PRD §1.4. */
var ExchangeOrderStatus;
(function (ExchangeOrderStatus) {
    ExchangeOrderStatus["INITIATED"] = "INITIATED";
    ExchangeOrderStatus["PICKUP_SCHEDULED"] = "PICKUP_SCHEDULED";
    ExchangeOrderStatus["PICKED_UP"] = "PICKED_UP";
    ExchangeOrderStatus["IN_TRANSIT"] = "IN_TRANSIT";
    ExchangeOrderStatus["RECEIVED_BY_SELLER"] = "RECEIVED_BY_SELLER";
    ExchangeOrderStatus["EXCHANGE_ORDER_PLACED"] = "EXCHANGE_ORDER_PLACED";
    ExchangeOrderStatus["EXCHANGE_SHIPPED"] = "EXCHANGE_SHIPPED";
    ExchangeOrderStatus["EXCHANGE_DELIVERED"] = "EXCHANGE_DELIVERED";
    ExchangeOrderStatus["COMPLETED"] = "COMPLETED";
    ExchangeOrderStatus["REJECTED"] = "REJECTED";
})(ExchangeOrderStatus || (exports.ExchangeOrderStatus = ExchangeOrderStatus = {}));
var ExchangeOrderItemStatus;
(function (ExchangeOrderItemStatus) {
    ExchangeOrderItemStatus["INITIATED"] = "INITIATED";
    ExchangeOrderItemStatus["PICKED_UP"] = "PICKED_UP";
    ExchangeOrderItemStatus["RECEIVED"] = "RECEIVED";
    ExchangeOrderItemStatus["EXCHANGED"] = "EXCHANGED";
    ExchangeOrderItemStatus["REJECTED"] = "REJECTED";
})(ExchangeOrderItemStatus || (exports.ExchangeOrderItemStatus = ExchangeOrderItemStatus = {}));
/**
 * Request-level status for a V2AlterationRequest — the counterpart to
 * OrderItemStatusV2's 5 ALTERATION_* item-level statuses (§5.3).
 */
var AlterationRequestStatus;
(function (AlterationRequestStatus) {
    AlterationRequestStatus["REQUESTED"] = "REQUESTED";
    AlterationRequestStatus["PICKED_UP"] = "PICKED_UP";
    AlterationRequestStatus["AT_SELLER"] = "AT_SELLER";
    AlterationRequestStatus["SHIPPED_BACK"] = "SHIPPED_BACK";
    AlterationRequestStatus["COMPLETED"] = "COMPLETED";
})(AlterationRequestStatus || (exports.AlterationRequestStatus = AlterationRequestStatus = {}));
/**
 * Who bears the reverse-shipment cost — per Refund & Settlement PRD:
 *   - RETURN           → LABELD absorbs the reverse leg (never charged to customer)
 *   - RTS DELIVERY REFUSED → CUSTOMER pays the reverse leg (deducted from refund)
 * Reverse leg is SHIPPING ONLY — packaging is never added to the reverse calculation.
 */
var ReverseShipmentCostBearer;
(function (ReverseShipmentCostBearer) {
    ReverseShipmentCostBearer["CUSTOMER"] = "customer";
    ReverseShipmentCostBearer["LABELD"] = "labeld";
})(ReverseShipmentCostBearer || (exports.ReverseShipmentCostBearer = ReverseShipmentCostBearer = {}));
var ReverseShipmentStatus;
(function (ReverseShipmentStatus) {
    ReverseShipmentStatus["PENDING"] = "PENDING";
    ReverseShipmentStatus["SCHEDULED"] = "SCHEDULED";
    ReverseShipmentStatus["PICKED_UP"] = "PICKED_UP";
    ReverseShipmentStatus["IN_TRANSIT"] = "IN_TRANSIT";
    ReverseShipmentStatus["DELIVERED_TO_SELLER"] = "DELIVERED_TO_SELLER";
    ReverseShipmentStatus["FAILED"] = "FAILED";
})(ReverseShipmentStatus || (exports.ReverseShipmentStatus = ReverseShipmentStatus = {}));
/**
 * Whether exchange results in additional payment, refund, or no action.
 * Computed from (newItemFinalPrice + shippingCharges) vs originalItemFinalPrice.
 */
var ExchangePricingType;
(function (ExchangePricingType) {
    ExchangePricingType["ADDITIONAL_PAYMENT_REQUIRED"] = "additional_payment_required";
    ExchangePricingType["REFUND_TO_CUSTOMER"] = "refund_to_customer";
    ExchangePricingType["NO_ACTION"] = "no_action";
})(ExchangePricingType || (exports.ExchangePricingType = ExchangePricingType = {}));
var CheckoutSessionStatus;
(function (CheckoutSessionStatus) {
    CheckoutSessionStatus["ACTIVE"] = "active";
    CheckoutSessionStatus["COMPLETED"] = "completed";
    CheckoutSessionStatus["FAILED"] = "failed";
    CheckoutSessionStatus["ABANDONED"] = "abandoned";
})(CheckoutSessionStatus || (exports.CheckoutSessionStatus = CheckoutSessionStatus = {}));
/** Append-only audit event types for v2_order_item_events. */
var OrderEventTypeV2;
(function (OrderEventTypeV2) {
    // Core order lifecycle
    OrderEventTypeV2["ORDER_PLACED"] = "ORDER_PLACED";
    OrderEventTypeV2["ORDER_CONFIRMED"] = "ORDER_CONFIRMED";
    OrderEventTypeV2["PAYMENT_CONFIRMED"] = "PAYMENT_CONFIRMED";
    OrderEventTypeV2["STATUS_CHANGED"] = "STATUS_CHANGED";
    // Item lifecycle events
    OrderEventTypeV2["ITEM_CONFIRMED"] = "ITEM_CONFIRMED";
    OrderEventTypeV2["IN_PROGRESS"] = "IN_PROGRESS";
    OrderEventTypeV2["READY_TO_SHIP"] = "READY_TO_SHIP";
    OrderEventTypeV2["PICKUP_REQUESTED"] = "PICKUP_REQUESTED";
    OrderEventTypeV2["PICKUP_CONFIRMED"] = "PICKUP_CONFIRMED";
    OrderEventTypeV2["ITEM_SHIPPED"] = "ITEM_SHIPPED";
    OrderEventTypeV2["ITEM_OUT_FOR_DELIVERY"] = "ITEM_OUT_FOR_DELIVERY";
    OrderEventTypeV2["ITEM_DELIVERED"] = "ITEM_DELIVERED";
    OrderEventTypeV2["ITEM_CANCELLED"] = "ITEM_CANCELLED";
    // RTO flow (customer refused delivery at the door)
    OrderEventTypeV2["RTO_INITIATED"] = "RTO_INITIATED";
    OrderEventTypeV2["RTO_IN_TRANSIT"] = "RTO_IN_TRANSIT";
    OrderEventTypeV2["RTO_DELIVERED"] = "RTO_DELIVERED";
    OrderEventTypeV2["RTO_APPROVED_BY_SELLER"] = "RTO_APPROVED_BY_SELLER";
    OrderEventTypeV2["MTM_REFUSED_NON_REFUNDABLE"] = "MTM_REFUSED_NON_REFUNDABLE";
    // MTM doorstep-gating flow
    OrderEventTypeV2["NDR_HELD"] = "NDR_HELD";
    OrderEventTypeV2["NDR_RELEASED"] = "NDR_RELEASED";
    // Return/Exchange flow
    OrderEventTypeV2["RETURN_INITIATED"] = "RETURN_INITIATED";
    OrderEventTypeV2["RETURN_PICKED_UP"] = "RETURN_PICKED_UP";
    OrderEventTypeV2["RETURN_RECEIVED"] = "RETURN_RECEIVED";
    OrderEventTypeV2["RETURNED"] = "RETURNED";
    OrderEventTypeV2["EXCHANGE_INITIATED"] = "EXCHANGE_INITIATED";
    OrderEventTypeV2["EXCHANGE_PICKED_UP"] = "EXCHANGE_PICKED_UP";
    OrderEventTypeV2["EXCHANGE_RECEIVED"] = "EXCHANGE_RECEIVED";
    OrderEventTypeV2["EXCHANGED"] = "EXCHANGED";
    // MTM Alteration flow
    OrderEventTypeV2["ALTERATION_REQUESTED"] = "ALTERATION_REQUESTED";
    OrderEventTypeV2["ALTERATION_PICKED_UP"] = "ALTERATION_PICKED_UP";
    OrderEventTypeV2["ALTERATION_AT_SELLER"] = "ALTERATION_AT_SELLER";
    OrderEventTypeV2["ALTERATION_SHIPPED_BACK"] = "ALTERATION_SHIPPED_BACK";
    OrderEventTypeV2["ALTERATION_COMPLETED"] = "ALTERATION_COMPLETED";
    // Payment/Refund events
    OrderEventTypeV2["PAYMENT_CAPTURED"] = "PAYMENT_CAPTURED";
    OrderEventTypeV2["REFUND_INITIATED"] = "REFUND_INITIATED";
    OrderEventTypeV2["REFUND_CREDITED"] = "REFUND_CREDITED";
    // Miscellaneous
    OrderEventTypeV2["NOTE_ADDED"] = "NOTE_ADDED";
})(OrderEventTypeV2 || (exports.OrderEventTypeV2 = OrderEventTypeV2 = {}));
var EventActorTypeV2;
(function (EventActorTypeV2) {
    EventActorTypeV2["CUSTOMER"] = "customer";
    EventActorTypeV2["SELLER"] = "seller";
    EventActorTypeV2["SYSTEM"] = "system";
    EventActorTypeV2["LOGISTICS"] = "logistics";
})(EventActorTypeV2 || (exports.EventActorTypeV2 = EventActorTypeV2 = {}));
var ReturnReasonCategory;
(function (ReturnReasonCategory) {
    ReturnReasonCategory["DAMAGED"] = "damaged";
    ReturnReasonCategory["WRONG_ITEM"] = "wrong_item";
    ReturnReasonCategory["QUALITY_ISSUE"] = "quality_issue";
    ReturnReasonCategory["SIZE_ISSUE"] = "size_issue";
    ReturnReasonCategory["COLOR_MISMATCH"] = "color_mismatch";
    ReturnReasonCategory["NOT_AS_DESCRIBED"] = "not_as_described";
    ReturnReasonCategory["OTHER"] = "other";
})(ReturnReasonCategory || (exports.ReturnReasonCategory = ReturnReasonCategory = {}));
var ExchangeReasonCategory;
(function (ExchangeReasonCategory) {
    ExchangeReasonCategory["SIZE_ISSUE"] = "size_issue";
    ExchangeReasonCategory["COLOR_PREFERENCE"] = "color_preference";
    ExchangeReasonCategory["STYLE_PREFERENCE"] = "style_preference";
    ExchangeReasonCategory["QUALITY_ISSUE"] = "quality_issue";
    ExchangeReasonCategory["WRONG_ITEM"] = "wrong_item";
    ExchangeReasonCategory["OTHER"] = "other";
})(ExchangeReasonCategory || (exports.ExchangeReasonCategory = ExchangeReasonCategory = {}));
var MediaSubtypeV2;
(function (MediaSubtypeV2) {
    MediaSubtypeV2["PACKING_IMAGE"] = "packing_image";
    MediaSubtypeV2["PACKING_VIDEO"] = "packing_video";
    MediaSubtypeV2["RETURN_IMAGE"] = "return_image";
    MediaSubtypeV2["RETURN_VIDEO"] = "return_video";
    MediaSubtypeV2["EXCHANGE_IMAGE"] = "exchange_image";
    MediaSubtypeV2["EXCHANGE_VIDEO"] = "exchange_video";
})(MediaSubtypeV2 || (exports.MediaSubtypeV2 = MediaSubtypeV2 = {}));
var OrderMediaType;
(function (OrderMediaType) {
    OrderMediaType["IMAGE"] = "IMAGE";
    OrderMediaType["VIDEO"] = "VIDEO";
})(OrderMediaType || (exports.OrderMediaType = OrderMediaType = {}));
/** Who triggered a refund initiation. */
var RefundInitiatedBy;
(function (RefundInitiatedBy) {
    RefundInitiatedBy["SYSTEM"] = "system";
    RefundInitiatedBy["SCHEDULER"] = "scheduler";
    RefundInitiatedBy["SELLER"] = "seller";
})(RefundInitiatedBy || (exports.RefundInitiatedBy = RefundInitiatedBy = {}));
/** Seller-suggested cancellation reason predefined options. */
var SellerCancellationReason;
(function (SellerCancellationReason) {
    SellerCancellationReason["MATERIAL_OUT_OF_STOCK"] = "Material out of stock";
    SellerCancellationReason["UNABLE_TO_FULFIL"] = "Unable to fulfil at this time";
    SellerCancellationReason["PRICING_ERROR"] = "Pricing error";
    SellerCancellationReason["OTHER"] = "Other";
})(SellerCancellationReason || (exports.SellerCancellationReason = SellerCancellationReason = {}));
// ─────────────────────────────────────────────────────────────────────────────
// Status Flow Helpers
// ─────────────────────────────────────────────────────────────────────────────
/**
 * Returns the next possible order-level statuses that a seller can manually transition to.
 * Note: Some transitions (e.g., OUT_FOR_DELIVERY) may be triggered by logistics systems.
 */
const getNextPossibleOrderStatuses = (currentStatus) => {
    const statusFlow = {
        [OrderStatusV2.NEW]: [OrderStatusV2.IN_PROGRESS, OrderStatusV2.CANCELLED],
        [OrderStatusV2.IN_PROGRESS]: [
            OrderStatusV2.SHIPPED,
            OrderStatusV2.CANCELLED,
        ],
        [OrderStatusV2.SHIPPED]: [
            OrderStatusV2.OUT_FOR_DELIVERY, // Usually auto-set by logistics
            OrderStatusV2.DELIVERED, // Seller can mark delivered
        ],
        [OrderStatusV2.OUT_FOR_DELIVERY]: [OrderStatusV2.DELIVERED],
        [OrderStatusV2.DELIVERED]: [
            OrderStatusV2.RETURNED, // Customer initiates return after delivery
        ],
        [OrderStatusV2.CANCELLED]: [],
        [OrderStatusV2.PARTIALLY_CANCELLED]: [
            OrderStatusV2.SHIPPED, // Remaining items can still be shipped
            OrderStatusV2.CANCELLED, // All remaining items cancelled
        ],
        [OrderStatusV2.RETURNED]: [],
        [OrderStatusV2.EXCHANGED]: [],
    };
    return statusFlow[currentStatus] || [];
};
exports.getNextPossibleOrderStatuses = getNextPossibleOrderStatuses;
/**
 * Returns the next possible item-level statuses.
 * Items have a more granular lifecycle including return/exchange sub-flows.
 */
const getNextPossibleItemStatuses = (currentStatus) => {
    const statusFlow = {
        [OrderItemStatusV2.NEW]: [
            OrderItemStatusV2.IN_PROGRESS,
            OrderItemStatusV2.CANCELLED,
        ],
        [OrderItemStatusV2.IN_PROGRESS]: [
            OrderItemStatusV2.SCHEDULED_PICKUP, // Ready-to-ship items
            OrderItemStatusV2.CANCELLED,
        ],
        // Scheduled Pickup -
        [OrderItemStatusV2.SCHEDULED_PICKUP]: [OrderItemStatusV2.PICKUP_SCHEDULED],
        [OrderItemStatusV2.PICKUP_SCHEDULED]: [OrderItemStatusV2.SHIPPED],
        [OrderItemStatusV2.SHIPPED]: [
            OrderItemStatusV2.OUT_FOR_DELIVERY,
            OrderItemStatusV2.RTO_INITIATED, // Customer refused at the door
            OrderItemStatusV2.NDR_HELD, // MTM: balance not cleared at handover
        ],
        [OrderItemStatusV2.OUT_FOR_DELIVERY]: [
            OrderItemStatusV2.DELIVERED,
            OrderItemStatusV2.RTO_INITIATED, // Customer refused at the door
            OrderItemStatusV2.NDR_HELD, // MTM: balance not cleared at handover
        ],
        // Delivered once - can either be returned, exchanged, or altered (MTM only)
        [OrderItemStatusV2.DELIVERED]: [
            OrderItemStatusV2.RETURN_INITIATED,
            OrderItemStatusV2.EXCHANGE_INITIATED,
            OrderItemStatusV2.ALTERATION_REQUESTED,
        ],
        [OrderItemStatusV2.CANCELLED]: [],
        // ── RTO flow ──────────────────────────────────────────────────────────────
        [OrderItemStatusV2.RTO_INITIATED]: [OrderItemStatusV2.RTO_IN_TRANSIT],
        [OrderItemStatusV2.RTO_IN_TRANSIT]: [OrderItemStatusV2.RTO_DELIVERED],
        [OrderItemStatusV2.RTO_DELIVERED]: [
            OrderItemStatusV2.RTO_APPROVED_BY_SELLER,
        ],
        [OrderItemStatusV2.RTO_APPROVED_BY_SELLER]: [
            OrderItemStatusV2.RETURNED,
            OrderItemStatusV2.MTM_REFUSED_NON_REFUNDABLE,
        ],
        [OrderItemStatusV2.MTM_REFUSED_NON_REFUNDABLE]: [], // terminal, permanent
        // ── MTM doorstep-gating flow ────────────────────────────────────────────
        [OrderItemStatusV2.NDR_HELD]: [OrderItemStatusV2.NDR_RELEASED],
        [OrderItemStatusV2.NDR_RELEASED]: [OrderItemStatusV2.OUT_FOR_DELIVERY],
        // ── Return flow ──────────────────────────────────────────────────────────
        [OrderItemStatusV2.RETURN_INITIATED]: [
            OrderItemStatusV2.RETURN_PICKUP_SCHEDULED,
            OrderItemStatusV2.RETURN_REJECTED,
        ],
        [OrderItemStatusV2.RETURN_PICKUP_SCHEDULED]: [
            OrderItemStatusV2.RETURN_PICKED_UP,
        ],
        [OrderItemStatusV2.RETURN_PICKED_UP]: [OrderItemStatusV2.RETURN_IN_TRANSIT],
        [OrderItemStatusV2.RETURN_IN_TRANSIT]: [
            OrderItemStatusV2.RETURN_RECEIVED_BY_SELLER,
        ],
        [OrderItemStatusV2.RETURN_RECEIVED_BY_SELLER]: [
            OrderItemStatusV2.REFUND_INITIATED,
            OrderItemStatusV2.RETURN_REJECTED, // Seller inspects and rejects
        ],
        [OrderItemStatusV2.REFUND_INITIATED]: [
            OrderItemStatusV2.REFUND_CREDITED,
            OrderItemStatusV2.REFUND_FAILED,
        ],
        [OrderItemStatusV2.REFUND_CREDITED]: [OrderItemStatusV2.RETURNED],
        [OrderItemStatusV2.REFUND_FAILED]: [OrderItemStatusV2.RETURNED],
        [OrderItemStatusV2.RETURNED]: [],
        [OrderItemStatusV2.RETURN_REJECTED]: [],
        // ── Exchange flow ─────────────────────────────────────────────────────────
        [OrderItemStatusV2.EXCHANGE_INITIATED]: [
            OrderItemStatusV2.EXCHANGE_PICKUP_SCHEDULED,
            OrderItemStatusV2.EXCHANGE_REJECTED,
        ],
        [OrderItemStatusV2.EXCHANGE_PICKUP_SCHEDULED]: [
            OrderItemStatusV2.EXCHANGE_PICKED_UP,
        ],
        [OrderItemStatusV2.EXCHANGE_PICKED_UP]: [
            OrderItemStatusV2.EXCHANGE_IN_TRANSIT,
        ],
        [OrderItemStatusV2.EXCHANGE_IN_TRANSIT]: [
            OrderItemStatusV2.EXCHANGE_RECEIVED_BY_SELLER,
        ],
        [OrderItemStatusV2.EXCHANGE_RECEIVED_BY_SELLER]: [
            OrderItemStatusV2.EXCHANGE_ORDER_PLACED,
            OrderItemStatusV2.EXCHANGE_REJECTED, // Seller inspects and rejects
        ],
        [OrderItemStatusV2.EXCHANGE_ORDER_PLACED]: [
            OrderItemStatusV2.EXCHANGE_SHIPPED,
        ],
        [OrderItemStatusV2.EXCHANGE_SHIPPED]: [
            OrderItemStatusV2.EXCHANGE_DELIVERED,
        ],
        [OrderItemStatusV2.EXCHANGE_DELIVERED]: [OrderItemStatusV2.EXCHANGED],
        [OrderItemStatusV2.EXCHANGED]: [],
        [OrderItemStatusV2.EXCHANGE_REJECTED]: [],
        // ── MTM Alteration flow ──────────────────────────────────────────────────
        [OrderItemStatusV2.ALTERATION_REQUESTED]: [
            OrderItemStatusV2.ALTERATION_PICKED_UP,
        ],
        [OrderItemStatusV2.ALTERATION_PICKED_UP]: [
            OrderItemStatusV2.ALTERATION_AT_SELLER,
        ],
        [OrderItemStatusV2.ALTERATION_AT_SELLER]: [
            OrderItemStatusV2.ALTERATION_SHIPPED_BACK,
        ],
        [OrderItemStatusV2.ALTERATION_SHIPPED_BACK]: [
            OrderItemStatusV2.ALTERATION_COMPLETED,
        ],
        [OrderItemStatusV2.ALTERATION_COMPLETED]: [], // terminal, permanent
        // Refund flow
    };
    return statusFlow[currentStatus] || [];
};
exports.getNextPossibleItemStatuses = getNextPossibleItemStatuses;
/**
 * Checks if an order-level status is terminal (no further transitions).
 */
const isOrderStatusFinal = (status) => {
    return (status === OrderStatusV2.DELIVERED ||
        status === OrderStatusV2.CANCELLED ||
        status === OrderStatusV2.RETURNED);
};
exports.isOrderStatusFinal = isOrderStatusFinal;
/**
 * Checks if an item-level status is terminal (no further transitions).
 */
const isItemStatusFinal = (status) => {
    const finalStatuses = [
        OrderItemStatusV2.DELIVERED,
        OrderItemStatusV2.CANCELLED,
        OrderItemStatusV2.RETURNED,
        OrderItemStatusV2.EXCHANGED,
        OrderItemStatusV2.RETURN_REJECTED,
        OrderItemStatusV2.EXCHANGE_REJECTED,
        OrderItemStatusV2.ALTERATION_COMPLETED,
        OrderItemStatusV2.MTM_REFUSED_NON_REFUNDABLE,
    ];
    return finalStatuses.includes(status);
};
exports.isItemStatusFinal = isItemStatusFinal;
// ─────────────────────────────────────────────────────────────────────────────
// Display Name Helpers
// ─────────────────────────────────────────────────────────────────────────────
/**
 * Order-level status display names for UI
 */
exports.ORDER_STATUS_DISPLAY_NAMES = {
    [OrderStatusV2.NEW]: "New",
    [OrderStatusV2.IN_PROGRESS]: "In Progress",
    [OrderStatusV2.SHIPPED]: "Shipped",
    [OrderStatusV2.OUT_FOR_DELIVERY]: "Out for Delivery",
    [OrderStatusV2.DELIVERED]: "Delivered",
    [OrderStatusV2.CANCELLED]: "Cancelled",
    [OrderStatusV2.PARTIALLY_CANCELLED]: "Partially Cancelled",
    [OrderStatusV2.RETURNED]: "Returned",
    [OrderStatusV2.EXCHANGED]: "Exchanged",
};
/**
 * Item-level status display names for UI
 */
exports.ORDER_ITEM_STATUS_DISPLAY_NAMES = {
    [OrderItemStatusV2.NEW]: "New",
    [OrderItemStatusV2.IN_PROGRESS]: "In Progress",
    [OrderItemStatusV2.SHIPPED]: "Shipped",
    [OrderItemStatusV2.OUT_FOR_DELIVERY]: "Out for Delivery",
    [OrderItemStatusV2.DELIVERED]: "Delivered",
    [OrderItemStatusV2.CANCELLED]: "Cancelled",
    // RTO flow
    [OrderItemStatusV2.RTO_INITIATED]: "RTO Initiated",
    [OrderItemStatusV2.RTO_IN_TRANSIT]: "RTO In Transit",
    [OrderItemStatusV2.RTO_DELIVERED]: "RTO Delivered",
    [OrderItemStatusV2.RTO_APPROVED_BY_SELLER]: "Return Approved by Seller",
    [OrderItemStatusV2.MTM_REFUSED_NON_REFUNDABLE]: "Non-Refundable — Delivery Refused",
    // MTM doorstep-gating flow
    [OrderItemStatusV2.NDR_HELD]: "Awaiting Balance Payment",
    [OrderItemStatusV2.NDR_RELEASED]: "Balance Received — Redelivering",
    // Return flow
    [OrderItemStatusV2.RETURN_INITIATED]: "Return Initiated",
    [OrderItemStatusV2.RETURN_PICKUP_SCHEDULED]: "Return Pickup Scheduled",
    [OrderItemStatusV2.RETURN_PICKED_UP]: "Return Picked Up",
    [OrderItemStatusV2.RETURN_IN_TRANSIT]: "Return in Transit",
    [OrderItemStatusV2.RETURN_RECEIVED_BY_SELLER]: "Return Received",
    [OrderItemStatusV2.RETURNED]: "Returned",
    [OrderItemStatusV2.RETURN_REJECTED]: "Return Rejected",
    // Exchange flow
    [OrderItemStatusV2.EXCHANGE_INITIATED]: "Exchange Initiated",
    [OrderItemStatusV2.EXCHANGE_PICKUP_SCHEDULED]: "Exchange Pickup Scheduled",
    [OrderItemStatusV2.EXCHANGE_PICKED_UP]: "Exchange Picked Up",
    [OrderItemStatusV2.EXCHANGE_IN_TRANSIT]: "Exchange in Transit",
    [OrderItemStatusV2.EXCHANGE_RECEIVED_BY_SELLER]: "Exchange Received",
    [OrderItemStatusV2.EXCHANGE_ORDER_PLACED]: "Exchange Order Placed",
    [OrderItemStatusV2.EXCHANGE_SHIPPED]: "Exchange Shipped",
    [OrderItemStatusV2.EXCHANGE_DELIVERED]: "Exchange Delivered",
    [OrderItemStatusV2.EXCHANGED]: "Exchanged",
    [OrderItemStatusV2.EXCHANGE_REJECTED]: "Exchange Rejected",
    // MTM Alteration flow
    [OrderItemStatusV2.ALTERATION_REQUESTED]: "Alteration Requested",
    [OrderItemStatusV2.ALTERATION_PICKED_UP]: "Picked Up for Alteration",
    [OrderItemStatusV2.ALTERATION_AT_SELLER]: "At Seller — Alteration in Progress",
    [OrderItemStatusV2.ALTERATION_SHIPPED_BACK]: "On Its Way Back to You",
    [OrderItemStatusV2.ALTERATION_COMPLETED]: "Alteration Completed",
    [OrderItemStatusV2.SCHEDULED_PICKUP]: "Scheduled Pickup for logistics",
    [OrderItemStatusV2.PICKUP_SCHEDULED]: "Pickup has been Scheduled",
    [OrderItemStatusV2.REFUND_INITIATED]: "Refund Initiated",
    [OrderItemStatusV2.REFUND_CREDITED]: "Refund Credited",
    [OrderItemStatusV2.REFUND_FAILED]: "Refund Failed",
};
/**
 * Convert OrderStatusV2 enum value to display name
 * @param status - Backend OrderStatusV2 enum value
 * @returns Display name for UI
 */
const getOrderStatusDisplayName = (status) => {
    return exports.ORDER_STATUS_DISPLAY_NAMES[status] || status;
};
exports.getOrderStatusDisplayName = getOrderStatusDisplayName;
/**
 * Convert OrderItemStatusV2 enum value to display name
 * @param status - Backend OrderItemStatusV2 enum value
 * @returns Display name for UI
 */
const getOrderItemStatusDisplayName = (status) => {
    return exports.ORDER_ITEM_STATUS_DISPLAY_NAMES[status] || status;
};
exports.getOrderItemStatusDisplayName = getOrderItemStatusDisplayName;
/**
 * Format array of order status enum values into display options for UI dropdowns/bottom sheets
 * @param enumValues - Array of OrderStatusV2 enum values
 * @returns Array of {key: enum, label: displayName} objects
 */
const formatOrderStatusOptions = (enumValues) => {
    if (!Array.isArray(enumValues))
        return [];
    return enumValues.map((enumValue) => ({
        key: enumValue,
        label: (0, exports.getOrderStatusDisplayName)(enumValue),
    }));
};
exports.formatOrderStatusOptions = formatOrderStatusOptions;
/**
 * Format array of item status enum values into display options for UI dropdowns/bottom sheets
 * @param enumValues - Array of OrderItemStatusV2 enum values
 * @returns Array of {key: enum, label: displayName} objects
 */
const formatOrderItemStatusOptions = (enumValues) => {
    if (!Array.isArray(enumValues))
        return [];
    return enumValues.map((enumValue) => ({
        key: enumValue,
        label: (0, exports.getOrderItemStatusDisplayName)(enumValue),
    }));
};
exports.formatOrderItemStatusOptions = formatOrderItemStatusOptions;
//# sourceMappingURL=order-v2.enum.js.map