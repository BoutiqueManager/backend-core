import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { CustomCategory } from "./custom-category.entity";
import { CustomizationOption } from "./customization-option.entity";

/**
 * Customization Type Entity
 *
 * Represents a "dimension" of customization within a Custom Category.
 * e.g. "Neck Style", "Back Design", "Sleeve Type", "Hemline".
 *
 * Each type groups together multiple options the customer can choose from.
 * The seller decides whether the customer must pick an option (isRequired)
 * and whether they can pick more than one (allowMultipleSelection).
 *
 * Pricing: Each selected option within a type may add its own additionalPrice.
 */
@Entity("customization_types")
@Index(["fkCategoryId"])
@Index(["fkCategoryId", "isActive"])
export class CustomizationType {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "uuid" })
  fkCategoryId: string;

  /**
   * Label shown to the customer.
   * e.g. "Neck Style", "Back Design", "Sleeve Type"
   */
  @Column({ type: "varchar", length: 100 })
  typeName: string;

  /** Optional seller-facing description or note. */
  @Column({ type: "text", nullable: true })
  description: string;

  /**
   * When true, the customer MUST pick at least one option from this type.
   * When false, the entire customization type can be skipped.
   */
  @Column({ type: "boolean", default: true })
  isRequired: boolean;

  /**
   * When true, the customer can select more than one option in this type
   * (e.g. multiple embellishments).
   * When false, only one option can be selected.
   */
  @Column({ type: "boolean", default: false })
  allowMultipleSelection: boolean;

  @Column({ type: "int", default: 0 })
  sortOrder: number;

  @Column({ type: "boolean", default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // ─── Relations ────────────────────────────────────────────────────────────

  @ManyToOne(() => CustomCategory, (category) => category.customizationTypes, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "fkCategoryId" })
  category: CustomCategory;

  @OneToMany(() => CustomizationOption, (option) => option.customizationType, {
    cascade: true,
  })
  options: CustomizationOption[];
}
