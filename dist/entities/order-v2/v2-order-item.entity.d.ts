import { OrderItemStatusV2, ProductTypeV2, CancelledByV2 } from "../../enums/order-v2.enum";
import { V2Order } from "./v2-order.entity";
export declare class V2OrderItem {
    id: string;
    /** e.g. OI-2026-00042-1 */
    orderItemId: string;
    orderId: string;
    order: V2Order;
    /** Denormalized — avoids join when querying by customer */
    checkoutSessionId: string;
    customerId: string;
    /** Cross-server reference to boutique-server products table */
    productId: string;
    /** Stored for search; GIN index on this */
    productName: string;
    productSku: string;
    /** Cross-server ref to boutique-server inventory table */
    inventoryId: string;
    /** Cross-server ref to boutique-server product_sizes table */
    productSizeId: string;
    /** Cross-server ref to product_categories table */
    categoryId: string;
    /** Denormalized from parent order */
    boutiqueId: string;
    boutiqueName: string;
    /** Cached cover image URL from product_media at order time */
    primaryImageUrl: string;
    productType: ProductTypeV2;
    /** e.g. "M", "XL", "32", "Free Size" */
    selectedSize: string;
    /** Additional cost for this size from product_sizes.additionalPrice */
    selectedSizeAdditionalPrice: number;
    /** All customization option values selected by customer */
    customizationOptions: Record<string, any>;
    /** FK to customer_measurements (same server) */
    measurementId: string;
    /**
     * Immutable copy of measurement values at order time.
     * Never changes even if customer later updates their measurements.
     */
    measurementSnapshot: Record<string, any>;
    /** True if made_to_measure with custom measurements submitted */
    isCustomized: boolean;
    /** Marked price / MRP — shown as strikethrough in UI */
    mrp: number;
    /** mrp − offerPrice */
    discountAmount: number;
    /** Boutique's selling price per unit (after boutique discount) */
    offerPrice: number;
    /** Discount applied via campaign/bulk discount */
    campaignCode: string;
    /** Prorated share of coupon discount assigned to this item */
    couponDiscountPerItem: number;
    /** offerPrice − couponDiscountPerItem  exclusive of Any Shipping, packing or gst */
    finalPricePerItem: number;
    quantity: number;
    totalMrp: number;
    totalDiscount: number;
    totalOfferPrice: number;
    totalCouponDiscount: number;
    /** finalPricePerItem × quantity — the canonical amount for refund calculation excluding gst, shipping and packaging*/
    totalFinalPrice: number;
    /** Full packaging charge for this item (₹450/item × qty) — for seller invoice */
    fullPackagingChargeForItem: number;
    /** Packaging charge collected from customer (₹150/item × qty — 1/3 of full) */
    packagingChargeForItem: number;
    /** Full Shiprocket shipping charge for this item (prorated from boutique total) — for seller invoice */
    fullShippingChargeForItem: number;
    /** Shipping charge collected from customer for this item (1/3 of full) */
    shippingChargeForItem: number;
    /** GST (18%) charged to customer on this item (on finalPrice + packagingCustomer + shippingCustomer) */
    gstChargeForItem: number;
    advancedPercentagePaid: number;
    /**
     * Amount paid on this item by the customer at checkout.
     * Includes the product-price advance plus the item's prorated share of
     * shipping, packaging and GST (fixed charges are always collected in full).
     * For ready_to_ship / full payment this equals totalAmountPaid.
     */
    advancePaid: number;
    /**
     * Product-price balance still owed for this item after delivery.
     * totalFinalPrice − (advancePaid − fixedChargesShare).
     * 0 for full-payment and COD items.
     */
    remainingAmount: number;
    customerNote: string;
    /**
     * Total amount paid on item by customer at checkout (the advance paid now).
     * For full payment this equals grandTotalCost; for partial payment it is less.
     */
    totalAmountPaid: number;
    /**
     * Grand total cost on each item - final price per item + GST + Shipping + Packaging
     * Used for seller invoice calculations.
     * Formula: totalFinalPrice + gstChargeForItem + shippingChargeForItem + packagingChargeForItem
     */
    grandTotalCost: number;
    status: OrderItemStatusV2;
    confirmedAt: Date;
    shippedAt: Date;
    outForDeliveryAt: Date;
    deliveredAt: Date;
    /** Per-item estimated delivery date — may differ across items in the same order */
    estimatedDeliveryDate: Date;
    cancelledAt: Date;
    cancelledBy: CancelledByV2;
    /**
     * Seller-provided reason — shown to customer as "Reason by Seller: ..."
     * Required when seller cancels per PRD §2A-1.
     */
    cancellationReason: string;
    /**
     * 3 days for made_to_measure, 15 days for ready_to_ship.
     * Set when item transitions to DELIVERED.
     */
    returnWindowDays: number;
    /** deliveredAt + returnWindowDays — used for eligibility check and UI message */
    returnWindowClosesAt: Date;
    exchangeWindowDays: number;
    exchangeWindowClosesAt: Date;
    /**
     * Denormalized return status for fast order-list queries.
     * NONE = no return request placed.
     */
    returnStatus: string;
    exchangeStatus: string;
    /** FK to v2_return_order_items — set when return request is placed */
    activeReturnOrderItemId: string;
    /** FK to v2_exchange_order_items — set when exchange request is placed */
    activeExchangeOrderItemId: string;
    /**
     * PRD: shipping media should be stored only until the return/exchange window closes.
     * Set when item delivered = deliveredAt + max(returnWindowDays, exchangeWindowDays).
     */
    shippingMediaExpiresAt: Date;
    isRated: boolean;
    /** FK to customer_reviews (boutique-server table, shared DB) */
    ratingId: string;
    ratedAt: Date;
    trackingNumber: string;
    trackingCarrier: string;
    trackingUrl: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}
