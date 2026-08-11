export declare enum UpiApp {
    GPAY = "gpay",
    PHONEPE = "phonepe",
    PAYTM = "paytm",
    OTHER = "other"
}
export declare const UpiAppDetails: Record<UpiApp, {
    label: string;
    deepLinkScheme: string;
    packageAndroid: string;
}>;
export declare enum CardBrand {
    VISA = "visa",
    MASTERCARD = "mastercard",
    AMEX = "amex",
    RUPAY = "rupay",
    MAESTRO = "maestro",
    DISCOVER = "discover",
    UNKNOWN = "unknown"
}
export declare const CardBrandDetails: Record<CardBrand, {
    label: string;
    prefix: string[];
    cvvLength: number;
}>;
/**
 * Detect card brand from the first few digits of the card number.
 */
export declare function detectCardBrand(cardNumber: string): CardBrand;
