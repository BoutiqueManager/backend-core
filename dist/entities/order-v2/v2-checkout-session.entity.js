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
exports.V2CheckoutSession = void 0;
const typeorm_1 = require("typeorm");
const order_v2_enum_1 = require("../../enums/order-v2.enum");
const v2_order_entity_1 = require("./v2-order.entity");
let V2CheckoutSession = class V2CheckoutSession {
};
exports.V2CheckoutSession = V2CheckoutSession;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", String)
], V2CheckoutSession.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Index)({ unique: true }),
    (0, typeorm_1.Column)({ type: "varchar", length: 30, unique: true }),
    __metadata("design:type", String)
], V2CheckoutSession.prototype, "checkoutSessionId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "uuid" }),
    __metadata("design:type", String)
], V2CheckoutSession.prototype, "customerId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "uuid", nullable: true }),
    __metadata("design:type", String)
], V2CheckoutSession.prototype, "cartId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "decimal", precision: 12, scale: 2, default: 0 }),
    __metadata("design:type", Number)
], V2CheckoutSession.prototype, "totalMrp", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "decimal", precision: 12, scale: 2, default: 0 }),
    __metadata("design:type", Number)
], V2CheckoutSession.prototype, "totalDiscount", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "decimal", precision: 12, scale: 2, default: 0 }),
    __metadata("design:type", Number)
], V2CheckoutSession.prototype, "totalOfferPrice", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "decimal", precision: 12, scale: 2, default: 0 }),
    __metadata("design:type", Number)
], V2CheckoutSession.prototype, "totalCouponDiscount", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "decimal", precision: 10, scale: 2, default: 0 }),
    __metadata("design:type", Number)
], V2CheckoutSession.prototype, "totalShippingCharges", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "decimal", precision: 10, scale: 2, default: 0 }),
    __metadata("design:type", Number)
], V2CheckoutSession.prototype, "totalTax", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "decimal", precision: 12, scale: 2, default: 0 }),
    __metadata("design:type", Number)
], V2CheckoutSession.prototype, "grandTotal", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "boolean", default: false }),
    __metadata("design:type", Boolean)
], V2CheckoutSession.prototype, "hasPartialPayment", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "decimal", precision: 12, scale: 2, default: 0 }),
    __metadata("design:type", Number)
], V2CheckoutSession.prototype, "advancePaid", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "decimal", precision: 12, scale: 2, default: 0 }),
    __metadata("design:type", Number)
], V2CheckoutSession.prototype, "remainingAmount", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "enum", enum: order_v2_enum_1.PaymentMethodV2 }),
    __metadata("design:type", String)
], V2CheckoutSession.prototype, "paymentMethod", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "enum",
        enum: order_v2_enum_1.PaymentStatusV2,
        default: order_v2_enum_1.PaymentStatusV2.PENDING,
    }),
    __metadata("design:type", String)
], V2CheckoutSession.prototype, "paymentStatus", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", nullable: true }),
    __metadata("design:type", String)
], V2CheckoutSession.prototype, "razorpayOrderId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "uuid" }),
    __metadata("design:type", String)
], V2CheckoutSession.prototype, "shippingAddressId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "uuid", nullable: true }),
    __metadata("design:type", String)
], V2CheckoutSession.prototype, "billingAddressId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "jsonb" }),
    __metadata("design:type", Object)
], V2CheckoutSession.prototype, "shippingAddress", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "jsonb", nullable: true }),
    __metadata("design:type", Object)
], V2CheckoutSession.prototype, "billingAddress", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "enum",
        enum: order_v2_enum_1.CheckoutSessionStatus,
        default: order_v2_enum_1.CheckoutSessionStatus.ACTIVE,
    }),
    __metadata("design:type", String)
], V2CheckoutSession.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "timestamp", nullable: true }),
    __metadata("design:type", Date)
], V2CheckoutSession.prototype, "completedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "timestamp", nullable: true }),
    __metadata("design:type", Date)
], V2CheckoutSession.prototype, "sessionExpiresAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "timestamp", nullable: true }),
    __metadata("design:type", Date)
], V2CheckoutSession.prototype, "abandonedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "int", default: 0 }),
    __metadata("design:type", Number)
], V2CheckoutSession.prototype, "retryCount", void 0);
__decorate([
    (0, typeorm_1.Index)({ unique: true, where: '"idempotencyKey" IS NOT NULL' }),
    (0, typeorm_1.Column)({ type: "varchar", length: 64, nullable: true }),
    __metadata("design:type", String)
], V2CheckoutSession.prototype, "idempotencyKey", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => v2_order_entity_1.V2Order, (order) => order.checkoutSession),
    __metadata("design:type", Array)
], V2CheckoutSession.prototype, "orders", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], V2CheckoutSession.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], V2CheckoutSession.prototype, "updatedAt", void 0);
exports.V2CheckoutSession = V2CheckoutSession = __decorate([
    (0, typeorm_1.Entity)("v2_checkout_sessions"),
    (0, typeorm_1.Index)(["customerId"]),
    (0, typeorm_1.Index)(["razorpayOrderId"]),
    (0, typeorm_1.Index)(["status"])
], V2CheckoutSession);
//# sourceMappingURL=v2-checkout-session.entity.js.map