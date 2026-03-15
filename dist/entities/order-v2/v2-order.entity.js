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
exports.V2Order = void 0;
const typeorm_1 = require("typeorm");
const order_v2_enum_1 = require("../../enums/order-v2.enum");
const v2_checkout_session_entity_1 = require("./v2-checkout-session.entity");
const v2_order_item_entity_1 = require("./v2-order-item.entity");
const v2_applied_coupon_entity_1 = require("./v2-applied-coupon.entity");
let V2Order = class V2Order {
};
exports.V2Order = V2Order;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", String)
], V2Order.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Index)({ unique: true }),
    (0, typeorm_1.Column)({ type: "varchar", length: 30, unique: true }),
    __metadata("design:type", String)
], V2Order.prototype, "orderId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "uuid" }),
    __metadata("design:type", String)
], V2Order.prototype, "checkoutSessionId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => v2_checkout_session_entity_1.V2CheckoutSession, (session) => session.orders),
    (0, typeorm_1.JoinColumn)({ name: "checkoutSessionId" }),
    __metadata("design:type", v2_checkout_session_entity_1.V2CheckoutSession)
], V2Order.prototype, "checkoutSession", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "uuid" }),
    __metadata("design:type", String)
], V2Order.prototype, "customerId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "uuid" }),
    __metadata("design:type", String)
], V2Order.prototype, "boutiqueId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 200 }),
    __metadata("design:type", String)
], V2Order.prototype, "boutiqueName", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", nullable: true }),
    __metadata("design:type", String)
], V2Order.prototype, "boutiqueLogoUrl", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "decimal", precision: 12, scale: 2, default: 0 }),
    __metadata("design:type", Number)
], V2Order.prototype, "subtotalMrp", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "decimal", precision: 12, scale: 2, default: 0 }),
    __metadata("design:type", Number)
], V2Order.prototype, "totalDiscount", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "decimal", precision: 12, scale: 2, default: 0 }),
    __metadata("design:type", Number)
], V2Order.prototype, "subtotalOfferPrice", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "decimal", precision: 12, scale: 2, default: 0 }),
    __metadata("design:type", Number)
], V2Order.prototype, "totalCouponDiscount", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "decimal", precision: 10, scale: 2, default: 0 }),
    __metadata("design:type", Number)
], V2Order.prototype, "shippingCharges", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "decimal", precision: 10, scale: 2, default: 0 }),
    __metadata("design:type", Number)
], V2Order.prototype, "totalTax", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "decimal", precision: 12, scale: 2, default: 0 }),
    __metadata("design:type", Number)
], V2Order.prototype, "grandTotal", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "boolean", default: false }),
    __metadata("design:type", Boolean)
], V2Order.prototype, "hasPartialPayment", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "decimal", precision: 5, scale: 2, nullable: true }),
    __metadata("design:type", Number)
], V2Order.prototype, "advancePercentage", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "decimal", precision: 12, scale: 2, default: 0 }),
    __metadata("design:type", Number)
], V2Order.prototype, "advancePaid", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "decimal", precision: 12, scale: 2, default: 0 }),
    __metadata("design:type", Number)
], V2Order.prototype, "remainingAmount", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "timestamp", nullable: true }),
    __metadata("design:type", Date)
], V2Order.prototype, "remainingPaidAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "enum", enum: order_v2_enum_1.PaymentMethodV2 }),
    __metadata("design:type", String)
], V2Order.prototype, "paymentMethod", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "enum",
        enum: order_v2_enum_1.OrderPaymentStatusV2,
        default: order_v2_enum_1.OrderPaymentStatusV2.PENDING,
    }),
    __metadata("design:type", String)
], V2Order.prototype, "paymentStatus", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "jsonb" }),
    __metadata("design:type", Object)
], V2Order.prototype, "shippingAddress", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "jsonb", nullable: true }),
    __metadata("design:type", Object)
], V2Order.prototype, "billingAddress", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", nullable: true }),
    __metadata("design:type", String)
], V2Order.prototype, "trackingNumber", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", nullable: true }),
    __metadata("design:type", String)
], V2Order.prototype, "trackingCarrier", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", nullable: true }),
    __metadata("design:type", String)
], V2Order.prototype, "trackingUrl", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "enum", enum: order_v2_enum_1.OrderStatusV2, default: order_v2_enum_1.OrderStatusV2.NEW }),
    __metadata("design:type", String)
], V2Order.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" }),
    __metadata("design:type", Date)
], V2Order.prototype, "orderDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "timestamp", nullable: true }),
    __metadata("design:type", Date)
], V2Order.prototype, "confirmedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "timestamp", nullable: true }),
    __metadata("design:type", Date)
], V2Order.prototype, "shippedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "timestamp", nullable: true }),
    __metadata("design:type", Date)
], V2Order.prototype, "outForDeliveryAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "timestamp", nullable: true }),
    __metadata("design:type", Date)
], V2Order.prototype, "deliveredAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "timestamp", nullable: true }),
    __metadata("design:type", Date)
], V2Order.prototype, "cancelledAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "date", nullable: true }),
    __metadata("design:type", Date)
], V2Order.prototype, "estimatedDeliveryDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "date", nullable: true }),
    __metadata("design:type", Date)
], V2Order.prototype, "actualDeliveryDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "enum", enum: order_v2_enum_1.CancelledByV2, nullable: true }),
    __metadata("design:type", String)
], V2Order.prototype, "cancelledBy", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text", nullable: true }),
    __metadata("design:type", String)
], V2Order.prototype, "cancellationReason", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "boolean", default: false }),
    __metadata("design:type", Boolean)
], V2Order.prototype, "hasCustomizedItems", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "boolean", default: false }),
    __metadata("design:type", Boolean)
], V2Order.prototype, "hasReadyToShipItems", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text", nullable: true }),
    __metadata("design:type", String)
], V2Order.prototype, "customerNote", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text", nullable: true }),
    __metadata("design:type", String)
], V2Order.prototype, "sellerNote", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "boolean", default: true }),
    __metadata("design:type", Boolean)
], V2Order.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => v2_order_item_entity_1.V2OrderItem, (item) => item.order),
    __metadata("design:type", Array)
], V2Order.prototype, "orderItems", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => v2_applied_coupon_entity_1.V2AppliedCoupon, (coupon) => coupon.order),
    __metadata("design:type", Array)
], V2Order.prototype, "appliedCoupons", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], V2Order.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], V2Order.prototype, "updatedAt", void 0);
exports.V2Order = V2Order = __decorate([
    (0, typeorm_1.Entity)("v2_orders"),
    (0, typeorm_1.Index)(["customerId", "status"]),
    (0, typeorm_1.Index)(["boutiqueId", "status"]),
    (0, typeorm_1.Index)(["checkoutSessionId"]),
    (0, typeorm_1.Index)(["orderDate"])
], V2Order);
//# sourceMappingURL=v2-order.entity.js.map