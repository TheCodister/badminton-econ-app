import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Racket } from './models/racket.entity'
import { Shoes } from './models/shoes.entity'
import { Shuttlecock } from './models/shuttlecock.entity'
import { RacketsModule } from './modules/products/rackets/rackets.module'

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), // Load .env variables globally
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: parseInt(configService.get('DB_PORT'), 10),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        entities: [Racket, Shoes, Shuttlecock],
      }),
      inject: [ConfigService],
    }),
    RacketsModule,
  ],
})
export class AppModule {}
