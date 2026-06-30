export type RawOrderItem = {
    offeredPrice: number;
    actualPrice?: number;
    quantity: number;
    campaignDiscount?: number;
};
export type ItemTotals = {
    tax: number;
    campaignDiscount: number;
    totalPrice: number;
    subtotal: number;
    totalCost: number;
    totalRevenue: number;
};
export type OrderTotals = {
    totalCampaignDiscount: number;
    totalRevenue: number;
    totalCost: number;
};
export declare function calculateItemTotals(item: RawOrderItem): ItemTotals;
export declare function calculateOrderTotals(items: RawOrderItem[], shippingCharges: number): OrderTotals;
declare const _default: {
    calculateItemTotals: typeof calculateItemTotals;
    calculateOrderTotals: typeof calculateOrderTotals;
};
export default _default;
