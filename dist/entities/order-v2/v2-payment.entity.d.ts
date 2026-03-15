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
    upiTransactionId: string;
    upiApp: UpiApp;
    cardLast4: string;
    cardBrand: CardBrand;
    /** FK to customer_payment_methods — set if saved payment method was used */
    savedPaymentMethodId: string;
    codCollectedAt: Date;
    paidAt: Date;
    failedAt: Date;
    failureReason: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}
