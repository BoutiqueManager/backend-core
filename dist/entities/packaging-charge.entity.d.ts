/**
 * Per-category packaging cost + box dimensions for Shiprocket shipments.
 * One row per ProductCategories row (see product-categories.entity.ts).
 * Replaces the previously hardcoded PACKAGING_CHARGE_PER_ITEM constant
 * (customer-server/shiprocket.controller.ts) and the 4 duplicated 10×10×5
 * dimension blocks (customer-server/shiprocket.service.ts).
 *
 * Seeded with today's live hardcoded values (10×10×5 cm, ₹150) for every
 * category on migration — zero physical/deployment risk on day one. Tune
 * individual categories' real box sizes/prices later via direct DB updates,
 * no code change needed.
 *
 * If no row exists for a category (or the category is null/unmapped), the
 * lookup falls back to these same hardcoded defaults rather than throwing
 * — see ShiprocketService.getPackagingChargeForCategory.
 */
export declare class PackagingCharge {
    id: string;
    categoryId: string;
    /** Box length in cm, sent to Shiprocket on order creation. */
    boxLength: number;
    /** Box width in cm. */
    boxWidth: number;
    /** Box height in cm. */
    boxHeight: number;
    /** Customer-facing packaging charge per item, ₹. */
    price: number;
    createdAt: Date;
    updatedAt: Date;
}
