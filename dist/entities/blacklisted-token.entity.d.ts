/**
 * Blacklisted Tokens Entity
 *
 * Stores JWT tokens that have been invalidated through logout.
 * Prevents reuse of tokens after user logs out.
 *
 * @author anand maurya
 * @version 1.0.0
 */
export declare class BlacklistedToken {
    id: string;
    jti: string;
    boutiqueUserId: string;
    customerUserId: string;
    reason: string;
    expiresAt: Date;
    blacklistedAt: Date;
}
