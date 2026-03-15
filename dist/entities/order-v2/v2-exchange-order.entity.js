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
exports.V2ExchangeOrder = void 0;
const typeorm_1 = require("typeorm");
const order_v2_enum_1 = require("../../enums/order-v2.enum");
const v2_exchange_order_item_entity_1 = require("./v2-exchange-order-item.entity");
/**
 * One Exchange Order groups items exchanged in a single pickup+delivery operation.
 *
 * Merge rules are identical to return orders per PRD §3.2.2.
 * Exchange Order ID format: EXC-YYYY-#####
 *
 * Key pricing rules per PRD §1.6:
 *   - priceDifference > 0 → customer pays BEFORE exchange is placed
 *   - priceDifference < 0 → refund ONLY after seller confirms receipt
 *   - priceDifference = 0 → no payment/refund action
 *
 * Exchange restrictions per PRD §1.2:
 *   - made_to_measure → can only exchange for ready_to_ship from SAME boutique
 *   - ready_to_ship → can exchange for ready_to_ship from same OR different boutique
 */
let V2ExchangeOrder = class V2ExchangeOrder {
};
exports.V2ExchangeOrder = V2ExchangeOrder;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", String)
], V2ExchangeOrder.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Index)({ unique: true }),
    (0, typeorm_1.Column)({ type: "varchar", length: 30, unique: true }),
    __metadata("design:type", String)
], V2ExchangeOrder.prototype, "exchangeOrderId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "uuid" }),
    __metadata("design:type", String)
], V2ExchangeOrder.prototype, "originalOrderId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "uuid" }),
    __metadata("design:type", String)
], V2ExchangeOrder.prototype, "checkoutSessionId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "uuid" }),
    __metadata("design:type", String)
], V2ExchangeOrder.prototype, "customerId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "uuid" }),
    __metadata("design:type", String)
], V2ExchangeOrder.prototype, "boutiqueId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 200 }),
    __metadata("design:type", String)
], V2ExchangeOrder.prototype, "boutiqueName", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "uuid", nullable: true }),
    __metadata("design:type", String)
], V2ExchangeOrder.prototype, "newItemDeliveryAddressId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "jsonb", nullable: true }),
    __metadata("design:type", Object)
], V2ExchangeOrder.prototype, "newItemDeliveryAddress", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "uuid", nullable: true, unique: true }),
    __metadata("design:type", String)
], V2ExchangeOrder.prototype, "reverseShipmentId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "boolean", default: false }),
    __metadata("design:type", Boolean)
], V2ExchangeOrder.prototype, "isPickupLocked", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "timestamp", nullable: true }),
    __metadata("design:type", Date)
], V2ExchangeOrder.prototype, "pickedUpAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", nullable: true }),
    __metadata("design:type", String)
], V2ExchangeOrder.prototype, "forwardTrackingNumber", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", nullable: true }),
    __metadata("design:type", String)
], V2ExchangeOrder.prototype, "forwardTrackingCarrier", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", nullable: true }),
    __metadata("design:type", String)
], V2ExchangeOrder.prototype, "forwardTrackingUrl", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "decimal", precision: 10, scale: 2, default: 0 }),
    __metadata("design:type", Number)
], V2ExchangeOrder.prototype, "forwardShippingCharges", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "decimal", precision: 12, scale: 2, default: 0 }),
    __metadata("design:type", Number)
], V2ExchangeOrder.prototype, "originalItemFinalPrice", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "decimal", precision: 12, scale: 2, default: 0 }),
    __metadata("design:type", Number)
], V2ExchangeOrder.prototype, "newItemFinalPrice", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "decimal", precision: 12, scale: 2, default: 0 }),
    __metadata("design:type", Number)
], V2ExchangeOrder.prototype, "priceDifference", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "enum",
        enum: order_v2_enum_1.ExchangePricingType,
        default: order_v2_enum_1.ExchangePricingType.NO_ACTION,
    }),
    __metadata("design:type", String)
], V2ExchangeOrder.prototype, "exchangePricingType", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "uuid", nullable: true }),
    __metadata("design:type", String)
], V2ExchangeOrder.prototype, "additionalPaymentId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "uuid", nullable: true }),
    __metadata("design:type", String)
], V2ExchangeOrder.prototype, "refundId", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "enum",
        enum: order_v2_enum_1.ExchangeOrderStatus,
        default: order_v2_enum_1.ExchangeOrderStatus.INITIATED,
    }),
    __metadata("design:type", String)
], V2ExchangeOrder.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "date", nullable: true }),
    __metadata("design:type", Date)
], V2ExchangeOrder.prototype, "scheduledPickupDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 50, nullable: true }),
    __metadata("design:type", String)
], V2ExchangeOrder.prototype, "scheduledPickupSlot", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "timestamp", nullable: true }),
    __metadata("design:type", Date)
], V2ExchangeOrder.prototype, "receivedBySellerAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "timestamp", nullable: true }),
    __metadata("design:type", Date)
], V2ExchangeOrder.prototype, "completedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "timestamp", nullable: true }),
    __metadata("design:type", Date)
], V2ExchangeOrder.prototype, "rejectedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text", nullable: true }),
    __metadata("design:type", String)
], V2ExchangeOrder.prototype, "rejectionReason", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "boolean", default: true }),
    __metadata("design:type", Boolean)
], V2ExchangeOrder.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => v2_exchange_order_item_entity_1.V2ExchangeOrderItem, (item) => item.exchangeOrder),
    __metadata("design:type", Array)
], V2ExchangeOrder.prototype, "exchangeOrderItems", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], V2ExchangeOrder.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], V2ExchangeOrder.prototype, "updatedAt", void 0);
exports.V2ExchangeOrder = V2ExchangeOrder = __decorate([
    (0, typeorm_1.Entity)("v2_exchange_orders"),
    (0, typeorm_1.Index)(["originalOrderId"]),
    (0, typeorm_1.Index)(["customerId", "status"]),
    (0, typeorm_1.Index)(["boutiqueId", "status"])
], V2ExchangeOrder);
//# sourceMappingURL=v2-exchange-order.entity.js.map