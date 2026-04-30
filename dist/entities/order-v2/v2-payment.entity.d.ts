import { PaymentTypeV2, PaymentMethodV2, PaymentStatusV2 } from "../../enums/order-v2.enum";
import { UpiApp, CardBrand } from "../../enums/payment.enum";
import { V2CheckoutSession } from "./v2-checkout-session.entity";
/**
 * Every Razorpay transaction in the v2 order system.
 * Multiple payments are possible per order:
 *   - advance (made_to_measure items at checkout)
 *   - full (ready_to_ship items at checkout)
 *   - remaining_balance (after delivery of customized items)
 *   - exchange_top_up (when exchange item costs more than original)
 */
export declare class V2Payment {
    id: string;
    /** e.g. PAY-2026-00017 */
    paymentId: string;
    checkoutSessionId: string;
    checkoutSession: V2CheckoutSession;
    /**
     * Set to a specific v2_order ID for exchange_top_up payments.
     * null means the payment covers the entire checkout session.
     */
    orderId: string;
    customerId: string;
    paymentType: PaymentTypeV2;
    paymentMethod: PaymentMethodV2;
    amount: number;
    currency: string;
    status: PaymentStatusV2;
    /** Razorpay order ID (rzp_order_*) */
    razorpayOrderId: string;
    /** Razorpay payment ID (pay_*) — populated after successful payment */
    razorpayPaymentId: string;
    /**
     * HMAC-SHA256 signature from Razorpay for payment verification.
     * Validated before marking payment as successful.
     */
    razorpaySignature: string;
    /** Full Razorpay webhook/API response stored for audit */
    razorpayResponse: Record<string, any>;
    razorpayMethod: string;
    /** Wallet provider name e.g. "mobikwik", "paytm" — populated when method = "wallet" */
    walletName: string;
    /** Netbanking bank code e.g. "HDFC", "ICIC" — populated when method = "netbanking" */
    bank: string;
    /** Razorpay platform fee in rupees */
    gatewayFee: number;
    /** GST on Razorpay fee in rupees */
    gatewayTax: number;
    /** Whether an international payment method was used */
    international: boolean;
    /** Amount already refunded by Razorpay in rupees (for reconciliation) */
    amountRefunded: number;
    /** Razorpay error_source e.g. "customer", "bank", "business" */
    errorSource: string;
    /** Razorpay error_step e.g. "payment_authorization" */
    errorStep: string;
    /** Razorpay error_reason e.g. "payment_failed", "card_declined" */
    errorReason: string;
    /** Bank/gateway acquirer reference data (e.g. bank_transaction_id) */
    acquirerData: Record<string, any>;
    /** Timestamp when Razorpay confirmed the payment was captured */
    capturedAt: Date;
    upiTransactionId: string;
    upiApp: UpiApp;
    cardLast4: string;
    cardBrand: CardBrand;
    /** Card type: "debit" or "credit" — from Razorpay card.type */
    cardType: string;
    /** Issuing bank of the card e.g. "HDFC", "SBI" — populated when method = "card" */
    cardIssuingBank: string;
    /** FK to customer_payment_methods — set if saved payment method was used */
    savedPaymentMethodId: string;
    codCollectedAt: Date;
    /** Links to the original failed payment this is a retry of */
    retryOf: string;
    /** Razorpay error code (e.g. BAD_REQUEST_ERROR) */
    gatewayErrorCode: string;
    /** Human-readable error description from Razorpay */
    gatewayErrorDescription: string;
    /** Timestamp when webhook confirmed this payment */
    webhookReceivedAt: Date;
    /** Number of payment attempts for this record */
    attemptCount: number;
    paidAt: Date;
    failedAt: Date;
    failureReason: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}
