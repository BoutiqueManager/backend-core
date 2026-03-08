import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  Index,
} from "typeorm";

/**
 * Blacklisted Tokens Entity
 *
 * Stores JWT tokens that have been invalidated through logout.
 * Prevents reuse of tokens after user logs out.
 *
 * @author anand maurya
 * @version 1.0.0
 */
@Entity("blacklisted_tokens")
@Index(["jti"])
@Index(["expiresAt"])
export class BlacklistedToken {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "varchar", length: 255, unique: true })
  jti: string; // JWT ID (unique identifier from token)

  @Column({ type: "uuid", nullable: true })
  boutiqueUserId: string;

  @Column({ type: "uuid", nullable: true })
  customerUserId: string;

  @Column({ type: "varchar", length: 50, default: "logout" })
  reason: string; // logout, force_logout, security, etc.

  @Column({ type: "timestamp" })
  expiresAt: Date; // Token expiration time

  @CreateDateColumn()
  blacklistedAt: Date;
}
