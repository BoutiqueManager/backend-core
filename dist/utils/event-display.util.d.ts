import { OrderEventTypeV2 } from "../enums/order-v2.enum";
/**
 * Timeline event display information matching the UI requirements.
 * Maps OrderEventTypeV2 enum values to their UI display properties.
 */
export interface EventDisplayInfo {
    title: string;
    description: string;
    icon: string;
    color: string;
}
/**
 * Get display information for order item events.
 * Maps from OrderEventTypeV2 to UI-friendly display properties.
 */
export declare const getEventDisplayInfo: (eventType: OrderEventTypeV2, customDescription?: string) => EventDisplayInfo;
