import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
} from "typeorm";

export type UnitType = "inch" | "cm";
export type CategoryType = "topwear" | "bottomwear" | "footwear";

export interface PresetMeasurement {
  size: string;
  measurements: Record<string, string>;
}

export interface CustomExplanation {
  title: string;
  explanation: string;
}

export interface CategoryData {
  categoryType: CategoryType;
  presets: PresetMeasurement[];
  customEnabled: boolean;
  customTypes: string[];
  customExplanations: CustomExplanation[];
}

export interface SizeGuideData {
  unit: UnitType;
  categories: CategoryData[];
}

@Entity("boutique_size_guide")
@Index(["fkBoutiqueId"])
export class BoutiqueSizeGuide {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("uuid")
  fkBoutiqueId: string;

  @Column({ type: "jsonb" })
  sizeGuideData: SizeGuideData;

  @Column({ type: "boolean", default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
