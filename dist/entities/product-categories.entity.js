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
exports.ProductCategories = exports.Gender = void 0;
const typeorm_1 = require("typeorm");
var Gender;
(function (Gender) {
    Gender["MEN"] = "men";
    Gender["WOMEN"] = "women";
    Gender["KIDS"] = "kids";
    Gender["UNISEX"] = "unisex";
})(Gender || (exports.Gender = Gender = {}));
let ProductCategories = class ProductCategories {
};
exports.ProductCategories = ProductCategories;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", String)
], ProductCategories.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 100, unique: true }),
    __metadata("design:type", String)
], ProductCategories.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "enum", enum: Gender, nullable: true }),
    __metadata("design:type", String)
], ProductCategories.prototype, "gender", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text", nullable: true }),
    __metadata("design:type", String)
], ProductCategories.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 255, nullable: true }),
    __metadata("design:type", String)
], ProductCategories.prototype, "imagePreviewKey", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 255, nullable: true }),
    __metadata("design:type", String)
], ProductCategories.prototype, "imageOriginalKey", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: "createdAt" }),
    __metadata("design:type", Date)
], ProductCategories.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: "updatedAt" }),
    __metadata("design:type", Date)
], ProductCategories.prototype, "updatedAt", void 0);
exports.ProductCategories = ProductCategories = __decorate([
    (0, typeorm_1.Entity)("product_categories")
], ProductCategories);
exports.default = ProductCategories;
//# sourceMappingURL=product-categories.entity.js.map