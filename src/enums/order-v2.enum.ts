// ─────────────────────────────────────────────────────────────────────────────
// Order Management v2 Enums
// Source of truth for all v2 order-related enumerations.
// ─────────────────────────────────────────────────────────────────────────────

/** Top-level order status, computed from item statuses per PRD global rules. */
export enum OrderStatusV2 {
  NEW = "NEW",
  CONFIRMED = "CONFIRMED",
  IN_PROGRESS = "IN_PROGRESS",
  SHIPPED = "SHIPPED",
  OUT_FOR_DELIVERY = "OUT_FOR_DELIVERY",
  DELIVERED = "DELIVERED",
  CANCELLED = "CANCELLED",
  PARTIALLY_CANCELLED = "PARTIALLY_CANCELLED",
}

/** Per-item status — tracks full lifecycle including return/exchange. */
export enum OrderItemStatusV2 {
  NEW = "NEW",
  CONFIRMED = "CONFIRMED",
  IN_PROGRESS = "IN_PROGRESS",

  LOGISTICS_APPROVAL_PENDING = "LOGISTICS_APPROVAL_PENDING", // for items awaiting logistics approval before shipping

  SHIPPED = "SHIPPED",
  OUT_FOR_DELIVERY = "OUT_FOR_DELIVERY",
  DELIVERED = "DELIVERED",
  CANCELLED = "CANCELLED",
  // ── Return flow ──────────────────────────────────────────────────────────
  RETURN_INITIATED = "RETURN_INITIATED",
  RETURN_PICKUP_SCHEDULED = "RETURN_PICKUP_SCHEDULED",
  RETURN_PICKED_UP = "RETURN_PICKED_UP",
  RETURN_IN_TRANSIT = "RETURN_IN_TRANSIT",
  RETURN_RECEIVED_BY_SELLER = "RETURN_RECEIVED_BY_SELLER",
  RETURNED = "RETURNED",
  RETURN_REJECTED = "RETURN_REJECTED",
  // ── Exchange flow ─────────────────────────────────────────────────────────
  EXCHANGE_INITIATED = "EXCHANGE_INITIATED",
  EXCHANGE_PICKUP_SCHEDULED = "EXCHANGE_PICKUP_SCHEDULED",
  EXCHANGE_PICKED_UP = "EXCHANGE_PICKED_UP",
  EXCHANGE_IN_TRANSIT = "EXCHANGE_IN_TRANSIT",
  EXCHANGE_RECEIVED_BY_SELLER = "EXCHANGE_RECEIVED_BY_SELLER",
  EXCHANGE_ORDER_PLACED = "EXCHANGE_ORDER_PLACED",
  EXCHANGE_SHIPPED = "EXCHANGE_SHIPPED",
  EXCHANGE_DELIVERED = "EXCHANGE_DELIVERED",
  EXCHANGED = "EXCHANGED",
  EXCHANGE_REJECTED = "EXCHANGE_REJECTED",
}

/** Whether item is ready_to_ship or made_to_measure (customized). */
export enum ProductTypeV2 {
  READY_TO_SHIP = "ready_to_ship",
  MADE_TO_MEASURE = "made_to_measure",
}

/** Distinguishes which payment leg a v2_payment record represents. */
export enum PaymentTypeV2 {
  FULL = "full",
  PARTIAL = "partial",
  REMAINING_BALANCE = "remaining_balance",
  EXCHANGE_TOP_UP = "exchange_top_up",
  ADVANCE = "advance",
}

/** Granular Razorpay-aligned payment status. */
export enum PaymentStatusV2 {
  PENDING = "pending",
  INITIATED = "initiated",
  PROCESSING = "processing",
  SUCCESS = "success",
  FAILED = "failed",
  CANCELLED = "cancelled",
}

/** High-level payment status stored on v2_orders. */
export enum OrderPaymentStatusV2 {
  PENDING = "pending",
  PARTIAL_PAID = "partial_paid",
  COMPLETED = "completed",
  FAILED = "failed",
  REFUNDED = "refunded",
  PARTIALLY_REFUNDED = "partially_refunded",
  ADVANCE_PAID = "advance_paid",
}

export enum PaymentMethodV2 {
  ONLINE = "online",
  UPI = "upi",
  CARD = "card",
  WALLET = "wallet",
  COD = "cod",
}

/** Three-step cancellation refund tracker. Six-step return/exchange tracker. */
export enum RefundStatusV2 {
  INITIATED = "initiated",
  BANK_PROCESSING = "bank_processing",
  CREDITED = "credited",
  FAILED = "failed",
}

export enum RefundTypeV2 {
  CANCELLATION = "cancellation",
  RETURN = "return",
  EXCHANGE_DOWNGRADE = "exchange_downgrade",
}

/** Where the customer wants the refund deposited. */
export enum RefundDestination {
  ORIGINAL_PAYMENT_METHOD = "original_payment_method",
  UPI = "upi",
  BANK_ACCOUNT = "bank_account",
}

export enum CancelledByV2 {
  CUSTOMER = "CUSTOMER",
  SELLER = "SELLER",
  SYSTEM = "SYSTEM",
}

/** Six-step return order status per PRD §1.4. */
export enum ReturnOrderStatus {
  INITIATED = "INITIATED",
  PICKUP_SCHEDULED = "PICKUP_SCHEDULED",
  PICKED_UP = "PICKED_UP",
  IN_TRANSIT = "IN_TRANSIT",
  RECEIVED_BY_SELLER = "RECEIVED_BY_SELLER",
  REFUND_INITIATED = "REFUND_INITIATED",
  COMPLETED = "COMPLETED",
  REJECTED = "REJECTED",
}

