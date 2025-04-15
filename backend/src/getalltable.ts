import { Controller, Get } from '@nestjs/common'
import { PrismaService } from 'prisma/prisma.service' // Ensure PrismaService is available

@Controller('rackets')
export class RacketsController {
  constructor(private readonly prismaService: PrismaService) {}

  @Get('tables')
  async getAllTables() {
    const tables = await this.prismaService.$queryRaw<
      Array<{ table_name: string }>
    >`SELECT table_name FROM information_schema.tables WHERE table_schema = 'public'`
    return tables.map((table) => table.table_name)
  }
}