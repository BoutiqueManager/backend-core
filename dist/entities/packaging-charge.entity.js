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
exports.PackagingCharge = void 0;
const typeorm_1 = require("typeorm");
/**
 * Per-category packaging cost + box dimensions for Shiprocket shipments.
 * One row per ProductCategories row (see product-categories.entity.ts).
 * Replaces the previously hardcoded PACKAGING_CHARGE_PER_ITEM constant
 * (customer-server/shiprocket.controller.ts) and the 4 duplicated 10×10×5
 * dimension blocks (customer-server/shiprocket.service.ts).
 *
 * Seeded with today's live hardcoded values (10×10×5 cm, ₹150) for every
 * category on migration — zero physical/deployment risk on day one. Tune
 * individual categories' real box sizes/prices later via direct DB updates,
 * no code change needed.
 *
 * If no row exists for a category (or the category is null/unmapped), the
 * lookup falls back to these same hardcoded defaults rather than throwing
 * — see ShiprocketService.getPackagingChargeForCategory.
 */
let PackagingCharge = class PackagingCharge {
};
exports.PackagingCharge = PackagingCharge;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", String)
], PackagingCharge.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Index)({ unique: true }),
    (0, typeorm_1.Column)({ type: "uuid", unique: true }),
    __metadata("design:type", String)
], PackagingCharge.prototype, "categoryId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "decimal", precision: 6, scale: 2, default: 10 }),
    __metadata("design:type", Number)
], PackagingCharge.prototype, "boxLength", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "decimal", precision: 6, scale: 2, default: 10 }),
    __metadata("design:type", Number)
], PackagingCharge.prototype, "boxWidth", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "decimal", precision: 6, scale: 2, default: 5 }),
    __metadata("design:type", Number)
], PackagingCharge.prototype, "boxHeight", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "decimal", precision: 10, scale: 2, default: 150 }),
    __metadata("design:type", Number)
], PackagingCharge.prototype, "price", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: "createdAt" }),
    __metadata("design:type", Date)
], PackagingCharge.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: "updatedAt" }),
    __metadata("design:type", Date)
], PackagingCharge.prototype, "updatedAt", void 0);
exports.PackagingCharge = PackagingCharge = __decorate([
    (0, typeorm_1.Entity)("v2_packaging_charges")
], PackagingCharge);
//# sourceMappingURL=packaging-charge.entity.js.map