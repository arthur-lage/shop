import { User } from 'src/application/entities/user/user';
import { UserRepository } from '../../../../application/repositories/user-repository';
import { PrismaService } from '../prisma.service';
import { UserNotFound } from '../../../../application/use-cases/errors/user-not-found';
import { PrismaUserMapper } from '../mappers/prisma-user-mapper';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PrismaUserRepository implements UserRepository {
  constructor(private prismaService: PrismaService) {}

  async findByEmail(email: string): Promise<User> {
    const user = await this.prismaService.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      throw new UserNotFound();
    }

    return PrismaUserMapper.toDomain(user);
  }

  async create(user: User) {
    await this.prismaService.user.create({
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
        password: user.password,
      },
    });
  }
}
