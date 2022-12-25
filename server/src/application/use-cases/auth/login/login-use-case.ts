import { Injectable } from '@nestjs/common';

import * as argon2 from 'argon2';

import { UserNotFound } from '../../errors/user-not-found';
import { InvalidCredentials } from '../../errors/invalid-credentials';
import { UserRepository } from '../../../repositories/user-repository';
import { AuthService } from '../../../../infra/auth/auth.service';

interface LoginUseCaseRequest {
  email: string;
  password: string;
}

interface LoginUseCaseResponse {
  token: string;
}

@Injectable()
export class LoginUseCase {
  constructor(
    private userRepository: UserRepository,
    private authService: AuthService,
  ) {}

  async execute({
    email,
    password,
  }: LoginUseCaseRequest): Promise<LoginUseCaseResponse> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new UserNotFound();
    }

    const arePasswordMatching = await argon2.verify(user.password, password);

    if (!arePasswordMatching) {
      throw new InvalidCredentials();
    }

    const { token } = await this.authService.signToken(
      user.id,
      user.email,
      user.name,
    );

    return { token: JSON.stringify({ token: token }) };
  }
}
