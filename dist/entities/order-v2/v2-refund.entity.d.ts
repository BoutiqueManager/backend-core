import { RefundStatusV2, RefundTypeV2, RefundDestination, RefundInitiatedBy } from "../../enums/order-v2.enum";
/**
 * A refund record in the v2 order system.
 *
 * Refund trigger rules per PRD §1.5:
 *   - Cancellation: triggered immediately when item/order cancelled (prepaid only)
 *   - Return: triggered ONLY after seller confirms receipt (receivedBySellerAt set)
 *   - Exchange downgrade: triggered ONLY after seller confirms receipt
 *
 * Shipping charges are ALWAYS excluded from return/exchange refund amounts.
 *
 * 3-step tracker (cancellations): INITIATED → BANK_PROCESSING → CREDITED
 * 6-step tracker (returns/exchanges): covered by ReturnOrderStatus / ExchangeOrderStatus
 */
export declare class V2Refund {
    id: string;
    /** e.g. REF-2026-00003 */
    refundId: string;
    /** The v2_payment record being refunded */
    originalPaymentId: string;
    orderId: string;
    checkoutSessionId: string;
    customerId: string;
    refundType: RefundTypeV2;
    /** Set when this refund is linked to a return request */
    returnOrderId: string;
    /** Set when this refund is linked to an exchange with price downgrade */
    exchangeOrderId: string;
    amount: number;
    currency: string;
    /**
     * Always true for return/exchange refunds per PRD §1.5.
     * Shipping charges are excluded since item was successfully delivered.
     */
    shippingChargesExcluded: boolean;
    refundDestination: RefundDestination;
    /** Populated when destination = UPI */
    upiId: string;
    /**
     * Populated when destination = BANK_ACCOUNT.
     * Stored encrypted — never store in plain text.
     */
    bankAccountNumber: string;
    bankIfsc: string;
    bankAccountHolderName: string;
    razorpayRefundId: string;
    /** Full Razorpay refund API response for audit */
    razorpayResponse: Record<string, any>;
    status: RefundStatusV2;
    initiatedAt: Date;
    bankProcessedAt: Date;
    creditedAt: Date;
    failedAt: Date;
    failureReason: string;
    initiatedBy: RefundInitiatedBy;
    /** UUID of the seller who triggered the refund (for return/exchange refunds) */
    initiatedByActorId: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}
