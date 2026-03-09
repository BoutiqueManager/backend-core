import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  Index,
} from "typeorm";
import {
  ReturnOrderItemStatus,
  ReturnReasonCategory,
} from "../../enums/order-v2.enum";
import { V2ReturnOrder } from "./v2-return-order.entity";

/**
 * Individual item within a return order.
 * Captures the return reason, customer media (min 2 images), and pricing snapshot.
 */
@Entity("v2_return_order_items")
@Index(["returnOrderId"])
@Index(["originalOrderItemId"])
export class V2ReturnOrderItem {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "uuid" })
  returnOrderId: string;

  @ManyToOne(
    () => V2ReturnOrder,
    (returnOrder) => returnOrder.returnOrderItems,
    { onDelete: "CASCADE" },
  )
  @JoinColumn({ name: "returnOrderId" })
  returnOrder: V2ReturnOrder;

  /** The v2_order_item being returned */
  @Column({ type: "uuid" })
  originalOrderItemId: string;

  @Column({ type: "uuid" })
  orderId: string;

  // ─── Return Details ───────────────────────────────────────────────────────
  /** Mandatory — customer must provide a reason per PRD §2.3.1 */
  @Column({ type: "text" })
  returnReason: string;

  @Column({ type: "enum", enum: ReturnReasonCategory, nullable: true })
  returnReasonCategory: ReturnReasonCategory;

  // ─── Pricing Snapshot (from original order item at time of return request) ─
  @Column({ type: "decimal", precision: 10, scale: 2 })
  mrp: number;

  @Column({ type: "decimal", precision: 10, scale: 2 })
  offerPrice: number;

  @Column({ type: "decimal", precision: 10, scale: 2, default: 0 })
  couponDiscount: number;

  /** = totalFinalPrice from v2_order_items — this is the refund amount for this item */
  @Column({ type: "decimal", precision: 10, scale: 2 })
  finalPrice: number;

  @Column({ type: "int" })
  quantity: number;

  // ─── Status ───────────────────────────────────────────────────────────────
  @Column({
    type: "enum",
    enum: ReturnOrderItemStatus,
    default: ReturnOrderItemStatus.INITIATED,
  })
  status: ReturnOrderItemStatus;

  @Column({ type: "boolean", default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
