const TAX_RATE = 0.18;

export type RawOrderItem = {
    offeredPrice: number;
    actualPrice?: number;
    quantity: number;
    campaignDiscount?: number;
};

export type ItemTotals = {
    tax: number;
    campaignDiscount: number;
    totalPrice: number; // offeredPrice * quantity
    subtotal: number; // totalPrice + tax (kept for compatibility)
    totalCost: number; // totalPrice + tax - discount
    totalRevenue: number;
};

export type OrderTotals = {
    totalCampaignDiscount: number,
    totalRevenue: number,
    totalCost: number
};

export function calculateItemTotals(item: RawOrderItem): ItemTotals {
    const offered = Number(item.offeredPrice) || 0;
    const actual = Number(item.actualPrice) || 0;
    const quantity = Number(item.quantity) || 0;
    const campaignDiscount = Number(item.campaignDiscount) || 0;

    // Keep tax calculation consistent with existing code (tax calculated from unit offeredPrice)
    const tax = 0;
    const totalPrice = offered * quantity;
    const subtotal = totalPrice + tax;
    const totalCost = totalPrice + tax - campaignDiscount;
    const totalRevenue = totalCost;

    return {
        tax,
        campaignDiscount: campaignDiscount,
        totalPrice,
        subtotal,
        totalCost,
        totalRevenue,
    };
}


export function calculateOrderTotals(
    items: RawOrderItem[],
    shippingCharges: number,
): OrderTotals {
    let subtotal = 0;
    let totalPrice = 0;
    let totalCampaignDiscount = 0;
    let totalTax = 0;
    let totalRevenue = 0;
    let totalCost = 0;

    items.forEach((item) => {
        const itemTotals = calculateItemTotals(item);
        totalCost += itemTotals.totalCost;
        totalRevenue += itemTotals.totalRevenue;
        totalCampaignDiscount += itemTotals.campaignDiscount;
    }
    );

    return {
        totalCampaignDiscount,
        totalRevenue,
        totalCost

    };
}

export default {
    calculateItemTotals,
    calculateOrderTotals
};