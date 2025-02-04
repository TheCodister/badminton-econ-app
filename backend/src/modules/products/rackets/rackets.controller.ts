import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { RacketsService } from './rackets.service'

@Controller('rackets')
export class RacketsController {
  constructor(private readonly racketsService: RacketsService) {}

  @Post()
  create(@Body() racketData: Prisma.RacketCreateInput) {
    return this.racketsService.create(racketData)
  }

  @Get()
  findAll(@Query() filters: Record<string, string>) {
    return this.racketsService.findAll(filters)
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.racketsService.findOne(id)
  }
}
