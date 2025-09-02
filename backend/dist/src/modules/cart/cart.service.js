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
exports.ShoppingCartService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../prisma/prisma.service");
let ShoppingCartService = class ShoppingCartService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getCart(customerId) {
        const cart = await this.prisma.shoppingCart.findUnique({
            where: { customer_id: customerId },
            include: {
                cart_items: {
                    include: {
                        product: {
                            select: {
                                id: true,
                                product_name: true,
                                price: true,
                                image_url: true,
                            },
                        },
                    },
                },
            },
        });
        if (!cart)
            return null;
        return {
            ...cart,
            cart_items: cart.cart_items.map((item) => ({
                ...item,
                product: {
                    ...item.product,
                    price: parseFloat((+item.product.price / 24000).toFixed(2)),
                },
            })),
        };
    }
    async addToCart(customerId, productId, quantity = 1) {
        const customer = await this.prisma.user.findUnique({
            where: { user_id: customerId },
        });
        if (!customer)
            throw new common_1.NotFoundException('Customer not found');
        const product = await this.prisma.product.findUnique({
            where: { id: productId },
        });
        if (!product)
            throw new common_1.NotFoundException('Product not found');
        let cart = await this.prisma.shoppingCart.findUnique({
            where: { customer_id: customerId },
        });
        if (!cart) {
            cart = await this.prisma.shoppingCart.create({
                data: { customer_id: customerId },
            });
        }
        const existingCartItem = await this.prisma.cartItem.findFirst({
            where: { cart_id: cart.cart_id, product_id: productId },
        });
        if (existingCartItem) {
            return this.prisma.cartItem.update({
                where: { item_id: existingCartItem.item_id },
                data: { quantity: existingCartItem.quantity + quantity },
            });
        }
        return this.prisma.cartItem.create({
            data: { cart_id: cart.cart_id, product_id: productId, quantity },
        });
    }
    async removeFromCart(customerId, productId) {
        const cart = await this.prisma.shoppingCart.findUnique({
            where: { customer_id: customerId },
        });
        if (!cart)
            throw new common_1.NotFoundException('Shopping cart not found');
        const cartItem = await this.prisma.cartItem.findFirst({
            where: { cart_id: cart.cart_id, product_id: productId },
        });
        if (!cartItem)
            throw new common_1.NotFoundException('Product not found in cart');
        await this.prisma.cartItem.delete({ where: { item_id: cartItem.item_id } });
        return { message: 'Product removed from cart' };
    }
    async changeQuantity(customerId, productId, quantity) {
        const cart = await this.prisma.shoppingCart.findUnique({
            where: { customer_id: customerId },
        });
        if (!cart)
            throw new common_1.NotFoundException('Shopping cart not found');
        const cartItem = await this.prisma.cartItem.findFirst({
            where: { cart_id: cart.cart_id, product_id: productId },
        });
        if (!cartItem)
            throw new common_1.NotFoundException('Product not found in cart');
        return this.prisma.cartItem.update({
            where: { item_id: cartItem.item_id },
            data: { quantity },
        });
    }
    async clearCart(customerId) {
        const cart = await this.prisma.shoppingCart.findUnique({
            where: { customer_id: customerId },
        });
        if (!cart)
            throw new common_1.NotFoundException('Shopping cart not found');
        await this.prisma.cartItem.deleteMany({ where: { cart_id: cart.cart_id } });
        return { message: 'Cart cleared successfully' };
    }
};
exports.ShoppingCartService = ShoppingCartService;
exports.ShoppingCartService = ShoppingCartService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ShoppingCartService);
//# sourceMappingURL=cart.service.js.map