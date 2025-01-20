import { Body, Controller, Get, Post, Request } from '@nestjs/common'
import { AuthService } from './auth.service'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() body: { email: string; password: string }) {
    const user = await this.authService.validateUser(body.email, body.password)
    return this.authService.login(user)
  }

  @Get('protected')
  getProtected(@Request() req) {
    return { logged_in_as: req.user }
  }
}
