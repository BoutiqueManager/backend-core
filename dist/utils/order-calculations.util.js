"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateItemTotals = calculateItemTotals;
exports.calculateOrderTotals = calculateOrderTotals;
const TAX_RATE = 0.18;
function calculateItemTotals(item) {
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
function calculateOrderTotals(items, shippingCharges) {
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
    });
    return {
        totalCampaignDiscount,
        totalRevenue,
        totalCost,
    };
}
exports.default = {
    calculateItemTotals,
    calculateOrderTotals,
};
//# sourceMappingURL=order-calculations.util.js.map