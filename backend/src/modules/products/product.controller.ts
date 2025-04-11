// src/product/product.controller.ts
import { Controller, Get, Query } from '@nestjs/common'
import { ProductService } from './product.service'

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  async findAll(@Query('search') search?: string) {
    return this.productService.findAll(search)
  }
}
