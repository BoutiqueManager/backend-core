import { OrderStatusV2 } from "../enums/order-v2.enum";

//////////////////////////////////////
// Orders V2 Types
//////////////////////////////////////

export enum OrdersV2TimePeriod {
  LAST_WEEK = "last_week",
  LAST_1_MONTH = "last_1_month",
  LAST_3_MONTHS = "last_3_months",
  LAST_6_MONTHS = "last_6_months",
  THIS_YEAR = "this_year",
  CUSTOM = "custom",
}

export interface OrdersV2Filter {
  status?: OrderStatusV2 | OrderStatusV2[];
  timePeriod?: OrdersV2TimePeriod;
  startDate?: string;
  endDate?: string;
  search?: string;
  page?: number;
  limit?: number;
}

export interface OrderV2ItemSummary {
  id: string;
  orderItemId: string;
  productId: string;
  productName: string;
  productSku?: string | null;
  primaryImageUrl?: string | null;
  productType?: string | null;
  isCustomized?: boolean;
  selectedSize?: string | null;
  customizationOptions?: Record<string, any> | null;
  quantity: number;
  pricing: {
    mrp: number;
    discountAmount: number;
    offerPrice: number;
    couponDiscountPerItem: number;
    taxPerItem: number;
    finalPricePerItem: number;
    totalFinalPrice: number;
  };
  status: string;
  estimatedDeliveryDate?: string | null;
  deliveredAt?: string | null;
  cancelledAt?: string | null;
  cancelledBy?: string | null;
  cancellationReason?: string | null;
  tracking?: {
    trackingNumber?: string | null;
    trackingCarrier?: string | null;
    trackingUrl?: string | null;
  } | null;
  returnStatus?: string | null;
  exchangeStatus?: string | null;
  returnWindow?: {
    windowDays: number;
    closesAt: string;
    isOpen: boolean;
  } | null;
  exchangeWindow?: {
    windowDays: number;
    closesAt: string;
    isOpen: boolean;
  } | null;
  isRated?: boolean;
  ratingId?: string | null;
}

export interface OrderV2Summary {
  id: string;
  orderId: string;
  orderDate: string;
  status: string;
  paymentStatus?: string | null;
  paymentMethod?: string | null;
  boutiqueId: string;
  boutiqueName: string;
  boutiqueLogoUrl?: string | null;
  pricing: {
    subtotalMrp: number;
    totalDiscount: number;
    subtotalOfferPrice: number;
    totalCouponDiscount: number;
    shippingCharges: number;
    totalTax: number;
    grandTotal: number;
  };
  partialPayment?: {
    advancePercentage: number;
    advancePaid: number;
    remainingAmount: number;
    remainingPaidAt?: string | null;
  } | null;
  estimatedDeliveryDate?: string | null;
  deliveredAt?: string | null;
  cancelledAt?: string | null;
  itemCount: number;
  items: OrderV2ItemSummary[];
}

export interface OrdersV2Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface OrdersV2ListResponse {
  data: OrderV2Summary[];
  pagination: OrdersV2Pagination;
  filters: {
    status?: OrdersV2Filter["status"];
    timePeriod?: OrdersV2Filter["timePeriod"];
  };
}

///////////////////////////////////////
// Order V2 Details Types
///////////////////////////////////////

export interface OrderItemDetailV2 {
  id: string;
  orderItemId: string;
  productId: string;
  productName: string;
  productSku: string;
  primaryImageUrl: string;
  productType: string;
  isCustomized: boolean;
  selectedSize: string | null;
  customizationOptions: Record<string, any> | null;
  quantity: number;
  pricing: {
    mrp: number;
    discountAmount: number;
    offerPrice: number;
    couponDiscountPerItem: number;
    taxPerItem: number;
    finalPricePerItem: number;
    totalFinalPrice: number;
    campaignCode: string | null;
  };
  status: string;
  estimatedDeliveryDate: string | null;
  deliveredAt: string | null;
  cancelledAt: string | null;
  cancelledBy: string | null;
  cancellationReason: string | null;
  tracking: Record<string, any> | null;
  returnStatus: string | null;
  exchangeStatus: string | null;
  returnWindow: Record<string, any> | null;
  exchangeWindow: Record<string, any> | null;
  isRated: boolean;
  ratingId: string | null;
  customerNote: string;
  itemActions: {
    canCancel: Boolean,
    canReturn: Boolean,
    canExchange: Boolean,
    canReview: Boolean,
  };
}

export interface OrderDetailAddressV2 {
  id: string;
  fullName: string;
  phone: string;
  alternativePhone?: string | null;

  flatHouseNo: string;
  addressLine1: string;
  addressLine2: string;

  area: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

export interface OrderDetailV2 {
  id: string;
  orderId: string;
  orderDate: string;
  status: string;
  paymentStatus: string;
  paymentMethod: string;
  boutiqueId: string;
  boutiqueName: string;
  boutiqueLogoUrl: string | null;
  pricing: {
    subtotalMrp: number;
    totalDiscount: number;
    subtotalOfferPrice: number;
    totalCouponDiscount: number;
    shippingCharges: number;
    totalTax: number;
    grandTotal: number;
  };
  partialPayment?: {
    advancePercentage: number;
    advancePaid: number;
    remainingAmount: number;
    remainingPaidAt: string | null;
  } | null;
  estimatedDeliveryDate: string | null;
  deliveredAt: string | null;
  cancelledAt: string | null;
  itemCount: number;
  items: Array<OrderItemDetailV2>;
  shippingAddress: OrderDetailAddressV2;
  billingAddress: OrderDetailAddressV2;
  trackingInfo: Record<string, any> | null;
  appliedCoupons: Array<Record<string, any>>;
  cancellationInfo: Record<string, any> | null;
  hasCustomizedItems: boolean;
  hasReadyToShipItems: boolean;
  customerNote: string | null;
  checkoutSessionId: string;
  createdAt: string;
}

export interface OrderDetailV2Response {
  success: boolean;
  message: string;
  data: OrderDetailV2;
}
