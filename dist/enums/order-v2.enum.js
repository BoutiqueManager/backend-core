"use strict";
// ─────────────────────────────────────────────────────────────────────────────
// Order Management v2 Enums
// Source of truth for all v2 order-related enumerations.
// ─────────────────────────────────────────────────────────────────────────────
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatOrderItemStatusOptions = exports.formatOrderStatusOptions = exports.getOrderItemStatusDisplayName = exports.getOrderStatusDisplayName = exports.ORDER_ITEM_STATUS_DISPLAY_NAMES = exports.ORDER_STATUS_DISPLAY_NAMES = exports.isItemStatusFinal = exports.isOrderStatusFinal = exports.getNextPossibleItemStatuses = exports.getNextPossibleOrderStatuses = exports.SellerCancellationReason = exports.RefundInitiatedBy = exports.OrderMediaType = exports.MediaSubtypeV2 = exports.ExchangeReasonCategory = exports.ReturnReasonCategory = exports.EventActorTypeV2 = exports.OrderEventTypeV2 = exports.CheckoutSessionStatus = exports.ExchangePricingType = exports.ReverseShipmentStatus = exports.ExchangeOrderItemStatus = exports.ExchangeOrderStatus = exports.ReturnOrderItemStatus = exports.ReturnOrderStatus = exports.CancelledByV2 = exports.RefundDestination = exports.RefundTypeV2 = exports.RefundStatusV2 = exports.PaymentMethodV2 = exports.OrderPaymentStatusV2 = exports.PaymentStatusV2 = exports.PaymentTypeV2 = exports.ProductTypeV2 = exports.OrderItemStatusV2 = exports.OrderStatusV2 = void 0;
/** Top-level order status, computed from item statuses per PRD global rules. */
var OrderStatusV2;
(function (OrderStatusV2) {
    OrderStatusV2["NEW"] = "NEW";
    OrderStatusV2["CONFIRMED"] = "CONFIRMED";
    OrderStatusV2["IN_PROGRESS"] = "IN_PROGRESS";
    OrderStatusV2["SHIPPED"] = "SHIPPED";
    OrderStatusV2["OUT_FOR_DELIVERY"] = "OUT_FOR_DELIVERY";
    OrderStatusV2["DELIVERED"] = "DELIVERED";
    OrderStatusV2["CANCELLED"] = "CANCELLED";
    OrderStatusV2["PARTIALLY_CANCELLED"] = "PARTIALLY_CANCELLED";
    OrderStatusV2["RETURNED"] = "RETURNED";
})(OrderStatusV2 || (exports.OrderStatusV2 = OrderStatusV2 = {}));
/** Per-item status — tracks full lifecycle including return/exchange. */
var OrderItemStatusV2;
(function (OrderItemStatusV2) {
    OrderItemStatusV2["NEW"] = "NEW";
    OrderItemStatusV2["CONFIRMED"] = "CONFIRMED";
    OrderItemStatusV2["IN_PROGRESS"] = "IN_PROGRESS";
    OrderItemStatusV2["LOGISTICS_APPROVAL_PENDING"] = "LOGISTICS_APPROVAL_PENDING";
    OrderItemStatusV2["SHIPPED"] = "SHIPPED";
    OrderItemStatusV2["OUT_FOR_DELIVERY"] = "OUT_FOR_DELIVERY";
    OrderItemStatusV2["DELIVERED"] = "DELIVERED";
    OrderItemStatusV2["CANCELLED"] = "CANCELLED";
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
    PaymentTypeV2["EXCHANGE_TOP_UP"] = "exchange_top_up";
    PaymentTypeV2["ADVANCE"] = "advance";
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
    PaymentMethodV2["ONLINE"] = "online";
    PaymentMethodV2["UPI"] = "upi";
    PaymentMethodV2["CARD"] = "card";
    PaymentMethodV2["WALLET"] = "wallet";
    PaymentMethodV2["COD"] = "cod";
})(PaymentMethodV2 || (exports.PaymentMethodV2 = PaymentMethodV2 = {}));
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
    OrderEventTypeV2["ITEM_SHIPPED"] = "ITEM_SHIPPED";
    OrderEventTypeV2["ITEM_OUT_FOR_DELIVERY"] = "ITEM_OUT_FOR_DELIVERY";
    OrderEventTypeV2["ITEM_DELIVERED"] = "ITEM_DELIVERED";
    OrderEventTypeV2["ITEM_CANCELLED"] = "ITEM_CANCELLED";
    // Return/Exchange flow
    OrderEventTypeV2["RETURN_INITIATED"] = "RETURN_INITIATED";
    OrderEventTypeV2["RETURN_PICKED_UP"] = "RETURN_PICKED_UP";
    OrderEventTypeV2["RETURN_RECEIVED"] = "RETURN_RECEIVED";
    OrderEventTypeV2["RETURNED"] = "RETURNED";
    OrderEventTypeV2["EXCHANGE_INITIATED"] = "EXCHANGE_INITIATED";
    OrderEventTypeV2["EXCHANGE_PICKED_UP"] = "EXCHANGE_PICKED_UP";
    OrderEventTypeV2["EXCHANGE_RECEIVED"] = "EXCHANGE_RECEIVED";
    OrderEventTypeV2["EXCHANGED"] = "EXCHANGED";
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
        [OrderStatusV2.NEW]: [OrderStatusV2.CONFIRMED, OrderStatusV2.CANCELLED],
        [OrderStatusV2.CONFIRMED]: [
            OrderStatusV2.IN_PROGRESS,
            OrderStatusV2.CANCELLED,
        ],
        [OrderStatusV2.IN_PROGRESS]: [
            OrderStatusV2.SHIPPED,
            OrderStatusV2.CANCELLED,
            OrderStatusV2.PARTIALLY_CANCELLED,
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
            OrderItemStatusV2.CONFIRMED,
            OrderItemStatusV2.CANCELLED,
        ],
        [OrderItemStatusV2.CONFIRMED]: [
            OrderItemStatusV2.IN_PROGRESS,
            OrderItemStatusV2.CANCELLED,
        ],
        [OrderItemStatusV2.IN_PROGRESS]: [
            OrderItemStatusV2.LOGISTICS_APPROVAL_PENDING, // Made-to-measure items
            OrderItemStatusV2.SHIPPED, // Ready-to-ship items
            OrderItemStatusV2.CANCELLED,
        ],
        [OrderItemStatusV2.LOGISTICS_APPROVAL_PENDING]: [
            OrderItemStatusV2.SHIPPED, // After logistics approval
            OrderItemStatusV2.CANCELLED,
        ],
        [OrderItemStatusV2.SHIPPED]: [
            OrderItemStatusV2.OUT_FOR_DELIVERY,
            OrderItemStatusV2.DELIVERED,
        ],
        [OrderItemStatusV2.OUT_FOR_DELIVERY]: [OrderItemStatusV2.DELIVERED],
        [OrderItemStatusV2.DELIVERED]: [
            OrderItemStatusV2.RETURN_INITIATED,
            OrderItemStatusV2.EXCHANGE_INITIATED,
        ],
        [OrderItemStatusV2.CANCELLED]: [],
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
            OrderItemStatusV2.RETURNED,
            OrderItemStatusV2.RETURN_REJECTED, // Seller inspects and rejects
        ],
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
    [OrderStatusV2.CONFIRMED]: "Confirmed",
    [OrderStatusV2.IN_PROGRESS]: "In Progress",
    [OrderStatusV2.SHIPPED]: "Shipped",
    [OrderStatusV2.OUT_FOR_DELIVERY]: "Out for Delivery",
    [OrderStatusV2.DELIVERED]: "Delivered",
    [OrderStatusV2.CANCELLED]: "Cancelled",
    [OrderStatusV2.PARTIALLY_CANCELLED]: "Partially Cancelled",
    [OrderStatusV2.RETURNED]: "Returned",
};
/**
 * Item-level status display names for UI
 */
exports.ORDER_ITEM_STATUS_DISPLAY_NAMES = {
    [OrderItemStatusV2.NEW]: "New",
    [OrderItemStatusV2.CONFIRMED]: "Confirmed",
    [OrderItemStatusV2.IN_PROGRESS]: "In Progress",
    [OrderItemStatusV2.LOGISTICS_APPROVAL_PENDING]: "Logistics Approval Pending",
    [OrderItemStatusV2.SHIPPED]: "Shipped",
    [OrderItemStatusV2.OUT_FOR_DELIVERY]: "Out for Delivery",
    [OrderItemStatusV2.DELIVERED]: "Delivered",
    [OrderItemStatusV2.CANCELLED]: "Cancelled",
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