/** Per-item status within a return order. */
export enum ReturnOrderItemStatus {
  INITIATED = "INITIATED",
  PICKED_UP = "PICKED_UP",
  RECEIVED = "RECEIVED",
  REFUNDED = "REFUNDED",
  REJECTED = "REJECTED",
}

/** Six-step exchange order status per PRD §1.4. */
export enum ExchangeOrderStatus {
  INITIATED = "INITIATED",
  PICKUP_SCHEDULED = "PICKUP_SCHEDULED",
  PICKED_UP = "PICKED_UP",
  IN_TRANSIT = "IN_TRANSIT",
  RECEIVED_BY_SELLER = "RECEIVED_BY_SELLER",
  EXCHANGE_ORDER_PLACED = "EXCHANGE_ORDER_PLACED",
  EXCHANGE_SHIPPED = "EXCHANGE_SHIPPED",
  EXCHANGE_DELIVERED = "EXCHANGE_DELIVERED",
  COMPLETED = "COMPLETED",
  REJECTED = "REJECTED",
}

export enum ExchangeOrderItemStatus {
  INITIATED = "INITIATED",
  PICKED_UP = "PICKED_UP",
  RECEIVED = "RECEIVED",
  EXCHANGED = "EXCHANGED",
  REJECTED = "REJECTED",
}

export enum ReverseShipmentStatus {
  PENDING = "PENDING",
  SCHEDULED = "SCHEDULED",
  PICKED_UP = "PICKED_UP",
  IN_TRANSIT = "IN_TRANSIT",
  DELIVERED_TO_SELLER = "DELIVERED_TO_SELLER",
  FAILED = "FAILED",
}

/**
 * Whether exchange results in additional payment, refund, or no action.
 * Computed from (newItemFinalPrice + shippingCharges) vs originalItemFinalPrice.
 */
export enum ExchangePricingType {
  ADDITIONAL_PAYMENT_REQUIRED = "additional_payment_required",
  REFUND_TO_CUSTOMER = "refund_to_customer",
  NO_ACTION = "no_action",
}

export enum CheckoutSessionStatus {
  ACTIVE = "active",
  COMPLETED = "completed",
  FAILED = "failed",
  ABANDONED = "abandoned",
}

/** Append-only audit event types for v2_order_item_events. */
export enum OrderEventTypeV2 {
  // Core order lifecycle
  ORDER_PLACED = "ORDER_PLACED",
  ORDER_CONFIRMED = "ORDER_CONFIRMED",
  PAYMENT_CONFIRMED = "PAYMENT_CONFIRMED",
  STATUS_CHANGED = "STATUS_CHANGED",

  // Item lifecycle events
  ITEM_CONFIRMED = "ITEM_CONFIRMED",
  IN_PROGRESS = "IN_PROGRESS",
  READY_TO_SHIP = "READY_TO_SHIP",
  ITEM_SHIPPED = "ITEM_SHIPPED",
  ITEM_OUT_FOR_DELIVERY = "ITEM_OUT_FOR_DELIVERY",
  ITEM_DELIVERED = "ITEM_DELIVERED",
  ITEM_CANCELLED = "ITEM_CANCELLED",

  // Return/Exchange flow
  RETURN_INITIATED = "RETURN_INITIATED",
  RETURN_PICKED_UP = "RETURN_PICKED_UP",
  RETURN_RECEIVED = "RETURN_RECEIVED",
  RETURNED = "RETURNED",
  EXCHANGE_INITIATED = "EXCHANGE_INITIATED",
  EXCHANGE_PICKED_UP = "EXCHANGE_PICKED_UP",
  EXCHANGE_RECEIVED = "EXCHANGE_RECEIVED",
  EXCHANGED = "EXCHANGED",

  // Payment/Refund events
  PAYMENT_CAPTURED = "PAYMENT_CAPTURED",
  REFUND_INITIATED = "REFUND_INITIATED",
  REFUND_CREDITED = "REFUND_CREDITED",

  // Miscellaneous
  NOTE_ADDED = "NOTE_ADDED",
}

export enum EventActorTypeV2 {
  CUSTOMER = "customer",
  SELLER = "seller",
  SYSTEM = "system",
  LOGISTICS = "logistics",
}

export enum ReturnReasonCategory {
  DAMAGED = "damaged",
  WRONG_ITEM = "wrong_item",
  QUALITY_ISSUE = "quality_issue",
  SIZE_ISSUE = "size_issue",
  COLOR_MISMATCH = "color_mismatch",
  NOT_AS_DESCRIBED = "not_as_described",
  OTHER = "other",
}

export enum ExchangeReasonCategory {
  SIZE_ISSUE = "size_issue",
  COLOR_PREFERENCE = "color_preference",
  STYLE_PREFERENCE = "style_preference",
  QUALITY_ISSUE = "quality_issue",
  WRONG_ITEM = "wrong_item",
  OTHER = "other",
}

export enum MediaSubtypeV2 {
  PACKING_IMAGE = "packing_image",
  PACKING_VIDEO = "packing_video",
  RETURN_IMAGE = "return_image",
  RETURN_VIDEO = "return_video",
  EXCHANGE_IMAGE = "exchange_image",
  EXCHANGE_VIDEO = "exchange_video",
}

export enum OrderMediaType {
  IMAGE = "IMAGE",
  VIDEO = "VIDEO",
}

/** Who triggered a refund initiation. */
export enum RefundInitiatedBy {
  SYSTEM = "system",
  SELLER = "seller",
}

/** Seller-suggested cancellation reason predefined options. */
export enum SellerCancellationReason {
  MATERIAL_OUT_OF_STOCK = "Material out of stock",
  UNABLE_TO_FULFIL = "Unable to fulfil at this time",
  PRICING_ERROR = "Pricing error",
  OTHER = "Other",
}
