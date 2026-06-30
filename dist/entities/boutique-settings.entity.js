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
exports.BoutiqueSettings = void 0;
const typeorm_1 = require("typeorm");
/**
 * Boutique seller settings for payment, returns, and notifications.
 * Owned and managed by the boutique seller via boutique-server.
 * Read by customer-server when creating orders to determine payment policies.
 *
 * If no record exists for a boutique, system defaults apply.
 * This entity is shared between both servers via backend-core.
 */
let BoutiqueSettings = class BoutiqueSettings {
};
exports.BoutiqueSettings = BoutiqueSettings;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", String)
], BoutiqueSettings.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Index)({ unique: true }),
    (0, typeorm_1.Column)({ type: "uuid", unique: true }),
    __metadata("design:type", String)
], BoutiqueSettings.prototype, "boutiqueId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "decimal", precision: 5, scale: 2, default: 30 }),
    __metadata("design:type", Number)
], BoutiqueSettings.prototype, "advancePaymentPercentage", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "decimal", precision: 5, scale: 2, default: 70 }),
    __metadata("design:type", Number)
], BoutiqueSettings.prototype, "partialPayoutPercentage", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "enum",
        enum: ["immediate", "weekly", "bi_weekly", "monthly"],
        default: "weekly",
    }),
    __metadata("design:type", String)
], BoutiqueSettings.prototype, "payoutSchedule", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "decimal", precision: 10, scale: 2, default: 1000 }),
    __metadata("design:type", Number)
], BoutiqueSettings.prototype, "minimumPayoutThreshold", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "simple-array", default: ["upi", "cards"] }),
    __metadata("design:type", Array)
], BoutiqueSettings.prototype, "acceptedPaymentMethods", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "boolean", default: false }),
    __metadata("design:type", Boolean)
], BoutiqueSettings.prototype, "acceptsCod", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "decimal", precision: 10, scale: 2, nullable: true }),
    __metadata("design:type", Number)
], BoutiqueSettings.prototype, "codMinOrderValue", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "int", default: 7 }),
    __metadata("design:type", Number)
], BoutiqueSettings.prototype, "returnWindowDays", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "int", default: 14 }),
    __metadata("design:type", Number)
], BoutiqueSettings.prototype, "exchangeWindowDays", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "enum",
        enum: ["seller", "customer", "split"],
        default: "customer",
    }),
    __metadata("design:type", String)
], BoutiqueSettings.prototype, "returnShippingFeeResponsibility", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "decimal", precision: 5, scale: 2, default: 0 }),
    __metadata("design:type", Number)
], BoutiqueSettings.prototype, "restockingFeePercentage", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "simple-array", nullable: true }),
    __metadata("design:type", Array)
], BoutiqueSettings.prototype, "nonReturnableCategories", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "json", default: {} }),
    __metadata("design:type", Object)
], BoutiqueSettings.prototype, "notificationPreferences", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "boolean", default: true }),
    __metadata("design:type", Boolean)
], BoutiqueSettings.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], BoutiqueSettings.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], BoutiqueSettings.prototype, "updatedAt", void 0);
exports.BoutiqueSettings = BoutiqueSettings = __decorate([
    (0, typeorm_1.Entity)("boutique_settings")
], BoutiqueSettings);
//# sourceMappingURL=boutique-settings.entity.js.map