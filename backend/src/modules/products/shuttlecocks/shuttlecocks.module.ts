import { Module } from '@nestjs/common'
import { ShuttlecocksController } from './shuttlecocks.controller'
import { ShuttlecocksService } from './shuttlecocks.service'

@Module({
  imports: [],
  controllers: [ShuttlecocksController],
  providers: [ShuttlecocksService],
})
export class ShuttlecocksModule {}
