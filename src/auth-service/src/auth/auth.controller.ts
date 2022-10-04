import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @MessagePattern({role: "auth", cmd: "login"})
  async login(userId: string) {
    return await this.authService.login(userId);
  }
}
