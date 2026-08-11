/**
 * Boutique seller settings for payment, returns, and notifications.
 * Owned and managed by the boutique seller via boutique-server.
 * Read by customer-server when creating orders to determine payment policies.
 *
 * If no record exists for a boutique, system defaults apply.
 * This entity is shared between both servers via backend-core.
 */
export declare class BoutiqueSettings {
    id: string;
    boutiqueId: string;
    /**
     * Percentage of order total required as advance payment for made_to_measure items.
     * e.g. 30 = customer pays 30% upfront, 70% after all items are delivered.
     */
    advancePaymentPercentage: number;
    /**
     * Percentage of order amount to be paid to seller after delivery (before full completion).
     * e.g. 70 = seller receives 70% after delivery, remaining 30% after return window closes.
     */
    partialPayoutPercentage: number;
    /**
     * When payouts are processed to the seller.
     */
    payoutSchedule: "immediate" | "weekly" | "bi_weekly" | "monthly";
    /**
     * Minimum amount before payout is released to seller.
     */
    minimumPayoutThreshold: number;
    /**
     * Payment methods accepted by this boutique.
     */
    acceptedPaymentMethods: string[];
    /**
     * Whether this boutique accepts Cash on Delivery.
     */
    acceptsCod: boolean;
    /**
     * Minimum order value for COD eligibility (null = no minimum).
     */
    codMinOrderValue: number;
    /**
     * Number of days customers can return items after delivery.
     */
    returnWindowDays: number;
    /**
     * Number of days customers can exchange items after delivery.
     */
    exchangeWindowDays: number;
    /**
     * Who pays for return shipping.
     */
    returnShippingFeeResponsibility: "seller" | "customer" | "split";
    /**
     * Percentage fee charged for returns (if any).
     */
    restockingFeePercentage: number;
    /**
     * Product categories that cannot be returned.
     */
    nonReturnableCategories: string[];
    /**
     * Notification preferences for different channels.
     */
    notificationPreferences: {
        email: boolean;
        sms: boolean;
        push: boolean;
        whatsapp: boolean;
    };
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}
