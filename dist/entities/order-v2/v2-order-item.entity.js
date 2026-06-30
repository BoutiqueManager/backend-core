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
exports.V2OrderItem = void 0;
const typeorm_1 = require("typeorm");
const order_v2_enum_1 = require("../../enums/order-v2.enum");
const v2_order_entity_1 = require("./v2-order.entity");
let V2OrderItem = class V2OrderItem {
};
exports.V2OrderItem = V2OrderItem;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", String)
], V2OrderItem.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Index)({ unique: true }),
    (0, typeorm_1.Column)({ type: "varchar", length: 40, unique: true }),
    __metadata("design:type", String)
], V2OrderItem.prototype, "orderItemId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "uuid" }),
    __metadata("design:type", String)
], V2OrderItem.prototype, "orderId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => v2_order_entity_1.V2Order, (order) => order.orderItems, {
        onDelete: "CASCADE",
    }),
    (0, typeorm_1.JoinColumn)({ name: "orderId" }),
    __metadata("design:type", v2_order_entity_1.V2Order)
], V2OrderItem.prototype, "order", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "uuid" }),
    __metadata("design:type", String)
], V2OrderItem.prototype, "checkoutSessionId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "uuid" }),
    __metadata("design:type", String)
], V2OrderItem.prototype, "customerId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "uuid" }),
    __metadata("design:type", String)
], V2OrderItem.prototype, "productId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 300 }),
    __metadata("design:type", String)
], V2OrderItem.prototype, "productName", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 100, nullable: true }),
    __metadata("design:type", String)
], V2OrderItem.prototype, "productSku", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "uuid", nullable: true }),
    __metadata("design:type", String)
], V2OrderItem.prototype, "inventoryId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "uuid", nullable: true }),
    __metadata("design:type", String)
], V2OrderItem.prototype, "productSizeId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "uuid", nullable: true }),
    __metadata("design:type", String)
], V2OrderItem.prototype, "categoryId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "uuid" }),
    __metadata("design:type", String)
], V2OrderItem.prototype, "boutiqueId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 200 }),
    __metadata("design:type", String)
], V2OrderItem.prototype, "boutiqueName", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", nullable: true }),
    __metadata("design:type", String)
], V2OrderItem.prototype, "primaryImageUrl", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "enum", enum: order_v2_enum_1.ProductTypeV2 }),
    __metadata("design:type", String)
], V2OrderItem.prototype, "productType", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 50, nullable: true }),
    __metadata("design:type", String)
], V2OrderItem.prototype, "selectedSize", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "decimal", precision: 10, scale: 2, default: 0 }),
    __metadata("design:type", Number)
], V2OrderItem.prototype, "selectedSizeAdditionalPrice", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "jsonb", nullable: true }),
    __metadata("design:type", Object)
], V2OrderItem.prototype, "customizationOptions", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "uuid", nullable: true }),
    __metadata("design:type", String)
], V2OrderItem.prototype, "measurementId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "jsonb", nullable: true }),
    __metadata("design:type", Object)
], V2OrderItem.prototype, "measurementSnapshot", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "boolean", default: false }),
    __metadata("design:type", Boolean)
], V2OrderItem.prototype, "isCustomized", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "decimal", precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], V2OrderItem.prototype, "mrp", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "decimal", precision: 10, scale: 2, default: 0 }),
    __metadata("design:type", Number)
], V2OrderItem.prototype, "discountAmount", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "decimal", precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], V2OrderItem.prototype, "offerPrice", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 50, nullable: true }),
    __metadata("design:type", String)
], V2OrderItem.prototype, "campaignCode", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "decimal", precision: 10, scale: 2, default: 0 }),
    __metadata("design:type", Number)
], V2OrderItem.prototype, "couponDiscountPerItem", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "decimal", precision: 10, scale: 2, default: 0 }),
    __metadata("design:type", Number)
], V2OrderItem.prototype, "taxPerItem", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "decimal", precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], V2OrderItem.prototype, "finalPricePerItem", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "int", default: 1 }),
    __metadata("design:type", Number)
], V2OrderItem.prototype, "quantity", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "decimal", precision: 12, scale: 2 }),
    __metadata("design:type", Number)
], V2OrderItem.prototype, "totalMrp", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "decimal", precision: 12, scale: 2 }),
    __metadata("design:type", Number)
], V2OrderItem.prototype, "totalDiscount", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "decimal", precision: 12, scale: 2 }),
    __metadata("design:type", Number)
], V2OrderItem.prototype, "totalOfferPrice", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "decimal", precision: 12, scale: 2, default: 0 }),
    __metadata("design:type", Number)
], V2OrderItem.prototype, "totalCouponDiscount", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "decimal", precision: 12, scale: 2, default: 0 }),
    __metadata("design:type", Number)
], V2OrderItem.prototype, "totalTax", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "decimal", precision: 12, scale: 2 }),
    __metadata("design:type", Number)
], V2OrderItem.prototype, "totalFinalPrice", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "decimal", precision: 12, scale: 2, default: 0 }),
    __metadata("design:type", Number)
], V2OrderItem.prototype, "advancePaid", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "decimal", precision: 5, scale: 2, default: 0 }),
    __metadata("design:type", Number)
], V2OrderItem.prototype, "advancedPercentagePaid", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "decimal", precision: 12, scale: 2, default: 0 }),
    __metadata("design:type", Number)
], V2OrderItem.prototype, "remainingAmount", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text", nullable: true }),
    __metadata("design:type", String)
], V2OrderItem.prototype, "customerNote", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "enum",
        enum: order_v2_enum_1.OrderItemStatusV2,
        default: order_v2_enum_1.OrderItemStatusV2.NEW,
    }),
    __metadata("design:type", String)
], V2OrderItem.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "timestamp", nullable: true }),
    __metadata("design:type", Date)
], V2OrderItem.prototype, "confirmedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "timestamp", nullable: true }),
    __metadata("design:type", Date)
], V2OrderItem.prototype, "shippedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "timestamp", nullable: true }),
    __metadata("design:type", Date)
], V2OrderItem.prototype, "outForDeliveryAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "timestamp", nullable: true }),
    __metadata("design:type", Date)
], V2OrderItem.prototype, "deliveredAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "date", nullable: true }),
    __metadata("design:type", Date)
], V2OrderItem.prototype, "estimatedDeliveryDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "timestamp", nullable: true }),
    __metadata("design:type", Date)
], V2OrderItem.prototype, "cancelledAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "enum", enum: order_v2_enum_1.CancelledByV2, nullable: true }),
    __metadata("design:type", String)
], V2OrderItem.prototype, "cancelledBy", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text", nullable: true }),
    __metadata("design:type", String)
], V2OrderItem.prototype, "cancellationReason", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "int", nullable: true }),
    __metadata("design:type", Number)
], V2OrderItem.prototype, "returnWindowDays", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "timestamp", nullable: true }),
    __metadata("design:type", Date)
], V2OrderItem.prototype, "returnWindowClosesAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "int", nullable: true }),
    __metadata("design:type", Number)
], V2OrderItem.prototype, "exchangeWindowDays", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "timestamp", nullable: true }),
    __metadata("design:type", Date)
], V2OrderItem.prototype, "exchangeWindowClosesAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 50, nullable: true, default: "NONE" }),
    __metadata("design:type", String)
], V2OrderItem.prototype, "returnStatus", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 50, nullable: true, default: "NONE" }),
    __metadata("design:type", String)
], V2OrderItem.prototype, "exchangeStatus", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "uuid", nullable: true }),
    __metadata("design:type", String)
], V2OrderItem.prototype, "activeReturnOrderItemId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "uuid", nullable: true }),
    __metadata("design:type", String)
], V2OrderItem.prototype, "activeExchangeOrderItemId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "timestamp", nullable: true }),
    __metadata("design:type", Date)
], V2OrderItem.prototype, "shippingMediaExpiresAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "boolean", default: false }),
    __metadata("design:type", Boolean)
], V2OrderItem.prototype, "isRated", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "uuid", nullable: true }),
    __metadata("design:type", String)
], V2OrderItem.prototype, "ratingId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "timestamp", nullable: true }),
    __metadata("design:type", Date)
], V2OrderItem.prototype, "ratedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", nullable: true }),
    __metadata("design:type", String)
], V2OrderItem.prototype, "trackingNumber", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", nullable: true }),
    __metadata("design:type", String)
], V2OrderItem.prototype, "trackingCarrier", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", nullable: true }),
    __metadata("design:type", String)
], V2OrderItem.prototype, "trackingUrl", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "boolean", default: true }),
    __metadata("design:type", Boolean)
], V2OrderItem.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], V2OrderItem.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], V2OrderItem.prototype, "updatedAt", void 0);
exports.V2OrderItem = V2OrderItem = __decorate([
    (0, typeorm_1.Entity)("v2_order_items"),
    (0, typeorm_1.Index)(["orderId"]),
    (0, typeorm_1.Index)(["customerId", "status"]),
    (0, typeorm_1.Index)(["productId"]),
    (0, typeorm_1.Index)(["returnWindowClosesAt"]),
    (0, typeorm_1.Index)(["exchangeWindowClosesAt"])
], V2OrderItem);
//# sourceMappingURL=v2-order-item.entity.js.map