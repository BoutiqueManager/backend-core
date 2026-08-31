import {
  ORDER_ITEM_STATUS_DISPLAY_NAMES,
  OrderItemStatusV2,
} from "../enums/order-v2.enum";

/**
 * Minimal semantic color palette for order item statuses.
 * Grouped by lifecycle phase — use as few colors as possible for clarity.
 *
 *  Amber   #F59E0B — Pending / New
 *  Blue    #3B82F6 — Processing / In progress
 *  Indigo  #6366F1 — In transit (shipped / out for delivery)
 *  Green   #22C55E — Success (delivered)
 *  Gray    #6B7280 — Terminal negative (cancelled / rejected)
 *  Orange  #F97316 — Return lifecycle
 *  Purple  #8B5CF6 — Exchange lifecycle
 *  Teal    #10B981 — Financial resolution (refund)
 */
const STATUS_COLORS = {
  NEW: "#F59E0B",
  IN_PROGRESS: "#3B82F6",
  PICKUP: "#3B82F6",
  IN_TRANSIT: "#6366F1",
  DELIVERED: "#22C55E",
  CANCELLED: "#6B7280",
  RETURN: "#F97316",
  EXCHANGE: "#8B5CF6",
  REFUND: "#10B981",
} as const;

/**
 * Icon names are platform-agnostic string keys.
 * Map them to your icon library in each app:
 *   MaterialIcons / Ionicons / FontAwesome etc.
 *
 * These match @expo/vector-icons MaterialIcons naming.
 */
export type OrderItemStatusIconName =
  | "pending"
  | "schedule"
  | "local-shipping"
  | "check-circle"
  | "cancel"
  | "undo"
  | "swap-horiz"
  | "account-balance-wallet"
  | "info";

export interface OrderItemStatusUI {
  color: string;
  icon: OrderItemStatusIconName;
  displayName: string;
  isDelivered: boolean;
}

export const ORDER_ITEM_STATUS_COLORS: Record<OrderItemStatusV2, string> = {
  [OrderItemStatusV2.NEW]: STATUS_COLORS.NEW,
  [OrderItemStatusV2.IN_PROGRESS]: STATUS_COLORS.IN_PROGRESS,
  [OrderItemStatusV2.SCHEDULED_PICKUP]: STATUS_COLORS.PICKUP,
  [OrderItemStatusV2.PICKUP_SCHEDULED]: STATUS_COLORS.PICKUP,
  [OrderItemStatusV2.SHIPPED]: STATUS_COLORS.IN_TRANSIT,
  [OrderItemStatusV2.OUT_FOR_DELIVERY]: STATUS_COLORS.IN_TRANSIT,
  [OrderItemStatusV2.DELIVERED]: STATUS_COLORS.DELIVERED,
  [OrderItemStatusV2.CANCELLED]: STATUS_COLORS.CANCELLED,
  [OrderItemStatusV2.RTO_INITIATED]: STATUS_COLORS.RETURN,
  [OrderItemStatusV2.RTO_DELIVERED]: STATUS_COLORS.RETURN,
  [OrderItemStatusV2.RETURN_INITIATED]: STATUS_COLORS.RETURN,
  [OrderItemStatusV2.RETURN_PICKUP_SCHEDULED]: STATUS_COLORS.RETURN,
  [OrderItemStatusV2.RETURN_PICKED_UP]: STATUS_COLORS.RETURN,
  [OrderItemStatusV2.RETURN_IN_TRANSIT]: STATUS_COLORS.RETURN,
  [OrderItemStatusV2.RETURN_RECEIVED_BY_SELLER]: STATUS_COLORS.RETURN,
  [OrderItemStatusV2.RETURNED]: STATUS_COLORS.RETURN,
  [OrderItemStatusV2.RETURN_REJECTED]: STATUS_COLORS.CANCELLED,
  [OrderItemStatusV2.EXCHANGE_INITIATED]: STATUS_COLORS.EXCHANGE,
  [OrderItemStatusV2.EXCHANGE_PICKUP_SCHEDULED]: STATUS_COLORS.EXCHANGE,
  [OrderItemStatusV2.EXCHANGE_PICKED_UP]: STATUS_COLORS.EXCHANGE,
  [OrderItemStatusV2.EXCHANGE_IN_TRANSIT]: STATUS_COLORS.EXCHANGE,
  [OrderItemStatusV2.EXCHANGE_RECEIVED_BY_SELLER]: STATUS_COLORS.EXCHANGE,
  [OrderItemStatusV2.EXCHANGE_ORDER_PLACED]: STATUS_COLORS.EXCHANGE,
  [OrderItemStatusV2.EXCHANGE_SHIPPED]: STATUS_COLORS.EXCHANGE,
  [OrderItemStatusV2.EXCHANGE_DELIVERED]: STATUS_COLORS.DELIVERED,
  [OrderItemStatusV2.EXCHANGED]: STATUS_COLORS.EXCHANGE,
  [OrderItemStatusV2.EXCHANGE_REJECTED]: STATUS_COLORS.CANCELLED,
  [OrderItemStatusV2.REFUND_INITIATED]: STATUS_COLORS.REFUND,
  [OrderItemStatusV2.REFUND_CREDITED]: STATUS_COLORS.REFUND,
  [OrderItemStatusV2.REFUND_FAILED]: STATUS_COLORS.CANCELLED,
};

