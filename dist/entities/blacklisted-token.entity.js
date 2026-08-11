"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlacklistedToken = void 0;
const typeorm_1 = require("typeorm");
/**
 * Blacklisted Tokens Entity
 *
 * Stores JWT tokens that have been invalidated through logout.
 * Prevents reuse of tokens after user logs out.
 *
 * @author anand maurya
 * @version 1.0.0
 */
let BlacklistedToken = class BlacklistedToken {
};
exports.BlacklistedToken = BlacklistedToken;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", String)
], BlacklistedToken.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 255, unique: true }),
    __metadata("design:type", String)
], BlacklistedToken.prototype, "jti", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "uuid", nullable: true }),
    __metadata("design:type", String)
], BlacklistedToken.prototype, "boutiqueUserId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "uuid", nullable: true }),
    __metadata("design:type", String)
], BlacklistedToken.prototype, "customerUserId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 50, default: "logout" }),
    __metadata("design:type", String)
], BlacklistedToken.prototype, "reason", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "timestamp" }),
    __metadata("design:type", Date)
], BlacklistedToken.prototype, "expiresAt", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], BlacklistedToken.prototype, "blacklistedAt", void 0);
exports.BlacklistedToken = BlacklistedToken = __decorate([
    (0, typeorm_1.Entity)("blacklisted_tokens"),
    (0, typeorm_1.Index)(["jti"]),
    (0, typeorm_1.Index)(["expiresAt"])
], BlacklistedToken);
//# sourceMappingURL=blacklisted-token.entity.js.map