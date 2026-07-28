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
