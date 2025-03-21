import { Module } from '@nestjs/common'
import { PrismaService } from 'prisma/prisma.service'
import { ShoppingCartController } from './cart.controller'
import { ShoppingCartService } from './cart.service'

@Module({
  providers: [ShoppingCartService, PrismaService],
  controllers: [ShoppingCartController],
})
export class ShoppingCartModule {}
