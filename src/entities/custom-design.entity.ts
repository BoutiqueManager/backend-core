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
 * Custom Design Entity
 *
 * Represents one design style/technique a seller offers within a Custom Category.
 * e.g. "Block Print", "Hand Embroidery", "Zardozi Work".
 *
 * Each design has:
 *  - Its own base price (added to the category base price)
 *  - At least 3 reference/inspiration images
 *  - An optional description
 *
 * Pricing: Category.basePrice + Design.basePrice + (selected Style price) + (customization option prices)
 */
@Entity("custom_designs")
@Index(["fkCategoryId"])
@Index(["fkCategoryId", "isActive"])
export class CustomDesign {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "uuid" })
  fkCategoryId: string;

  /**
   * Human-readable design label.
   * e.g. "Block Print", "Hand Embroidery", "Zardozi Work", "Cutwork"
   */
  @Column({ type: "varchar", length: 100 })
  name: string;

  /**
   * Price added to the order total when this design is selected.
   * Mandatory — every design must have a price (can be 0 if included in base).
   */
  @Column({ type: "decimal", precision: 10, scale: 2 })
  basePrice: number;

  /** Optional description shown to the customer on the selection screen. */
  @Column({ type: "text", nullable: true })
  description: string;

  /**
   * Reference images for this design (minimum 3 required in the UI).
   * Stored as an array of R2 key pairs so URLs are generated dynamically.
   */
  @Column({
    type: "jsonb",
    default: [],
    comment: "Array of { originalKey: string; previewKey?: string }",
  })
  imageKeys: { originalKey: string; previewKey?: string }[];

  @Column({ type: "int", default: 0 })
  sortOrder: number;

  @Column({ type: "boolean", default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // ─── Relations ────────────────────────────────────────────────────────────

  @ManyToOne(() => CustomCategory, (category) => category.designs, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "fkCategoryId" })
  category: CustomCategory;
}
