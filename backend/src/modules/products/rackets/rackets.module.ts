import { Module } from '@nestjs/common'
import { PrismaModule } from 'prisma/prisma.module'
import { RacketsController } from './rackets.controller'
import { RacketsService } from './rackets.service'

@Module({
  imports: [PrismaModule],
  controllers: [RacketsController],
  providers: [RacketsService],
})
export class RacketsModule {}
