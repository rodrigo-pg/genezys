import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginRequest } from './dtos/login-request.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("/login")
  async login(@Body() loginRequest: LoginRequest) {
    const tokenData = await this.authService.login(loginRequest.userId);

    return tokenData;
  }
}