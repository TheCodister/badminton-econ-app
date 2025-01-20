import { Body, Controller, Get, Post, Query } from '@nestjs/common'
import { Racket } from 'src/models/racket.entity'
import { RacketsService } from './rackets.service'

@Controller('rackets')
export class RacketsController {
  constructor(private readonly racketsService: RacketsService) {}

  @Post()
  create(@Body() racketData: Partial<Racket>) {
    return this.racketsService.create(racketData)
  }

  @Get()
  findAll(@Query() filters: Record<string, string>) {
    return this.racketsService.findAll(filters)
  }
}
