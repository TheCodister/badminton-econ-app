import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common'
import { ShoppingCartService } from './cart.service'

@Controller('shoppingcart')
export class ShoppingCartController {
  constructor(private shoppingCartService: ShoppingCartService) {}

  @Get(':customerId')
  async getCart(@Param('customerId') customerId: string) {
    return this.shoppingCartService.getCart(customerId)
  }

  @Post(':customerId/:productId')
  async addToCart(
    @Param('customerId') customerId: string,
    @Param('productId') productId: string,
    @Body() body: { quantity?: number },
  ) {
    return this.shoppingCartService.addToCart(
      customerId,
      productId,
      body.quantity || 1,
    )
  }

  @Delete(':customerId/:productId')
  async removeFromCart(
    @Param('customerId') customerId: string,
    @Param('productId') productId: string,
  ) {
    return this.shoppingCartService.removeFromCart(customerId, productId)
  }

  @Delete(':customerId')
  async clearCart(@Param('customerId') customerId: string) {
    return this.shoppingCartService.clearCart(customerId)
  }
}
