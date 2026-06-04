//////////////////////////////////////
// Boutique Settings Types
//////////////////////////////////////

export enum PayoutSchedule {
  WEEKLY = "weekly",
  BI_WEEKLY = "bi_weekly",
  MONTHLY = "monthly",
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

export const DEFAULT_BOUTIQUE_SETTINGS: BoutiqueSettingsDto = {
  advancePaymentPercentage: 50,
  payoutSchedule: PayoutSchedule.MONTHLY,
  acceptsCod: false,
  returnWindowDays: 7,
  notificationPreferences: {
    email: true,
    whatsapp: false,
  },
};
