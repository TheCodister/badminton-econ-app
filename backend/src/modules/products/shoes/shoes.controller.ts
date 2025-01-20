import { Body, Controller, Get, Post, Query } from '@nestjs/common'
import { Shoes } from 'src/models/shoes.entity'
import { ShoesService } from './shoes.service'

@Controller('shoes')
export class ShoesController {
  constructor(private readonly shoesService: ShoesService) {}

  @Post()
  create(@Body() shoesData: Partial<Shoes>) {
    return this.shoesService.create(shoesData)
  }

  @Get()
  findAll(@Query() filters: Record<string, string>) {
    return this.shoesService.findAll(filters)
  }
}
