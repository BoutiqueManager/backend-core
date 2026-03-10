import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
} from "typeorm";
import {
  RefundStatusV2,
  RefundTypeV2,
  RefundDestination,
  RefundInitiatedBy,
} from "../../enums/order-v2.enum";

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
@Entity("v2_refunds")
@Index(["orderId"])
@Index(["customerId"])
@Index(["razorpayRefundId"])
@Index(["returnOrderId"])
@Index(["exchangeOrderId"])
@Index(["status"])
export class V2Refund {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  /** e.g. REF-2026-00003 */
  @Index({ unique: true })
  @Column({ type: "varchar", length: 30, unique: true })
  refundId: string;

  // ─── Source Payment ───────────────────────────────────────────────────────
  /** The v2_payment record being refunded */
  @Column({ type: "uuid" })
  originalPaymentId: string;

  @Column({ type: "uuid" })
  orderId: string;

  @Column({ type: "uuid" })
  checkoutSessionId: string;

  @Column({ type: "uuid" })
  customerId: string;

  // ─── Refund Type & Origin ─────────────────────────────────────────────────
  @Column({ type: "enum", enum: RefundTypeV2 })
  refundType: RefundTypeV2;

  /** Set when this refund is linked to a return request */
  @Column({ type: "uuid", nullable: true })
  returnOrderId: string;

  /** Set when this refund is linked to an exchange with price downgrade */
  @Column({ type: "uuid", nullable: true })
  exchangeOrderId: string;

  // ─── Amount ───────────────────────────────────────────────────────────────
  @Column({ type: "decimal", precision: 12, scale: 2 })
  amount: number;

  @Column({ type: "varchar", length: 3, default: "INR" })
  currency: string;

  /**
   * Always true for return/exchange refunds per PRD §1.5.
   * Shipping charges are excluded since item was successfully delivered.
   */
  @Column({ type: "boolean", default: true })
  shippingChargesExcluded: boolean;

  // ─── Refund Destination (customer selects during return/exchange flow) ─────
  @Column({ type: "enum", enum: RefundDestination })
  refundDestination: RefundDestination;

  /** Populated when destination = UPI */
  @Column({ type: "varchar", nullable: true })
  upiId: string;

  /**
   * Populated when destination = BANK_ACCOUNT.
   * Stored encrypted — never store in plain text.
   */
  @Column({ type: "varchar", nullable: true })
  bankAccountNumber: string;

  @Column({ type: "varchar", length: 11, nullable: true })
  bankIfsc: string;

  @Column({ type: "varchar", length: 200, nullable: true })
  bankAccountHolderName: string;

  // ─── Razorpay ─────────────────────────────────────────────────────────────
  @Column({ type: "varchar", nullable: true })
  razorpayRefundId: string;

  /** Full Razorpay refund API response for audit */
  @Column({ type: "jsonb", nullable: true })
  razorpayResponse: Record<string, any>;

  // ─── Status & Timeline ────────────────────────────────────────────────────
  @Column({
    type: "enum",
    enum: RefundStatusV2,
    default: RefundStatusV2.INITIATED,
  })
  status: RefundStatusV2;

  @Column({ type: "timestamp", nullable: true })
  initiatedAt: Date;

  @Column({ type: "timestamp", nullable: true })
  bankProcessedAt: Date;

  @Column({ type: "timestamp", nullable: true })
  creditedAt: Date;

  @Column({ type: "timestamp", nullable: true })
  failedAt: Date;

  @Column({ type: "text", nullable: true })
  failureReason: string;

  // ─── Audit ────────────────────────────────────────────────────────────────
  @Column({
    type: "enum",
    enum: RefundInitiatedBy,
    default: RefundInitiatedBy.SYSTEM,
  })
  initiatedBy: RefundInitiatedBy;

  /** UUID of the seller who triggered the refund (for return/exchange refunds) */
  @Column({ type: "uuid", nullable: true })
  initiatedByActorId: string;

  @Column({ type: "boolean", default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
