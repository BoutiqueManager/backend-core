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
exports.V2ReturnOrder = void 0;
const typeorm_1 = require("typeorm");
const order_v2_enum_1 = require("../../enums/order-v2.enum");
const v2_return_order_item_entity_1 = require("./v2-return-order-item.entity");
/**
 * One Return Order groups items being returned together in a single pickup.
 *
 * Merge rules per PRD §1.3 / §3.2.1:
 *   - Same-time requests → ONE return order, ONE reverse shipment
 *   - New item added before pickup → merged into existing open return order
 *   - New item added after pickup → NEW return order + new reverse shipment
 *   - isPickupLocked = true after first item picked up (no further merges allowed)
 *
 * Return Order ID format: RET-YYYY-#####
 */
let V2ReturnOrder = class V2ReturnOrder {
};
exports.V2ReturnOrder = V2ReturnOrder;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", String)
], V2ReturnOrder.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Index)({ unique: true }),
    (0, typeorm_1.Column)({ type: "varchar", length: 30, unique: true }),
    __metadata("design:type", String)
], V2ReturnOrder.prototype, "returnOrderId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "uuid" }),
    __metadata("design:type", String)
], V2ReturnOrder.prototype, "originalOrderId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "uuid" }),
    __metadata("design:type", String)
], V2ReturnOrder.prototype, "checkoutSessionId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "uuid" }),
    __metadata("design:type", String)
], V2ReturnOrder.prototype, "customerId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "uuid" }),
    __metadata("design:type", String)
], V2ReturnOrder.prototype, "boutiqueId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 200 }),
    __metadata("design:type", String)
], V2ReturnOrder.prototype, "boutiqueName", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "uuid", nullable: true, unique: true }),
    __metadata("design:type", String)
], V2ReturnOrder.prototype, "reverseShipmentId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "boolean", default: false }),
    __metadata("design:type", Boolean)
], V2ReturnOrder.prototype, "isPickupLocked", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "timestamp", nullable: true }),
    __metadata("design:type", Date)
], V2ReturnOrder.prototype, "pickedUpAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "decimal", precision: 12, scale: 2, default: 0 }),
    __metadata("design:type", Number)
], V2ReturnOrder.prototype, "totalReturnValue", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "decimal", precision: 12, scale: 2, default: 0 }),
    __metadata("design:type", Number)
], V2ReturnOrder.prototype, "refundAmount", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "uuid", nullable: true }),
    __metadata("design:type", String)
], V2ReturnOrder.prototype, "refundId", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "enum",
        enum: order_v2_enum_1.ReturnOrderStatus,
        default: order_v2_enum_1.ReturnOrderStatus.INITIATED,
    }),
    __metadata("design:type", String)
], V2ReturnOrder.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "date", nullable: true }),
    __metadata("design:type", Date)
], V2ReturnOrder.prototype, "scheduledPickupDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 50, nullable: true }),
    __metadata("design:type", String)
], V2ReturnOrder.prototype, "scheduledPickupSlot", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "timestamp", nullable: true }),
    __metadata("design:type", Date)
], V2ReturnOrder.prototype, "receivedBySellerAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "timestamp", nullable: true }),
    __metadata("design:type", Date)
], V2ReturnOrder.prototype, "completedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "timestamp", nullable: true }),
    __metadata("design:type", Date)
], V2ReturnOrder.prototype, "rejectedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text", nullable: true }),
    __metadata("design:type", String)
], V2ReturnOrder.prototype, "rejectionReason", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "boolean", default: true }),
    __metadata("design:type", Boolean)
], V2ReturnOrder.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => v2_return_order_item_entity_1.V2ReturnOrderItem, (item) => item.returnOrder),
    __metadata("design:type", Array)
], V2ReturnOrder.prototype, "returnOrderItems", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], V2ReturnOrder.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], V2ReturnOrder.prototype, "updatedAt", void 0);
exports.V2ReturnOrder = V2ReturnOrder = __decorate([
    (0, typeorm_1.Entity)("v2_return_orders"),
    (0, typeorm_1.Index)(["originalOrderId"]),
    (0, typeorm_1.Index)(["customerId", "status"]),
    (0, typeorm_1.Index)(["boutiqueId", "status"]),
    (0, typeorm_1.Index)(["isPickupLocked"])
], V2ReturnOrder);
//# sourceMappingURL=v2-return-order.entity.js.map