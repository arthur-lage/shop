import { Product } from 'src/application/entities/product/product';
import { Product as RawProduct } from '@prisma/client';

export class PrismaProductMapper {
  static toDomain(raw: RawProduct) {
    return new Product({
      id: raw.id,
      title: raw.title,
      description: raw.description,
      imageURL: raw.imageURL,
      price: raw.price,
      createdAt: raw.createdAt,
    });
  }
}
