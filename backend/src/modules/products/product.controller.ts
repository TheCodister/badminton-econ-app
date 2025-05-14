// src/product/product.controller.ts
import { Controller, Get, Query } from '@nestjs/common'
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger'
import { ProductService } from './product.service'

@ApiTags('Products')
@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  @ApiOperation({ summary: 'Search or list all products' })
  @ApiQuery({ name: 'search', required: false, description: 'Search keyword' })
  @ApiResponse({ status: 200, description: 'List of products' })
  async findAll(
    @Query('search') search?: string,
    @Query('limit') limit?: number,
  ) {
    return this.productService.findAll(search, limit)
  }
}
