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
  OrderItemStatusV2,
  ProductTypeV2,
  CancelledByV2,
} from "../../enums/order-v2.enum";
import { V2Order } from "./v2-order.entity";

@Entity("v2_order_items")
@Index(["orderId"])
@Index(["customerId", "status"])
@Index(["productId"])
@Index(["returnWindowClosesAt"])
@Index(["exchangeWindowClosesAt"])
export class V2OrderItem {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  /** e.g. OI-2026-00042-1 */
  @Index({ unique: true })
  @Column({ type: "varchar", length: 40, unique: true })
  orderItemId: string;

  // ─── Parent References ────────────────────────────────────────────────────
  @Column({ type: "uuid" })
  orderId: string;

  @ManyToOne(() => V2Order, (order) => order.orderItems, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "orderId" })
  order: V2Order;

  /** Denormalized — avoids join when querying by customer */
  @Column({ type: "uuid" })
  checkoutSessionId: string;

  @Column({ type: "uuid" })
  customerId: string;

  // ─── Product Snapshot (all captured at order time — no live joins needed) ─
  /** Cross-server reference to boutique-server products table */
  @Column({ type: "uuid" })
  productId: string;

  /** Stored for search; GIN index on this */
  @Column({ type: "varchar", length: 300 })
  productName: string;

  @Column({ type: "varchar", length: 100, nullable: true })
  productSku: string;

  /** Cross-server ref to boutique-server inventory table */
  //  Deprecated: inventoryId is no longer used for order processing but is kept for legacy orders and search indexing. New orders should rely on productSizeId and customizationOptions for inventory details.
  @Column({ type: "uuid", nullable: true })
  inventoryId: string;

  /** Cross-server ref to boutique-server product_sizes table */
  @Column({ type: "uuid", nullable: true })
  productSizeId: string;

  /** Cross-server ref to product_categories table */
  @Column({ type: "uuid", nullable: true })
  categoryId: string;

  /** Denormalized from parent order */
  @Column({ type: "uuid" })
  boutiqueId: string;

  @Column({ type: "varchar", length: 200 })
  boutiqueName: string;

  /** Cached cover image URL from product_media at order time */
  @Column({ type: "varchar", nullable: true })
  primaryImageUrl: string;

  @Column({ type: "enum", enum: ProductTypeV2 })
  productType: ProductTypeV2;

  // ─── Size & Customization ─────────────────────────────────────────────────
  /** e.g. "M", "XL", "32", "Free Size" */
  // @Deprecated: selectedSize is now stored in productSizeId for ready_to_ship items, and in customizationOptions for made_to_measure items. This column is kept for legacy orders and search indexing but should not be used for new orders.
  @Column({ type: "varchar", length: 50, nullable: true })
  selectedSize: string;

  /** Additional cost for this size from product_sizes.additionalPrice */
  @Column({ type: "decimal", precision: 10, scale: 2, default: 0 })
  selectedSizeAdditionalPrice: number;

  /** All customization option values selected by customer */
  @Column({ type: "jsonb", nullable: true })
  customizationOptions: Record<string, any>;

  /** FK to customer_measurements (same server) */
  @Column({ type: "uuid", nullable: true })
  measurementId: string;

  /**
   * Immutable copy of measurement values at order time.
   * Never changes even if customer later updates their measurements.
   */
  @Column({ type: "jsonb", nullable: true })
  measurementSnapshot: Record<string, any>;

  /** True if made_to_measure with custom measurements submitted */
  @Column({ type: "boolean", default: false })
  isCustomized: boolean;

  // ─── Per-Unit Pricing ─────────────────────────────────────────────────────
  /** Marked price / MRP — shown as strikethrough in UI */
  @Column({ type: "decimal", precision: 10, scale: 2 })
  mrp: number;

  /** mrp − offerPrice */
  @Column({ type: "decimal", precision: 10, scale: 2, default: 0 })
  discountAmount: number;

  /** Boutique's selling price per unit (after boutique discount) */
  @Column({ type: "decimal", precision: 10, scale: 2 })
  offerPrice: number;

  /** Discount applied via campaign/bulk discount */
  @Column({ type: "varchar", length: 50, nullable: true })
  campaignCode: string;

  /** Prorated share of coupon discount assigned to this item */
  @Column({ type: "decimal", precision: 10, scale: 2, default: 0 })
  couponDiscountPerItem: number;

  @Column({ type: "decimal", precision: 10, scale: 2, default: 0 })
  taxPerItem: number;

  /** offerPrice − couponDiscountPerItem + taxPerItem */
  @Column({ type: "decimal", precision: 10, scale: 2 })
  finalPricePerItem: number;

  // ─── Quantity & Line Totals ───────────────────────────────────────────────
  @Column({ type: "int", default: 1 })
  quantity: number;

  @Column({ type: "decimal", precision: 12, scale: 2 })
  totalMrp: number;

  @Column({ type: "decimal", precision: 12, scale: 2 })
  totalDiscount: number;

  @Column({ type: "decimal", precision: 12, scale: 2 })
  totalOfferPrice: number;

  @Column({ type: "decimal", precision: 12, scale: 2, default: 0 })
  totalCouponDiscount: number;

  @Column({ type: "decimal", precision: 12, scale: 2, default: 0 })
  totalTax: number;

  /** finalPricePerItem × quantity — the canonical amount for refund calculation */
  @Column({ type: "decimal", precision: 12, scale: 2 })
  totalFinalPrice: number;

  // ─── Per-Item Partial / Advance Payment ──────────────────────────────────
  /**
   * For made_to_measure items in a partial-payment order: the prorated advance
   * amount charged at checkout for this item.
   * For ready_to_ship or COD items this equals totalFinalPrice or 0 respectively.
   * Snapshot from frontend — never changes after order creation.
   */
  @Column({ type: "decimal", precision: 12, scale: 2, default: 0 })
  advancePaid: number;

  @Column({ type: "decimal", precision: 5, scale: 2, default: 0 })
  advancedPercentagePaid: number;

  /**
   * Balance still owed for this item after delivery.
   * totalFinalPrice − advancePaid. 0 for full-payment and COD items.
   */
  @Column({ type: "decimal", precision: 12, scale: 2, default: 0 })
  remainingAmount: number;

  @Column({ type: "text", nullable: true })
  customerNote: string;

  // ─── Item Status & Dates ──────────────────────────────────────────────────
  @Column({
    type: "enum",
    enum: OrderItemStatusV2,
    default: OrderItemStatusV2.NEW,
  })
  status: OrderItemStatusV2;

  @Column({ type: "timestamp", nullable: true })
  confirmedAt: Date;

  @Column({ type: "timestamp", nullable: true })
  shippedAt: Date;

  @Column({ type: "timestamp", nullable: true })
  outForDeliveryAt: Date;

  @Column({ type: "timestamp", nullable: true })
  deliveredAt: Date;

  /** Per-item estimated delivery date — may differ across items in the same order */
  @Column({ type: "date", nullable: true })
  estimatedDeliveryDate: Date;

  @Column({ type: "timestamp", nullable: true })
  cancelledAt: Date;

  @Column({ type: "enum", enum: CancelledByV2, nullable: true })
  cancelledBy: CancelledByV2;

  /**
   * Seller-provided reason — shown to customer as "Reason by Seller: ..."
   * Required when seller cancels per PRD §2A-1.
   */
  @Column({ type: "text", nullable: true })
  cancellationReason: string;

  // ─── Return / Exchange Eligibility Windows ────────────────────────────────
  /**
   * 3 days for made_to_measure, 15 days for ready_to_ship.
   * Set when item transitions to DELIVERED.
   */
  @Column({ type: "int", nullable: true })
  returnWindowDays: number;

  /** deliveredAt + returnWindowDays — used for eligibility check and UI message */
  @Column({ type: "timestamp", nullable: true })
  returnWindowClosesAt: Date;

  @Column({ type: "int", nullable: true })
  exchangeWindowDays: number;

  @Column({ type: "timestamp", nullable: true })
  exchangeWindowClosesAt: Date;

  // ─── Return / Exchange Quick-Lookup State ─────────────────────────────────
  /**
   * Denormalized return status for fast order-list queries.
   * NONE = no return request placed.
   */
  @Column({ type: "varchar", length: 50, nullable: true, default: "NONE" })
  returnStatus: string;

  @Column({ type: "varchar", length: 50, nullable: true, default: "NONE" })
  exchangeStatus: string;

  /** FK to v2_return_order_items — set when return request is placed */
  @Column({ type: "uuid", nullable: true })
  activeReturnOrderItemId: string;

  /** FK to v2_exchange_order_items — set when exchange request is placed */
  @Column({ type: "uuid", nullable: true })
  activeExchangeOrderItemId: string;

  // ─── Seller Shipping Media Expiry ─────────────────────────────────────────
  /**
   * PRD: shipping media should be stored only until the return/exchange window closes.
   * Set when item delivered = deliveredAt + max(returnWindowDays, exchangeWindowDays).
   */
  @Column({ type: "timestamp", nullable: true })
  shippingMediaExpiresAt: Date;

  // ─── Rating ───────────────────────────────────────────────────────────────
  @Column({ type: "boolean", default: false })
  isRated: boolean;

  /** FK to customer_reviews (boutique-server table, shared DB) */
  @Column({ type: "uuid", nullable: true })
  ratingId: string;

  @Column({ type: "timestamp", nullable: true })
  ratedAt: Date;

  // ─── Item-Level Tracking (for split shipments) ────────────────────────────
  @Column({ type: "varchar", nullable: true })
  trackingNumber: string;

  @Column({ type: "varchar", nullable: true })
  trackingCarrier: string;

  @Column({ type: "varchar", nullable: true })
  trackingUrl: string;

  @Column({ type: "boolean", default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
