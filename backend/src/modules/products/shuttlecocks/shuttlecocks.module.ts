import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Shuttlecock } from 'src/models/shuttlecock.entity'
import { ShuttlecocksController } from './shuttlecocks.controller'
import { ShuttlecocksService } from './shuttlecocks.service'

@Module({
  imports: [TypeOrmModule.forFeature([Shuttlecock])],
  controllers: [ShuttlecocksController],
  providers: [ShuttlecocksService],
})
export class ShuttlecocksModule {}
