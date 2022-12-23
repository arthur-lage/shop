import { ProductRepository } from 'src/application/repositories/product-repository';
import { PrismaService } from '../prisma.service';
import { Injectable } from '@nestjs/common';
import { Product } from 'src/application/entities/product/product';
import { PrismaProductMapper } from '../mappers/prisma-product-mapper';

@Injectable()
export class PrismaProductRepository implements ProductRepository {
  constructor(private prismaService: PrismaService) {}

  async getAll(): Promise<Product[]> {
    const products = await this.prismaService.product.findMany();

    return products.map((product) => PrismaProductMapper.toDomain(product));
  }

  async getById(productId: string): Promise<Product> {
    const product = await this.prismaService.product.findUnique({
      where: {
        id: productId,
      },
    });

    return PrismaProductMapper.toDomain(product);
  }

  async create(product: Product): Promise<void> {
    await this.prismaService.product.create({
      data: {
        id: product.id,
        title: product.title,
        description: product.description,
        imageURL: product.imageURL,
        price: product.price,
      },
    });
  }

  async update(productId: string, product: Product): Promise<void> {
    await this.prismaService.product.update({
      where: {
        id: productId,
      },
      data: {
        title: product.title,
        description: product.description,
        imageURL: product.imageURL,
        price: product.price,
      },
    });
  }

  async deleteAll(): Promise<void> {
    await this.prismaService.product.deleteMany();
  }

  async deleteById(productId: string): Promise<void> {
    await this.prismaService.product.delete({
      where: {
        id: productId,
      },
    });
  }
}
