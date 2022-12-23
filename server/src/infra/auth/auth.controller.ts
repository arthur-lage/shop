import { Body, Controller, Post } from '@nestjs/common';
import { LoginDTO } from './dtos/login.dto';
import { LoginUseCase } from 'src/application/use-cases/auth/login/login-use-case';
import { RegisterDTO } from './dtos/register.dto';
import { RegisterUseCase } from 'src/application/use-cases/auth/register/register-use-case';

@Controller('auth')
export class AuthController {
  constructor(
    private loginUseCase: LoginUseCase,
    private registerUseCase: RegisterUseCase,
  ) {}

  @Post('login')
  async login(@Body() body: LoginDTO) {
    const { email, password } = body;

    const { token } = await this.loginUseCase.execute({ email, password });

    return { token };
  }

  @Post('register')
  async register(@Body() body: RegisterDTO) {
    const { name, email, password } = body;

    const { token } = await this.registerUseCase.execute({
      name,
      email,
      password,
    });

    return { token };
  }
}
