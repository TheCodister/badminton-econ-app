"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const cache_manager_1 = require("@nestjs/cache-manager");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const prisma_module_1 = require("../prisma/prisma.module");
const auth_module_1 = require("./modules/auth/auth.module");
const cart_module_1 = require("./modules/cart/cart.module");
const product_module_1 = require("./modules/products/product.module");
const rackets_module_1 = require("./modules/products/rackets/rackets.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({ isGlobal: true }),
            cache_manager_1.CacheModule.register({
                store: require('cache-manager-redis-store'),
                host: 'localhost',
                port: 6379,
                ttl: 60,
            }),
            prisma_module_1.PrismaModule,
            rackets_module_1.RacketsModule,
            auth_module_1.AuthModule,
            cart_module_1.ShoppingCartModule,
            product_module_1.ProductModule,
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map