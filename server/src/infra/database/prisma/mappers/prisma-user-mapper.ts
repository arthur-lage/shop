import { User as RawUser } from '@prisma/client';

import { User } from 'src/application/entities/user/user';

export class PrismaUserMapper {
  static toDomain(user: RawUser) {
    return new User({
      name: user.name,
      email: user.email,
      password: user.password,
      id: user.id,
      createdAt: user.createdAt,
    });
  }
}
