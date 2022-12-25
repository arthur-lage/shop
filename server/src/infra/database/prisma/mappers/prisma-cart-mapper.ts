import { Cart } from '@prisma/client';
import { Cart as CartEntity } from 'src/application/entities/cart/cart';
import { Product } from '../../../../application/entities/product/product';

export class PrismaCartMapper {
  static toDomain(prismaCart: Cart, products: Product[]) {
    return new CartEntity({
      id: prismaCart.id,
      createdAt: prismaCart.createdAt,
      products,
      userId: prismaCart.userId,
    });
  }

  static toPrisma(entityCart: CartEntity) {
    return {
      id: entityCart.id,
      products: entityCart.products,
      userId: entityCart.userId,
      createdAt: entityCart.createdAt,
    };
  }
}
