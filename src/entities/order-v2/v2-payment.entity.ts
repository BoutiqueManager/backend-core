import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  Index,
} from "typeorm";
import {
  PaymentTypeV2,
  PaymentMethodV2,
  PaymentStatusV2,
} from "../../enums/order-v2.enum";
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
@Entity("v2_payments")
@Index(["razorpayOrderId"])
@Index(["razorpayPaymentId"])
@Index(["customerId", "status"])
@Index(["checkoutSessionId"])
@Index(["orderId"])
export class V2Payment {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  /** e.g. PAY-2026-00017 */
  @Index({ unique: true })
  @Column({ type: "varchar", length: 30, unique: true })
  paymentId: string;

  // ─── Order Association ────────────────────────────────────────────────────
  @Column({ type: "uuid" })
  checkoutSessionId: string;

  @ManyToOne(() => V2CheckoutSession, { nullable: false })
  @JoinColumn({ name: "checkoutSessionId" })
  checkoutSession: V2CheckoutSession;

  /**
   * Set to a specific v2_order ID for exchange_top_up payments.
   * null means the payment covers the entire checkout session.
   */
  @Column({ type: "uuid", nullable: true })
  orderId: string;

  @Column({ type: "uuid" })
  customerId: string;

  // ─── Payment Classification ───────────────────────────────────────────────
  @Column({ type: "enum", enum: PaymentTypeV2 })
  paymentType: PaymentTypeV2;

  @Column({ type: "enum", enum: PaymentMethodV2 })
  paymentMethod: PaymentMethodV2;

  @Column({ type: "decimal", precision: 12, scale: 2 })
  amount: number;

  @Column({ type: "varchar", length: 3, default: "INR" })
  currency: string;

  @Column({
    type: "enum",
    enum: PaymentStatusV2,
    default: PaymentStatusV2.PENDING,
  })
  status: PaymentStatusV2;

  // ─── Razorpay Fields ──────────────────────────────────────────────────────
  /** Razorpay order ID (rzp_order_*) */
  @Column({ type: "varchar", nullable: true })
  razorpayOrderId: string;

  /** Razorpay payment ID (pay_*) — populated after successful payment */
  @Column({ type: "varchar", nullable: true })
  razorpayPaymentId: string;

  /**
   * HMAC-SHA256 signature from Razorpay for payment verification.
   * Validated before marking payment as successful.
   */
  @Column({ type: "varchar", nullable: true })
  razorpaySignature: string;

  /** Full Razorpay webhook/API response stored for audit */
  @Column({ type: "jsonb", nullable: true })
  razorpayResponse: Record<string, any>;

  @Column({ type: "varchar", length: 20, nullable: true })
  razorpayMethod: string;

  /** Wallet provider name e.g. "mobikwik", "paytm" — populated when method = "wallet" */
  @Column({ type: "varchar", length: 50, nullable: true })
  walletName: string;

  /** Netbanking bank code e.g. "HDFC", "ICIC" — populated when method = "netbanking" */
  @Column({ type: "varchar", length: 20, nullable: true })
  bank: string;

  /** Razorpay platform fee in rupees */
  @Column({ type: "decimal", precision: 10, scale: 2, nullable: true })
  gatewayFee: number;

  /** GST on Razorpay fee in rupees */
  @Column({ type: "decimal", precision: 10, scale: 2, nullable: true })
  gatewayTax: number;

  /** Whether an international payment method was used */
  @Column({ type: "boolean", nullable: true })
  international: boolean;

  /** Amount already refunded by Razorpay in rupees (for reconciliation) */
  @Column({ type: "decimal", precision: 12, scale: 2, nullable: true })
  amountRefunded: number;

  /** Razorpay error_source e.g. "customer", "bank", "business" */
  @Column({ type: "varchar", length: 100, nullable: true })
  errorSource: string;

  /** Razorpay error_step e.g. "payment_authorization" */
  @Column({ type: "varchar", length: 100, nullable: true })
  errorStep: string;

  /** Razorpay error_reason e.g. "payment_failed", "card_declined" */
  @Column({ type: "varchar", length: 200, nullable: true })
  errorReason: string;

  /** Bank/gateway acquirer reference data (e.g. bank_transaction_id) */
  @Column({ type: "jsonb", nullable: true })
  acquirerData: Record<string, any>;

  /** Timestamp when Razorpay confirmed the payment was captured */
  @Column({ type: "timestamp", nullable: true })
  capturedAt: Date;

  // ─── UPI Fields ───────────────────────────────────────────────────────────
  @Column({ type: "varchar", nullable: true })
  upiTransactionId: string;

  @Column({ type: "enum", enum: UpiApp, nullable: true })
  upiApp: UpiApp;

  // ─── Card Fields (RBI Compliant — no full PAN stored) ─────────────────────
  @Column({ type: "varchar", length: 4, nullable: true })
  cardLast4: string;

  @Column({ type: "enum", enum: CardBrand, nullable: true })
  cardBrand: CardBrand;

  /** Card type: "debit" or "credit" — from Razorpay card.type */
  @Column({ type: "varchar", length: 10, nullable: true })
  cardType: string;

  /** Issuing bank of the card e.g. "HDFC", "SBI" — populated when method = "card" */
  @Column({ type: "varchar", length: 50, nullable: true })
  cardIssuingBank: string;

  /** FK to customer_payment_methods — set if saved payment method was used */
  @Column({ type: "uuid", nullable: true })
  savedPaymentMethodId: string;

  // ─── COD Fields ───────────────────────────────────────────────────────────
  @Column({ type: "timestamp", nullable: true })
  codCollectedAt: Date;

  // ─── Retry & Error Tracking ───────────────────────────────────────────────
  /** Links to the original failed payment this is a retry of */
  @Column({ type: "uuid", nullable: true })
  retryOf: string;

  /** Razorpay error code (e.g. BAD_REQUEST_ERROR) */
  @Column({ type: "varchar", length: 100, nullable: true })
  gatewayErrorCode: string;

  /** Human-readable error description from Razorpay */
  @Column({ type: "text", nullable: true })
  gatewayErrorDescription: string;

  /** Timestamp when webhook confirmed this payment */
  @Column({ type: "timestamp", nullable: true })
  webhookReceivedAt: Date;

  /** Number of payment attempts for this record */
  @Column({ type: "int", default: 1 })
  attemptCount: number;

  // ─── Lifecycle Timestamps ─────────────────────────────────────────────────
  @Column({ type: "timestamp", nullable: true })
  paidAt: Date;

  @Column({ type: "timestamp", nullable: true })
  failedAt: Date;

  @Column({ type: "text", nullable: true })
  failureReason: string;

  @Column({ type: "boolean", default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
