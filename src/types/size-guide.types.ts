// Re-export entity types for convenience
export type {
  UnitType,
  CategoryType,
  PresetMeasurement,
  CustomExplanation,
  CategoryData,
  SizeGuideData,
} from "../entities/boutique-size-guide.entity";

export interface SizeGuideResponseDto {
  id: string;
  fkBoutiqueId: string;
  sizeGuideData: SizeGuideData;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// For backwards compatibility
export type CreateSizeGuideDto = SizeGuideData;
export type UpdateSizeGuideDto = SizeGuideData;

// Importing the actual type for use
import type { SizeGuideData } from "../entities/boutique-size-guide.entity";
