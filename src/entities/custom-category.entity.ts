import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import {
  CustomCategoryStatus,
  CustomProductType,
  CustomTargetGender,
} from "../enums/custom-catalog.enum";
import { CustomDesign } from "./custom-design.entity";
import { CustomStyle } from "./custom-style.entity";
import { CustomizationType } from "./customization-type.entity";

/**
 * Custom Category Entity
 *
 * Represents a seller-defined garment category in the "Custom" (made-to-order)
 * catalog flow. A category groups together all the design options, style choices,
 * and detailed customizations (neck, back, sleeves, etc.) that a customer can
 * select when placing a made-to-order item.
 *
 * Distinct from the "Collection" flow which is inventory-based (Products table).
 * Custom items have NO inventory — every item is made-to-order.
 */
@Entity("custom_categories")
@Index(["fkBoutiqueId"])
@Index(["fkBoutiqueId", "status"])
@Index(["fkBoutiqueId", "targetGender"])
export class CustomCategory {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  /** Owner boutique — references boutique-server.boutiques, stored as plain uuid. */
  @Column({ type: "uuid" })
  fkBoutiqueId: string;

  /** e.g. "Blouses", "Sarees", "Lehengas", "Kurtis" */
  @Column({ type: "varchar", length: 100 })
  name: string;

  /** Topwear | Bottomwear | Top+Bottomwear */
  @Column({ type: "enum", enum: CustomProductType })
  productType: CustomProductType;

  /** Men | Women */
  @Column({ type: "enum", enum: CustomTargetGender })
  targetGender: CustomTargetGender;

  /**
   * Starting / base price for this category before any options are chosen.
   * e.g. ₹2000 for Blouses.
   */
  @Column({ type: "decimal", precision: 10, scale: 2, default: 0 })
  basePrice: number;

  /** R2 storage key for the full-size thumbnail image. */
  @Column({ type: "varchar", length: 500, nullable: true })
  thumbnailOriginalKey: string;

  /** R2 storage key for the compressed/preview thumbnail image. */
  @Column({ type: "varchar", length: 500, nullable: true })
  thumbnailPreviewKey: string;

  /**
   * Fabrics the seller can work with for this category.
   * e.g. ["Cotton", "Silk", "Georgette", "Chanderi"]
   */
  @Column({ type: "jsonb", default: [] })
  fabricTypes: string[];

  /**
   * When true, customer can skip the Design selection step.
   * The category base price is still applied.
   */
  @Column({ type: "boolean", default: false })
  designsOptional: boolean;

  /**
   * When true, customer can skip the Style selection step.
   * The category base price is still applied.
   */
  @Column({ type: "boolean", default: false })
  stylesOptional: boolean;

  @Column({
    type: "enum",
    enum: CustomCategoryStatus,
    default: CustomCategoryStatus.DRAFT,
  })
  status: CustomCategoryStatus;

  @Column({ type: "int", default: 0 })
  sortOrder: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // ─── Relations ────────────────────────────────────────────────────────────

  @OneToMany(() => CustomDesign, (design) => design.category, {
    cascade: true,
  })
  designs: CustomDesign[];

  @OneToMany(() => CustomStyle, (style) => style.category, {
    cascade: true,
  })
  styles: CustomStyle[];

  @OneToMany(() => CustomizationType, (type) => type.category, {
    cascade: true,
  })
  customizationTypes: CustomizationType[];
}
