import { MediaSubtypeV2, OrderMediaType } from "../../enums/order-v2.enum";
/**
 * Customer-submitted media when raising a return or exchange request.
 *
 * Per PRD §2.3.1 / §2.4.1:
 *   - Minimum 2 images are MANDATORY — requests cannot be submitted without them
 *   - Video is optional
 *   - Media is submitted at time of initiating the return/exchange flow
 *
 * Exactly one of (returnOrderItemId, exchangeOrderItemId) is set — mutually exclusive.
 */
export declare class V2ReturnExchangeMedia {
    id: string;
    returnOrderItemId: string;
    exchangeOrderItemId: string;
    customerId: string;
    mediaType: OrderMediaType;
    mediaSubtype: MediaSubtypeV2;
    originalKey: string;
    previewKey: string;
    fileName: string;
    fileSize: number;
    mimeType: string;
    metadata: Record<string, any>;
    isPrimary: boolean;
    sortOrder: number;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}