export const ORDER_ITEM_STATUS_ICONS: Record<
  OrderItemStatusV2,
  OrderItemStatusIconName
> = {
  [OrderItemStatusV2.NEW]: "pending",
  [OrderItemStatusV2.IN_PROGRESS]: "schedule",
  [OrderItemStatusV2.SCHEDULED_PICKUP]: "schedule",
  [OrderItemStatusV2.PICKUP_SCHEDULED]: "schedule",
  [OrderItemStatusV2.SHIPPED]: "local-shipping",
  [OrderItemStatusV2.OUT_FOR_DELIVERY]: "local-shipping",
  [OrderItemStatusV2.DELIVERED]: "check-circle",
  [OrderItemStatusV2.CANCELLED]: "cancel",
  [OrderItemStatusV2.RTO_INITIATED]: "undo",
  [OrderItemStatusV2.RTO_DELIVERED]: "undo",
  [OrderItemStatusV2.RETURN_INITIATED]: "undo",
  [OrderItemStatusV2.RETURN_PICKUP_SCHEDULED]: "undo",
  [OrderItemStatusV2.RETURN_PICKED_UP]: "undo",
  [OrderItemStatusV2.RETURN_IN_TRANSIT]: "undo",
  [OrderItemStatusV2.RETURN_RECEIVED_BY_SELLER]: "undo",
  [OrderItemStatusV2.RETURNED]: "undo",
  [OrderItemStatusV2.RETURN_REJECTED]: "cancel",
  [OrderItemStatusV2.EXCHANGE_INITIATED]: "swap-horiz",
  [OrderItemStatusV2.EXCHANGE_PICKUP_SCHEDULED]: "swap-horiz",
  [OrderItemStatusV2.EXCHANGE_PICKED_UP]: "swap-horiz",
  [OrderItemStatusV2.EXCHANGE_IN_TRANSIT]: "swap-horiz",
  [OrderItemStatusV2.EXCHANGE_RECEIVED_BY_SELLER]: "swap-horiz",
  [OrderItemStatusV2.EXCHANGE_ORDER_PLACED]: "swap-horiz",
  [OrderItemStatusV2.EXCHANGE_SHIPPED]: "swap-horiz",
  [OrderItemStatusV2.EXCHANGE_DELIVERED]: "swap-horiz",
  [OrderItemStatusV2.EXCHANGED]: "swap-horiz",
  [OrderItemStatusV2.EXCHANGE_REJECTED]: "cancel",
  [OrderItemStatusV2.REFUND_INITIATED]: "account-balance-wallet",
  [OrderItemStatusV2.REFUND_CREDITED]: "account-balance-wallet",
  [OrderItemStatusV2.REFUND_FAILED]: "cancel",
};

/**
 * Single source of truth for order item status UI.
 * Use this in both customer-ui and boutique-native-app.
 */
export function getOrderItemStatusUI(
  status: string | OrderItemStatusV2 | undefined,
): OrderItemStatusUI {
  const resolved = resolveStatus(status);
  return {
    color: ORDER_ITEM_STATUS_COLORS[resolved] ?? "#6B7280",
    icon: ORDER_ITEM_STATUS_ICONS[resolved] ?? "info",
    displayName: ORDER_ITEM_STATUS_DISPLAY_NAMES[resolved] ?? resolved,
    isDelivered: resolved === OrderItemStatusV2.DELIVERED,
  };
}

function resolveStatus(
  status: string | OrderItemStatusV2 | undefined,
): OrderItemStatusV2 {
  const raw = (status ?? OrderItemStatusV2.NEW).toString().toUpperCase();
  return Object.values(OrderItemStatusV2).includes(raw as OrderItemStatusV2)
    ? (raw as OrderItemStatusV2)
    : OrderItemStatusV2.NEW;
}

// ── Ionicons variant (boutique-native-app / customer-ui) ─────────────────────

export interface OrderItemStatusUIIonicons {
  label: string;
  color: string;
  icon: string;
}

