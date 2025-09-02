import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common'
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger'
import { Prisma } from '../../../../node_modules/@prisma/client'
import { RacketsService } from './rackets.service'

@ApiTags('Rackets')
@Controller('rackets')
export class RacketsController {
  constructor(private readonly racketsService: RacketsService) {}

  @Post('bulk')
  async createRacketsInBulk(@Body() data: any[]) {
    return this.racketsService.bulkCreateRackets(data)
  }

  @Post()
  @ApiOperation({ summary: 'Create a new racket product' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        product_name: { type: 'string' },
        brand: { type: 'string' },
        price: { type: 'number' },
        description: { type: 'string' },
        image_url: { type: 'string' },
        status: { type: 'string', enum: ['AVAILABLE', 'OUT_OF_STOCK'] },
        sales: { type: 'boolean' },
        stock: { type: 'integer' },
        available_location: {
          type: 'array',
          items: { type: 'string' },
        },
        racket: {
          type: 'object',
          properties: {
            line: { type: 'string' },
            stiffness: { type: 'string' },
            weight: { type: 'string' },
            balance: { type: 'string' },
            max_tension: { type: 'string' },
            length: { type: 'number' },
            technology: {
              type: 'array',
              items: { type: 'string' },
            },
          },
        },
      },
      required: [
        'product_name',
        'brand',
        'price',
        'description',
        'image_url',
        'status',
        'sales',
        'stock',
        'available_location',
        'racket',
      ],
    },
  })
  @ApiResponse({ status: 201, description: 'Racket created' })
  create(
    @Body()
    racketData: Prisma.ProductCreateInput & {
      racket: Prisma.RacketCreateInput
    },
  ) {
    return this.racketsService.create(racketData)
  }

  @Get()
  @ApiOperation({ summary: 'Get all rackets with optional filters' })
  @ApiQuery({ name: 'weight', required: false })
  @ApiQuery({ name: 'balance', required: false })
  @ApiQuery({ name: 'stiffness', required: false })
  @ApiQuery({
    name: 'price',
    required: false,
    description: 'Sort by price (asc or desc)',
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    description: 'Limit the number of results',
  })
  @ApiQuery({
    name: 'page',
    required: false,
    description: 'Page number for pagination',
  })
  @ApiResponse({ status: 200, description: 'List of rackets' })
  findAll(@Query() filters: Record<string, string>) {
    return this.racketsService.findAll(filters)
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get racket by ID' })
  @ApiParam({ name: 'id', type: 'string' })
  @ApiResponse({ status: 200, description: 'Racket details' })
  findOne(@Param('id') id: string) {
    return this.racketsService.findOne(id)
  }
}
