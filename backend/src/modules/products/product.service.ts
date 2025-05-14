// src/product/product.service.ts
import { Injectable } from '@nestjs/common'
import { PrismaService } from 'prisma/prisma.service'

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}

  async findAll(search?: string, limit?: number) {
    const products = await this.prisma.product.findMany({
      where: search
        ? {
            product_name: {
              contains: search,
              mode: 'insensitive',
            },
          }
        : undefined,
      select: {
        id: true,
        product_name: true,
        image_url: true,
        price: true,
      },
      take: limit ? parseInt(String(limit), 10) : undefined, // Apply limit if provided
    })

    // Convert prices from VND to USD
    return products.map((product) => ({
      ...product,
      price: parseFloat((+product.price / 24000).toFixed(2)), // Convert VND to USD
    }))
  }
}
