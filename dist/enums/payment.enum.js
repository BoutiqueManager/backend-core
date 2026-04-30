"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CardBrandDetails = exports.CardBrand = exports.UpiAppDetails = exports.UpiApp = void 0;
exports.detectCardBrand = detectCardBrand;
var UpiApp;
(function (UpiApp) {
    UpiApp["GPAY"] = "gpay";
    UpiApp["PHONEPE"] = "phonepe";
    UpiApp["PAYTM"] = "paytm";
    UpiApp["OTHER"] = "other";
})(UpiApp || (exports.UpiApp = UpiApp = {}));
exports.UpiAppDetails = {
    [UpiApp.GPAY]: {
        label: "Google Pay",
        deepLinkScheme: "gpay://upi/pay",
        packageAndroid: "com.google.android.apps.nbu.paisa.user",
    },
    [UpiApp.PHONEPE]: {
        label: "PhonePe",
        deepLinkScheme: "phonepe://pay",
        packageAndroid: "com.phonepe.app",
    },
    [UpiApp.PAYTM]: {
        label: "Paytm",
        deepLinkScheme: "paytmmp://pay",
        packageAndroid: "net.one97.paytm",
    },
    [UpiApp.OTHER]: {
        label: "Other UPI App",
        deepLinkScheme: "upi://pay",
        packageAndroid: "",
    },
};
var CardBrand;
(function (CardBrand) {
    CardBrand["VISA"] = "visa";
    CardBrand["MASTERCARD"] = "mastercard";
    CardBrand["AMEX"] = "amex";
    CardBrand["RUPAY"] = "rupay";
    CardBrand["MAESTRO"] = "maestro";
    CardBrand["DISCOVER"] = "discover";
    CardBrand["UNKNOWN"] = "unknown";
})(CardBrand || (exports.CardBrand = CardBrand = {}));
exports.CardBrandDetails = {
    [CardBrand.VISA]: {
        label: "Visa",
        prefix: ["4"],
        cvvLength: 3,
    },
    [CardBrand.MASTERCARD]: {
        label: "Mastercard",
        prefix: ["51", "52", "53", "54", "55", "22", "23", "24", "25", "26", "27"],
        cvvLength: 3,
    },
    [CardBrand.AMEX]: {
        label: "American Express",
        prefix: ["34", "37"],
        cvvLength: 4,
    },
    [CardBrand.RUPAY]: {
        label: "RuPay",
        prefix: ["60", "65", "81", "82", "508"],
        cvvLength: 3,
    },
    [CardBrand.MAESTRO]: {
        label: "Maestro",
        prefix: ["6304", "6759", "6761", "6762", "6763"],
        cvvLength: 3,
    },
    [CardBrand.DISCOVER]: {
        label: "Discover",
        prefix: ["6011", "622", "64", "65"],
        cvvLength: 3,
    },
    [CardBrand.UNKNOWN]: {
        label: "Unknown",
        prefix: [],
        cvvLength: 3,
    },
};
/**
 * Detect card brand from the first few digits of the card number.
 */
function detectCardBrand(cardNumber) {
    const cleaned = cardNumber.replace(/\s/g, "");
    if (cleaned.startsWith("4"))
        return CardBrand.VISA;
    if (/^3[47]/.test(cleaned))
        return CardBrand.AMEX;
    if (/^6304|6759|676[123]/.test(cleaned))
        return CardBrand.MAESTRO;
    if (/^(508|60|65|81|82)/.test(cleaned))
        return CardBrand.RUPAY;
    if (/^6011|622|6[45]/.test(cleaned))
        return CardBrand.DISCOVER;
    if (/^5[1-5]|^2[2-7]/.test(cleaned))
        return CardBrand.MASTERCARD;
    return CardBrand.UNKNOWN;
}
//# sourceMappingURL=payment.enum.js.map