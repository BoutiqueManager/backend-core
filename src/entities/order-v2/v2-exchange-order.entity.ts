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
  ExchangeOrderStatus,
  ExchangePricingType,
} from "../../enums/order-v2.enum";
import { V2ExchangeOrderItem } from "./v2-exchange-order-item.entity";

/**
 * One Exchange Order groups items exchanged in a single pickup+delivery operation.
 *
 * Merge rules are identical to return orders per PRD §3.2.2.
 * Exchange Order ID format: EXC-YYYY-#####
 *
 * Key pricing rules per PRD §1.6:
 *   - priceDifference > 0 → customer pays BEFORE exchange is placed
 *   - priceDifference < 0 → refund ONLY after seller confirms receipt
 *   - priceDifference = 0 → no payment/refund action
 *
 * Exchange restrictions per PRD §1.2:
 *   - made_to_measure → can only exchange for ready_to_ship from SAME boutique
 *   - ready_to_ship → can exchange for ready_to_ship from same OR different boutique
 */
@Entity("v2_exchange_orders")
@Index(["originalOrderId"])
@Index(["customerId", "status"])
@Index(["boutiqueId", "status"])
export class V2ExchangeOrder {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  /** e.g. EXC-2026-00002 */
  @Index({ unique: true })
  @Column({ type: "varchar", length: 30, unique: true })
  exchangeOrderId: string;

  // ─── Links ────────────────────────────────────────────────────────────────
  @Column({ type: "uuid" })
  originalOrderId: string;

  @Column({ type: "uuid" })
  checkoutSessionId: string;

  @Column({ type: "uuid" })
  customerId: string;

  /** Original boutique (where original item is being returned to) */
  @Column({ type: "uuid" })
  boutiqueId: string;

  @Column({ type: "varchar", length: 200 })
  boutiqueName: string;

  // ─── New Item Delivery Address ────────────────────────────────────────────
  /**
   * Customer may change delivery address for the new exchange item.
   * Pickup address is always fixed (original delivery address).
   * Per PRD §2.4.1 step-1 and §3.3.6.
   */
  @Column({ type: "uuid", nullable: true })
  newItemDeliveryAddressId: string;

  /** Immutable snapshot after exchange placed — reflects any address change */
  @Column({ type: "jsonb", nullable: true })
  newItemDeliveryAddress: Record<string, any>;

  // ─── Reverse Shipment (pickup of original item) ───────────────────────────
  @Column({ type: "uuid", nullable: true, unique: true })
  reverseShipmentId: string;

  /** Locked after first item in this exchange order is picked up */
  @Column({ type: "boolean", default: false })
  isPickupLocked: boolean;

  @Column({ type: "timestamp", nullable: true })
  pickedUpAt: Date;

  // ─── Forward Shipment (delivery of new exchange item to customer) ──────────
  @Column({ type: "varchar", nullable: true })
  forwardTrackingNumber: string;

  @Column({ type: "varchar", nullable: true })
  forwardTrackingCarrier: string;

  @Column({ type: "varchar", nullable: true })
  forwardTrackingUrl: string;

  /** Shipping charges for the new item delivery — charged to customer */
  @Column({ type: "decimal", precision: 10, scale: 2, default: 0 })
  forwardShippingCharges: number;

  // ─── Pricing Summary ──────────────────────────────────────────────────────
  @Column({ type: "decimal", precision: 12, scale: 2, default: 0 })
  originalItemFinalPrice: number;

  @Column({ type: "decimal", precision: 12, scale: 2, default: 0 })
  newItemFinalPrice: number;

  /**
   * newItemFinalPrice + forwardShippingCharges − originalItemFinalPrice
   * Positive → customer must pay this extra amount before exchange is placed
   * Negative → customer gets this amount as refund after seller confirms receipt
   * Zero → no action required
   */
  @Column({ type: "decimal", precision: 12, scale: 2, default: 0 })
  priceDifference: number;

  @Column({
    type: "enum",
    enum: ExchangePricingType,
    default: ExchangePricingType.NO_ACTION,
  })
  exchangePricingType: ExchangePricingType;

  // ─── Payment / Refund ─────────────────────────────────────────────────────
  /**
   * FK to v2_payments (paymentType = exchange_top_up).
   * Set when priceDifference > 0 and customer completes additional payment.
   */
  @Column({ type: "uuid", nullable: true })
  additionalPaymentId: string;

  /**
   * FK to v2_refunds.
   * Set ONLY when priceDifference < 0 AND seller confirms receipt.
   * Per PRD §1.5 — refund never triggered at pickup time.
   */
  @Column({ type: "uuid", nullable: true })
  refundId: string;

  // ─── Status & Timestamps ──────────────────────────────────────────────────
  @Column({
    type: "enum",
    enum: ExchangeOrderStatus,
    default: ExchangeOrderStatus.INITIATED,
  })
  status: ExchangeOrderStatus;

  @Column({ type: "date", nullable: true })
  scheduledPickupDate: Date;

  @Column({ type: "varchar", length: 50, nullable: true })
  scheduledPickupSlot: string;

  /** Triggers refund initiation if priceDifference < 0 per PRD §3.3.1 */
  @Column({ type: "timestamp", nullable: true })
  receivedBySellerAt: Date;

  @Column({ type: "timestamp", nullable: true })
  completedAt: Date;

  @Column({ type: "timestamp", nullable: true })
  rejectedAt: Date;

  @Column({ type: "text", nullable: true })
  rejectionReason: string;

  @Column({ type: "boolean", default: true })
  isActive: boolean;

  // ─── Relations ────────────────────────────────────────────────────────────
  @OneToMany(() => V2ExchangeOrderItem, (item) => item.exchangeOrder)
  exchangeOrderItems: V2ExchangeOrderItem[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
