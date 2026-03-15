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
exports.V2ReverseShipment = void 0;
const typeorm_1 = require("typeorm");
const order_v2_enum_1 = require("../../enums/order-v2.enum");
/**
 * Shared reverse logistics entity for both return and exchange pickup operations.
 *
 * Exactly one of (returnOrderId, exchangeOrderId) is set — they are mutually exclusive.
 *
 * Shipment ID lock rule per PRD §3.3.3:
 *   Once pickedUpAt is set (status → PICKED_UP), the parent return/exchange order's
 *   isPickupLocked flag is set to true. No additional items may be merged after this point.
 *
 * Pickup address is ALWAYS the original delivery address and cannot be changed by customer.
 * Per PRD §2.3.1 and §2.4.1 step-1.
 */
let V2ReverseShipment = class V2ReverseShipment {
};
exports.V2ReverseShipment = V2ReverseShipment;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", String)
], V2ReverseShipment.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Index)({ unique: true }),
    (0, typeorm_1.Column)({ type: "varchar", length: 35, unique: true }),
    __metadata("design:type", String)
], V2ReverseShipment.prototype, "reverseShipmentId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "uuid", nullable: true }),
    __metadata("design:type", String)
], V2ReverseShipment.prototype, "returnOrderId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "uuid", nullable: true }),
    __metadata("design:type", String)
], V2ReverseShipment.prototype, "exchangeOrderId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "uuid" }),
    __metadata("design:type", String)
], V2ReverseShipment.prototype, "customerId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "uuid" }),
    __metadata("design:type", String)
], V2ReverseShipment.prototype, "pickupAddressId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "jsonb" }),
    __metadata("design:type", Object)
], V2ReverseShipment.prototype, "pickupAddress", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 100, nullable: true }),
    __metadata("design:type", String)
], V2ReverseShipment.prototype, "logisticsProvider", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", nullable: true }),
    __metadata("design:type", String)
], V2ReverseShipment.prototype, "trackingNumber", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", nullable: true }),
    __metadata("design:type", String)
], V2ReverseShipment.prototype, "trackingUrl", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "enum",
        enum: order_v2_enum_1.ReverseShipmentStatus,
        default: order_v2_enum_1.ReverseShipmentStatus.PENDING,
    }),
    __metadata("design:type", String)
], V2ReverseShipment.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "date", nullable: true }),
    __metadata("design:type", Date)
], V2ReverseShipment.prototype, "scheduledPickupDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 50, nullable: true }),
    __metadata("design:type", String)
], V2ReverseShipment.prototype, "scheduledPickupSlot", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "timestamp", nullable: true }),
    __metadata("design:type", Date)
], V2ReverseShipment.prototype, "pickedUpAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "timestamp", nullable: true }),
    __metadata("design:type", Date)
], V2ReverseShipment.prototype, "deliveredToSellerAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "date", nullable: true }),
    __metadata("design:type", Date)
], V2ReverseShipment.prototype, "estimatedDeliveryToSeller", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "int", default: 0 }),
    __metadata("design:type", Number)
], V2ReverseShipment.prototype, "pickupAttempts", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "timestamp", nullable: true }),
    __metadata("design:type", Date)
], V2ReverseShipment.prototype, "lastAttemptAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text", nullable: true }),
    __metadata("design:type", String)
], V2ReverseShipment.prototype, "failureReason", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "boolean", default: true }),
    __metadata("design:type", Boolean)
], V2ReverseShipment.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], V2ReverseShipment.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], V2ReverseShipment.prototype, "updatedAt", void 0);
exports.V2ReverseShipment = V2ReverseShipment = __decorate([
    (0, typeorm_1.Entity)("v2_reverse_shipments"),
    (0, typeorm_1.Index)(["returnOrderId"]),
    (0, typeorm_1.Index)(["exchangeOrderId"]),
    (0, typeorm_1.Index)(["customerId"]),
    (0, typeorm_1.Index)(["trackingNumber"])
], V2ReverseShipment);
//# sourceMappingURL=v2-reverse-shipment.entity.js.map