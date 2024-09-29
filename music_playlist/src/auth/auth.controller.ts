import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserDocument } from '../user/schemas/user.schema';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() req) {
    return this.authService.signIn(req.email, req.password);
   
  }

  @Post('signup')
  async register(@Body() user: Partial<UserDocument>) {
    return this.authService.register(user);
  }
}
