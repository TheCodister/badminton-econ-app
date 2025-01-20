import { Body, Controller, Get, Post, Query } from '@nestjs/common'
import { Shuttlecock } from 'src/models/shuttlecock.entity'
import { ShuttlecocksService } from './shuttlecocks.service'

@Controller('shuttlecocks')
export class ShuttlecocksController {
  constructor(private readonly shuttlecocksService: ShuttlecocksService) {}

  @Post()
  create(@Body() shuttlecockData: Partial<Shuttlecock>) {
    return this.shuttlecocksService.create(shuttlecockData)
  }

  @Get()
  findAll(@Query() filters: Record<string, string>) {
    return this.shuttlecocksService.findAll(filters)
  }
}
