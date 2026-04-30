export type { UnitType, CategoryType, PresetMeasurement, CategoryData, SizeGuideData, } from "../entities/boutique-size-guide.entity";
export interface SizeGuideResponseDto {
    id: string;
    fkBoutiqueId: string;
    sizeGuideData: SizeGuideData;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}
export type CreateSizeGuideDto = SizeGuideData;
export type UpdateSizeGuideDto = SizeGuideData;
import type { SizeGuideData } from "../entities/boutique-size-guide.entity";
