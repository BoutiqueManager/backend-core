"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatAddressString = formatAddressString;
function formatAddressString(address) {
    if (!address)
        return "";
    const parts = [
        address.flatHouseNo,
        address.addressLine1,
        address.addressLine2,
        address.area,
        address.city,
        address.state,
        address.pincode || address.postalCode,
        address.landmark,
    ];
    return parts.filter(Boolean).join(", ");
}
exports.default = {
    formatAddressString,
};
//# sourceMappingURL=order.util.js.map