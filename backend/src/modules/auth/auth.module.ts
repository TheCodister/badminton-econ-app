import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { PrismaService } from 'prisma/prisma.service'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'BenCuber@2002', // Use env variable in production
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [AuthService, PrismaService],
  controllers: [AuthController],
})
export class AuthModule {}
