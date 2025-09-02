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
exports.Shuttlecock = void 0;
const typeorm_1 = require("typeorm");
const product_entity_1 = require("./product.entity");
let Shuttlecock = class Shuttlecock extends product_entity_1.Product {
};
exports.Shuttlecock = Shuttlecock;
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Shuttlecock.prototype, "shuttle_type", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Shuttlecock.prototype, "speed", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Shuttlecock.prototype, "no_per_tube", void 0);
exports.Shuttlecock = Shuttlecock = __decorate([
    (0, typeorm_1.Entity)('shuttlecocks')
], Shuttlecock);
//# sourceMappingURL=shuttlecock.entity.js.map