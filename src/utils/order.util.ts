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
  postalCode?: string; // Alias for pincode

  landmark?: string;
  isDefault?: boolean;
}

export function formatAddressString(address: Address | null): string {
  if (!address) return "";
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

export default {
  formatAddressString,
};
