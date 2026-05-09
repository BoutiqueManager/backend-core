import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

export enum Gender {
  MEN = "men",
  WOMEN = "women",
  KIDS = "kids",
  UNISEX = "unisex",
}

@Entity("product_categories")
export class ProductCategories {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "varchar", length: 100, unique: true })
  name: string;

  @Column({ type: "enum", enum: Gender, nullable: true })
  gender: Gender | null;

  @Column({ type: "text", nullable: true })
  description?: string;

  @Column({ type: "varchar", length: 255, nullable: true })
  imagePreviewKey?: string;

  @Column({ type: "varchar", length: 255, nullable: true })
  imageOriginalKey?: string;

  @CreateDateColumn({ name: "createdAt" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updatedAt" })
  updatedAt: Date;
}

export default ProductCategories;
