"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShuttlecocksModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const shuttlecock_entity_1 = require("../../../models/shuttlecock.entity");
const shuttlecocks_controller_1 = require("./shuttlecocks.controller");
const shuttlecocks_service_1 = require("./shuttlecocks.service");
let ShuttlecocksModule = class ShuttlecocksModule {
};
exports.ShuttlecocksModule = ShuttlecocksModule;
exports.ShuttlecocksModule = ShuttlecocksModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([shuttlecock_entity_1.Shuttlecock])],
        controllers: [shuttlecocks_controller_1.ShuttlecocksController],
        providers: [shuttlecocks_service_1.ShuttlecocksService],
    })
], ShuttlecocksModule);
//# sourceMappingURL=shuttlecocks.module.js.map