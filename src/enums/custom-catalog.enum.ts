// ─────────────────────────────────────────────────────────────────────────────
// Custom Catalog Enums
// Source of truth for the Custom (made-to-order) catalog flow.
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Garment product type for a custom category.
 * Matches the seller-customization-flow UI options exactly.
 */
export enum CustomProductType {
  TOPWEAR = "Topwear",
  BOTTOMWEAR = "Bottomwear",
  TOP_AND_BOTTOMWEAR = "Top+Bottomwear",
}

/**
 * Target gender for a custom category.
 */
export enum CustomTargetGender {
  MEN = "Men",
  WOMEN = "Women",
}

/**
 * Lifecycle status of a custom category.
 */
export enum CustomCategoryStatus {
  DRAFT = "draft",
  ACTIVE = "active",
  INACTIVE = "inactive",
  ARCHIVED = "archived",
}

/**
 * Lifecycle status of a custom order item.
 * Separate from collection order flow — no shipment tracking for
 * made-to-order until it enters dispatch.
 */
export enum CustomOrderItemStatus {
  PENDING_CONFIRMATION = "pending_confirmation",
  CONFIRMED = "confirmed",
  IN_PRODUCTION = "in_production",
  QUALITY_CHECK = "quality_check",
  READY_TO_DISPATCH = "ready_to_dispatch",
  SHIPPED = "shipped",
  OUT_FOR_DELIVERY = "out_for_delivery",
  DELIVERED = "delivered",
  CANCELLED = "cancelled",
}
