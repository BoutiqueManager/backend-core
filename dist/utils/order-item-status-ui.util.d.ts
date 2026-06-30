import { OrderItemStatusV2 } from "../enums/order-v2.enum";
/**
 * Icon names are platform-agnostic string keys.
 * Map them to your icon library in each app:
 *   MaterialIcons / Ionicons / FontAwesome etc.
 *
 * These match @expo/vector-icons MaterialIcons naming.
 */
export type OrderItemStatusIconName = "pending" | "schedule" | "local-shipping" | "check-circle" | "cancel" | "undo" | "swap-horiz" | "account-balance-wallet" | "info";
export interface OrderItemStatusUI {
    color: string;
    icon: OrderItemStatusIconName;
    displayName: string;
    isDelivered: boolean;
}
export declare const ORDER_ITEM_STATUS_COLORS: Record<OrderItemStatusV2, string>;
export declare const ORDER_ITEM_STATUS_ICONS: Record<OrderItemStatusV2, OrderItemStatusIconName>;
/**
 * Single source of truth for order item status UI.
 * Use this in both customer-ui and boutique-native-app.
 */
export declare function getOrderItemStatusUI(status: string | OrderItemStatusV2 | undefined): OrderItemStatusUI;
