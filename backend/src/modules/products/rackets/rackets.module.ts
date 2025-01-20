import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Racket } from 'src/models/racket.entity'
import { RacketsController } from './rackets.controller'
import { RacketsService } from './rackets.service'

@Module({
  imports: [TypeOrmModule.forFeature([Racket])],
  controllers: [RacketsController],
  providers: [RacketsService],
})
export class RacketsModule {}
