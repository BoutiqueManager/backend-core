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
exports.V2Payment = void 0;
const typeorm_1 = require("typeorm");
const order_v2_enum_1 = require("../../enums/order-v2.enum");
const payment_enum_1 = require("../../enums/payment.enum");
const v2_checkout_session_entity_1 = require("./v2-checkout-session.entity");
/**
 * Every Razorpay transaction in the v2 order system.
 * Multiple payments are possible per order:
 *   - advance (made_to_measure items at checkout)
 *   - full (ready_to_ship items at checkout)
 *   - remaining_balance (after delivery of customized items)
 *   - exchange_top_up (when exchange item costs more than original)
 */
let V2Payment = class V2Payment {
};
exports.V2Payment = V2Payment;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", String)
], V2Payment.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Index)({ unique: true }),
    (0, typeorm_1.Column)({ type: "varchar", length: 30, unique: true }),
    __metadata("design:type", String)
], V2Payment.prototype, "paymentId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "uuid" }),
    __metadata("design:type", String)
], V2Payment.prototype, "checkoutSessionId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => v2_checkout_session_entity_1.V2CheckoutSession, { nullable: false }),
    (0, typeorm_1.JoinColumn)({ name: "checkoutSessionId" }),
    __metadata("design:type", v2_checkout_session_entity_1.V2CheckoutSession)
], V2Payment.prototype, "checkoutSession", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "uuid", nullable: true }),
    __metadata("design:type", String)
], V2Payment.prototype, "orderId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "uuid" }),
    __metadata("design:type", String)
], V2Payment.prototype, "customerId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "enum", enum: order_v2_enum_1.PaymentTypeV2 }),
    __metadata("design:type", String)
], V2Payment.prototype, "paymentType", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "enum", enum: order_v2_enum_1.PaymentMethodV2 }),
    __metadata("design:type", String)
], V2Payment.prototype, "paymentMethod", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "decimal", precision: 12, scale: 2 }),
    __metadata("design:type", Number)
], V2Payment.prototype, "amount", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 3, default: "INR" }),
    __metadata("design:type", String)
], V2Payment.prototype, "currency", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "enum",
        enum: order_v2_enum_1.PaymentStatusV2,
        default: order_v2_enum_1.PaymentStatusV2.PENDING,
    }),
    __metadata("design:type", String)
], V2Payment.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", nullable: true }),
    __metadata("design:type", String)
], V2Payment.prototype, "razorpayOrderId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", nullable: true }),
    __metadata("design:type", String)
], V2Payment.prototype, "razorpayPaymentId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", nullable: true }),
    __metadata("design:type", String)
], V2Payment.prototype, "razorpaySignature", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "jsonb", nullable: true }),
    __metadata("design:type", Object)
], V2Payment.prototype, "razorpayResponse", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", nullable: true }),
    __metadata("design:type", String)
], V2Payment.prototype, "upiTransactionId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "enum", enum: payment_enum_1.UpiApp, nullable: true }),
    __metadata("design:type", String)
], V2Payment.prototype, "upiApp", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 4, nullable: true }),
    __metadata("design:type", String)
], V2Payment.prototype, "cardLast4", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "enum", enum: payment_enum_1.CardBrand, nullable: true }),
    __metadata("design:type", String)
], V2Payment.prototype, "cardBrand", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "uuid", nullable: true }),
    __metadata("design:type", String)
], V2Payment.prototype, "savedPaymentMethodId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "timestamp", nullable: true }),
    __metadata("design:type", Date)
], V2Payment.prototype, "codCollectedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "timestamp", nullable: true }),
    __metadata("design:type", Date)
], V2Payment.prototype, "paidAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "timestamp", nullable: true }),
    __metadata("design:type", Date)
], V2Payment.prototype, "failedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text", nullable: true }),
    __metadata("design:type", String)
], V2Payment.prototype, "failureReason", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "boolean", default: true }),
    __metadata("design:type", Boolean)
], V2Payment.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], V2Payment.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], V2Payment.prototype, "updatedAt", void 0);
exports.V2Payment = V2Payment = __decorate([
    (0, typeorm_1.Entity)("v2_payments"),
    (0, typeorm_1.Index)(["razorpayOrderId"]),
    (0, typeorm_1.Index)(["razorpayPaymentId"]),
    (0, typeorm_1.Index)(["customerId", "status"]),
    (0, typeorm_1.Index)(["checkoutSessionId"]),
    (0, typeorm_1.Index)(["orderId"])
], V2Payment);
//# sourceMappingURL=v2-payment.entity.js.map