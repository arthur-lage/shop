import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';

import { UserRepository } from '../../application/repositories/user-repository';
import { ProductRepository } from '../../application/repositories/product-repository';

import { PrismaUserRepository } from './prisma/repositories/user-repository';
import { PrismaProductRepository } from './prisma/repositories/product-repository';
import { PrismaCartRepository } from './prisma/repositories/cart-repository';
import { CartRepository } from 'src/application/repositories/cart-repository';

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
    {
      provide: CartRepository,
      useClass: PrismaCartRepository,
    },
  ],
  exports: [UserRepository, ProductRepository, CartRepository],
})
export class DatabaseModule {}
