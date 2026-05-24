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
import { CustomizationType } from "./customization-type.entity";

/**
 * Customization Option Entity
 *
 * A concrete option within a Customization Type.
 * e.g. within "Neck Style": "Sweetheart Neck", "Square Neck", "Corset Style".
 * e.g. within "Sleeve Type": "Hand Embroidered Elbow", "Ruffled Cap Sleeves".
 *
 * Each option has:
 *  - An additionalPrice (can be ₹0 if the seller includes it for free)
 *  - One or more reference images
 *  - An optional description
 *
 * Pricing: the additionalPrice of every selected option is summed into the order total.
 */
@Entity("customization_options")
@Index(["fkCustomizationTypeId"])
@Index(["fkCustomizationTypeId", "isActive"])
export class CustomizationOption {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "uuid" })
  fkCustomizationTypeId: string;

  /**
   * Human-readable label shown on the customer selection screen.
   * e.g. "Sweetheart Neck", "Open Back with Chain", "Balloon Sleeves"
   */
  @Column({ type: "varchar", length: 100 })
  name: string;

  /** Optional description giving more detail about the option. */
  @Column({ type: "text", nullable: true })
  description: string;

  /**
   * Extra cost charged when the customer selects this option.
   * Set to 0 if the seller includes it at no additional charge.
   * e.g. Sweetheart Neck = ₹500, Open Back with Chain = ₹800
   */
  @Column({ type: "decimal", precision: 10, scale: 2, default: 0 })
  additionalPrice: number;

  /**
   * Reference images for this option.
   * Stored as R2 key pairs; URLs are generated dynamically at serve-time.
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

  @ManyToOne(
    () => CustomizationType,
    (customizationType) => customizationType.options,
    { onDelete: "CASCADE" },
  )
  @JoinColumn({ name: "fkCustomizationTypeId" })
  customizationType: CustomizationType;
}
