import { Injectable } from '@nestjs/common'
import { Balance, Brand, Prisma, Stiffness } from '@prisma/client' // ✅ Import Brand Enum
import { PrismaService } from 'prisma/prisma.service'

@Injectable()
export class RacketsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    createProductDto: Prisma.ProductCreateInput & {
      racket?: Prisma.RacketCreateInput
    },
  ) {
    const { racket, ...productData } = createProductDto

    return this.prisma.product.create({
      data: {
        ...productData,
        racket: {
          create: {
            ...racket,
            // Let Prisma defaults handle missing fields
          },
        },
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
      const weights = filters.weight.split(',').map((w) => w.trim())
      where.OR = weights.map((w) => ({
        weight: { contains: w, mode: 'insensitive' },
      }))
    }

    if (filters.balance) {
      const balances = filters.balance
        .split(',')
        .map((b) => b.replace(/\s+/g, '') as Balance) // Remove all spaces
      where.balance = { in: balances }
    }

    if (filters.stiffness) {
      const stiffness = filters.stiffness
        .split(',')
        .map((s) => s.replace(/\s+/g, '') as Stiffness) // Remove all spaces
      where.stiffness = { in: stiffness }
    }

    return this.prisma.racket.findMany({
      where,
      include: { product: true },
    })
  }
}
