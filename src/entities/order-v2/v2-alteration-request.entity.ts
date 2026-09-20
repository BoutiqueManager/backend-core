import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
} from "typeorm";
import { AlterationRequestStatus } from "../../enums/order-v2.enum";

/**
 * One alteration request per journey through the §5.3 MTM alteration flow:
 * customer requests → item picked up from customer → delivered to seller →
 * seller reships the altered item → customer receives it back.
 *
 * Unlike V2ReturnOrder/V2ExchangeOrder, this is deliberately simple — no
 * pricing/price-difference fields, since alterations are free (manager
 * policy: exactly 1 free alteration, no questions asked) and don't change
 * the item itself. Mirrors V2ExchangeOrder's reverse+forward shipment field
 * shape, since alteration is the only other flow needing both legs.
 *
 * V2OrderItem.trackingNumber/trackingCarrier/trackingUrl are NOT touched by
 * this flow — they keep holding the original forward-delivery AWB. Both
 * alteration legs' AWBs live here instead.
 */
@Entity("v2_alteration_requests")
@Index(["orderItemId"])
@Index(["customerId", "status"])
@Index(["boutiqueId", "status"])
export class V2AlterationRequest {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  /** e.g. ALT-2026-00001 */
  @Index({ unique: true })
  @Column({ type: "varchar", length: 30, unique: true })
  alterationRequestId: string;

  // ─── Links ────────────────────────────────────────────────────────────────
  @Column({ type: "uuid" })
  orderId: string;

  @Column({ type: "uuid" })
  orderItemId: string;

  @Column({ type: "uuid" })
  customerId: string;

  @Column({ type: "uuid" })
  boutiqueId: string;

  @Column({ type: "varchar", length: 200 })
  boutiqueName: string;

  /**
   * Free-text note from the customer, optional — "no questions asked" per
   * manager policy, not a mandatory reason-category field.
   */
  @Column({ type: "text", nullable: true })
  customerNote: string;

  // ─── Reverse Shipment (pickup FROM customer, TO seller) ────────────────────
  @Column({ type: "varchar", nullable: true })
  reverseTrackingNumber: string;

  @Column({ type: "varchar", nullable: true })
  reverseTrackingCarrier: string;

  @Column({ type: "varchar", nullable: true })
  reverseTrackingUrl: string;

  @Column({ type: "timestamp", nullable: true })
  pickedUpAt: Date;

  @Column({ type: "timestamp", nullable: true })
  receivedBySellerAt: Date;

  // ─── Forward Shipment (seller → customer, item shipped back) ───────────────
  @Column({ type: "varchar", nullable: true })
  forwardTrackingNumber: string;

  @Column({ type: "varchar", nullable: true })
  forwardTrackingCarrier: string;

  @Column({ type: "varchar", nullable: true })
  forwardTrackingUrl: string;

  @Column({ type: "timestamp", nullable: true })
  shippedBackAt: Date;

  @Column({ type: "timestamp", nullable: true })
  completedAt: Date;

  // ─── Status ─────────────────────────────────────────────────────────────
  @Column({
    type: "enum",
    enum: AlterationRequestStatus,
    default: AlterationRequestStatus.REQUESTED,
  })
  status: AlterationRequestStatus;

  @Column({ type: "boolean", default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
