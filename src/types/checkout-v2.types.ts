/**
 * V2 Checkout Types
 *
 * Shared types for checkout flow between customer-server and customer-ui.
 * These types mirror the DTOs used in the backend but are designed for
 * frontend-backend communication.
 */

import { PaymentMethodV2, ProductTypeV2 } from "../enums/order-v2.enum";

// ─────────────────────────────────────────────────────────────────────────────
// Checkout Item Types
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Represents a single item in the checkout process.
 * Mirrors V2CheckoutItemDto structure from backend.
 */
export interface V2CheckoutItem {
  /** UUID of the product */
  productId: string;

  /** Product name for display */
  productName: string;

  /** Optional product SKU */
  productSku?: string;

  /** UUID reference to boutique-server inventory table */
  inventoryId?: string;

  /** UUID reference to product_sizes table */
  productSizeId?: string;

  /** UUID reference to product_categories table */
  categoryId?: string;

  /** Primary product image URL */
  primaryImageUrl?: string;

  /** Product type: ready_to_ship or made_to_measure */
  productType: ProductTypeV2;

  /** Selected size label (e.g., "M", "XL", "32") */
  selectedSize?: string;

  /** Customization options selected by customer */
  customizationOptions?: Record<string, any>;

  /** UUID of saved measurement record (for made_to_measure) */
  measurementId?: string;

  /** Immutable snapshot of measurements at order time */
  measurementSnapshot?: Record<string, any>;

  /** Whether this item has customization */
  isCustomized?: boolean;

  /** Marked/MRP price (strikethrough in UI) */
  mrp: number;

  /** Boutique selling price per unit */
  offerPrice: number;

  /** mrp - offerPrice */
  discountAmount: number;

  /** Campaign code applied */
  campaignCode?: string;

  /** Prorated share of coupon discount for this item */
  couponDiscountPerItem?: number;

  /** Final price: offerPrice - couponDiscountPerItem */
  finalPricePerItem: number;

  /** Full packaging charge for this item (₹450/item × qty) — for seller invoice */
  fullPackagingChargeForItem?: number;

  /** Packaging charge collected from customer (₹150/item × qty) */
  packagingChargeForItem?: number;

  /** Full shipping charge prorated to this item — for seller invoice */
  fullShippingChargeForItem?: number;

  /** Shipping charge collected from customer for this item */
  shippingChargeForItem?: number;

  /** GST (18%) on this item charged to customer */
  gstChargeForItem?: number;

  /** Quantity ordered */
  quantity: number;

  /**
   * Advance amount charged for this item at checkout.
   * - Ready-to-ship + full payment: equals totalFinalPrice
   * - Made-to-measure + partial payment: prorated advance share
   * - COD: 0
   */
  advancePaid: number;

  /**
   * Balance still owed after delivery: totalFinalPrice - advancePaid.
   * 0 for ready_to_ship with full payment.
   */
  remainingAmount: number;

  /** Per-item estimated delivery date (ISO format) */
  estimatedDeliveryDate?: string;

  /**
   * Percentage of totalFinalPrice paid as advance.
   * - Ready-to-ship: 100
   * - Made-to-measure partial: 20-100 (user selected)
   * - COD: 0
   */
  advancedPercentagePaid: number;

  /** Optional customer note for this specific order item */
  customerNote?: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// Coupon Types
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Represents a coupon/campaign applied to the order.
 * Mirrors V2CouponDto structure from backend.
 */
export interface V2Coupon {
  /** Coupon/campaign code */
  couponCode: string;

  /** Optional coupon UUID */
  couponId?: string;

  /** Type of coupon (e.g., "percentage", "flat") */
  couponType?: string;

  /** Total discount amount from this coupon */
  discountAmount: number;
}

// ─────────────────────────────────────────────────────────────────────────────
// Boutique Group Types
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Represents all items from a single boutique in the checkout.
 * Mirrors V2CheckoutBoutiqueDto structure from backend.
 */
export interface V2CheckoutBoutique {
  /** UUID of the boutique */
  boutiqueId: string;

  /** Boutique name for display */
  boutiqueName: string;

  /** Optional boutique logo URL */
  boutiqueLogoUrl?: string;

  /** Full Shiprocket shipping charge for this boutique order (for seller invoice) */
  fullShippingCharges: number;

  /** Shipping charges collected from customer (1/3 of fullShippingCharges) */
  shippingCharges: number;

  /** Full packaging charge for this boutique order (₹450/item × qty — for seller invoice) */
  fullPackagingCharges: number;

  /** Packaging charges collected from customer (₹150/item × qty) */
  packagingCharges: number;

  /** GST (18%) charged to customer for this boutique order */
  gstCharges: number;

  /** Sum of (mrp × qty) for all items */
  subtotalMrp: number;

  /** Sum of (discountAmount × qty) - subtotalMrp - subtotalOfferPrice */
  totalDiscount: number;

  /** Sum of (offerPrice × qty) */
  subtotalOfferPrice: number;

  /** Total coupon discount for this boutique order */
  totalCouponDiscount: number;

  /**
   * Total amount paid by customer for this boutique:
   * subtotalOfferPrice - totalCouponDiscount + shippingCharges + packagingCharges + gstCharges
   */
  totalAmountPaid: number;

  /** Grand total cost for this boutique (same as totalAmountPaid for RTS orders) */
  grandTotalCost: number;

  /** Amount paid in advance (sum of all items' advancePaid) */
  advancePaid: number;

  /** Percentage of totalAmountPaid paid as advance: (advancePaid / grandTotalCost) * 100 */
  advancePercentage: number;

