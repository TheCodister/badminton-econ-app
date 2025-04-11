import { CacheModule } from '@nestjs/cache-manager'
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { PrismaModule } from 'prisma/prisma.module'
import { AuthModule } from './modules/auth/auth.module'
import { ShoppingCartModule } from './modules/cart/cart.module'
import { ProductModule } from './modules/products/product.module'
import { RacketsModule } from './modules/products/rackets/rackets.module'

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), // Load .env variables globally
    CacheModule.register({
      store: require('cache-manager-redis-store'),
      host: 'localhost', // Replace with your Redis host
      port: 6379, // Default Redis port
      ttl: 60, // Cache expiration in seconds
    }),
    PrismaModule, // Import PrismaModule
    RacketsModule,
    AuthModule,
    ShoppingCartModule,
    ProductModule,
  ],
})
export class AppModule {}
