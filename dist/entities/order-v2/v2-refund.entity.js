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
exports.V2Refund = void 0;
const typeorm_1 = require("typeorm");
const order_v2_enum_1 = require("../../enums/order-v2.enum");
/**
 * A refund record in the v2 order system.
 *
 * Refund trigger rules per PRD §1.5:
 *   - Cancellation: triggered immediately when item/order cancelled (prepaid only)
 *   - Return: triggered ONLY after seller confirms receipt (receivedBySellerAt set)
 *   - Exchange downgrade: triggered ONLY after seller confirms receipt
 *
 * Shipping charges are ALWAYS excluded from return/exchange refund amounts.
 *
 * 3-step tracker (cancellations): INITIATED → BANK_PROCESSING → CREDITED
 * 6-step tracker (returns/exchanges): covered by ReturnOrderStatus / ExchangeOrderStatus
 */
let V2Refund = class V2Refund {
};
exports.V2Refund = V2Refund;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", String)
], V2Refund.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Index)({ unique: true }),
    (0, typeorm_1.Column)({ type: "varchar", length: 30, unique: true }),
    __metadata("design:type", String)
], V2Refund.prototype, "refundId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "uuid" }),
    __metadata("design:type", String)
], V2Refund.prototype, "originalPaymentId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "uuid" }),
    __metadata("design:type", String)
], V2Refund.prototype, "orderId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "uuid" }),
    __metadata("design:type", String)
], V2Refund.prototype, "checkoutSessionId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "uuid" }),
    __metadata("design:type", String)
], V2Refund.prototype, "customerId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "enum", enum: order_v2_enum_1.RefundTypeV2 }),
    __metadata("design:type", String)
], V2Refund.prototype, "refundType", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "uuid", nullable: true }),
    __metadata("design:type", String)
], V2Refund.prototype, "returnOrderId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "uuid", nullable: true }),
    __metadata("design:type", String)
], V2Refund.prototype, "exchangeOrderId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "decimal", precision: 12, scale: 2 }),
    __metadata("design:type", Number)
], V2Refund.prototype, "amount", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 3, default: "INR" }),
    __metadata("design:type", String)
], V2Refund.prototype, "currency", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "boolean", default: true }),
    __metadata("design:type", Boolean)
], V2Refund.prototype, "shippingChargesExcluded", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "enum", enum: order_v2_enum_1.RefundDestination }),
    __metadata("design:type", String)
], V2Refund.prototype, "refundDestination", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", nullable: true }),
    __metadata("design:type", String)
], V2Refund.prototype, "upiId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", nullable: true }),
    __metadata("design:type", String)
], V2Refund.prototype, "bankAccountNumber", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 11, nullable: true }),
    __metadata("design:type", String)
], V2Refund.prototype, "bankIfsc", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 200, nullable: true }),
    __metadata("design:type", String)
], V2Refund.prototype, "bankAccountHolderName", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", nullable: true }),
    __metadata("design:type", String)
], V2Refund.prototype, "razorpayRefundId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "jsonb", nullable: true }),
    __metadata("design:type", Object)
], V2Refund.prototype, "razorpayResponse", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "enum",
        enum: order_v2_enum_1.RefundStatusV2,
        default: order_v2_enum_1.RefundStatusV2.INITIATED,
    }),
    __metadata("design:type", String)
], V2Refund.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "timestamp", nullable: true }),
    __metadata("design:type", Date)
], V2Refund.prototype, "initiatedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "timestamp", nullable: true }),
    __metadata("design:type", Date)
], V2Refund.prototype, "bankProcessedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "timestamp", nullable: true }),
    __metadata("design:type", Date)
], V2Refund.prototype, "creditedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "timestamp", nullable: true }),
    __metadata("design:type", Date)
], V2Refund.prototype, "failedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text", nullable: true }),
    __metadata("design:type", String)
], V2Refund.prototype, "failureReason", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "enum",
        enum: order_v2_enum_1.RefundInitiatedBy,
        default: order_v2_enum_1.RefundInitiatedBy.SYSTEM,
    }),
    __metadata("design:type", String)
], V2Refund.prototype, "initiatedBy", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "uuid", nullable: true }),
    __metadata("design:type", String)
], V2Refund.prototype, "initiatedByActorId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "boolean", default: true }),
    __metadata("design:type", Boolean)
], V2Refund.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], V2Refund.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], V2Refund.prototype, "updatedAt", void 0);
exports.V2Refund = V2Refund = __decorate([
    (0, typeorm_1.Entity)("v2_refunds"),
    (0, typeorm_1.Index)(["orderId"]),
    (0, typeorm_1.Index)(["customerId"]),
    (0, typeorm_1.Index)(["razorpayRefundId"]),
    (0, typeorm_1.Index)(["returnOrderId"]),
    (0, typeorm_1.Index)(["exchangeOrderId"]),
    (0, typeorm_1.Index)(["status"])
], V2Refund);
//# sourceMappingURL=v2-refund.entity.js.map