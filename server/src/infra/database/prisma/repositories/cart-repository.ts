import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CartRepository } from 'src/application/repositories/cart-repository';
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
      include: {
        products: true,
      },
    });

    if (!cart) {
      throw new BadRequestException("Could not find user's cart");
    }

    console.log(cart);

    return PrismaCartMapper.toDomain(
      {
        id: cart.id,
        createdAt: cart.createdAt,
        userId: cart.userId,
      },
      cart.products,
    );
  }

  async create(userId: string): Promise<void> {
    const newCart = new Cart({
      products: [],
      userId,
    });

    await this.prismaService.cart.create({
      data: {
        id: newCart.id,
        createdAt: newCart.createdAt,
        userId: newCart.userId,
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

    cart.products.push(product);

    await this.prismaService.product.update({
      where: {
        id: product.id,
      },
      data: {
        cartId: cart.id,
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
