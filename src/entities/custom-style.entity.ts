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
 * Custom Style Entity
 *
 * Represents a silhouette/cut style a seller offers within a Custom Category.
 * e.g. "Princess Cut", "A-Line", "Straight Cut", "Peplum", "Flared".
 *
 * Each style has:
 *  - Its own base price (added to the running total)
 *  - A single reference image (sketch or finished photo)
 *  - An optional description
 *
 * Pricing: Category.basePrice + (Design.basePrice) + Style.basePrice + (customization option prices)
 */
@Entity("custom_styles")
@Index(["fkCategoryId"])
@Index(["fkCategoryId", "isActive"])
export class CustomStyle {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "uuid" })
  fkCategoryId: string;

  /**
   * Human-readable style label.
   * e.g. "Princess Cut", "A-Line", "Straight Cut", "Crop"
   */
  @Column({ type: "varchar", length: 100 })
  name: string;

  /**
   * Price added to the order total when this style is selected.
   * Mandatory — every style must have a price.
   */
  @Column({ type: "decimal", precision: 10, scale: 2 })
  basePrice: number;

  /** Optional description shown to the customer on the selection screen. */
  @Column({ type: "text", nullable: true })
  description: string;

  /** R2 storage key for the full-size reference image. */
  @Column({ type: "varchar", length: 500, nullable: true })
  imageOriginalKey: string;

  /** R2 storage key for the preview/thumbnail version of the reference image. */
  @Column({ type: "varchar", length: 500, nullable: true })
  imagePreviewKey: string;

  @Column({ type: "int", default: 0 })
  sortOrder: number;

  @Column({ type: "boolean", default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // ─── Relations ────────────────────────────────────────────────────────────

  @ManyToOne(() => CustomCategory, (category) => category.styles, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "fkCategoryId" })
  category: CustomCategory;
}
