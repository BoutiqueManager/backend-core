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
exports.V2OrderItemEvent = void 0;
const typeorm_1 = require("typeorm");
const order_v2_enum_1 = require("../../enums/order-v2.enum");
/**
 * Append-only audit trail for every state change on an order item.
 * Powers the timeline displayed on both customer app and seller app.
 * Records are NEVER updated — only inserted.
 */
let V2OrderItemEvent = class V2OrderItemEvent {
};
exports.V2OrderItemEvent = V2OrderItemEvent;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", String)
], V2OrderItemEvent.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "uuid" }),
    __metadata("design:type", String)
], V2OrderItemEvent.prototype, "orderItemId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "uuid" }),
    __metadata("design:type", String)
], V2OrderItemEvent.prototype, "orderId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "uuid" }),
    __metadata("design:type", String)
], V2OrderItemEvent.prototype, "customerId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "uuid" }),
    __metadata("design:type", String)
], V2OrderItemEvent.prototype, "boutiqueId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "enum", enum: order_v2_enum_1.OrderEventTypeV2 }),
    __metadata("design:type", String)
], V2OrderItemEvent.prototype, "eventType", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 60, nullable: true }),
    __metadata("design:type", String)
], V2OrderItemEvent.prototype, "fromStatus", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 60, nullable: true }),
    __metadata("design:type", String)
], V2OrderItemEvent.prototype, "toStatus", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text" }),
    __metadata("design:type", String)
], V2OrderItemEvent.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 100, nullable: true }),
    __metadata("design:type", String)
], V2OrderItemEvent.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 20, nullable: true }),
    __metadata("design:type", String)
], V2OrderItemEvent.prototype, "icon", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 10, nullable: true }),
    __metadata("design:type", String)
], V2OrderItemEvent.prototype, "color", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "enum", enum: order_v2_enum_1.EventActorTypeV2 }),
    __metadata("design:type", String)
], V2OrderItemEvent.prototype, "actorType", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "uuid", nullable: true }),
    __metadata("design:type", String)
], V2OrderItemEvent.prototype, "actorId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 200, nullable: true }),
    __metadata("design:type", String)
], V2OrderItemEvent.prototype, "actorName", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "jsonb", nullable: true }),
    __metadata("design:type", Object)
], V2OrderItemEvent.prototype, "metadata", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" }),
    __metadata("design:type", Date)
], V2OrderItemEvent.prototype, "occurredAt", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], V2OrderItemEvent.prototype, "createdAt", void 0);
exports.V2OrderItemEvent = V2OrderItemEvent = __decorate([
    (0, typeorm_1.Entity)("v2_order_item_events"),
    (0, typeorm_1.Index)(["orderItemId", "occurredAt"]),
    (0, typeorm_1.Index)(["orderId"]),
    (0, typeorm_1.Index)(["customerId"]),
    (0, typeorm_1.Index)(["boutiqueId"])
], V2OrderItemEvent);
//# sourceMappingURL=v2-order-item-event.entity.js.map