import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  Index,
} from "typeorm";
import { OrderEventTypeV2, EventActorTypeV2 } from "../../enums/order-v2.enum";

/**
 * Append-only audit trail for every state change on an order item.
 * Powers the timeline displayed on both customer app and seller app.
 * Records are NEVER updated — only inserted.
 */
@Entity("v2_order_item_events")
@Index(["orderItemId", "occurredAt"])
@Index(["orderId"])
@Index(["customerId"])
@Index(["boutiqueId"])
export class V2OrderItemEvent {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "uuid" })
  orderItemId: string;

  /** Denormalized for efficient order-level timeline queries */
  @Column({ type: "uuid" })
  orderId: string;

  @Column({ type: "uuid" })
  customerId: string;

  @Column({ type: "uuid" })
  boutiqueId: string;

  @Column({ type: "enum", enum: OrderEventTypeV2 })
  eventType: OrderEventTypeV2;

  /** Status value before this event (null for first event) */
  @Column({ type: "varchar", length: 60, nullable: true })
  fromStatus: string;

  /** Status value after this event */
  @Column({ type: "varchar", length: 60, nullable: true })
  toStatus: string;

  /** Human-readable description displayed in timeline UI */
  @Column({ type: "text" })
  description: string;

  /** Display title for timeline UI */
  @Column({ type: "varchar", length: 100, nullable: true })
  title: string;

  /** Icon for timeline UI (emoji or icon name) */
  @Column({ type: "varchar", length: 20, nullable: true })
  icon: string;

  /** Color hex code for timeline UI */
  @Column({ type: "varchar", length: 10, nullable: true })
  color: string;

  @Column({ type: "enum", enum: EventActorTypeV2 })
  actorType: EventActorTypeV2;

  /** UUID of the customer/seller/logistics partner who triggered this event */
  @Column({ type: "uuid", nullable: true })
  actorId: string;

  @Column({ type: "varchar", length: 200, nullable: true })
  actorName: string;

  /**
   * Extra structured data relevant to this event type.
   * Examples:
   *   STATUS_CHANGED → { previousStatus, newStatus }
   *   ITEM_SHIPPED   → { trackingNumber, carrier, trackingUrl }
   *   ITEM_CANCELLED → { reason, cancelledBy }
   *   REFUND_INITIATED → { refundId, amount, destination }
   */
  @Column({ type: "jsonb", nullable: true })
  metadata: Record<string, any>;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  occurredAt: Date;

  /** No updatedAt — this table is append-only */
  @CreateDateColumn()
  createdAt: Date;
}
