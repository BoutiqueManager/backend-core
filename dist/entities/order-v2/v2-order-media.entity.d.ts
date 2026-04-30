import { MediaSubtypeV2, OrderMediaType } from "../../enums/order-v2.enum";
/**
 * Seller-uploaded packing media for shipped order items.
 *
 * Per PRD: when marking an item as Shipped, seller MUST upload at least 2 images.
 * A packing video is optional but recommended.
 *
 * Visibility rules per PRD:
 *   - Media becomes visible to customer after order is marked as Shipped
 *   - Media auto-expires after the return/exchange window closes (storage optimization)
 *   - expiresAt = deliveredAt + max(returnWindowDays, exchangeWindowDays)
 *     (set on v2_order_items when item is delivered)
 *
 * A nightly cleanup job checks isExpired = false AND expiresAt < NOW()
 * to delete R2 objects and mark records as expired.
 */
export declare class V2OrderMedia {
    id: string;
    orderId: string;
    orderItemId: string;
    /** Cross-server ref to boutique-server boutique.id — who uploaded this */
    uploadedByBoutiqueId: string;
    mediaType: OrderMediaType;
    mediaSubtype: MediaSubtypeV2;
    originalKey: string;
    previewKey: string;
    fileName: string;
    fileSize: number;
    mimeType: string;
    /** width, height, duration (for videos), altText */
    metadata: Record<string, any>;
    isPrimary: boolean;
    sortOrder: number;
    /** Set when order item is delivered. Null until then. */
    expiresAt: Date;
    /** Flipped to true by nightly R2 cleanup job after R2 object deletion */
    isExpired: boolean;
    expiredAt: Date;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}
