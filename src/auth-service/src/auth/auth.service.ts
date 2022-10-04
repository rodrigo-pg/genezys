import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

  constructor(
    private readonly jwtService: JwtService
  ) {}

  async login(userId:string) {
    const payload = { userId };

    return {
      userId: userId,
      accessToken: this.jwtService.sign(payload, {secret: process.env.TOKEN_SECRET})
    };
  }
}
