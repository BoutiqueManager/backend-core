"use strict";
//////////////////////////////////////
// Boutique Settings Types
//////////////////////////////////////
Object.defineProperty(exports, "__esModule", { value: true });
exports.DEFAULT_BOUTIQUE_SETTINGS = exports.PayoutSchedule = void 0;
var PayoutSchedule;
(function (PayoutSchedule) {
    PayoutSchedule["WEEKLY"] = "weekly";
    PayoutSchedule["BI_WEEKLY"] = "bi_weekly";
    PayoutSchedule["MONTHLY"] = "monthly";
})(PayoutSchedule || (exports.PayoutSchedule = PayoutSchedule = {}));
exports.DEFAULT_BOUTIQUE_SETTINGS = {
    advancePaymentPercentage: 50,
    payoutSchedule: PayoutSchedule.MONTHLY,
    acceptsCod: false,
    returnWindowDays: 7,
    notificationPreferences: {
        email: true,
        whatsapp: false,
    },
};
//# sourceMappingURL=boutique-settings.types.js.map