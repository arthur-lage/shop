import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { CartController } from './cart.controller';
import { PrismaService } from '../database/prisma/prisma.service';

import { GetUserCartUseCase } from 'src/application/use-cases/cart/get-user-cart/get-user-cart-use-case';
import { AddProductToCartUseCase } from 'src/application/use-cases/cart/add-product-to-cart/add-product-to-cart-use-case';
import { ClearCartUseCase } from 'src/application/use-cases/cart/clear-cart/clear-cart-use-case';
import { RemoveProductFromCartUseCase } from 'src/application/use-cases/cart/remove-product-from-cart/remove-product-from-cart-use-case';

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
