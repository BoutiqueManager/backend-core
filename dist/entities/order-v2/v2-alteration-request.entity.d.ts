import { AlterationRequestStatus } from "../../enums/order-v2.enum";
/**
 * One alteration request per journey through the §5.3 MTM alteration flow:
 * customer requests → item picked up from customer → delivered to seller →
 * seller reships the altered item → customer receives it back.
 *
 * Unlike V2ReturnOrder/V2ExchangeOrder, this is deliberately simple — no
 * pricing/price-difference fields, since alterations are free (manager
 * policy: exactly 1 free alteration, no questions asked) and don't change
 * the item itself. Mirrors V2ExchangeOrder's reverse+forward shipment field
 * shape, since alteration is the only other flow needing both legs.
 *
 * V2OrderItem.trackingNumber/trackingCarrier/trackingUrl are NOT touched by
 * this flow — they keep holding the original forward-delivery AWB. Both
 * alteration legs' AWBs live here instead.
 */
export declare class V2AlterationRequest {
    id: string;
    /** e.g. ALT-2026-00001 */
    alterationRequestId: string;
    orderId: string;
    orderItemId: string;
    customerId: string;
    boutiqueId: string;
    boutiqueName: string;
    /**
     * Free-text note from the customer, optional — "no questions asked" per
     * manager policy, not a mandatory reason-category field.
     */
    customerNote: string;
    reverseTrackingNumber: string;
    reverseTrackingCarrier: string;
    reverseTrackingUrl: string;
    pickedUpAt: Date;
    receivedBySellerAt: Date;
    forwardTrackingNumber: string;
    forwardTrackingCarrier: string;
    forwardTrackingUrl: string;
    shippedBackAt: Date;
    completedAt: Date;
    status: AlterationRequestStatus;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}
