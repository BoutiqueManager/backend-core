import { OrderStatusV2, OrderPaymentStatusV2, PaymentMethodV2, CancelledByV2 } from "../../enums/order-v2.enum";
import { V2CheckoutSession } from "./v2-checkout-session.entity";
import { V2OrderItem } from "./v2-order-item.entity";
import { V2AppliedCoupon } from "./v2-applied-coupon.entity";
export declare class V2Order {
    id: string;
    /** Human-readable order ID, unique across all orders. e.g. ORD-2026-00042 */
    orderId: string;
    checkoutSessionId: string;
    checkoutSession: V2CheckoutSession;
    /** FK to customer_users.id */
    customerId: string;
    boutiqueId: string;
    /** Cached at order creation time — decoupled from live boutique data */
    boutiqueName: string;
    boutiqueLogoUrl: string;
    /** Sum of (mrp × qty) for all items in this boutique order */
    subtotalMrp: number;
    /** Total discount = subtotalMrp − subtotalOfferPrice */
    totalDiscount: number;
    /** Sum of (offerPrice × qty) for all items */
    subtotalOfferPrice: number;
    /** Sum of all coupon discounts applied to this order */
    totalCouponDiscount: number;
    /** Shipping charges based on selected delivery address */
    shippingCharges: number;
    totalTax: number;
    /** Actual amount payable for this boutique order */
    grandTotal: number;
    /** True if at least one item in this order is made_to_measure */
    hasPartialPayment: boolean;
    /**
     * Advance payment percentage set by boutique in v2_boutique_order_settings.
     * Captured at order creation time so future boutique config changes don't affect existing orders.
     */
    advancePercentage: number;
    /** Amount already paid (advance or full) */
    advancePaid: number;
    /** Amount still owed after delivery (grandTotal − advancePaid) */
    remainingAmount: number;
    /** Timestamp when customer paid the remaining balance after delivery */
    remainingPaidAt: Date;
    paymentMethod: PaymentMethodV2;
    paymentStatus: OrderPaymentStatusV2;
    shippingAddress: Record<string, any>;
    /** null if same as shipping */
    billingAddress: Record<string, any>;
    trackingNumber: string;
    trackingCarrier: string;
    trackingUrl: string;
    status: OrderStatusV2;
    orderDate: Date;
    confirmedAt: Date;
    shippedAt: Date;
    outForDeliveryAt: Date;
    deliveredAt: Date;
    cancelledAt: Date;
    estimatedDeliveryDate: Date;
    actualDeliveryDate: Date;
    cancelledBy: CancelledByV2;
    /**
     * Required when seller cancels (PRD §2A-1).
     * Shown to customer as: "Reason by Seller: [cancellationReason]"
     */
    cancellationReason: string;
    /** At least one item is made_to_measure */
    hasCustomizedItems: boolean;
    hasReadyToShipItems: boolean;
    customerNote: string;
    sellerNote: string;
    isActive: boolean;
    orderItems: V2OrderItem[];
    appliedCoupons: V2AppliedCoupon[];
    createdAt: Date;
    updatedAt: Date;
}
