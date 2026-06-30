export declare enum PayoutSchedule {
    WEEKLY = "weekly",
    BI_WEEKLY = "bi_weekly",
    MONTHLY = "monthly"
}
export interface NotificationPreferences {
    email: boolean;
    whatsapp: boolean;
}
export interface BoutiqueSettingsDto {
    advancePaymentPercentage: number;
    payoutSchedule: PayoutSchedule;
    acceptsCod: boolean;
    returnWindowDays: number;
    notificationPreferences: NotificationPreferences;
}
export interface CreateBoutiqueSettingsDto extends BoutiqueSettingsDto {
    boutiqueId: string;
}
export interface UpdateBoutiqueSettingsDto extends Partial<BoutiqueSettingsDto> {
    boutiqueId?: string;
}
export interface BoutiqueSettingsResponse {
    success: boolean;
    message: string;
    data: BoutiqueSettingsDto;
}
export declare const DEFAULT_BOUTIQUE_SETTINGS: BoutiqueSettingsDto;
