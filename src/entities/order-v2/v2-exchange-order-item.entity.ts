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
  ExchangeOrderItemStatus,
  ExchangeReasonCategory,
  ProductTypeV2,
} from "../../enums/order-v2.enum";
import { V2ExchangeOrder } from "./v2-exchange-order.entity";

/**
 * Individual item within an exchange order.
 * Captures both the original item being returned and the new item selected by customer.
 *
 * Exchange restrictions per PRD §1.2 and §3.3.5:
 *   - made_to_measure original → new item must be ready_to_ship from SAME boutique
 *   - ready_to_ship original → new item must be ready_to_ship (any boutique)
 *   - New item CANNOT be made_to_measure / customized
 *   - Size variant exchange only available for ready_to_ship originals
 *
 * Per PRD §3.3.4: coupon discounts are NOT applied on exchange orders.
 */
@Entity("v2_exchange_order_items")
@Index(["exchangeOrderId"])
@Index(["originalOrderItemId"])
export class V2ExchangeOrderItem {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "uuid" })
  exchangeOrderId: string;

  @ManyToOne(
    () => V2ExchangeOrder,
    (exchangeOrder) => exchangeOrder.exchangeOrderItems,
    { onDelete: "CASCADE" },
  )
  @JoinColumn({ name: "exchangeOrderId" })
  exchangeOrder: V2ExchangeOrder;

  /** The v2_order_item being exchanged */
  @Column({ type: "uuid" })
  originalOrderItemId: string;

  @Column({ type: "uuid" })
  orderId: string;

  // ─── Exchange Reason ──────────────────────────────────────────────────────
  /** Mandatory per PRD §2.4.1 */
  @Column({ type: "text" })
  exchangeReason: string;

  @Column({ type: "enum", enum: ExchangeReasonCategory, nullable: true })
  exchangeReasonCategory: ExchangeReasonCategory;

  // ─── Original Item Snapshot ───────────────────────────────────────────────
  @Column({ type: "uuid" })
  originalProductId: string;

  @Column({ type: "varchar", length: 300 })
  originalProductName: string;

  @Column({ type: "enum", enum: ProductTypeV2 })
  originalProductType: ProductTypeV2;

  @Column({ type: "varchar", length: 50, nullable: true })
  originalSize: string;

  @Column({ type: "varchar", nullable: true })
  originalPrimaryImageUrl: string;

  /** = totalFinalPrice from v2_order_items — used for price difference calculation */
  @Column({ type: "decimal", precision: 10, scale: 2 })
  originalFinalPrice: number;

  @Column({ type: "int" })
  originalQuantity: number;

  // ─── New Item Selected by Customer ────────────────────────────────────────
  /** Cross-server reference to boutique-server products table */
  @Column({ type: "uuid" })
  newProductId: string;

  @Column({ type: "varchar", length: 300 })
  newProductName: string;

  @Column({ type: "varchar", length: 100, nullable: true })
  newProductSku: string;

  @Column({ type: "uuid", nullable: true })
  newInventoryId: string;

  @Column({ type: "uuid", nullable: true })
  newProductSizeId: string;

  @Column({ type: "varchar", length: 50, nullable: true })
  newSize: string;

  @Column({ type: "varchar", nullable: true })
  newPrimaryImageUrl: string;

  /**
   * May differ from original boutique for ready_to_ship → ready_to_ship cross-boutique exchanges.
   * For made_to_measure originals, must equal original boutiqueId.
   */
  @Column({ type: "uuid" })
  newBoutiqueId: string;

  @Column({ type: "varchar", length: 200 })
  newBoutiqueName: string;

  /**
   * Always ready_to_ship per PRD §1.2.
   * made_to_measure / customized items cannot be exchange targets.
   */
  @Column({
    type: "enum",
    enum: ProductTypeV2,
    default: ProductTypeV2.READY_TO_SHIP,
  })
  newProductType: ProductTypeV2;

  @Column({ type: "decimal", precision: 10, scale: 2 })
  newMrp: number;

  @Column({ type: "decimal", precision: 10, scale: 2, default: 0 })
  newDiscountAmount: number;

  @Column({ type: "decimal", precision: 10, scale: 2 })
  newOfferPrice: number;

  @Column({ type: "int", default: 1 })
  newQuantity: number;

  // ─── Status ───────────────────────────────────────────────────────────────
  @Column({
    type: "enum",
    enum: ExchangeOrderItemStatus,
    default: ExchangeOrderItemStatus.INITIATED,
  })
  status: ExchangeOrderItemStatus;

  @Column({ type: "boolean", default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
