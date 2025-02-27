import { Module } from '@nestjs/common'
import { ShoesController } from './shoes.controller'
import { ShoesService } from './shoes.service'

@Module({
  imports: [],
  controllers: [ShoesController],
  providers: [ShoesService],
})
export class ShoesModule {}
