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
 * Customer-submitted media when raising a return or exchange request.
 *
 * Per PRD §2.3.1 / §2.4.1:
 *   - Minimum 2 images are MANDATORY — requests cannot be submitted without them
 *   - Video is optional
 *   - Media is submitted at time of initiating the return/exchange flow
 *
 * Exactly one of (returnOrderItemId, exchangeOrderItemId) is set — mutually exclusive.
 */
@Entity("v2_return_exchange_media")
@Index(["returnOrderItemId"])
@Index(["exchangeOrderItemId"])
export class V2ReturnExchangeMedia {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  // ─── Parent Reference (mutually exclusive) ────────────────────────────────
  @Column({ type: "uuid", nullable: true })
  returnOrderItemId: string;

  @Column({ type: "uuid", nullable: true })
  exchangeOrderItemId: string;

  @Column({ type: "uuid" })
  customerId: string;

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

  @Column({ type: "jsonb", nullable: true })
  metadata: Record<string, any>;

  @Column({ type: "boolean", default: false })
  isPrimary: boolean;

  @Column({ type: "smallint", default: 0 })
  sortOrder: number;

  @Column({ type: "boolean", default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
