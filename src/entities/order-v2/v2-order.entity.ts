import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
  Index,
} from "typeorm";
import {
  OrderStatusV2,
  OrderPaymentStatusV2,
  PaymentMethodV2,
  CancelledByV2,
} from "../../enums/order-v2.enum";
import { V2CheckoutSession } from "./v2-checkout-session.entity";
import { V2OrderItem } from "./v2-order-item.entity";
import { V2AppliedCoupon } from "./v2-applied-coupon.entity";

@Entity("v2_orders")
@Index(["customerId", "status"])
@Index(["boutiqueId", "status"])
@Index(["checkoutSessionId"])
@Index(["orderDate"])
export class V2Order {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  /** Human-readable order ID, unique across all orders. e.g. ORD-2026-00042 */
  @Index({ unique: true })
  @Column({ type: "varchar", length: 30, unique: true })
  orderId: string;

  // ─── Relationships ────────────────────────────────────────────────────────
  @Column({ type: "uuid" })
  checkoutSessionId: string;

  @ManyToOne(() => V2CheckoutSession, (session) => session.orders)
  @JoinColumn({ name: "checkoutSessionId" })
  checkoutSession: V2CheckoutSession;

  /** FK to customer_users.id */
  @Column({ type: "uuid" })
  customerId: string;

  // ─── Boutique Info (cross-server; no FK constraint) ───────────────────────
  @Column({ type: "uuid" })
  boutiqueId: string;

  /** Cached at order creation time — decoupled from live boutique data */
  @Column({ type: "varchar", length: 200 })
  boutiqueName: string;

  @Column({ type: "varchar", nullable: true })
  boutiqueLogoUrl: string;

  // ─── Pricing (all captured as snapshots at order time) ───────────────────
  /** Sum of (mrp × qty) for all items in this boutique order */
  @Column({ type: "decimal", precision: 12, scale: 2, default: 0 })
  subtotalMrp: number;

  /** Total discount = subtotalMrp − subtotalOfferPrice */
  @Column({ type: "decimal", precision: 12, scale: 2, default: 0 })
  totalDiscount: number;

  /** Sum of (offerPrice × qty) for all items */
  @Column({ type: "decimal", precision: 12, scale: 2, default: 0 })
  subtotalOfferPrice: number;

  /** Sum of all coupon discounts applied to this order */
  @Column({ type: "decimal", precision: 12, scale: 2, default: 0 })
  totalCouponDiscount: number;

  /** Shipping charges based on selected delivery address */
  @Column({ type: "decimal", precision: 10, scale: 2, default: 0 })
  shippingCharges: number;

  @Column({ type: "decimal", precision: 10, scale: 2, default: 0 })
  totalTax: number;

  /** Actual amount payable for this boutique order */
  @Column({ type: "decimal", precision: 12, scale: 2, default: 0 })
  grandTotal: number;

  // ─── Partial / Advance Payment ────────────────────────────────────────────
  /** True if at least one item in this order is made_to_measure */
  @Column({ type: "boolean", default: false })
  hasPartialPayment: boolean;

  /**
   * Advance payment percentage set by boutique in v2_boutique_order_settings.
   * Captured at order creation time so future boutique config changes don't affect existing orders.
   */
  @Column({ type: "decimal", precision: 5, scale: 2, nullable: true })
  advancePercentage: number;

  /** Amount already paid (advance or full) */
  @Column({ type: "decimal", precision: 12, scale: 2, default: 0 })
  advancePaid: number;

  /** Amount still owed after delivery (grandTotal − advancePaid) */
  @Column({ type: "decimal", precision: 12, scale: 2, default: 0 })
  remainingAmount: number;

  /** Timestamp when customer paid the remaining balance after delivery */
  @Column({ type: "timestamp", nullable: true })
  remainingPaidAt: Date;

  // ─── Payment ──────────────────────────────────────────────────────────────
  @Column({ type: "enum", enum: PaymentMethodV2 })
  paymentMethod: PaymentMethodV2;

  @Column({
    type: "enum",
    enum: OrderPaymentStatusV2,
    default: OrderPaymentStatusV2.PENDING,
  })
  paymentStatus: OrderPaymentStatusV2;

  // ─── Address Snapshot (immutable after order creation) ───────────────────
  @Column({ type: "jsonb" })
  shippingAddress: Record<string, any>;

  /** null if same as shipping */
  @Column({ type: "jsonb", nullable: true })
  billingAddress: Record<string, any>;

  // ─── Tracking ─────────────────────────────────────────────────────────────
  @Column({ type: "varchar", nullable: true })
  trackingNumber: string;

  @Column({ type: "varchar", nullable: true })
  trackingCarrier: string;

  @Column({ type: "varchar", nullable: true })
  trackingUrl: string;

  // ─── Status ───────────────────────────────────────────────────────────────
  @Column({ type: "enum", enum: OrderStatusV2, default: OrderStatusV2.NEW })
  status: OrderStatusV2;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  orderDate: Date;

  @Column({ type: "timestamp", nullable: true })
  confirmedAt: Date;

  @Column({ type: "timestamp", nullable: true })
  shippedAt: Date;

  @Column({ type: "timestamp", nullable: true })
  outForDeliveryAt: Date;

  @Column({ type: "timestamp", nullable: true })
  deliveredAt: Date;

  @Column({ type: "timestamp", nullable: true })
  cancelledAt: Date;

  @Column({ type: "date", nullable: true })
  estimatedDeliveryDate: Date;

  @Column({ type: "date", nullable: true })
  actualDeliveryDate: Date;

  // ─── Cancellation ─────────────────────────────────────────────────────────
  @Column({ type: "enum", enum: CancelledByV2, nullable: true })
  cancelledBy: CancelledByV2;

  /**
   * Required when seller cancels (PRD §2A-1).
   * Shown to customer as: "Reason by Seller: [cancellationReason]"
   */
  @Column({ type: "text", nullable: true })
  cancellationReason: string;

  // ─── Convenience Flags ────────────────────────────────────────────────────
  /** At least one item is made_to_measure */
  @Column({ type: "boolean", default: false })
  hasCustomizedItems: boolean;

  @Column({ type: "boolean", default: false })
  hasReadyToShipItems: boolean;

  @Column({ type: "text", nullable: true })
  customerNote: string;

  @Column({ type: "text", nullable: true })
  sellerNote: string;

  @Column({ type: "boolean", default: true })
  isActive: boolean;

  // ─── Relations ────────────────────────────────────────────────────────────
  @OneToMany(() => V2OrderItem, (item) => item.order)
  orderItems: V2OrderItem[];

  @OneToMany(() => V2AppliedCoupon, (coupon) => coupon.order)
  appliedCoupons: V2AppliedCoupon[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
