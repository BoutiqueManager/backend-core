export interface Address {
    id: string;
    userId: string;
    label?: string;
    fullName: string;
    phone: string;
    alternatePhone?: string;
    area?: string;
    flatHouseNo?: string;
    addressLine1: string;
    addressLine2?: string;
    city: string;
    state: string;
    country: string;
    postalCode: string;
    landmark?: string;
    addressType: "home" | "office" | "other";
    isDefault: boolean;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
}
/**
 * Formats all address parts into a single comma-separated string for display.
 * Order: flatHouseNo → addressLine1 → addressLine2 → area → landmark → city → state → postalCode
 */
export declare function formatAddressLine(address: Address | null | undefined): string;
/**
 * Formats a phone number with the +91 country code prefix.
 */
export declare function formatPhone(phone: string | null | undefined): string;
/**
 * Returns a structured delivery details object from an address.
 * Used when creating orders.
 */
export declare function formatDeliveryDetails(address: Address | null | undefined): {
    fullName: string;
    phone: string;
    alternatePhone: string;
    flatHouseNo: string;
    addressLine1: string;
    addressLine2: string;
    area: string;
    landmark: string;
    city: string;
    state: string;
    country: string;
    postalCode: string;
};
declare const _default: {
    formatAddressLine: typeof formatAddressLine;
    formatPhone: typeof formatPhone;
    formatDeliveryDetails: typeof formatDeliveryDetails;
};
export default _default;
