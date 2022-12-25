import { Body, Controller, Delete, Get, Post } from '@nestjs/common';
import { RemoveProductFromCartDTO } from './dtos/remove-product-from-cart.sto';
import { AddProductToCartDTO } from './dtos/add-product-to-cart.dto';

import { GetUserCartUseCase } from '../../application/use-cases/cart/get-user-cart/get-user-cart-use-case';
import { AddProductToCartUseCase } from '../../application/use-cases/cart/add-product-to-cart/add-product-to-cart-use-case';
import { RemoveProductFromCartUseCase } from '../../application/use-cases/cart/remove-product-from-cart/remove-product-from-cart-use-case';
import { ClearCartUseCase } from '../../application/use-cases/cart/clear-cart/clear-cart-use-case';

@Controller('cart')
export class CartController {
  constructor(
    private getUserCartUseCase: GetUserCartUseCase,
    private addProductToCartUseCase: AddProductToCartUseCase,
    private removeProductFromCartUseCase: RemoveProductFromCartUseCase,
    private clearCartUseCase: ClearCartUseCase,
  ) {}

  @Get('/user')
  async getUserCart(userId: string) {
    const cart = await this.getUserCartUseCase.execute({
      userId,
    });

    return {
      cart,
    };
  }

  @Post('/new-product')
  async addProductToCart(@Body() body: AddProductToCartDTO) {
    const userId = '123123123';
    const { productId } = body;

    await this.addProductToCartUseCase.execute({
      productId,
      userId,
    });
  }

  @Delete('/clear')
  async clearCart() {
    const userId = '123123';

    await this.clearCartUseCase.execute({
      userId,
    });
  }

  async removeProductFromCart(@Body() body: RemoveProductFromCartDTO) {
    const userId = '123123';
    const { productId } = body;

    await this.removeProductFromCartUseCase.execute({
      userId,
      productId,
    });
  }
}
