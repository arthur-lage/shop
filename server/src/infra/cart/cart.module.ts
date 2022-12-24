import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { CartController } from './cart.controller';
import { PrismaService } from '../database/prisma/prisma.service';

import { GetUserCartUseCase } from '../../application/use-cases/get-user-cart-use-case';
import { AddProductToCartUseCase } from '../../application/use-cases/add-product-to-cart-use-case';
import { RemoveProductFromCartUseCase } from '../../application/use-cases/remove-product-from-cart-use-case';
import { ClearCartUseCase } from '../../application/use-cases/clear-cart-use-case';

@Module({
  imports: [DatabaseModule],
  controllers: [CartController],
  providers: [
    GetUserCartUseCase,
    AddProductToCartUseCase,
    RemoveProductFromCartUseCase,
    ClearCartUseCase,
    PrismaService,
  ],
})
export class CartModule {}
