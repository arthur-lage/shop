import { Cart, Product } from '@prisma/client';
import { Cart as CartEntity } from 'src/application/entities/cart/cart';
import { PrismaProductMapper } from './prisma-product-mapper';

export class PrismaCartMapper {
  static toDomain(prismaCart: Cart, products: Product[]) {
    return new CartEntity({
      id: prismaCart.id,
      createdAt: prismaCart.createdAt,
      products: products.map((product) =>
        PrismaProductMapper.toDomain(product),
      ),
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
