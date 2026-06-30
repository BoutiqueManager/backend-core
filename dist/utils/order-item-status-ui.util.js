"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ORDER_ITEM_STATUS_ICONS = exports.ORDER_ITEM_STATUS_COLORS = void 0;
exports.getOrderItemStatusUI = getOrderItemStatusUI;
const order_v2_enum_1 = require("../enums/order-v2.enum");
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
};
exports.ORDER_ITEM_STATUS_COLORS = {
    [order_v2_enum_1.OrderItemStatusV2.NEW]: STATUS_COLORS.NEW,
    [order_v2_enum_1.OrderItemStatusV2.IN_PROGRESS]: STATUS_COLORS.IN_PROGRESS,
    [order_v2_enum_1.OrderItemStatusV2.SCHEDULED_PICKUP]: STATUS_COLORS.PICKUP,
    [order_v2_enum_1.OrderItemStatusV2.PICKUP_SCHEDULED]: STATUS_COLORS.PICKUP,
    [order_v2_enum_1.OrderItemStatusV2.SHIPPED]: STATUS_COLORS.IN_TRANSIT,
    [order_v2_enum_1.OrderItemStatusV2.OUT_FOR_DELIVERY]: STATUS_COLORS.IN_TRANSIT,
    [order_v2_enum_1.OrderItemStatusV2.DELIVERED]: STATUS_COLORS.DELIVERED,
    [order_v2_enum_1.OrderItemStatusV2.CANCELLED]: STATUS_COLORS.CANCELLED,
    [order_v2_enum_1.OrderItemStatusV2.RETURN_INITIATED]: STATUS_COLORS.RETURN,
    [order_v2_enum_1.OrderItemStatusV2.RETURN_PICKUP_SCHEDULED]: STATUS_COLORS.RETURN,
    [order_v2_enum_1.OrderItemStatusV2.RETURN_PICKED_UP]: STATUS_COLORS.RETURN,
    [order_v2_enum_1.OrderItemStatusV2.RETURN_IN_TRANSIT]: STATUS_COLORS.RETURN,
    [order_v2_enum_1.OrderItemStatusV2.RETURN_RECEIVED_BY_SELLER]: STATUS_COLORS.RETURN,
    [order_v2_enum_1.OrderItemStatusV2.RETURNED]: STATUS_COLORS.RETURN,
    [order_v2_enum_1.OrderItemStatusV2.RETURN_REJECTED]: STATUS_COLORS.CANCELLED,
    [order_v2_enum_1.OrderItemStatusV2.EXCHANGE_INITIATED]: STATUS_COLORS.EXCHANGE,
    [order_v2_enum_1.OrderItemStatusV2.EXCHANGE_PICKUP_SCHEDULED]: STATUS_COLORS.EXCHANGE,
    [order_v2_enum_1.OrderItemStatusV2.EXCHANGE_PICKED_UP]: STATUS_COLORS.EXCHANGE,
    [order_v2_enum_1.OrderItemStatusV2.EXCHANGE_IN_TRANSIT]: STATUS_COLORS.EXCHANGE,
    [order_v2_enum_1.OrderItemStatusV2.EXCHANGE_RECEIVED_BY_SELLER]: STATUS_COLORS.EXCHANGE,
    [order_v2_enum_1.OrderItemStatusV2.EXCHANGE_ORDER_PLACED]: STATUS_COLORS.EXCHANGE,
    [order_v2_enum_1.OrderItemStatusV2.EXCHANGE_SHIPPED]: STATUS_COLORS.EXCHANGE,
    [order_v2_enum_1.OrderItemStatusV2.EXCHANGE_DELIVERED]: STATUS_COLORS.DELIVERED,
    [order_v2_enum_1.OrderItemStatusV2.EXCHANGED]: STATUS_COLORS.EXCHANGE,
    [order_v2_enum_1.OrderItemStatusV2.EXCHANGE_REJECTED]: STATUS_COLORS.CANCELLED,
    [order_v2_enum_1.OrderItemStatusV2.REFUND_INITIATED]: STATUS_COLORS.REFUND,
    [order_v2_enum_1.OrderItemStatusV2.REFUND_CREDITED]: STATUS_COLORS.REFUND,
    [order_v2_enum_1.OrderItemStatusV2.REFUND_FAILED]: STATUS_COLORS.CANCELLED,
};
exports.ORDER_ITEM_STATUS_ICONS = {
    [order_v2_enum_1.OrderItemStatusV2.NEW]: "pending",
    [order_v2_enum_1.OrderItemStatusV2.IN_PROGRESS]: "schedule",
    [order_v2_enum_1.OrderItemStatusV2.SCHEDULED_PICKUP]: "schedule",
    [order_v2_enum_1.OrderItemStatusV2.PICKUP_SCHEDULED]: "schedule",
    [order_v2_enum_1.OrderItemStatusV2.SHIPPED]: "local-shipping",
    [order_v2_enum_1.OrderItemStatusV2.OUT_FOR_DELIVERY]: "local-shipping",
    [order_v2_enum_1.OrderItemStatusV2.DELIVERED]: "check-circle",
    [order_v2_enum_1.OrderItemStatusV2.CANCELLED]: "cancel",
    [order_v2_enum_1.OrderItemStatusV2.RETURN_INITIATED]: "undo",
    [order_v2_enum_1.OrderItemStatusV2.RETURN_PICKUP_SCHEDULED]: "undo",
    [order_v2_enum_1.OrderItemStatusV2.RETURN_PICKED_UP]: "undo",
    [order_v2_enum_1.OrderItemStatusV2.RETURN_IN_TRANSIT]: "undo",
    [order_v2_enum_1.OrderItemStatusV2.RETURN_RECEIVED_BY_SELLER]: "undo",
    [order_v2_enum_1.OrderItemStatusV2.RETURNED]: "undo",
    [order_v2_enum_1.OrderItemStatusV2.RETURN_REJECTED]: "cancel",
    [order_v2_enum_1.OrderItemStatusV2.EXCHANGE_INITIATED]: "swap-horiz",
    [order_v2_enum_1.OrderItemStatusV2.EXCHANGE_PICKUP_SCHEDULED]: "swap-horiz",
    [order_v2_enum_1.OrderItemStatusV2.EXCHANGE_PICKED_UP]: "swap-horiz",
    [order_v2_enum_1.OrderItemStatusV2.EXCHANGE_IN_TRANSIT]: "swap-horiz",
    [order_v2_enum_1.OrderItemStatusV2.EXCHANGE_RECEIVED_BY_SELLER]: "swap-horiz",
    [order_v2_enum_1.OrderItemStatusV2.EXCHANGE_ORDER_PLACED]: "swap-horiz",
    [order_v2_enum_1.OrderItemStatusV2.EXCHANGE_SHIPPED]: "swap-horiz",
    [order_v2_enum_1.OrderItemStatusV2.EXCHANGE_DELIVERED]: "swap-horiz",
    [order_v2_enum_1.OrderItemStatusV2.EXCHANGED]: "swap-horiz",
    [order_v2_enum_1.OrderItemStatusV2.EXCHANGE_REJECTED]: "cancel",
    [order_v2_enum_1.OrderItemStatusV2.REFUND_INITIATED]: "account-balance-wallet",
    [order_v2_enum_1.OrderItemStatusV2.REFUND_CREDITED]: "account-balance-wallet",
    [order_v2_enum_1.OrderItemStatusV2.REFUND_FAILED]: "cancel",
};
/**
 * Single source of truth for order item status UI.
 * Use this in both customer-ui and boutique-native-app.
 */
function getOrderItemStatusUI(status) {
    const resolved = resolveStatus(status);
    return {
        color: exports.ORDER_ITEM_STATUS_COLORS[resolved] ?? "#6B7280",
        icon: exports.ORDER_ITEM_STATUS_ICONS[resolved] ?? "info",
        displayName: order_v2_enum_1.ORDER_ITEM_STATUS_DISPLAY_NAMES[resolved] ?? resolved,
        isDelivered: resolved === order_v2_enum_1.OrderItemStatusV2.DELIVERED,
    };
}
function resolveStatus(status) {
    const raw = (status ?? order_v2_enum_1.OrderItemStatusV2.NEW).toString().toUpperCase();
    return Object.values(order_v2_enum_1.OrderItemStatusV2).includes(raw)
        ? raw
        : order_v2_enum_1.OrderItemStatusV2.NEW;
}
//# sourceMappingURL=order-item-status-ui.util.js.map