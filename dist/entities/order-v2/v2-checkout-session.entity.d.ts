import { CheckoutSessionStatus, PaymentMethodV2, PaymentStatusV2 } from "../../enums/order-v2.enum";
import { V2Order } from "./v2-order.entity";
export declare class V2CheckoutSession {
    id: string;
    /** Human-readable ID shown to customers. e.g. CHK-2026-00001 */
    checkoutSessionId: string;
    /** Ref to customer_users.id (same server) */
    customerId: string;
    /** Snapshot of cart ID at time of checkout (informational) */
    cartId: string;
    /** Sum of all items' MRP × qty across all boutique orders */
    totalMrp: number;
    totalDiscount: number;
    totalOfferPrice: number;
    totalCouponDiscount: number;
    /** Shipping charges collected from customer (1/3 of totalFullShippingCharges) */
    totalShippingCharges: number;
    /** Full Shiprocket shipping charges across all orders (for seller invoice) */
    totalFullShippingCharges: number;
    /** Packaging charges collected from customer (₹150/item × totalQty) */
    totalPackagingCharges: number;
    /** Full packaging charges across all orders (₹450/item × totalQty — for seller invoice) */
    totalFullPackagingCharges: number;
    /** Total GST (18%) charged to customer across all orders */
    totalGstCharges: number;
    /**
     * Total amount paid by customer across all boutique orders:
     * totalOfferPrice - totalCouponDiscount + totalShippingCharges + totalPackagingCharges + totalGstCharges
     */
    totalAmountPaid: number;
    /**
     * Grand total cost across all boutique orders (same as totalAmountPaid for RTS orders)
     * Used for seller invoice calculations.
     * Formula: totalOfferPrice - totalCouponDiscount + totalShippingCharges + totalPackagingCharges + totalGstCharges
     */
    grandTotalCost: number;
    /** True if any order in this session has made_to_measure items */
    hasPartialPayment: boolean;
    /** Total advance paid across all boutique orders (sum of v2_orders.advancePaid) */
    advancePaid: number;
    /** Total remaining balance to be collected after delivery */
    remainingAmount: number;
    paymentMethod: PaymentMethodV2;
    paymentStatus: PaymentStatusV2;
    /** Razorpay order ID created for this checkout session */
    razorpayOrderId: string;
    /** FK to customer_addresses — stored for reference */
    shippingAddressId: string;
    /** null means same as shipping */
    billingAddressId: string;
    /** Immutable address snapshot — never changes after order placed */
    shippingAddress: Record<string, any>;
    /** null if same as shipping */
    billingAddress: Record<string, any>;
    status: CheckoutSessionStatus;
    completedAt: Date;
    /** Session expires 30 min after creation — checked by abandoned checkout CRON */
    sessionExpiresAt: Date;
    /** Set when CRON marks session as abandoned */
    abandonedAt: Date;
    /** Number of payment retry attempts for this session */
    retryCount: number;
    /** Idempotency key to prevent duplicate Razorpay order creation */
    idempotencyKey: string;
    selectedCourierCompanyId: number;
    orders: V2Order[];
    createdAt: Date;
    updatedAt: Date;
}
