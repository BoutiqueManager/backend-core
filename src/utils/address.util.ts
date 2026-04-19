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
export function formatAddressLine(address: Address | null | undefined): string {
  if (!address) return "";
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
export function formatPhone(phone: string | null | undefined): string {
  if (!phone) return "";
  return `+91 ${phone.trim()}`;
}

/**
 * Returns a structured delivery details object from an address.
 * Used when creating orders.
 */
export function formatDeliveryDetails(address: Address | null | undefined): {
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
} {
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

export default {
  formatAddressLine,
  formatPhone,
  formatDeliveryDetails,
};
