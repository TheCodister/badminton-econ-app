import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { InjectRepository } from '@nestjs/typeorm'
import * as bcrypt from 'bcryptjs'
import { Customer } from 'src/models/user.entity'
import { Repository } from 'typeorm'

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.customerRepository.findOne({
      where: { mail: email },
    })
    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, ...result } = user
      return result // Exclude password
    }
    throw new UnauthorizedException('Invalid credentials')
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.user_id }
    return {
      access_token: this.jwtService.sign(payload),
      user,
    }
  }
}
