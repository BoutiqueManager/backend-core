import { ExchangeOrderItemStatus, ExchangeReasonCategory, ProductTypeV2 } from "../../enums/order-v2.enum";
import { V2ExchangeOrder } from "./v2-exchange-order.entity";
/**
 * Individual item within an exchange order.
 * Captures both the original item being returned and the new item selected by customer.
 *
 * Exchange restrictions per PRD §1.2 and §3.3.5:
 *   - made_to_measure original → new item must be ready_to_ship from SAME boutique
 *   - ready_to_ship original → new item must be ready_to_ship (any boutique)
 *   - New item CANNOT be made_to_measure / customized
 *   - Size variant exchange only available for ready_to_ship originals
 *
 * Per PRD §3.3.4: coupon discounts are NOT applied on exchange orders.
 */
export declare class V2ExchangeOrderItem {
    id: string;
    exchangeOrderId: string;
    exchangeOrder: V2ExchangeOrder;
    /** The v2_order_item being exchanged */
    originalOrderItemId: string;
    orderId: string;
    /** Mandatory per PRD §2.4.1 */
    exchangeReason: string;
    exchangeReasonCategory: ExchangeReasonCategory;
    originalProductId: string;
    originalProductName: string;
    originalProductType: ProductTypeV2;
    originalSize: string;
    originalPrimaryImageUrl: string;
    /** = totalFinalPrice from v2_order_items — used for price difference calculation */
    originalFinalPrice: number;
    originalQuantity: number;
    /** Cross-server reference to boutique-server products table */
    newProductId: string;
    newProductName: string;
    newProductSku: string;
    newInventoryId: string;
    newProductSizeId: string;
    newSize: string;
    newPrimaryImageUrl: string;
    /**
     * May differ from original boutique for ready_to_ship → ready_to_ship cross-boutique exchanges.
     * For made_to_measure originals, must equal original boutiqueId.
     */
    newBoutiqueId: string;
    newBoutiqueName: string;
    /**
     * Always ready_to_ship per PRD §1.2.
     * made_to_measure / customized items cannot be exchange targets.
     */
    newProductType: ProductTypeV2;
    newMrp: number;
    newDiscountAmount: number;
    newOfferPrice: number;
    newQuantity: number;
    status: ExchangeOrderItemStatus;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}
