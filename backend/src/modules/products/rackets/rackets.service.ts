import { Injectable } from '@nestjs/common'
import { Balance, Brand, Prisma, Stiffness } from '@prisma/client' // ✅ Import Brand Enum
import { PrismaService } from '../../../../prisma/prisma.service'

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
    const racket = await this.prisma.racket.findUnique({
      where: { id },
      include: { product: true },
    })

    return {
      ...racket,
      product: {
        ...racket.product,
        price: parseFloat((+racket.product.price / 24000).toFixed(2)),
      },
    }
  }

  async bulkCreateRackets(data: any[]) {
    const created = await this.prisma.$transaction(
      data.map((entry) =>
        this.prisma.racket.create({
          data: {
            balance: entry.racket.balance,
            length: entry.racket.length,
            player_level: entry.racket.player_level,
            playing_style: entry.racket.playing_style,
            stiffness: entry.racket.stiffness,
            weight: entry.racket.weight,
            line: entry.racket.line,
            technology: entry.racket.technology,
            max_tension: entry.racket.max_tension,
            product: {
              create: {
                image_url: entry.image_url,
                product_name: entry.product_name,
                brand: entry.brand,
                price: entry.price,
                description: entry.description,
                status: entry.status,
                sales: entry.sales,
                stock: entry.stock,
                available_location: entry.available_location,
              },
            },
          },
        }),
      ),
    )

    return created
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

    const orderBy: Prisma.RacketOrderByWithRelationInput[] = []
    if (filters.price) {
      orderBy.push({
        product: {
          price: filters.price.toLowerCase() === 'asc' ? 'asc' : 'desc',
        },
      })
    }

    const take = filters.limit ? parseInt(filters.limit, 10) : undefined
    const page = filters.page ? parseInt(filters.page, 10) : 1
    const skip = take ? (page - 1) * take : undefined // Calculate the number of records to skip

    // Fetch the total count of matching records (ignoring limit and skip)
    const totalCount = await this.prisma.racket.count({
      where,
    })

    // Fetch the paginated data
    const racks = await this.prisma.racket.findMany({
      where,
      orderBy,
      take,
      skip, // Add skip for pagination
      include: { product: true },
    })

    return {
      total: totalCount, // Total number of matching records
      data: racks.map((r) => ({
        ...r,
        product: {
          ...r.product,
          price: parseFloat((+r.product.price / 24000).toFixed(2)),
        },
      })),
    }
  }
}
