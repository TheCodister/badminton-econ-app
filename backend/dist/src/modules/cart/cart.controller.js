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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShoppingCartController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const cart_service_1 = require("./cart.service");
let ShoppingCartController = class ShoppingCartController {
    constructor(shoppingCartService) {
        this.shoppingCartService = shoppingCartService;
    }
    async getCart(customerId) {
        return this.shoppingCartService.getCart(customerId);
    }
    async addToCart(customerId, productId, body) {
        return this.shoppingCartService.addToCart(customerId, productId, body.quantity || 1);
    }
    async changeQuantity(customerId, productId, quantity) {
        return this.shoppingCartService.changeQuantity(customerId, productId, quantity);
    }
    async removeFromCart(customerId, productId) {
        return this.shoppingCartService.removeFromCart(customerId, productId);
    }
    async clearCart(customerId) {
        return this.shoppingCartService.clearCart(customerId);
    }
};
exports.ShoppingCartController = ShoppingCartController;
__decorate([
    (0, common_1.Get)(':customerId'),
    (0, swagger_1.ApiOperation)({ summary: 'Get cart by customer ID' }),
    (0, swagger_1.ApiParam)({ name: 'customerId', type: String }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Shopping cart with items' }),
    __param(0, (0, common_1.Param)('customerId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ShoppingCartController.prototype, "getCart", null);
__decorate([
    (0, common_1.Post)(':customerId/:productId'),
    (0, swagger_1.ApiOperation)({ summary: 'Add product to cart' }),
    (0, swagger_1.ApiParam)({ name: 'customerId', type: String }),
    (0, swagger_1.ApiParam)({ name: 'productId', type: String }),
    (0, swagger_1.ApiBody)({
        schema: {
            type: 'object',
            properties: {
                quantity: { type: 'number', example: 2 },
            },
        },
    }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Product added to cart' }),
    __param(0, (0, common_1.Param)('customerId')),
    __param(1, (0, common_1.Param)('productId')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], ShoppingCartController.prototype, "addToCart", null);
__decorate([
    (0, common_1.Post)(':customerId/:productId/:quantity'),
    (0, swagger_1.ApiOperation)({ summary: 'Change quantity of the product in cart' }),
    (0, swagger_1.ApiParam)({ name: 'customerId', type: String }),
    (0, swagger_1.ApiParam)({ name: 'productId', type: String }),
    (0, swagger_1.ApiParam)({ name: 'quantity', type: Number }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Product quantity updated' }),
    __param(0, (0, common_1.Param)('customerId')),
    __param(1, (0, common_1.Param)('productId')),
    __param(2, (0, common_1.Param)('quantity', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Number]),
    __metadata("design:returntype", Promise)
], ShoppingCartController.prototype, "changeQuantity", null);
__decorate([
    (0, common_1.Delete)(':customerId/:productId'),
    (0, swagger_1.ApiOperation)({ summary: 'Remove product from cart' }),
    (0, swagger_1.ApiParam)({ name: 'customerId', type: String }),
    (0, swagger_1.ApiParam)({ name: 'productId', type: String }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Product removed from cart' }),
    __param(0, (0, common_1.Param)('customerId')),
    __param(1, (0, common_1.Param)('productId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], ShoppingCartController.prototype, "removeFromCart", null);
__decorate([
    (0, common_1.Delete)(':customerId'),
    (0, swagger_1.ApiOperation)({ summary: 'Clear all items from cart' }),
    (0, swagger_1.ApiParam)({ name: 'customerId', type: String }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Cart cleared' }),
    __param(0, (0, common_1.Param)('customerId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ShoppingCartController.prototype, "clearCart", null);
exports.ShoppingCartController = ShoppingCartController = __decorate([
    (0, swagger_1.ApiTags)('Shopping Cart'),
    (0, common_1.Controller)('shoppingcart'),
    __metadata("design:paramtypes", [cart_service_1.ShoppingCartService])
], ShoppingCartController);
//# sourceMappingURL=cart.controller.js.map