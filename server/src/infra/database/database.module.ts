import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';

import { UserRepository } from '../../application/repositories/user-repository';
import { ProductRepository } from '../../application/repositories/product-repository';

import { PrismaUserRepository } from './prisma/repositories/user-repository';
import { PrismaProductRepository } from './prisma/repositories/product-repository';

@Module({
  providers: [
    PrismaService,
    {
      provide: UserRepository,
      useClass: PrismaUserRepository,
    },
    {
      provide: ProductRepository,
      useClass: PrismaProductRepository,
    },
  ],
  exports: [UserRepository, ProductRepository],
})
export class DatabaseModule {}
