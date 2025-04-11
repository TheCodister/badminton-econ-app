// src/product/product.service.ts
import { Injectable } from '@nestjs/common'
import { PrismaService } from 'prisma/prisma.service'

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}

  async findAll(search?: string) {
    return this.prisma.product.findMany({
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
    })
  }
}
