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
exports.V2ExchangeOrderItem = void 0;
const typeorm_1 = require("typeorm");
const order_v2_enum_1 = require("../../enums/order-v2.enum");
const v2_exchange_order_entity_1 = require("./v2-exchange-order.entity");
/**
 * Individual item within an exchange order.
 * Captures both the original item being returned and the new item selected by customer.
 *
 * Exchange restrictions per PRD §1.2 and §3.3.5:
 *   - made_to_measure original → new item must be ready_to_ship from SAME boutique
 *   - ready_to_ship original → new item must be ready_to_ship (any boutique)
 *   - New item CANNOT be made_to_measure / customized
 *   - Size variant exchange only available for ready_to_ship originals
 *
 * Per PRD §3.3.4: coupon discounts are NOT applied on exchange orders.
 */
let V2ExchangeOrderItem = class V2ExchangeOrderItem {
};
exports.V2ExchangeOrderItem = V2ExchangeOrderItem;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", String)
], V2ExchangeOrderItem.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "uuid" }),
    __metadata("design:type", String)
], V2ExchangeOrderItem.prototype, "exchangeOrderId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => v2_exchange_order_entity_1.V2ExchangeOrder, (exchangeOrder) => exchangeOrder.exchangeOrderItems, { onDelete: "CASCADE" }),
    (0, typeorm_1.JoinColumn)({ name: "exchangeOrderId" }),
    __metadata("design:type", v2_exchange_order_entity_1.V2ExchangeOrder)
], V2ExchangeOrderItem.prototype, "exchangeOrder", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "uuid" }),
    __metadata("design:type", String)
], V2ExchangeOrderItem.prototype, "originalOrderItemId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "uuid" }),
    __metadata("design:type", String)
], V2ExchangeOrderItem.prototype, "orderId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text" }),
    __metadata("design:type", String)
], V2ExchangeOrderItem.prototype, "exchangeReason", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "enum", enum: order_v2_enum_1.ExchangeReasonCategory, nullable: true }),
    __metadata("design:type", String)
], V2ExchangeOrderItem.prototype, "exchangeReasonCategory", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "uuid" }),
    __metadata("design:type", String)
], V2ExchangeOrderItem.prototype, "originalProductId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 300 }),
    __metadata("design:type", String)
], V2ExchangeOrderItem.prototype, "originalProductName", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "enum", enum: order_v2_enum_1.ProductTypeV2 }),
    __metadata("design:type", String)
], V2ExchangeOrderItem.prototype, "originalProductType", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 50, nullable: true }),
    __metadata("design:type", String)
], V2ExchangeOrderItem.prototype, "originalSize", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", nullable: true }),
    __metadata("design:type", String)
], V2ExchangeOrderItem.prototype, "originalPrimaryImageUrl", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "decimal", precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], V2ExchangeOrderItem.prototype, "originalFinalPrice", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "int" }),
    __metadata("design:type", Number)
], V2ExchangeOrderItem.prototype, "originalQuantity", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "uuid" }),
    __metadata("design:type", String)
], V2ExchangeOrderItem.prototype, "newProductId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 300 }),
    __metadata("design:type", String)
], V2ExchangeOrderItem.prototype, "newProductName", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 100, nullable: true }),
    __metadata("design:type", String)
], V2ExchangeOrderItem.prototype, "newProductSku", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "uuid", nullable: true }),
    __metadata("design:type", String)
], V2ExchangeOrderItem.prototype, "newInventoryId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "uuid", nullable: true }),
    __metadata("design:type", String)
], V2ExchangeOrderItem.prototype, "newProductSizeId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 50, nullable: true }),
    __metadata("design:type", String)
], V2ExchangeOrderItem.prototype, "newSize", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", nullable: true }),
    __metadata("design:type", String)
], V2ExchangeOrderItem.prototype, "newPrimaryImageUrl", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "uuid" }),
    __metadata("design:type", String)
], V2ExchangeOrderItem.prototype, "newBoutiqueId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 200 }),
    __metadata("design:type", String)
], V2ExchangeOrderItem.prototype, "newBoutiqueName", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "enum",
        enum: order_v2_enum_1.ProductTypeV2,
        default: order_v2_enum_1.ProductTypeV2.READY_TO_SHIP,
    }),
    __metadata("design:type", String)
], V2ExchangeOrderItem.prototype, "newProductType", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "decimal", precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], V2ExchangeOrderItem.prototype, "newMrp", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "decimal", precision: 10, scale: 2, default: 0 }),
    __metadata("design:type", Number)
], V2ExchangeOrderItem.prototype, "newDiscountAmount", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "decimal", precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], V2ExchangeOrderItem.prototype, "newOfferPrice", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "int", default: 1 }),
    __metadata("design:type", Number)
], V2ExchangeOrderItem.prototype, "newQuantity", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "enum",
        enum: order_v2_enum_1.ExchangeOrderItemStatus,
        default: order_v2_enum_1.ExchangeOrderItemStatus.INITIATED,
    }),
    __metadata("design:type", String)
], V2ExchangeOrderItem.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "boolean", default: true }),
    __metadata("design:type", Boolean)
], V2ExchangeOrderItem.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], V2ExchangeOrderItem.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], V2ExchangeOrderItem.prototype, "updatedAt", void 0);
exports.V2ExchangeOrderItem = V2ExchangeOrderItem = __decorate([
    (0, typeorm_1.Entity)("v2_exchange_order_items"),
    (0, typeorm_1.Index)(["exchangeOrderId"]),
    (0, typeorm_1.Index)(["originalOrderItemId"])
], V2ExchangeOrderItem);
//# sourceMappingURL=v2-exchange-order-item.entity.js.map