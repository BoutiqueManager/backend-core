export type UnitType = "inch" | "cm";
export type CategoryType = "topwear" | "bottomwear" | "footwear";
export interface PresetMeasurement {
    size: string;
    measurements: Record<string, string>;
}
export interface CategoryData {
    categoryType: CategoryType;
    presets: PresetMeasurement[];
    customEnabled: boolean;
    customTypes: string[];
    customExplanations: Record<string, string>;
}
export interface SizeGuideData {
    unit: UnitType;
    categories: CategoryData[];
}
export declare class BoutiqueSizeGuide {
    id: string;
    fkBoutiqueId: string;
    sizeGuideData: SizeGuideData;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}
