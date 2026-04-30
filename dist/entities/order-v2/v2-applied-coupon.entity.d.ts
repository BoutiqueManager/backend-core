import { V2Order } from "./v2-order.entity";
/**
 * Coupons applied to a specific v2_order.
 * Per PRD: coupons are NEVER applicable on return or exchange orders.
 * One row per coupon per order (multiple coupons = multiple rows).
 */
export declare class V2AppliedCoupon {
    id: string;
    orderId: string;
    order: V2Order;
    checkoutSessionId: string;
    customerId: string;
    couponCode: string;
    /**
     * Cross-server ref to boutique-server campaigns.id
     * No FK constraint — cross-server reference
     */
    couponId: string;
    couponType: string;
    /** Actual ₹ amount discounted for this order by this coupon */
    discountValue: number;
    appliedAt: Date;
    createdAt: Date;
}