  /** Shiprocket courier company ID selected for this boutique order (for AWB assignment) */
  selectedCourierCompanyId?: number;

  /** Array of checkout items for this boutique */
  items: V2CheckoutItem[];

  /** Array of coupons applied to this boutique order */
  coupons?: V2Coupon[];
}

// ─────────────────────────────────────────────────────────────────────────────
// Main Checkout Payload
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Complete checkout payload sent to the backend.
 * Mirrors CreateCheckoutDto structure from backend.
 */
export interface CreateCheckoutPayload {
  /** Optional: Cart UUID being checked out */
  cartId?: string;

  /** Selected shipping address UUID */
  shippingAddressId: string;

  /** Billing address UUID (omit if same as shipping) */
  billingAddressId?: string;

  /** Payment method selected by customer */
  paymentMethod: PaymentMethodV2;

  /**
   * One entry per boutique.
   * Cart items must be grouped by boutiqueId before sending.
   */
  boutiques: V2CheckoutBoutique[];

  // ─── Aggregate session-level totals (client-computed snapshot) ────────────

  /** Sum of all boutiques' subtotalMrp */
  totalMrp: number;

  /** Sum of all boutiques' totalDiscount */
  totalDiscount: number;

  /** Sum of all boutiques' subtotalOfferPrice */
  totalOfferPrice: number;

  /** Sum of all boutiques' totalCouponDiscount */
  totalCouponDiscount: number;

  /** Sum of all boutiques' fullShippingCharges (for seller invoice) */
  totalFullShippingCharges: number;

  /** Sum of all boutiques' shippingCharges (customer-paid) */
  totalShippingCharges: number;

  /** Sum of all boutiques' fullPackagingCharges (for seller invoice) */
  totalFullPackagingCharges: number;

  /** Sum of all boutiques' packagingCharges (customer-paid) */
  totalPackagingCharges: number;

  /** Sum of all boutiques' gstCharges */
  totalGstCharges: number;

  /**
   * Total amount paid by customer across all boutiques:
   * totalOfferPrice - totalCouponDiscount + totalShippingCharges + totalPackagingCharges + totalGstCharges
   */
  totalAmountPaid: number;

  /**
   * Grand total cost across all boutiques (same as totalAmountPaid for RTS orders)
   * Used for seller invoice calculations.
   */
  grandTotalCost: number;
}

// ─────────────────────────────────────────────────────────────────────────────
// Checkout Response Types
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Order created in the checkout response
 */
export interface CheckoutOrderInfo {
  /** UUID of the created order */
  orderId: string;

  /** Human-readable order number (e.g., "ORD-2026-00042") */
  orderNumber: string;

  /** Boutique ID this order belongs to */
  boutiqueId: string;

  /** Boutique name */
  boutiqueName?: string;
}

/**
 * Payment information in the checkout response
 */
export interface CheckoutPaymentInfo {
  /** UUID of the payment record */
  paymentId: string;

  /** Razorpay order ID (for online payments) */
  razorpayOrderId?: string;

  /** Amount to be paid */
  amount: number;

  /** Payment method used */
  paymentMethod: PaymentMethodV2;
}

/**
 * Response from checkout API
 */
/** Razorpay order details nested in the checkout response (absent for COD) */
export interface CheckoutRazorpayInfo {
  /** Razorpay order ID — pass to RazorpayCheckout.open() as order_id */
  razorPayOrderId: string;
  /** Razorpay public key_id */
  keyId: string;
  /** Payment amount in paise (×100) */
  amountInPaise: number;
  /** Currency code, e.g. "INR" */
  currency: string;

  /** UUID of the checkout session (for retrying payment if needed) */
  checkoutSessionId: string;
}

export interface CheckoutResponse {
  /** UUID of the checkout session */
  checkoutSessionId: string;

  /** Array of orders created (one per boutique) */
  orders: CheckoutOrderInfo[];

  /** Payment information (null for COD) */
  payment: CheckoutPaymentInfo | null;

  /** Populated for non-COD orders; absent for COD */
  razorpay?: CheckoutRazorpayInfo;
}

// ─────────────────────────────────────────────────────────────────────────────
// Payment Data Types (UI State)
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Payment breakdown for partial payment
 * Used in UI to track per-item payment calculations
 */
export interface PaymentItemBreakdown {
  /** Cart item ID */
  itemId: string;

  /** Product name */
  productName: string;

  /** Product type */
  productType: ProductTypeV2;

  /** Total price for this item (finalPricePerItem × quantity) */
  totalPrice: number;

  /** Percentage of total price to pay now */
  percentageToPay: number;

  /** Amount to pay now (advance payment) */
  advancePaid: number;

  /** Amount to pay after delivery */
  remainingAmount: number;
}

/**
 * Payment data captured from CartReviewStep
 * Used to coordinate payment information between review and payment steps
 */
export interface PaymentData {
  /** Payment type: full or partial */
  type: "full" | "partial";

  /** Total amount to be paid at checkout */
  totalPayableAmount: number;

  /** Amount if paying in full */
  totalFullPaymentAmount: number;

  /** Minimum partial payment amount */
  totalPartialPaymentAmount: number;

  /**
   * For made_to_measure items in partial payment:
   * percentage of MTM item price to pay now (20-100)
   */
  madeToMeasurePercentage?: number;

  /** Per-item payment breakdown */
  breakdown?: PaymentItemBreakdown[];

  /** Shipping charges included in the payment */
  shippingCharges?: number;
}
