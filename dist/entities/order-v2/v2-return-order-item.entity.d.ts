import { ReturnOrderItemStatus, ReturnReasonCategory } from "../../enums/order-v2.enum";
import { V2ReturnOrder } from "./v2-return-order.entity";
/**
 * Individual item within a return order.
 * Captures the return reason, customer media (min 2 images), and pricing snapshot.
 */
export declare class V2ReturnOrderItem {
    id: string;
    returnOrderId: string;
    returnOrder: V2ReturnOrder;
    /** The v2_order_item being returned */
    originalOrderItemId: string;
    orderId: string;
    /** Mandatory — customer must provide a reason per PRD §2.3.1 */
    returnReason: string;
    returnReasonCategory: ReturnReasonCategory;
    mrp: number;
    offerPrice: number;
    couponDiscount: number;
    /** = totalFinalPrice from v2_order_items — this is the refund amount for this item */
    finalPrice: number;
    quantity: number;
    status: ReturnOrderItemStatus;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}
