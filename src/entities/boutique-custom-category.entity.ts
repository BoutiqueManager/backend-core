import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { CustomCategory } from "./custom-category.entity";

/**
 * Boutique Custom Category Entity
 *
 * Junction / ownership table that links a boutique to the custom categories it
 * has created. A boutique may have multiple custom categories; a custom category
 * belongs to exactly one boutique.
 *
 * Keeping this as a separate table (rather than a plain fkBoutiqueId on
 * CustomCategory) mirrors the existing BoutiqueCategories pattern and allows
 * per-boutique overrides (sortOrder, isActive) without touching shared data.
 *
 * Note: The Boutique entity lives in boutique-server, so fkBoutiqueId is stored
 * as a plain uuid without a TypeORM relation — exactly like BoutiqueSizeGuide.
 */
@Entity("boutique_custom_categories")
@Index(["fkBoutiqueId"])
@Index(["fkBoutiqueId", "isActive"])
@Index(["fkBoutiqueId", "fkCustomCategoryId"], { unique: true })
export class BoutiqueCustomCategory {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  /**
   * Owning boutique — references boutique-server.boutiques.
   * Plain uuid: no TypeORM relation because Boutique is in boutique-server.
   */
  @Column({ type: "uuid" })
  fkBoutiqueId: string;

  @Column({ type: "uuid" })
  fkCustomCategoryId: string;

  /**
   * Controls visibility of this category in the boutique's public catalog.
   * Sellers can deactivate a category without deleting it.
   */
  @Column({ type: "boolean", default: true })
  isActive: boolean;

  /** Display order within the boutique's custom catalog listing. */
  @Column({ type: "int", default: 0 })
  sortOrder: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // ─── Relations ────────────────────────────────────────────────────────────

  @ManyToOne(() => CustomCategory, {
    onDelete: "CASCADE",
    eager: false,
  })
  @JoinColumn({ name: "fkCustomCategoryId" })
  customCategory: CustomCategory;
}
