import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
} from "typeorm";

/**
 * Per-boutique configuration for order management.
 * Owned and managed by the boutique seller via boutique-server.
 * Read by customer-server when creating orders to determine advance payment %.
 *
 * If no record exists for a boutique, system defaults apply.
 * This entity is shared between both servers via backend-core.
 */
@Entity("v2_boutique_order_settings")
export class V2BoutiqueOrderSettings {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  /** Cross-server ref to boutique-server boutique.id */
  @Index({ unique: true })
  @Column({ type: "uuid", unique: true })
  boutiqueId: string;

  /**
   * Percentage of order total required as advance payment for made_to_measure items.
   * e.g. 30 = customer pays 30% upfront, 70% after all items are delivered.
   * Per PRD: advance % is set at boutique level (fixed % per boutique).
   */
  @Column({ type: "decimal", precision: 5, scale: 2, default: 30 })
  advancePaymentPercentage: number;

  /** Whether this boutique accepts Cash on Delivery */
  @Column({ type: "boolean", default: false })
  acceptsCod: boolean;

  /** Minimum order value for COD eligibility (null = no minimum) */
  @Column({ type: "decimal", precision: 10, scale: 2, nullable: true })
  codMinOrderValue: number;

  @Column({ type: "boolean", default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
