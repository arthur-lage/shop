import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { LoginUseCase } from '../../application/use-cases/auth/login/login-use-case';
import { DatabaseModule } from '../database/database.module';
import { RegisterUseCase } from '../../application/use-cases/auth/register/register-use-case';
import { PrismaService } from '../database/prisma/prisma.service';

@Module({
  imports: [DatabaseModule],
  controllers: [AuthController],
  providers: [LoginUseCase, RegisterUseCase, PrismaService],
})
export class AuthModule {}
