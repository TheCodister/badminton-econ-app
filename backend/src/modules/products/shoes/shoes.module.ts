import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Shoes } from 'src/models/shoes.entity'
import { ShoesController } from './shoes.controller'
import { ShoesService } from './shoes.service'

@Module({
  imports: [TypeOrmModule.forFeature([Shoes])],
  controllers: [ShoesController],
  providers: [ShoesService],
})
export class ShoesModule {}
