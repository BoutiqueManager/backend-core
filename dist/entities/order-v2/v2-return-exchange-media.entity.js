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
exports.V2ReturnExchangeMedia = void 0;
const typeorm_1 = require("typeorm");
const order_v2_enum_1 = require("../../enums/order-v2.enum");
/**
 * Customer-submitted media when raising a return or exchange request.
 *
 * Per PRD §2.3.1 / §2.4.1:
 *   - Minimum 2 images are MANDATORY — requests cannot be submitted without them
 *   - Video is optional
 *   - Media is submitted at time of initiating the return/exchange flow
 *
 * Exactly one of (returnOrderItemId, exchangeOrderItemId) is set — mutually exclusive.
 */
let V2ReturnExchangeMedia = class V2ReturnExchangeMedia {
};
exports.V2ReturnExchangeMedia = V2ReturnExchangeMedia;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", String)
], V2ReturnExchangeMedia.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "uuid", nullable: true }),
    __metadata("design:type", String)
], V2ReturnExchangeMedia.prototype, "returnOrderItemId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "uuid", nullable: true }),
    __metadata("design:type", String)
], V2ReturnExchangeMedia.prototype, "exchangeOrderItemId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "uuid" }),
    __metadata("design:type", String)
], V2ReturnExchangeMedia.prototype, "customerId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "enum", enum: order_v2_enum_1.OrderMediaType }),
    __metadata("design:type", String)
], V2ReturnExchangeMedia.prototype, "mediaType", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "enum", enum: order_v2_enum_1.MediaSubtypeV2 }),
    __metadata("design:type", String)
], V2ReturnExchangeMedia.prototype, "mediaSubtype", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 500 }),
    __metadata("design:type", String)
], V2ReturnExchangeMedia.prototype, "originalKey", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 500, nullable: true }),
    __metadata("design:type", String)
], V2ReturnExchangeMedia.prototype, "previewKey", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 255 }),
    __metadata("design:type", String)
], V2ReturnExchangeMedia.prototype, "fileName", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "bigint" }),
    __metadata("design:type", Number)
], V2ReturnExchangeMedia.prototype, "fileSize", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 100 }),
    __metadata("design:type", String)
], V2ReturnExchangeMedia.prototype, "mimeType", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "jsonb", nullable: true }),
    __metadata("design:type", Object)
], V2ReturnExchangeMedia.prototype, "metadata", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "boolean", default: false }),
    __metadata("design:type", Boolean)
], V2ReturnExchangeMedia.prototype, "isPrimary", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "smallint", default: 0 }),
    __metadata("design:type", Number)
], V2ReturnExchangeMedia.prototype, "sortOrder", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "boolean", default: true }),
    __metadata("design:type", Boolean)
], V2ReturnExchangeMedia.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], V2ReturnExchangeMedia.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], V2ReturnExchangeMedia.prototype, "updatedAt", void 0);
exports.V2ReturnExchangeMedia = V2ReturnExchangeMedia = __decorate([
    (0, typeorm_1.Entity)("v2_return_exchange_media"),
    (0, typeorm_1.Index)(["returnOrderItemId"]),
    (0, typeorm_1.Index)(["exchangeOrderItemId"])
], V2ReturnExchangeMedia);
//# sourceMappingURL=v2-return-exchange-media.entity.js.map