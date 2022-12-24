import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CartRepository } from 'src/application/repositories/cart-repository';
import { Product } from 'src/application/entities/product/product';
import { Cart } from 'src/application/entities/cart/cart';

@Injectable()
export class PrismaCartRepository implements CartRepository {
  constructor(private prismaService: PrismaService) {}

  async getUserCart(userId: string): Promise<Cart> {
    const cart = await this.prismaService.cart.findUnique({
      where: {
        userId,
      },
    });

    return cart;
  }

  async addProductToCart(userId: string, product: Product): Promise<void> {
    const cart = await this.prismaService.cart.findUnique({
      where: {
        userId,
      },
    });

    const newCart = new Cart({
      products: cart.products.push(product),
      id: cart.id,
      createdAt: cart.createdAt,
    });

    await this.prismaService.cart.update({
      where: {
        userId,
      },
      data: newCart,
    });
  }

  async clearCart(cart: Cart): Promise<void> {
    const newCart = new Cart({
      products: [],
      id: cart.id,
      createdAt: cart.createdAt,
    });

    await this.prismaService.cart.update({
      where: {
        id: cart.id,
      },
      data: newCart,
    });
  }

  async removeProductFromCart(
    userId: string,
    productId: string,
  ): Promise<void> {
    const cart = await this.getUserCart(userId);

    const filteredProducts = cart.products.filter(
      (product) => product.id !== productId,
    );

    const newCart = new Cart({
      products: filteredProducts,
      id: cart.id,
      createdAt: cart.createdAt,
    });

    await this.prismaService.cart.update({
      where: {
        id: cart.id,
      },
      data: newCart,
    });
  }
}
