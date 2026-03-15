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
exports.V2ReturnOrderItem = void 0;
const typeorm_1 = require("typeorm");
const order_v2_enum_1 = require("../../enums/order-v2.enum");
const v2_return_order_entity_1 = require("./v2-return-order.entity");
/**
 * Individual item within a return order.
 * Captures the return reason, customer media (min 2 images), and pricing snapshot.
 */
let V2ReturnOrderItem = class V2ReturnOrderItem {
};
exports.V2ReturnOrderItem = V2ReturnOrderItem;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", String)
], V2ReturnOrderItem.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "uuid" }),
    __metadata("design:type", String)
], V2ReturnOrderItem.prototype, "returnOrderId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => v2_return_order_entity_1.V2ReturnOrder, (returnOrder) => returnOrder.returnOrderItems, { onDelete: "CASCADE" }),
    (0, typeorm_1.JoinColumn)({ name: "returnOrderId" }),
    __metadata("design:type", v2_return_order_entity_1.V2ReturnOrder)
], V2ReturnOrderItem.prototype, "returnOrder", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "uuid" }),
    __metadata("design:type", String)
], V2ReturnOrderItem.prototype, "originalOrderItemId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "uuid" }),
    __metadata("design:type", String)
], V2ReturnOrderItem.prototype, "orderId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text" }),
    __metadata("design:type", String)
], V2ReturnOrderItem.prototype, "returnReason", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "enum", enum: order_v2_enum_1.ReturnReasonCategory, nullable: true }),
    __metadata("design:type", String)
], V2ReturnOrderItem.prototype, "returnReasonCategory", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "decimal", precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], V2ReturnOrderItem.prototype, "mrp", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "decimal", precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], V2ReturnOrderItem.prototype, "offerPrice", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "decimal", precision: 10, scale: 2, default: 0 }),
    __metadata("design:type", Number)
], V2ReturnOrderItem.prototype, "couponDiscount", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "decimal", precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], V2ReturnOrderItem.prototype, "finalPrice", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "int" }),
    __metadata("design:type", Number)
], V2ReturnOrderItem.prototype, "quantity", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "enum",
        enum: order_v2_enum_1.ReturnOrderItemStatus,
        default: order_v2_enum_1.ReturnOrderItemStatus.INITIATED,
    }),
    __metadata("design:type", String)
], V2ReturnOrderItem.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "boolean", default: true }),
    __metadata("design:type", Boolean)
], V2ReturnOrderItem.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], V2ReturnOrderItem.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], V2ReturnOrderItem.prototype, "updatedAt", void 0);
exports.V2ReturnOrderItem = V2ReturnOrderItem = __decorate([
    (0, typeorm_1.Entity)("v2_return_order_items"),
    (0, typeorm_1.Index)(["returnOrderId"]),
    (0, typeorm_1.Index)(["originalOrderItemId"])
], V2ReturnOrderItem);
//# sourceMappingURL=v2-return-order-item.entity.js.map