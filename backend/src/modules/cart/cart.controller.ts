import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common'
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger'
import { ShoppingCartService } from './cart.service'

@ApiTags('Shopping Cart') // Groups all routes under "Shopping Cart"
@Controller('shoppingcart')
export class ShoppingCartController {
  constructor(private shoppingCartService: ShoppingCartService) {}

  @Get(':customerId')
  @ApiOperation({ summary: 'Get cart by customer ID' })
  @ApiParam({ name: 'customerId', type: String })
  @ApiResponse({ status: 200, description: 'Shopping cart with items' })
  async getCart(@Param('customerId') customerId: string) {
    return this.shoppingCartService.getCart(customerId)
  }

  @Post(':customerId/:productId')
  @ApiOperation({ summary: 'Add product to cart' })
  @ApiParam({ name: 'customerId', type: String })
  @ApiParam({ name: 'productId', type: String })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        quantity: { type: 'number', example: 2 },
      },
    },
  })
  @ApiResponse({ status: 201, description: 'Product added to cart' })
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
  @ApiOperation({ summary: 'Remove product from cart' })
  @ApiParam({ name: 'customerId', type: String })
  @ApiParam({ name: 'productId', type: String })
  @ApiResponse({ status: 200, description: 'Product removed from cart' })
  async removeFromCart(
    @Param('customerId') customerId: string,
    @Param('productId') productId: string,
  ) {
    return this.shoppingCartService.removeFromCart(customerId, productId)
  }

  @Delete(':customerId')
  @ApiOperation({ summary: 'Clear all items from cart' })
  @ApiParam({ name: 'customerId', type: String })
  @ApiResponse({ status: 200, description: 'Cart cleared' })
  async clearCart(@Param('customerId') customerId: string) {
    return this.shoppingCartService.clearCart(customerId)
  }
}
