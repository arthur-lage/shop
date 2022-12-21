import { UserRepository } from '../../repositories/user-repository';
import { User } from '../../entities/user/user';
import { Injectable } from '@nestjs/common';
import { EmailAlreadyBeingUsed } from '../errors/email-already-being-used';
import * as argon2 from 'argon2';

interface RegisterUseCaseRequest {
  name: string;
  email: string;
  password: string;
}

interface RegisterUseCaseResponse {
  token: string;
}

@Injectable()
export class RegisterUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(
    request: RegisterUseCaseRequest,
  ): Promise<RegisterUseCaseResponse> {
    const { name, email, password } = request;

    const isEmailBeingUsed = await this.userRepository.findByEmail(email);

    if (isEmailBeingUsed) {
      throw new EmailAlreadyBeingUsed();
    }

    const hashedPassword = await argon2.hash(password);

    const user = new User({
      name,
      email,
      password: hashedPassword,
    });

    await this.userRepository.create(user);

    const token = 'token';

    return {
      token,
    };
  }
}
