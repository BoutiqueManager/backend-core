export interface Address {
    id?: string;
    fullName: string;
    phone: string;
    alternatePhone?: string;
    flatHouseNo: string;
    addressLine1: string;
    addressLine2?: string;
    area?: string;
    city: string;
    state: string;
    country: string;
    pincode?: string;
    postalCode?: string;
    landmark?: string;
    isDefault?: boolean;
}
export declare function formatAddressString(address: Address | null): string;
declare const _default: {
    formatAddressString: typeof formatAddressString;
};
export default _default;