export const ORDER_ITEM_STATUS_COLORS_IONICONS: Record<OrderItemStatusV2, string> = {
  [OrderItemStatusV2.NEW]:                         "#323F90",
  [OrderItemStatusV2.IN_PROGRESS]:                 "#AA8200",
  [OrderItemStatusV2.SCHEDULED_PICKUP]:            "#AA8200",
  [OrderItemStatusV2.PICKUP_SCHEDULED]:            "#AA8200",
  [OrderItemStatusV2.SHIPPED]:                     "#1565C0",
  [OrderItemStatusV2.OUT_FOR_DELIVERY]:            "#0277BD",
  [OrderItemStatusV2.DELIVERED]:                   "#26704A",
  [OrderItemStatusV2.CANCELLED]:                   "#B71C1C",
  [OrderItemStatusV2.RETURN_INITIATED]:            "#E65100",
  [OrderItemStatusV2.RETURN_PICKUP_SCHEDULED]:     "#E65100",
  [OrderItemStatusV2.RETURN_PICKED_UP]:            "#E65100",
  [OrderItemStatusV2.RETURN_IN_TRANSIT]:           "#E65100",
  [OrderItemStatusV2.RETURN_RECEIVED_BY_SELLER]:   "#E65100",
  [OrderItemStatusV2.RETURNED]:                    "#898989",
  [OrderItemStatusV2.RETURN_REJECTED]:             "#B71C1C",
  [OrderItemStatusV2.EXCHANGE_INITIATED]:          "#6A1B9A",
  [OrderItemStatusV2.EXCHANGE_PICKUP_SCHEDULED]:   "#6A1B9A",
  [OrderItemStatusV2.EXCHANGE_PICKED_UP]:          "#6A1B9A",
  [OrderItemStatusV2.EXCHANGE_IN_TRANSIT]:         "#6A1B9A",
  [OrderItemStatusV2.EXCHANGE_RECEIVED_BY_SELLER]: "#6A1B9A",
  [OrderItemStatusV2.EXCHANGE_ORDER_PLACED]:       "#6A1B9A",
  [OrderItemStatusV2.EXCHANGE_SHIPPED]:            "#6A1B9A",
  [OrderItemStatusV2.EXCHANGE_DELIVERED]:          "#6A1B9A",
  [OrderItemStatusV2.EXCHANGED]:                   "#898989",
  [OrderItemStatusV2.EXCHANGE_REJECTED]:           "#B71C1C",
  [OrderItemStatusV2.REFUND_INITIATED]:            "#E65100",
  [OrderItemStatusV2.REFUND_CREDITED]:             "#26704A",
  [OrderItemStatusV2.REFUND_FAILED]:               "#B71C1C",
};

export const ORDER_ITEM_STATUS_ICONS_IONICONS: Record<OrderItemStatusV2, string> = {
  [OrderItemStatusV2.NEW]:                         "radio-button-on",
  [OrderItemStatusV2.IN_PROGRESS]:                 "construct",
  [OrderItemStatusV2.SCHEDULED_PICKUP]:            "time",
  [OrderItemStatusV2.PICKUP_SCHEDULED]:            "calendar",
  [OrderItemStatusV2.SHIPPED]:                     "cube",
  [OrderItemStatusV2.OUT_FOR_DELIVERY]:            "bicycle",
  [OrderItemStatusV2.DELIVERED]:                   "checkmark-done-circle",
  [OrderItemStatusV2.CANCELLED]:                   "close-circle",
  [OrderItemStatusV2.RETURN_INITIATED]:            "return-down-back",
  [OrderItemStatusV2.RETURN_PICKUP_SCHEDULED]:     "calendar",
  [OrderItemStatusV2.RETURN_PICKED_UP]:            "bag",
  [OrderItemStatusV2.RETURN_IN_TRANSIT]:           "car",
  [OrderItemStatusV2.RETURN_RECEIVED_BY_SELLER]:   "storefront",
  [OrderItemStatusV2.RETURNED]:                    "checkmark-circle",
  [OrderItemStatusV2.RETURN_REJECTED]:             "close-circle",
  [OrderItemStatusV2.EXCHANGE_INITIATED]:          "swap-horizontal",
  [OrderItemStatusV2.EXCHANGE_PICKUP_SCHEDULED]:   "calendar",
  [OrderItemStatusV2.EXCHANGE_PICKED_UP]:          "bag",
  [OrderItemStatusV2.EXCHANGE_IN_TRANSIT]:         "car",
  [OrderItemStatusV2.EXCHANGE_RECEIVED_BY_SELLER]: "storefront",
  [OrderItemStatusV2.EXCHANGE_ORDER_PLACED]:       "receipt",
  [OrderItemStatusV2.EXCHANGE_SHIPPED]:            "cube",
  [OrderItemStatusV2.EXCHANGE_DELIVERED]:          "gift",
  [OrderItemStatusV2.EXCHANGED]:                   "checkmark-circle",
  [OrderItemStatusV2.EXCHANGE_REJECTED]:           "close-circle",
  [OrderItemStatusV2.REFUND_INITIATED]:            "cash",
  [OrderItemStatusV2.REFUND_CREDITED]:             "checkmark-circle",
  [OrderItemStatusV2.REFUND_FAILED]:               "close-circle",
};

export function getOrderItemStatusUIIonicons(status: string): OrderItemStatusUIIonicons {
  const s = status as OrderItemStatusV2;
  return {
    label: ORDER_ITEM_STATUS_DISPLAY_NAMES[s] ?? status,
    color: ORDER_ITEM_STATUS_COLORS_IONICONS[s] ?? "#898989",
    icon:  ORDER_ITEM_STATUS_ICONS_IONICONS[s]  ?? "help-circle",
  };
}
