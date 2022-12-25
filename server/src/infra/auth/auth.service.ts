import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async signToken(userId: string, email: string, name: string) {
    const payload = { sub: userId, email, name };

    const token = this.jwtService.sign(payload);

    return { token };
  }
}
