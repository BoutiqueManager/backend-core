// ─────────────────────────────────────────────────────────────────────────────
// Order Management v2 Enums
// Source of truth for all v2 order-related enumerations.
// ─────────────────────────────────────────────────────────────────────────────

/** Top-level order status, computed from item statuses per PRD global rules. */
export enum OrderStatusV2 {
  NEW = "NEW",
  IN_PROGRESS = "IN_PROGRESS",
  SHIPPED = "SHIPPED",
  OUT_FOR_DELIVERY = "OUT_FOR_DELIVERY",
  DELIVERED = "DELIVERED",
  CANCELLED = "CANCELLED",
  PARTIALLY_CANCELLED = "PARTIALLY_CANCELLED",
  RETURNED = "RETURNED",
  EXCHANGED = "EXCHANGED",
}

/** Per-item status — tracks full lifecycle including return/exchange. */
export enum OrderItemStatusV2 {
  NEW = "NEW",
  IN_PROGRESS = "IN_PROGRESS",
  SCHEDULED_PICKUP = "SCHEDULED_PICKUP", // for items awaiting scheduled pickup (return/exchange)
  PICKUP_SCHEDULED = "PICKUP_SCHEDULED", // for items that have a pickup scheduled (return/exchange)
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

  // Refund Process for Each item level status
  REFUND_INITIATED = "REFUND_INITIATED",
  REFUND_CREDITED = "REFUND_CREDITED",
  REFUND_FAILED = "REFUND_FAILED",
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

// ─────────────────────────────────────────────────────────────────────────────
// Status Flow Helpers
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Returns the next possible order-level statuses that a seller can manually transition to.
 * Note: Some transitions (e.g., OUT_FOR_DELIVERY) may be triggered by logistics systems.
 */
export const getNextPossibleOrderStatuses = (
  currentStatus: OrderStatusV2,
): OrderStatusV2[] => {
  const statusFlow: Record<OrderStatusV2, OrderStatusV2[]> = {
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

/**
 * Returns the next possible item-level statuses.
 * Items have a more granular lifecycle including return/exchange sub-flows.
 */
export const getNextPossibleItemStatuses = (
  currentStatus: OrderItemStatusV2,
): OrderItemStatusV2[] => {
  const statusFlow: Record<OrderItemStatusV2, OrderItemStatusV2[]> = {
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
    [OrderItemStatusV2.SHIPPED]: [OrderItemStatusV2.OUT_FOR_DELIVERY],

    [OrderItemStatusV2.OUT_FOR_DELIVERY]: [OrderItemStatusV2.DELIVERED],

    // Delivered once - can either be returned or marked as completed
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

    // Refund flow
  };

  return statusFlow[currentStatus] || [];
};

/**
 * Checks if an order-level status is terminal (no further transitions).
 */
export const isOrderStatusFinal = (status: OrderStatusV2): boolean => {
  return (
    status === OrderStatusV2.DELIVERED ||
    status === OrderStatusV2.CANCELLED ||
    status === OrderStatusV2.RETURNED
  );
};

/**
 * Checks if an item-level status is terminal (no further transitions).
 */
export const isItemStatusFinal = (status: OrderItemStatusV2): boolean => {
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

// ─────────────────────────────────────────────────────────────────────────────
// Display Name Helpers
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Order-level status display names for UI
 */
export const ORDER_STATUS_DISPLAY_NAMES: Record<OrderStatusV2, string> = {
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
export const ORDER_ITEM_STATUS_DISPLAY_NAMES: Record<
  OrderItemStatusV2,
  string
> = {
  [OrderItemStatusV2.NEW]: "New",
  [OrderItemStatusV2.IN_PROGRESS]: "In Progress",
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
export const getOrderStatusDisplayName = (status: OrderStatusV2): string => {
  return ORDER_STATUS_DISPLAY_NAMES[status] || status;
};

/**
 * Convert OrderItemStatusV2 enum value to display name
 * @param status - Backend OrderItemStatusV2 enum value
 * @returns Display name for UI
 */
export const getOrderItemStatusDisplayName = (
  status: OrderItemStatusV2,
): string => {
  return ORDER_ITEM_STATUS_DISPLAY_NAMES[status] || status;
};

/**
 * Format array of order status enum values into display options for UI dropdowns/bottom sheets
 * @param enumValues - Array of OrderStatusV2 enum values
 * @returns Array of {key: enum, label: displayName} objects
 */
export const formatOrderStatusOptions = (
  enumValues: OrderStatusV2[],
): { key: OrderStatusV2; label: string }[] => {
  if (!Array.isArray(enumValues)) return [];
  return enumValues.map((enumValue) => ({
    key: enumValue,
    label: getOrderStatusDisplayName(enumValue),
  }));
};

/**
 * Format array of item status enum values into display options for UI dropdowns/bottom sheets
 * @param enumValues - Array of OrderItemStatusV2 enum values
 * @returns Array of {key: enum, label: displayName} objects
 */
export const formatOrderItemStatusOptions = (
  enumValues: OrderItemStatusV2[],
): { key: OrderItemStatusV2; label: string }[] => {
  if (!Array.isArray(enumValues)) return [];
  return enumValues.map((enumValue) => ({
    key: enumValue,
    label: getOrderItemStatusDisplayName(enumValue),
  }));
};
