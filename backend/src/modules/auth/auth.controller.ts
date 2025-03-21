import { Body, Controller, Get, Headers, Post } from '@nestjs/common'
import { AuthService } from './auth.service'

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() body: { mail: string; password: string }) {
    console.log(body)
    return this.authService.login(body.mail, body.password)
  }

  @Post('register')
  async register(
    @Body()
    body: {
      username: string
      email: string
      phone: string
      password: string
      address: string
    },
  ) {
    return this.authService.register(body)
  }

  @Get('verify')
  async verifyToken(@Headers('Authorization') authHeader: string) {
    const token = authHeader?.split(' ')[1]
    return this.authService.verifyToken(token)
  }
}
