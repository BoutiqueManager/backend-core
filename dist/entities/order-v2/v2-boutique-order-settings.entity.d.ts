/**
 * Per-boutique configuration for order management.
 * Owned and managed by the boutique seller via boutique-server.
 * Read by customer-server when creating orders to determine advance payment %.
 *
 * If no record exists for a boutique, system defaults apply.
 * This entity is shared between both servers via backend-core.
 */
export declare class V2BoutiqueOrderSettings {
    id: string;
    /** Cross-server ref to boutique-server boutique.id */
    boutiqueId: string;
    /**
     * Percentage of order total required as advance payment for made_to_measure items.
     * e.g. 30 = customer pays 30% upfront, 70% after all items are delivered.
     * Per PRD: advance % is set at boutique level (fixed % per boutique).
     */
    advancePaymentPercentage: number;
    /** Whether this boutique accepts Cash on Delivery */
    acceptsCod: boolean;
    /** Minimum order value for COD eligibility (null = no minimum) */
    codMinOrderValue: number;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}
