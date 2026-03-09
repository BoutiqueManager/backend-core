import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  Index,
} from "typeorm";
import { ReturnOrderStatus } from "../../enums/order-v2.enum";
import { V2ReturnOrderItem } from "./v2-return-order-item.entity";

/**
 * One Return Order groups items being returned together in a single pickup.
 *
 * Merge rules per PRD §1.3 / §3.2.1:
 *   - Same-time requests → ONE return order, ONE reverse shipment
 *   - New item added before pickup → merged into existing open return order
 *   - New item added after pickup → NEW return order + new reverse shipment
 *   - isPickupLocked = true after first item picked up (no further merges allowed)
 *
 * Return Order ID format: RET-YYYY-#####
 */
@Entity("v2_return_orders")
@Index(["originalOrderId"])
@Index(["customerId", "status"])
@Index(["boutiqueId", "status"])
@Index(["isPickupLocked"])
export class V2ReturnOrder {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  /** e.g. RET-2026-00005 — displayed (seller tabs, customer order detail) */
  @Index({ unique: true })
  @Column({ type: "varchar", length: 30, unique: true })
  returnOrderId: string;

  // ─── Links ────────────────────────────────────────────────────────────────
  /** The original v2_order that items are being returned from */
  @Column({ type: "uuid" })
  originalOrderId: string;

  @Column({ type: "uuid" })
  checkoutSessionId: string;

  @Column({ type: "uuid" })
  customerId: string;

  @Column({ type: "uuid" })
  boutiqueId: string;

  @Column({ type: "varchar", length: 200 })
  boutiqueName: string;

  // ─── Reverse Shipment Link ────────────────────────────────────────────────
  /**
   * FK to v2_reverse_shipments.
   * Set when pickup is first scheduled (after customer initiates request).
   */
  @Column({ type: "uuid", nullable: true, unique: true })
  reverseShipmentId: string;

  // ─── Merge Lock (PRD §1.3 / §3.3.3) ──────────────────────────────────────
  /**
   * Flipped to true when the first item in this return order is picked up.
   * After this point no new items may be merged into this return order.
   */
  @Column({ type: "boolean", default: false })
  isPickupLocked: boolean;

  @Column({ type: "timestamp", nullable: true })
  pickedUpAt: Date;

  // ─── Pricing ──────────────────────────────────────────────────────────────
  /** Sum of totalFinalPrice for all return order items */
  @Column({ type: "decimal", precision: 12, scale: 2, default: 0 })
  totalReturnValue: number;

  /**
   * Amount to refund = totalReturnValue.
   * Shipping charges NOT included per PRD §2.3.1 and §1.5.
   */
  @Column({ type: "decimal", precision: 12, scale: 2, default: 0 })
  refundAmount: number;

  /**
   * FK to v2_refunds — set ONLY after seller confirms receipt (receivedBySellerAt).
   * Refund must NOT be triggered at pickup time per PRD §1.5.
   */
  @Column({ type: "uuid", nullable: true })
  refundId: string;

  // ─── Status & Timestamps ──────────────────────────────────────────────────
  @Column({
    type: "enum",
    enum: ReturnOrderStatus,
    default: ReturnOrderStatus.INITIATED,
  })
  status: ReturnOrderStatus;

  @Column({ type: "date", nullable: true })
  scheduledPickupDate: Date;

  @Column({ type: "varchar", length: 50, nullable: true })
  scheduledPickupSlot: string;

  /**
   * Set by seller when they confirm receipt of the returned item.
   * This timestamp triggers refund initiation per PRD §1.5 and §3.3.1.
   */
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
  @OneToMany(() => V2ReturnOrderItem, (item) => item.returnOrder)
  returnOrderItems: V2ReturnOrderItem[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
