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
    totalShippingCharges: number;
    totalTax: number;
    /** The actual grand total charged to customer across all boutique orders */
    grandTotal: number;
    /** True if any order in this session has made-to-measure items */
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
    orders: V2Order[];
    createdAt: Date;
    updatedAt: Date;
}
