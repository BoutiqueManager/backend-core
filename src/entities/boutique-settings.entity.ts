import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
} from "typeorm";

/**
 * Boutique seller settings for payment, returns, and notifications.
 * Owned and managed by the boutique seller via boutique-server.
 * Read by customer-server when creating orders to determine payment policies.
 *
 * If no record exists for a boutique, system defaults apply.
 * This entity is shared between both servers via backend-core.
 */
@Entity("boutique_settings")
export class BoutiqueSettings {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Index({ unique: true })
  @Column({ type: "uuid", unique: true })
  boutiqueId: string;

  // ==================== Payment & Payout ====================

  /**
   * Percentage of order total required as advance payment for made_to_measure items.
   * e.g. 30 = customer pays 30% upfront, 70% after all items are delivered.
   */
  @Column({ type: "decimal", precision: 5, scale: 2, default: 30 })
  advancePaymentPercentage: number;

  /**
   * Percentage of order amount to be paid to seller after delivery (before full completion).
   * e.g. 70 = seller receives 70% after delivery, remaining 30% after return window closes.
   */
  @Column({ type: "decimal", precision: 5, scale: 2, default: 70 })
  partialPayoutPercentage: number;

  /**
   * When payouts are processed to the seller.
   */
  @Column({
    type: "enum",
    enum: ["immediate", "weekly", "bi_weekly", "monthly"],
    default: "weekly",
  })
  payoutSchedule: "immediate" | "weekly" | "bi_weekly" | "monthly";

  /**
   * Minimum amount before payout is released to seller.
   */
  @Column({ type: "decimal", precision: 10, scale: 2, default: 1000 })
  minimumPayoutThreshold: number;

  /**
   * Payment methods accepted by this boutique.
   */
  @Column({ type: "simple-array", default: ["upi", "cards"] })
  acceptedPaymentMethods: string[];

  /**
   * Whether this boutique accepts Cash on Delivery.
   */
  @Column({ type: "boolean", default: false })
  acceptsCod: boolean;

  /**
   * Minimum order value for COD eligibility (null = no minimum).
   */
  @Column({ type: "decimal", precision: 10, scale: 2, nullable: true })
  codMinOrderValue: number;

  // ==================== Return & Exchange Policy ====================

  /**
   * Number of days customers can return items after delivery.
   */
  @Column({ type: "int", default: 7 })
  returnWindowDays: number;

  /**
   * Number of days customers can exchange items after delivery.
   */
  @Column({ type: "int", default: 14 })
  exchangeWindowDays: number;

  /**
   * Who pays for return shipping.
   */
  @Column({
    type: "enum",
    enum: ["seller", "customer", "split"],
    default: "customer",
  })
  returnShippingFeeResponsibility: "seller" | "customer" | "split";

  /**
   * Percentage fee charged for returns (if any).
   */
  @Column({ type: "decimal", precision: 5, scale: 2, default: 0 })
  restockingFeePercentage: number;

  /**
   * Product categories that cannot be returned.
   */
  @Column({ type: "simple-array", nullable: true })
  nonReturnableCategories: string[];

  // ==================== Notification Preferences ====================

  /**
   * Notification preferences for different channels.
   */
  @Column({ type: "json", default: {} })
  notificationPreferences: {
    email: boolean;
    sms: boolean;
    push: boolean;
    whatsapp: boolean;
  };

  @Column({ type: "boolean", default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
