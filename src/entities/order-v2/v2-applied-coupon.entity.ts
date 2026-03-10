import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  Index,
} from "typeorm";
import { V2Order } from "./v2-order.entity";

/**
 * Coupons applied to a specific v2_order.
 * Per PRD: coupons are NEVER applicable on return or exchange orders.
 * One row per coupon per order (multiple coupons = multiple rows).
 */
@Entity("v2_applied_coupons")
@Index(["orderId"])
@Index(["checkoutSessionId"])
export class V2AppliedCoupon {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "uuid" })
  orderId: string;

  @ManyToOne(() => V2Order, (order) => order.appliedCoupons, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "orderId" })
  order: V2Order;

  @Column({ type: "uuid" })
  checkoutSessionId: string;

  @Column({ type: "uuid" })
  customerId: string;

  @Column({ type: "varchar", length: 50 })
  couponCode: string;

  /**
   * Cross-server ref to boutique-server campaigns.id
   * No FK constraint — cross-server reference
   */
  @Column({ type: "uuid", nullable: true })
  couponId: string;

  @Column({ type: "varchar", length: 50, nullable: true })
  couponType: string;

  /** Actual ₹ amount discounted for this order by this coupon */
  @Column({ type: "decimal", precision: 10, scale: 2 })
  discountValue: number;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  appliedAt: Date;

  @CreateDateColumn()
  createdAt: Date;
}
