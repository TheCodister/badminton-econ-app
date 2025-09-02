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
exports.Admin = exports.Customer = exports.User = void 0;
const class_validator_1 = require("class-validator");
const typeorm_1 = require("typeorm");
const branch_entity_1 = require("./branch.entity");
let User = class User extends typeorm_1.BaseEntity {
};
exports.User = User;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], User.prototype, "user_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 100 }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], User.prototype, "username", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true, length: 255 }),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], User.prototype, "mail", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 15 }),
    __metadata("design:type", String)
], User.prototype, "phone_number", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
exports.User = User = __decorate([
    (0, typeorm_1.Entity)('users')
], User);
let Customer = class Customer extends User {
};
exports.Customer = Customer;
__decorate([
    (0, typeorm_1.Column)('text'),
    __metadata("design:type", String)
], Customer.prototype, "address", void 0);
exports.Customer = Customer = __decorate([
    (0, typeorm_1.Entity)('customers')
], Customer);
let Admin = class Admin extends User {
};
exports.Admin = Admin;
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Admin.prototype, "branch_id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => branch_entity_1.Branch, (branch) => branch.admins),
    __metadata("design:type", branch_entity_1.Branch)
], Admin.prototype, "branch", void 0);
exports.Admin = Admin = __decorate([
    (0, typeorm_1.Entity)('admins')
], Admin);
//# sourceMappingURL=user.entity.js.map