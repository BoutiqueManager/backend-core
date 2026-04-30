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
exports.V2AppliedCoupon = void 0;
const typeorm_1 = require("typeorm");
const v2_order_entity_1 = require("./v2-order.entity");
/**
 * Coupons applied to a specific v2_order.
 * Per PRD: coupons are NEVER applicable on return or exchange orders.
 * One row per coupon per order (multiple coupons = multiple rows).
 */
let V2AppliedCoupon = class V2AppliedCoupon {
};
exports.V2AppliedCoupon = V2AppliedCoupon;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", String)
], V2AppliedCoupon.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "uuid" }),
    __metadata("design:type", String)
], V2AppliedCoupon.prototype, "orderId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => v2_order_entity_1.V2Order, (order) => order.appliedCoupons, {
        onDelete: "CASCADE",
    }),
    (0, typeorm_1.JoinColumn)({ name: "orderId" }),
    __metadata("design:type", v2_order_entity_1.V2Order)
], V2AppliedCoupon.prototype, "order", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "uuid" }),
    __metadata("design:type", String)
], V2AppliedCoupon.prototype, "checkoutSessionId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "uuid" }),
    __metadata("design:type", String)
], V2AppliedCoupon.prototype, "customerId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 50 }),
    __metadata("design:type", String)
], V2AppliedCoupon.prototype, "couponCode", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "uuid", nullable: true }),
    __metadata("design:type", String)
], V2AppliedCoupon.prototype, "couponId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 50, nullable: true }),
    __metadata("design:type", String)
], V2AppliedCoupon.prototype, "couponType", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "decimal", precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], V2AppliedCoupon.prototype, "discountValue", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" }),
    __metadata("design:type", Date)
], V2AppliedCoupon.prototype, "appliedAt", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], V2AppliedCoupon.prototype, "createdAt", void 0);
exports.V2AppliedCoupon = V2AppliedCoupon = __decorate([
    (0, typeorm_1.Entity)("v2_applied_coupons"),
    (0, typeorm_1.Index)(["orderId"]),
    (0, typeorm_1.Index)(["checkoutSessionId"])
], V2AppliedCoupon);
//# sourceMappingURL=v2-applied-coupon.entity.js.map