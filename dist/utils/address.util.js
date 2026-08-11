"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatAddressLine = formatAddressLine;
exports.formatPhone = formatPhone;
exports.formatDeliveryDetails = formatDeliveryDetails;
/**
 * Formats all address parts into a single comma-separated string for display.
 * Order: flatHouseNo → addressLine1 → addressLine2 → area → landmark → city → state → postalCode
 */
function formatAddressLine(address) {
    if (!address)
        return "";
    return [
        address.flatHouseNo,
        address.addressLine1,
        address.addressLine2,
        address.area,
        address.landmark,
        address.city,
        address.state,
        address.postalCode,
    ]
        .filter(Boolean)
        .join(", ");
}
/**
 * Formats a phone number with the +91 country code prefix.
 */
function formatPhone(phone) {
    if (!phone)
        return "";
    return `+91 ${phone.trim()}`;
}
/**
 * Returns a structured delivery details object from an address.
 * Used when creating orders.
 */
function formatDeliveryDetails(address) {
    if (!address) {
        return {
            fullName: "",
            phone: "",
            alternatePhone: "",
            flatHouseNo: "",
            addressLine1: "",
            addressLine2: "",
            area: "",
            landmark: "",
            city: "",
            state: "",
            country: "",
            postalCode: "",
        };
    }
    return {
        fullName: address.fullName || "",
        phone: address.phone || "",
        alternatePhone: address.alternatePhone || "",
        flatHouseNo: address.flatHouseNo || "",
        addressLine1: address.addressLine1 || "",
        addressLine2: address.addressLine2 || "",
        area: address.area || "",
        landmark: address.landmark || "",
        city: address.city || "",
        state: address.state || "",
        country: address.country || "",
        postalCode: address.postalCode || "",
    };
}
exports.default = {
    formatAddressLine,
    formatPhone,
    formatDeliveryDetails,
};
//# sourceMappingURL=address.util.js.map