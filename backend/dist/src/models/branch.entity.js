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
exports.Branch = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("./user.entity");
let Branch = class Branch {
};
exports.Branch = Branch;
__decorate([
    (0, typeorm_1.PrimaryColumn)({ type: 'varchar', length: 100 }),
    __metadata("design:type", String)
], Branch.prototype, "branch_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 100, nullable: false }),
    __metadata("design:type", String)
], Branch.prototype, "branch_name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: false }),
    __metadata("design:type", String)
], Branch.prototype, "branch_address", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 15, nullable: false }),
    __metadata("design:type", String)
], Branch.prototype, "branch_phone", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => user_entity_1.Admin, (admin) => admin.branch, { cascade: true }),
    __metadata("design:type", Array)
], Branch.prototype, "admins", void 0);
exports.Branch = Branch = __decorate([
    (0, typeorm_1.Entity)('branches')
], Branch);
//# sourceMappingURL=branch.entity.js.map