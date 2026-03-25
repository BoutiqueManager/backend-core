import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  Index,
} from "typeorm";
import {
  CheckoutSessionStatus,
  PaymentMethodV2,
  PaymentStatusV2,
} from "../../enums/order-v2.enum";
import { V2Order } from "./v2-order.entity";

@Entity("v2_checkout_sessions")
@Index(["customerId"])
@Index(["razorpayOrderId"])
@Index(["status"])
export class V2CheckoutSession {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  /** Human-readable ID shown to customers. e.g. CHK-2026-00001 */
  @Index({ unique: true })
  @Column({ type: "varchar", length: 30, unique: true })
  checkoutSessionId: string;

  /** Ref to customer_users.id (same server) */
  @Column({ type: "uuid" })
  customerId: string;

  /** Snapshot of cart ID at time of checkout (informational) */
  @Column({ type: "uuid", nullable: true })
  cartId: string;

  // ─── Aggregate Pricing ────────────────────────────────────────────────────
  /** Sum of all items' MRP × qty across all boutique orders */
  @Column({ type: "decimal", precision: 12, scale: 2, default: 0 })
  totalMrp: number;

  @Column({ type: "decimal", precision: 12, scale: 2, default: 0 })
  totalDiscount: number;

  @Column({ type: "decimal", precision: 12, scale: 2, default: 0 })
  totalOfferPrice: number;

  @Column({ type: "decimal", precision: 12, scale: 2, default: 0 })
  totalCouponDiscount: number;

  @Column({ type: "decimal", precision: 10, scale: 2, default: 0 })
  totalShippingCharges: number;

  @Column({ type: "decimal", precision: 10, scale: 2, default: 0 })
  totalTax: number;

  /** The actual grand total charged to customer across all boutique orders */
  @Column({ type: "decimal", precision: 12, scale: 2, default: 0 })
  grandTotal: number;

  // ─── Partial Payment ──────────────────────────────────────────────────────
  /** True if any order in this session has made_to_measure items */
  @Column({ type: "boolean", default: false })
  hasPartialPayment: boolean;

  /** Total advance paid across all boutique orders (sum of v2_orders.advancePaid) */
  @Column({ type: "decimal", precision: 12, scale: 2, default: 0 })
  advancePaid: number;

  /** Total remaining balance to be collected after delivery */
  @Column({ type: "decimal", precision: 12, scale: 2, default: 0 })
  remainingAmount: number;

  // ─── Payment Method & Status ──────────────────────────────────────────────
  @Column({ type: "enum", enum: PaymentMethodV2 })
  paymentMethod: PaymentMethodV2;

  @Column({
    type: "enum",
    enum: PaymentStatusV2,
    default: PaymentStatusV2.PENDING,
  })
  paymentStatus: PaymentStatusV2;

  /** Razorpay order ID created for this checkout session */
  @Column({ type: "varchar", nullable: true })
  razorpayOrderId: string;

  // ─── Address Snapshot (immutable at checkout time) ────────────────────────
  /** FK to customer_addresses — stored for reference */
  @Column({ type: "uuid" })
  shippingAddressId: string;

  /** null means same as shipping */
  @Column({ type: "uuid", nullable: true })
  billingAddressId: string;

  /** Immutable address snapshot — never changes after order placed */
  @Column({ type: "jsonb" })
  shippingAddress: Record<string, any>;

  /** null if same as shipping */
  @Column({ type: "jsonb", nullable: true })
  billingAddress: Record<string, any>;

  // ─── Status & Timestamps ──────────────────────────────────────────────────
  @Column({
    type: "enum",
    enum: CheckoutSessionStatus,
    default: CheckoutSessionStatus.ACTIVE,
  })
  status: CheckoutSessionStatus;

  @Column({ type: "timestamp", nullable: true })
  completedAt: Date;

  // ─── Relations ────────────────────────────────────────────────────────────
  @OneToMany(() => V2Order, (order) => order.checkoutSession)
  orders: V2Order[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
