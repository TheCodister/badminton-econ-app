import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcryptjs'
import { PrismaService } from '../../../prisma/prisma.service'

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  // Register user
  async register(data: {
    username: string
    email: string
    phone: string
    password: string
    address: string
  }) {
    const { username, email, phone, password, address } = data

    // Check if email is already taken
    const existingUser = await this.prisma.user.findUnique({
      where: { mail: email },
    })
    if (existingUser) throw new ConflictException('Email already registered')

    // Hash password before storing
    const hashedPassword = await bcrypt.hash(password, 10)

    // Create user
    const newUser = await this.prisma.user.create({
      data: {
        username,
        mail: email,
        phone_number: phone,
        password: hashedPassword,
        role: 'CUSTOMER',
        address,
      },
    })

    return { message: 'User registered successfully' }
  }

  // Validate user credentials
  async validateUser(email: string, password: string) {
    const user = await this.prisma.user.findUnique({
      where: { mail: email },
    })

    if (!user) throw new UnauthorizedException('Invalid credentials')

    const passwordMatch = await bcrypt.compare(password, user.password)
    if (!passwordMatch) throw new UnauthorizedException('Invalid credentials')

    return user
  }

  // Login and generate JWT token
  async login(mail: string, password: string) {
    const user = await this.prisma.user.findUnique({
      where: { mail },
    })

    if (!user) {
      throw new Error('Invalid credentials')
    }

    const passwordValid = await bcrypt.compare(password, user.password)

    if (!passwordValid) {
      throw new Error('Invalid credentials')
    }

    // Generate JWT token
    const token = this.jwtService.sign({ userId: user.user_id })

    // ✅ Return full user details
    return {
      user_id: user.user_id,
      username: user.username,
      mail: user.mail,
      access_token: token,
    }
  }

  // Decode JWT Token
  async verifyToken(token: string) {
    try {
      return this.jwtService.verify(token)
    } catch (err) {
      throw new UnauthorizedException('Invalid or expired token')
    }
  }
}
