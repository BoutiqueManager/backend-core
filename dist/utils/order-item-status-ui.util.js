"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ORDER_ITEM_STATUS_ICONS_IONICONS = exports.ORDER_ITEM_STATUS_COLORS_IONICONS = exports.ORDER_ITEM_STATUS_ICONS = exports.ORDER_ITEM_STATUS_COLORS = void 0;
exports.getOrderItemStatusUI = getOrderItemStatusUI;
exports.getOrderItemStatusUIIonicons = getOrderItemStatusUIIonicons;
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
    RTO: "#F97316",
    RETURN: "#F97316",
    EXCHANGE: "#8B5CF6",
    REFUND: "#10B981",
    MTM_HOLD: "#0EA5E9",
    NON_REFUNDABLE: "#B91C1C",
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
    [order_v2_enum_1.OrderItemStatusV2.RTO_INITIATED]: STATUS_COLORS.RTO,
    [order_v2_enum_1.OrderItemStatusV2.RTO_IN_TRANSIT]: STATUS_COLORS.RTO,
    [order_v2_enum_1.OrderItemStatusV2.RTO_DELIVERED]: STATUS_COLORS.RTO,
    [order_v2_enum_1.OrderItemStatusV2.RTO_APPROVED_BY_SELLER]: STATUS_COLORS.RTO,
    [order_v2_enum_1.OrderItemStatusV2.MTM_REFUSED_NON_REFUNDABLE]: STATUS_COLORS.NON_REFUNDABLE,
    [order_v2_enum_1.OrderItemStatusV2.NDR_HELD]: STATUS_COLORS.MTM_HOLD,
    [order_v2_enum_1.OrderItemStatusV2.NDR_RELEASED]: STATUS_COLORS.MTM_HOLD,
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
    [order_v2_enum_1.OrderItemStatusV2.ALTERATION_REQUESTED]: STATUS_COLORS.EXCHANGE,
    [order_v2_enum_1.OrderItemStatusV2.ALTERATION_PICKED_UP]: STATUS_COLORS.EXCHANGE,
    [order_v2_enum_1.OrderItemStatusV2.ALTERATION_AT_SELLER]: STATUS_COLORS.EXCHANGE,
    [order_v2_enum_1.OrderItemStatusV2.ALTERATION_SHIPPED_BACK]: STATUS_COLORS.EXCHANGE,
    [order_v2_enum_1.OrderItemStatusV2.ALTERATION_COMPLETED]: STATUS_COLORS.DELIVERED,
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
    [order_v2_enum_1.OrderItemStatusV2.RTO_INITIATED]: "undo",
    [order_v2_enum_1.OrderItemStatusV2.RTO_IN_TRANSIT]: "undo",
    [order_v2_enum_1.OrderItemStatusV2.RTO_DELIVERED]: "undo",
    [order_v2_enum_1.OrderItemStatusV2.RTO_APPROVED_BY_SELLER]: "undo",
    [order_v2_enum_1.OrderItemStatusV2.MTM_REFUSED_NON_REFUNDABLE]: "block",
    [order_v2_enum_1.OrderItemStatusV2.NDR_HELD]: "hourglass-empty",
    [order_v2_enum_1.OrderItemStatusV2.NDR_RELEASED]: "local-shipping",
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
    [order_v2_enum_1.OrderItemStatusV2.ALTERATION_REQUESTED]: "build",
    [order_v2_enum_1.OrderItemStatusV2.ALTERATION_PICKED_UP]: "local-shipping",
    [order_v2_enum_1.OrderItemStatusV2.ALTERATION_AT_SELLER]: "build",
    [order_v2_enum_1.OrderItemStatusV2.ALTERATION_SHIPPED_BACK]: "local-shipping",
    [order_v2_enum_1.OrderItemStatusV2.ALTERATION_COMPLETED]: "check-circle",
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
exports.ORDER_ITEM_STATUS_COLORS_IONICONS = {
    [order_v2_enum_1.OrderItemStatusV2.NEW]: "#323F90",
    [order_v2_enum_1.OrderItemStatusV2.IN_PROGRESS]: "#AA8200",
    [order_v2_enum_1.OrderItemStatusV2.SCHEDULED_PICKUP]: "#AA8200",
    [order_v2_enum_1.OrderItemStatusV2.PICKUP_SCHEDULED]: "#AA8200",
    [order_v2_enum_1.OrderItemStatusV2.SHIPPED]: "#1565C0",
    [order_v2_enum_1.OrderItemStatusV2.OUT_FOR_DELIVERY]: "#0277BD",
    [order_v2_enum_1.OrderItemStatusV2.DELIVERED]: "#26704A",
    [order_v2_enum_1.OrderItemStatusV2.CANCELLED]: "#B71C1C",
    [order_v2_enum_1.OrderItemStatusV2.RTO_INITIATED]: "#E65100",
    [order_v2_enum_1.OrderItemStatusV2.RTO_IN_TRANSIT]: "#E65100",
    [order_v2_enum_1.OrderItemStatusV2.RTO_DELIVERED]: "#E65100",
    [order_v2_enum_1.OrderItemStatusV2.RTO_APPROVED_BY_SELLER]: "#E65100",
    [order_v2_enum_1.OrderItemStatusV2.MTM_REFUSED_NON_REFUNDABLE]: "#B71C1C",
    [order_v2_enum_1.OrderItemStatusV2.NDR_HELD]: "#0284C7",
    [order_v2_enum_1.OrderItemStatusV2.NDR_RELEASED]: "#0284C7",
    [order_v2_enum_1.OrderItemStatusV2.RETURN_INITIATED]: "#E65100",
    [order_v2_enum_1.OrderItemStatusV2.RETURN_PICKUP_SCHEDULED]: "#E65100",
    [order_v2_enum_1.OrderItemStatusV2.RETURN_PICKED_UP]: "#E65100",
    [order_v2_enum_1.OrderItemStatusV2.RETURN_IN_TRANSIT]: "#E65100",
    [order_v2_enum_1.OrderItemStatusV2.RETURN_RECEIVED_BY_SELLER]: "#E65100",
    [order_v2_enum_1.OrderItemStatusV2.RETURNED]: "#898989",
    [order_v2_enum_1.OrderItemStatusV2.RETURN_REJECTED]: "#B71C1C",
    [order_v2_enum_1.OrderItemStatusV2.EXCHANGE_INITIATED]: "#6A1B9A",
    [order_v2_enum_1.OrderItemStatusV2.EXCHANGE_PICKUP_SCHEDULED]: "#6A1B9A",
    [order_v2_enum_1.OrderItemStatusV2.EXCHANGE_PICKED_UP]: "#6A1B9A",
    [order_v2_enum_1.OrderItemStatusV2.EXCHANGE_IN_TRANSIT]: "#6A1B9A",
    [order_v2_enum_1.OrderItemStatusV2.EXCHANGE_RECEIVED_BY_SELLER]: "#6A1B9A",
    [order_v2_enum_1.OrderItemStatusV2.EXCHANGE_ORDER_PLACED]: "#6A1B9A",
    [order_v2_enum_1.OrderItemStatusV2.EXCHANGE_SHIPPED]: "#6A1B9A",
    [order_v2_enum_1.OrderItemStatusV2.EXCHANGE_DELIVERED]: "#6A1B9A",
    [order_v2_enum_1.OrderItemStatusV2.EXCHANGED]: "#898989",
    [order_v2_enum_1.OrderItemStatusV2.EXCHANGE_REJECTED]: "#B71C1C",
    [order_v2_enum_1.OrderItemStatusV2.ALTERATION_REQUESTED]: "#6A1B9A",
    [order_v2_enum_1.OrderItemStatusV2.ALTERATION_PICKED_UP]: "#6A1B9A",
    [order_v2_enum_1.OrderItemStatusV2.ALTERATION_AT_SELLER]: "#6A1B9A",
    [order_v2_enum_1.OrderItemStatusV2.ALTERATION_SHIPPED_BACK]: "#6A1B9A",
    [order_v2_enum_1.OrderItemStatusV2.ALTERATION_COMPLETED]: "#26704A",
    [order_v2_enum_1.OrderItemStatusV2.REFUND_INITIATED]: "#E65100",
    [order_v2_enum_1.OrderItemStatusV2.REFUND_CREDITED]: "#26704A",
    [order_v2_enum_1.OrderItemStatusV2.REFUND_FAILED]: "#B71C1C",
};
exports.ORDER_ITEM_STATUS_ICONS_IONICONS = {
    [order_v2_enum_1.OrderItemStatusV2.NEW]: "radio-button-on",
    [order_v2_enum_1.OrderItemStatusV2.IN_PROGRESS]: "construct",
    [order_v2_enum_1.OrderItemStatusV2.SCHEDULED_PICKUP]: "time",
    [order_v2_enum_1.OrderItemStatusV2.PICKUP_SCHEDULED]: "calendar",
    [order_v2_enum_1.OrderItemStatusV2.SHIPPED]: "cube",
    [order_v2_enum_1.OrderItemStatusV2.OUT_FOR_DELIVERY]: "bicycle",
    [order_v2_enum_1.OrderItemStatusV2.DELIVERED]: "checkmark-done-circle",
    [order_v2_enum_1.OrderItemStatusV2.CANCELLED]: "close-circle",
    [order_v2_enum_1.OrderItemStatusV2.RTO_INITIATED]: "return-down-back",
    [order_v2_enum_1.OrderItemStatusV2.RTO_IN_TRANSIT]: "car",
    [order_v2_enum_1.OrderItemStatusV2.RTO_DELIVERED]: "storefront",
    [order_v2_enum_1.OrderItemStatusV2.RTO_APPROVED_BY_SELLER]: "checkmark-circle",
    [order_v2_enum_1.OrderItemStatusV2.MTM_REFUSED_NON_REFUNDABLE]: "close-circle",
    [order_v2_enum_1.OrderItemStatusV2.NDR_HELD]: "time",
    [order_v2_enum_1.OrderItemStatusV2.NDR_RELEASED]: "bicycle",
    [order_v2_enum_1.OrderItemStatusV2.RETURN_INITIATED]: "return-down-back",
    [order_v2_enum_1.OrderItemStatusV2.RETURN_PICKUP_SCHEDULED]: "calendar",
    [order_v2_enum_1.OrderItemStatusV2.RETURN_PICKED_UP]: "bag",
    [order_v2_enum_1.OrderItemStatusV2.RETURN_IN_TRANSIT]: "car",
    [order_v2_enum_1.OrderItemStatusV2.RETURN_RECEIVED_BY_SELLER]: "storefront",
    [order_v2_enum_1.OrderItemStatusV2.RETURNED]: "checkmark-circle",
    [order_v2_enum_1.OrderItemStatusV2.RETURN_REJECTED]: "close-circle",
    [order_v2_enum_1.OrderItemStatusV2.EXCHANGE_INITIATED]: "swap-horizontal",
    [order_v2_enum_1.OrderItemStatusV2.EXCHANGE_PICKUP_SCHEDULED]: "calendar",
    [order_v2_enum_1.OrderItemStatusV2.EXCHANGE_PICKED_UP]: "bag",
    [order_v2_enum_1.OrderItemStatusV2.EXCHANGE_IN_TRANSIT]: "car",
    [order_v2_enum_1.OrderItemStatusV2.EXCHANGE_RECEIVED_BY_SELLER]: "storefront",
    [order_v2_enum_1.OrderItemStatusV2.EXCHANGE_ORDER_PLACED]: "receipt",
    [order_v2_enum_1.OrderItemStatusV2.EXCHANGE_SHIPPED]: "cube",
    [order_v2_enum_1.OrderItemStatusV2.EXCHANGE_DELIVERED]: "gift",
    [order_v2_enum_1.OrderItemStatusV2.EXCHANGED]: "checkmark-circle",
    [order_v2_enum_1.OrderItemStatusV2.EXCHANGE_REJECTED]: "close-circle",
    [order_v2_enum_1.OrderItemStatusV2.ALTERATION_REQUESTED]: "construct",
    [order_v2_enum_1.OrderItemStatusV2.ALTERATION_PICKED_UP]: "bag",
    [order_v2_enum_1.OrderItemStatusV2.ALTERATION_AT_SELLER]: "construct",
    [order_v2_enum_1.OrderItemStatusV2.ALTERATION_SHIPPED_BACK]: "bicycle",
    [order_v2_enum_1.OrderItemStatusV2.ALTERATION_COMPLETED]: "checkmark-done-circle",
    [order_v2_enum_1.OrderItemStatusV2.REFUND_INITIATED]: "cash",
    [order_v2_enum_1.OrderItemStatusV2.REFUND_CREDITED]: "checkmark-circle",
    [order_v2_enum_1.OrderItemStatusV2.REFUND_FAILED]: "close-circle",
};
function getOrderItemStatusUIIonicons(status) {
    const s = status;
    return {
        label: order_v2_enum_1.ORDER_ITEM_STATUS_DISPLAY_NAMES[s] ?? status,
        color: exports.ORDER_ITEM_STATUS_COLORS_IONICONS[s] ?? "#898989",
        icon: exports.ORDER_ITEM_STATUS_ICONS_IONICONS[s] ?? "help-circle",
    };
}
//# sourceMappingURL=order-item-status-ui.util.js.map