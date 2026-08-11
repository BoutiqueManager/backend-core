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
exports.V2OrderMedia = void 0;
const typeorm_1 = require("typeorm");
const order_v2_enum_1 = require("../../enums/order-v2.enum");
/**
 * Seller-uploaded packing media for shipped order items.
 *
 * Per PRD: when marking an item as Shipped, seller MUST upload at least 2 images.
 * A packing video is optional but recommended.
 *
 * Visibility rules per PRD:
 *   - Media becomes visible to customer after order is marked as Shipped
 *   - Media auto-expires after the return/exchange window closes (storage optimization)
 *   - expiresAt = deliveredAt + max(returnWindowDays, exchangeWindowDays)
 *     (set on v2_order_items when item is delivered)
 *
 * A nightly cleanup job checks isExpired = false AND expiresAt < NOW()
 * to delete R2 objects and mark records as expired.
 */
let V2OrderMedia = class V2OrderMedia {
};
exports.V2OrderMedia = V2OrderMedia;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", String)
], V2OrderMedia.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "uuid" }),
    __metadata("design:type", String)
], V2OrderMedia.prototype, "orderId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "uuid" }),
    __metadata("design:type", String)
], V2OrderMedia.prototype, "orderItemId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "uuid" }),
    __metadata("design:type", String)
], V2OrderMedia.prototype, "uploadedByBoutiqueId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "enum", enum: order_v2_enum_1.OrderMediaType }),
    __metadata("design:type", String)
], V2OrderMedia.prototype, "mediaType", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "enum", enum: order_v2_enum_1.MediaSubtypeV2 }),
    __metadata("design:type", String)
], V2OrderMedia.prototype, "mediaSubtype", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 500 }),
    __metadata("design:type", String)
], V2OrderMedia.prototype, "originalKey", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 500, nullable: true }),
    __metadata("design:type", String)
], V2OrderMedia.prototype, "previewKey", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 255 }),
    __metadata("design:type", String)
], V2OrderMedia.prototype, "fileName", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "bigint" }),
    __metadata("design:type", Number)
], V2OrderMedia.prototype, "fileSize", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 100 }),
    __metadata("design:type", String)
], V2OrderMedia.prototype, "mimeType", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "jsonb", nullable: true }),
    __metadata("design:type", Object)
], V2OrderMedia.prototype, "metadata", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "boolean", default: false }),
    __metadata("design:type", Boolean)
], V2OrderMedia.prototype, "isPrimary", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "smallint", default: 0 }),
    __metadata("design:type", Number)
], V2OrderMedia.prototype, "sortOrder", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "timestamp", nullable: true }),
    __metadata("design:type", Date)
], V2OrderMedia.prototype, "expiresAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "boolean", default: false }),
    __metadata("design:type", Boolean)
], V2OrderMedia.prototype, "isExpired", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "timestamp", nullable: true }),
    __metadata("design:type", Date)
], V2OrderMedia.prototype, "expiredAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "boolean", default: true }),
    __metadata("design:type", Boolean)
], V2OrderMedia.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], V2OrderMedia.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], V2OrderMedia.prototype, "updatedAt", void 0);
exports.V2OrderMedia = V2OrderMedia = __decorate([
    (0, typeorm_1.Entity)("v2_order_media"),
    (0, typeorm_1.Index)(["orderItemId"]),
    (0, typeorm_1.Index)(["orderId"]),
    (0, typeorm_1.Index)(["expiresAt"])
], V2OrderMedia);
//# sourceMappingURL=v2-order-media.entity.js.map