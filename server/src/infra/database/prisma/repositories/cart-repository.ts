import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CartRepository } from 'src/application/repositories/cart-repository';
import { Product } from 'src/application/entities/product/product';
import { Cart } from 'src/application/entities/cart/cart';
import { PrismaCartMapper } from '../mappers/prisma-cart-mapper';

@Injectable()
export class PrismaCartRepository implements CartRepository {
  constructor(private prismaService: PrismaService) {}

  async getUserCart(userId: string): Promise<Cart> {
    const cart = await this.prismaService.cart.findUnique({
      where: {
        userId,
      },
    });
  }

  async addProductToCart(userId: string, productId: string): Promise<void> {
    const product = await this.prismaService.product.findUnique({
      where: {
        id: productId,
      },
    });

    const cart = await this.prismaService.cart.findUnique({
      where: {
        userId,
      },
      include: {
        products: true,
      },
    });

    let newProducts = cart.products;

    newProducts.push(product);

    newProducts = newProducts.map((currentProduct) =>
      PrismaCartMapper.toPrisma(currentProduct),
    );

    await this.prismaService.cart.update({
      where: {
        userId,
      },
      data: {
        products: newProducts,
      },
    });
  }

  async clearCart(userId: string): Promise<void> {
    await this.prismaService.cart.update({
      where: {
        userId,
      },
      data: {
        products: {
          deleteMany: {},
        },
      },
    });
  }

  async removeProductFromCart(
    userId: string,
    productId: string,
  ): Promise<void> {
    await this.prismaService.cart.update({
      where: {
        userId,
      },
      data: {
        products: {
          deleteMany: [{ id: productId }],
        },
      },
    });
  }
}
