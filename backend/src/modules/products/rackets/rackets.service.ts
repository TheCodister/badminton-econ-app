import { Injectable } from '@nestjs/common'
import { Brand, Prisma } from '@prisma/client' // ✅ Import Brand Enum
import { PrismaService } from 'prisma/prisma.service'

@Injectable()
export class RacketsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: any) {
    return this.prisma.product.create({
      data: {
        id: data.id,
        image_url: data.image_url,
        product_name: data.product_name,
        brand: data.brand,
        price: data.price,
        description: data.description,
        status: data.status,
        sales: data.sales,
        stock: data.stock,
        available_location: data.available_location,

        // Create a related racket entry
        racket: {
          create: {
            line: data.racket.line,
            stiffness: data.racket.stiffness,
            weight: data.racket.weight,
            balance: data.racket.balance,
            max_tension: data.racket.max_tension,
            length: data.racket.length,
            technology: data.racket.technology,
          },
        },
      },
      include: {
        racket: true, // Return the created racket along with the product
      },
    })
  }

  async findOne(id: string) {
    return this.prisma.racket.findUnique({
      where: { id },
      include: { product: true },
    })
  }

  async findAll(filters: Record<string, string>) {
    const where: Prisma.RacketWhereInput = {}

    if (filters.brand) {
      const brands = filters.brand.toUpperCase().split(',') as Brand[] // ✅ Convert to Enum
      where.product = {
        brand: { in: brands },
      }
    }
    if (filters.weight) {
      where.weight = { in: filters.weight.split(',') }
    }
    if (filters.balance) {
      where.balance = { contains: filters.balance, mode: 'insensitive' }
    }
    if (filters.stiffness) {
      where.stiffness = { contains: filters.stiffness, mode: 'insensitive' }
    }

    return this.prisma.racket.findMany({
      where,
      include: { product: true },
    })
  }
}
