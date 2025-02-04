import { Injectable } from '@nestjs/common'
import { PrismaService } from 'prisma/prisma.service'

@Injectable()
export class ShoesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: any) {
    return this.prisma.shoes.create({
      data,
    })
  }

  async findAll(filters: Record<string, string>) {
    const where: any = {}

    if (filters.brand) {
      where.brand = {
        in: filters.brand.split(','),
      }
    }
    if (filters.size) {
      where.size = {
        // For JSONB fields, use `path` for nested properties (adjust based on your JSON structure)
        // Example: Search for size.value = '9'
        path: ['value'], // Replace with your actual JSON path
        equals: filters.size,
      }
    }
    if (filters.color) {
      where.color = {
        path: ['hex'], // Replace with your actual JSON path (e.g., 'name' or 'hex')
        equals: filters.color.toLowerCase(),
      }
    }

    return this.prisma.shoes.findMany({ where })
  }
}
