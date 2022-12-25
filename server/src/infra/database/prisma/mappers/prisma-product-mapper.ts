import { Product as DomainProduct } from 'src/application/entities/product/product';
import { Product as PrismaProduct } from '@prisma/client';

export class PrismaProductMapper {
  static toDomain(raw: PrismaProduct) {
    return new DomainProduct({
      id: raw.id,
      title: raw.title,
      description: raw.description,
      imageURL: raw.imageURL,
      price: raw.price,
      createdAt: raw.createdAt,
    });
  }

  static toPrisma(domainProduct: DomainProduct) {
    return {
      id: domainProduct.id,
      title: domainProduct.title,
      description: domainProduct.description,
      imageURL: domainProduct.imageURL,
      price: domainProduct.price,
      createdAt: domainProduct.createdAt,
    };
  }
}
