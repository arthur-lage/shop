import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AddProductToCartDTO } from './dtos/add-product-to-cart.dto';

import { GetUserCartUseCase } from '../../application/use-cases/cart/get-user-cart/get-user-cart-use-case';
import { AddProductToCartUseCase } from '../../application/use-cases/cart/add-product-to-cart/add-product-to-cart-use-case';
import { RemoveProductFromCartUseCase } from '../../application/use-cases/cart/remove-product-from-cart/remove-product-from-cart-use-case';
import { ClearCartUseCase } from '../../application/use-cases/cart/clear-cart/clear-cart-use-case';
import { GetUser } from '../auth/get-user.decorator';
import { JwtGuard } from '../auth/auth.guard';

@UseGuards(JwtGuard)
@Controller('cart')
export class CartController {
  constructor(
    private getUserCartUseCase: GetUserCartUseCase,
    private addProductToCartUseCase: AddProductToCartUseCase,
    private removeProductFromCartUseCase: RemoveProductFromCartUseCase,
    private clearCartUseCase: ClearCartUseCase,
  ) {}

  @Get('/user')
  async getUserCart(@GetUser('id') userId: string): Promise<any> {
    const { products } = await this.getUserCartUseCase.execute({
      userId,
    });

    return {
      products,
    };
  }

  @Post('/new-product')
  async addProductToCart(
    @GetUser('id') userId: string,
    @Body() body: AddProductToCartDTO,
  ) {
    const { productId } = body;

    await this.addProductToCartUseCase.execute({
      productId,
      userId,
    });
  }

  @Delete('/clear')
  async clearCart(@GetUser('id') userId: string) {
    await this.clearCartUseCase.execute({
      userId,
    });
  }

  @Delete('/:productId')
  async removeProductFromCart(
    @GetUser('id') userId: string,
    @Param('productId') productId: string,
  ) {
    await this.removeProductFromCartUseCase.execute({
      userId,
      productId,
    });
  }
}
