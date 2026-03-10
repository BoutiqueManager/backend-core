import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
} from "typeorm";
import { MediaSubtypeV2, OrderMediaType } from "../../enums/order-v2.enum";

/**
 * Seller-uploaded packing media for shipped order items.
 *
 * Per PRD: when marking an item as Shipped, seller MUST upload at least 2 images.
 * A packing video is optional but recommended.
 *
 * Visibility rules per PRD:
 *   - Media becomes visible to customer after order is marked as Shipped
 *   - Media auto-expires after the return/exchange window closes (storage optimization)
 *   - expiresAt = deliveredAt + max(returnWindowDays, exchangeWindowDays)
 *     (set on v2_order_items when item is delivered)
 *
 * A nightly cleanup job checks isExpired = false AND expiresAt < NOW()
 * to delete R2 objects and mark records as expired.
 */
@Entity("v2_order_media")
@Index(["orderItemId"])
@Index(["orderId"])
@Index(["expiresAt"])
export class V2OrderMedia {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "uuid" })
  orderId: string;

  @Column({ type: "uuid" })
  orderItemId: string;

  /** Cross-server ref to boutique-server boutique.id — who uploaded this */
  @Column({ type: "uuid" })
  uploadedByBoutiqueId: string;

  // ─── Media Classification ─────────────────────────────────────────────────
  @Column({ type: "enum", enum: OrderMediaType })
  mediaType: OrderMediaType;

  @Column({ type: "enum", enum: MediaSubtypeV2 })
  mediaSubtype: MediaSubtypeV2;

  // ─── Cloudflare R2 Storage ────────────────────────────────────────────────
  @Column({ type: "varchar", length: 500 })
  originalKey: string;

  @Column({ type: "varchar", length: 500, nullable: true })
  previewKey: string;

  @Column({ type: "varchar", length: 255 })
  fileName: string;

  @Column({ type: "bigint" })
  fileSize: number;

  @Column({ type: "varchar", length: 100 })
  mimeType: string;

  /** width, height, duration (for videos), altText */
  @Column({ type: "jsonb", nullable: true })
  metadata: Record<string, any>;

  @Column({ type: "boolean", default: false })
  isPrimary: boolean;

  @Column({ type: "smallint", default: 0 })
  sortOrder: number;

  // ─── Auto-expiry (storage optimization per PRD) ───────────────────────────
  /** Set when order item is delivered. Null until then. */
  @Column({ type: "timestamp", nullable: true })
  expiresAt: Date;

  /** Flipped to true by nightly R2 cleanup job after R2 object deletion */
  @Column({ type: "boolean", default: false })
  isExpired: boolean;

  @Column({ type: "timestamp", nullable: true })
  expiredAt: Date;

  @Column({ type: "boolean", default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
