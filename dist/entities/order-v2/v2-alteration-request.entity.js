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
exports.V2AlterationRequest = void 0;
const typeorm_1 = require("typeorm");
const order_v2_enum_1 = require("../../enums/order-v2.enum");
/**
 * One alteration request per journey through the §5.3 MTM alteration flow:
 * customer requests → item picked up from customer → delivered to seller →
 * seller reships the altered item → customer receives it back.
 *
 * Unlike V2ReturnOrder/V2ExchangeOrder, this is deliberately simple — no
 * pricing/price-difference fields, since alterations are free (manager
 * policy: exactly 1 free alteration, no questions asked) and don't change
 * the item itself. Mirrors V2ExchangeOrder's reverse+forward shipment field
 * shape, since alteration is the only other flow needing both legs.
 *
 * V2OrderItem.trackingNumber/trackingCarrier/trackingUrl are NOT touched by
 * this flow — they keep holding the original forward-delivery AWB. Both
 * alteration legs' AWBs live here instead.
 */
let V2AlterationRequest = class V2AlterationRequest {
};
exports.V2AlterationRequest = V2AlterationRequest;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", String)
], V2AlterationRequest.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Index)({ unique: true }),
    (0, typeorm_1.Column)({ type: "varchar", length: 30, unique: true }),
    __metadata("design:type", String)
], V2AlterationRequest.prototype, "alterationRequestId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "uuid" }),
    __metadata("design:type", String)
], V2AlterationRequest.prototype, "orderId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "uuid" }),
    __metadata("design:type", String)
], V2AlterationRequest.prototype, "orderItemId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "uuid" }),
    __metadata("design:type", String)
], V2AlterationRequest.prototype, "customerId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "uuid" }),
    __metadata("design:type", String)
], V2AlterationRequest.prototype, "boutiqueId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 200 }),
    __metadata("design:type", String)
], V2AlterationRequest.prototype, "boutiqueName", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text", nullable: true }),
    __metadata("design:type", String)
], V2AlterationRequest.prototype, "customerNote", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", nullable: true }),
    __metadata("design:type", String)
], V2AlterationRequest.prototype, "reverseTrackingNumber", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", nullable: true }),
    __metadata("design:type", String)
], V2AlterationRequest.prototype, "reverseTrackingCarrier", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", nullable: true }),
    __metadata("design:type", String)
], V2AlterationRequest.prototype, "reverseTrackingUrl", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "timestamp", nullable: true }),
    __metadata("design:type", Date)
], V2AlterationRequest.prototype, "pickedUpAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "timestamp", nullable: true }),
    __metadata("design:type", Date)
], V2AlterationRequest.prototype, "receivedBySellerAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", nullable: true }),
    __metadata("design:type", String)
], V2AlterationRequest.prototype, "forwardTrackingNumber", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", nullable: true }),
    __metadata("design:type", String)
], V2AlterationRequest.prototype, "forwardTrackingCarrier", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", nullable: true }),
    __metadata("design:type", String)
], V2AlterationRequest.prototype, "forwardTrackingUrl", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "timestamp", nullable: true }),
    __metadata("design:type", Date)
], V2AlterationRequest.prototype, "shippedBackAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "timestamp", nullable: true }),
    __metadata("design:type", Date)
], V2AlterationRequest.prototype, "completedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "enum",
        enum: order_v2_enum_1.AlterationRequestStatus,
        default: order_v2_enum_1.AlterationRequestStatus.REQUESTED,
    }),
    __metadata("design:type", String)
], V2AlterationRequest.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "boolean", default: true }),
    __metadata("design:type", Boolean)
], V2AlterationRequest.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], V2AlterationRequest.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], V2AlterationRequest.prototype, "updatedAt", void 0);
exports.V2AlterationRequest = V2AlterationRequest = __decorate([
    (0, typeorm_1.Entity)("v2_alteration_requests"),
    (0, typeorm_1.Index)(["orderItemId"]),
    (0, typeorm_1.Index)(["customerId", "status"]),
    (0, typeorm_1.Index)(["boutiqueId", "status"])
], V2AlterationRequest);
//# sourceMappingURL=v2-alteration-request.entity.js.map