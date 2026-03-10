import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
} from "typeorm";
import { ReverseShipmentStatus } from "../../enums/order-v2.enum";

/**
 * Shared reverse logistics entity for both return and exchange pickup operations.
 *
 * Exactly one of (returnOrderId, exchangeOrderId) is set — they are mutually exclusive.
 *
 * Shipment ID lock rule per PRD §3.3.3:
 *   Once pickedUpAt is set (status → PICKED_UP), the parent return/exchange order's
 *   isPickupLocked flag is set to true. No additional items may be merged after this point.
 *
 * Pickup address is ALWAYS the original delivery address and cannot be changed by customer.
 * Per PRD §2.3.1 and §2.4.1 step-1.
 */
@Entity("v2_reverse_shipments")
@Index(["returnOrderId"])
@Index(["exchangeOrderId"])
@Index(["customerId"])
@Index(["trackingNumber"])
export class V2ReverseShipment {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  /** e.g. RSHIP-2026-00001 */
  @Index({ unique: true })
  @Column({ type: "varchar", length: 35, unique: true })
  reverseShipmentId: string;

  // ─── Parent Reference (mutually exclusive) ────────────────────────────────
  @Column({ type: "uuid", nullable: true })
  returnOrderId: string;

  @Column({ type: "uuid", nullable: true })
  exchangeOrderId: string;

  @Column({ type: "uuid" })
  customerId: string;

  // ─── Pickup Address (immutable — always original delivery address) ─────────
  /** FK to customer_addresses */
  @Column({ type: "uuid" })
  pickupAddressId: string;

  /** Immutable address snapshot — locked at creation, never changes */
  @Column({ type: "jsonb" })
  pickupAddress: Record<string, any>;

  // ─── Logistics ────────────────────────────────────────────────────────────
  @Column({ type: "varchar", length: 100, nullable: true })
  logisticsProvider: string;

  @Column({ type: "varchar", nullable: true })
  trackingNumber: string;

  @Column({ type: "varchar", nullable: true })
  trackingUrl: string;

  // ─── Status & Timestamps ──────────────────────────────────────────────────
  @Column({
    type: "enum",
    enum: ReverseShipmentStatus,
    default: ReverseShipmentStatus.PENDING,
  })
  status: ReverseShipmentStatus;

  @Column({ type: "date", nullable: true })
  scheduledPickupDate: Date;

  @Column({ type: "varchar", length: 50, nullable: true })
  scheduledPickupSlot: string;

  /**
   * Setting this timestamp triggers isPickupLocked = true on the parent
   * return/exchange order, preventing any further item merges per PRD §3.3.3.
   */
  @Column({ type: "timestamp", nullable: true })
  pickedUpAt: Date;

  @Column({ type: "timestamp", nullable: true })
  deliveredToSellerAt: Date;

  @Column({ type: "date", nullable: true })
  estimatedDeliveryToSeller: Date;

  @Column({ type: "int", default: 0 })
  pickupAttempts: number;

  @Column({ type: "timestamp", nullable: true })
  lastAttemptAt: Date;

  @Column({ type: "text", nullable: true })
  failureReason: string;

  @Column({ type: "boolean", default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
