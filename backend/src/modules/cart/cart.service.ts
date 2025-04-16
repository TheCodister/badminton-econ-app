import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from 'prisma/prisma.service'

@Injectable()
export class ShoppingCartService {
  constructor(private prisma: PrismaService) {}

  // Get shopping cart by customer ID
  async getCart(customerId: string) {
    return this.prisma.shoppingCart.findUnique({
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
    })
  }

  // Add product to cart
  async addToCart(customerId: string, productId: string, quantity: number = 1) {
    // Check if customer exists
    const customer = await this.prisma.user.findUnique({
      where: { user_id: customerId },
    })
    if (!customer) throw new NotFoundException('Customer not found')

    // Check if product exists
    const product = await this.prisma.product.findUnique({
      where: { id: productId },
    })
    if (!product) throw new NotFoundException('Product not found')

    // Find or create shopping cart
    let cart = await this.prisma.shoppingCart.findUnique({
      where: { customer_id: customerId },
    })

    if (!cart) {
      cart = await this.prisma.shoppingCart.create({
        data: { customer_id: customerId },
      })
    }

    // Check if product is already in cart
    const existingCartItem = await this.prisma.cartItem.findFirst({
      where: { cart_id: cart.cart_id, product_id: productId },
    })

    if (existingCartItem) {
      return this.prisma.cartItem.update({
        where: { item_id: existingCartItem.item_id },
        data: { quantity: existingCartItem.quantity + quantity },
      })
    }

    return this.prisma.cartItem.create({
      data: { cart_id: cart.cart_id, product_id: productId, quantity },
    })
  }

  // Remove product from cart
  async removeFromCart(customerId: string, productId: string) {
    const cart = await this.prisma.shoppingCart.findUnique({
      where: { customer_id: customerId },
    })

    if (!cart) throw new NotFoundException('Shopping cart not found')

    const cartItem = await this.prisma.cartItem.findFirst({
      where: { cart_id: cart.cart_id, product_id: productId },
    })

    if (!cartItem) throw new NotFoundException('Product not found in cart')

    await this.prisma.cartItem.delete({ where: { item_id: cartItem.item_id } })

    return { message: 'Product removed from cart' }
  }

  async clearCart(customerId: string) {
    const cart = await this.prisma.shoppingCart.findUnique({
      where: { customer_id: customerId },
    })

    if (!cart) throw new NotFoundException('Shopping cart not found')

    await this.prisma.cartItem.deleteMany({ where: { cart_id: cart.cart_id } })

    return { message: 'Cart cleared successfully' }
  }
}
