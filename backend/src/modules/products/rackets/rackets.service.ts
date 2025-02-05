import { Injectable } from '@nestjs/common'
import { Brand, Prisma } from '@prisma/client' // ✅ Import Brand Enum
import { PrismaService } from 'prisma/prisma.service'

@Injectable()
export class RacketsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    createProductDto: Prisma.ProductCreateInput & {
      racket: Prisma.RacketCreateInput
    },
  ) {
    return this.prisma.product.create({ data: createProductDto })
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
